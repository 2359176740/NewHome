<template>
  <div>
    <div class="menu" style="margin-top: 50px">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value1" :options="option1" />
        <van-dropdown-item v-model="value2" :options="option2" />
        <van-dropdown-item v-model="value3" :options="option3" />
      </van-dropdown-menu>
    </div>
    <div class="list" style="margin-top: 3px">
      <div
        class="designer"
        v-for="(item, index) in showDesignerlist"
        :key="index"
        @click="todesigner"
      >
        <div class="photo">
          <img :src="item.avatar" alt="" />
        </div>
        <div class="msg">
          <h4>{{ item.name }}</h4>
          <div class="price">
            <span
              v-for="(val, key) in item.designerDescTag"
              :key="key"
              style="margin-right: 10px; display: inline-block"
              >{{ val + "   " }}</span
            >
          </div>
          <div class="style">
            <span
              v-for="(val, key) in item.designStyleTag"
              :key="key"
              style="margin-right: 10px; display: inline-block; font-size: 12px"
              >{{ val }}</span
            >
          </div>
          <div class="case">
            <span v-for="(val, key) in item.caseList" :key="key">
              <img :src="val.coverImage.url" alt="" />
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
import { DropdownMenu, DropdownItem, Skeleton } from "vant";

Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Skeleton);

export default {
  data() {
    return {
      value1: 0,
      value2: "a",
      value3: "一",
      option1: [{ text: "综合排序", value: 0 }],
      option2: [
        { text: "设计师类型", value: "a" },
        { text: "不限", value: "b" },
        { text: "独立设计师", value: "c" },
        { text: "装企在职设计师", value: "d" },
      ],
      option3: [
        { text: "费用", value: "一" },
        { text: "不限", value: "二" },
        { text: "100元以下/㎡", value: "三" },
        { text: "100-299元/㎡", value: "四" },
        { text: "300-399元/㎡", value: "五" },
        { text: "400元以上/㎡", value: "六" },
      ],
      showDesignerlist: [],
    };
  },
  created() {
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);

    this.$http
      .get(
        uri.getAirPortInfo +
          "?lastpath=decoration/designerlistpage&&uuid=1780891290e775ac169f64d9cababbc19abda949a7&referer=shop%2Flist%3F&referlid=17808912907eeb1ea4c601a9cf191561486cb7f8bf&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&from_service=1&selectArea=131&cbdid=NTJERjRFREUxMjgxNDU5OEU3NUQ1MkVDQTJCMDA2RDk&jpath=DZ4&title=%E6%89%BE%E8%AE%BE%E8%AE%A1%E5%B8%88&path=%2Fdecoration%2Fdesignerlistpage&jzts=1608982549201_0.815826998330506&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
      )
      .then((ret) => {
        this.showDesignerlist = ret.data.showDesignerlistpage.list;
      });
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
              "?lastpath=decoration/designerlistpage&&uuid=1780891290e775ac169f64d9cababbc19abda949a7&referer=designerlistpage%3F&referlid=1780891290440d2c58a05efec37c6a4fde00f86a6b&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&from_service=1&selectArea=131&cbdid=NTJERjRFREUxMjgxNDU5OEU3NUQ1MkVDQTJCMDA2RDk&jpath=DZ4_DL5&pn=6&rn=6&searchParam=designer_pn%3A6&nid=&jzts=1608987018053_0.23096206428172628&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
          )
          .then((ret) => {
            console.log(ret.data);
            this.showDesignerlist = this.showDesignerlist.concat(
              ret.data.showDesignerlistpage.list
            );
          });
      }
    });
  },
  methods: {
    todesigner() {
      this.$router.push("/decoration/designer/detail");
    },
  },
};
</script>
<style lang="scss" scoped>
.designer {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 10px;
}
.photo {
  width: 15%;
  vertical-align: top;
  img {
    width: 100%;
    border-radius: 50%;
  }
}
.msg {
  width: 75%;
  .price {
    font-size: 12px;
    span {
      background: rgb(199, 240, 137);
      border-radius: 6px;
    }
  }
  .style {
    margin-top: 5px;
    margin-bottom: 5px;
    span {
      background: rgb(179, 175, 241);
      border-radius: 6px;
    }
  }
}
.case {
  width: 100%;
  span {
    display: inline-block;
    width: 30%;
    height: 60px;
    padding-right: 2%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 5px;
    }
  }
}
</style>