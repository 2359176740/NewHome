<template>
  <div>
    <div class="top">
      <h1>我的订单</h1>
      <div class="iconfont icon-weibiaoti- fr"></div>
    </div>
    <van-tabs @click="onClick">
      <van-tab title="全部订单"></van-tab>
      <van-tab title="已预约"></van-tab>
      <van-tab title="已咨询"></van-tab>
    </van-tabs>
    <van-loading vertical type="spinner" size="24px" />
  </div>
</template>
<script >
import Vue from "vue";
import { Tab, Tabs, Loading } from "vant";

Vue.use(Loading);
Vue.use(Tab);
Vue.use(Tabs);
export default {
  methods: {
    onClick(name, title) {},
  },
};
</script>
<style lang="scss" scoped>
.fr {
  float: right;
  font-size: 18px;
  margin-top: 6px;
  margin-right: 24px;
  font-weight: 600;
}

h1 {
  float: left;
  text-align: center;
  font-size: 18px;
  width: 120px;
  line-height: 30px;
  margin-left: 110px;
}

.top {
  height: 36px;
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
}
</style>