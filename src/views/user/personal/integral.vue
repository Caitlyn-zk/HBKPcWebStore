<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">积分中心</h3>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="hk-menus">
        <el-tab-pane label="我的积分" name="first"></el-tab-pane>
        <el-tab-pane label="积分明细" name="second"></el-tab-pane>
      </el-tabs>
    </div>
    <div class="points_page_my">
      <div class="points-latest-con">
        <div class="left">
          <div class="my-words">我的积分</div>
          <img class="left-img" src="@/assets/image/person/pc_golden_icon.png" alt="">
          <p class="points-num">0</p>
          <div class="points-btn-area">
            <el-button class="hk-button-area">赚积分</el-button>
            <el-button class="hk-button-area">花积分</el-button>
          </div>
        </div>
        <div class="right">
          <div class="head-con">
            <p class="title">最近三个月积分统计</p>
            <div class="right-help">
              <span>什么是积分</span>
            </div>
          </div>
          <ul class="points-type-con">
            <li class="type" v-for="item in integralMenus" :key="item.id">
              <p class="info">{{item.title}}</p>
              <p class="val">{{item.val}}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="bg-white-con">
        <div class="my-points-con">
          <h3 class="title">最近积分明细</h3>
          <p class="problem">常见积分问题</p>
        </div>
        <el-table
          :data="tableData"
          class="table-thead"
          empty-text="暂无积分记录"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="时间"
            width="318">
          </el-table-column>
          <el-table-column
            prop="name"
            label="收入/支出"
            width="313">
          </el-table-column>
          <el-table-column
            prop="address"
            label="详细说明">
          </el-table-column>
        </el-table>
      </div>
      <div class="earnPoints">
        <img class="pic-title-con" src="@/assets/image/person/pc_zhuanjifen.png" alt="">
      </div>
      <ul class="earn-con">
        <li class="item" v-for="item in earnPoints" :key="item.id">
          <div class="item-left">
            <span class="name title-nowrap">{{item.name}}</span>
            <div class="hori-line"></div>
            <div class="text-con">
              <p class="text" v-for="pops in item.text.split('，')" :key="pops">{{pops}}</p>
            </div>
            <el-button class="btn__black">{{item.but_name}}</el-button>
          </div>
          <img class="right-img" :src="item.icon_img" alt="">
        </li>
      </ul>
      <div class="earnPoints">
        <img class="pic-title-con" src="@/assets/image/person/pc_huajifen.png" alt="">
      </div>
      <div class="welfare-lucky">
        <div class="hover-con">
          <img class="pic-welfare-lucky" src="@/assets/image/person/pc_fulishe_banner@2x.png" alt="">
          <el-popover placement="left" trigger="hover" width="96px">
            <img
              src="../../../../static/img/footer_QR_code.png"
              style="margin-bottom: -4px;"
              alt
              class="qr-code"
            />
            <div slot="reference" class="hover-area"></div>
          </el-popover>
        </div>
        <div class="hover-con">
          <img class="pic-welfare-lucky" src="@/assets/image/person/pc_lucky-turntable_banner@2x.png" alt="">
          <el-popover placement="left" trigger="hover" width="96px">
            <img
              src="../../../../static/img/footer_QR_code.png"
              style="margin-bottom: -4px;"
              alt
              class="qr-code"
            />
            <div slot="reference" class="hover-area"></div>
          </el-popover>
        </div>
      </div>
      <div class="question-con">
        <h3 class="title thin-border-horizontal">积分使用常见问题</h3>
        <ul class="ques-main">
          <li v-for="ques in question" :key="ques.id">
            <p class="ques-title">{{ques.title}}</p>
            <p class="ques-p">{{ques.desc}}</p>
          </li>
        </ul>
        <div class="text-center">
          <el-button class="learn-more">了解更多问题</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'second',
      pointsExchange: '',
      integralMenus: [{
        id: 1,
        title: '购物送积分',
        val: 0,
      },{
        id: 2,
        title: '签到送积分',
        val: 0,
      },{
        id: 3,
        title: '商品评论送积分',
        val: 0,
      },{
        id: 4,
        title: '互动送积分',
        val: 0,
      }],
      tableData: [],
      earnPoints: [{
        id: 10,
        name: '购物',
        text: '订单完成后可得积分奖励',
        but_name: '去购物',
        icon_img: require('@/assets/image/person/pc_gouwu.png')
      },{
        id: 11,
        name: '每日签到',
        text: '今日可得5积分，连续签到可得更多积分',
        but_name: '去签到',
        icon_img: require('@/assets/image/person/pc_qiandao.png')
      },{
        id: 12,
        name: '商品评价',
        text: '每次评价可得10积分',
        but_name: '去评价',
        icon_img: require('@/assets/image/person/pc_pingjia.png')
      },{
        id: 13,
        name: '发评论',
        text: '每次得5积分，每日最多15积分',
        but_name: '去评论',
        icon_img: require('@/assets/image/person/pc_pinglun.png')
      },{
        id: 14,
        name: '点赞',
        text: '每次得2积分，每日最多10积分',
        but_name: '去点赞',
        icon_img: require('@/assets/image/person/pc_dianzan.png')
      },{
        id: 15,
        name: '收藏',
        text: '每次得2积分，每日最多10积分',
        but_name: '去收藏',
        icon_img: require('@/assets/image/person/pc_shoucang.png')
      },{
        id: 16,
        name: '发文章',
        text: '每篇文章可得30积分',
        but_name: '发文章',
        icon_img: require('@/assets/image/person/pc_write_article.png')
      }],
      question: [{
        id: 1,
        title: '一、什么是积分？',
        desc: '积分仅可在小度智选商城（网址：https://dumall.baidu.com/）、小度音箱APP、小度在家APP、小度APP（统称为“小度设备APP”）使用。 用户可通过小度智选商城或小度设备APP完成相应的行为获取积分，积分可以在手机端的福利商城兑换虚拟、实物礼品。'
      },{
        id: 2,
        title: '二、积分有效期是多久？',
        desc: '用户当年获得的积分，将在下一个自然年年底到期，到期未使用的积分将失效，会被作废处理（若交易在使用积分有效期到期后发生退款，该部分积分不予退还）。 例：2019年12月31日（截止当天24：00时）将清空2018年度您获得但未使用的积分。'
      }, {
        id: 3,
        title: '三、如何使用积分？',
        desc: '1、用户可在手机端的福利商城使用积分进行商品的兑换。兑换的具体细则，依兑换时的相关展示为准。2、福利商城个人资料需用户填写真实的收货地址，小度官方包邮将用户兑换的实物礼品快递发送到用户手中。（注：港澳台及海外地区不包邮）3、虚拟礼品可在手机端的福利商城页的“兑换明细”查看兑换情况。'
      }]
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="less" scoped>
@import './integral.less';
</style>
