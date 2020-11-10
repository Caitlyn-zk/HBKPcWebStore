import request from '@/utils/request'

/**
 * 用户基本信息
 * @param data object 用户信息
 */
export function authUserInfoAu(data) {
    return request.post('/auth/user/info/au', data, { login: false })
}

/*
 * 商品分类
 * */
export function getCategory() {
    return request.get("/api/category", {}, { login: false });
}
  
/*
* 商品详情
* */
export function getProductDetail(id) {
    return request.get("/api//product/detail/" + id, {}, { login: false });
}

/*
* 商品分销二维码
* */
export function getProductCode(id) {
    return request.get("/api/product/code/" + id, {}, { login: true });
}
/**
 * 拼团列表
 */
export function getCombinationList(data) {
    return request.get("/api/combination/list", data, { login: false });
}

/**
 * 拼团产品详情
 * @param {*} id
 */
export function getCombinationDetail(id) {
    return request.get("/api/combination/detail/" + id, {}, { login: false });
}

/**
 * 拼团 开团
 * @param {*} id
 */
export function getCombinationPink(id) {
    return request.get("/api/combination/pink/" + id);
}

/**
 * 拼团 取消开团
 */
export function getCombinationRemove(data) {
    return request.post("/api/combination/remove", data);
}

/**
 * 拼团海报
 * @param {*} id
 */
export function getCombinationPoster(data) {
    return request.post("/api/combination/poster", data);
}
/**
 * 秒杀列表配置
 */
export function getSeckillConfig() {
    return request.get("/api/seckill/index", {}, { login: false });
}
  
/**
 * 秒杀列表
 */
export function getSeckillList(time, data) {
    return request.get("/api/seckill/list/" + time, data, { login: false });
}

/**
 * 秒杀产品详情
 */
export function getSeckillDetail(id) {
    return request.get("/seckill/detail/" + id, {}, { login: false });
}
/*
* 商品列表
* */
export function getProducts(q) {
    return request.get("/api/products", q, { login: false });
}
/*
* 商品列表 改
* */
export function getProductsList(data) {
    return request.get("/api/search/products", data, { login: false });
}
/*
* 购物车数量
* */
export function getCartNum() {
    return request.get("/api/cart/count");
}

/*
* 添加收藏
* */
export function toCollect(id, category) {
    return request.get("/api/collect/add/" + id + "/" + category);
}

/*
* 为你推荐
* */
export function getHostProducts(data) {
    return request.get(
        "/api/product/hot",data,{ login: false });
}

/*
* 精品、热门、首发列表
* */
export function getGroomList(type) {
    return request.get("/api/groom/list/" + type, {}, { login: false });
}

/*
* 购物车 添加
* */
export function postCartAdd(data) {
    return request.post("/api/cart/add", data,{login: true});
}

/*
* 购物车列表
* */
export function getCartList() {
    return request.get("/api/cart/list",{},{ login: true });
}

/*
* 购物车 删除
* */
export function postCartDel(ids) {
return request.post("/api/cart/del", { ids });
}

/*
* 购物车 获取数量
* */
export function getCartCount(data) {
    return request.get("/api/cart/count", data);
}

/*
* 购物车 修改商品数量
* */
export function changeCartNum(id, number) {
    return request.post("/api/cart/num", { id, number });
}

/**
 * 搜索推荐关键字
 */
export function getSearchKeyword() {
    return request.get("/api/search/keyword", {}, { login: false });
}

/**
 * 产品评论列表
 */
export function getReplyList(id, q) {
    return request.get("/api/reply/list/" + id, q, { login: false });
}

/**
 * 产品评价数量和好评度
 */
export function getReplyConfig(id) {
    return request.get("/api/reply/config/" + id, {}, { login: false });
}

/**
 * 评价页面获取单个产品详情
 */
export function postOrderProduct(unique) {
    return request.post("/api/order/product", { unique }, { login: false });
}

/**
 * 提交评价页面；
 */
export function postOrderComment(data) {
    return request.post("/api/order/comment", data, { login: false });
}
/**
 * 门店列表
 */
export function storeListApi(data) {
    return request.get("/api/store_list", data, { login: false });
}
  