import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 -- 全局组件
import TypeaNav from '@/components/TypeNav';
// 第一个参数是名字 第二个是组件
Vue.component(TypeaNav.name, TypeaNav)
//  引入路由
import router from '@/router'
// 引入仓库
import store from '@/store'

Vue.config.productionTip = false
let a = 100
new Vue({
  render: h => h(App),
  // 注册路由：地下的写法KV一致 省略V
  // 注册路由信息：当这里书写router的时候，组件身上都拥有 $route 和 $router属性
  router,
  store
}).$mount('#app')
