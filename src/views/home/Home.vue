<template>
  <div>
    <HomeHeader />
    <HomeNav />
    <HomeBody v-show="!this.$store.state.isLoadingShow" />
  </div>
</template>
<script>
import HomeHeader from "@/components/home_components/HomeHeader";
import HomeNav from "@/components/Navigation/HomeNav";
import HomeBody from "@/components/home_components/HomeBody";
import uri from "@/config/uri";

export default {
  components: {
    HomeHeader,
    HomeNav,
    HomeBody,
  },
  created() {
    this.$store.commit("setHeadName", "装馨家");
  },
};
</script>