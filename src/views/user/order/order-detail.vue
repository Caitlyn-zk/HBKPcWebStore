<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">
        <router-link class="on-back" to="/user/order/order">我的订单</router-link>
        <i class="el-icon-arrow-right"></i> 订单详情
      </h3>
      <div class="order-main-title">
        <div class="sub-status">
          <div class="left-header">
            <span class="left-header-title">待支付</span>
            <span class="left-item">剩余结算时间：03时43分56秒</span>
          </div>
          <div class="right-header">
            <el-button>取消订单</el-button>
            <el-button>在线客服</el-button>
            <el-button class="is-unpaid">{{statusType === 1 ? '去支付' : statusType=== 3 ? '': '去评价'}}</el-button>
          </div>
        </div>
        <el-steps :active="statusType" finish-status="success" simple style="margin-top: 20px">
          <el-step title="待付款"></el-step>
          <el-step title="待发货"></el-step>
          <el-step title="待收货"></el-step>
          <el-step title="待评价"></el-step>
          <el-step title="已完成"></el-step>
        </el-steps>
        <div class="order-time">
          <span class="order-time-item">2020-09-20 08:22</span>
          <span class="order-time-item">2020-09-20 09:00</span>
          <span class="order-time-item">2020-09-20 09:52</span>
          <span class="order-time-item">2020-09-26 12:52</span>
        </div>
        <!-- 订单列表 -->
        <ul class="order-list">
          <li class="list-component-wrapper">
            <div class="card-header">
              <div class="header-left">
                <span class="left-span">{{orderInfo._add_time}}</span>
                <span class="left-span">订单号：{{orderInfo.order_id}}</span>
              </div>
              <div class="header-right">
                <span class="right-span">{{orderInfo.status | orderStatus}}</span>
              </div>
            </div>
            <div class="card-content">
              <div class="order-products">
                <div class="product-item_img">
                  <img  :src="JSON.stringify(orderInfo) !== '{}' ? orderInfo.cartInfo[0].productInfo.image: ''" alt />
                </div>
                <div class="product-item_info">
                  <p class="product-item_title">{{JSON.stringify(orderInfo) !== '{}' ? orderInfo.cartInfo[0].productInfo.store_name: ''}}</p>
                  <p class="product-item_subtitle">{{JSON.stringify(orderInfo) !== '{}' ? orderInfo.cartInfo[0].product_attr_unique : ''}}</p>
                  <div class="tag-pc">
                    <span class="sale-icon">直降</span>
                  </div>
                </div>
                <div class="product-item_price">
                  <p class="sale-price">￥{{JSON.stringify(orderInfo) !== '{}' ? orderInfo.cartInfo[0].price : ''}}</p>
                  <p class="product-quantity padding-t-8">
                    <i class="el-icon-close"></i>1
                  </p>
                </div>
              </div>
              <div class="order-price">
                <p class="total">￥{{orderInfo.total_price}}</p>
                <p class="total-products">共{{orderInfo.total_num}}个商品</p>
              </div>
              <div class="order-buttons">
                <span>已关闭</span>
              </div>
            </div>
          </li>
        </ul>
        <!-- 收货信息 -->
        <div class="receiving-info">
          <div class="receiving-info-bar">收货信息</div>
          <div class="receipt-detail">
            <p>{{orderInfo.real_name}} {{orderInfo.user_phone}}</p>
            <p class="margin-t-13">{{orderInfo.user_address}}</p>
          </div>
        </div>
        <!-- 订单信息单价 -->
        <div class="order-detail-page_price">
          <div class="font-14">
            <p class="padding-tb-10 text-r">商品金额:</p>
            <p class="padding-tb-10 text-r">运费:</p>
            <p class="padding-tb-10 text-r">支付运费:</p>
            <p class="padding-tb-10 text-r">需付金额:</p>
          </div>
          <div class="font-14 margin-l-36">
            <p class="padding-tb-10 text-r">￥{{orderInfo.total_price}}</p>
            <p class="padding-tb-10 text-r">￥{{orderInfo.freight_price}}</p>
            <p class="padding-tb-10 text-r">￥{{orderInfo.pay_postage}}</p>
            <p class="padding-tb-10 text-r font-22 toder">￥{{orderInfo.pay_price}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userOrderDetail} from '@/api/user'
export default {
  filters: {
    orderStatus(value) {
      if (value === 0) {
        return '待发货'
      } else if (value === 1) {
        return '待收货'
      } else if (value === 2) {
        return '待评价'
      } else {
        return '已完成'
      }
    }
  },
  data() {
    return {
      activeName: "toBeEvaluated",
      statusType: 1,
      pointsExchange: "",
      orderList: [0],
      orderId: '',
      orderInfo: {}
    };
  },
  created () {
    this.orderId = this.$route.query.orderId;
    console.log(this.orderId)
    this.getUserOrderDetail()
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    getUserOrderDetail () {
      userOrderDetail(this.orderId).then(res => {
        if(res.status === 200) {
          console.log('请求订单详情成功')
          console.log(res.data)
          this.orderInfo = res.data
          this.statusType = res.data._status._type + 1
        }
      })
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/css/user.less";
@import "./order-detail.less";
</style>
