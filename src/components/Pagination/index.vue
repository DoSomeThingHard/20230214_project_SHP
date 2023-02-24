<template>
  <div class="pagination">
    <!-- 分页器 我们按照 上 中 下 三部分 -->
    <!-- 上面部分 -->
    <button @click="pre" :disabled='pageNo == 1'>上一页</button>
    <button @click="clickPage(1)" :class="{active:pageNo == 1}" v-if="startNumAndEndNum.start > 1">1</button>
    <button v-if="startNumAndEndNum.start > 2">···</button>

    <!-- 中间部分 -->
    <template v-for="(page,index) in startNumAndEndNum.end">
        <button @click="clickPage(page)" :class="{active:pageNo == page}" :key="index" v-if="(page >= startNumAndEndNum.start)">{{page}}</button>
    </template>
    
    <!-- 下面部分 -->
    <button v-if="startNumAndEndNum.end < (totalPage - 1)">···</button>
    <button @click="clickPage(totalPage)" v-if="startNumAndEndNum.end < totalPage">{{totalPage}}</button>
    <button @click="$emit('getPageNo',pageNo+1)" :disabled='pageNo == totalPage'>下一页</button>
    
    <span class="text">共 {{total}} 条,{{totalPage}}页</span>
    <!-- <span class="text">到第</span>
    <div class="pageContainer">
        <input type="text" class="page">
        <span class="up"></span>
        <span class="down"></span>
    </div>
    <span class="text">页</span>
    <button>确定</button> -->

    <!-- <div>{{startNumAndEndNum}}</div> -->
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props:['pageNo','pageSize','total','continues'],
    computed:{
        // 总计多少页
        totalPage(){
            // 向上取整
            return Math.ceil(this.total / this.pageSize)
        },
        // 计算出连续的页码的起始数字和结束的数字【连续页码是5个】
        startNumAndEndNum(){
            // 先定义两个变量存储起始数字和结束数字
            const {pageNo,continues,totalPage} = this;
            let start,end = 0
            // 连续的页码数是5 
            if(continues > totalPage){
                start = 1;
                end = totalPage;
            }else{
                // 总页数大于5
                start = pageNo - (continues - 1) / 2
                // 结束数字
                end = pageNo + (continues - 1) / 2
                // 下面是纠正不正常的现象【start出现0或者是负数，end出现大于总页码】
                if(start < 1){
                    start = 1
                    end = continues
                }else if(end > totalPage){
                    end = totalPage;
                    start = totalPage - continues + 1;
                }
            }
            return {start, end}
        } 
    },
    methods: {
        pre(){
            this.$emit('getPageNo',this.pageNo-1)
        },
        clickPage(currentPage){
            if(currentPage != this.pageNo){
                this.$emit('getPageNo',currentPage)
            }else{
                console.log(currentPage, this.pageNo)
            }
        }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    .text{
        margin-left: 10px;
        height: 28px;
        line-height: 28px;
        font-size: 12px;
        display: inline-block;
        color: #999
    }
    .pageContainer{
        margin-left: 10px;
        display: inline-block;
        width: 34px;
        height: 20px;
        position: relative;
        border: 1px solid #ededed;
        .page{
            width: 100%;
            height: 100%;
            display: inline-block;
            border: none;
        }

        .up,.down{
            display: inline-block;
            width:10px;
            height: 10px;
            position: absolute;
            right: 0;
            display: none;
        }
        .up{
            top: 0;
            background-color: red;
        }
        .down{
            bottom: 0;
            background-color: orange;
        }
        &:hover .up, &:hover .down{
            display: inline-block;
        }
        
    }
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>
