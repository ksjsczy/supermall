<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :top-images="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailSwiper from "./childComps/DetailSwiper.vue";

import DetailNavBar from "./childComps/DetailNavBar.vue";

import { getDetail } from "network/detail.js";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      console.log(res);
      this.topImages = res.data.result.itemInfo.topImages;
    });
  },
};
</script>
<style scoped>
</style>
