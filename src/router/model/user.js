// 路由

const Frontnav = () => import('@/components/fontnav/fontnav.vue')
const Footer = () => import('@/components/fontfooter/fontfooter.vue')
const User = () => import('@/views/user/user.vue')
const UserPersonalOrder = () => import('@/views/user/order/order.vue')
const UserPersonalorderDetail = () => import('@/views/user/order/order-detail.vue')
const UserPersonalCenter = () => import('@/views/user/personal/personal-center.vue')
const UserPersonalCoupon = () => import('@/views/user/personal/coupon.vue')
const UserPersonalIntegral = () => import('@/views/user/personal/integral.vue')
const UserPersonalGroup = () => import('@/views/user/personal/group.vue')
const UserPersonalWelfare = () => import('@/views/user/personal/welfare.vue')
const UserPersonalFabulous = () => import('@/views/user/personal/fabulous.vue')
const UserPersonalCollect = () => import('@/views/user/personal/collect.vue')
const UserPersonalFeedback = () => import('@/views/user/personal/feedback.vue')
const UserPersonalAfterSalesRecord = () => import('@/views/user/after-sales/after-sales-record.vue')
const UserPersonalAfterSalesApply = () => import('@/views/user/after-sales/apply.vue')
const UserPersonalShippingAddress = () => import('@/views/user/set/shipping-address.vue')
const UserPersonalIncreaseQualificat = () => import('@/views/user/set/increase-qualificat.vue')



export default [
/**  -------- 个人中心-----------  */
  {
    path: '/user/person',
    name: 'CmpUserResume',
    redirect: '/user/person/index',
    meta: {
      title: '环科个人中心',
      keepAlive: false,
      auth: false
    },
    components: {
      Head: Frontnav,
      body: User,
      Foot: Footer
    },
    children: [{
      path: '/user/person/index',
      name: 'CmpUserResumeIndex',
      meta: {
        title: '环科个人中心',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalCenter
    },{
      path: '/user/person/coupon',
      name: 'CmpUserPersonalCoupon',
      meta: {
        title: '环科个人中心|优惠券',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalCoupon
    },{
      path: '/user/person/integral',
      name: 'CmpUserPersonalIntegral',
      meta: {
        title: '环科个人中心|积分中心',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalIntegral
    },{
      path: '/user/order/order',
      name: 'CmpUserPersonalOrder',
      meta: {
        title: '环科个人中心|我的订单',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalOrder
    },{
      path: '/user/person/group',
      name: 'CmpUserPersonalGroup',
      meta: {
        title: '环科个人中心|我的拼团',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalGroup
    },{
      path: '/user/person/welfare',
      name: 'CmpUserPersonalWelfare',
      meta: {
        title: '环科个人中心|我的福利',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalWelfare
    },{
      path: '/user/person/fabulous',
      name: 'CmpUserPersonalFabulous',
      meta: {
        title: '环科个人中心|我的点赞',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalFabulous
    },{
      path: '/user/person/collect',
      name: 'CmpUserPersonalCollect',
      meta: {
        title: '环科个人中心|我的收藏',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalCollect
    },{
      path: '/user/aftersales/record',
      name: 'CmpUserPersonalAfterSalesRecord',
      meta: {
        title: '环科个人中心|售后记录',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalAfterSalesRecord
    },{
      path: '/user/person/feedback',
      name: 'CmpUserPersonalFeedback',
      meta: {
        title: '环科个人中心|用户反馈',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalFeedback
    },{
      path: '/user/set/shippingaddress',
      name: 'CmpUserPersonalShippingAddress',
      meta: {
        title: '环科个人中心|收货地址',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalShippingAddress
    },{
      path: '/user/set/increasequalificat',
      name: 'CmpUserPersonalIncreaseQualificat',
      meta: {
        title: '环科个人中心|增票资质',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalIncreaseQualificat
    },{
      path: '/user/aftersales/apply',
      name: 'CmpUserPersonalAfterSalesApply',
      meta: {
        title: '环科个人中心|申请售后',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalAfterSalesApply
    },{
      path: '/user/aftersales/orderdetail',
      name: 'CmpUserPersonalorderDetail',
      meta: {
        title: '环科个人中心|订单详情',
        keepAlive: false,
        auth: false
      },
      component: UserPersonalorderDetail
    }]
  }
]


