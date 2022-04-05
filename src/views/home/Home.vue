<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :click="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        class="tab-control"
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top
      class="backTop"
      @click.native="backClick"
      v-show="isShow"
    ></back-top>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop,
    HomeSwiper,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      count: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeMultidata();
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 100);
    this.$bus.$on("itemImageLoad", () => {
      refresh();
      // this.debounce(this.$refs.scroll.refresh, 100)();
    });
  },
  methods: {
    debounce(fn, delay) {
      let timer = null;
      return function (...args) {
        if (timer) {
          clearTimeout(timer);
        }
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      };
    },
    // debounce(fn, delay) {
    //   let timer = null;
    //   return function () {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //     timer = setTimeout(fn, delay);
    //   };
    // },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page++ + 1;
      getHomeGoods(type, page).then((res) => {
        console.log(this.goods);
        this.goods[type].list.push(...res.data.data.list);
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //$refs区别于使用document.queryselector，$refs只获取当前vue文件内的元素
    },
    contentScroll(position) {
      if (position.y < -1000) {
        this.isShow = true;
      } else {
        this.isShow = false;
      }
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
      this.$refs.scroll.finishPullUp();
    },
  },
};
</script>
<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;
  background-color: var(--color-tint);
  color: #fff;
}
.tab-control {
  position: sticky;
  top: 44px;
  background-color: #fff;
}
/* .content {
  height: calc(100% - 49px);
  overflow: hidden;
} */
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
