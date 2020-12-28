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
        <div v-show="this.$store.state.is_search_show">
          <div
            class="search iconfont icon-sousuo"
            v-show="$store.state.is_search"
          ></div>
        </div>
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