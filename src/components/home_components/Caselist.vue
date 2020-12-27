<template>
  <div>
    <HomeTop />
    <div class="main">
      <van-tabs
        v-model="active"
        title-inactive-color="#555"
        title-active-color="red"
        line-height="0"
        @click="onClick1"
      >
        <van-tab title="全部" :title-style="titleStyle"></van-tab>
        <van-tab title="简约" :title-style="titleStyle"></van-tab>
        <van-tab title="现代" :title-style="titleStyle"></van-tab>
        <van-tab title="中式" :title-style="titleStyle"></van-tab>
        <van-tab title="欧式" :title-style="titleStyle"></van-tab>
        <van-tab title="美式" :title-style="titleStyle"></van-tab>
        <van-tab title="田园" :title-style="titleStyle"></van-tab>
      </van-tabs>
      <van-tabs
        v-model="active1"
        title-inactive-color="#555"
        title-active-color="red"
        line-height="0"
        @click="onClick2"
      >
        <van-tab title="全部" :title-style="titleStyle"></van-tab>
        <van-tab title="小于5平米" :title-style="titleStyle"></van-tab>
        <van-tab title="5-10平米" :title-style="titleStyle"></van-tab>
        <van-tab title="10-30平米" :title-style="titleStyle"></van-tab>
        <van-tab title="30-60平米" :title-style="titleStyle"></van-tab>
        <van-tab title="60-90平米" :title-style="titleStyle"></van-tab>
        <van-tab title="150平米以上" :title-style="titleStyle"></van-tab>
      </van-tabs>
      <van-tabs
        v-model="active2"
        title-inactive-color="#555"
        title-active-color="red"
        line-height="0"
        @click="onClick3"
      >
        <van-tab title="全部" :title-style="titleStyle"></van-tab>
        <van-tab title="一居室" :title-style="titleStyle"></van-tab>
        <van-tab title="二居室" :title-style="titleStyle"></van-tab>
        <van-tab title="三居室" :title-style="titleStyle"></van-tab>
        <van-tab title="四居室" :title-style="titleStyle"></van-tab>
        <van-tab title="别墅" :title-style="titleStyle"></van-tab>
        <van-tab title="小户型" :title-style="titleStyle"></van-tab>
      </van-tabs>
      <van-tabs
        v-model="active3"
        title-inactive-color="#555"
        title-active-color="red"
        line-height="0"
        @click="onClick4"
      >
        <van-tab title="全部" :title-style="titleStyle"></van-tab>
        <van-tab title="3D漫游" :title-style="titleStyle"></van-tab>
      </van-tabs>
      <van-loading size="24px" v-show="isLoadingTop" vertical>加载中</van-loading>

      <div class="body" v-show="!isLoadingTop" v-for="(item, index) in list" :key="index">
        <!-- 3D模块 -->
        <div class="cart-3d">
          <div class="cart-img" v-show="item.img">
            <img :src="item.img" alt="图片" />
            <div class="iconfont icon-3D"></div>
          </div>
          <div class="cart-title">{{ item.title }}</div>
          <div class="cart-simple">
            {{ item.showTagsSimple.join(" ") }}
          </div>
          <div class="cart-auther">
            <img :src="item.authorInfo.img" alt="图片" />
            <div class="cart-auther-name">{{ item.authorInfo.name }}</div>
            <div class="cart-auther-occupation">
              {{ item.authorInfo.designerLabel }}
            </div>
          </div>
        </div>
      </div>
      <van-loading size="24px" v-show="isLoading" vertical>加载中</van-loading>
    </div>
  </div>
</template>

<script>
import HomeTop from "@/components/home_components/headers/Hometop";
import uri from "@/config/uri.js";
import Vue from "vue";
import { Tab, Tabs, Loading } from "vant";

Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Loading);

export default {
  data() {
    return {
      active: 0,
      active1: 0,
      active2: 0,
      active3: 0,
      //列表数据
      list: [],
      //窗口高度
      screenHeight: 0,
      //防抖
      isNext: true,
      //loading是否显示
      isLoading: false,
      isLoadingTop: false,
      //参数
      decorationStyle: "",
      decorationAreaSize: "",
      decorationLayout: "",
      //合并参数
      decoration: "",

      titleStyle: {
        background: "#f4f4f4",
        "border-radius": "15px",
        padding: "0 15px",
        height: "30px",
        display: "inline-block",
        margin: "10px 5px 0 0",
        "line-height": "30px",
        "text-align": "center",
      },
    };
  },
  components: {
    HomeTop,
  },
  created() {
    this.$store.commit("setIsFooterShow", false);
    this.$store.commit("setIsGo", true);
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setSearch", true);
    //获取视窗窗口高度
    this.screenHeight = document.documentElement.clientHeight;
    this.$http.get(uri.getCaseList).then((ret) => {
      this.list = ret.data.showCaselist.list;
    });
    window.addEventListener("scroll", () => {
      //获取文档总高度
      let pageHeight = document.documentElement.scrollHeight;
      if (
        document.documentElement.scrollTop + this.screenHeight ===
        pageHeight
      ) {
        if (!this.isNext) {
          return;
        } else {
          this.isLoading = true;
          this.isNext = false;
          this.$http.get(uri.getCaseList + this.decoration).then((ret) => {
            this.list = [...this.list, ...ret.data.showCaselist.list];
            this.isNext = true;
            this.isLoading = false;
          });
        }
      }
    });
  },
  methods: {
    //点击时获取数据
    onClick1(name, title) {
      this.decorationStyle = title;
      this.mergeDecoration();
      this.getList();
    },
    onClick2(name, title) {
      this.decorationAreaSize = title;
      this.mergeDecoration();
      this.getList();
    },
    onClick3(name, title) {
      this.decorationLayout = title;
      this.mergeDecoration();
      this.getList();
    },
    onClick4(name, title) {
      this.mergeDecoration();
      this.getList();
    },
    //合并数据
    mergeDecoration() {
      this.decoration = `?decorationStyle=${this.decorationStyle}&
      decorationAreaSize=${this.decorationAreaSize}&
      decorationLayout=${this.decorationLayout}
      `;
    },
    //请求数据
    getList() {
      this.isLoadingTop = true
      this.$http.get(uri.getCaseList + this.decoration).then((ret) => {
        this.list = ret.data.showCaselist.list;
        this.isLoadingTop = false
      });
    },
  },
  beforeDestroy() {
    this.$store.commit("setIsFooterShow", true);
    this.$store.commit("setIsGo", false);
    this.$store.commit("setIsGoBackHome", false);
    this.$store.commit("setSearch", false);
  },
};
</script>

<style lang="scss" scoped>
.main {
  padding: 0 17px;
  .cart-3d {
    width: 100%;
    margin-top: 25px;
    .cart-img {
      height: 228px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .iconfont {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #fff;
      width: 48px;
      height: 48px;
      font-size: 30px;
      line-height: 48px;
      text-align: center;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 50%;
    }
    .cart-img {
      border-radius: 10px;
      width: 100%;
      overflow: hidden;
      position: relative;
    }
    .cart-title {
      font-size: 18px;
      font-weight: bold;
      line-height: 34px;
    }
    .cart-simple {
      font-size: 14px;
      color: rgb(153, 153, 153);
    }
    .cart-auther {
      img {
        border-radius: 50%;
        width: 21px;
        height: 21px;
        vertical-align: middle;
      }
      .cart-auther-name {
        display: inline-block;
        margin: 0 5px;
        font-size: 12px;
        color: #999;
      }
      .cart-auther-occupation {
        border: 1px solid #b3d4f3;
        color: #2b99ff;
        display: inline-block;
        font-size: 10px;
        line-height: 12px;
        margin-bottom: 0;
        vertical-align: middle;
      }
    }
  }
}
</style>