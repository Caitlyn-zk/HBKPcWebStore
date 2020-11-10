<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">售后记录</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-menus">
        <el-tab-pane label="申请售后" name="apply"></el-tab-pane>
        <el-tab-pane label="服务记录" name="record"></el-tab-pane>
      </el-tabs>
      <orderNoData :noData="noData"></orderNoData>
    </div>
  </div>
</template>

<script>
import orderNoData from '@/components/store/order-no-data.vue'
export default {
  data () {
    return {
      activeName: 'apply',
      pointsExchange: '',
      noData: {
        imgUrl: require('@/assets/image/person/icon_m_no_order.png'),
        tips: '您还没有售后服务记录',
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
@import './after-sales-record.less';
</style>
