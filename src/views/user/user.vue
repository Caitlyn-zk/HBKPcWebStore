<template>
  <div class="hk-person">
    <div class="user-person">
      <div class="content user-person-bar">
        <ul class="user-menu">
          <li>现场秒杀</li>
          <li>马上团购</li>
          <li>购物商城</li>
        </ul>
        <div class="serch-main">
          <el-input placeholder="请输入内容" v-model="inputSearch">
            <template slot="append">
              <button @click="onSearch">
                <i class="el-icon-search"></i>
              </button>
            </template>
          </el-input>
        </div>
      </div>
    </div>
    <div class="hk-person-content content clearfix">
      <!-- 左侧导航栏 -->
      <div class="fl hk-person-left-nav clearfix">
        <div class="hk-person-nav-bar">
          <el-menu
            :default-active="active"
            :default-openeds="['1','2','3','4']"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-submenu index="1">
              <template class="hk-el-submenu_title" slot="title">
                <span class="text-person-size"><span class="line"></span>订单中心</span>
              </template>
              <el-menu-item-group>
                <router-link to="/user/order/order">
                  <el-menu-item index="1-1">
                    <div>
                      <span>我的订单</span>
                    </div>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template class="hk-el-submenu_title" slot="title">
                <span class="text-person-size"><span class="line"></span>用户中心</span>
              </template>
              <el-menu-item-group>
                <router-link to="/user/person/index">
                  <el-menu-item index="2-1">
                    <div>
                      <span>个人中心</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/coupon">
                  <el-menu-item index="2-2">
                    <div>
                      <span>我的优惠券</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/integral">
                  <el-menu-item index="2-3">
                    <div>
                      <span>积分中心</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/group">
                  <el-menu-item index="2-4">
                    <div>
                      <span>我的拼团</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/welfare">
                  <el-menu-item index="2-5">
                    <div>
                      <span>我的福利</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/fabulous">
                  <el-menu-item index="2-6">
                    <div>
                      <span>我的点赞</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/collect">
                  <el-menu-item index="2-7">
                    <div>
                      <span>我的收藏</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/person/feedback">
                  <el-menu-item index="2-8">
                    <div>
                      <span>用户反馈</span>
                    </div>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template class="hk-el-submenu_title" slot="title">
                <span class="text-person-size"><span class="line"></span>售后服务</span>
              </template>
              <el-menu-item-group>
                <router-link to="/user/aftersales/apply">
                  <el-menu-item index="3-1">
                    <div>
                      <span>申请售后</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/aftersales/record">
                  <el-menu-item index="3-2">
                    <div>
                      <span>服务记录</span>
                    </div>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <span class="text-person-size"><span class="line"></span>设置</span>
              </template>
              <el-menu-item-group>
                <router-link to="/user/set/shippingaddress">
                  <el-menu-item index="4-1">
                    <div>
                      <span>收货地址</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/set/increasequalificat">
                  <el-menu-item index="4-2">
                    <div>
                      <span>增票资质</span>
                    </div>
                  </el-menu-item>
                </router-link>
                <router-link to="/user/set/increasequalificat">
                  <el-menu-item index="4-3">
                    <div>
                      <span>账号管理</span>
                    </div>
                  </el-menu-item>
                </router-link>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </div>
      </div>
      <!-- 右侧主要内容展示 -->
      <div class="fl hk-person-content-main clearfix">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      personSearch: "",
      inputSearch: "",
      searchinput: "",
      select: "",
      active: "1",
    };
  },
  mounted() {
    this.onRouterPathChanged();
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
      // console.log(123)
    },
    handleClose(key, keyPath) {
    },
    // 搜索框
    onSearch() {
      this.$router.push({
        path: "/front/recruit/post/search",
        query: { key: this.inputValue },
      });
      document.documentElement.scrollTop = 0;
    },
    onRouterPathChanged(val, oldval) {
      let that = this;
      let pathrouter = this.$router.currentRoute.path;
      if (this.pathrouter === "/user/person/index") {
        // 改变一级导航的状态
        this.active = "2-1";
      } else {
        if (pathrouter.indexOf('/user/order/order') !== -1) {
          this.active = "1-1";
        } else if (pathrouter.indexOf("/user/person/coupon") !== -1) {
          this.active = "2-2";
        } else if (pathrouter.indexOf("/user/person/integral") !== -1) {
          this.active = "2-3";
        } else if (pathrouter.indexOf("/user/person/group") !== -1) {
          this.active = "2-4";
        } else if (pathrouter.indexOf("/user/person/welfare") !== -1) {
          this.active = "2-5";
        } else if (pathrouter.indexOf("/user/person/fabulous") !== -1) {
          this.active = "2-6";
        } else if (pathrouter.indexOf("/user/person/collect") !== -1) {
          this.active = "2-7";
        } else if (pathrouter.indexOf("/user/person/feedback") !== -1) {
          this.active = "2-8";
        } else if (pathrouter.indexOf("/user/aftersales/apply") !== -1) {
          this.active = "3-1";
        } else if (pathrouter.indexOf("/user/aftersales/record") !== -1) {
          this.active = "3-2";
        } else if (pathrouter.indexOf("/user/set/shippingaddress") !== -1) {
          this.active = "4-1";
        } else if (pathrouter.indexOf("/user/set/increasequalificat") !== -1) {
          this.active = "4-2";
        } else if (pathrouter.indexOf("/user/person/more/account") !== -1) {
          this.active = "4-3";
        }
      }
    },
    //
    onSearch() {
      if (this.select == "" || this.select == "1" || this.select == "2") {
        this.$router.push({
          path: "/front/project/search",
          query: { key: this.searchinput },
        });
      } else if (this.select == "3") {
        this.$router.push({
          path: "/front/recruit/post/search",
          query: { key: this.searchinput },
        });
      } else if (this.select == "4") {
        this.$router.push({
          path: "/front/store",
          query: { key: this.searchinput },
        });
      } else if (this.select == "5") {
        this.$router.push({
          path: "/front/college/home/recommend",
          query: { key: this.searchinput },
        });
      }
    },
  },
  watch: {
    $route: {
      handler(val, oldval) {
        this.onRouterPathChanged(val, oldval);
      },
    },
  },
};
</script>

<style lang="less">
@import "./user.less";
</style>
