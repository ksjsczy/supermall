<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    click: {
      type: Boolean,
      default: false,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: this.click,
      pullUpLoad: this.pullUpLoad,
      // observeDom: true,
      // taps: true,
    });

    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x = 0, y = 0, time = 500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>
<style scoped>
</style>

