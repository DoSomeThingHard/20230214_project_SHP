// 引入路由
import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'

// 路由配置信息
export default [
    {
        path:'/shopcart',
        component: ShopCart,
        meta:{showBottom: true}
    },
    {
        path:'/addcartsuccess',
        component: AddCartSuccess,
        name: 'addcartsuccess',
        meta:{showBottom: true}
    },
    {
        path:'/detail/:skuid',
        component: Detail,
        meta:{showBottom: true}
    },
    {
        path:'/home',
        component: Home,
        meta:{showBottom: true}
    },
    {
        path:'/search/:keyword?',
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
    // {
    //     path:'/',
    //     redirect:'/home'
    // }
]