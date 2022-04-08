import { debounce } from "./utils";
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImageLoader: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImageLoader = () => {
      refresh();
      // this.debounce(this.$refs.scroll.refresh, 100)();
    };
    this.$bus.$on("itemImageLoad", this.itemImageLoader);
    // console.log('我是混入的mixin');
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0); //$refs区别于使用document.queryselector，$refs只获取当前vue文件内的元素
    },
  },

}
