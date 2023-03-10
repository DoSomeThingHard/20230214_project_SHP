<template>
  <div>
    <h2>效果1：显示TODO列表时，已完成的TODO为绿色</h2>
    <!-- 子组件 数据来源于父组件 -->
    <List :todos='todos'>
        <!-- 子组件的结构与外观都取决于父组件 -->
        <template slot-scope="todo">
            <span :style="{color:todo.todo.isComplete?'red':'orange'}">{{todo.todo.text}}</span>
        </template>
    </List>
  </div>
</template>

<script>
import List from '@/pages/communication/ScopeSlotTest/List'
export default {
    data() {
        return {
            todos:[
                {id:1, text:'AAA', isComplete: false},
                {id:2, text:'BBB', isComplete: true},
                {id:3, text:'CCC', isComplete: false},
                {id:4, text:'DDD', isComplete: false}
            ]
        }
    },
    components:{
        List
    }
}
</script>

<style>

</style>