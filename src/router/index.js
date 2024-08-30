import { createRouter, createWebHistory } from 'vue-router';
import { auth } from '../firebase/init';

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
						},
						{
							path: 'legal',
							name: 'legal',
							component: () => import('@/views/home/resources/LegalView.vue'),
						},
						{
							path: 'impressum',
							alias: 'imprint',
							name: 'impressum',
							component: () => import('@/views/home/resources/ImpressumView.vue'),
						},
					],
				},
				{
					path: 'blog',
					name: 'blog',
					component: () => import('@/views/home/BlogView.vue'),
				},
				{
					path: 'login',
					name: 'login',
					component: () => import('@/views/home/LoginView.vue'),
				},
				{
					path: 'signup',
					name: 'signup',
					component: () => import('@/views/home/SignupView.vue'),
				},
			],
		},
		{
			path: '/blog',
			redirect: '/blog?page=1',
		},
		{
			path: '/work',
			name: 'work-view',
			component: () => import('@/layout/WorkLayout.vue'),
			children: [
				{
					path: '',
					name: 'panel',
					component: () => import('@/views/work/WorkView.vue'),
				},
				{
					path: 'settings',
					name: 'settings',
					component: () => import('@/views/work/ProfileSettingsView.vue'),
				},
			],
			meta: {
				requiresAuth: true,
			},
		},
	],
});

router.beforeEach((to, from, next) => {
	auth.onAuthStateChanged((user) => {
		if (to.meta.requiresAuth && !user) {
			next({ to: '/login', location: to.fullPath });
		} else {
			next();
		}
	});
});

export default router;
