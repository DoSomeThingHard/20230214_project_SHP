<template>
  <div>
    <h2>女儿有存款{{money}}</h2>
    <button @click="giveMoney(100)">给爸爸100</button>
  </div>
</template>

<script>
import myMixin from '@/pages/communication/ChildrenParentTest/myMixin/myMixin'
export default {
    mixins:[myMixin],
    data() {
        return {
            money: 3000
        }
    },
}
</script>