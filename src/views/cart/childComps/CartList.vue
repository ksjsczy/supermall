<template>
  <div class="cart-list">
    <cart-list-item
      v-for="(item, index) in cartList"
      :itemInfo="item"
      :key="index"
    ></cart-list-item>
  </div>
</template>

<script>
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  components: {
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartLength", "cartList"]),
  },
};
</script>
<style scoped>
</style>
