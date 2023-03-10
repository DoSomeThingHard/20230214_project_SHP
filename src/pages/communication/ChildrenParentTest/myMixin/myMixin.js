export default {
    methods:{
        giveMoney(money){
            this.money -= money
            // 子组件中获取父组件, 可以操作
            // console.log(this,this.$parent)
            this.$parent.money += money
        }
    }
}