<template>
  <div class="container">
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
        v-for="(item, index) in showShoplist.list"
        :key="index"
        @click="todetail(item.itemUrl.path)"
      >
        <div class="logo">
          <img :src="item.logo" alt="" style="" />
        </div>
        <div class="detail">
          <div class="name">{{ item.name }}</div>
          <div>
            <span v-if="item.capacityTag">{{ item.capacityTag[0] + " " }}</span>
            <span>{{ "  " + item.recentSubmit }}</span>
          </div>
          <div>
            <span v-for="(val, key) in item.serviceTag" :key="key"
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
      bool: true,
      showFilter: {},
      option2: {},
      option3: {},
      showRecommendzone: {},
      viewlog: {},
      showShoplist: {},
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
    getData(path) {
      this.$http.get(uri.getAirPortInfo + path).then((ret) => {
        console.log(ret.data);
        this.showFilter = ret.data.showFilter;
        this.option2 = this.showFilter.result[1].options[0].options;
        this.option3 = this.showFilter.result[2].options;
        this.showShoplist = { ...this.showShoplist, ...ret.data.showShoplist };
      });
    },
    todetail(path) {
      this.$router.push(path);
    },
  },
  created() {
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
    this.getData(
      "?lastpath=decoration/shop/list/fullset&&uuid=178089129000251cf871a2b5d0f76a764020c8c0ff&referer=shop%2Flist%3F&referlid=1780891290815c72ca7c101e404d796b19217aecf7&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&selectArea=131&cbdid=NTJERjRFREUxMjgxNDU5OEU3NUQ1MkVDQTJCMDA2RDk&jpath=DZ1&title=%E6%95%B4%E5%B1%8B%E8%A3%85%E4%BF%AE&path=%2Fdecoration%2Fshop%2Flist%2Ffullset&jzts=1608953835904_0.6747708476375707&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
    );
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
.show-list {
  margin-top: 100px;
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
  }
}
.menu {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 45px;
}
</style>