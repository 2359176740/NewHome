<template>
  <div>
    <Header></Header>
    <div v-show="isSkeleton">
      <van-skeleton title :row="5" />
      <van-skeleton title :row="5" class="gap" />
      <van-skeleton title :row="4" class="gap" />
    </div>
    <!--loading-->
    <Menu
      :showGuidetab="showGuidetab"
      v-show="!isSkeleton"
      @changeFirstHead="gettabdata"
      @changeSecondHead="gettabdata"
    >
      <div class="strategy-article">
        <div
          class="c-font-medium c-title-gray c-gap-top-large strategy-article-title"
        >
          {{ showLearnarticle.subTitle }}
        </div>
        <div
          class="c-gap-top"
          v-for="item in showLearnarticle.list"
          :key="item.nid"
        >
          <div class="img-content-horizontal-wrapper c-flexbox">
            <div
              class="img-content-horizontal-left jz-flexbox-fixed c-gap-right-middle"
            >
              <div class="jz-img-wrap c-img-s jz-img-radius margin5">
                <div class="image__3lmXg jz-img" lazy-load="">
                  <div
                    class="image-inner__2uQH2"
                    :style="{
                      backgroundImage: 'url(' + item.coverImage.url + ')',
                    }"
                  ></div>
                </div>
              </div>
            </div>
            <div
              class="img-content-horizontal-right jz-flexbox-auto img-content-horizontal-hidden"
            >
              <div class="strategy-article-right">
                <div
                  class="c-color c-line-clamp2 c-font-medium strategy-article-right-title"
                >
                  {{ item.title }}
                </div>
                <div
                  class="c-flexbox jz-flex-align-center strategy-article-bot"
                >
                  <div class="image__3lmXg strategy-article-bot-left">
                    <div
                      class="avatarImage"
                      :style="{
                        backgroundImage: 'url(' + item.authorInfo.avatar + ')',
                      }"
                    ></div>
                  </div>
                  <div
                    class="c-gap-left-small c-gap-right-small strategy-article-bot-con"
                  >
                    <div class="c-line-clamp1">
                      {{ item.authorInfo.name }}
                    </div>
                  </div>
                  <div class="strategy-article-bot-right">
                    <div class="c-line-clamp1">
                      <span class="">{{ item.datePublished }}</span
                      ><span class="c-gap-left-small">
                        {{ item.asweight }}阅读
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 瀑布流详细信息展示 -->
      <div class="datawra" ref="datawra">
        <!-- 两个ul加载的过程需要判断谁的高度小就把下一个数据塞在谁的后面，当快要滑到底部的时候，请求下一次的数据 -->
        <!-- 分两步实现：第一步：判断谁的高度小就把下一个数据塞在谁的后面 
            难点：获取高度的时机，获取高度需要方法watch监控一个总数组的变化,
            如果写在updated里面，我们每次push的时候又会引发updated，会多次引发updated-->
        <!-- 快要滑到底部的时候，请求下一次数据 -->
        <ul ref="leftlist">
          <!-- Duplicate keys detected: '/system'. This may cause an update error. 原因key可能存在重复 前面加一个index前缀放置重复-->
          <li v-for="(item, index) in leftlist" :key="index + item.nid">
            <div class="coverImageWra" v-if="item.coverImage.url">
              <img :src="item.coverImage.url" alt="" class="coverImage" />
              <div class="imgNum" v-if="item.imgNum">{{ item.imgNum }}</div>
              <div class="videoTime" v-if="item.imgNum">
                {{ item.time }}
              </div>
            </div>
            <div class="showTitle">{{ item.title }}</div>
            <div class="authorInfo">
              <img :src="item.authorInfo.img" alt="" class="authorImg" /><span
                class="authorname"
                >{{ item.authorInfo.name }}</span
              ><span v-if="item.authorInfo.designerLabel">{{
                item.authorInfo.designerLabel
              }}</span>
            </div>
          </li>
        </ul>
        <ul ref="rightlist">
          <li v-for="(item, index) in rightlist" :key="index + item.nid">
            <div class="coverImageWra" v-if="item.coverImage.url">
              <img :src="item.coverImage.url" alt="" class="coverImage" />
              <div class="imgNum" v-if="item.imgNum">{{ item.imgNum }}</div>
              <div class="videoTime" v-if="item.imgNum">
                {{ item.time }}
              </div>
            </div>
            <div class="showTitle">{{ item.title }}</div>
            <div class="authorInfo">
              <img :src="item.authorInfo.img" alt="" class="authorImg" /><span
                class="authorname"
                >{{ item.authorInfo.name }}</span
              ><span v-if="item.authorInfo.designerLabel">{{
                item.authorInfo.designerLabel
              }}</span>
            </div>
          </li>
        </ul>
      </div>
      <van-loading size="24px" vertical v-show="isLoading"
        >加载中...</van-loading
      >
    </Menu>
  </div>
</template>

<script>
import Vue from "vue";
import Header from "@/components/strategy/Header";
import Menu from "@/components/strategy/Menu.vue";
import { NavBar, Icon, Loading, Skeleton } from "vant";
import uri from "@/config/uri.js";
import "@/assets/font/iconfont.css";

Vue.use(NavBar);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(Skeleton);
export default {
  data() {
    return {
      isSkeleton: true,
      isLoading: false,
      showGuidetab: [],
      showLearnarticle: {},
      showMixrecList: [],
      rightlist: [],
      leftlist: [],
      wratop: 0,
      screenHeight: 0,
      nextPageUrl: { path: "", params: "" },
      isfinish: true,
      str:
        "jzts=1608943795578_0.1214063103264098&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5",
    };
  },
  components: {
    Header,
    Menu,
  },

  created() {
    // 获取屏幕高度
    this.screenHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    //  异步获取数据，注意子组件生命周期顺序，获取首屏数据
    this.$http
      .get(
        uri.getGuide +
          "?lastpath=decoration/guide&&jzts=1608943795578_0.1214063103264098&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5"
      )
      .then((ret) => {
        this.isSkeleton = false;
        this.showGuidetab = ret.data.showGuidetab;
        this.showLearnarticle = ret.data.showLearnarticle;
        this.showMixrecList = ret.data.showMixrec.list;
        this.nextPageUrl = ret.data.showMixrec.nextPageUrl;
        // 数据请求都是异步的,所以我们获取一个元素渲染后的高度应该在数据请求之后
        // this.$nextTick也必须放到合适的钩子函数之下，因为它之后在那个时机之后如果有DOM更新此时只调用一次
        // 放在这里就是数据请求成功之后的那一次DOM更新之后调用
        this.$nextTick(() => {
          this.wratop = this.$refs.datawra.offsetTop;
        });
      });
    // 添加滑动监听事件
    window.addEventListener("scroll", () => {
      let leftHeight = this.$refs.leftlist.offsetHeight;
      let rightHeight = this.$refs.rightlist.offsetHeight;
      let minHeight = Math.min(leftHeight, rightHeight);
      if (
        document.documentElement.scrollTop + this.screenHeight + 10 >=
        minHeight + this.wratop
      ) {
        if (!this.isfinish) return;
        console.log(123);
        this.isfinish = false;
        this.isLoading = true;
        //  异步获取数据，注意子组件生命周期顺序
        this.$http
          .get(
            uri.getGuide +
              `?lastpath=${this.nextPageUrl.path}&&${this.nextPageUrl.params}&&${this.str}`
          )
          .then((ret) => {
            console.log(ret);
            this.showMixrecList = ret.data.showMixrec.list;
            this.nextPageUrl = ret.data.showMixrec.nextPageUrl;
            this.isLoading = false;
            this.isfinish = true;
          });
      }
    });
  },
  mounted() {},
  methods: {
    // 监听子组件点击事件
    gettabdata(infoObj) {
      let { path, params } = infoObj;
      //  异步获取数据，注意子组件生命周期顺序，获取首屏数据
      this.$http
        .get(uri.getGuide + `?lastpath=${path}&&${params}`)
        .then((ret) => {
          this.showLearnarticle = ret.data.showLearnarticle;
          this.showMixrecList = ret.data.showMixrec.list;
          this.nextPageUrl = ret.data.showMixrec.nextPageUrl;
          this.rightlist = [];
          this.leftlist = [];
          // 数据请求都是异步的,所以我们获取一个元素渲染后的高度应该在数据请求之后
          // this.$nextTick也必须放到合适的钩子函数之下，因为它之后在那个时机之后如果有DOM更新此时只调用一次
          // 放在这里就是数据请求成功之后的那一次DOM更新之后调用
          this.$nextTick(() => {
            this.wratop = this.$refs.datawra.offsetTop;
          });
        });
    },
  },
  watch: {
    showMixrecList: {
      handler(val) {
        //必须加页面渲染完之后，否则获取不到
        // this.$nextTick(() => {
        //   val.forEach((ele) => {
        //     let leftHeight = this.$refs.leftlist[0].offsetHeight;
        //     let rightHeight = this.$refs.rightlist[0].offsetHeight;
        //     console.log(leftHeight, rightHeight);
        //     if (leftHeight >= rightHeight) {
        //       this.rightlist.push(ele);
        //     } else {
        //       this.leftlist.push(ele);
        //     }
        //   });
        // });
        // 存在问题
        // 根数组是一次全部更新，分数组会把原来已经插入的数据再插入一次，解决方法，跟数据每次没有重复数据,分数据每次保留有原来的数据
        // 解决方法，不能把分数据置空之后，再重新分配，这样页面相当于重新渲染，会回到最初滚动的地方
        // this.rightlist = [];
        // this.leftlist = [];
        val.forEach((ele) => {
          setTimeout(() => {
            let leftHeight = this.$refs.leftlist.offsetHeight;
            let rightHeight = this.$refs.rightlist.offsetHeight;
            if (leftHeight >= rightHeight) {
              this.rightlist.push(ele);
            } else {
              this.leftlist.push(ele);
            }
          }, 0);
          /*
               Vue 异步执行 DOM 更新。只要观察到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据改变。
               Vue 在修改数据后，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
               这也是vue的虚拟DOM比优秀真实DOM的地方
               用下面的方法 this.$nextTick 是在检测到dom变化后执行回调函数，
               但是循环是同步的，一次性添加了检测dom变化而执行的回调函数，第一次别的dom执行更新完，
               开始执行第一个回调，但是发现十个回调修改dom是来自同一次监听的watch，就会开启一个对列，
               循环所有的数据修改，然后统一为一次dom更新，所以this.$nextTick 只能检测到一次dom变化，
               setTimeout并不是监听DOM更新而执行,它会把回调函数放在异步执行对列，
               他把一次数据更新与DOM更新看做一个同步
               数据和DOM执行完毕之后再执行下一个回调
               因此，下面 打印123 只会执行一次
       */
          //       this.$nextTick(() => {
          //         let leftHeight = this.$refs.leftlist[0].offsetHeight;
          //         let rightHeight = this.$refs.rightlist[0].offsetHeight;
          //         console.log(leftHeight, rightHeight);
          //         if (leftHeight >= rightHeight) {
          //           this.rightlist.push(ele);
          //         } else {
          //           this.leftlist.push(ele);
          //         }
          //       });
          //     });
          //     this.$nextTick(() => {
          //       console.log(123);
          //   this.$$nextTick(()=>{

          //   })
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-nav-bar__title {
  //   font-size: 18px;
  font-weight: bold;
}
.gap {
  margin-top: 12px;
}
.datawra {
  margin: 12px 15px 0;
  overflow: hidden;
  li {
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
    margin: 10px 0;
    .coverImageWra {
      position: relative;
    }
    .coverImage {
      width: 100%;
    }
    .imgNum,
    .videoTime {
      position: absolute;
      bottom: 0;
      right: 0;
      color: red;
    }
    .videoTime {
      color: red;
    }
    .authorname {
      vertical-align: middle;
    }
    .showTitle {
      font-weight: 700;
      line-height: 21px;
      margin-top: 7px;
      color: #555;
      padding: 0 8px;
      display: -webkit-box;
      overflow: hidden;
      white-space: normal;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 14px;
    }
    .authorInfo {
      margin: 5px;
      font-size: 12px;
      line-height: 20px;
    }
    .authorImg {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  ul {
    float: left;
    width: 48%;
    margin: 0 1%;
  }
}
.strategy-article {
  width: auto;
  height: auto;
  position: relative;
  margin: 12px 17px 0;
  padding: 0 17px 15px;
  z-index: 2;
  background: #fff;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.05);
}
.strategy-article-title {
  font-size: 14px;
  line-height: 25px;
  font-weight: 700;
}
.c-gap-top-large {
  margin-top: 15px;
}
.c-title-gray {
  color: #333;
  font-weight: bold;
}

.c-gap-top {
  margin-top: 10px;
}
.c-flexbox,
.c-row {
  display: -webkit-box;
  display: -webkit-flex;
  width: auto;
  align-content: flex-start;
  align-items: stretch;
  -webkit-box-align: stretch;
  -webkit-box-direction: normal;
  -webkit-box-lines: single;
  -webkit-box-orient: horizontal;
  -webkit-box-pack: justify;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.jz-flexbox-fixed {
  -webkit-box-flex: 0;
  -webkit-flex: 0 0 auto;
  flex: 0 0 auto;
  height: 89px;
  width: 89px;
}
.c-gap-right-middle {
  margin-right: 8px;
  overflow: hidden;
}
.jz-img-wrap,
.jz-img-wrap-margin5 {
  overflow: hidden;
  position: relative;
  z-index: 3;
}
.c-img-s {
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .image-inner__2uQH2 {
    background-size: contain;
    background-position: center center;
    width: 89px;
    height: 89px;
    border-radius: 8px;
    background-repeat: no-repeat;
    background-size: 89px 89px;
    background-position: center center;
  }
}

.img-content-horizontal-hidden {
  overflow: hidden;
}
.img-content-horizontal-right {
  position: relative;
  flex-grow: 1;
}

.strategy-article-right {
  height: 100%;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
}
.strategy-article-right-title {
  font-weight: 700;
  margin-top: 4px;
  font-size: 15px;
  line-height: 25px;
}
.c-color {
  color: #555;
}
.c-line-clamp2 {
  -webkit-line-clamp: 2;
}
.c-line-clamp2,
.c-line-clamp3,
.c-line-clamp4,
.c-line-clamp5 {
  display: -webkit-box;
  overflow: hidden;
  margin-bottom: 5px;
  white-space: normal;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
}

.strategy-article-bot {
  position: absolute;
  bottom: 8px;
  width: auto;
  font-size: 12px;
  left: 1.03092784%;
  right: 1.03092784%;
  color: #999;
}
.jz-flex-align-center {
  -webkit-align-items: center;
  -webkit-box-align: center;
  align-items: center;
}

.strategy-article-bot-left {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #eee;
}
.strategy-article-bot-con {
  width: 42%;
}
.strategy-article-bot-right {
  width: 45%;
  text-align: right;
}
.c-line-clamp1 {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.c-line-clamp1 {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.c-gap-left-small {
  margin-left: 5px;
}

.avatarImage {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: contain;
}
</style>
