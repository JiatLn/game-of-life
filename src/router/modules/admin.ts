import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: '404',
    component: () => import('@/pages/Error/NotFound.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: {
      name: '404',
    },
  },
]

export default routes
