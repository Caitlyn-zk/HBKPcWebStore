<!--商品详情-->
<template>
  <div class="store-content padding-b-20">
    <storeHeader ref="storeHeader"></storeHeader>
    <div class="gray-box">
      <div class="content">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>环境保护</el-breadcrumb-item>
          <el-breadcrumb-item>环保设备</el-breadcrumb-item>
          <span class="goods-name-nav">废弃净化设备-布袋除尘器厂家 粉尘处理设备 家具木工除尘设备</span>
        </el-breadcrumb>
        <div class="block" v-if="Object.keys(product).length !== 0">
          <div class="gallery">
              <div class="thumb">
                <div class="big">
                  <img :src="big" :alt="product.productName" />
                </div>
              </div>
              <div class="thumbnail">
                <ul>
                  <li
                    v-for="(item,i) in small"
                    :key="i"
                    :class="{on:big===item}"
                    @click="onSelectImg(item)"
                  >
                    <img v-lazy="item" :alt="product.productName" />
                  </li>
                </ul>
              </div>
            </div>
          <!--右边-->
          <div class="banner">
            <div class="sku-custom-title">
              <h4>{{product.store_name}}</h4>
            </div> 
            <div class="num padding-b-18">
              <span class="font-14 text-line num-chima">价格</span>
              <span class="price">¥{{product.price}}</span>
            </div>
            <div class="num margin-b-30 num-border-b">
              <div class="original-price">
                <span class="name font-12 text-line num-chima">原价</span>
                <span class="price-yuanjia">¥{{product.ot_price}}</span>
              </div>
              <div class="sales-volume">
                <span class="name font-12 text-line margin-r-16">累计销量</span>
                <span class="stics font-12 text-line">{{product.sales}}</span>
              </div>
            </div>
            <div class="num margin-b-20">
              <span class="font-12 text-line num-chima line-12">物流</span>
              <span>山东省 德州市 禹城市</span>
            </div>
            <div
              class="num margin-b-20"
              v-for="(item, indexw) in attr.productAttr"
              :key="indexw"
            >
            <span class="font-12 text-line num-chima line-12t">{{ item.attr_name }}</span>
            <div class="num-size-option">
              <el-button
                class="size"
                :class="item.index === itemn.attr ? 'select-size' : ''"
                v-for="(itemn, indexn) in item.attr_value"
                @click="tapAttr(indexw, itemn.attr,indexn)"
                :key="indexn"
              >
                {{ itemn.attr }}
              </el-button>
            </div>
          </div>
            <div class="num margin-b-40">
              <span class="font-12 text-line num-chima line-12">数量</span>
              <el-input-number v-model="productNum" :min="1" :max="10" label="描述文字"></el-input-number>
            </div>
            <div class="bommon-block">
              <el-button class="buy">立即购买</el-button>
              <el-button class="add" @click="addCart(product.id,product.store_name, product.image)">加入购物车</el-button>
              <span class="customer">
                <i class="iconfont icon-kefu1"></i>
                <span>咨询客服</span>
              </span>
            </div>
          </div>
          <div class="recommend">
            <div class="text-center hot-title">
              <i class="el-icon-minus"></i>
              <h3 class="text-title">热销单品</h3>
              <i class="el-icon-minus"></i>
            </div>
            <ul class="recommend-list">
              <li class="content-right-goods" v-for="item in 3" :key="item">
                <div class="goods-img">
                  <img src="../../assets/image/stoer-goods01.png" alt />
                </div>
                <p class="goods-money-cx line-26 text-center">
                  <span class="font-14">￥45.00</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--产品信息-->
    <div class="item-info content">
      <div class="recommend" :style="{'height':404*goodsList.length+100+'px'}">
        <div class="title">相似产品</div>
        <!-- -->
        <ul slot="content" class="recommend-content" v-if="goodsList.length > 0">
          <li class="content-right-goods" v-for="(item,index) in goodsList" :key="index"  @click="onGoodDetails(item.id)">
            <div class="goods-img">
              <img :src="item.image" alt />
            </div>
            <p class="goods-name title-nowrap-tow text-l margin-t-15">{{item.store_name}}</p>
            <p class="goods-money-cx line-26 text-center">
              <span class="font-14 money">￥{{item.price}}</span>
              <span class="text-line sales-volume">销量：<span class="num-bar">{{item.sales}}</span></span>
            </p>
          </li>
        </ul>
      </div>
      <div class="product-info">
        <div class="title">
          <span>产品信息</span>
          <div slot="right" class="right">
            <div class="option">
              <el-popover placement="bottom" trigger="hover" width="96px">
                <img
                  src="../../../static/img/footer_QR_code.png"
                  style="margin-bottom: -4px;"
                  alt
                  class="qr-code"
                />
                <div slot="reference" class="option-name hk-cursor">
                  <div class="tips">
                    手机查看
                    <i class="iconfont icon-erweima"></i>
                  </div>
                </div>
              </el-popover>
            </div>
          </div>
        </div>

        <div slot="content right" class="right-goods-content">
          <div class="img-item" v-if="productMsg">
            <div v-html="productMsg">{{ productMsg }}</div>
          </div>
          <div class="no-info" v-else>
            <img src="/static/images/no-data.png" />
            <br />该商品暂无内容数据
          </div>
        </div>
      </div>
    </div>
    <!--抛物图片-->
    <transition @after-enter='afterEnter' @before-enter="beforeEnter">
      <!--整张图片-->
      <div class="move_img" v-if="showMoveImg"
           :style="{left:(cartPositionL-10) + 'px',top:(cartPositionT-10) + 'px'}">
        <div><img :src="moveImgUrl"></div>
      </div>
    </transition>
  </div>
</template>
<script>
import { getProductDetail, postCartAdd } from "@/api/store";
import { mapMutations, mapState,mapGetters } from "vuex";
import storeHeader from "@/components/store/header.vue";
import { getStore } from "@/utils/storage";
export default {
  data() {
    return {
      productMsg: {},
      small: [],
      
      big: "",
      num: 1,
      product: {
        salePrice: 0
      },
      price: null,
      productNum: 1,
      attr: {
        cartAttr: false,
        productAttr: [],
        productSelect: {}
      },
      productAttr: [],
      productValue: [],
      goodsDetails: {},
      productValueData: {},
      productIndex: 0,
      selectSizeIndex: 0,
      goodsList: [],
      specs: [],
      hotPostList: [],
      collegeList: []
    };
  },
  components: {
    storeHeader
  },
  computed: {
    // ...mapState([ "isLogin" ]),
    ...mapGetters({
      isLogin: 'isLogin'
    }),
    showCart(){
      return this.$store.state.app.showCart;
    },
    cartList(){
      return this.$store.state.app.cartList;
    },
    moveImgUrl(){
      return this.$store.state.app.moveImgUrl;
    },
    showMoveImg(){
      return this.$store.state.app.showMoveImg;
    },
    cartPositionT(){
      return this.$store.state.app.cartPositionT;
    },
    cartPositionL(){
      return this.$store.state.app.cartPositionL;
    },
    elLeft(){
      return this.$store.state.app.elLeft;
    },
    elTop(){
      return this.$store.state.app.elTop;
    },
  },
  methods: {
    ...mapMutations(["ADD_CART", "ADD_ANIMATION", "SHOW_CART"]),
    // 监听图片进入购物车
    listenInCart () {
      this.ADD_ANIMATION({moveShow: false, receiveInCart: true})
    },
    beforeEnter (el) {
      let elStyle = el.style
      let elChild = el.children[0]
      let elChildSty = elChild.style
      elStyle.transform = `translate3d(0,${this.elTop - this.cartPositionT}px,0)`
      elChildSty.transform = `translate3d(${-(this.cartPositionL - this.elLeft)}px,0,0) scale(1.2)`
    },
    afterEnter (el) {
      let elStyle = el.style
      let elChild = el.children[0]
      let elChildSty = elChild.style
      elStyle.transform = `translate3d(0,0,0)`
      elChildSty.transform = `translate3d(0,0,0) scale(.2)`
      elStyle.transition = 'transform .55s cubic-bezier(.29,.55,.51,1.08)'
      elChildSty.transition = 'transform .55s linear'
      // 动画结束
      elChild.addEventListener('transitionend', () => {
        this.listenInCart()
      })
      elChild.addEventListener('webkitAnimationEnd', () => {
        this.listenInCart()
      })
    },
    // 获取详情
    getProductDetail(id) {
      getProductDetail(id).then(res => {
        // console.log("获取产品详情",JSON.stringify(res.data))
        if (res.status == 200) {
          this.productMsg = res.data.storeInfo.description || "";
          this.price = res.data.storeInfo.price;
          this.product = res.data.storeInfo;
          this.small = res.data.storeInfo.slider_image;
          this.big = this.small[0];
          this.productValue = Object.values(res.data.productValue);
          this.productValueData = res.data.productValue
          this.productAttr = res.data.productAttr
          this.attr.productAttr = res.data.productAttr
          this.goodsList = res.data.similarity
          this.specs = res.data.productAttr[0].attr_values
          this.code_base = res.data.storeInfo.code_base
          // this.DefaultSelect();

        }
        // this.product.spec_type 规格类型
        // console.log("获取产品详情 good_list",JSON.stringify(res.data.good_list))
      });
    },
    addCart(id, name, img) {
      var that = this;
      console.log(this.productIndex)
      console.log(that.productValue[this.productIndex].unique)
      var data = {
        productId: that.product.id,
        cartNum: that.productNum,
        uniqueId: that.productValue[that.productIndex].unique,
        new: 0,
      };
      // console.log('商品价格',that.product.price)
      if (!that.showMoveImg) {
        // 动画是否在运动
        if (that.isLogin) {
          // 登录了 直接存在用户名下
          postCartAdd(data).then(res => {
            // 子组件调用购物车列表方法
            that.$refs.storeHeader.get_cartList()
            // console.log(that.$refs.storeHeader.get_cartList())
            // 并不重新请求数据
            that.ADD_CART({
              productId: id,
              salePrice: that.product.price,
              productName: name,
              productImg: img,
              productNum: that.productNum
            });
          });
        } else {
          // 未登录 vuex
          that.ADD_CART({
            productId: id,
            salePrice: that.product.price,
            productName: name,
            productImg: img,
            productNum: that.productNum,
            
          });
        }
        // 加入购物车动画
        var dom = event.target;
        // 获取点击的坐标
        let elLeft = dom.getBoundingClientRect().left + dom.offsetWidth / 2;
        let elTop = dom.getBoundingClientRect().top + dom.offsetHeight / 2;
        // 需要触发
        that.ADD_ANIMATION({
          moveShow: true,
          elLeft: elLeft,
          elTop: elTop,
          img: img
        });
        if (!that.showCart) {
          that.SHOW_CART({ showCart: true });
        }
      }
    },
    handleChange () {},
    checkout(productId) {
      this.$router.push({
        path: "/checkout",
        query: { productId, num: this.productNum }
      });
    },
    editNum(num) {
      this.productNum = num;
    },
    onGoodsDetails(val) {
      this.$router.push({
        path: '/front/goods/detail',
        query: { productId: id }
      })
      this.getProductDetail(val);
    },
    // 规格选择
    onAttrValues(item, index) {
      this.big = this.productValueData[item].image;
      this.product.price = this.productValueData[item].price;
      this.selectSizeIndex = index;
    },
    
    // 图片选择
    onSelectImg(item) {
      // console.log('product.price',this.price)
      this.big = item;
      this.$set(this.product, "price", this.price);
      this.selectSizeIndex = 0;
    },
    // 商品详情
    onGoodDetails(id) {
      this.$router.push({
        path: '/front/goods/detail',
        query: { productId: id }
      })
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
      this.getProductDetail(id);
    },
    // 选择规格按钮
    tapAttr(indexw, item,index) {
      console.log('选择',indexw, item)
      let that = this;
      console.log(this.productValue)
      that.productAttr[indexw].index = item;
      this.productIndex = index
      let value = that
        .getCheckedValue()
        .sort()
        .join(",");
      that.big = that.productValueData[value].image
      that.$set(that.product,'price',that.productValueData[value].price)
      that.SHOW_CART({ showCart: false });
    },
    //获取被选中属性；
    getCheckedValue: function() {
      let productAttr = this.productAttr;
      let value = [];
      for (let i = 0; i < productAttr.length; i++) {
        for (let j = 0; j < productAttr[i].attr_value.length; j++) {
          if (productAttr[i].index === productAttr[i].attr_value[j].attr) {
            value.push(productAttr[i].attr_value[j].attr);
          }
        }
      }
      return value;
    },
  },
  created() {
    let id = this.$route.query.productId;
    this.getProductDetail(id)
  },
  watch: {
    $route: {
      handler(val, oldval) {
        let id = this.$route.query.productId;
        this.getProductDetail(id)
      },
    },
  },
};
</script>
<style lang="less" scoped>
@import "./goods-details.less";
</style>
