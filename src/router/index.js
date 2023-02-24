// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter);
// 将路由的内容引入进来
import routes from './routes';
// 引入 store
import store from '@/store'

// 解决路由跳转报错的问题
let originPush = VueRouter.prototype.push
let originrReplace = VueRouter.prototype.replace
// 重写VueRouter,prototype身上的push方法
VueRouter.prototype.push = function(location){
    originPush.call(this,location,()=>{},()=>{})
    console.log(this)
}
// 重写VueRouter,prototype身上的replace方法
VueRouter.prototype.replace = function(location){
    originrReplace.call(this,location,()=>{},()=>{})
    console.log(this)
}

// 配置路由
let router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition){
        console.log(to,from, savedPosition);
        // 代表的是浏览器存下的偏移
        if(savedPosition){
            return savedPosition
        }
        // 代表的是滚动条在最上方
        return {y:0}
    }
})

// 全局前置守卫
// to是目的路由信息  from是起始路由信息 next()是放行函数
router.beforeEach(async (to,from,next)=>{
    // next();  全部放行
    // next('/login')  放行到指定的path
    // next(false)
    // 用户登录了才有token
    const token = store.state.user.token;
    const userInfo = store.state.user.userInfo;
    console.log(token)
    if(token){
        // 如果已经登录了 还想去login的话 就给他指定跳转到 首页
        if(to.path == '/login' || to.path == '/register'){
            next('/')   // 等同于是  next('/home')
        }else{
            // 登录了 去的是其他的页面 我们需要调用获取用户信息
            if(userInfo.name){
                // 由用户信息直接跳
                next()
            }else{
                // 没有用户信息，派发action 让仓库存储用户信息再跳转
                try {
                    // 获取用户信息 成功 放行
                    await store.dispatch('getUserInfo')
                    next()
                } catch (error) {
                    // 失败了从定向到登陆页面  有可能是token过期了
                    // 清除token
                    await store.dispatch('userLogout')
                    // store.dispatch('userClearInfo')
                    next('/login')
                }
            }
        }
    }else{
        // 未登录的情况
        next()
    }
})

export default router
