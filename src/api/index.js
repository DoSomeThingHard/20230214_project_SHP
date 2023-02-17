// 当前这个模块：API进行统一管理
import requests from './request'
import mockRequest from './mockAjax'

// 三级联动的接口
// api/product/getBaseCategoryList  get 无参数
// 发请求  axios发送请求返回结果是 Promise对象
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList', method:'get'});


// 获取banner（首页轮播图接口）
export const reqGetBannerList = ()=> mockRequest({url:'/banner'})
// 获取floor数据
export const reqGetFloorList = ()=> mockRequest({url:'/floor'})