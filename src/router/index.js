import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录' },
    hidden: true
  },
  {
    path: '/',
    name: 'home',
    component: Layout,
    redirect: '/dashboard',
    meta: {
      title: 'Home',
      icon: 'icon-apps'
    },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'Dashboard' }
      }
    ]
  },
  {
    path: '/system',
    name: 'system',
    component: Layout,
    meta: {
      title: '系统管理',
      icon: 'icon-settings'
    },
    children: [
      {
        path: 'user',
        name: 'user',
        component: () => import('@/views/user/index.vue'),
        meta: { title: '用户管理' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
