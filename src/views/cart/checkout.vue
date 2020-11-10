<template>
  <div class="checkout">
    <div class="content">
      <!-- 收货地址 -->
      <div class="shipping-address">
        <div class="title">
          <h3 class="title-text">收货地址</h3>
          <el-button type="text" @click="onDialog(1)">新增收货地址</el-button>
        </div>
        <div class="address-list-checkout">
          <div
            class="address-item"
            v-for="(item,index) in addressList"
            :key="index"
            :class="item.is_default === 1 ? 'address-item--choosed' : ''"
            @click="selectAddress(item.id)"
          >
            <span class="components-radio">
              <el-radio v-model="isSelect" :label="item.id" @change="selectAddress"></el-radio>
            </span>
            <span
              class="item-address title-nowrap"
            >{{item.province}}{{item.city}}{{item.district}}{{item.detail}}</span>
            <span class="item-name title-nowrap">{{item.real_name}}</span>
            <span class="margin-r-30 title-nowrap">{{item.phone}}</span>
            <span v-if="item.is_default === 1">默认地址</span>
            <span v-else class="text-color-blue" @click="onSetIsDefault(item.id)">设为默认</span>
            <span class="address-item_operation text-color-blue" @click="onDialog(item)">修改本地址</span>
          </div>
        </div>
      </div>
      <div class="order-info padding-b-50">
        <h3 class="title">商品信息</h3>
        <div class="checkout-page-main">
          <div class="product-list-wrapper">
            <div class="product-list__table-title">
              <div class="goods-name">商品名称</div>
              <div class="goods-price">单价</div>
              <div class="goods-num">数量</div>
              <div class="subtotal">小计</div>
            </div>
          </div>
          <ul class="product-list" v-if="orderGroupInfo.cartInfo">
            <li class="checkout-card-pc" v-for="item in orderGroupInfo.cartInfo" :key="item.id">
              <div class="product-card_name-wrapper">
                <div class="product-card_img margin-r-11">
                  <img :src="item.productInfo.image" alt />
                </div>
                <div class="product-card_name">
                  <p>{{item.productInfo.store_name}}</p>
                  <p
                    class="font-12 text-line"
                    v-if="item.productInfo.attrInfo"
                  >{{item.productInfo.attrInfo.suk}}</p>
                </div>
                <div class="product-cart_tag"></div>
              </div>
              <div class="product-card_price">￥{{item.productInfo.price}}</div>
              <div class="product-card_amount">{{item.cart_num}}</div>
              <div
                class="product-card_totle text-color-red"
              >￥{{item.productInfo.price * item.cart_num}}</div>
            </li>
          </ul>
        </div>
        <div class="checkout-info">
          <div class="checkout-others__left">
            <div class="checkout-others_line-title">商品总价：</div>
            <div class="checkout-others_line-title">运费：</div>
            <div class="checkout-others_line-title">合计：</div>
          </div>
          <div class="checkout-others__right">
            <div class="checkout-others_line-title">￥{{priceGroup.totalPrice}}</div>
            <div class="checkout-others_line-title">￥00.00</div>
            <div class="checkout-others_line-title checkout-others_total">￥{{priceGroup.totalPrice}}</div>
          </div>
        </div>
        <div class="text-r tooltip-popover">
          <el-popover
            placement="left-start"
            popper-class="hk-el-popover"
            width="534"
            trigger="hover"
            content="1、发货时间：小度智选商城订单一般会在 7 天内尽快发出（参照订单的支付顺序），请您在提交订单后尽快完成支付；通过 Du 码、预售等方式购买的商品无法保证 7 天内发货。
2、运输方式：由于音箱设备属于磁性物品类不符合航空运输的基本要求，因此我们选择更为安全的陆运为您发货， 请谅解。"
          >
            <el-button type="text" class="tooltip-text" slot="reference">
              购买须知
              <i class="el-icon-question"></i>
            </el-button>
          </el-popover>
        </div>
        <div class="checkout-bottom-bar-wrap" :class="isfixed ? 'fixed': ''">
          <div class="checkout-bottom_tips">送至：{{checkoutAddress}}</div>
          <div class="checkout-bottom_button">提交订单</div>
        </div>
      </div>
    </div>
    <addAddressDialog
      :addAddress="addAddress"
      :addressItem="addressItem"
      @close="onCloseReportPopup"
      @onAddressAdd="onAddressAdd"
    ></addAddressDialog>
  </div>
</template>

<script>
import addAddressDialog from "@/components/popup/add-address";
import { getAddressList, setIsDefault } from "@/api/user";
import { postOrderConfirm, postOrderComputed, createOrder } from "@/api/order";
import { isWeixin } from "@/utils";
const NAME = "OrderSubmission",
  _isWeixin = isWeixin();
export default {
  data() {
    return {
      addressList: [],
      addressItem: {},
      addAddress: {
        eject: false,
        edit: {},
      },
      isfixed: false,
      isSelect: 1,
      checkoutAddress: "",
      cartid: null,
      pinkId: null,
      orderGroupInfo: {},
      offlinePayStatus: 0,
      deduction: false,
      // 优惠券
      usableCoupon: {},
      // 地址信息
      addressInfo: {},
      system_store: [],
      store_self_mention: 0,
      priceGroup: {},
      shipping_type: 0,
      deduction: true,
      useIntegral: false,
      active: _isWeixin ? "weixin" : "yue",
      isKaiFapiao: 0,
    };
  },
  created() {
    this.get_AddressList();
    this.getCartInfo();
  },
  components: {
    addAddressDialog,
  },
  mounted() {
    let that = this;
    if (that.$route.query.pinkid !== undefined)
      that.pinkId = that.$route.query.pinkid;
    if (that.$route.params.id !== undefined)
      that.cartid = that.$route.params.id;
    document.addEventListener("scroll", this.scrollLoad);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollLoad);
  },
  methods: {
    onDialog(e) {
      this.addAddress.eject = true;
      if (e !== 1) {
        this.addAddress.edit = e;
      }
      this.addressItem = e;
    },
    onCloseReportPopup(e) {
      this.addAddress.eject = false;
    },
    // 获取地址列表
    get_AddressList() {
      getAddressList().then((res) => {
        if (res.status === 200) {
          this.addressList = res.data;
          this.addressList.forEach((item) => {
            if (item.is_default === 1) {
              this.isSelect = item.id;
              this.checkoutAddress =
                item.province + item.city + item.district + item.detail;
            }
          });
        }
      });
    },
    // 设置默认地址
    onSetIsDefault(id) {
      setIsDefault(id)
        .then((res) => {
          if (res.status === 200) {
            this.get_AddressList();
            this.$message({
              message: "设置默认地址成功",
              type: "success",
            });
          }
        })
        .catch((res) => {
          this.$message({
            message: res.msg,
            type: "error",
          });
        });
    },
    // 获取组件传过来的值
    onAddressAdd(val) {
      // console.log(val)
      // 添加成功调一下地址接口
      if (val === "success") {
        this.get_AddressList();
      }
    },
    // 选择地址
    selectAddress(val) {
      console.log(val);
      this.isSelect = val;
      this.addressList.forEach((item) => {
        if (item.id === val) {
          this.isSelect = item.id;
          this.checkoutAddress =
            item.province + item.city + item.district + item.detail;
        }
      });
    },
    scrollLoad() {
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if (nowScotop >= scrollHeight - wheight * 2) {
        this.$set(this, "isfixed", false);
      } else {
        this.$set(this, "isfixed", true);
      }
    },
    getCartInfo() {
      const cartIds = this.$route.params.id;
      if (!cartIds) {
        this.$message.error("参数有误");
        return this.$router.go(-1);
      }
      postOrderConfirm(cartIds).then((res) => {
          this.offlinePayStatus = res.data.offline_pay_status;
          this.orderGroupInfo = res.data;
          this.deduction = res.data.deduction;
          this.usableCoupon = res.data.usableCoupon || {};
          this.addressInfo = res.data.addressInfo || {};
          this.system_store = res.data.system_store || {};
          this.store_self_mention = res.data.store_self_mention;
          this.priceGroup = res.data.priceGroup;
          console.log(res.data);
          console.log("获取订单数据");
        })
        .catch(() => {
          this.$message.error("加载订单数据失败");
      });
    },
    computedPrice() {
      let shipping_type = this.shipping_type;
      postOrderComputed(this.orderGroupInfo.orderKey, {
        addressId: this.addressInfo.id,
        useIntegral: this.useIntegral ? 1 : 0,
        couponId: this.usableCoupon.id || 0,
        shipping_type: parseInt(shipping_type) + 1,
        payType: this.active,
      })
        .then((res) => {
          const data = res.data;
          console.log(resd.data);
          // if (data.status === "EXTEND_ORDER") {
          //   this.$router.replace({
          //     path: "/order/detail/" + data.result.orderId,
          //   });
          // } else {
          //   this.orderPrice = data.result;
          // }
        })
        .catch((res) => {
          this.$message.error(res.msg);
        });
    },
  },
  watch: {
    useIntegral() {
      this.computedPrice();
    },
    $route(to, from) {
      if (from.name == "TaxInfo") {
        this.$set(this, "isKaiFapiao", parseInt(this.$route.query.index));
      } else {
        this.isKaiFapiao = 0;
      }
      if (to.name === NAME) {
        this.getCartInfo();
      }
    },
    shipping_type() {
      this.computedPrice();
    },
  },
};
</script>

<style lang="less" scoped>
@import "./checkout.less";
</style>
