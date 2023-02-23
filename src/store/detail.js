import {reqGetGoodsInfo,reqAddOrUpdateShopCart} from "@/api"
import {getUUID} from "@/utils/uuid_token.js"

const state = {
    goodsInfo: {},
    // 游客的临时身份
    uuid_token: getUUID()
}
const mutations = {
    GOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    },
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getGoodsInfo(context,skuId){
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象我们给一个默认参数
        let result = await reqGetGoodsInfo(skuId)
        if(result.code == 200){
            context.commit("GOODSINFO",result.data)
        }
    },
    // 将产品添加到购物车
    async addOrUpdateShopCart(context,{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 当前这个函数如果执行返回的 Promise  因为是 async修饰的
        if(result.code == 200){
            // 返回的事成功的标记
            return "ok"
        }else{
            // 代表的是失败  返回的事失败的标记
            return Promise.reject(new Error('faile le a 长点心吧'))
        }
    }
}

const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView || {}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
