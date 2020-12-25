import Vue from 'vue'
import VueRouter from 'vue-router'
import centerRouter from '@/router/routers/center.js'
Vue.use(VueRouter)

const routes = [
  ...centerRouter
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
