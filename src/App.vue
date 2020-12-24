<template>
  <div id="app">
    <router-view />
    <div>底部导航</div>
  </div>
</template>
<script>
import uri from "@/config/uri.js";

export default {
  created() {
    this.$http
      .get(
       uri.getAirPortInfo + '?jzts=1608788904492_0.5124814116297463&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5'
      )
      .then((ret) => {
        console.log(ret);
      });
  },
};
</script>
<style lang="scss">
</style>
