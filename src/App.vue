<template>
  <div id="app">
    <Hometop />
    <router-view />
    <FooterNav />
  </div>
</template>
<script>
//导入组件
import FooterNav from "@/components/Navigation/Footer";
import Hometop from "@/components/home_components/headers/Hometop";

export default {
  components: {
    FooterNav,
    Hometop,
  },
};
</script>
<style lang="scss"></style>
