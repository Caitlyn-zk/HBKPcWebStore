<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">请选择申请方式</h3>
      <div class="hk-coupon-apply">
        <div class="area" v-if="!isWriteOrders">
          <div class="item">
            <img class="item-img" src="@/assets/image/person/sale-after-entrance.png" alt="">
            <p class="first-title">快速申请</p>
            <p class="sub-title">小度智选商城购买的订单，支持通过订单快速申请</p>
            <el-button class="btn__black btn__normal" @click="onApplyList">申请售后</el-button>
          </div>
          <div class="item">
            <img class="item-img" src="@/assets/image/person/sale-after-entrance.png" alt="">
            <p class="first-title">填写申请单</p>
            <p class="sub-title">其他渠道购买的产品唯一识别码和购买凭证申请售后</p>
            <el-button class="btn__black btn__normal" @click="writeOrders">申请售后</el-button>
          </div>
        </div>
        <div v-else>
          <h3 class="title margin-tb-24">填写订单信息</h3>
          <div class="sn-con">
            <span>设备单号：</span>
            <el-input class="sn-con-input" v-model="oddNumbers"></el-input>
          </div>
          <el-button class="check-btn">确认选择</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'toBeEvaluated',
      pointsExchange: '',
      isWriteOrders: false,
      oddNumbers: ''
    }
  },
  methods: {
    onApplyList() {
      this.$router.push({
        path: '/user/aftersales/record'
      })
    },
    // 填单申请
    writeOrders () {
      console.log('点击了天机订单申请按钮')
      this.isWriteOrders = !this.isWriteOrders
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/user.less';
@import './apply.less';
</style>
