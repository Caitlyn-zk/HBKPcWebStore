<template>
  <div class="store-search-block">
    <div class="content navigation-main">
      <div class="navigation-bar">
        <div class="left">
          <img src="../../assets/image/logo.png" alt />
        </div>
        <div class="center padding-b-33">
          <div class="hk-search-module">
            <el-input
              placeholder="请输入您想要搜索的商品关键字"
              v-model="inputValue"
              @keyup.enter.native="onSearchEnterFun"
              class="store-search-input"
            >
              <el-button slot="append" class="hk-search-button" @click="onSearch">搜索</el-button>
            </el-input>
            <div
              @mouseover="cartShowState(true)"
              @mouseout="cartShowState(false)"
              class="shop pr clearfix"
            >
              <el-button class="settle-accounts" :class="showCart ? 'mouseover': ''">
                <i class="el-icon-shopping-cart-2"></i>
                购物车
              </el-button>
              <span class="cart-num fr">
                <i class="num" :class="{no:totalNum <= 0,move_in_cart:receiveInCart}">{{totalNum}}</i>
              </span>
              <!--购物车显示块-->
              <div class="nav-user-wrapper pa active" v-show="showCart">
                <div class="arrow"></div>
                <div class="nav-user-list">
                  <div class="full" v-show="totalNum">
                    <!--购物列表-->
                    <div class="nav-cart-items">
                      <ul>
                        <li class="clearfix" v-for="(item,i) in cartList" :key="i">
                          <div class="cart-item">
                            <div class="cart-item-inner" @click="goodsDetail(item.productId)">
                              <span>
                                <div class="item-thumb">
                                  <img :src="item.productImg" />
                                </div>
                                <div class="item-desc">
                                  <div class="cart-cell">
                                    <h4>
                                      <span href v-text="item.productName"></span>
                                    </h4>
                                    <!-- <p class="attrs"><span>白色</span></p> -->
                                    <h6>
                                      <span class="price-icon">¥</span>
                                      <span class="price-num">{{item.salePrice}}</span>
                                      <span class="item-num">x {{item.productNum}}</span>
                                    </h6>
                                  </div>
                                </div>
                              </span>
                              <div class="del-btn del" @click="delGoods(item.productId)">删除</div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    <!--总件数-->
                    <div class="nav-cart-total">
                      <p>
                        共
                        <strong>{{totalNum}}</strong> 件商品
                      </p>
                      <h5>
                        合计：
                        <span class="price-icon">¥</span>
                        <span class="price-num">{{totalPrice}}</span>
                      </h5>
                      <h6>
                        <input
                          type="button"
                          readonly
                          class="main-btn"
                          style="height: 40px;width: 100%;margin: 0;color: #fff;font-size: 14px;line-height: 38px"
                          @click="toCart($event)"
                          value="去购物车"
                        />
                      </h6>
                    </div>
                  </div>
                  <div v-show="!totalNum" style="height: 313px;text-align: center" class="cart-con">
                    <p>您的购物车竟然是空的!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tiling search-rec">
            <div class="search-rec-option" v-for="item in 4" :key="item" @click="onRelevant">工程图纸</div>
          </div>
        </div>
        <div class="img">
          <img width="76px" src="../../assets/image/footer_QR_code.png" alt />
        </div>
      </div>
      <div class="clearfix">
        <div class="catalog-all fl">
          <span class="title-all padding-l-20">
            <i class="iconfont icon-fenlei1 margin-r-3"></i>全部商品分类
          </span>
          <goodsType class="catalog-list-type" :class="isIndex ? 'is-index' : ''"></goodsType>
        </div>
        <ul class="catalog fl">
          <li
            v-for="(item,index) in menusList"
            :key="index"
            class="catalog-list"
            @click="onSelect(item.id)"
          >{{item.name}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import goodsType from "@/components/store/goods-type.vue";
import { mapMutations, mapState, mapGetters } from "vuex";
import { getCartList,postCartDel } from "@/api/store";
export default {
  props: {
    menusList: Array,
  },
  data() {
    return {
      inputValue: "",
      isIndex: true,
      catalogId: 0,
      positionL: 0,
      positionT: 0,
      cartLists: [],
      cartArray: []
    };
  },
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
    }),
    cartList() {
      if (this.isLogin) {
        return this.cartLists;
      } else {
        return this.$store.state.app.cartList;
      }
    },
    showCart() {
      return this.$store.state.app.showCart;
    },
    receiveInCart() {
      return this.$store.state.app.receiveInCart;
    },
    // 计算价格
    totalPrice() {
      var totalPrice = 0;
      this.cartList &&
        this.cartList.forEach((item) => {
          totalPrice += item.productNum * item.salePrice;
        });
      var tempVal = parseFloat(totalPrice).toFixed(3);
      var realVal = tempVal.substring(0, tempVal.length - 1);
      return realVal;
    },
    // 计算数量
    totalNum() {
      var totalNum = 0;
      this.cartList &&
        this.cartList.forEach((item) => {
          totalNum += item.productNum;
        });
      return totalNum;
    },
  },
  created() {},
  mounted() {
    this.onRouterPathChanged();
    this.navFixed();
    if (this.isLogin) {
      this.get_cartList();
    }
    console.log("购物车列表", this.cartList);
    window.addEventListener("scroll", this.navFixed);
    window.addEventListener("resize", this.navFixed);
  },
  components: {
    goodsType,
  },
  methods: {
    ...mapMutations([
      "ADD_CART",
      "INIT_BUYCART",
      "ADD_ANIMATION",
      "SHOW_CART",
      "REDUCE_CART",
      "RECORD_USERINFO",
      "EDIT_CART",
    ]),
    onRelevant() {},
    onSearch() {
      this.$router.push({
        path: "/front/goods/search",
        query: { key: this.inputValue },
      });
    },
    onSearchEnterFun(e) {
      var keyCode = window.event ? e.keyCode : e.which;
      if (keyCode == 13) {
        this.$router.push({
          path: "/front/goods/search",
          query: { key: this.inputValue },
        });
      }
    },
    onSelect(id) {
      this.catalogId = id;
    },
    onRouterPathChanged() {
      let that = this;
      let pathrouter = this.$router.currentRoute.path;
      if (pathrouter === "/front/store") {
        that.$set(that, "isIndex", true);
      } else if (pathrouter === "/") {
        that.$set(that, "isIndex", true);
      } else {
        that.$set(that, "isIndex", false);
      }
    },
    // 购物车显示
    cartShowState(state) {
      this.SHOW_CART({ showCart: state });
    },
    //
    toCart(e) {
      this.$router.push({ path: "/cart" });
    },
    // 删除商品
    delGoods(productId) {
      console.log(productId)
      if (this.isLogin) {
        // 登陆了
        let that = this
        postCartDel(productId).then((res) => {
          that.EDIT_CART({ productId });
          that.get_cartList()
        });
      } else {
        that.EDIT_CART({ productId });
      }
    },
    // 控制顶部
    navFixed() {
      if (this.$route.path === "/front/goods/detail") {
        var st = document.documentElement.scrollTop || document.body.scrollTop;
        st >= 100 ? (this.st = true) : (this.st = false);
        // 计算小圆当前位置
        let num = document.querySelector(".num");
        this.positionL = num.getBoundingClientRect().left;
        this.positionT = num.getBoundingClientRect().top;
        this.ADD_ANIMATION({
          cartPositionL: this.positionL,
          cartPositionT: this.positionT,
        });
      } else {
        return;
      }
    },
    goodsDetail(id) {
      let that = this
      let goodsId = 0
      that.cartArray.forEach(item => {
        console.log(item)
        if (item.id === id) {
          console.log(item.productInfo.id)
          goodsId = item.productInfo.id
          that.$router.push({
            path: '/front/goods/detail',
            query: { productId: goodsId }
          })
        }
      })
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
    // 获取购物车列表数据
    // 购物车列表
    get_cartList() {
      let that = this;
      let cartListbar = [];
      getCartList().then((res) => {
        let list = res.data;
        that.cartArray = res.data.valid
        if (this.isLogin)
          list.valid.forEach((cart) => {
            if (Object.keys(cart.productInfo).length !== 0) {
              cartListbar.push({
                productId: cart.id,
                salePrice: cart.productInfo.price,
                productName: cart.productInfo.store_name,
                productImg: cart.productInfo.image,
                productNum: cart.cart_num,
              });
            }
          });
        this.cartLists = cartListbar;
      });
    },
  },
  watch: {
    $route: {
      handler(val, oldval) {
        let that = this;
        if (val.path === "/front/store") {
          that.$set(that, "isIndex", true);
        } else {
          that.$set(that, "isIndex", false);
        }
        this.onRouterPathChanged();
      },
    },
  },
};
</script>
<style lang="less" scoped>
@import "./header.less";
</style>
