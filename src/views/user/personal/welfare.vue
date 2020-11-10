<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">我的福利</h3>
      <orderNoData :noData="noData"></orderNoData>
    </div>
  </div>
</template>

<script>
import orderNoData from '@/components/store/order-no-data.vue'
export default {
  data () {
    return {
      activeName: 'toBeEvaluated',
      pointsExchange: '',
      noData: {
        imgUrl: require('@/assets/image/person/pc_ic_coupon.png'),
        tips: '您还没有福利哦～',
        routerPath: '',
        buttonText: '快去逛逛'
      }
    }
  },
  components: {
    orderNoData
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/user.less';
@import './welfare.less';
</style>
