<!-- 数据字典 -->
<template>
  <div class="page">
    <!--    <Headers />-->
    <div class="containerr">
      <div class="container">
        <header v-if="isDetail">
          <div>
            <el-input
              style="width: 400px"
              v-model="input"
              placeholder="请输入检索关键字"
            >
            </el-input>
            <el-button-group>
              <el-button
                style="margin-left: 10px; background: #00cfff"
                type="primary"
                size="medium"
                icon="el-icon-search"
                @click="search"
                >搜索</el-button
              >
              <el-button
                type="primary"
                icon="el-icon-refresh-right"
                style="background: #00add5"
                size="medium"
                @click="refrech"
                >重置</el-button
              >
            </el-button-group>
          </div>
        </header>
        <div class="news_content" v-if="isDetail" style="margin-top: 20px">
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
                <p style="height: 40px">
                  {{ item.digest }}
                </p>
                <p style="color: #7296c0">
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
        <div
          class="news_content"
          v-if="!isDetail"
          style="display: flex; justify-content: space-between"
        >
          <div style="flex: 1">
            <header class="message_Hbox">
              <div class="btns">
                <el-button
                  @click="goBack"
                  style="
                    background: #0f325e;
                    color: #ffffff;
                    border: 1px solid #fff;
                  "
                >
                  <i class="el-icon-arrow-left"></i>
                  返回
                </el-button>
              </div>

              <span class="title">{{ newsObj.title }}</span>
              <span class="date"
                ><span style="margin-right: 30px; color: #999"
                  >发表时间：{{ newsObj.createTime }}</span
                >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: #999"
                  >作者：{{ newsObj.author }}</span
                ></span
              >
            </header>
            <div class="message_content">
              <span class="content" v-html="newsObj.content"></span>
            </div>
          </div>
          <div style="width: 400px; padding-left: 24px">
            <div
              class="new_news"
              style="
                height: 120px;
                border-bottom: 1px solid #2f5799;
                position: relative;
              "
            >
              <div style="position: absolute; bottom: 20px">
                <div style="border-left: 3px solid #00add5; height: 26px">
                  <div
                    style="
                      font-size: 22px;
                      font-family: Adobe Heiti Std;
                      font-weight: bold;
                      color: #ffffff;
                      margin-left: 10px;
                    "
                  >
                    最新新闻
                  </div>
                </div>
              </div>
            </div>
            <div
              class="newsItem"
              @click="detail1(item)"
              v-for="(item, index) in newsList"
              :key="index"
              style="padding: 26px 0; min-height: 0"
            >
              <img :src="item.cover" alt="" />
              <div style="display: grid">
                <p style="font-size: 14px">{{ item.title }}</p>
                <p
                  style="
                    color: #7296c0;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                  "
                >
                  <span style="display: block"
                    >发布时间：{{ item.createTime }}</span
                  >
                  <span>发布人：{{ item.author }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GetNewsList } from "../../api/api";
import Header from "../../common/header.vue";
export default {
  components: { Header },
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
    detail1(item) {
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
  background: #1e3e74;
  word-wrap: break-word;
}
.containerr {
  padding: 10px 47px;
}
/deep/.containerr img {
  max-width: 100%;
}
/deep/.el-pager li {
  background: #001529;
  border-top: 1px solid #3cdaff;
  border-bottom: 1px solid #3cdaff;
}
/deep/.el-pagination button {
  background: #001529;
  border: 1px solid #3cdaff;
}
/deep/.el-pagination span {
  color: #fff;
}
/deep/.el-pagination input {
  background: #001529;
  border: 1px solid #3cdaff;
  color: #fff;
}
/* 头部区域 */
header {
  position: relative;
  height: 60px;
  line-height: 60px;
}

.news_main {
  margin-top: 28px;
}
.btns {
  background: #0f325e;
  position: absolute;
}
.container {
  width: 100%;
  padding: 28px;
  background: #0f325e;
  border: 1px solid #3cdaff;
}

.newsItem {
  cursor: pointer;
  display: flex;
  padding: 26px 24px;
  min-height: 171px;
  border-bottom: 1px solid #2f5799;
}
.newsItem:hover {
  background: #183d6d;
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
  color: #fff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.newsItem > div p:nth-child(2) {
  margin-top: 10px;
  font-style: normal;
  font-size: 14px;

  color: #7296c0;
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
  border-bottom: 1px solid #2f5799;
}
.message_Hbox .title {
  display: block;
  font-weight: 700;
  font-size: 20px;
  color: #fff;
}
.message_Hbox .date {
  display: block;
  font-size: 14px;
  color: #fff;
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
  color: #fff;
}
.content {
  margin-top: 20px;
}
/deep/.content p {
  background-color: #0f325e !important;
  color: #fff !important;
}
.block {
  text-align: right;
}
.autor {
  font-size: 14px;
}
/deep/.content span {
  color: #fff !important;
}
/deep/video {
  display: block;
  max-width: 80% !important;
  min-width: 1100px !important;
  margin: 0 auto;
}
</style>