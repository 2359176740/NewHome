<template>
  <div>
    <div class="top">
      <h1>个人中心</h1>
      <div class="iconfont icon-weibiaoti- fr"></div>
    </div>
    <h2></h2>
  </div>
</template>
<script>
import Vue from "vue";
import "@/assets/font/iconfont.css";
export default Vue.extend({});
</script>>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
h2 {
  height: 2px;
  background-color: #ccc;
  width: 100%;
}
.fr {
  float: right;
  font-size: 18px;
  margin-top: 6px;
  margin-right: 24px;
  font-weight: 600;
}
h1 {
  float: left;
  text-align: center;
  font-size: 18px;
  width: 120px;
  line-height: 30px;
  margin-left: 110px;
}
.top {
  height: 36px;
}
</style>