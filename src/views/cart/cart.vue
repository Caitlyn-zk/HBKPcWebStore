<template>
  <div class="my-cart">
    <div class="content">
      <div class="user-person">
        <div class="content user-person-bar">
          <ul class="user-menu">
            <li>现场秒杀</li>
            <li>马上团购</li>
            <li>购物商城</li>
          </ul>
          <div class="serch-main">
            <el-input placeholder="请输入内容" v-model="inputSearch">
              <template slot="append">
                <button @click="onSearch">
                  <i class="el-icon-search"></i>
                </button>
              </template>
            </el-input>
          </div>
        </div>
      </div>
      <!-- 购物车列表 -->
      <div class="my-cart-list margin-b-20" v-if="cartList.valid.length > 0 || cartList.invalid.length > 0">
        <ul class="my-cart-title">
          <li class="checkbox-all">
            <div class="checkbox-wrapper">
              <label class="well-check">
                <input
                  type="checkbox"
                  name=""
                  value=""
                  :checked="isAllSelect && cartCount > 0"
                  @click="allChecked"
                />
                <i class="icon el-icon-check"></i>
                <span class="checkAll">全选 ({{ cartCount }})</span>
              </label>
            </div>
          </li>
          <li class="name font-14">商品</li>
          <li class="price font-14">单价</li>
          <li class="inputNumberTitle font-14">数量</li>
          <li class="sum font-14">小计</li>
          <li class="action font-14">操作</li>
        </ul>
        <div class="group-cart">
          <div class="item" v-for="(item, index) in cartList.valid" :key="index">
            <!-- <div class="promotion-title">
              <div class="content">
                <span class="promotion-type">加价购</span>
                <span class="promotion-text">+15元购原价28.8元小度VIP会员（季卡）</span>
                <el-button class="change-product">去换购></el-button>
              </div>
            </div> -->
            <div class="cart_item_bg">
              <div class="checkbox">
                <div class="checkbox-wrapper">
                  <label class="well-check">
                    <input
                      type="checkbox"
                      name=""
                      value=""
                      :checked="item.checked"
                      @click="switchSelect(index)"
                    />
                    <i class="icon el-icon-check"></i>
                  </label>
                </div>
              </div>
              <div class="item-content">
                <div class="picture">
                  <img
                    :src="item.productInfo.attrInfo.image"
                    v-if="item.productInfo.attrInfo"
                  />
                  <img :src="item.productInfo.image" v-else />
                </div>
                <div class="name">
                  <p class="font-14 title-nowrap line-20">
                    {{item.productInfo.store_name}}
                  </p>
                  <div class="description">
                    <p class="cursor line-20 margin-b-4" v-if="item.productInfo.attrInfo">
                      {{ item.productInfo.attrInfo.suk }}
                    </p>
                    <p class="tag-pc line-20">
                      <span class="sale-icon">直降</span>
                    </p>
                  </div>
                </div>
                <div class="price padding-t-5">
                  <p class="discount  margin-b-4">￥{{item.productInfo.price}}</p>
                  <p class="origin-price">￥{{item.productInfo.ot_price}}</p>
                </div>
                <div class="quantity">
                  <div class="input-number-component">
                    <div class="input-number__decrease" @click.prevent="reduce(index)">-</div>
                    <input class="input-number__input"
                      v-model="item.cart_num"
                      @input.prevent="specifiName(index)"
                      @blur.prevent="blurName(index)"
                      maxlength="50" type="number">
                    <div class="input-number__decrease" @click.prevent="plus(index)">+</div>
                  </div>
                </div>
                <div class="sum padding-t-5">￥{{item.productInfo.price * item.cart_num}}</div>
                <div class="action padding-t-5">
                  <el-button type="text" @click="delgoodsItem(item.id)">删除</el-button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="shopping-bottom-bar">
          <div class="shopping-sum">
            共<span class="shopping-sum-spen">{{count}}</span>件商品，已选<span class="shopping-sum-spen">{{selected}}</span>商品
          </div>
          <div class="shopping-bottom-bar_right">
            <div class="shopping-bottom-bar_right_price">
              <span>总价：</span>
              <span class="text-color-red">￥{{countmoney}}</span>
            </div>
            <div class="shopping-bottom_button" @click="placeOrder">去下单</div>
          </div>
        </div>
      </div>
      <orderNoData v-else :noData="noData"></orderNoData>

      <!-- 猜你喜欢 -->
      <div class="like-recommend">
        <h3 class="center-title">猜你喜欢</h3>
        <ul class="product-list">
          <li class="product-item" v-for="item in likeList" :key='item.id' @click="goodsDetail">
            <div class="card-product-small">
              <img :src="item.image" class="product-img" alt="">
              <p class="product-name title-nowrap">{{item.store_name}}</p>
              <div class="product-price padding-t-24">
                <span class="sale-price">￥{{item.price}}</span>
                <span class="ori-price">￥{{item.ot_price}}</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {getCartList,
  postCartDel,
  changeCartNum,
  getCartCount, getHostProducts} from '@/api/store'
import debounce from "lodash.debounce";
import { mul, add } from "@/utils/bc";
import cookie from "@/utils/store/cookie";
import orderNoData from '@/components/store/order-no-data.vue'
const CHECKED_IDS = "cart_checked";
export default {
  data () {
    return {
      inputSearch: '',
      likeList: [],
      selected: 0,
      cartList: { invalid: [], valid: [] },
      isAllSelect: false,
      cartCount: 0,
      countmoney: 0,
      goodsHidden: true,
      footerswitch: false,
      count: 0,
      checkedIds: [],
      loaded: false,
      index_num: 0,
      noData: {
        imgUrl: require('@/assets/image/person/no_cart.png'),
        tips: '您的购物车是空的~',
        routerPath: '',
        buttonText: '去逛逛'
      }
    }
  },
  created () {
    // document.querySelector('body').setAttribute('style', 'background-color:#fff')
    this.get_cartList()
    this.gainCount();
    this.getLike()
    this.checkedNum()
    
  },
  mounted () {
  },
  components: {
    orderNoData
  },
  methods: {
    onSearch () {
      console.log()
    },
    checkedNum () {
      let list = this.cartList.valid
      let id = []
      list.forEach(function(val) {
        if (val.checked === true) {
          id.push(val.id);
        }
      });
      this.selected = id.length
    },
    // 购物车列表
    get_cartList () {
     let that = this;
      getCartList().then(res => {
        that.cartList = res.data;
        let checkedIds = cookie.get(CHECKED_IDS) || [];
        if (!Array.isArray(checkedIds)) checkedIds = [];
        this.cartList.valid.forEach(cart => {
          if (checkedIds.length) {
            if (checkedIds.indexOf(cart.id) !== -1) cart.checked = true;
            else cart.checked = false;
          } else {
            cart.checked = true;
            that.checkedIds.push(cart.id);
          }
        });
        if (checkedIds.length) {
          that.checkedIds = checkedIds;
        }
        that.isAllSelect =
          that.checkedIds.length === this.cartList.valid.length;
        that.carnum();
        that.countMoney();
        this.loaded = true;
      });
    },
    //删除商品；
    delgoodsItem(id) {
      let that = this
      postCartDel(id).then( res => {
        that.get_cartList()
        that.carnum();
        that.countMoney();
        that.gainCount();
      });
    },
    // 批量删除商品
    delgoods () {
      let that = this,
        id = [],
        valid = [],
        list = that.cartList.valid;
      list.forEach(val => {
        if (val.checked === true) {
          id.push(val.id);
        }
      });
      if (id.length === 0) {
        that.$message.toast({ mes: "请选择产品" });
        return;
      }
      postCartDel(id).then( res => {
        list.forEach((val, i) => {
          if (val.checked === false || val.checked === undefined)
            valid.push(list[i]);
        });
        that.$set(that.cartList, "valid", valid);
        that.carnum();
        that.countMoney();
        that.gainCount();
      });
    },
    // //获取数量
    gainCount() {
      let that = this;
      getCartCount().then(res => {
        that.count = res.data.count;
      });
    },
    //清除失效产品；
    delInvalidGoods() {
      let that = this,
        id = [],
        list = that.cartList.invalid;
      list.forEach( val => {
        id.push(val.id);
      });
      postCartDel(id).then(() => {
        list.splice(0, list.length);
        that.gainCount();
      });
    },
    //批量收藏;
    collectAll() {
      let that = this,
        data = { id: [], category: "" },
        list = that.cartList.valid;
      list.forEach(function(val) {
        if (val.checked === true) {
          data.id.push(val.product_id);
          data.category = val.type;
        }
      });
      if (data.id.length === 0) {
        that.$message.toast({ mes: "请选择产品" });
        return;
      }
      postCollectAll(data).then(() => {
        that.$message.toast({ mes: "收藏成功!" });
      });
    },
    //立即下单；
    placeOrder() {
      let that = this,
        list = that.cartList.valid,
        id = [];
      list.forEach(function(val) {
        if (val.checked === true) {
          id.push(val.id);
        }
      });
      if (id.length === 0) {
        that.$message.toast({ mes: "请选择产品" });
        return;
      }
      this.$router.push({ path: '/checkout/' + id})
      // this.$router.push({ path: "/order/submit/" + id });
    },
    manage() {
      let that = this;
      that.footerswitch = !that.footerswitch;
    },
    goodsOpen() {
      let that = this;
      that.goodsHidden = !that.goodsHidden;
    },
    specifiName(index) {
      let list = this.cartList.valid[index];
      this.index_num = index;
      this.carnum();
      this.countMoney();
      this.syncCartNum(list);
    },
    blurName(index) {
      let list = this.cartList.valid[index];
      if (list.cart_num < 1) {
        this.$set(list, "cart_num", 1);
      }
      this.carnum();
      this.countMoney();
      this.syncCartNum(list);
    },
    //加
    plus(index) {
      let that = this;
      let list = that.cartList.valid[index];
      list.cart_num++;
      if (list.attrInfo) {
        if (list.cart_num >= list.attrInfo.stock) {
          that.$set(list, "cart_num", list.attrInfo.stock);
        }
      } else {
        if (list.cart_num >= list.stock) {
          that.$set(list, "cart_num", list.stock);
        }
      }
      that.carnum();
      that.countMoney();
      that.syncCartNum(list);
    },
    //减
    reduce (index) {
      let that = this;
      let list = that.cartList.valid[index];
      list.cart_num--;
      if (list.cart_num < 1) {
        that.$set(list, "cart_num", 1);
      }
      that.carnum();
      that.countMoney();
      that.syncCartNum(list);
    },
    syncCartNum(cart) {
      if (!cart.sync)
        cart.sync = debounce(() => {
          changeCartNum(cart.id, Math.max(cart.cart_num, 1) || 1);
        }, 500);

      cart.sync();
    },
    //单选
    switchSelect (index) {
      let that = this,
        cart = that.cartList.valid[index],
        i = this.checkedIds.indexOf(cart.id);
      cart.checked = !cart.checked;

      if (i !== -1) this.checkedIds.splice(i, 1);
      if (cart.checked) {
        this.checkedIds.push(cart.id);
      }
      let len = that.cartList.valid.length;
      let selectnum = [];
      for (let i = 0; i < len; i++) {
        if (that.cartList.valid[i].checked === true) {
          selectnum.push(true);
        }
      }
      that.isAllSelect = selectnum.length === len;
      that.$set(that, "cartList", that.cartList);
      that.$set(that, "isAllSelect", that.isAllSelect);
      // cookie.set(CHECKED_IDS, that.checkedIds);
      that.carnum();
      that.countMoney();
      that.checkedNum()
    },
    //全选
    allChecked () {
      let that = this;
      let selectAllStatus = that.isAllSelect;
      selectAllStatus = !selectAllStatus;
      let checkedIds = [];
      
      that.cartList.valid.forEach(cart => {
        cart.checked = selectAllStatus;
        if (selectAllStatus) checkedIds.push(cart.id);
      });
      that.$set(that, "cartList", that.cartList);
      that.$set(that, "isAllSelect", selectAllStatus);
      this.checkedIds = checkedIds;
      // cookie.set(CHECKED_IDS, checkedIds);
      that.carnum();
      that.countMoney();
      that.checkedNum()
    },
    //数量
    carnum() {
      let that = this;
      var carnum = 0;
      var array = that.cartList.valid;
      for (let i = 0; i < array.length; i++) {
        if (array[i].checked === true) {
          if (array[i].cart_num) carnum += parseInt(array[i].cart_num);
        }
      }
      that.$set(that, "cartCount", carnum);
    },
    //总共价钱；
    countMoney () {
      let that = this;
      let carmoney = 0;
      let array = that.cartList.valid;
      for (let i = 0; i < array.length; i++) {
        if (array[i].checked === true) {
          carmoney = add(carmoney, mul(array[i].cart_num, array[i].truePrice));
        }
      }
      that.countmoney = carmoney;
    },
    // 猜你喜欢
    getLike () {
      let data = {
        page: 1,
        limit: 20
      }
      getHostProducts(data).then(res => {
        console.log(res.data)
        console.log('请求成功')
        this.likeList = res.data
      })
    },
    goodsDetail () {
      this.$router.push({
        path: '/front/goods/detail'
      })
    },
  },
  beforeDestroy() {
    // document.querySelector('body').removeAttribute('style')
  },
}
</script>

<style lang="less" scoped>
@import './cart.less';
</style>