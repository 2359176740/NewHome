<template>
  <h1>入驻</h1>
</template>

<script>
export default {
  created() {
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
  },
};
</script>
