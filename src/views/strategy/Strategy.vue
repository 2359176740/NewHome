<template>
  <div>
    <Header></Header>
    <!--loading-->
    <van-loading size="24px" vertical v-show="isLoading">加载中...</van-loading>
    <Menu :showGuidetab="showGuidetab" :showLearnarticle='showLearnarticle' :showMixrecList='showMixrecList'></Menu>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/strategy/Header";
import Menu from "@/components/strategy/Menu.vue";
import { NavBar, Icon, Loading } from "vant";
import uri from "@/config/uri.js";
import "@/assets/font/iconfont.css";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Loading);
export default {
  data() {
    return {
      isLoading: true,
      showGuidetab: [],
      showLearnarticle: {},
      showMixrecList:[],
    };
  },
  components: {
    Header,
    Menu,
  },
  async created() {
    //  异步获取数据，注意子组件生命周期顺序
    let ret = this.$http
      .get(
        uri.getAirPortInfo +
          "?jzts=1608868464715_0.22331061871233948&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
      )
      .then((ret) => {
        this.isLoading = false;
        this.showGuidetab = ret.data.showGuidetab;
        this.showLearnarticle = ret.data.showLearnarticle;
        this.showMixrecList = ret.data.showMixrec.list;
      });
  },
  methods: {
    onClickRight() {},
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar__title {
  //   font-size: 18px;
  font-weight: bold;
}
</style>
