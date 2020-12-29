<template>
  <div>
    <van-tabs v-model="active" @click="onClick" :class="{ active: isActive }">
      <van-tab title="推荐" />
      <van-tab title="客厅" />
      <van-tab title="卧室" />
      <van-tab title="厨房" />
      <van-tab title="卫生间" />
    </van-tabs>
    <van-loading size="24px" vertical v-show="this.$store.state.isLoadingShow"
      >加载中...</van-loading
    >
  </div>
</template>

<script>
import Vue from "vue";
import uri from "@/config/uri";
import { Tab, Tabs, Loading } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Loading);
export default {
  data() {
    return {
      active: 0,
      isActive: false,
      //点击导航的下标
      clickName: 0,
    };
  },
  methods: {
    onClick(name, title) {
      if (this.clickName == name) {
        return;
      } else {
        this.clickName = name;
        this.getArr();
      }
    },
    //首屏以及点击中间导航时获取的第一屏数据
    getArr() {
      this.$store.commit("setLoadingShow", true);
      this.$http
        .get(uri.getAirPortInfo + "?lastpath=decoration/home")
        .then((ret) => {
          if (ret.data.showMixrec.list.length < 12) {
            this.getArr();
          } else {
            //设定banner
            this.$store.commit("setBanner", ret.data.showBanner);
            //设定头部8个图标
            this.$store.commit("setIcon", ret.data.showDiamondzone.result);
            let body_arr = [
              [
                ret.data.showMixrec.list.slice(0, 6),
                ret.data.showMixrec.list.slice(6, 12),
              ],
            ];
            this.$store.commit("setHomeBodyArr", body_arr);
            this.$store.commit("setLoadingShow", false);
          }
        });
    },
  },
  created() {
    //获取首页第一屏数据
    this.getArr();
    this.clientHeight = document.documentElement.clientHeight;
    window.addEventListener("scroll", () => {
      //粘性布局
      if (document.documentElement.scrollTop > 354) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
.van-tab--active {
  font-weight: bold;
}
.van-tabs {
  margin-bottom: 5px;
}
.active {
  position: fixed;
  top: 39px;
  z-index: 999;
  width: 100%;
}
</style>