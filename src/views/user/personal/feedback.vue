<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">用户反馈</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-menus">
        <el-tab-pane label="用户反馈" name="userFeedback">
          <feedbackAdd></feedbackAdd>
        </el-tab-pane>
        <el-tab-pane label="我的反馈" name="myFeedback">
          <orderNoData :noData="noData"></orderNoData>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import feedbackAdd from '@/components/store/feedback-add'
import orderNoData from '@/components/store/order-no-data.vue'
export default {
  data () {
    return {
      activeName: 'userFeedback',
      pointsExchange: '',
      noData: {
        imgUrl: require('@/assets/image/person/no_collection.png'),
        tips: '这里什么都没有~',
        routerPath: '',
        buttonText: '快去逛逛'
      }
    }
  },
  components: {
    feedbackAdd,
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
@import './feedback.less';
</style>
