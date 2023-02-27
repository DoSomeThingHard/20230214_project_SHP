import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 -- 全局组件
import TypeaNav from '@/components/TypeNav';
// 第一个参数是名字 第二个是组件
Vue.component(TypeaNav.name, TypeaNav)
// 轮播图组件 -- 全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
// 分页器 -- 全局组件
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name, Pagination)
//  引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServe.js mock数据
import '@/mock/mockServe'
// 引入swiper的样式
// import 'swiper/swiper-bundle.min.css'
import 'swiper/css/swiper.min.css'

// 统一接口api文件夹里面全部请求函数 这个API是一个对象 包含所有的请求函数
import * as API from '@/api' 

// 引入懒加载插件
import VueLazyload from 'vue-lazyload'
import loadimage from '@/assets/1.gif'
// const loadimage = require('./assets/images/icons.png')
Vue.use(VueLazyload,{
  loading: loadimage
})

// 按需引入Element-UI
import { Button,MessageBox } from 'element-ui';
Vue.component(Button.name, Button)
// Vue.use(Button)
// ElementUI注册组件的时候挂在原型上
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert

Vue.config.productionTip = false
let a = 100

import myPlugins from '@/plugins/myPlugins'
Vue.use(myPlugins,{
    name: 'upper'
}) 

// 引入表单校验插件
import '@/plugins/validate'

new Vue({
  render: h => h(App),
  // 全局事件总线 $bus 的配置
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API; // 把它放在Vue的原型对象上面 全局都能用
  },
  // 注册路由：地下的写法KV一致 省略V
  // 注册路由信息：当这里书写router的时候，组件身上都拥有 $route 和 $router属性
  router,
  store
}).$mount('#app')
