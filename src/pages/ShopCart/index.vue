<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked='cart.isChecked' @change='updateChecked(cart)'>
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">¥{{doublePrice(cart.skuPrice)}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handle('minus',-1,cart)">-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value='cart.skuNum' @change="handle('change',$event.target.value * 1,cart)">
            <a href="javascript:void(0)" class="plus" @click="handle('add',1,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">¥{{itemPrice(cart.skuPrice,cart.skuNum)}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllChecked' @change="updateAllCartChecked($event.target.checked)">
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import throttle from 'lodash/throttle'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
        // 获取个人购物车数据
        this.$store.dispatch('getCartList')
      },
      doublePrice(price){
        return parseFloat(price).toFixed(2)
      },
      itemPrice(price, num){
        return (parseFloat(price) * num).toFixed(2)
      },
      handle:throttle(async function(type,disNum,cart){
        //  目前 disNum行参： +变化量(1) -变化量(-1)  input最终的值，不是变化量
        switch(type){
          case "add":
            // 带给服务器变化的量
            disNum = 1
            break;
          case "minus":
            // 要判断 产品个数是否大于1
            if(cart.skuNum > 1){
              disNum = -1
            }else{
              // 产品的个数小于等于1
              disNum = 0
            }
            break;
          case "change":
            // 用户输入进来的是非法的
            if(isNaN(disNum) || disNum < 1){
              disNum = 0
            }else{
              // 这里需要考虑小数的情况
              disNum = parseInt(disNum) - cart.skuNum
            }
            break
        }
        // 派发 action
        try {
          // 代表的是修改成功
          await this.$store.dispatch('addOrUpdateShopCart',{skuId: cart.skuId, skuNum: disNum})
          // 然后重新请求数据
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },1000),
      // 根据id删除购物车的数据
      async deleteCartById(cart){
        try {
          await this.$store.dispatch('deleteCartListBySkuId',cart.skuId)
          this.getData()
        } catch (error) {
          alert(error.message)          
        }
      },
      // 修改选中状态
      async updateChecked(cart){
        try {
          // 这里需要注意 参数是对象格式 并且isChecked是 0和1 不是布尔值
          await this.$store.dispatch('updateCheckById',{skuId:cart.skuId, isChecked:cart.isChecked?0:1})
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 删除全部选中的商品
      async deleteAllCheckedCart(){
        // 派发一个action
        try {
          await this.$store.dispatch('deleteAllCheckedCart')
          // 全部成功返回结果  ['ok','ok','ok']
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      },
      // 点击底部的全选按钮
      async updateAllCartChecked(checked){
        try {
          await this.$store.dispatch('updateAllCheckedCart',checked)
          this.getData()
        } catch (error) {
          alert(error.message)
        }
      }
    },
    computed:{
        ...mapGetters(['cartListObj']),
        cartInfoList(){
          return this.cartListObj.cartInfoList || []
        },
        totalPrice(){
          return this.cartInfoList.reduce(function(pre,current){
              return pre + (current.isChecked ? (current.skuNum * current.skuPrice) : 0)
              // return pre + (current.skuNum * current.skuPrice) 
          },0)
        },
        // 是都全部选中
        isAllChecked(){
          if(this.cartInfoList.length == 0){
            return false
          }
          return this.cartInfoList.every(item => item.isChecked)
        }
    }
  }  
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con3 {
            width: 20.8333%;

            .item-txt {
              text-align: center;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>