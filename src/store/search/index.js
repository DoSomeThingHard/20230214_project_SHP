import { reqGetSearchInfo } from "@/api"
// home模块的小仓库
const state = {
    // state中的数据默认初始值最好别乱写，要跟服务器对应
    searchInfo: {},
}
const mutations = {
    SEARCHINFO(state,searchInfo){
        state.searchInfo = searchInfo
    },
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getSearchInfo(context,params={}){
        // params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象我们给一个默认参数
        let result = await reqGetSearchInfo(params)
        if(result.code == 200){
            context.commit("SEARCHINFO",result.data)
        }
    },
}
// 就是计算属性 , 在项目中 为了简化数据而生的
const getters = {
    // 当前形参state是当前仓库的state，并非大仓库中的那个state
    goodsList(state){
        // 这样书写是有问题的，当数据没回来的时候 searchInfo就是空对象，在获取就是undefined
        return state.searchInfo.goodsList || []
    },
    trademarkList(state){
        return state.searchInfo.trademarkList  || []
    },
    attrsList(state){
        return state.searchInfo.attrsList  || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}
