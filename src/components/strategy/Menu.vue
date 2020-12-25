<template>
  <van-tabs @click="onClick" :key="showGuidetab.length" v-model="active1">
    <van-tab
      v-for="(item, indexi) in showGuidetab"
      :title="item.tab"
      :key="indexi"
    >
      <van-tabs
        type="card"
        :swipe-threshold="4"
        v-model="active2"
        @click="onInneClick"
      >
        <van-tab
          :title="val.topic"
          v-for="val in item.topicList"
          :key="val.topic"
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
                            backgroundImage:
                              'url(' + item.authorInfo.avatar + ')',
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
          <div class="datawra">
            <!-- 两个ul加载的过程需要判断谁的高度小就把下一个数据塞在谁的后面，当快要滑到底部的时候，请求下一次的数据 -->
            <!-- 分两步实现：第一步：判断谁的高度小就把下一个数据塞在谁的后面 
            难点：获取高度的时机，获取高度需要方法watch监控一个总数组的变化,
            如果写在updated里面，我们每次push的时候又会引发updated，会多次引发updated-->
            <!-- 快要滑到底部的时候，请求下一次数据 -->
            <ul ref="leftlist">
              <li v-for="item in leftlist" :key="item.nid">
                <div class="coverImageWra" v-if="item.coverImage.url">
                  <img :src="item.coverImage.url" alt="" class="coverImage" />
                  <div class="imgNum" v-if="item.imgNum">{{ item.imgNum }}</div>
                  <div class="videoTime" v-if="item.imgNum">
                    {{ item.time }}
                  </div>
                </div>
                <div class="showTitle">{{ item.title }}</div>
                <div class="authorInfo">
                  <img
                    :src="item.authorInfo.img"
                    alt=""
                    class="authorImg"
                  /><span class="authorname">{{ item.authorInfo.name }}</span
                  ><span v-if="item.authorInfo.designerLabel">{{
                    item.authorInfo.designerLabel
                  }}</span>
                </div>
              </li>
            </ul>
            <ul ref="rightlist">
              <li v-for="item in rightlist" :key="item.nid">
                <div class="coverImageWra" v-if="item.coverImage.url">
                  <img :src="item.coverImage.url" alt="" class="coverImage" />
                  <div class="imgNum" v-if="item.imgNum">{{ item.imgNum }}</div>
                  <div class="videoTime" v-if="item.imgNum">
                    {{ item.time }}
                  </div>
                </div>
                <div class="showTitle">{{ item.title }}</div>
                <div class="authorInfo">
                  <img
                    :src="item.authorInfo.img"
                    alt=""
                    class="authorImg"
                  /><span class="authorname">{{ item.authorInfo.name }}</span
                  ><span v-if="item.authorInfo.designerLabel">{{
                    item.authorInfo.designerLabel
                  }}</span>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
      </van-tabs>
    </van-tab>
  </van-tabs>
</template>

<script>
import Vue from "vue";
import { Tab, Tabs } from "vant";
Vue.use(Tab);
Vue.use(Tabs);
export default {
  data() {
    return {
      //确认选中的默认值
      active1: 0,
      active2: 0,
      rightlist: [],
      leftlist: [],
    };
  },

  props: {
    showGuidetab: {
      type: Array,
      default: () => [],
    },
    showLearnarticle: {
      type: Object,
      default: () => {},
    },
    showMixrecList: {
      type: Array,
      default: () => [],
    },
  },
  created() {},
  mounted() {
    //   此时获取不到，必须是在updated 里面或者在watch
    // this.$nextTick(() => {
    //   // 页面渲染完成后的回调 ，为什么取不到值
    //   //   let leftHeight = this.$refs.leftlist.offsetHeight;
    //   //   let rightHeight = this.$refs.rightlist.offsetHeight;
    //   //   console.log(leftHeight, rightHeight);
    // });
  },
  methods: {
    onClick(name, title) {
      // name是一个当前点中的模块index,title为标签内容
      console.log(name, title);
    },
    onInneClick(name, title) {
      console.log(name, title);
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
        val.forEach((ele) => {
            setTimeout(() => {
          let leftHeight = this.$refs.leftlist[0].offsetHeight;
          let rightHeight = this.$refs.rightlist[0].offsetHeight;
          console.log(leftHeight, rightHeight);
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
        });
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
/deep/.van-tabs__content {
  margin-top: 14px;
}
/deep/.van-tabs--card .van-tabs__line {
  width: 30px;
  bottom: 20px;
}
/deep/.van-tabs--card .van-tab {
  border: 1px solid #eee;
  color: #000;
  margin-right: 14px;
  border-radius: 14px;
  font-size: 13px;
  padding: 0 16px;
  &:last-child {
    margin-right: 0;
  }
}
/deep/.van-tabs--card .van-tab--active {
  background-image: linear-gradient(90deg, #ff4ca7, #ff3673);
  color: #fff;
}
/deep/.van-tabs--card .van-tabs__nav--card {
  border: none;
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
