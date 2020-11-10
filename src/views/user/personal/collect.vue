<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">我的收藏</h3>
      <ul v-if="collectList.length > 0">
        <li class="item-content" v-for="item in collectList" :key="item.id">
          <img class="item-content__image" :src="item.image" alt="">
          <div class="item-content__desc">
            <p class="ec-name">{{item.store_name}}</p>
            <p class="ec-date">￥{{item.ot_price}}</p>
          </div>
          <el-button class="btn-detail">删除</el-button>
        </li>
      </ul>
      <orderNoData v-else :noData="noData"></orderNoData>
    </div>
  </div>
</template>

<script>
import {userCollectList} from '@/api/user'
import orderNoData from '@/components/store/order-no-data.vue'
export default {
  data () {
    return {
      activeName: 'toBeEvaluated',
      pointsExchange: '',
      collectList: [],
      noData: {
        imgUrl: require('@/assets/image/person/no_collection.png'),
        tips: '这里什么都没有~',
        routerPath: '',
        buttonText: '去逛逛'
      }
    }
  },
  created() {
    this.getUserCollectList()
  },
  components: {
    orderNoData
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getUserCollectList () {
      let data ={
        page: 1,
        limit: 10
      }
      userCollectList(data).then(res => {
        console.log(res.data)
        if (res.status === 200) {
          console.log(res.data)
          this.collectList = res.data
          console.log('啊哈哈哈哈')
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/user.less';
@import './collect.less';
</style>
