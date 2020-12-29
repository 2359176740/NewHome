<template>
  <div>
    <!-- <loading v-show="isLoading"></Loading> -->
    <img :src="allinfo.headerImage" alt="" class="headerImage" />
    <div class="infowra">
      <div class="c-gap-top-large">{{ allinfo.title }}</div>
      <div class="article-tags">
        <span
          class="article-tag"
          v-for="(item, index) in allinfo.topic_list"
          :key="index"
        >
          {{ item.topic }}
        </span>
      </div>
      <div class="article-author">
        <div class="article-author-poster">
          <div
            class="image-inner__2uQH2"
            :style="{
              backgroundImage: 'url(' + authorInfo.avatar + ')',
            }"
          ></div>
        </div>
        <div class="article-author-info">
          <span class="article-author-info-name">
            {{ authorInfo.name }}
          </span>
        </div>
      </div>
      <div class="article-content">
        <div
          v-for="(item, index) in articleInfo"
          :key="'aer' + index"
          class="article-content-text"
        >
          {{ item.content }}
        </div>
      </div>
    </div>
    <!-- 猜你想找 -->
    <div class="infowra">
      <div class="shop-recommend-title">
        {{ secondTitle }}
      </div>
      <div class="shop-recommend-subtitle">
        擅长<span
          class="shop-recommend-subtitle-text"
          v-for="(item, index) in tags"
          :key="'tag' + index"
          >{{ item }}</span
        >的装修公司
      </div>
      <ul class="companylist">
        <li v-for="item in secondList" :key="'company' + item.nid">
          <div class="shop">
            <div class="shop-head">
              <div class="shop-head-img">
                <div class="jz-img-wrap jz-img-round shop-logo">
                  <div class="image__3lmXg jz-img" lazy-load="">
                    <div
                      :style="{
                        backgroundSize: 'contain',
                        backgroundImage: 'url(' + item.logo + ')',
                        backgroundPosition: 'center center',
                        height: '40px',
                      }"
                    ></div>
                  </div>
                  <div class="jz-img-mask jz-img-round"></div>
                </div>
              </div>
              <div class="shop-head-content">
                <div class="title">
                  <div class="company">
                    <span class="company-name">
                      {{ item.name }}
                    </span>
                    <div class="guarantee-tip shop-guarantee">
                      <div
                        class="image__3lmXg guarantee-btn guarantee-entry1609234495468"
                      >
                        <div
                          class="image-inner__2uQH2"
                          style='background-size: contain; background-image: url("https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=294529641,2942379675&amp;fm=179&amp;app=35&amp;f=PNG?w=304&amp;h=108&amp;s=66333764C5EB81194426798703003088"); background-position: center center;height:16px'
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div class="price">最低10万起</div>
                </div>
                <div class="shop-label-wrap">
                  <div class="jz-flexbox">
                    <div
                      v-for="(itemTag, index) in item.serviceTag"
                      :key="'itemTag' + index"
                      class="jz-labelwra"
                    >
                      <div
                        class="jz-label"
                        style="color: rgb(43, 153, 255); background-color: rgb(236, 247, 255);"
                      >
                        {{ itemTag }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="c-row">
              <div
                class="c-span4"
                v-for="(itemimg, index) in item.imageList"
                :key="'c-span' + index + itemimg.nid"
              >
                <div class="jz-img-wrap-margin5 jz-img-radius c-img-y">
                  <div class="image__3lmXg jz-img" lazy-load="">
                    <div
                      class="image-inner__2uQH2"
                      :style="{
                        backgroundSize: 'cover',
                        backgroundImage: 'url(' + itemimg.src.url + ')',
                        backgroundPosition: 'center center',
                      }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 其他人还在看 -->
    <div class="infowra">
      <div class="shop-recommend-title">
        其他人还在看
      </div>
      <ul class="list-content">
        <li
          class="list-item"
          v-for="(item, index) in showHotlist"
          :key="'word' + index"
        >
          {{ item.word }}
        </li>
      </ul>
    </div>
    <div class="infowra">
      <div class="shop-recommend-title">
        {{ showWalkthroughrecommendTitle }}
        <ul class="showWalkthroughrecommendList1">
          <li
            v-for="item in showWalkthroughrecommendList1"
            :key="'showWalkthroughre' + item.nid"
          >
            <div
              class="leftlogo"
              :style="{ backgroundImage: 'url(' + item.coverImage.url + ')' }"
            ></div>
            <div class="rightinfo">
              <div class="shopname">{{ item.title }}</div>
              <div class="shopdes">{{ item.description }}</div>
              <div class="readinfo">
                <div class="lef">
                  <div
                    class="shopav"
                    :style="{
                      backgroundImage: 'url(' + item.authorInfo.avatar + ')',
                    }"
                  ></div>
                  <span>{{ item.authorInfo.name }}</span>
                </div>
                <div>{{ item.scanCount }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <van-loading v-show="isLoading" type="spinner" vertical color="#1989fa" />
  </div>
</template>
<script>
import uri from "@/config/uri";
import Vue from "vue";
import { Loading } from "vant";

Vue.use(Loading);
export default {
  data() {
    return {
      urlStr1:
        "path=%2Fdecoration%2Fwalkthrough%2Fdetail&split=1&jzts=1609222063592_0.35132050380871216&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5",
      allinfo: {},
      isLoading: true,
      authorInfo: {},
      articleInfo: [],
      reqStr: "",
      urlStr2:
        "path=%2Fdecoration%2Fwalkthrough%2Fdetail&split=2&jzts=1609222063592_0.35132050380871216&selectArea=131&gpsSelectArea=131&version=6&zxjv=46.0&reqfr=h5",
      isGetting: true,
      tags: {},
      secondTitle: "",
      secondList: [],
      showHotlist: {},
      showWalkthroughrecommendTitle: {},
      showWalkthroughrecommendList: [],
    };
  },
  computed: {
    showWalkthroughrecommendList1() {
      return this.showWalkthroughrecommendList.slice(0, 1);
    },
    showWalkthroughrecommendList2() {
      return this.showWalkthroughrecommendList.slice(1, 4);
    },
    showWalkthroughrecommendList3() {
      return this.showWalkthroughrecommendList.slice(4);
    },
  },
  methods: {
    getNextData() {
      if (!this.isGetting) return;
      this.isGetting = false;
      this.isLoading = true;
      this.$http
        .get(uri.getAirPortInfo + `?${this.reqStr}${this.urlStr2}`)
        .then((ret) => {
          this.tags = ret.data.showContentshoprec.tags;
          this.secondTitle = ret.data.showContentshoprec.title;
          this.secondList = ret.data.showContentshoprec.list;
          this.showHotlist = ret.data.showHotlist.list;
          this.showWalkthroughrecommendTitle =
            ret.data.showWalkthroughrecommend.title;
          this.showWalkthroughrecommendList =
            ret.data.showWalkthroughrecommend.list;
          this.isLoading = false;

          window.removeEventListener("scroll", this.getNextData);
        });
    },
  },
  created() {
    //头部内容显示
    this.$store.commit("setHeadName", " 装馨家");
    this.$store.commit("setIsGoBackHome", true);
    this.$store.commit("setIsGo", true);
    this.$store.commit("setSearch", true);
    let reqInfo = this.$route.query;
    let reqString = "";
    Object.keys(reqInfo).forEach((ele) => {
      reqString += ele + "=" + reqInfo[ele] + "&";
    });
    this.reqStr = reqString;
    this.$http
      .get(uri.getAirPortInfo + `?${reqString}${this.urlStr1}`)
      .then((ret) => {
        this.isLoading = false;
        this.allinfo = ret.data.showWalkthroughdetail;
        this.authorInfo = ret.data.showWalkthroughdetail.list[0].author;
        this.articleInfo = ret.data.showWalkthroughdetail.list[0].article;
      });
    // 此处有两个接口，需要协调现请求首屏接口，等到首屏渲染完毕再请求后面的接口
    // 如果一个页面有两个接口req1 与 req2  ,      req2必须等到req1请求完成才能请求，实现方式：
    // 1、req.then 函数中 请求 req2  相互嵌套
    // 2、async await  Promise.all
    // 3、把req2请求做成req1 请求成功的回调
    // 想做一个优化，等到第一屏数据渲染完毕再展示第二屏
    // 转换思维,先请求第一屏，当有滑动的时候，再请求第二屏的接口
    // 当数据多层嵌套的时候,例如一个对象嵌套一个数组，数组里面嵌套对象，对象来面嵌套数组
    // data里面仅仅获取的是第一层的数据，当执行到mounted时,里面不一定已经执行到，因此会有undefined的错误
    //  获取下一屏的数据
    window.addEventListener("scroll", this.getNextData);
  },
};
</script>
<style lang="scss" styscoped>
.showWalkthroughrecommendList1 {
  li,
  .readinfo {
    display: flex;
    font-size: 12px;
  }
  .rightinfo {
    flex: 1;
    padding-left: 10px;
  }
  .shopdes {
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font: 14px/24px Arial, Helvetica, sans-serif;
    color: #555;
    max-width: 200px;
    margin-bottom: 30px;
  }
  .shopav{
      width: 14px;
      height: 14px;
      border: 1px solid #666;
      border-radius: 50%;
      background-size: cover;
      display: inline-block;
       vertical-align: middle;
  }
  span{
      vertical-align: middle;
      padding-left: 10px;
  }
  .lef{
      flex: 1;
  }
}
.leftlogo {
  width: 108px;
  height: 108px;
  background-position: center;
  background-size: cover;
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(transparent, rgba(0, 0, 0, 0.05));
  }
}

.headerImage {
  width: 100%;
}
.infowra {
  padding: 10px 17px 15px;
  font: 14px/24px Arial, Helvetica, sans-serif;
  color: #555;
  background-color: #fff;
}
.c-gap-top-large {
  font-weight: 700;
  font-size: 20px;
  line-height: 30px;
}
.article-tags {
  height: 20px;
  line-height: 20px;
  overflow-y: hidden;
  white-space: nowrap;
}
.article-tag {
  display: inline-block;
  width: auto;
  padding: 0 10px;
  color: #ff4196;
  overflow: hidden;
  border-radius: 10px;
  font-size: 12px;
  background-color: rgba(255, 65, 150, 0.1);
  box-sizing: border-box;
  margin: 0 10px;
}
.article-author {
  margin-top: 15px;
  display: flex;
  .article-author-poster {
    margin-right: 8px;
    border: 1px solid #eee;
    border-radius: 50%;
    width: 35px;
    height: 35px;
  }
  .image-inner__2uQH2 {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 50%;
  }
  .article-author-info {
    font-weight: 700;
    color: #000;
  }
}
.article-content-text {
  letter-spacing: 1px;
  text-align: justify;
  color: #000;
  font-size: 17px;
  line-height: 29px;
  margin-top: 10px;
}
.shop-recommend-title {
  font-size: 17px;
  line-height: 27px;
  font-weight: 700;
  border-top: 4px solid #eee;
  padding-top: 10px;
}
.shop-recommend-subtitle {
  color: #999;
  font-size: 13px;
  line-height: 23px;
  .shop-recommend-subtitle-text {
    color: #333;
  }
}
.companylist {
  margin-top: 10px;
  li {
    margin-bottom: 10px;
  }
  .shop-head {
    display: flex;
    margin-bottom: 2px;
  }
  .shop-head-img {
    width: 40px;
    height: 40px;
    padding: 0;
    margin: 7px 8px 6px 0;
  }
  .shop-logo {
    width: 40px;
    height: 40px;
    border-radius: 20px;
  }
  .jz-img-wrap {
    overflow: hidden;
    position: relative;
    z-index: 3;
  }
  .jz-img-wrap .jz-img,
  .jz-img-mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .jz-img-mask {
    background: -webkit-radial-gradient(transparent, rgba(0, 0, 0, 0.05));
    background: radial-gradient(transparent, rgba(0, 0, 0, 0.05));
  }
  .shop-head-content {
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    flex: 1;
  }
  .shop-head-content .title {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    line-height: 26px;
    padding-bottom: 3px;
  }
  .company {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .company-name {
    width: 100%;
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .shop-head-content .title .company .shop-guarantee {
    margin-left: 5px;
    display: inline-block;
  }
  .guarantee-btn {
    width: 45px;
    height: 16px;
  }
  .shop-label-wrap {
    font-size: 11px;
    height: 19px;
    line-height: 19px;
    overflow: hidden;
  }
  .c-row-tile .c-row {
    padding: 0 17px;
  }
  .c-row {
    display: flex;
  }
  .c-span4 {
    width: 33.33333333%;
    -webkit-box-flex: 4;
    -webkit-flex: 4 4 auto;
    margin: 0 5px;
  }
  .jz-img-radius {
    border-radius: 8px;
  }
  .shop-head-content .title .price {
    width: 115px;
    color: #999;
    font-size: 14px;
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.jz-labelwra {
  display: inline-block;
  margin: 0 4px;
  .jz-label {
    padding: 2px 6px;
    border-radius: 10px;
  }
}
.image-inner__2uQH2 {
  height: 66px;
}

.list-item:nth-child(odd) {
  margin-right: 1%;
}
.list-item {
  border-radius: 19px;
  font-size: 14px;
  line-height: 38px;
  color: #333;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #f5f5f5;
  float: left;
  width: 49%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  text-align: center;
  padding: 0 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.list-content {
  overflow: hidden;
}
.c-gap-inner-top-large {
  padding-top: 0.15rem;
}
.c-gap-inner-bottom {
  padding-bottom: 0.1rem;
}
.img-content-horizontal-right {
  position: relative;
}
.c-span8 {
  width: 66.66666667%;
  -webkit-box-flex: 8;
  -webkit-flex: 8 8 auto;
}
.c-span1,
.c-span2,
.c-span3,
.c-span4,
.c-span5,
.c-span6,
.c-span7,
.c-span8,
.c-span9,
.c-span10,
.c-span11,
.c-span12 {
  position: relative;
  min-height: 1px;
  padding-right: 1.03092784%;
  padding-left: 1.03092784%;
}
.item-title {
  font-weight: 700;
  max-height: 52px;
  margin-bottom: 0;
}
.c-title-gray {
  color: #333;
}
.c-line-clamp2 {
  -webkit-line-clamp: 2;
}
.item-info {
  max-height: 44px;
}
.item-right-bot {
  position: absolute;
  left: 1.03092784%;
  right: 1.03092784%;
  bottom: 0;
  font-size: 12px;
  color: #999;
}
.item-right-bot-flex {
  width: 60%;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
}
.item-right-bot-flex-box {
  display: block;
  padding-left: 20px;
  width: 100%;
  overflow: visible;
  white-space: nowrap;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-left: -20px;
}
.item-right-bot-flex-avatar {
  display: inline-block;
  margin-right: 3px;
  vertical-align: middle;
  border: 1px solid #eee;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  position: relative;
  top: -1px;
}
.image-inner__2uQH2 {
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: auto auto;
  background-position: 0 0;
}
.item-right-bot-flex:nth-child(2) {
  width: 40%;
  text-align: right;
}
.item-right-bot-flex {
  width: 60%;
  -webkit-box-flex: 1;
  -webkit-flex: 1 1 auto;
}
.c-color-gray {
  color: #999;
}
.c-gap-left-small {
  margin-left: 0.05rem;
}
</style>
