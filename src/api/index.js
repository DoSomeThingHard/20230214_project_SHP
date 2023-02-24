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


// 获取验证码的接口  /api/user/passport/sendCode/{phone}  method:get
export const reqGetCode = (phone)=> requests({url:`/user/passport/sendCode/${phone}`,method:'get'})
// 用户注册的接口   /api/user/passport/register   method:post  phone code password
export const reqUserRegister = (data)=>requests({url: '/user/passport/register',data,method:'post'})
// 登录的接口  /api/user/passport/login  method: post    phone password
export const reqUserLogin = (data)=>requests({url:'user/passport/login',data, method:'post'})
// 获取用户信息 /api/user/passport/auth/getUserInfo  method:get
export const reqUserInfo = ()=>requests({url:'user/passport/auth/getUserInfo', method:'get'})
// 退出登录  /api/user/passport/logout  method:get
export const reqUserLogout =()=>requests({url:'user/passport/logout', method:'get'})


// 获取用户收货地址信息
export const reqAddressInfo = ()=> requests({url:'user/userAddress/auth/findUserAddressList', method:'get'})
// 获取商品清单
export const reqOrderInfo = ()=> requests({url:'/order/auth/trade', method:'get'})
// 提交订单
export const reqSubmitOrder = (trade, data) => requests({url:`/order/auth/submitOrder?tradeNo=${trade}`,data, method:'post'})
// 获取订单支付信息
export const reqPayInfo = (orderId)=> requests({url:`/payment/weixin/createNative/${orderId}`, method:'get'})
// 获取支付订单状态
export const reqPayStatus = (orderId)=> requests({url:`/payment/weixin/queryPayStatus/${orderId}`, method:'get'})
