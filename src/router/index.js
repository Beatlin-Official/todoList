import { createRouter, createWebHistory } from 'vue-router'
import { ref } from 'vue'
import TodoView from '../views/TodoView.vue'
import PokemonView from '../views/PokemonView.vue'
import HandbookView from '../views/HandbookView.vue'
import PokemonListView from '../views/PokemonListView.vue'
import NotFoundView from '../views/NotFoundView.vue'
import TestE from '@/views/TestE.vue'
import Member from '@/views/MemberView.vue'
import Login from '@/views/LoginView.vue'
import Dashboard from '@/views/DashboardView.vue'
import Post from '@/views/PostView.vue'
const isAuthenticated = ref(false)


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
    },
    {
      path: '/test',
      name: 'test',
      component: TestE,
    },
    {
      path: '/member/',
      name: 'Member',
      component: Member,
      children:[
        {
          path:'dashboard',
          name:'Dashboard',
          component: Dashboard,
        },
        {
          path:'post',
          name:'Post',
          component: Post,
        }
      ]
    },
    { 
      path: "/login", 
      name: "Login", 
      component: Login 
    },
    {
      path: '/:notfound(.*)*',
      name: '404',
      component: NotFoundView,
    },
  ]
})
 
router.beforeEach(async (to, from) => {
  if(!isAuthenticated.value && to.name =='Dashboard'){
      return  { name: 'Login'}
  }
})
// 

export default router
