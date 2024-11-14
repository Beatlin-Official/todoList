import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import PokemonView from '../views/PokemonView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: TodoView
    },
    {
      path: '/handbook',
      name: 'Handbook',
      component: () => import('../views/HandbookView.vue'),
    },
    {
      path: '/pokemon/:slug(\\d+)',//僅匹配數字
      name: 'Pokemon',
      component: PokemonView,
    },
  ]
})

export default router
