import { createRouter, createWebHistory } from 'vue-router'
import TodoView from '../views/TodoView.vue'
import PokemonView from '../views/PokemonView.vue'
import HandbookView from '../views/HandbookView.vue'
import PokemonListView from '../views/PokemonListView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Todo',
      component: TodoView,
    },
    {
      path: '/handbook/',//僅匹配數字
      name: 'Handbook',
      component: HandbookView,
      alias:['/handbook'],
      // redirect:'/handbook/1',
      // children:[{
      //   path:':page(\\d+)',
      //   name: 'HandBookPage',
      //   component: PokemonListView
      // }]
    },
    {
      path: '/pokemon/:slug(\\d+)',//僅匹配數字
      name: 'Pokemon',
      component: PokemonView,
    },,
    {
      path: '/:notfound(.*)*',//僅匹配數字
      name: '404',
      component: NotFoundView,
    },
  ]
})

export default router
