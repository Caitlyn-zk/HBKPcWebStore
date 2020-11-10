<template>
  <div class="hk-person-main">
    <ul class="hk-person-portrait padding-t-20 padding-r-20 clearfix">
      <li class="home-top-item">
        <div class="">
          <img :src="avatar == '' ? require('@/assets/image/hk-collegedetils.jpg') : avatar " class="user-img">
        </div>
        <span class="hk-author-name">{{real_name}}</span>
      </li>
      <li class="home-top-item" v-for="item in headerMenu" :key="item.id">
        <div class="home-top-item-bar">{{item.number}}</div>
        <span class="home-top-item-name">{{item.title}}</span>
      </li>
    </ul>
    <div class="my-order">
      <h3 class="order-title">我的订单</h3>
      <ul class="order-muen">
        <li class="muen-item" v-for="pops in orderMenu" :key="pops.id">
          <div class="menu-item-img">
            <img class="menu_icon" :src="pops.icon_url" alt="">
            <img class="menu_icon_hover" :src="pops.icon_hover_url" alt="">
          </div>
          <span class="menu-title">{{pops.title}}</span>
        </li>
      </ul>
      <div class="ec-info">
        <p class="text-center padding-tb-60">暂无进行中的订单</p>
      </div>
    </div>
  </div>
</template>

<script>
import {mainSalary} from "@/config/constant";
import utils from '@/utils/index.js'
import { mapMutations, mapGetters } from "vuex";
export default {
  filters:{
    onSalary (value) {
      var obj = utils.findObj(mainSalary, value)
      return obj.label
    },
  },
  data () {
    return {
      // 个人信息
      userInfolists: [],
      invitationCount: 0,
      deliveryCount: 0,
      lookMeCount: 0,
      messageList: [],
      postList: [],
      currentPage: 1,
      list_rows: 6,
      post_name: '',
      RecentBrowsingSalary: mainSalary,
      // avatar: '/static/img/footer_QR_code.png',
      headerMenu: [{
        id: 6,
        title: '我的余额',
        path: '',
        number: 123
      },{
        id: 1,
        title: '优惠券',
        path: '',
        number: 123
      }, {
        id: 2,
        title: '积分',
        path: '',
        number: 123
      }, {
        id: 3,
        title: '点赞',
        path: '',
        number: 123
      },{
        id: 5,
        title: '收藏',
        path: '',
        number: 123
      }],
      orderMenu: [{
        id: 10,
        title: '待支付',
        icon_url: require('@/assets/image/person/pc_icon_unpay.png'),
        icon_hover_url:require('@/assets/image/person/pc_icon_unpay_hover.png'),
      },{
        id: 21,
        title: '待发货',
        icon_url: require('@/assets/image/person/pc_icon_unreceive.png'),
        icon_hover_url:require('@/assets/image/person/pc_icon_unreceive_hover.png'),
      },{
        id: 20,
        title: '待收货',
        icon_url: require('@/assets/image/person/pc_icon_unreceive.png'),
        icon_hover_url:require('@/assets/image/person/pc_icon_unreceive_hover.png'),
      },{
        id: 30,
        title: '待评价',
        icon_url: require('@/assets/image/person/pc_icon_uncomentd.png'),
        icon_hover_url:require('@/assets/image/person/pc_icon_uncomentd_hover.png'),
      },{
        id: 40,
        title: '退换/售后',
        icon_url: require('@/assets/image/person/pc_icon_return.png'),
        icon_hover_url:require('@/assets/image/person/pc_icon_return_hover.png'),
      },{
        id: 50,
        title: '全部订单',
        icon_url: require('@/assets/image/person/pc_icon_all_order.png'),
        icon_hover_url:require('@/assets/image/person/pc_icon_all_order_hover.png'),
      },]
    }
  },
  computed:{
    real_name () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.real_name) {
        return this.$store.state.app.userInfo.real_name
      }
      return '新用户'
    },
    email () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.email) {
        return this.$store.state.app.userInfo.email
      }
      return ''
    },
    phone () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.phone) {
        return this.$store.state.app.userInfo.phone
      }
      return ''
    },
    school () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.school) {
        return this.$store.state.app.userInfo.school
      }
      return ''
    },
    major () {
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.major) {
        return this.$store.state.app.userInfo.major
      }
      return ''
    },
    avatar(){
      if (this.$store.state.app.userInfo !== null && this.$store.state.app.userInfo.avatar) {
        return 'http://cdn.65ph.com/' + this.$store.state.app.userInfo.avatar
      }
      return ''
    },
    ...mapGetters({
      postVistRecord: "postVistRecord"
    })
  },
  created () {
    // this.get_RecommendPostList()
    //初始化职位访问记录
    this.INIT_POST_RECORD();
  },
  methods: {
    ...mapMutations(["INIT_POST_RECORD", "ADD_POST_RECORD"]),
    
    // 切换下一页
    onNextPage () {
      // 目前根据返回数是否大于等于6，请求推荐职位
      if (this.postList.length >= 6) {
        this.currentPage = this.currentPage + 1
        this.get_RecommendPostList()
      } else {
        this.currentPage = 1
        this.get_RecommendPostList()
      }
    },
    onPostDetail(val){
      // console.log(val);
      let max_salary = null, min_salary = null
      this.RecentBrowsingSalary.forEach(item => {
        if (item.value === val.min_salary) {
          return min_salary = item.label
        }
        if (item.value === val.max_salary) {
          return max_salary = item.label
        }
      })
      // console.log(min_salary +'-' + max_salary)
      this.ADD_POST_RECORD({
        post_id: val.post_id,
        org_name: val.org_name,
        post_name: val.post_name,
        salary: min_salary +'-' + max_salary
      });
      // this.$router.push({path:'/front/recruit/post/detail',query:{post_id:id}})
      this.$router.push({path:'/front/recruit/post/detail',query:{post_id:val.post_id}});
    },
    // 查看更多
    onSeeMore(){
      this.$router.push({path:'/front/recruit/post/search'})
    },
     // 绑定邮箱
    onBindingEmail(){
      this.$router.push({path: '/account/personal/bindingve/email'})
    },
    // 绑定手机号
    onBindingPhone(){
      this.$router.push({path: '/account/personal/bindingve/phone'})
    },
    // 认证
    onAut(){

    }
  }
}
</script>

<style lang="less" scoped>
@import './personal-center.less';
</style>
