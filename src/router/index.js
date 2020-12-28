import Vue from "vue";
import VueRouter from "vue-router";
import center from "./routes/center";
import DecorateRouter from "./routes/decorate";
import strategy from "./routes/strategy";
import home from "./routes/home";

Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  { path: "/", redirect: "/home" },
  ...center,
  ...DecorateRouter,
  strategy,
  ...home,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

//路由守卫
router.beforeEach((to, from, next) => {
  // 告诉系统需要登录的页面有哪些（为了方便）
  let arr = [
    "/attention",
    "/collect",
    "/information",
    "/feedback",
    "/orderForm",
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

export default router;
