// 配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
// 使用插件
Vue.use(VueRouter);
// 引入路由
import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
let originPush = VueRouter.prototype.push
VueRouter.prototype.push = function(location){
    originPush.call(this,location,()=>{},()=>{})
    console.log(this)
    // alert('11')
}

// 配置路由
export default new VueRouter({
    routes:[
        {
            path:'/home',
            component: Home,
            meta:{showBottom: true}
        },
        {
            path:'/search/:keyword',
            component: Search,
            meta:{showBottom: true},
            name: "search"
        },
        {
            path:'/login',
            component: Login
        },
        {
            path:'/register',
            component: Register
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})
