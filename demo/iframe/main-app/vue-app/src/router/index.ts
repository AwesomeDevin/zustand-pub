import { createRouter, createWebHistory } from 'vue-router'
import VueView from '../views/Vue.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Vue',
      component: VueView
    },
    {
      path: '/react',
      name: 'React',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/React.vue')
    }
  ]
})

export default router
