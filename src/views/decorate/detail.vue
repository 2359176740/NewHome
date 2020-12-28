<template>
  <div>
    <detailHeader />
    <div class="banner" style="margin-top:40px;">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item
          v-for="(item, index) in bannerList"
          :key="index"
          style="line-height: 15px"
          width="100%"
          height="60px"
        >
          <img :src="item.image.contentUrl" alt="" height="100%" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="store">
      <div class="detail">
        <div class="logo">
          <img :src="showShopdetail.logo" alt="" />
        </div>
        <div style="margin-roght: 5%">
          <h4 class="name">{{ showShopdetail.title }}</h4>
          <div>
            <span
              v-for="(item, index) in showShopdetail.subtitle"
              :key="index"
              >{{ item + "   " }}</span
            >
          </div>
        </div>
      </div>
      <div class="card">
        <div
          style="
            border: 1px solid #000000;
            border-radius: 5px;
            padding: 3px;
            margin: 3px;
          "
        >
          <h3>公司简介</h3>
          <div>
            <div
              v-for="(item, index) in shopTopAttriDesc"
              :key="index"
              style="font-size: 13px"
            >
              <span>{{ item.name + "；" }}</span
              ><span>{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="showmont">
      <h4>工地现场展示</h4>
      <div class="show" v-for="(item, index) in showMomentlist" :key="index">
        <div class="author">
          <img :src="item.authorInfo.poster" alt="" class="photo" />
          <span style="font-size: 10px">{{ item.authorInfo.name + "  " }}</span>
          <span style="font-size: 10px; background: skyblue">{{
            item.authorInfo.designerLabel
          }}</span
          ><br />
          <span style="font-size: 10px; padding-left: 15%">{{
            item.updateTimeText
          }}</span>
        </div>
        <div class="showphoto">
          <div style="padding-left:5%;margin-right:5%;">{{ item.content }}</div>
          <div style="margin-left: 5%">
            <span v-for="(val, key) in item.media" :key="key">
              <img
                :src="val.contentUrl"
                alt=""
                width="30%"
                style="margin-right: 2%"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="showcase">
      <h4>看案例</h4>
      <div class="case" v-for="(item, index) in showCaselist" :key="index">
        <span>
          <img
            :src="item.img"
            alt=""
            width="94%"
            style="padding-left: 3%; border-radius: 5px 5px 5px 5px"
          />
        </span>
        <div
          class="title"
          style="
            padding-left: 3%;
            font-size: 16px;
            font-weight: 900;
            font-family: '宋体';
            margin-top: 10px;
            margin-bottom: 20px;
          "
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import uri from "@/config/uri";
import detailHeader from "@/components/Navigation/detailHeader";
import { Swipe, SwipeItem } from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
export default {
  data() {
    return {
      bannerList: {},
      showShopdetail: {},
      showMomentlist: [],
      shopTopAttriDesc: [],
      subtitle: [],
      showCaselist: [],
    };
  },
  components: {
    detailHeader,
  },
  created() {
    this.$http
      .get(
        uri.getAirPortInfo +
          "?lastpath=decoration/shopdetail&&uuid=1780891290ba340a57ec33d352ce0a10499197f981&referer=shop%2Flist%2Ffullset%3F&referlid=17808912900de1203ba981ca0df5608af0e0d378c7&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&from_service=1&selectArea=131&cbdid=NTJERjRFREUxMjgxNDU5OEU3NUQ1MkVDQTJCMDA2RDk&jpath=DZ1_M1&nid=81159000794379_sp_midplat&rank=0&refer_pagenum=0&imageType=case%2CimageGallery%2Ccase&imageNids=88403092792876_cs_midplat%2C85200084272610_ig_midplat%2C89195423700272_cs_midplat&path=%2Fdecoration%2Fshopdetail&split=1&jzts=1608967270114_0.9150857234187475&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
      )
      .then((ret) => {
        console.log(ret);
        this.bannerList = ret.data.showShopdetail.bannerList.list;
        this.showShopdetail = ret.data.showShopdetail;
        this.showMomentlist = ret.data.showMomentlist.list;
        this.shopTopAttriDesc = ret.data.showShopdetail.shopTopAttriDesc;
        this.showCaselist = ret.data.showCaselist.list;
      });
  },
};
</script>
<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.detail {
  display: flex;
  justify-content: space-around;
}
.logo {
  width: 15%;
  height: 56px;
  border-radius: 50%;
  margin-top: 5px;
  margin-left: 5%;
  border: 1px solid #000000;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
.photo {
  width: 10%;
  height: 35px;
  border-radius: 50%;
  margin-top: 5px;
  margin-left: 5%;
  border: 1px solid #000000;
  vertical-align: middle;
}
</style>