<template>
  <div>
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
  components:{
    Header,
    Footer
  }
}
</script>

<style>

</style>