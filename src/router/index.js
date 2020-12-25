import Vue from "vue";
import VueRouter from "vue-router";
import Strategy from "@/router/strategy/index";
// import strategyIndex from "@/views/strategy/index";

Vue.use(VueRouter);

const routes = [
  // 错误实例：重定向一个路径这个路径必须有自己对应的规则和组件，不能直接重定向，然后展示这个规则下的components
  // {
  //   path: "/",
  //   redirect: "/strategy",
  //   component: strategyIndex,
  // },
  {
    path: "/",
    redirect: "/strategy/index",
  },
  // {
  //   path: "/strategy",
  //   component: strategyIndex,
  // },
  Strategy,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
