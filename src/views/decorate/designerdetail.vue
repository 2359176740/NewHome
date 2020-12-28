<template>
  <div>
    <div class="header">
      <van-nav-bar
        title="侯慧姣的主页"
        left-text=""
        left-arrow
        class="top"
        @click-left="back"
      >
        <template #right>
          <van-icon name="wap-home-o" size="18" />
        </template>
      </van-nav-bar>
    </div>
    <div class="banner">
      <div class="photo">
        <span>
          <img
            src="https://midpf-mp-pub.cdn.bcebos.com/b23fdf0e70694eab0a6012fce276043e_1581928174916.jpeg@w_180,h_180,s_2"
            alt=""
          />
        </span>
      </div>
      <div class="name">
        <span style="color: #fff">{{ Designerdetail.name }}</span
        ><br />
        <span style="color: #fff">{{ Designerdetail.jobTitle }}</span>
         <van-button round hairline plain type="primary" size="small">关&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注</van-button>
      </div>
      <div class="honour" v-if="Designerdetail.honour">
          <span>{{Designerdetail.honour[0]}}</span><br>
          <span>{{Designerdetail.honour[1]}}</span><br>
      </div>
    </div>
    <div class="case">
        <h3>设计案例</h3>
        <div class="caselist" v-for="(item,index) in caseList" :key="index">
            <div class="image">
                <img :src="item.img" alt="">
                <span>{{item.imgText}}</span>              
            </div>
            <h4>{{item.title}}</h4>
            <span class="style" v-for="(val,key) in item.showTagsSimple" :key="key">{{val}}</span>
        </div>
    </div>
  </div>
</template>
<script>
import uri from "@/config/uri";
import Vue from "vue";
import { NavBar, Icon, Button } from "vant";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Button);
export default {
  data() {
    return {
      Designerdetail: {},
      caseList:[],
    };
  },
  created() {
    this.$http
      .get(
        uri.getAirPortInfo +
          "?lastpath=decoration/designer/detail&&uuid=1780891290e775ac169f64d9cababbc19abda949a7&referer=designer%2Fdetail%3F&referlid=17808912907e7dc3b2304e6f3c6190fef2c9a7ecb2&province_name=%E5%8C%97%E4%BA%AC&city_name=%E5%8C%97%E4%BA%AC&from_service=1&selectArea=131&cbdid=NTJERjRFREUxMjgxNDU5OEU3NUQ1MkVDQTJCMDA2RDk&jpath=DL4_DH&pn=0&rn=6&intab=1&nid=83894637384018_ds_midplat&tab=case&jzts=1608987246759_0.6655654307951837&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
      )
      .then((ret) => {
        this.Designerdetail = ret.data.showDesignerdetail;
        this.caseList=ret.data.showDesignerdetail.caseList;
      });
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
.banner {
    position: relative;
    margin-top: 50px;
  background-image: url(https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2722748561,3123804314&fm=179&app=35&f=PNG?w=1242&h=792&s=29417A6EDBA1937C0EF1DC0F0000E0C2);
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .photo{
      width:15%;
      img{
          width: 100%;
          border-radius: 50%;
      }
  }
  .name{
      width: 60%;
  }
  .honour{
      position: absolute;
      left:5%;
      bottom: 0;
      span{
          color: #ffffff;
          font-size: 14px;
      }
  }
}
.image{
    position: relative;
    width: 100%;
    margin-top: 10px;
    span{
        position: absolute;
        bottom: 10px;
        right: 15%;
    }
    img{
        margin-left: 5%;
        width: 90%;
        border-radius: 10px;
    }
}
.case{
    .style{
        font-size: 13px;
        color:#aac2ec;
        margin-right: 5%;
        margin-left: 5%;
    }
    h4{
        font-family: "宋体";
        margin-left: 5%;
    }
}
.top {
  position: fixed;
  z-index: 999;
  width: 100%;
  top: 0;
}
.van-nav-bar__title {
  color: #ffffff;
}

</style>