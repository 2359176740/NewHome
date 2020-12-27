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
      //文档总高度
      pageHeight: 0,
      //窗口高度
      clientHeight: 0,
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
    getArr() {
      this.$store.commit("setLoadingShow", true);
      this.$http.get(uri.getAirPortInfo).then((ret) => {
        if (ret.data.showMixrec.list.length < 12) {
          this.getArr();
        } else {
          let body_arr = [
            [ret.data.showMixrec.list.slice(0, 6), ret.data.showMixrec.list.slice(6, 12)],
          ];
          this.$store.commit("setHomeBodyArr", body_arr);
          this.$store.commit("setLoadingShow", false);
        }
      });
    },
  },
  created() {
    window.addEventListener("scroll", () => {
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