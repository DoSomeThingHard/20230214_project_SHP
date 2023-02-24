import Vue from 'vue'
import Vuex from 'vuex'

// 需要使用插件一次
Vue.use(Vuex)
// 对外暴漏Store类的一个实例
// state：仓库存储数据的地方
// mutations：修改state的唯一手段
// actions：处理action，可以书写自己的业务逻辑，可以处理异步
// getters：理解为计算属性，用于简化仓库数据，让组件获取仓库数据更加的方便
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './user'
export default new Vuex.Store({
    // state:{},
    // mutations:{},
    // actions:{},
    // getters:{}
    modules:{
        home,
        search,
        detail,
        shopcart,
        user
    }

})