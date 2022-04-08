<template>
  <div class="toast" v-show="isShow">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // show: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      isShow: false,
      timer: null,
    };
  },
  methods: {
    show(res, duration = 1500) {
      clearTimeout(this.timer);
      this.message = res;
      this.isShow = true;
      this.timer = setTimeout(() => {
        this.isShow = false;
      }, duration);
    },
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  padding: 12px 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}
</style>
