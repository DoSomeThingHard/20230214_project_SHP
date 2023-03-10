<template>
  <div>
    <a :title="$attrs.title">
        <el-button v-bind='$attrs' v-on="$listeners">添加</el-button>
    </a>
  </div>
</template>

<script>
export default {
    mounted() {
        console.log(this.$attrs)
    },
}
</script>

<style>

</style>