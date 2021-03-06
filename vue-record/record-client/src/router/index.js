import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index'
import Info from '@/views/info/info'
import Detail from '@/views/detail/detail'
import MyPublish from '@/views/myPublish/myPublish'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path:'/home',
        redirect: '/home/community'
      },
      {
        path:'/home/community',
        name: 'community',
        component: () => import('@/views/community/community')
      },
      {
        path:'/home/publish',
        name: 'publish',
        component: () => import('@/views/publish/publish')
      },
      {
        path: '/home/mine',
        name: 'mine',
        component: () => import('@/views/mine/mine'),
      },
      {
        path: '/home/search',
        name: 'search',
        component: () => import('@/views/search/search'),
      }
    ]
  },
  {
    path: '/info',
    name: 'info',
    component: Info
  },
  {
    path: '/detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/myPublish',
    name: 'myPublish',
    component: MyPublish
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
