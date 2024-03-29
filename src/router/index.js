import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('@/views/Todo/Todo')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test/Test')
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes: routes
})

export default router
