<template>
  <div style="background: #f40; height:50px">
    <h2>input包装组件</h2>
    <input type="text" :value="value" @input="$emit('input',$event.target.value)"> 
  </div>
</template>

<script>
export default {
    props:['value']
}
</script>

<style>

</style>