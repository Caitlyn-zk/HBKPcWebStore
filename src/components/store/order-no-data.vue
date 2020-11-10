<template>
  <div class="hk-void">
    <div class="component-nodatapage">
      <img :src="noData.imgUrl" alt="">
      <p class="text-center">{{noData.tips}}</p>
      <div class="text-center hk-stroll">
        <el-button>{{noData.buttonText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    noData: {}
  },
  data () {
    return {}
  }
}
</script>

<style lang='less' scoped>
.hk-void {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  min-height: 672px;
  .component-nodatapage {
    width: 620px;
    height: 280px;
    
    img {
      display: block;
      width: 200px;
      margin: 0 auto;
    }
    .hk-stroll {
      padding-top: 30px;
      .el-button {
        width: 158px;
        height: 38px;
        line-height: 36px;
        font-size: 16px;
        padding: 0;
        background: #05D797;
        color: #fff;
        border-color: #05D797;
      }
    }
  }
}
</style>