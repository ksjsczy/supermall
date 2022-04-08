<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isSelectAll"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>
    <div class="calculate" @click="calculateClick">
      去结算：{{ totalCount }}
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return (
        "¥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    totalCount() {
      return this.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      return Boolean(
        // !this.cartList.filter((item) => !item.checked).length &&
        // this.cartList.length
        !this.cartList.find((item) => !item.checked) && this.cartList.length
      );
    },
    isSelectNone() {
      return this.cartList.find((item) => item.checked) == undefined;
    },
  },
  methods: {
    checkClick() {
      // if (this.isSelectAll) {
      //   this.cartList.forEach((item) => (item.checked = false));
      // } else {
      //   this.cartList.forEach((item) => (item.checked = true));
      // }
      const temp = !this.isSelectAll;
      this.cartList.forEach((item) => (item.checked = temp));
    },
    calculateClick() {
      if (this.isSelectNone) {
        this.$toast.show("请选中商品后进行结算");
      }
    },
  },
  deactivated() {
    this.$toast.isShow = false;
  },
};
</script>
<style scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40px;
  background-color: #eee;
}
.check-content {
  display: flex;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  height: 20px;
}
.calculate {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 110px;
  line-height: 40px;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
}
</style>
