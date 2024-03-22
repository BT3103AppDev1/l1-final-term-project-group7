import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/workouts',
      name: 'workouts',
      component: () => import('../views/Workouts.vue')
    },
    {
      path: '/routines',
      name: 'routines',
      component: () => import('../views/Routines.vue')
    },
    {
      path: '/meals',
      name: 'meals',
      component: () => import('../views/Meals.vue')
    },
    {
      path: '/calories',
      name: 'calories',
      component: () => import('../views/Calories.vue')
    },
    {
      path: '/social',
      name: 'social',
      component: () => import('../views/Social.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/About.vue')
    }
  ]
})

export default router
