import Vue from 'vue'
import VueRouter from 'vue-router'
import DecorateRouter from './routes/Decorate'

Vue.use(VueRouter)

const routes = [
    ...DecorateRouter
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router