<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">我的订单</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-menus">
        <!-- <el-tab-pane label="全部订单" name="all"></el-tab-pane> -->
        <el-tab-pane label="待支付" name="payment">
          <ul class="order-list" v-if="paymentList.length > 0">
            <orderListItemA v-for="(item,index) in paymentList" :key="index" :item="item"></orderListItemA>
          </ul>
          <orderNoData v-else :noData="noData"></orderNoData>
          <div class="text-center" v-show="paymentListLength !== 1">{{paymentListLength/5 !== page0 ? '已经加载全部了' : ''}}</div>
        </el-tab-pane>
        <el-tab-pane label="待发货" name="deliverGoods">
          <ul class="order-list" v-if="deliverGoodsList.length > 0">
            <orderListItemB v-for="(item,index) in deliverGoodsList" :key="index" :item="item"></orderListItemB>
          </ul>
          <orderNoData v-else :noData="noData"></orderNoData>
          <div class="text-center" v-show="deliverGoodsListLength !== 1">{{deliverGoodsListLength/5 !== page1 ? '已经加载全部了' : ''}}</div>
        </el-tab-pane>
        <el-tab-pane label="待收货" name="receivingGoods">
          <ul class="order-list" v-if="receivingGoodslist.length > 0">
            <orderListItemC v-for="(item,index) in receivingGoodslist" :key="index" :item="item"></orderListItemC>
          </ul>
          <orderNoData v-else :noData="noData"></orderNoData>
          <div class="text-center" v-show="receivingGoodslistLength !== 1">{{receivingGoodslistLength/5 !== page2 ? '已经加载全部了' : ''}}</div>
        </el-tab-pane>
        <el-tab-pane label="已完成" name="complete">
          <ul class="order-list" v-if="completeList.length > 0">
            <orderListItemD v-for="(item,index) in completeList" :key="index" :item="item"></orderListItemD>
          </ul>
          <orderNoData v-else :noData="noData"></orderNoData>
          <div class="text-center" v-show="completeListLength !== 1">{{completeListLength/5 !== page3 ? '已经加载全部了' : ''}}</div>
        </el-tab-pane>
        <el-tab-pane label="待评价" name="evaluate">
          <ul class="order-list" v-if="evaluateList.length > 0">
            <orderListItemE v-for="(item,index) in evaluateList" :key="index" :item="item"></orderListItemE>
          </ul>
          <orderNoData v-else :noData="noData"></orderNoData>
          <div class="text-center" v-show="evaluateListLength !== 1">{{evaluateListLength/5 !== page4 ? '已经加载全部了' : ''}}</div>
        </el-tab-pane>
      </el-tabs>
      <div class="hk-screening-time">
        <el-select v-model="screenOrder" placeholder="请选择">
          <el-option
            v-for="item in screenItemList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="loading text-center" v-if="loading">
        <div class="flashing">
          <div class="dot-collision"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userOrderList} from '@/api/user'
import orderListItemA from '@/components/store/order-list.vue'
import orderListItemB from '@/components/store/order-list.vue'
import orderListItemC from '@/components/store/order-list.vue'
import orderListItemD from '@/components/store/order-list.vue'
import orderListItemE from '@/components/store/order-list.vue'
import orderNoData from '@/components/store/order-no-data.vue'
export default {
  
  data () {
    return {
      activeName: 'payment',
      pointsExchange: '',
      screenItemList: [{
        value: 10,
        label: '近三个月订单'
      }, {
        value: 20,
        label: '半年内订单'
      }, {
        value: 30,
        label: '全部订单'
      }],
      screenOrder: 10,
      orderList: [],
      paymentList: [],
      deliverGoodsList: [],
      receivingGoodslist:[],
      evaluateList: [],
      completeList: [],
      isType: 0,
      page0: 1,
      page1: 1,
      page2: 1,
      page3: 1,
      page4: 1,
      paymentListLength: 0,
      deliverGoodsListLength: 0,
      receivingGoodslistLength: 0,
      evaluateListLength: 0,
      completeListLength: 0,
      noData: {
        imgUrl: require('@/assets/image/person/icon_m_no_order.png'),
        tips: '您还没有相关订单',
        routerPath: '',
        buttonText: '快去逛逛'
      },
      loading: false
    }
  },
  created () {
    this.getOrderList()
  },
  components: {
    orderListItemA,
    orderListItemB,
    orderListItemC,
    orderListItemD,
    orderListItemE,
    orderNoData
  },
  mounted() {
    document.addEventListener("scroll", this.scrollLoad);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollLoad);
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
      // 当点击待评价，跳转到评价晒单页面
      if (tab.name === 'payment') {
        this.isType = 0 // 未支付
        this.getOrderList()
      } else if (tab.name === 'deliverGoods') {
        this.isType = 1 // 待发货
        this.getOrderList()
      } else if (tab.name === 'receivingGoods') {
        this.isType = 2 // 待收货
        this.getOrderList()
      } else if (tab.name === 'evaluate') {
        this.isType = 3 // 待评价
        this.getOrderList()
      } else if (tab.name === 'complete') {
        this.isType = 3 // 已完成
        this.getOrderList()
      }
      // if (tab.name === 'evaluate') {
      //   this.$router.push({ path: "/user/order/evaluate" });
      // }
    },
    
    scrollLoad() {
      this.loading = true;
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      console.log(this.orderListLength / 5 === this.page)
      if (this.isType === 0) {
        if (
          nowScotop >= scrollHeight - wheight &&
          this.paymentListLength / 5 === this.page0
        ) {
          this.$set(this, "page0", this.page0 + 1);
          this.getOrderList();
        }
        this.loading = false
      } else if (this.isType === 1) {
        if (
          nowScotop >= scrollHeight - wheight &&
          this.deliverGoodsListLength / 5 === this.page1
        ) {
          this.$set(this, "page1", this.page1 + 1);
          this.getOrderList();
        }
        this.loading = false
      } else if (this.isType === 2) {
        if (
          nowScotop >= scrollHeight - wheight &&
          this.receivingGoodslistLength / 5 === this.page2
        ) {
          this.$set(this, "page2", this.page2 + 1);
          this.getOrderList();
        }
        this.loading = false
      } else if (this.isType === 3) {
        if (
          nowScotop >= scrollHeight - wheight &&
          this.evaluateListLength / 5 === this.page3
        ) {
          this.$set(this, "page3", this.page3 + 1);
          this.getOrderList();
        }
        this.loading = false
      } else if (this.isType === 4) {
        if (
          nowScotop >= scrollHeight - wheight &&
          this.completeListLength / 5 === this.page4
        ) {
          this.$set(this, "page4", this.page4 + 1);
          this.getOrderList();
        }
        this.loading = false
      }
    },
    
    // 获取订单列表
    getOrderList() {
      let that = this
      let parameter = {
        type: this.isType,// 订单状态
        page: this.page, // 分页参数起始值 默认0查询全部
        limit: 5, // 分页数步长值
        search: '', // 搜索订单编号
      }
      userOrderList(parameter).then(res => {
        if (res.status === 200) {
          console.log('请求成功')
          console.log(res.data)
          if (that.isType === 0) {
            if (that.page0 > 1) {
              that.$set(that, "paymentList", that.paymentList.concat(res.data));
              that.orderListLength = that.paymentList.length;
            } else {
              that.paymentList = res.data;
              that.paymentListLength = that.paymentList.length;
            }
            console.log('我是第一个')
          } else if (that.isType === 1) {
            if (that.page1 > 1) {
              that.$set(that, "deliverGoodsList", that.deliverGoodsList.concat(res.data));
              that.deliverGoodsListLength = that.deliverGoodsList.length;
            } else {
              that.deliverGoodsList = res.data;
              that.deliverGoodsListLength = that.deliverGoodsList.length;
            }
          } else if (that.isType === 2) {
            if (that.page2 > 1) {
              that.$set(that, "receivingGoodslist", that.receivingGoodslist.concat(res.data));
              that.receivingGoodslistLength = that.receivingGoodslist.length;
            } else {
              that.receivingGoodslist = res.data;
              that.receivingGoodslistLength = that.receivingGoodslist.length;
            }
          } else if (that.isType === 3) {
            if (that.page3 > 1) {
              that.$set(that, "evaluateList", that.evaluateList.concat(res.data));
              that.evaluateListLength = that.evaluateList.length;
            } else {
              that.evaluateList = res.data;
              that.evaluateListLength = that.evaluateList.length;
            }
          } else if (that.isType === 4) {
            if (that.page4 > 1) {
              that.$set(that, "completeList", that.completeList.concat(res.data));
              that.completeListLength = that.completeList.length;
            } else {
              that.completeList = res.data;
              that.completeListLength = that.completeList.length;
            }
          }
          // paymentList: [],
          // deliverGoodsList: [],
          // receivingGoodslist:[],
          // evaluateList: [],
          // completeList: [],

          // if (this.page > 1) {
          //   this.$set(this, "orderList", this.orderList.concat(res.data));
          //   that.orderListLength = that.orderList.length;
          // } else {
          //   that.orderList = res.data;
          //   that.orderListLength = that.orderList.length;
          // }
        }
        this.loading = false
      }).catch(res => {
        this.loading = true;
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/user.less';
@import './order.less';
</style>
