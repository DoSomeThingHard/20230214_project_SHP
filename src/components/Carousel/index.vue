<template>
  <div class="swiper-container" ref="mySwiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(carousel, index) in list" :key="index">
        <img :src="carousel.imgUrl" />
        </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>
</template>

<script>
import Swiper from 'swiper'
export default {
    name: 'Carousel',
    props:['list'],
    watch:{
        list:{
            immediate: true,  //上来就监听一次
            // 不使用的话 是听不到的 因为这个数据重来就没有发生过变化 数据是父亲给的
            handler(value,oldValue){
                this.$nextTick(()=>{
                    if(!this.swiper && value.length>0){
                        this.swiper = new Swiper(this.$refs.mySwiper,{
                            loop: true,
                            keyboard: true,
                            // 如果需要分页器
                            pagination:{
                                el:'.swiper-pagination',
                                // 点击小球的时候可以切换
                                clickable: true
                            },
                            // 如果需要前进后退按钮
                            navigation:{
                                nextEl:'.swiper-button-next',
                                prevEl:'.swiper-button-prev'
                            }
                        })
                    }
                })
            }
        }
    }
}
</script>
