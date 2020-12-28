<template>
  <div>
    <van-nav-bar
      title="找装修"
      left-text="返回"
      left-arrow
      :class="{ top: bool }"
      @click-left="back"
    >
      <template #right>
        <van-icon @click="goBackHome" name="wap-home-o" size="18" />
      </template>
    </van-nav-bar>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Icon } from "vant";

Vue.use(NavBar);
Vue.use(Icon);
export default {
  data() {
    return {
      bool: true,
    };
  },
  
  methods:{
      back(){
          this.$router.go(-1)
      },
      goBackHome(){
        this.$router.push('/')
      }
  }
};
</script>
<style lang="scss" scoped>
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
}
</style>
