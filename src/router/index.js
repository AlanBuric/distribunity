import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

/**
 * TODO: Say you connect directly to a route URL that's not the home one for the 
 * first time. I assume the HomeView will be redundantly automatically loaded 
 * because it's not lazy loaded like the rest. Should all routes therefore be
 * lazy loaded?
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/resources',
      name: 'resources',
      component: () => import('../views/ResourcesView.vue')
    },
    {
      path: '/news/:page',
      name: 'news',
      component: () => import('../views/NewsView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../views/SignupView.vue')
    }
  ]
});

export default router