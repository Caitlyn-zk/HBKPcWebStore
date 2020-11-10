<template>
  <div class="add-address">
    <el-dialog :visible.sync="addAddress.eject" title="添加新地址" class="hk-addAddress" width="778px" append-to-body>
      <div class="margin-l-20 add-desc">为提升用户体验，您提交的信息将同步到您的百度账号中，便于您在其他相关服务场景中随时使用。</div>
      <div class="padding-b-20">
        <el-form :model="addAddressForm" :rules="rules" ref="addAddressForm" label-width="0" class="margin-t-26 padding-r-32">
          <div class="add-name">
            <span class="add-name-item">
              <el-form-item prop="real_name">
                <el-input v-model="addAddressForm.real_name" placeholder="姓名"></el-input>
              </el-form-item>
            </span>
            <span class="margin-l-40 add-name-item">
              <el-form-item prop="phone">
                <el-input v-model="addAddressForm.phone" placeholder="手机号"></el-input>
              </el-form-item>
            </span>
          </div>
          <el-form-item label="" prop="region">
            <el-cascader
            ref="myCascader"
            class="hk-addcont-address"
            :class="addressItem !== 1 ? 'is-addco-item': ''"
            :options="optionsaddress"
            @change="getCityData"
            v-model="addAddressForm.region"
            :separator="' '"
            :placeholder="addressItem !== 1 ? area1_name+area2_name+area3_name : '请选择所在城市'"
            ></el-cascader>
          </el-form-item>
          
          <el-form-item label="" prop="address">
            <el-input v-model="addAddressForm.address" placeholder="详情地址精确至门牌号、楼层、房间号等"></el-input>
          </el-form-item>

          <el-form-item label="">
            <el-checkbox class="address-is-default" v-model="isDefault" :checked="isDefault === 1 ? true : false">设为默认</el-checkbox>
          </el-form-item>

          <!-- <el-form-item class="hk-textarea-m">
            <el-input type="textarea" v-model="addAddressForm.desc" :autosize="{ minRows: 3, maxRows: 4}" placeholder="粘贴地址信息,可自动识别，如：“张三，13168868758，广东省广州市番禺区市桥街道金悦大厦502室”"></el-input>
          </el-form-item> -->

          <el-form-item class="text-r hk-addAddress-btn">
            <el-button type="" @click="resetForm('addAddressForm')" class="hk-addAddress-cancel">取消</el-button>
            <el-button type="primary" @click="onSubmit('addAddressForm')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import { postAddress } from "@/api/user.js"
export default {
  props: {
    addAddress: {},
    addressItem: {}
  },
  data() {
    var validateMobilePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('手机号不可为空'))
      } else {
        if (value !== '') {
          var reg = /^1[3456789]\d{9}$/
          if (!reg.test(value)) {
            callback(new Error('请输入有效的手机号码'))
          }
        }
        callback()
      }
    }
    return {
      checkList: [],
      addAddressForm: {
        real_name: '',
        phone: '',
        region: '',
        address: '',
      },
      addresssId: 0,
      isDefault: 1,
      optionsaddress: regionData, // 存放城市数据
      area1_code: "",
      area1_name: "",
      area2_code: "",
      area2_name: "",
      area3_code: "",
      area3_name: "",
      rules: {
        real_name: [
          { required: true, message: '请正确填写姓名', trigger: 'blur' },
          { min: 1, max: 25, message: '姓名限制1-25字符，不支持特殊字符和违禁词', trigger: 'blur' }
        ],
        phone: [
          { validator: validateMobilePhone, trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择地区', trigger: 'change' }
        ],
        address: [
          { required: true, message: '请正确填写详细地址（5~120字符，不支持特殊字符和违禁词）', trigger: 'blur' },
          { min: 5, max: 120, message: '请正确填写详细地址（5~120字符，不支持特殊字符和违禁词', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    
  },
  mounted () {
    let that = this
    let addressItem = this.addressItem
    if (addressItem !== 1 ) {
      that.$set(that.addAddressForm, 'real_name', addressItem.real_name)
      that.$set(that.addAddressForm, 'phone', addressItem.phone)
      that.$set(that.addAddressForm, 'address',addressItem.detail)
      that.$set(that.addAddressForm, 'region',addressItem.detail)
      that.$set(that,"area1_name",addressItem.province);
      that.$set(that,"area2_name",addressItem.city);
      that.$set(that,"area3_name",addressItem.district)
      that.$set(that,"addresssId",addressItem.id)
      that.$set(that,"isDefault",addressItem.is_default)
    }
  },
  methods: {
    // 编辑添加地址
    editAddress (e) {
      let data = {
        id: this.addresssId,
        address: {
          province: this.area1_name,
          city: this.area2_name,
          district: this.area3_name
        },
        is_default: this.isDefault,
        real_name: this.addAddressForm.real_name,
        post_code: '',// 邮编
        phone: this.addAddressForm.phone,
        detail: this.addAddressForm.address,
        type: 1
      }
      postAddress(data).then(res => {
        if (res.status === 200) {
          this.addAddress.eject = false
          this.$emit('onAddressAdd','success')
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: "error"
        })
        this.$emit('onAddressAdd','error')
      })
    },
    onDefault(val) {
      let that = this
      that.$set(that, 'isDefault', 1)
    },
    // 提交
    onSubmit(addAddressForm) {
      this.$refs[addAddressForm].validate((valid) => {
        if (valid) {
          this.editAddress()
        } else {
          return false;
        }
      });
      
    },
    // 获取省份
    getCityData(val) {
      // console.log(this.addAddressForm.region)
      // console.log(this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0])
      let that = this;
      this.$set(that,'area1_code',val[0])
      this.$set(that,'area2_code',val[1])
      this.$set(that,'area3_code',val[2])
      this.$set(
        that,
        "area1_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[0]
      );
      this.$set(
        that,
        "area2_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[1]
      );
      this.$set(
        that,
        "area3_name",
        this.$refs.myCascader.getCheckedNodes()[0].pathLabels[2]
      );
    },
    // 取消
    resetForm(addAddressForm) {
      this.$refs[addAddressForm].resetFields();
      this.addAddress.eject = false
    },
  },
  watch: {
    addressItem () {
      let that = this
      let addressItem = this.addressItem
      if (addressItem !== 1 ) {
        that.$set(that.addAddressForm, 'real_name', addressItem.real_name)
        that.$set(that.addAddressForm, 'phone', addressItem.phone)
        that.$set(that.addAddressForm, 'address',addressItem.detail)
        that.$set(that,"area1_name",addressItem.province);
        that.$set(that,"area2_name",addressItem.city);
        that.$set(that,"area3_name",addressItem.district)
        that.$set(that,"addresssId",addressItem.id)
        that.$set(that,"isDefault",addressItem.is_default)
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import './add-address.less';
</style>