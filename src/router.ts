import { createRouter, createWebHistory } from 'vue-router';
import { auth, database } from '@/firebase/init.js';
import 'vue-router';
import { getCurrentUser } from 'vuefire';
import { doc, getDoc } from 'firebase/firestore';

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    requiresOrganizationAdmin?: boolean
    avoidIfAuthed?: RouteLocationRaw
  }
}

const DEFAULT_TITLE = 'Distribunity';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/home'],
      name: 'home-view',
      component: () => import('@/pages/HomePage.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/home/HomeView.vue'),
        },
        {
          path: 'resources',
          alias: ['help', 'support', 'about'],
          name: 'resources-view',
          component: () => import('@/views/home/ResourcesView.vue'),
          children: [
            {
              path: '',
              name: 'resources',
              component: () => import('@/views/home/resources/FAQView.vue'),
              meta: {
                title: 'Distribunity: resources',
              },
            },
            {
              path: 'legal',
              name: 'legal',
              component: () => import('@/views/home/resources/LegalView.vue'),
              meta: {
                title: 'Distribunity: legal',
              },
            },
            {
              path: 'impressum',
              alias: 'imprint',
              name: 'impressum',
              component: () => import('@/views/home/resources/ImpressumView.vue'),
              meta: {
                title: 'Distribunity: impressum',
              },
            },
          ],
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/views/home/BlogView.vue'),
          meta: {
            title: 'Distribunity: posts',
          },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/home/LoginView.vue'),
          meta: {
            title: 'Distribunity: login',
            avoidIfAuthed: {
              name: 'home',
            },
          },
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/home/SignupView.vue'),
          meta: {
            title: 'Distribunity: signup',
            avoidIfAuthed: {
              name: 'dashboard',
            },
          },
        },
      ],
    },
    {
      path: '/work/',
      name: 'work',
      component: () => import('@/pages/CommonAuthPage.vue'),
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/views/auth/DashboardView.vue'),
          meta: {
            title: 'Distribunity: Dashboard',
            requiresAuth: true,
          },
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/views/auth/UserSettingsView.vue'),
          meta: {
            title: 'Distribunity: settings',
            requiresAuth: true,
          },
        },
        {
          path: 'organization/:id/',
          children: [
            {
              path: '',
              name: 'organization-settings',
              component: () => import('@/views/auth/OrganizationAdminView.vue'),
              meta: {
                title: 'Distribunity: organization settings',
                requiresAuth: true,
                requiresOrganizationAdmin: true,
              },
            },
          ],
        },
      ],
    },
    {
      path: '/work/organization/:id/inventories',
      name: 'organization-inventories',
      component: () => import('@/pages/InventoryPage.vue'),
      meta: {
        title: 'Distribunity: organization inventories',
        requiresAuth: true,
      },
    },
    {
      path: '/blog',
      redirect: '/blog?page=1',
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/NotFoundPage.vue'),
      meta: {
        title: 'Page not found',
      },
    },
  ],
});

router.beforeEach(async (to) => {
  await auth.authStateReady();

  if (to.meta.requiresAuth) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        name: 'login',
        query: {
          redirect: to.fullPath,
        },
      };
    } else if (to.meta.requiresOrganizationAdmin) {
      const organizationId = to.params.id;

      if (typeof organizationId == 'string') {
        const organization = await getDoc(doc(database, 'organizations', organizationId));

        if (organization.data()?.owner.id != currentUser.uid) {
          return {
            path: '/work/dashboard',
          };
        }
      }
    }
  } else if (to.meta.avoidIfAuthed) {
    const currentUser = await getCurrentUser();

    if (currentUser) {
      return to.meta.avoidIfAuthed;
    }
  }
});

router.beforeResolve((to) => {
  document.title = to.meta.title && typeof to.meta.title === 'string' ? to.meta.title : DEFAULT_TITLE;
});

export default router;
