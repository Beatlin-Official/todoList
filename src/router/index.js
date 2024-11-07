import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: TodoView
    },
    {
      path: '/handbook/:slug(\\d+)',//僅匹配數字
      name: 'Pokemon',
      strict: true,
      component: () => import('../views/PokemonView.vue'),
    },
    {
      path: '/handbook',
      name: 'Handbook',
      component: () => import('../views/HandbookView.vue'),
    }
  ]
})

export default router
