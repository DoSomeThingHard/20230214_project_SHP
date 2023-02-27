<template>
  <div>
    <!-- <h1 v-upper='msg'>1</h1> -->
    <Header />
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录、注册隐藏 -->
    <Footer v-show="$route.meta.showBottom" />
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer'
export default {
  data() {
    return {
      msg: 'abc'
    }
  },
  components:{
    Header,
    Footer
  },
  mounted(){
    // 通知Vuex发送请求，获取数据，存储于仓库当中
    this.$store.dispatch("getCategoryList");
  }
}
</script>

<style>
#nprogress .bar{
  background: red !important;
}
</style>