import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //首页中body数据
    home_body_arr: [],
    //loading层
    isLoadingShow: true,
    //搜索图标是否显示
    is_search: false,
    //返回图标是否显示
    is_go: false,
    //回到主页图标是否显示
    is_GoBackHome: false,
    //底部导航是否显示
    isFooterShow: true,
    //头部名称
    headName: "装馨家",

    //解决首页点击装修公司时底部装修未选中问题
    footerActive: 0,

    //跳转时地址传参
    clickPath: "",

    //装修中的
    path: "",
    name: "",

    //个人中心令牌
    jwt: "",
  },
  mutations: {
    setHomeBodyArr(state, val) {
      state.home_body_arr = val;
    },
    setLoadingShow(state, val) {
      state.isLoadingShow = val;
    },
    setSearch(state, val) {
      state.is_search = val;
    },
    setIsFooterShow(state, val) {
      state.isFooterShow = val;
    },
    setIsGo(state, val) {
      state.is_go = val;
    },
    setIsGoBackHome(state, val) {
      state.is_GoBackHome = val;
    },
    setHeadName(state, val) {
      state.headName = val;
    },
    setFooterActive(state, val) {
      state.footerActive = val;
    },
    setClickPath(state, val) {
      state.clickPath = val;
    },

    //装修中的
    setpath(state, [path]) {
      state.path = path;
    },
    setname(state, name) {
      state.name = name;
    },

    setJwt(state, jwt) {
      state.jwt = jwt;
      localStorage.setItem("jwt", jwt);
    },
  },
  actions: {},
  modules: {},
});
