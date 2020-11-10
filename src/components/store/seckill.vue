<template>
  <div class="group-main content">
    <div class="stoer-title">
      <h3 class="title-name">
        <span class="margin-r-15">限时秒杀</span>
        <span class="seckill-time">
          <countDown v-if="endTime.length > 0" :endTime="endTime"></countDown>
        </span>
      </h3>
      <el-button class="title-see-more" type="text">
        查看更多
        <i class="el-icon-d-arrow-right"></i>
      </el-button>
    </div>
    <div class="group-conetent">
      <div class="group-image">
        <img width="100%" src="../../assets/image/ad-banner-c04.jpg" alt />
      </div>
      <!-- v-on:mouseover="stopmove()" -->
      <div class="rotation-main">
        <!-- 左边按钮 -->
        <div class="group-goods-next margin-l-22" @click="onNext">
          <i class="next el-icon-arrow-left"></i>
        </div>
        <div class="containt-list">
          <!-- v-on:mouseout="move()" v-on:mouseover="stopmove()"-->
          <ul
            class="group-goods-list"
            :style="{'left':calleft + 'px', 'width': seckillList.length * 185 + 'px'}"
            style="transition: all 1.3s ease 0.15s;"
            
          >
            <li class="content-right-goods" v-for="(item,index) in seckillList" :key="index" @click="onGoodsDetails">
              <div class="goods-img">
                <img :src="item.image" alt />
                <!-- 小图标 -->
                <div class="min-img-icon">
                  <img src="../../assets/image/seckill.png" alt />
                </div>
              </div>
              <p
                class="goods-name title-nowrap text-center margin-t-6"
              >{{item.title}}</p>
              <p class="goods-money-cx line-26 text-center">
                <span class="font-14">￥{{item.price}}</span>
                <span class="be-overdue">￥{{item.ot_price}}</span>
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
import countDown from "@/components/store/count-down.vue";
import { getSeckillConfig, getSeckillList} from "@/api/store"
export default {
  data() {
    return {
      timeList: [],
      endTime: "",
      calleft: 0,
      time: null,
      page: 0,
      limit: 50,
      seckillList: []
    };
  },
  created() {
    // this.move();
    this.get_seckill_config()
  },
  components: {
    countDown
  },
  methods: {
     // 秒杀列表
    get_seckill_list(){

      var parameter = {
        page: this.page,
        limit: this.limit
      }
      getSeckillList(this.time,parameter).then(res=>{
        console.log('秒杀列表',res)
        this.$set(this,'seckillList',res.data)
      })
    },
    // 秒杀配置
    get_seckill_config(){
      let that = this
      getSeckillConfig().then(res=>{
        console.log('秒杀时间配置',res.data.seckillTime)
        that.$set(that,"timeList",res.data.seckillTime)
        for (let index = 0; index < that.timeList.length; index++) {
          if (res.data.seckillTime[index].status !== 0) {
            that.$set(that,"time",res.data.seckillTime[index].id)
            that.$set(that,"endTime",String(res.data.seckillTime[index].stop *1000))
            that.get_seckill_list()
            return false
          }
        }
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
    // 跳转详情
    onGoodsDetails(){
      this.$router.push({path:'/front/goods/detail'})
    }
  }
};
</script>

<style lang="less" scoped>
@import './seckill.less';
</style>