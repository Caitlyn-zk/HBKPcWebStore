/*
 * 订单确认
 * */
import request from '@/utils/request'

/**
 * 通过购物车 id 获取订单信息
 * @param cartId
 * @returns {*}
 */
export function postOrderConfirm(cartId) {
  return request.post("/api/order/confirm", { cartId });
}

/**
 * 计算订单金额
 * @param key
 * @param data
 * @returns {*}
 */
export function postOrderComputed(key, data) {
  return request.post("/api/order/computed/" + key, data);
}

/**
 * 获取指定金额可用优惠券
 * @param price
 * @returns {*}
 */
export function getOrderCoupon(price, data) {
  return request.get("/api/coupons/order/" + (parseFloat(price) || 0), data);
}

/**
 * 生成订单
 * @param key
 * @param data
 * @returns {*}
 */
export function createOrder(key, data) {
  return request.post("/api/order/create/" + key, data || {});
}

/**
 * 订单统计数据
 * @returns {*}
 */
export function getOrderData() {
  return request.get("/api/order/data");
}

/**
 * 订单列表
 * @returns {*}
 */
export function getOrderList(data) {
  return request.get("/api/order/list", data);
}

/**
 * 取消订单
 * @returns {*}
 */
export function cancelOrder(id) {
  return request.post("/api/order/cancel", { id });
}

/**
 * 订单详情
 * @returns {*}
 */
export function orderDetail(id) {
  return request.get("/api/order/detail/" + id);
}

/**
 * 退款理由
 * @returns {*}
 */
export function getRefundReason() {
  return request.get("/api/order/refund/reason");
}

/**
 * 提交退款
 * @returns {*}
 */
export function postOrderRefund(data) {
  return request.post("/api/order/refund/verify", data);
}

/**
 * 确认收货
 * @returns {*}
 */
export function takeOrder(uni) {
  return request.post("/api/order/take", { uni });
}

/**
 * 删除订单
 * @returns {*}
 */
export function delOrder(uni) {
  return request.post("/api/order/del", { uni });
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function express(uni) {
  return request.get("/api/order/express/" + uni);
}

/**
 * 订单查询物流信息
 * @returns {*}
 */
export function payOrder(uni, paytype, from) {
  return request.post("/api/order/pay", { uni, paytype, from });
}
/**
 * 订单核销
 * @returns {*}
 */
export function orderVerific(verify_code, is_confirm) {
  return request.post("/api/order/order_verific", { verify_code, is_confirm });
}
/**
 * 再次下单
 * @param string uni
 *
 */
export function orderAgain(uni) {
  return request.post("/api/order/again", { uni: uni });
}
/**
 * 获取发票信息
 * @returns {*}
 */
export function taxinfoDefault() {
  return request.get("/api/taxinfo/default");
}
/**
 * 生成发票信息
 * @returns {*}
 */
export function taxinfoEdit(data) {
  return request.post("/api/taxinfo/edit",data);
}