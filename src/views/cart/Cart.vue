<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll.vue";

import CartList from "./childComps/CartList.vue";
import CartBottomBar from "./childComps/CartBottomBar.vue";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottomBar,
  },
  computed: {
    // ...mapGetters({
    //   length: "cartLength",
    //   list: "cartList",
    // }),
    ...mapGetters(["cartLength", "cartList"]),
  },
  activated() {
    this.$refs.scroll.refresh();
  },
};
</script>
<style scoped>
.cart {
  height: 100vh;
}
.content {
  height: calc(100vh - 44px - 49px - 40px);
  width: 100%;
  overflow: hidden;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
