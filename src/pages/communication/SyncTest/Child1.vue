<template>
  <div style="background: #ccc; height:50px">
    <span>小明每次花费100元</span>
    <button @click="$emit('update:money', money - 100)">花钱</button>
    爸爸还剩{{money}}元
  </div>
</template>

<script>
export default {
    props:['money']
}
</script>

<style>

</style>