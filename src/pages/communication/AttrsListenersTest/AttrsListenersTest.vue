<template>
  <div>
    <h2>AttrsListenersTest</h2>
    <el-button type="primary">添加</el-button>
    <!-- 用户在使用我们封装的按钮的时候 需要向我们的组件传递参数 -->
    <HintButton type="primary" icon="el-icon-delete" size='mini' title="提示" @click="handler"/>
  </div>
</template>

<script>
import HintButton from './HintButton'
export default {
    components:{
        HintButton
    },
    methods:{
        handler(){
            alert('666');
        }
    }
}
</script>

<style>

</style>