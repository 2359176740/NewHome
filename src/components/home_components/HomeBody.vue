<template>
  <div>
    <div v-for="(body_arr, index) in $store.state.home_body_arr" :key="index">
      <div class="home-body" v-for="item in body_arr" :key="item[0].nid">
        <!-- 3D模块 -->
        <div class="cart-3d">
          <div class="cart-img" v-show="item[0].img">
            <img :src="item[0].img" alt="图片" />
            <div class="iconfont icon-3D"></div>
          </div>
          <div class="cart-title">{{ item[0].title }}</div>
          <div class="cart-simple">
            {{ item[0].showTagsSimple.join(" ") }}
          </div>
          <div class="cart-auther">
            <img :src="item[0].authorInfo.img" alt="图片" />
            <div class="cart-auther-name">{{ item[0].authorInfo.name }}</div>
            <div class="cart-auther-occupation">
              {{ item[0].authorInfo.designerLabel }}
            </div>
          </div>
        </div>
        <!-- 六张图片 -->
        <div class="cart-gat">
          <div class="cart-img">
            <div class="cart-img-first">
              <img
                v-for="(item, index) in item[1].multiImage.slice(0, 3)"
                :key="index"
                :src="item"
                alt=""
              />
            </div>
            <div
              class="cart-img-first cart-img-last"
              v-show="item[1].length > 3"
            >
              <img
                v-for="(item, index) in item[1].multiImage.slice(3, 6)"
                :key="index"
                :src="item"
                alt=""
              />
            </div>
          </div>
          <div class="cart-title">{{ item[1].title }}</div>
          <div class="cart-simple">
            {{ item[1].showTagsSimple.join(" ") }}
          </div>
          <div class="cart-auther">
            <img :src="item[1].authorInfo.img" alt="图片" />
            <div class="cart-auther-name">{{ item[1].authorInfo.name }}</div>
            <div class="cart-auther-occupation">
              {{ item[1].authorInfo.designerLabel }}
            </div>
          </div>
        </div>
        <!-- 左图片右文字 -->
        <div class="cart-wapper">
          <div class="cart-img">
            <img :src="item[2].coverImage.url" alt="图片" />
          </div>
          <div class="right">
            <div class="cart-title">
              {{ item[2].title }}
            </div>
            <div class="cart-auther">
              <img :src="item[2].authorInfo.img" alt="图片" />
              <div class="cart-auther-name">
                {{ item[2].authorInfo.name }}
              </div>
            </div>
          </div>
        </div>
        <!-- 视频 -->
        <div class="cart-video cart-3d">
          <div class="cart-img" v-show="item[3].img">
            <img :src="item[3].img.url" alt="图片" />
            <div class="iconfont icon-sanjiao"></div>
          </div>
          <div class="cart-title">{{ item[3].title }}</div>
          <div class="cart-auther">
            <img :src="item[3].authorInfo.img" alt="图片" />
            <div class="cart-auther-name">{{ item[3].authorInfo.name }}</div>
            <div class="cart-auther-occupation">
              {{ item[3].authorInfo.designerLabel }}
            </div>
          </div>
        </div>
        <!-- 3D模块 -->
        <div class="cart-3d">
          <div class="cart-img" v-show="item[4].coverImage.url">
            <img :src="item[4].coverImage.url" alt="图片" />
            <div class="iconfont icon-3D"></div>
          </div>
          <div class="cart-title">{{ item[4].title }}</div>
          <div class="cart-simple">
            {{ item[4].showTagsSimple.join(" ") }}
          </div>
          <div class="cart-auther">
            <img :src="item[4].authorInfo.img" alt="图片" />
            <div class="cart-auther-name">{{ item[4].authorInfo.name }}</div>
            <div class="cart-auther-occupation">
              {{ item[4].authorInfo.designerLabel }}
            </div>
          </div>
        </div>
        <!-- 左图片右文字 -->
        <div class="cart-wapper cart-wapper-last">
          <div class="cart-img">
            <img :src="item[5].coverImage.url" alt="图片" />
          </div>
          <div class="right">
            <div class="cart-title">
              {{ item[5].title }}
            </div>
            <div class="recommend">
              推荐理由: {{ item[5].recommendReason.substr(0, 16) }}...
            </div>
            <div class="cart-auther">
              <img :src="item[5].authorInfo.img" alt="图片" />
              <div class="cart-auther-name">
                {{ item[5].authorInfo.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <van-loading size="24px" v-show="this.isLoadingShow" vertical
      >加载中...</van-loading
    >
  </div>
</template>

<script>
import "@/assets/icon/iconfont.css";
import uri from "@/config/uri";
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);

export default {
  data() {
    return {
      home_body_arr: [],
      //获取视窗高度
      clientHeight: 0,
      //loading层
      isLoadingShow: false,
      //防抖
      isNext: true,
    };
  },
  methods: {
    getArr() {
      if (!this.isNext) return;
      this.isNext = false;
      this.$http
        .get(uri.getAirPortInfo + "?lastpath=decoration/home")
        .then((ret) => {
          if (ret.data.showMixrec.list.length < 12) {
            this.isNext = true;
            this.getArr();
          } else {
            let body_arr = [
              [
                ret.data.showMixrec.list.slice(0, 6),
                ret.data.showMixrec.list.slice(6, 12),
              ],
            ];
            this.$store.commit("setHomeBodyArr", [
              ...this.home_body_arr,
              ...body_arr,
            ]);
            this.isLoadingShow = false;
            this.isNext = true;
          }
        });
    },
    fun() {
      //获取文档高度
      let pageHeight = document.documentElement.scrollHeight;
      if (
        pageHeight - this.clientHeight - document.documentElement.scrollTop ===
        0
      ) {
        this.isLoadingShow = true;
        this.getArr();
      }
    },
  },
  created() {
    this.clientHeight = document.documentElement.clientHeight;
    window.addEventListener("scroll", this.fun);
  },
  updated() {
    this.home_body_arr = this.$store.state.home_body_arr;
  },
  beforeDestroy() {
    window.removeEventListener("scroll",this.fun);
  },
};
</script>

<style lang="scss" scoped>
img {
  vertical-align: middle;
}
.home-body {
  padding: 0 17px;
  //3d
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
  }
  //六图
  .cart-gat {
    width: 100%;
    margin-top: 25px;
    .cart-img {
      .cart-img-first {
        width: 100%;
        display: flex;
        justify-content: space-between;
        img {
          padding: 0 2px;
          width: 33.3333333%;
          box-sizing: border-box;
        }
      }
      .cart-img-last {
        padding-top: 5px;
      }
    }
  }
  //左右
  .cart-wapper {
    margin-top: 25px;
    width: 100%;
    height: 122px;
    overflow: hidden;
    .cart-img {
      width: 33.3333%;
      height: 100%;
      float: left;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 66.66666%;
      height: 100%;
      padding-left: 8px;
      box-sizing: border-box;
      float: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .cart-title {
        font-weight: 700;
        font-size: 17px;
        line-height: 28px;
        color: #333;
      }
    }
  }
  // 视频
  .cart-video {
    .cart-img {
      height: 191px;
      img {
        width: 100%;
        height: 100%;
      }
      .iconfont {
        font-size: 27px;
        text-indent: 5px;
      }
    }
  }
  // 左右
  .cart-wapper-last {
    .right {
      .recommend {
        font-size: 13px;
        color: #555;
      }
    }
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
</style>
