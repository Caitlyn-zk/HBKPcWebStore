<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">增票资质</h3>
      <div class="invoice-intro-content">
        <p>我们会在3个工作日内完成审核工作。</p>
        <p>1）注意有效增值税发票开票资质仅为一个，审核完成之日起每180个自然日内最多修改三次。</p>
        <p>2）发票常见问题查看增票资质帮助。</p>
        <p>3）本页面信息仅供增值税专用发票-资质审核使用，切勿进行支付相关业务，谨防上当受骗。</p>
      </div>
      <div class="invoice-intro-button" v-if="!isShow">
        <el-button class="btn" @click="onAddIncrease">添加增票资质</el-button>
      </div>
      <div class="invoice-content" v-else>
        <div class="info-title">填写增票资质信息</div>
        <el-form :model="increaseFrom" :rules="rules" ref="increaseFrom" label-width="120px" class="margin-t-26 padding-r-32">
          <el-form-item label="单位名称:" prop="unit_name">
            <el-input v-model="increaseFrom.name" placeholder="请填写单位名称"></el-input>
          </el-form-item>
          <el-form-item label="纳税人识别码:" prop="tax_account_number">
            <el-input v-model="increaseFrom.tax_account_number" placeholder="请填写纳税人识别码"></el-input>
          </el-form-item>
          <el-form-item label="注册地址:" prop="address">
            <el-input v-model="increaseFrom.address" placeholder="请填写注册地址"></el-input>
          </el-form-item>
          <el-form-item label="注册电话:" prop="phone">
            <el-input v-model="increaseFrom.phone" placeholder="请填写注册电话"></el-input>
          </el-form-item>
          <el-form-item label="开户银行:" prop="bank_of_deposit">
            <el-input v-model="increaseFrom.bank_of_deposit" placeholder="请填写开户银行"></el-input>
          </el-form-item>
          <el-form-item label="银行账户:" prop="bank_account">
            <el-input v-model="increaseFrom.bank_account" placeholder="请填写银行账户"></el-input>
          </el-form-item>
          <!-- <el-form-item label="上传增票信息:" prop="bank_account">
            <div class="">营业执照复印件加盖公章，或者营业执照扫描件。</div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="increaseFrom.imageUrl" :src="increaseFrom.imageUrl" class="avatar">
              <i v-else class="uploader-icon el-icon-camera-solid"></i>
            </el-upload>
          </el-form-item> -->
          <el-form-item label="" prop="bank_account">
            <el-checkbox v-model="checked">我已经阅读并同意<span class="on-mina-color">《增票资质确认书》</span></el-checkbox>
          </el-form-item>
          <el-form-item class="text-l hk-min-btn">
            <el-button type="" @click="resetForm('increaseFrom')" class="hk-feedback-cancel">返回</el-button>
            <el-button type="primary" @click="onSubmit('increaseFrom')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'toBeEvaluated',
      pointsExchange: '',
      isShow: false,
      increaseFrom: {
        unit_name: '',
        tax_account_number: '',
        address: '',
        phone: '',
        bank_account: '',
        imageUrl: ''
      },
      checked: true,
      rules: {
        unit_name: [
          { required: true, message: '请填写你的单位名称', trigger: 'blur' }
        ],
        tax_account_number: [
          { required: true, message: '请填写纳税人识别码', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请填写注册地址', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请填写注册地址', trigger: 'blur' }
        ],
        bank_of_deposit: [
          { required: true, message: '请填写开户银行', trigger: 'blur' }
        ],
        bank_account: [
          { required: true, message: '请填写银行账户', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onSubmit(increaseFrom) {
      this.$refs[increaseFrom].validate((valid) => {
        if (valid) {
          alert('submit!');
          this.isShow = false
        } else {
          return false;
        }
      });
      
    },
    // 返回
    resetForm(increaseFrom) {
      this.$refs[increaseFrom].resetFields();
      this.isShow = false
    },
    handleAvatarSuccess(res, file) {
        this.increaseFrom.imageUrl = URL.createObjectURL(file.raw);
        console.log(this.increaseFrom.imageUrl)
      },
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPEG = file.type === "image/jpeg";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 10;
      
      if (!isJPEG && !isJPG && !isPNG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    onAddIncrease() {
      this.isShow = true
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/user.less';
@import './increase-qualificat.less';
</style>
