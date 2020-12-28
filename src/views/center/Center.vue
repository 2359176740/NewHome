<template>
  <div>
    <div class="top">
      <h1>个人中心</h1>
      <div class="iconfont icon-weibiaoti- fr"></div>
    </div>
    <div class="dl asdw">
      <ul>
        <li class="logo">
          <img
            src="https://himg.bdimg.com/sys/portrait/item/8404b8dfd4b2d4b236323795a9"
            alt=""
          />
        </li>
        <li class="rt">
          <div v-if="!userinfo.mobile">
            <span>未登录</span>
            <span>登录后结交好朋友无限...</span>
          </div>
          <div v-if="userinfo.mobile">
            {{ userinfo.mobile }}
          </div>
        </li>
        <li>
          <button v-if="!userinfo.mobile" @click="login">立即登录</button>
        </li>
      </ul>
    </div>
    <h3></h3>
    <div class="asdw">
      <van-cell class="sdff" is-link @click="dingdan">我的订单</van-cell>
      <van-cell class="sdff" is-link @click="shoucang">我的收藏</van-cell>
      <van-cell class="sdff" is-link @click="guanzhu">我的关注</van-cell>
      <van-cell class="sdff" is-link @click="zhongxin">消息中心</van-cell>
      <van-cell class="sdff" is-link @click="fankui">意见反馈</van-cell>
      <van-cell class="sdff" is-link @click="ruzhu">商家入驻</van-cell>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Popup, cell } from "vant";
Vue.use(Popup);
Vue.use(cell);
import "@/assets/font/iconfont.css";
export default {
  data() {
    return {
      userinfo: {},
    };
  },
  methods: {
    dingdan() {
      this.$router.push("/orderForm");
    },
    shoucang() {
      this.$router.push("/collect");
    },
    guanzhu() {
      this.$router.push("/attention");
    },
    zhongxin() {
      this.$router.push("/information");
    },
    fankui() {
      this.$router.push("/feedback");
    },
    ruzhu() {
      this.$router.push("/enter");
    },
    login() {
      this.$router.push("/login");
    },
  },
  created() {
    let jwt = this.$store.state.jwt;
    if (jwt) {
      this.$http.get("/v1/info").then((ret) => {
        if (ret.code == 0) {
          this.userinfo = ret.userinfo;
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
li button {
  display: block;
  background: #fff;
  font-size: 12px;
  height: 30px;
  line-height: 14px;
  width: 70px;
  margin: 46px 0 0 80px;
}
h3 {
  width: 100%;
  height: 12px;
  background: #f1f1f1;
}
.rt {
  font-size: 14px;
  margin: 46px 0 0 16px;
}
span {
  display: block;
}
.logo img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin: 30px 0 0 0;
}
h2 {
  height: 2px;
  background-color: #f1f1f1;
  width: 100%;
}
.dl {
  height: 130px;
}

.zuo {
  line-height: 50px;
  float: left;
  font-size: 18px;
  font-weight: 400;
}
li {
  list-style: none;
  float: left;
}
.list {
  width: 400px;
  margin: 0 auto;
  height: 50px;
  border-bottom: 1px solid #3333;
}
.you {
  line-height: 40px;
  float: right;
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
  width: 100%;
  border-bottom: 1px solid #f1f1f1;
}
.sdff {
  font-size: 18px;
  font-weight: 546;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #f1f1f1;
}
.sdff i {
  height: 40px;
  line-height: 40px;
}
.asdw {
  padding: 0 10px;
}
</style>