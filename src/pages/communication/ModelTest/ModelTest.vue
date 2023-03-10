<template>
  <div>
    ModeTest
        <input type="text" :value="msg" @input="msg = $event.target.value">
        {{msg}}
        <!-- :value 在自定义组件上面 就是props 父子组件通信-->
        <!-- @input是自定义事件 -->
        <CustomInput :value='msg' @input="msg = $event" />
        <CustomInput v-model="msg" />
</div>   

</template>

<script>
import CustomInput from '@/pages/communication/ModelTest/CustomInput'
export default {    
    data() {
        return {
            msg:''
        }
    },
    components:{
        CustomInput
    }

}
</script>

<style>

</style>