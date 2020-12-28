<template>
  <div>
    <div class="banner">
      <div>8秒免费获取装修报价</div>
    </div>
    <div class="main">
      <van-cell is-link title="房屋城市" @click="show = true" />
      <van-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <van-field
        v-model="value"
        label="房屋面积"
        placeholder="90m^2"
        input-align="right"
      />
      <van-cell is-link title="户型选择" @click="show = true" />
      <van-action-sheet v-model="show" :actions="actions1" @select="onSelect" />
      <van-button
        round
        color=" rgb(235, 15, 143)"
        type="primary"
        size="large"
        style="width: 90%; height: 50px; margin-left: 5%"
        >免费获取报价明细</van-button
      >
    </div>
    <div class="image" v-for="(item, index) in coContent" :key="index">
      <img :src="item" alt="" />
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import uri from "@/config/uri";
import { ActionSheet, Cell, Toast, Button } from "vant";
import { Field } from "vant";

Vue.use(Field);
Vue.use(ActionSheet);
Vue.use(Cell);
Vue.use(Toast);
Vue.use(Button);
export default {
  data() {
    return {
      value: "",
      show: false,
      actions: [{ name: "北京" }, { name: "西安" }, { name: "上海" }],
      actions1: [
        { name: "三室二厅一卫" },
        { name: "二室二厅一卫" },
        { name: "二室一厅一卫" },
        { name: "二室一卫" },
        { name: "一室一厅一卫" },
      ],
      coContent: [],
    };
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false;
      Toast(item.name);
    },
  },
  created() {
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
    this.$http
      .get(
        uri.getAirPortInfo +
          "?lastpath=decoration/tool/quote/page&&uuid=178089129068b7e9e10bbe302ab0399f10665a5e99&referer=shop%2Flist%3F&referlid=1780891290788b5fdc779e1f7178b147868eb3780b&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&selectArea=131&cbdid=NTJERjRFREUxMjgxNDU5OEU3NUQ1MkVDQTJCMDA2RDk&toolCard=1&components=toolCard&jpath=DZ3&title=%E6%8A%A5%E4%BB%B7%E5%B7%A5%E5%85%B7&path=%2Fdecoration%2Ftool%2Fquote%2Fpage&jzts=1608978137556_0.6259219814197128&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
      )
      .then((ret) => {
        this.coContent = ret.data.showToolquotepage.coContent;
      });
  },
};
</script>
<style lang="scss" scoped>
.banner {
  margin-top: 50px;
  width: 100%;
  height: 120px;
  background-size: 100% 100%;
  background-image: url(https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1541231697,975491043&fm=179&app=35&f=PNG?w=1242&h=600&s=161606644A09637A0C2875430300A0F0);
  div {
    font-family: PingFangSC-Semibold;
    color: #fff;
    font-size: 30px;
    line-height: 120px;
    text-align: center;
  }
}
.image {
  width: 90%;
  height: 150px;
  margin-left: 5%;
  img {
    width: 100%;
  }
}
</style>