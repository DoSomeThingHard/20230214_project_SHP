<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 三级联动 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" :class="{ on: c1.categoryId == currentIndex }" v-for="c1 in categoryList" :key="c1.categoryId">
                <h3 @mouseenter="changeIndex(c1.categoryId)">
                  <a :data-categoryName='c1.categoryName' :data-category1Id='c1.categoryId'>{{ c1.categoryName }}</a>
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" :style="{display:currentIndex==c1.categoryId?'block':'none'}">
                  <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName='c2.categoryName' :data-category2Id='c2.categoryId'>{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName='c3.categoryName' :data-category3Id='c3.categoryId'>{{ c3.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// import _ from 'lodash'
import throttle from "lodash/throttle";
export default {
  data() {
    return {
      // 存储用户鼠标移上哪一个一级分类
      currentIndex: -1,
      show: true
    };
  },
  name: "TypeNav",
  // 组件挂载完毕，可以像服务器发送请求
  mounted() {
    // 当组件挂载完毕的时候 让show属性变为false
    // 如果不是home路由组件 将typeNav进行隐藏
    if(this.$route.path != '/home'){
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    // changeIndex(currentIndex) {
    //   this.currentIndex = currentIndex;
    // },
    // changeIndex:_.throttle(function(currentIndex){
    //   this.currentIndex = currentIndex
    // },50),
    // 鼠标进入修改响应式数据 currentIndex属性
    changeIndex:throttle(function(currentIndex){
      this.currentIndex = currentIndex
    },50),
    // 鼠标移出去的事件回调 让商品分类列表进行隐藏
    leaveIndex() {
      this.currentIndex = -1;
      if(this.$route.path != '/home'){
        this.show = false
      }
    },
    // 当鼠标移入的时候，让商品分类列表展示
    enterShow(){
      this.show = true
    },
    // 进行路由跳转的方法
    goSearch(event){
      let element = event.target;
      // 获取到当前触发这个事件的节点可能是【h3、a、dt、dl】，我们只要判断是否有我们的自定义属性就行了
      // console.log(event.target)   输出的是 <a data-categoryname="图书、音像、电子书刊">图书、音像、电子书刊</a>
      // 这里需要注意我们添加的自定义属性名字是 data-categoryName  浏览器解析完就是  data-categoryname了
      // 可以通过节点的 dataset属性获取到 节点的自定义属性与属性值
      // console.log(element.dataset.categoryname)
      let {categoryname, category1id, category2id, category3id} = element.dataset;
      if(categoryname){
        let location = {name: 'search'}
        // let location = {path: '/search'}   // path不能跟params一起使用
        let query = {categoryName: categoryname}
        // 要区分1 2 3级分类的a标签
        if(category1id){
          query.category1Id = category1id
        }else if(category2id){
          query.category2Id = category2id
        }else {
          query.category3Id = category3id
        }
        // 当路由中含有params的时候 将params也一起带过去
        if(this.$route.params){
          location.params = this.$route.params
        }
        // 整理完参数
        location.query = query
        // 路由跳转
        this.$router.push(location)
      }
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .on {
          // 当class有on的时候显示 item-list 然后自己是蓝色
          background: skyblue;
          // 使用js去实现
          // .item-list {
          //   display: block;
          // }
        }
      }
    }
    // 过渡动画的样式
    // 过渡动画开始状态（进入）
    .sort-enter{
      // height: 0px;
      transform: rotateY(90deg);
    }
    // 过渡动画的结束状态
    .sort-enter-to{
      // height: 461px;
      transform: rotateY(0deg);
    }
    // 定义动画时间和速率
    .sort-enter-active{
      transition: all .25s linear;
    }
    // // 过渡动画开始状态（离开）
    // .sort-leave-from{
    //   opacity: 1;
    // }
    // .sort-leave-to{
    //   opacity: 0;
    // }
    // .sort-leave-active{
    //   transition: all .5s linear;
    // }
  }
}
</style>
