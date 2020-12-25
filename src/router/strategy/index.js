import strategyIndex from "@/views/strategy/Strategy";

export default {
  path: "/strategy/index",
  component: strategyIndex,
};

// path里面有children psth这一层也必须有component
// 一般情况下，如果子路由之间没有公用部分，可以不用写component，但是此时必须直接重定向双层 /一层路径/两层路径
// 到子路径

