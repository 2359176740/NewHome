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
          <slot></slot>
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
      //确认选中的默认值，默认进来选中分类1的第一个,分类2的第二个
      active1: 0,
      active2: 0,
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
      this.$emit("changeFirstHead", {
        path: this.showGuidetab[name].tabUrl.path,
        params: this.showGuidetab[name].tabUrl.params,
      });
      this.active2 = 0;
    },
    onInneClick(name, title) {
      // name是一个当前点中的模块index,title为标签内容
      this.$emit("changeSecondHead", {
        path: this.showGuidetab[this.active1].topicList[name].topicUrl.path,
        params: this.showGuidetab[this.active1].topicList[name].topicUrl.params,
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
        val.forEach((ele) => {
          setTimeout(() => {
            let leftHeight = this.$refs.leftlist[0].offsetHeight;
            let rightHeight = this.$refs.rightlist[0].offsetHeight;
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
</style>
