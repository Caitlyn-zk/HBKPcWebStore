<template>
  <li class="recommend-goods-list hk-cursor" @click="goodsDetail(item.id)">
    <div class="list-goods-img">
      <img :src="item.image" alt />
    </div>
    <p class="goods-name title-nowrap-tow margin-t-15 margin-b-10">
      {{item.store_name}}
    </p>
    <p class="goods-money-cx">
      <span class="font-14 money title-nowrap">￥{{Number(item.price).toFixed(2)}}</span>
      <span class="text-line sales-volume title-nowrap">
        销量：
        <span class="sales-volume-mun">{{item.sales}}</span>
      </span>
    </p>
  </li>
</template>

<script>
export default {
  data(){
    return{
      
    }
  },
  props:{
    item: Object
  },
  methods: {
    goodsDetail (id) {
      this.$router.push({
        path: '/front/goods/detail',
        query: { productId: id }
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="less" scoped>
@import './goods-list.less';
</style>