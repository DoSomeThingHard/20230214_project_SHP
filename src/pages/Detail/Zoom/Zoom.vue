<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <!-- 这个是哪个小滑块 -->
    <div class="event" @mousemove="handler"></div>
    <!-- 被放大的图片 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="bigImg" />
    </div>
    <!-- 就是那个绿色的 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props: ["skuImageList"],
    data() {
      return {
        imgIndex : 0
      }
    },
    computed:{
      imgObj(){
        return this.skuImageList[this.imgIndex] || {}
      }
    },
    mounted(){
      this.$bus.$on('getIndex', (index)=>{
        this.imgIndex = index
      })
    },
    methods:{
      handler(event){
        // 获取那个绿色的蒙版
        let mask = this.$refs.mask
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        let maxLeft = event.target.clientWidth - mask.offsetWidth;
        let maxTop = event.target.clientHeight - mask.offsetHeight;
        if(top < 0) top = 0  
        if(top > maxTop) top = maxTop
        if(left < 0) left = 0
        if(left > maxLeft) left = maxLeft
        // 修改元素的 left和top
        mask.style.left = left+'px'
        mask.style.top = top+'px'

        // 获取的是大图
        let bigImg = this.$refs.bigImg
        bigImg.style.left = -2*left +'px'
        bigImg.style.top = -2*top +'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>