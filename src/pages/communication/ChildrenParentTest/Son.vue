<template>
  <div>
    <h2>儿子有存款{{money}}</h2>
    <button @click="giveMoney(50)">给爸爸50</button>
  </div>
</template>

<script>
import myMixin from '@/pages/communication/ChildrenParentTest/myMixin/myMixin'
export default {
    mixins:[myMixin],
    data() {
        return {
            money: 2000
        }
    },
}
</script>