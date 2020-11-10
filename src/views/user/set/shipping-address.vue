<template>
  <div class="hk-coupon-main">
    <div class="hk-coupon-bar">
      <h3 class="title">收货地址</h3>
      <div class="address-list">
        <div class="address-item" v-for="item in addressList" :key="item.id"
          :class="item.is_default === 1 ? 'address-item--default': ''">
          <div class="address-item_default">默认地址</div>
          <div class="address-item_content">
            <div class="address-item_userinfo">
              <span class="user_name">{{item.real_name}}</span>
              <span class="user_tele">{{item.phone}}</span>
            </div>
            <div class="address-item_address text-ellipsis-3">{{item.province}}{{item.city}}{{item.district}}{{item.detail}}</div>
            <div class="address-item_operation">
              <el-button class="opt set--default" @click="onSetIsDefault(item.id)">设为默认</el-button>
              <el-button class="opt" @click="onDialog(item)">编辑</el-button>
              <el-button class="opt" @click="onDelAddress(item.id)">删除</el-button>
            </div>
          </div>
        </div>

        <div class="address-item address-item-add" @click="onDialog(1)">
          <i class="el-icon-plus"></i>
        </div>
      </div>
    </div>
    <addAddressDialog :addAddress="addAddress" :addressItem="addressItem" @close="onCloseReportPopup" @onAddressAdd="onAddressAdd"></addAddressDialog>
  </div>
</template>

<script>
import addAddressDialog from '@/components/popup/add-address'
import {getAddressList, setIsDefault,delAddress} from '@/api/user'
export default {
  data () {
    return {
      activeName: 'toBeEvaluated',
      pointsExchange: '',
      addressList: [],
      addressItem: {},
      addAddress:{
        eject: false,
        edit: {}
      },
    }
  },
  created () {
    this.get_AddressList()
  },
  components: {
    addAddressDialog
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    onCloseReportPopup(e) {
      this.addAddress.eject = false;
    },
    onDialog(e) {
      this.addAddress.eject = true;
      // console.log(e)
      if (e !== 1) {
        this.addAddress.edit = e
      }
      this.addressItem = e
    },
    // 获取地址列表
    get_AddressList () {
      getAddressList().then(res => {
        if (res.status === 200) {
          this.addressList = res.data
        }
      })
    },
    // 设置默认地址
    onSetIsDefault(id) {
      setIsDefault(id).then(res => {
        if (res.status === 200) {
          this.get_AddressList()
          this.$message({
            message: '设置默认地址成功',
            type: "success"
          })
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: "error"
        })
      })
    },
    // 删除地址
    onDelAddress (id) {
      delAddress(id).then(res => {
        if (res.status === 200) {
          this.get_AddressList()
          this.$message({
            message: '删除地址成功',
            type: "success"
          })
        }
      }).catch(res => {
        this.$message({
          message: res.msg,
          type: "error"
        })
      })
    },
    // 获取组件传过来的值
    onAddressAdd(val){
      // console.log(val)
      // 添加成功调一下地址接口
      if (val === 'success') {
        this.get_AddressList()
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/css/user.less';
@import './shipping-address.less';
</style>
