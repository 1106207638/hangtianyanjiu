<!-- 搜索历史 -->
<template>
  <div class="hist-box" style="height:calc(100vh - 411px);min-height:500px">
    <ul style="height:calc(100vh - 461px);min-height:450px">
      <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
         <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="title">关键词：xxx太空战略</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
    </ul>
    <div class="block">
        <div>
           <el-checkbox v-model="checked">全选</el-checkbox>
           <span class="del">删除记录</span> 
        </div>
        <div class="page">
 <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
        </div>
   
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
       currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods:{
       handleSizeChange(val) {
      },
      handleCurrentChange(val) {
      }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.hist-box {
    position: relative;
}
div {
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #333;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul {
    overflow: hidden;
    overflow-y: scroll;
}
li {
  display: flex;
  height: 45px;
  line-height: 45px;
}
li .checkBox {
  width: auto;
  margin-right: 20px;
}
li:last-child .content {
    border-bottom: none;
}
li .content {
  flex: 1;
  border-bottom: 1px dashed #ccc;
  text-align: right;
}
.content div {
  display: inline-block;
}
.content .title {
  float: left;
}
.block {
    position: absolute;
    bottom: -0;
    display: flex;
}
.block  {
    width: 100%;
}
.block .del {
    margin-left: 20px;
}
.page {
    flex: 1;
    text-align: right;
}
ul::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
ul::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
</style>