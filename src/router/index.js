// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter);
// 将路由的内容引入进来
import routes from './routes';

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
export default new VueRouter({
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
