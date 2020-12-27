import home from "@/views/home/Home";
import caselist from "@/components/home_components/Caselist";

export default [
  {
    path: "/home",
    component: home,
  },
  {path:'/pages/caselist/index',component:caselist},
];
