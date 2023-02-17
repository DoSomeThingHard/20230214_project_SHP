import { reqCategoryList,reqGetBannerList,reqGetFloorList } from "@/api"
// home模块的小仓库
const state = {
    // state中的数据默认初始值最好别乱写，要跟服务器对应
    categoryList: [],
    // 轮播图的数据
    bannerList:[],
    // 楼层的数据
    floorList:[]
}
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state, bannerList){
        state.bannerList = bannerList
    },
    FLOORIST(state, floorList){
        state.floorList = floorList
    }
}
const actions = {
    // 通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getCategoryList(context){
        let result = await reqCategoryList()
        if(result.code == 200){
            context.commit("CATEGORYLIST",result.data)
        }
    },
    // 获取首页轮播图数据
    async getBannerList(context){
        let result = await reqGetBannerList()
        if(result.code == 200){
            context.commit("BANNERLIST",result.data)
        }
    },
    // 获取floor数据
    async getFloorList(context){
        let result = await reqGetFloorList()
        if(result.code == 200){
            context.commit("FLOORIST",result.data)
        }
    }

}
// 就是计算属性 
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}
