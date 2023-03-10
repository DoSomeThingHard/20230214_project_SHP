<template>
  <ul>
    <li v-for="item in todos" :key="item.id">
        <!-- 作用域插槽 作用是让子组件将数据回传给父组件 -->
        <!-- 这里不是props 这就是作用域插槽的写法 -->
        <slot :todo='item'></slot>
    </li>
  </ul>
</template>

<script>
export default {
    props:['todos']
}
</script>
