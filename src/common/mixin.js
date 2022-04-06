import { debounce } from "./utils";

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
