<template>
    <div>
        eventTest
        <button @click="handler">原生Dom绑定原生事件</button>
        <Event @click.native="handle1"></Event>
    </div>
</template>

<script>
import Event from './Event.vue'
export default {
    components:{
        Event
    },
    methods: {
        // 原生Dom button的事件回调
        handler(event){
            console.log('ss',event)
        },
        handle1(event){
            console.log('dd',event)
        }
    },
}
</script>

<style>

</style>