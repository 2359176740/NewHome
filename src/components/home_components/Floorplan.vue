<template>
  <div>
    <div class="body">
      <div class="banner">
        <div class="image-inner">
          <div class="top">
            <div class="go iconfont icon-zuojiantou" @click="go()"></div>
            <div
              class="goBackHome iconfont icon-home1"
              @click="goBackHome()"
            ></div>
          </div>
        </div>
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
    <div class="main">
      <div class="house-type">优质户型分析</div>
      <div class="house-type-list">
        <div
          class="house-type-list-inner"
          v-for="item in floorPlans"
          :key="item.areaId"
        >
          <div class="house-type-image">
            <div class="house-type-image-inner">
              <img :src="item.planPic" alt="图片" />
            </div>
          </div>
          <div class="house-type-info">
            <div class="house-type-info-top">{{ item.commName }}</div>
            <div class="house-type-info-bottom">
              {{ item.layout }}<span>{{ item.area }}m<sup>2</sup></span>
            </div>
          </div>
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
      floorPlans: [],
    };
  },
  created() {
    this.$store.commit("setIsFooterShow", false);
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
    ``;
    this.$http
      .get(uri.getAirPortInfo + "?lastpath=decoration/floorplan/home")
      .then((ret) => {
        this.floorPlans = ret.data.showFloorplan.topFloorPlans;
        console.log(this.floorPlans);
      });
  },
  beforeDestroy() {
    this.$store.commit("setIsFooterShow", true);
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    goBackHome() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.body {
  padding-bottom: 18rem;
  width: 100%;
  position: absolute;
  z-index: 9999;
  top: 0;
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
      .top {
        height: 2.5rem;
        width: 100%;
        position: fixed;
        top: 0;
        .go {
          position: absolute;
          left: 5%;
          font-size: 1rem;
          color: #fff;
          line-height: 2.5rem;
          z-index: 99999;
        }
        .goBackHome {
          position: absolute;
          right: 5%;
          font-size: 1.3rem;
          color: #fff;
          line-height: 2.5rem;
        }
      }
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
    top: 75%;
    width: 100%;
    height: 2.6rem;
    .search-input {
      width: 90%;
      height: 100%;
      margin-left: 50%;
      transform: translateX(-50%);
      background: #fff;
      border-radius: 1.3rem;
      overflow: hidden;
      .input-span {
        color: #999;
        font-size: 0.8rem;
        margin-left: 1rem;
        line-height: 2.6rem;
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
.main {
  padding-top: 16rem;
  .house-type {
    font-size: 18px;
    color: #000;
    line-height: 40px;
    margin-left: 5%;
    font-weight: bold;
  }
  .house-type-list {
    width: 100%;
    padding: 0 5%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    padding-top: 0.5rem;
    .house-type-list-inner {
      width: calc(50% - 4px);
      overflow: hidden;
      border-radius: 0.4rem;
      background: #fff;
      box-sizing: border-box;
      margin: 0 0.25rem 0.5rem 0;
      .house-type-image {
        width: 100%;
        .house-type-image-inner {
          width: 100%;
          img {
            width: 100%;
          }
        }
      }
      .house-type-info {
        padding:0.4rem 0.3rem 0.5rem;
        .house-type-info-top {
          font-size: 0.9rem;
          color: #333;
          font-weight: bold;
          line-height: 1rem;
        }
        .house-type-info-bottom {
          font-size: 0.9rem;
          color: #999;
          line-height: 1rem;
          span{
            display: inline-block;
            padding-left: 0.5rem;
          }
        }
      }
    }
  }
}
</style>