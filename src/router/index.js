import Vue from "vue";
import VueRouter from "vue-router";
import center from "./routes/center";
import DecorateRouter from './routes/Decorate'
import strategy from "./routes/strategy";
import home from "./routes/home";
Vue.use(VueRouter);
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
const routes = [
  { path: "/", redirect: "/home" },
  center,
  ...DecorateRouter,
  strategy,
  ...home,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;


