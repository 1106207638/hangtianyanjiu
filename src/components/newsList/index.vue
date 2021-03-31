<!-- 数据字典 -->
<template>
  <div class="page">
    <!--    <Headers />-->
    <div class="containerr">
      <div class="container">
        <header>
          <span>航天新闻</span>
          <div class="btns">
            <el-button @click="goBack" v-if="!isDetail">
              <i class="el-icon-arrow-left"></i>
              返回
            </el-button>
          </div>
        </header>
        <div class="news_content" v-if="isDetail">
          <div>
            <el-input
              style="width: 200px"
              v-model="input"
              placeholder="请输入检索关键字"
            ></el-input>
            <el-button
              style="margin-left: 10px"
              type="primary"
              icon="el-icon-search"
              @click="search"
              >搜索</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-refresh-right"
              @click="refrech"
              >重置</el-button
            >
          </div>
          <div class="news_main">
            <div
              class="newsItem"
              @click="detail(item)"
              v-for="(item, index) in newsList"
              :key="index"
            >
              <img :src="item.cover" alt="" />
              <div>
                <p>{{ item.title }}</p>
                <p style="height: 40px">{{ item.digest }}</p>
                <p>
                  <span>发布时间：</span
                  ><span style="margin-right: 10px">{{ item.createTime }}</span>
                  <span>发布人：</span><span>{{ item.author }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNo"
              :page-size="pageSize"
              layout="total, prev, pager, next, jumper"
              :total="fullpage.total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="news_content" v-if="!isDetail">
          <div class="message_Hbox">
            <span class="title">{{ newsObj.title }}</span>
            <span class="date"
              ><span style="margin-right: 30px; color: #999"
                >发表时间：{{ newsObj.createTime }}</span
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999"
                >作者：{{ newsObj.author }}</span
              ></span
            >
          </div>
          <div class="message_content">
            <span class="content" v-html="newsObj.content"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetNewsList } from "../../api/api";
export default {
  components: {},
  data() {
    return {
      input: "",
      isDetail: true,
      newsList: [],
      newsObj: {},
      pageNo: 1,
      pageSize: 10,
      fullpage: {},
      type: "",
      input1: "",
      id: "",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    if (this.$route.query.id) {
      this.isDetail = false;
      this.id = this.$route.query.id;
    }
    this.getNewList();
  },
  methods: {
    // 重置
    refrech() {
      this.input = "";
      this.input1 = "";
      this.type = "";
      this.getNewList();
    },
    // 搜索
    search() {
      var input = this.input.trim();
      if (input == "") {
        // this.$message.info('请输入关键字在进行检索！')
        this.getNewList();
      } else {
        this.input1 = "*" + this.input + "*";
        this.type = "search";
        this.getNewList();
      }
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getNewList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getNewList();
    },
    // 获取新闻列表
    getNewList() {
      GetNewsList({
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        title: this.input1,
        type: this.type,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.newsList = data.result.records;
          this.fullpage = data.result;
          if (!this.isDetail) {
            for (var i = 0; i < this.newsList.length; i++) {
              if (this.id == this.newsList[i].id) {
                this.newsObj = this.newsList[i];
                console.log(this.newsObj.content);
              }
            }
          }
        }
      });
    },
    detail(item) {
      this.isDetail = !this.isDetail;
      this.newsObj = item;
    },
    goBack() {
      this.isDetail = !this.isDetail;
    },
  },
  beforeDestroy() {
    this.isDetail = true;
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
div {
  box-sizing: border-box;
}
.page {
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  background: rgb(52, 87, 145);
}
.containerr {
  padding: 20px 30px;
  padding-top: 28px;
}
/deep/.containerr img {
  max-width: 100%;
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
.news_main {
  margin-top: 20px;
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
.container {
  width: 100%;
  padding: 20px 30px;
  background: #fff;
}
.news_content {
  margin-top: 20px;
}
.newsItem {
  cursor: pointer;
  display: flex;
  padding: 5px 0px;
  border-bottom: 1px solid #ccc;
}
.newsItem img {
  width: 150px;
  height: 100px;
  display: block;
}
.newsItem > div {
  flex: 1;
  margin-left: 20px;
  height: 100%;
  height: 100px;
}
.newsItem > div p:first-child {
  margin-top: 5px;
  font-weight: 700;
  font-style: normal;
  font-size: 15px;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.newsItem > div p:nth-child(2) {
  margin-top: 10px;
  font-style: normal;
  font-size: 14px;
  color: #000;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
p {
  padding: 0;
  margin: 0;
}
/* 详细消息 */
.message_Hbox {
  width: 100%;
  height: 120px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.message_Hbox .title {
  display: block;
  font-weight: 700;
  font-size: 20px;
  color: #333333;
}
.message_Hbox .date {
  display: block;
  font-size: 14px;
  color: #333;
}
.message_content {
  min-height: 500px;
}
.message_content .title {
  margin-top: 10px;
  display: block;
  font-weight: 400;
  font-style: normal;
  line-height: 28px;
  color: #333;
  margin-bottom: 25px;
  font-size: 13px;
}
.message_content .content {
  display: block;
  font-weight: 400;
  font-style: normal;
  line-height: 28px;
  font-size: 13px;
  color: #333;
}
.block {
  text-align: right;
}
.autor {
  font-size: 14px;
}
/deep/video {
  display: block;
  max-width: 80% !important;
  min-width: 1100px !important;
  margin: 0 auto;
}
</style>