<template>
  <div>
    <!-- 三级联动 已经是全局组建了 不需要再引入了 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :floor=floor />
    <Brand />
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
import {mapState} from 'vuex'
export default {
  data() {
    return {
      
    }
  },
  mounted(){
    this.$store.dispatch('getFloorList')
  },
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  computed:{
    ...mapState({
      floorList: (state)=>state.home.floorList
    })
  },
  methods:{

  }
}
</script>

<style>

</style>