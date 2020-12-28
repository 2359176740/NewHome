<template>
  <div>
    <div class="qwer">
      <img
        src="https://wx4.sinaimg.cn/mw690/9d9cfdb9ly1glnkzr8fp3j21gi2lbb29.jpg"
        alt=""
      />
    </div>
    <div class="sdf">
      <van-form @submit="onSubmit">
        <div style="margin: 16px">
          <van-field
            v-model="mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
            :rules="[{ pattern, message: '请填写正确的手机号' }]"
          />
        </div>
        <div style="margin: 16px">
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </div>
        <div style="margin: 16px">
          <van-button block round type="info" native-type="submit"
            >提交</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, Field, Button, Toast } from "vant";
Vue.use(Form);
Vue.use(Field);
Vue.use(Button);
Vue.use(Toast);
export default {
  data() {
    return {
      mobile: "",
      password: "",
      pattern: /^1[3-9]\d{9}$/,
    };
  },
  methods: {
    onSubmit(values) {
      this.$http.post("/v1/login", values).then((ret) => {
        if (ret.code == 0) {
          Toast.success(ret.msg);
          this.$store.commit("setJwt", ret.jwt);

          setTimeout(() => {
            this.$router.push("/Center");
          }, 2000);
        } else {
          Toast.fail(ret.msg);
        }
      });
    },
  },
  created() {
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
  },
};
</script>
<style lang="scss" scoped>
.qwer img {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sdf {
  position: absolute;
  width: 80%;
  margin: 340px 0 0 40px;
}
</style>