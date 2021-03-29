<!-- 编辑资料 -->
<template>
  <div class="page">
    <header>
      <span>编辑资料</span>
      <div class="btns">
        <el-button @click="goBack">
          <i class="el-icon-arrow-left"></i>
          返回
        </el-button>
      </div>
    </header>
    <div class="button">
      <button @click="Personal">用户详情</button>
      <button @click="Editing">编辑资料</button>
      <button>登录日志</button>
    </div>
    <div class="container">
      <div class="head">
        <span> 数据列表 </span>
      </div>
      <table
        style="
          border-color: rgba(233, 233, 233, 1);
          border-right: none;
          border-bottom: none;
        "
        border="1"
        cellpadding="0"
        cellspacing="0"
        width="100%"
      >
        <tr>
          <td>时间</td>
          <td>IP</td>
          <td>地区</td>
          <td>登录方式</td>
        </tr>
        <tr>
          <td>2017-07-03 14:36:21</td>
          <td>183.14.135.1</td>
          <td>广东省深圳市</td>
          <td>PC端登录</td>
        </tr>
        <tr>
          <td>2017-07-03 14:36:21</td>
          <td>183.14.135.1</td>
          <td>广东省深圳市</td>
          <td>PC端登录</td>
        </tr>
        <tr>
          <td>2017-07-03 14:36:21</td>
          <td>183.14.135.1</td>
          <td>广东省深圳市</td>
          <td>PC端登录</td>
        </tr>
        <tr>
          <td>2017-07-03 14:36:21</td>
          <td>183.14.135.1</td>
          <td>广东省深圳市</td>
          <td>PC端登录</td>
        </tr>
        <tr>
          <td>2017-07-03 14:36:21</td>
          <td>183.14.135.1</td>
          <td>广东省深圳市</td>
          <td>PC端登录</td>
        </tr>
        <tr>
          <td>2017-07-03 14:36:21</td>
          <td>183.14.135.1</td>
          <td>广东省深圳市</td>
          <td>PC端登录</td>
        </tr>
        <tr>
          <td>2017-07-03 14:36:21</td>
          <td>183.14.135.1</td>
          <td>广东省深圳市</td>
          <td>PC端登录</td>
        </tr>
      </table>
      <div class="fullPage">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fullpage.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      fullpage: {},
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    Personal() {
      this.$router.push("/Personal");
    },
    goBack() {
      this.$router.go(-1);
    },
    Editing() {
      this.$router.push("/Editing");
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}
div {
  box-sizing: border-box;
}
.page {
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  width: 1200px;
  margin: 0 auto;
}
/* 头部区域 */
header {
  position: relative;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
header::before {
  content: "";
  clear: both;
  position: absolute;
  width: 4px;
  height: 18px;
  background-color: rgba(0, 121, 254, 1);
  top: 50%;
  margin-top: -9px;
  left: 0;
}
header > span {
  display: inline-block;
  margin-left: 10px;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #999999;
}
header .btns {
  float: right;
  display: inline-block;
}
/* 按钮组 */
.button {
  margin-top: 20px;
}
.button button {
  width: 100px;
  height: 40px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: #999999;
  line-height: 1.5;
  border: 1px solid rgba(233, 233, 233, 1);
  background-color: #fff;
  outline: none;
  cursor: pointer;
  margin-right: 20px;
}
.button button:nth-child(3) {
  color: rgb(0, 121, 254);
}
.container {
  margin-top: 20px;
  width: 100%;
  padding: 0 30px 30px 30px;
  border: 1px solid rgba(233, 233, 233, 1);
}
.container .head {
  height: 50px;
  line-height: 50px;
  display: flex;
}
.container .head > span {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: normal;
  color: #333333;
}
table td {
  border: none;
  text-align: center;
  border-right: 1px solid rgba(233, 233, 233, 1);
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
table tr:first-child {
  height: 45px;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: rgb(102, 102, 102);
  background-color: rgb(245, 245, 245);
}
table tr {
  height: 50px;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}
.page .fullPage {
    margin-top: 30px;
    text-align: right;
}
</style>