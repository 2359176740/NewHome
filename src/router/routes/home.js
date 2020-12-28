import home from "@/views/home/Home";
import caselist from "@/components/home_components/Caselist";
import Floorplan from "@/components/home_components/Floorplan";
import Style from "@/components/home_components/Style";

export default [
  {
    path: "/home",
    component: home,
  },
  {path:'/pages/caselist/index',component:caselist},
  {path:'/pages/floorplan/index',component:Floorplan},
  {path:'/pages/Style/index',component:Style},
];
