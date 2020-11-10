<template>
  <li class="items-main">
    <div class="hot-good-img">
      <img :src="item.image" alt="">
    </div>
    <p class="items-goods-name margin-b-10 title-nowrap-tow">
      {{item.store_name}}
    </p>
    <p class="items-goods-money">
      <span class="money">￥{{item.price}}</span>
    </p>
  </li>
</template>

<script>
export default {
  data() {
    return {
      hotGoodImg: require("../../assets/image/loading.png"),
    }
  },
  props:{
    item:Object 
  },
  created() {},
  methods: {

  }
}
</script>

<style lang="less" scoped>
@import 'hot-goods';
</style>