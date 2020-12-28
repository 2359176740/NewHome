<template>
  <div>
    <div class="top">
      <div class="main">
        <van-search v-model="value" placeholder="搜索" shape="round" />
        <div class="grid">
          <div class="grid_in">
            <div
              class="grid_item"
              v-for="(item, index) in icon_list"
              :key="index"
              @click="changeUrl(item.resourceType)"
            >
              <div class="icon">
                <img :src="item.imgUrl" alt="图片" />
              </div>
              <div class="text">{{ item.text }}</div>
            </div>
          </div>
        </div>
        <div class="swiper">
          <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in banner_list" :key="item.id"
              ><img :src="item.banner" alt="图片"
            /></van-swipe-item>
          </van-swipe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import uri from "@/config/uri.js";
import { Search, Swipe, SwipeItem } from "vant";

Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  data() {
    return {
      value: "",
      banner_list: [],
      icon_list: [],
    };
  },
  methods: {
    getArr() {
      this.$store.commit("setLoadingShow", true);
      this.$http
        .get(uri.getAirPortInfo + "?lastpath=decoration/home")
        .then((ret) => {
          if (ret.data.showMixrec.list.length < 12) {
            this.getArr();
          } else {
            this.banner_list = ret.data.showBanner;
            this.icon_list = ret.data.showDiamondzone.result;
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
    changeUrl(type) {
      switch (type) {
        case 'FindCaseList':
          this.$router.push("/pages/caselist/index");
          break;

        case 'FindPicList':
          this.$router.push("/pages/caselist/index");
          break;

        case 'shopList':
          this.$router.push("/decorate");
          break;

        case 'FindDesigner':
          this.$router.push("/decoration/designerlistpage");
          break;

        case 'floorPlanSearchTool':
          this.$router.push("/pages/floorplan/index");
          break;

        case 'styleTestTool':
          this.$router.push("/pages/Style/index");
          break;

        case 'detailedList':
          this.$router.push("/pages/caselist/index");
          break;

        case 'QuotedTool':
          this.$router.push("/pages/caselist/index");
          break;
      }
    },
  },
  created() {
    this.getArr();
  },
};
</script>

<style lang="scss" scoped>
.top {
  background: rgb(243, 245, 251);
  .main {
    padding-bottom: 20px;
    margin-bottom: 10px;
    .van-search {
      background: rgb(243, 245, 251);
      .van-search__content {
        background: #fff;
      }
    }
    .grid {
      padding: 0 17px;
      height: 116px;
      .grid_in {
        width: auto;
        .grid_item {
          width: 25%;
          height: 56px;
          text-align: center;
          display: inline-block;
          .icon {
            margin-top: 4px;
            height: 40px;
            img {
              width: 40px;
              vertical-align: middle;
            }
          }
          .text {
            height: 12px;
            font-size: 12px;
            line-height: 12px;
          }
        }
      }
    }
    .swiper {
      padding: 18px 15px 0;
      height: 87px;
      //轮播图样式
      .my-swipe {
        color: #fff;
        font-size: 20px;
        height: 87px;
        line-height: 87px;
        text-align: center;
        background-color: #39a9ed;
        border-radius: 10px;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>