<template>
  <li class="list-component-wrapper">
    <div class="card-header">
      <div class="header-left">

        <span class="left-span">{{item._add_time}}</span>
        <!-- <span class="left-span">ee</span> -->
        <span class="left-span">订单号：{{item.order_id}}</span>
      </div>
      <div class="header-right">
        <span class="right-span">{{item.status | orderStatus}}</span>
      </div>
    </div>
    <div class="card-content">
      <div class="order-products">
        <div class="product-item_img">
          <img :src="item ? item.cartInfo[0].productInfo.image: ''" alt="">
        </div>
        <div class="product-item_info">
          <p class="product-item_title">{{item ? item.cartInfo[0].productInfo.store_name: ''}}</p>
          <p class="product-item_subtitle">{{item ? item.cartInfo[0].product_attr_unique : ''}}</p>
          <div class="tag-pc">
            <span class="sale-icon">直降</span>
          </div>
        </div>
        <div class="product-item_price">
          <p class="sale-price">￥{{item.pay_price}}</p>
          <p class="product-quantity padding-t-8"><i class="el-icon-close"></i>1</p>
        </div>
      </div>
      <div class="order-price">
        <p class="total">￥{{item.total_price}}</p>
        <p class="total-products">共{{item.total_num}}个商品</p>
      </div>
      <div class="order-buttons">
        <el-button @click="onOrderDetail(item.order_id)">订单详情</el-button>
      </div>
    </div>
  </li>
</template>

<script>
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
  props: {
    item: {}
  },
  data () {
    return {}
  },
  created() {
    console.log('订单列表')
    console.log(this.item)
  },
  methods: {
    onOrderDetail (order_id) {
      console.log('点击查看详情')
      this.$router.push({path: '/user/aftersales/orderdetail',query: {orderId: order_id}})
    },
  }
}
</script>

<style lang="less" scoped>
.order-list {
  padding-top: 24px;
  .list-component-wrapper {
    height: 189px;
    width: 978px;
    border: 1px solid #e1e1e1;
    margin-bottom: 20px;
    .card-header {
      display: flex;
      justify-content: space-between;
      height: 34px;
      line-height: 34px;
      padding-left: 20px;
      padding-right: 20px;
      background: #f2f2f2;
      font-size: 12px;
      .header-left {
        .left-span {
          padding-right: 13px;
          margin-right: 13px;
          border-right: 1px solid #E1E1E1;
          display: inline-block;
          height: 14px;
          line-height: 1;
          &:last-child {
            border-right: none;
          }
        }
      }
      .header-right {
        display: flex;
        .right-span  {
          display: inline-block;
          margin-left: 10px;
        }
      }
    }
    .card-content {
      display: flex;
      justify-content: space-between;
      padding: 20px;
      .order-products {
        width: 596px;
        display: flex;
        .product-item_img {
          width: 113px;
          img {
            width: 113px;
            height: 113px;
            border: 1px solid #E1E1E1;
          }
        }
        .product-item_info {
          width: 350px;
          margin-left: 11px;
          .product-item_title {
            line-height: 20px;
          }
          .product-item_subtitle {
            font-size: 14px;
            color: #999;
            padding: 4px 0;
          }
          .tag-pc {
            .sale-icon {
              height: 18px;
              line-height: 19px;
              padding-left: 7px;
              padding-right: 7px;
              background: #EF4146;
              color: #FFFFFF;
              border-radius: 2px;
              font-size: 12px;
              margin-right: 7px;
              display: inline-block;
            }
          }
        }
        .product-item_price {
          -webkit-box-flex: 1;
          -ms-flex: 1;
          flex: 1;
          text-align: right;
          .sale-price {
            font-weight: 600;
          }
        }
      }
    }
    .order-price {
      text-align: center;
      .total {
        margin-bottom: 7px;
        font-weight: 600;
        font-size: 14px;
        color: #363636;
      }
      .total-products {
        color: #999999;
        margin-top: -4px;
      }
    }
    .order-buttons {
      width: 120px;
      .el-button {
        width: 100%;
        height: 36px;
        line-height: 34px;
        padding: 0;
        cursor: pointer;
        &:hover,&:focus {
          border-color: #EF4146;
          background: transparent;
          color: #EF4146;
        }
      }
    }
  }
}
</style>