<template>
  <div>
    <h2>BABA渔有存款{{money}}</h2>
    <button @click="borrowSon(100)">找儿子借100</button>
    <button @click="borrowDaughter(150)">找女儿借150</button>
    <button @click="borrowAll(200)">找所有孩子借200</button>
    <Son ref="son"></Son>
    <Daughter ref="daughter"></Daughter>
  </div>
</template>

<script>
import Son from '@/pages/communication/ChildrenParentTest/Son'
import Daughter from '@/pages/communication/ChildrenParentTest/Daughter'
export default {
    data() {
        return {
            money: 1000
        }
    },
    methods:{
        borrowSon(money){
            // 父组件的钱增加100
            this.money += money 
            // 让子组件减去100  可以使用ref 来获取到组件和数据 可以对数据进行操作
            // console.log(this.$refs.son)
            this.$refs.son.money -= money
        },
        borrowDaughter(money){
            this.money += money 
            this.$refs.daughter.money -= money
        },
        borrowAll(money){
            this.money += money * 2
            // 组件实例自身有一个属性  $children 可以获取到所有的子组件
            this.$children.forEach(element => {
                element.money -= money
            });
        }
    },
    components:{
        Son,
        Daughter
    }
}
</script>

<style>

</style>