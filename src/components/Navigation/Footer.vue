<template>
  <van-tabbar
    v-model="$store.state.footerActive"
    v-show="$store.state.isFooterShow"
    active-color="red"
    placeholder
    @change="onChange"
  >
    <van-tabbar-item
      ><van-icon
        class="iconfont icon-home"
        slot="icon"
        size="1.1rem"
      />首页</van-tabbar-item
    >
    <van-tabbar-item
      ><van-icon
        class="iconfont icon-gonglve"
        slot="icon"
        size="1.1rem"
      />攻略</van-tabbar-item
    >
    <van-tabbar-item
      ><van-icon
        class="iconfont icon-zhuangxiu"
        slot="icon"
        size="1.1rem"
      />装修</van-tabbar-item
    >
    <van-tabbar-item
      ><van-icon
        class="iconfont icon-weibiaoti2fuzhi12"
        slot="icon"
        size="1.1rem"
      />我的</van-tabbar-item
    >
  </van-tabbar>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem, Icon } from "vant";
import "@/assets/icon/iconfont.css";
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Icon);
export default {
  data() {
    return {
      path: ["/", "/strategy/index", "/decorate", "/my/index"],
      headName: ["装馨家", "攻略", "找装修", "个人中心"],
    };
  },
  created() {
    let active =
      this.path.indexOf(this.$route.path) >= 0
        ? this.path.indexOf(this.$route.path)
        : 0;
    this.$store.commit("setFooterActive", active);
  },
  methods: {
    onChange(index) {
      this.$router.push(this.path[index]);
      this.$store.commit("setHeadName", this.headName[index]);
    },
     showSearch() {
      if (document.documentElement.scrollTop > 80) {
        this.$store.commit("setSearch", true);
      } else {
        this.$store.commit("setSearch", false);
      }
    },
  },
  watch: {
    $route: {
      handler(val) {
        switch (val.fullPath) {
          case "/home":
            this.$store.commit("setFooterActive", 0);
            break;
          case "/strategy/index":
            this.$store.commit("setFooterActive", 1);
            break;
          case "/decorate":
            this.$store.commit("setFooterActive", 2);
            break;
          case "/my/index":
            this.$store.commit("setFooterActive", 3);
            break;
          default :
            this.$store.commit("setFooterActive", 0);
            break

        }
      },
      deep: true,
    },
  },
 
};
</script>