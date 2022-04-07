<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detailNav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :click="true"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info
        :commentInfo="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <goods-list :goods="recommends" ref="recommends"></goods-list>
    </scroll>
    <back-top
      class="backTop"
      @click.native="backClick"
      v-show="isShow"
    ></back-top>
    <detail-bottom-bar></detail-bottom-bar>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import BackTop from "components/content/backTop/BackTop";

import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

// import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [0, -500, -1000, -1500],
      isShow: false,
      // itemImageLoader: null,
    };
  },
  mixins: [itemListenerMixin],
  components: {
    Scroll,
    GoodsList,
    BackTop,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.data.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      this.shop = new Shop(data.shopInfo);
      this.detailInfo = data.detailInfo;
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      this.$nextTick(() => {
        // 根据最新的数据，对应的DOM是已经被渲染出来
        // 但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
        // this.$refs.scroll.refresh();
        // this.themeTopYs[1] = -this.$refs.param.$el.offsetTop;
        // this.themeTopYs[2] = -this.$refs.comment.$el.offsetTop;
        // this.themeTopYs[3] = -this.$refs.recommends.$el.offsetTop;
      });
    });
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.data.list;
    });
  },
  mounted() {
    // const refresh = debounce(this.$refs.scroll.refresh, 100);
    // this.itemImageLoader = () => {
    //   refresh();
    //   // this.debounce(this.$refs.scroll.refresh, 100)();
    // };
    // this.$bus.$on("ItemImageLoad", this.itemImageLoader);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageLoader);
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs[1] = -this.$refs.param.$el.offsetTop;
      this.themeTopYs[2] = -this.$refs.comment.$el.offsetTop;
      this.themeTopYs[3] = -this.$refs.recommends.$el.offsetTop;
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, this.themeTopYs[index], 500);
    },
    contentScroll(position) {
      if (-position.y >= -this.themeTopYs[3]) {
        this.$refs.detailNav.currentIndex = 3;
      } else if (-position.y >= -this.themeTopYs[2]) {
        this.$refs.detailNav.currentIndex = 2;
      } else if (-position.y >= -this.themeTopYs[1]) {
        this.$refs.detailNav.currentIndex = 1;
      } else {
        this.$refs.detailNav.currentIndex = 0;
      }

      //backTop
      this.isShow = -position.y > 1000;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //$refs区别于使用document.queryselector，$refs只获取当前vue文件内的元素
    },
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 20;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 20;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}

.back-top {
  position: fixed;
  right: 8px;
  bottom: 64px;
  z-index: 10;
}
</style>
