// 当前这个模块：API进行统一管理
import requests from './request'
import mockRequest from './mockAjax'

// 三级联动的接口
// api/product/getBaseCategoryList  get 无参数
// 发请求  axios发送请求返回结果是 Promise对象
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList', method:'get'});
// export const reqCategoryList = ()=> requests.get('/product/getBaseCategoryList');


// 获取banner（首页轮播图接口）
export const reqGetBannerList = ()=> mockRequest({url:'/banner'})
// 获取floor数据
export const reqGetFloorList = ()=> mockRequest({url:'/floor'})


// 获取搜索模块数据 地址： /api/list  请求方式:post 请求与需要带参数
// 当前这个接口给服务器传递的参数 params，至少是一个空对象{} 
export const reqGetSearchInfo = (params={})=> requests({url:'/list',method:'post',data:params})


// 获取商品详情的接口 /api/item/{skuId}  请求方式:get
export const reqGetGoodsInfo = (skuId) => requests({url:`/item/${skuId}`, method:'get'})


// 将产品添加到购物车 /api/cart/addToCart/{skuId}/{skuNum} POST
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({url:`/cart/addToCart/${skuId}/${skuNum}`, method:'post'})

// 获取购物车数据 /api/cart/cartList method:get
export const reqCartList = ()=> requests({url:"/cart/cartList", method:'get'})

// 删除购物车商品 /api/cart/deleteCart/{skuId}
export const reqDeleteCartById = (skuId)=> requests({url:`/cart/deleteCart/${skuId}`,method:'delete'})
// 切换商品的选中状态 /api/cart/checkCart/{skuId}/{isChecked}  method: get
export const reqUpdateCheckedById = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`, method:'get'})


