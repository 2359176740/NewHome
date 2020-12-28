<template>
  <div id="app">
    <router-view />
    <FooterNav/>
  </div>
</template>
<script>
//导入组件
import FooterNav from '@/components/Navigation/Footer'

export default {
  components:{
    FooterNav
  }
};
</script>
<style lang="scss"></style>
