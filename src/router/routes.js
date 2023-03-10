// 引入路由
// import Home from '@/pages/Home/index.vue'
import Search from '@/pages/Search'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'
// 引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

// 路由配置信息
export default [
    {
        path:'/center',
        component: Center,
        meta:{showBottom: true},
        // 二级路由组件
        children:[
            {
                path:'myorder',     // path:'/center/myOrder'   要么写全 要么不写
                component: MyOrder
            },
            {
                path:'grouporder',    
                component: GroupOrder
            },
            {
                path:'/center',
                redirect:'/center/myorder'
            }

        ]
    },
    {
        path:'/paysuccess',
        component: PaySuccess,
        meta:{showBottom: true}
    },
    {
        path:'/pay',
        component: Pay,
        meta:{showBottom: true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path == '/trade'){
                next()
            }else{
                // 其他的路由组件而来，停留在当前
                next(false)
            }
        }
    },
    {
        path:'/trade',
        component: Trade,
        meta:{showBottom: true},
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车而来
            if(from.path == '/shopcart'){
                next()
            }else{
                // 其他的路由组件而来，停留在当前
                next(false)
            }
        }
    },
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
        // component: Home,
        component: ()=> import('@/pages/Home'), // 这就是懒加载啊
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
    {
        path:'/',
        redirect:'/home'
    },
    {
        path:'/communication',
        component:()=> import('@/pages/communication/communication'),
        children:[
            {
                path:'event',
                component: ()=>import('@/pages/communication/EventTest/EventTest'),
            },
            {
                path:'model',
                component: ()=>import('@/pages/communication/ModelTest/ModelTest'),
            },
            {
                path:'sync',
                component: ()=>import('@/pages/communication/SyncTest/SyncTest'),
            },
            {
                path:'children-parent',
                component: ()=>import('@/pages/communication/ChildrenParentTest/ChildrenParentTest'),
            },
            {
                path:'attrs-listeners',
                component: ()=>import('@/pages/communication/AttrsListenersTest/AttrsListenersTest'),
            },
            {
                path:'scope-slot-test',
                component: ()=>import('@/pages/communication/ScopeSlotTest/ScopeSlotTest'),
            },
            {
                path:'/',
                // redirect:'event'
                // redirect:'model'
                // redirect:'sync'
                // redirect:'attrs-listeners'
                // redirect:'children-parent'
                redirect:'scope-slot-test'
            }

        ]
    }
]