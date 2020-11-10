import request from '@/utils/request'

/**
 * 用户基本信息
 * @param data object 用户信息
 */
export function authUserInfoAu(data) {
    return request.post('/auth/user/info/au', data, { login: false })
}


/******************************   登录   ********************************************/
/**
 * 用户登录
 * @param data object 用户账号密码
 */
export function login(data) {
    return request.post('/auth/login', data, { login: false })
}

/**
 * 获取二维码
 */

export function getAccountQrcodeUrl() {
    return request.get('/auth/getAccountQrcodeUrl',{}, { login: false })
}

/**
 * 微信轮询登录
 */
export function wechatPollingLogin(uu_str) {
    return request.post('/auth/wechatPollingLogin', {uu_str:uu_str},{ login: false })
}

/**
 * 用户退出登录
 */
export function logout() {
    return request.get('/auth/logout', {}, { login: false })
}
/**
 * 用户发送验证码
 * @param data object 手机号&验证码
 */
export function registerVerify(data) {
    return request.post('/auth/code/verify', data, { login: false })
}
/**
 * 用户注册
 * @param data object 手机号&验证码$密码
 */
export function register(data) {
    return request.post('/auth/phone/register', data, { login: false })
}

/**
 * 用户手机号修改密码
 * @param data object 用户手机号 验证码 密码
 */
export function registerReset(data) {
    return request.post('/auth/reset/pwd', data, { login: false })
}

// 获取用户信息
export function getUserInfo (person_reg_state) {
    // auth/user/info
    return request.post('/auth/user/base/info',{person_reg_state: person_reg_state}, {login: true})
}

/*
 * 个人中心
 * */
export function getUser() {
    return request.get('/auth/user')
}

/*
 * 个人中心(功能列表)
 * */
export function getMenuUser() {
    return request.get('/auth/menu/user')
}
/***********  地址  ***************/
/*
 * 地址列表
 * */
export function getAddressList(data) {
    return request.get('/api/address/list', data || {},{login: true})
}

/*
 * 删除地址
 * */
export function getAddressRemove(id) {
    return request.post('/api/auth/address/del', { id: id },{login: true})
}

/*
 * 修改 添加地址
 * */
export function postAddress(data) {
    return request.post('/api/address/edit', data,{login: true})
}
/**
 * 设置默认地址
*/
export function setIsDefault (id) {
    return request.post('/api/address/default/set',{id: id},{login: true})
}
/**
 * 删除 地址
*/
export function delAddress (id) {
    return request.post('/api/address/del',{id:id},{login: true})
}
/********************************     订单     *****************************************/
/**
 * 订单列表
*/
export function userOrderList (data) {
    return request.get('/api/order/list',data,{login: true})
}
/**
 * 订单详情
*/
export function userOrderDetail (uni) {
    return request.get("/api/order/detail/"+uni,{},{login: true})
}
/************************************* 用户中心 **************************************/
export function userCollectList (data) {
    return request.get("/api/collect/user",data,{login: true})
}