<template>
  <div class="group-main content">
      <div class="stoer-title">
        <h3 class="title-name">拼团优惠</h3>
        <el-button class="title-see-more" type="text">
          查看更多
          <i class="el-icon-d-arrow-right"></i>
        </el-button>
      </div>
      <div class="group-conetent">
        <div class="group-image">
          <img width="100%" src="../../assets/image/ad-banner-c03.jpg" alt />
        </div>
        <div class="rotation-main">
          <!-- 左边按钮 -->
          <div class="group-goods-next margin-l-22" @click="onNext">
            <i class="next el-icon-arrow-left"></i>
          </div>
          <div class="containt-list">
            <ul
              class="group-goods-list"
              :style="{'left':calleft + 'px', 'width': timeList.length * 185 + 'px'}"
              style="transition: all 1.3s ease 0.15s;"
            >
              <li class="content-right-goods" v-for="(item,index) in combinationList" :key="index">
                <div class="goods-img">
                  <img :src="item.image" alt />
                  <!-- 小图标 -->
                  <div class="min-img-icon">
                    <img src="../../assets/image/groupbuying.png" alt />
                  </div>
                </div>
                <p class="goods-name title-nowrap text-center margin-t-6">{{item.title}}</p>
                <p class="goods-money-cx line-26 text-center">
                  <span class="font-14">￥{{item.product_price}}</span>
                  <span class="be-overdue">￥{{item.price}}</span>
                </p>
              </li>
            </ul>
          </div>
          <!-- 右边按钮 -->
          <div class="group-goods-next margin-r-20" @click="onPrev">
            <i class="next el-icon-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import {getCombinationList} from "@/api/store"
export default {
data() {
    return {
      timeList: [1,2,3,4,5],
      endTime: "1595278800000",
      calleft: 0,
      page: 0,
      limit: 10,
      combinationList:[]
    };
  },
  created() {
    // this.move();
    this.get_combination_list()
  },
  
  methods: {
    // 拼团列表
    get_combination_list(){
      var parameter = {
        page: this.page,
        limit: this.limit
      }
      getCombinationList(parameter).then(res=>{
        console.log('拼团列表参数',res)
        this.$set(this,'combinationList',res.data)
      })
    },
    //移动
    // move() {
    //   this.timer = setInterval(this.starmove, 5000);
    // },
    //开始移动
    // starmove() {
    //   this.calleft -= 185;
    //   if (this.calleft <= -740) {
    //     this.calleft = 0;
    //   }
    // },
    //鼠标悬停时停止移动
    // stopmove() {
    //   clearInterval(this.timer);
    // },
    //点击按钮左移
    onNext() {
      let width = this.timeList.length * 185 
      // console.log(width)
      let sped = width - 925 + this.calleft
      if ( sped > 0) {
        this.calleft -= 185;
      } else {
        this.calleft = this.calleft;
      }
      // console.log(this.calleft)
      // if (this.calleft < -740) {
      //   this.calleft = 0;
      // }
    },
    //点击按钮右移
    onPrev() {
      let width = this.timeList.length * 185 
      // console.log(width)
      let sped = width - 925 + this.calleft
      if ( this.calleft < 0) {
        this.calleft += 185;
      } else {
        this.calleft = this.calleft;
      }
      // if (this.calleft > 0) {
      //   this.calleft = -740;
      // }
    },
  }
}
</script>

<style lang="less" scoped>
@import './group-buying.less';
</style>