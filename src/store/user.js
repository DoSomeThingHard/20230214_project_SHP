import { reqGetCode,reqUserRegister,reqUserLogin,reqUserInfo,reqUserLogout } from "@/api"
import { setToken,getToken,deleteToken } from "@/utils/token"

// 登录与注册的模块
const state = {
    code: '',
    token: getToken(),  // 本地获取token 获取不到是 空
    userInfo: {}
}

const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERTOKEN(state, token){
        state.token = token
    },
    USERINFO(state, userInfo){
        state.userInfo = userInfo
    },
    // 清空数据
    CLEAR(state){
        // 清空vuex中的用户数据
        state.token = '',
        state.userInfo = {},
        // 情况本地数据
        deleteToken()
    }
}

const actions = {
    // 获取验证码
    async getCode({commit}, phone){
        if(!phone || phone.length == 0){
            return Promise.reject(new Error('请输入手机号码'))
        }
        let result = await reqGetCode(phone);
        if(result.code == 200){
            commit('GETCODE', result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error('验证码发送失败'))
        }
    },
    // 注册
    async userRegister({commit}, user){
        let result = await reqUserRegister(user)
        if(result.code == 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('注册失败：' + result.message));
        }
    },
    // 登录
    async userLogin({commit}, user){
        let result = await reqUserLogin(user)
        // 服务器下发token  通过token来获取用户信息
        if(result.code == 200){
            commit("USERTOKEN",result.data.token);
            // 本地持久化存储
            setToken(result.data.token)
            return 'ok';
        }else{
            return Promise.reject(new Error('登录失败：' + result.message));
        }
    },
    // 获取用户信息
    async getUserInfo({commit}){
        let result = await reqUserInfo()
        console.log(result)
        if(result.code == 200){
            commit('USERINFO',result.data)
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message + '用户信息获取失败'))
        }
    },
    // 退出登录
    async userLogout({commit}){
        let result = await reqUserLogout()
        if(result.code == 200){
            commit('CLEAR')
            return 'ok'
        }else{
            return Promise.reject(new Error(result.message))
        }
    },
    userClearInfo({commit}){
        // 删除用户信息
        commit('CLEAR')
    }
}

const getters = {

}


export default {
    state,
    mutations,
    actions,
    getters
}