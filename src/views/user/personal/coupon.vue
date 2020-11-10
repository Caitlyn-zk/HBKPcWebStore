<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">优惠券</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-menus">
        <el-tab-pane label="未使用" name="notUsed"></el-tab-pane>
        <el-tab-pane label="已使用" name="used"></el-tab-pane>
        <el-tab-pane label="已失效" name="invalid"></el-tab-pane>
      </el-tabs>
      <div class="points-exchange">
        <el-input placeholder="请输入兑换码兑换优惠券" v-model="pointsExchange">
          <el-button :class="pointsExchange === '' ? 'no-data' : ''" slot="append">兑换</el-button>
        </el-input>
      </div>
      <orderNoData :noData="noData"></orderNoData>
    </div>
  </div>
</template>

<script>
import orderNoData from '@/components/store/order-no-data.vue'
export default {
  data () {
    return {
      activeName: 'notUsed',
      pointsExchange: '',
      noData: {
        imgUrl: require('@/assets/image/person/pc_ic_coupon.png'),
        tips: '您还没有相关优惠券哦',
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
@import './coupon.less';
</style>
