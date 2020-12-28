<template>
  <div>
    <div class="body">
      <div class="banner">
        <div class="image-inner"></div>
      </div>
      <div class="banner-text">
        <div class="banner-title">户型评测及优化</div>
        <div class="banner-title">1秒出结果</div>
        <div class="banner-span">测评你的户型风水、采光通风等</div>
      </div>
      <div class="search-warp">
        <div class="search-input">
          <div class="input-span iconfont icon-sousuo"></div>
          <div class="input-text">请输入小区名</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import uri from "@/config/uri.js";
import "@/assets/iconfont/iconfont.css";
export default {
  data() {
    return {
      topFloorPlans: [],
    };
  },
  created() {
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);``
    this.$http
      .get(uri.getAirPortInfo + "?lastpath=decoration/floorplan/home")
      .then((ret) => {
        this.topFloorPlans = ret.data.showFloorplan.topFloorPlans;
        this.bannerUrl = ret.data.showFloorplan.banner;
        console.log(this.topFloorPlans);
      });
  },
};
</script>

<style lang="scss" scoped>
.body {
  padding-bottom: 17rem;
  position: relative;
  box-sizing: border-box;
  background: red;
  overflow: hidden;
  .banner {
    position: absolute;
    width: 100%;
    height: 100%;
    .image-inner {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-repeat: no-repeat;
      background-image: url(https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=2609627037,301415242&fm=179&app=35&f=PNG?w=1242&h=993&s=BB85136E4B27473E5807AE7F03004039);
      background-position: center center;
    }
  }
  .banner-text {
    position: absolute;
    top: 33%;
    left: 5%;
    .banner-title {
      font-weight: 700;
      font-size: 1.5rem;
      line-height: 2rem;
      margin-top: rem;
      color: #fff;
    }
    .banner-span {
      font-size: 0.7rem;
      color: #fff;
      margin-top: 0.5rem;
    }
  }
  .search-warp {
    position: absolute;
    top: 70%;
    width: 100%;
    height: 2.4rem;
    .search-input {
      width: 80%;
      height: 100%;
      margin-left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 1.2rem;
      overflow: hidden;
      .input-span {
        color: #999;
        font-size: 0.8rem;
        margin-left: 1rem;
        line-height: 2.4rem;
        display: inline-block;
      }
      .input-text {
        display: inline-block;
        color: #999;
        font-size: 0.8rem;
        margin-left: 1rem;
      }
    }
  }
}
</style>