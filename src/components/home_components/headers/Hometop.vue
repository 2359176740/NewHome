<template>
  <div>
    <div class="header-box">
      <div class="header-wrap">{{ $store.state.headName }}</div>
      <div class="header">
        <div
          class="go iconfont icon-zuojiantou"
          @click="go()"
          v-show="$store.state.is_go"
        ></div>
        <div
          class="search iconfont icon-sousuo"
          v-show="$store.state.is_search"
        ></div>
        <div
          class="goBackHome iconfont icon-jia"
          @click="goBackHome()"
          v-show="$store.state.is_GoBackHome"
        ></div>
      </div>
    </div>
  </div>
</template>
<script>
import "@/assets/icon/iconfont.css";
export default {
  data() {
    return {
      //  showSearchArr:['/home',""],
    };
  },
  methods: {
    go() {
      this.$router.go(-1);
    },
    goBackHome() {
      this.$router.push("/");
    },
    showSearch() {
      if (document.documentElement.scrollTop > 80) {
        this.$store.commit("setSearch", true);
      } else {
        this.$store.commit("setSearch", false);
      }
    },
  },

  created() {
    if (this.$route.fullPath == "/home") {
      document.addEventListener("scroll", this.showSearch);
    }
  },
  watch: {
    $route: {
      handler(val) {
        switch (val.fullPath) {
          case "/home":
            document.addEventListener("scroll", this.showSearch);
            this.$store.commit("setIsGoBackHome", false);
            this.$store.commit("setIsGo", false);
            break;
          case "/pages/caselist/index":
            document.removeEventListener("scroll", this.showSearch);
            this.$store.commit("setSearch", true);
            this.$store.commit("setIsGoBackHome", true);
            this.$store.commit("setIsGo", true);
            break;
          case "/strategy/index":
            this.$store.commit("setIsGo", false);
            document.removeEventListener("scroll", this.showSearch);
            this.$store.commit("setSearch", false);
            this.$store.commit("setIsGoBackHome", true);
            break;
          case "/center":
            this.$store.commit("setIsGo", false);
            document.removeEventListener("scroll", this.showSearch);
            this.$store.commit("setSearch", false);
            this.$store.commit("setIsGo", true);
            this.$store.commit("setIsGoBackHome", true);
            break;
          default:
            document.removeEventListener("scroll", this.showSearch);
            this.$store.commit("setSearch", false);
            this.$store.commit("setIsGo", true);
            this.$store.commit("setIsGoBackHome", true);
        }
      },
      deep: true,
    },
  },
  beforeDestroy() {
    /*
      组件切换销毁时组件本神身已经绑定的事件比如scroll,还有ajax请求并不会随着组件的注销而被销毁
      需要在组件beforeDestory中进行销毁
      每个组件必须在自己的当前生命周期中销毁自己创建的事件
      在相同组件不同生命周期中不能销毁其他生命周期创建的事件
    */
    // document.removeEventListener('scroll',this.showSearch)
  },
};
</script>
<style lang="scss" scoped>
.header-box {
  height: 39px;
  width: 100%;
  .header {
    width: 100%;
    height: 39px;
    text-align: center;
    position: fixed;
    font-weight: bold;
    font-size: 16px;
    line-height: 39px;
    background: #fff;
    z-index: 999;
    .search {
      float: left;
      font-size: 16px;
      margin-left: 16px;
    }
    .go {
      float: left;
      font-size: 16px;
      margin-left: 16px;
    }
    .goBackHome {
      float: right;
      font-size: 19px;
      margin-right: 16px;
    }
  }
  .header-wrap {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    font-weight: bold;
    font-size: 16px;
    line-height: 39px;
    background: #fff;
    z-index: 9999;
  }
}
</style>