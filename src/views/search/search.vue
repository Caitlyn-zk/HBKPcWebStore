<template>
  <div class="search" ref="container">
    <storeHeader></storeHeader>
    <div class="content">
      <ul class="search-smail-nav padding-t-15 padding-b-8">
        <li class="text-line font-12">
          首页
          <i class="el-icon-arrow-right"></i>
        </li>
        <li class="text-line font-12" v-if="parentType !== ''">
          {{parentType}}
          <i class="el-icon-arrow-right"></i>
        </li>
        <li class="text-blacks font-12 goods-type-moer">
          {{subsetType}}
          <el-button @click="onDelSubsetType" class="goods-type-del el-icon-close"></el-button>
        </li>
      </ul>
      <!-- 搜索类别 -->
      <searchType @searchType="onSecarchType" @searchCheck="searchCheck"></searchType>
      <div class="goods-content padding-b-15">
        <div class="recommend-goods">
          <p class="recommend-title padding-b-15">推荐新品</p>
          <ul class="recommend-list">
            <li class="recommend-goods-list hk-cursor" v-for="item in latestRecommendList" :key="item.id" @click="goodsDetail(item.id)">
              <div class="list-goods-img">
                <img :src="item.image" alt />
              </div>
              <p class="goods-name title-nowrap-tow margin-t-15 margin-b-5">{{item.store_name}}</p>
              <p class="goods-money-cx">
                <span class="font-14 money title-nowrap">￥{{item.price}}</span>
                <span class="text-line sales-volume title-nowrap">
                  销量：
                  <span class="sales-volume-mun">1</span>
                </span>
              </p>
            </li>
          </ul>
        </div>
        <div class="goods-list">
          <div class="clasify-content-child">
            <ul class="clasify-list">
              <li
                class="clasify-name"
                :class="sortOrderIndex == 0 ? 'select':'no'"
                @click="sortByPrice(0)"
              >
                <span>综合</span>
                <span class="iconfont icon-xia font-12"></span>
              </li>
              <li
                class="clasify-name"
                :class="sortOrderIndex == 2 &&  nows === true ? 'select':'no'"
                @click="sortByPrice(2)"
              >
                <span>新品</span>
                <span class="iconfont icon-xia font-12"></span>
              </li>
              <li
                class="clasify-name"
                :class="sortOrderIndex == 1 && popularity !== 0 ? 'select':'no'"
                @click="sortByPrice(1)"
              >
                <span>销量</span>
                <img height="10" src="../../assets/image/icon/horn.png" v-if="popularity === 0" />
                <img
                  height="10"
                  src="../../assets/image/icon/up-icon.png"
                  v-if="popularity === 1"
                />
                <img
                  height="10"
                  src="../../assets/image/icon/down-icon.png"
                  v-if="popularity === 2"
                />
              </li>
              <li
                class="clasify-name"
                :class="sortOrderIndex == 3 && price !== 0 ? 'select':'no'"
                @click="sortByPrice(3)"
              >
                <span>价格</span>
                <img height="10" src="../../assets/image/icon/horn.png" v-if="price === 0" />
                <img height="10" src="../../assets/image/icon/up-icon.png" v-if="price === 1" />
                <img height="10" src="../../assets/image/icon/down-icon.png" v-if="price === 2" />
              </li>
              <li class="clasify-input margin-l-22">
                <input type="text" class="clasify-input-bar padding-l-5" placeholder="￥" name id />
                <span class="el-icon-minus text-line font-12"></span>
                <input type="text" class="clasify-input-bar padding-l-5" placeholder="￥" name id />
                <el-button class="clasify-button margin-l-13">确定</el-button>
              </li>
            </ul>
            <div class="statistics">
              共
              <span class="totsl-rad">{{total}}</span>件商品
            </div>
          </div>
          <ul class="goods-list-bar" ref="container">
            <goodsList v-for="(item,index) in goodsList" :key="index" :item="item"></goodsList>
            <div class="loading " v-if="loading">
                <div class="flashing">
                  <div class="dot-collision"></div>
                </div>
            </div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import storeHeader from "@/components/store/header.vue";
import searchType from "@/components/store/search-type.vue";
import goodsList from "@/components/store/goods-list.vue";
import {getProductsList,getHostProducts} from "@/api/store"
export default {
  data() {
    const {
      key = "",
      pid = 0,
      sid = 0,
      index = 0,
      title = ""
    } = this.$route.query;
    return {
      sortOrderIndex: 0,
      price: 0,
      popularity: 0,
      nows: false,
      where: {
        page: 1,
        cid: 0,
        limit: 16,
        keyword: '',
        sid: sid, //二级分类id
        news: 0, // 是否为新品 0不是新品 1表示新品
        priceOrder: "", // 价格
        salesOrder: "" // 销量
      },
      loading: false,
      loadend: false,
      parentType: "",
      subsetType: "",
      goodsList: [],
      currentPage: 1,
      pageSize: 25,
      error: false,
      noResult: false,
      nows: false,
      total: 2000, //显示总的记录数，
      // currentPage: 1, //当前的页码
      // pageSize: 20, //每页显示10条数据
      // 最新推荐列表
      latestRecommendList: []
    };
  },
  created () {
    this.parentType = this.$route.query.key
  },
  watch: {
    $route: "getPath",
  },
  components: {
    storeHeader,
    searchType,
    goodsList,
  },
  created(){
    this.get_product_list()
    this.get_HostProducts()
  },
  mounted(){
   document.addEventListener("scroll", this.scrollLoad);
  },
  methods: {
    // 商品列表
    get_product_list() {
      var that = this;
      if (that.loading) return; //阻止下次请求（false可以进行请求）；
      if (that.loadend) return; //阻止结束当前请求（false可以进行请求）；
      that.loading = true;
      that.where.news = that.nows ? 1 : 0;
      that.where.page = that.currentPage;
      that.where.limit = that.pageSize;
      getProductsList(that.where)
        .then(res => {
          if (res.status === 200) {
            that.noResult = false;
            that.total = res.data.count;
            if (that.currentPage == 1) {
              that.$set(that, "goodsList", res.data.data_list);
            } else {
              that.$set(that, "goodsList", that.goodsList.concat(res.data.data_list));
            }
            if (that.goodsList.length === 0) {
              that.noResult = true;
            }
            that.error = false;
          } else {
            that.error = true;
          }
          that.loading = false;
        })
        .catch(() => {
          that.loading = false;
        });
    },
    scrollLoad() {
      let scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight; //document的滚动高度
      let nowScotop =
        document.documentElement.clientHeight || document.body.clientHeight; //可视区高度
      let wheight =
        document.documentElement.scrollTop || document.body.scrollTop; //已滚动高度
      if (
        nowScotop >= scrollHeight - wheight - 5 - 204 &&
        this.goodsList.length / this.pageSize == this.currentPage
      ) {
        this.currentPage = this.currentPage + 1;
        this.get_product_list();
      }
    },
    // 排序
    sortByPrice(e) {
      if (e == 0) {
        this.nows = false;
        this.where.page = 1;
        this.where.news = "";
        this.nows = false
        this.popularity = 0;
        this.where.salesOrder = "";
      } else if (e == 1) {
        if (this.popularity === 0) {
          this.popularity = 1;
          this.where.salesOrder = "desc";
        } else if (this.popularity === 1) {
          this.popularity = 2;
          this.where.salesOrder = "asc";
        } else {
          this.popularity = 0;
          this.where.salesOrder = "";
        }
        this.nows = false
      } else if (e == 2) {
        this.nows = !this.nows;
        this.where.news = this.nows ? 1 : 0;
      } else if (e == 3) {
        this.nows = false
        this.popularity = 0;
        this.where.salesOrder = "";
        if (this.price == 0) {
          this.price = 1;
          this.where.priceOrder = "asc";
        } else if (this.price == 1) {
          this.price = 2;
          this.where.priceOrder = "desc";
        } else if (this.price == 2) {
          this.price = 0;
          this.where.priceOrder = "";
        }
      }
      this.sortOrderIndex = e;
      this.currentPage = 1;
      this.get_product_list()
    },
    onSecarchType(val) {
      this.subsetType = val.title;
    },
    // 多选
    searchCheck(val) {
      this.subsetType = val.map((item) => item.title).join(",");
      // console.log(this.content)
    },
    getPath() {
      // console.log(this.$route.query.key);
      this.parentType = this.$route.query.key
    },
    goodsDetail (goodsId) {
      this.$router.push({
        path: '/front/goods/detail',
        query: { productId: goodsId }
      })
    },
    onDelSubsetType () {
      // console.log('点击删掉按钮')
      this.subsetType = ''
    },
    // 推荐列表
    get_HostProducts () {
      let data = {
        page: 1,
        limit: 20
      }
      getHostProducts(data).then(res => {
        console.log(res.data)
        console.log('获取推荐列表')
        this.latestRecommendList = res.data
      })
    }
  },
  beforeDestroy(){
    document.removeEventListener("scroll", this.scrollLoad);
  },
  watch: {
    $route(to , from){
        
    }
  }
};
</script>

<style lang="less" rel="stylesheet/scss" scoped>
@import "./search.less";
</style>