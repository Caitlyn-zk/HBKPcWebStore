<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">我的拼团</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-menus">
        <el-tab-pane label="全部" name="all"></el-tab-pane>
        <el-tab-pane label="进行中" name="haveInHand"></el-tab-pane>
        <el-tab-pane label="成功" name="success"></el-tab-pane>
        <el-tab-pane label="失败" name="fail"></el-tab-pane>
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
      activeName: 'all',
      pointsExchange: '',
      noData: {
        imgUrl: require('@/assets/image/person/icon_m_no_order.png'),
        tips: '您还没有参加过拼团',
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
@import './group.less';
</style>
