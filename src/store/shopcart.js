import { reqCartList,reqDeleteCartById,reqUpdateCheckedById } from "@/api"

const state = {
    cartList:[]
}

const mutations = {
    CARTLIST(state, cartList){
        state.cartList = cartList
    }
}

const actions = {
    // 获取购物车数据
    async getCartList(context){
        const result = await reqCartList()
        if(result.code == 200){
            context.commit('CARTLIST', result.data)
        }
    },
    // 删除购物车数据
    async deleteCartListBySkuId(context, skuId){
        const result = await reqDeleteCartById(skuId)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 修改选中状态
    async updateCheckById(context, {skuId, isChecked}){
        const result = await reqUpdateCheckedById(skuId, isChecked)
        if(result.code == 200){
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
    // 删除所有选中的
    deleteAllCheckedCart({dispatch,getters}){
        let promiseAll = [];
        getters.cartListObj.cartInfoList.forEach(element => {
            if(element.isChecked){
                let promise = dispatch('deleteCartListBySkuId',element.skuId) 
                promiseAll.push(promise)
            }else{
                // let promise = dispatch('deleteCartListBySkuId') 
                // promiseAll.push(promise)
            }
        });
        // Promise.all  全成功返回结果是成功 有一个失败都是失败
        return Promise.all(promiseAll);
    },
    // 全选
    updateAllCheckedCart({dispatch,getters},checked){
        let promiseAll = [];
        getters.cartListObj.cartInfoList.forEach(element => {
            if(element.isChecked != checked){
                let promise = dispatch('updateCheckById',{skuId:element.skuId,isChecked:checked?1:0})
                promiseAll.push(promise)
            }
        });
        return Promise.all(promiseAll);
    }
}

const getters = {
    cartListObj(state){
        return state.cartList[0] || {}
    },
}

export default {
    state,
    mutations,
    actions,
    getters
}