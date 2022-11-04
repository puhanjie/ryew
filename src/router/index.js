import { createRouter, createWebHashHistory } from 'vue-router';
import Layout from '@/layout/index.vue';

const routes = [
  {
    path: '/',
    name: 'layout',
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
      },
      {
        path: 'page1',
        name: 'page1',
        component: () => import('@/views/page1/index.vue'),
        meta: { title: 'Page1' }
      },
      {
        path: 'page2',
        name: 'page2',
        component: () => import('@/views/page2/index.vue'),
        meta: { title: 'Page2' }
      }
    ]
  },
  {
    path: '/submenu',
    name: 'submenu',
    component: Layout,
    meta: {
      title: 'Submenu',
      icon: 'icon-common'
    },
    children: [
      {
        path: 'menuitem',
        name: 'menuitem',
        component: () => import('@/views/menuitem/index.vue'),
        meta: { title: 'Menuitem' }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
