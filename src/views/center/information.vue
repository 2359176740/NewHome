
<template>
  <div class="top">
    <h1>消息中心</h1>
    <div class="iconfont icon-weibiaoti- fr"></div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
  },
};
</script>

<style lang="scss" scoped>
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
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
}
</style>