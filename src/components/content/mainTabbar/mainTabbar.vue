<template>
  <div>
    <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <img slot="item-icon" src="~assets/img/tabbar/home/home.svg" alt="" />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/home/home_active.svg"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="red">
        <img
          slot="item-icon"
          src="~assets/img/tabbar/category/category.svg"
          alt=""
        />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/category/category_active.svg"
          alt=""
        />
        <div slot="item-text">分类</div>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="red">
        <img
          slot="item-icon"
          src="~assets/img/tabbar/shopcart/shopcart.svg"
          alt=""
        />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/shopcart/shopcart_active.svg"
          alt=""
        />
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="red">
        <img
          slot="item-icon"
          src="~assets/img/tabbar/profile/profile.svg"
          alt=""
        />
        <img
          slot="item-icon-active"
          src="~assets/img/tabbar/profile/profile_active.svg"
          alt=""
        />
        <div slot="item-text">首页</div>
      </tab-bar-item>
    </tab-bar>
  </div>
</template>

<script>
// import TabBar from "components/common/tabbar/TabBar.vue";
import TabBar from "components/common/tabbar/TabBar.vue";
import TabBarItem from "components/common/tabbar/TabBarItem.vue";
export default {
  name: "mainTabbar",
  components: {
    TabBar,
    TabBarItem,
  },
};
</script>
<style scoped>
</style>
