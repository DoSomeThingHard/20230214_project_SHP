import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 -- 全局组件
import TypeaNav from '@/components/TypeNav';
// 第一个参数是名字 第二个是组件
Vue.component(TypeaNav.name, TypeaNav)
// 轮播图组件 -- 全局组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel)
//  引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'
// 引入MockServe.js mock数据
import '@/mock/mockServe'
// 引入swiper的样式
// import 'swiper/swiper-bundle.min.css'
import 'swiper/css/swiper.min.css'

Vue.config.productionTip = false
let a = 100
new Vue({
  render: h => h(App),
  // 注册路由：地下的写法KV一致 省略V
  // 注册路由信息：当这里书写router的时候，组件身上都拥有 $route 和 $router属性
  router,
  store
}).$mount('#app')
