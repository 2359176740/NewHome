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
  routes,


})
//路由守卫
router.beforeEach((to, from, next) => {
  // 告诉系统需要登录的页面有哪些（为了方便）
  let arr = [
    "/attention",
    "/collect",
    "/information",
    "/feedback",
    "/orderForm"
    //...
  ];
  if (arr.includes(to.path) && !localStorage.getItem("jwt")) {
    // 登录去
    router.push({ path: "/login", query: { toUrl: to.fullPath } });
  } else {
    // 不用登录
    next();
  }
});

export default router
