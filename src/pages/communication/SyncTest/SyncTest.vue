<template>
  <div>
    SyncTest 小明的爸爸现在又 {{ money }} 元
    <h2>不使用sync修饰符</h2>
    <!-- :money是父组件给子组件传递props @update:money是自定义事件名字叫(update:money) -->
    <Child1 :money="money" @update:money="money = $event"></Child1>
    <h2>使用sync修饰符</h2>
    <!-- :money.sync 第一：父组件给子组件传递了 props money  第二：相当于子组件绑定了一个自定义事件,而且事件的名称就是 update:money -->
    <Child2 :money.sync="money"></Child2>
  </div>
</template>

<script>
import Child1 from "@/pages/communication/SyncTest/Child1";
import Child2 from "@/pages/communication/SyncTest/Child2";
export default {
  data() {
    return {
      money: 10000,
    };
  },
  components: {
    Child1,
    Child2,
  },
};
</script>

<style>
</style>