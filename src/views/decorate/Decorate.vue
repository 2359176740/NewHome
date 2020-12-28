<template>
  <div class="container">
    <div class="header">
      <div
        v-for="(item, index) in showDiamondzone.result"
        :key="index"
        class="header-cell"
        @click="tolist(item.url.path, item.url.params, item.text)"
      >
        <div class="img">
          <img :src="item.imgUrl" alt="" />
        </div>
        <div class="header-name">{{ item.text }}</div>
      </div>
    </div>
    <!--  -->
    <div class="store">
      <div class="newstore">
        <div class="newstore-top">新店推荐</div>
        <div class="newstore-footer">发现优质新店</div>
      </div>
      <div class="site">
        <div class="site-top">优选工地</div>
        <div class="site-footer">围观装修工地</div>
      </div>
    </div>
    <div class="menu">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item title="装修户型" ref="item">
          <div class="zhuang">
            <div>
              <h3>装修户型</h3>
              <van-button
                round
                type="info"
                color="#f0f0f0"
                v-for="(item, index) in option2"
                :key="index"
                >{{ item.text }}</van-button
              >
            </div>
          </div>
        </van-dropdown-item>
        <van-dropdown-item title="更多筛选" ref="item">
          <div v-for="(item, index) in option3" :key="index">
            <h3>{{ item.text }}</h3>
            <van-button
              round
              type="info"
              color="#f0f0f0"
              v-for="(val, key) in item.options"
              :key="key"
              >{{ val.text }}</van-button
            >
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </div>
    <div class="show-list">
      <div
        class="shop"
        v-for="(item, index) in showShoplist"
        :key="index"
        @click="todetail(item.itemUrl.path)"
      >
        <div class="logo">
          <img :src="item.logo" alt="" style="" />
        </div>
        <div class="detail">
          <div class="name">{{ item.name }}</div>
          <div>
            <span v-if="item.capacityTag" style="font-size: 12px">{{
              item.capacityTag[0] + " "
            }}</span>
            <span style="font-size: 12px">{{ "  " + item.recentSubmit }}</span>
          </div>
          <div>
            <span
              v-for="(val, key) in item.serviceTag"
              :key="key"
              style="font-size: 12px"
              >{{ val }}
            </span>
          </div>
          <div class="ban">
            <span v-for="(v, k) in item.imageList" :key="k">
              <img :src="v.src.url" alt="" height="100%" width="100%" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import uri from "@/config/uri";
import { DropdownMenu, DropdownItem, Button } from "vant";

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Button);
export default {
  data() {
    return {
      showDiamondzone: {},
      showFilter: {},
      option2: {},
      option3: {},
      showRecommendzone: {},
      viewlog: {},
      showShoplist: [],
      value1: "a",
      option1: [
        { text: "综合排序", value: "a" },
        { text: "人气优先", value: "b" },
        { text: "距离优先", value: "c" },
      ],
    };
  },
  methods: {
    search(value) {},
    getData(id) {
      this.$http.get(uri.getAirPortInfo + id).then((ret) => {
        this.showDiamondzone = ret.data.showDiamondzone;
        this.showFilter = ret.data.showFilter;
        this.option2 = this.showFilter.result[1].options[0].options;
        this.option3 = this.showFilter.result[2].options;
        let list = ret.data.showShoplist.list.splice(5, 1);
        this.showShoplist = ret.data.showShoplist.list;
      });
    },
    tolist(path, params, text) {
      this.$router.push(path);
    },
    todetail(path) {
      this.$router.push(path);
    },
  },
  created() {
    this.$store.commit("setFooterActive", 2);
    //头部内容显示
    this.$store.commit('setHeadName','装修');
     this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
    this.getData(
      "?lastpath=decoration/shop/list&&jzts=1608861881051_0.041307916006790846&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=pc"
    );
  },
  mounted() {
    this.height = document.documentElement.clientHeight;
    window.addEventListener("scroll", () => {
      let top = document.documentElement.scrollTop;
      let scrollheight = document.documentElement.scrollHeight;
      if (top + this.height >= scrollheight) {
        this.$http
          .get(
            uri.getAirPortInfo +
              "?lastpath=decoration/shop/list&&uuid=1780891290fd944dc56f342de341206cf520e52919&referer=shop%2Flist%3F&referlid=1780891290f4eea0b22fb12ee678742d1fdff198b7&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&from_service=1&selectArea=131&cbdid=NTJERjRFREUxMjgxNDU5OEU3NUQ1MkVDQTJCMDA2RDk&pn=6&rn=6&pagenum=1&jzts=1608963672799_0.07600490413058991&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
          )
          .then((ret) => {
            this.showShoplist = this.showShoplist.concat(
              ret.data.showShoplist.list
            );
          });
      }
    });
  },
};
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 5px;
}
.header-cell {
  width: 15%;
  font-size: 13px;
  text-align: center;
}
.img img {
  width: 80%;
  padding: 0 10%;
}
.store {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.newstore {
  width: 45%;
  height: 70px;
  background-size: cover;
  background-image: url(https://dss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3971393790,443736123&fm=179&app=35&f=PNG?w=558&h=240&s=C8235F7C4B626B245A54DDC2030060B1);
  background-position: center center;
  margin-right: 3%;
}
.site {
  width: 45%;
  height: 70px;
  background-size: cover;
  background-image: url(https://dss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1058684704,770836727&fm=179&app=35&f=PNG?w=558&h=240&s=88035F7C4B236D2442C975C80300F0B2);
  background-position: center center;
}
.show-list {
  margin-top: 5px;
  img {
    width: 100%;
  }
}
.shop {
  display: flex;
  justify-content: space-around;
  height: 150px;
}
.logo {
  width: 40%;
  border-radius: 50%;
  padding: 0 5%;
  img {
    width: 100%;
  }
}
.detail {
  padding-left: 5%;
}
.ban > span {
  width: 25%;
  padding-right: 5%;
  display: inline-block;
  img {
    width: 100%;
    border-radius: 10px;
  }
}
</style>
