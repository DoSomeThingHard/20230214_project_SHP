import {reqAddressInfo,reqOrderInfo} from '@/api'

const state = {
    addressInfo: [],
    orderInfo: {}
}
const mutations = {
    GETUSERADDRESS(state, addressInfo){
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo){
        state.orderInfo = orderInfo
    }
}
const actions = {
    // 获取用户地址信息     想要有数据 使用 13700000000 111111这个账户号
    async getUserAddress({commit}){
        let result = await reqAddressInfo()
        if(result.code == 200){
            commit('GETUSERADDRESS',result.data)
        }else{

        }
    },
    // 获取订单信息
    async getUserTrade({commit}){
        let result = await reqOrderInfo()
        if(result.code == 200){
            commit('GETORDERINFO', result.data)
        }else{

        }
    }
}
const getters = {}
export default{
    state,
    mutations,
    actions,
    getters
}
