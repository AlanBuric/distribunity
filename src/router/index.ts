import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '@/firebase/init.js';

const DEFAULT_TITLE = 'Distribunity';

/**
 * Website structure:
 * .
 * └── website.com/
 *     ├── blog/
 *     │   ├── 1
 *     │   ├── 2
 *     │   └── ...
 *     ├── resources/
 *     │   ├── faq
 *     │   ├── legal
 *     │   └── contact
 *     ├── login
 *     └── work/
 *         ├── panel
 *         └── settings
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: ['/home'],
      name: 'home-view',
      component: () => import('@/layout/HomeLayout.vue'),
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
                title: 'Distribunity: Resources',
              },
            },
            {
              path: 'legal',
              name: 'legal',
              component: () => import('@/views/home/resources/LegalView.vue'),
              meta: {
                title: 'Distribunity: Legal',
              },
            },
            {
              path: 'impressum',
              alias: 'imprint',
              name: 'impressum',
              component: () => import('@/views/home/resources/ImpressumView.vue'),
              meta: {
                title: 'Distribunity: Impressum',
              },
            },
          ],
        },
        {
          path: 'blog',
          name: 'blog',
          component: () => import('@/views/home/BlogView.vue'),
          meta: {
            title: 'Distribunity: Posts',
          },
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/home/LoginView.vue'),
          meta: {
            title: 'Distribunity: Login',
          },
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/home/SignupView.vue'),
          meta: {
            title: 'Distribunity: Signup',
          },
        },
      ],
    },
    {
      path: '/blog',
      redirect: '/blog?page=1',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/pages/DashboardPage.vue'),
      meta: {
        title: 'Distribunity: Dashboard',
        requiresAuth: true,
      },
    },
    {
      path: '/organization/:organizationId/inventory',
      name: 'organization-inventory',
      component: () => import('@/views/work/WorkPage.vue'),
      meta: {
        requiresAuth: true,
        title: 'Organization inventory',
      },
    },
    {
      path: '/settings',
      name: 'user-settings',
      component: () => import('@/pages/UserSettingsPage.vue'),
      meta: {
        title: 'Distribunity: Settings',
      },
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

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((user) => {
    if (to.meta.requiresAuth && !user) {
      next({ name: 'login', query: { redirect: to.fullPath } });
    } else {
      next();
    }
  });
});

router.afterEach((to) => {
  document.title = to.meta.title && typeof to.meta.title === 'string' ? to.meta.title : DEFAULT_TITLE;
});

export default router;
