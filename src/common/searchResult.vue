<!--  -->
<template>
  <div class="banner" >
    <div class="content">
      <!-- 左侧导航栏 -->
      <el-aside width="200px">
        <div class="banner-left">
          <!-- 每一个大分类 -->
          <div class="headLine" v-for="(item, index) in list" :key="index">
            <div @click="close(index)" class="box">
              <i class="el-icon-circle-plus" v-show="!item.isOff"></i>
              <i class="el-icon-remove" v-show="item.isOff"></i>
              <span>{{ item.name }}</span>
            </div>

            <ul
                v-show="item.isOff"
                v-for="(item1, index) in item.children"
                :key="index"
            >
              <li
                  :class="item1.id == cateIndex ? 'active' : ''"
                  @click="toggleCate(item1.id)"
              >
                {{ item1.name }}
              </li>
            </ul>
          </div>
        </div>
      </el-aside>

      <!-- 右侧表格 -->
      <el-main>
        <div class="banner-right">
          <el-card
              class="box-card"
              style="min-height: calc(100%-250px)"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.6)"
          >
            <div class="head-box">
              <!-- 头部操作栏 -->
              <div class="toolTip">
                <el-checkbox
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                >全选</el-checkbox
                >
                <ul>
                  <li>
                    显示等级
                    <i class="el-icon-arrow-down"></i>
                  </li>
                  <li>
                    分组浏览
                    <i class="el-icon-arrow-down"></i>
                  </li>
                  <li>相关度</li>
                  <li>
                    效力级别
                    <i class="el-icon-bottom"></i>
                  </li>
                  <li @click="sort">
                    发布日期
                    <i class="el-icon-bottom" v-show="isSort"></i>
                    <i class="el-icon-top" v-show="!isSort"></i>
                  </li>
                </ul>
              </div>
              <!-- 分类蓝 -->
              <div class="title-box">
                  <span class="title" style="margin-right: 20px">{{
                      searchVal
                    }}</span>
                <span class="title" style="margin-right: 20px"
                >共{{ recordsList.total }}篇</span
                >
                <span class="more">查看更多</span>
              </div>
            </div>
            <!-- 内容区域 -->
            <div class="right_content">
              <div
                  class="bookList"
                  v-for="(item, index) in recordsList.records"
                  :key="index"
              >
                <div>
                  <el-checkbox-group
                      v-model="checkedCities"
                      @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox :label="item.id"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <div style="display: inline-block" class="book_right">
                  <div class="bHead">
                    <div class="title" @click="goBook(item.datasource, item.id,item.url)">
                      {{ item.title }}
                    </div>
                    <span>[{{ item.createTime | dateformat }}]</span>
                  </div>
                  <div class="bContent">{{ item.summary }}</div>
                  <!-- 分类 -->
                  <div class="class">
                    <div class="class_item">太空战略</div>
                    <div class="class_item">太空战略</div>
                    <div class="class_item">太空战略</div>
                    <div class="class_item">太空战略</div>
                  </div>
                  <div class="bBottom">
                    <div class="left">
                      <span>等级：</span>
                      <el-rate
                          v-if="item.star"
                          v-model="item.star"
                          disabled
                          text-color="#ff9900"
                          score-template="{value}"
                      >
                      </el-rate>
                      <span v-else>无星级</span>
                    </div>
                    <div class="right">
                      <ul>
                        <li>引用</li>
                        <li v-show="item.whetherTheCollection == true">
                          已收藏
                        </li>
                        <li
                            v-show="item.whetherTheCollection == false"
                            @click="collect(item, index)"
                        >
                          收藏
                        </li>
                        <li>下载</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="fullPage">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="recordsList.total"
              ></el-pagination>
            </div>
          </el-card>
        </div>
      </el-main>
    </div>
  </div>
</template>

<script>
import { weChatList, Title, Collection,geteFloder } from "../api/apis";

export default {
  components: {
  },
  data() {
    return {
      // loading效果
      loading: false,
      // 是否全选
      checkAll: false,
      // 下拉框的展示？
      isOff: false,
      radio: {
        Queryrules: "2",
        QueryfieId: "",
      },
      // 每页的条数
      limit: 10,
      // 输入框的value值
      searchVal: "",
      // 第一次查询保存的值，判断用户是直接搜索还是在结果中搜索
      firstVal: "",
      // 在结果中搜索
      resultVal: "",
      // 排序
      isSort: true,
      // 当前的页码
      currentPage: 1,
      // 内容区域
      recordsList: {},
      // 下拉框是否显示
      isType: false,
      // 左侧列表选中的id
      cateIndex: 1,
      // 分类下拉框的id
      typeIndex: 1,
      // 对那个字段进行排序
      SortfieID: "create_time",
      isIndeterminate: false,
      // 当前所有数据的唯一标识集合
      checkedCities: [],
      multipleSelection: [],
      // 当前选中的数据的集合
      checkedGameId: [],
      // 分类列表
      typeList: [
        {
          type: 1,
          name: "主题",
        },
        {
          type: 2,
          name: "篇关摘",
        },
        {
          type: 3,
          name: "关键词",
        },
        {
          type: 4,
          name: "篇名",
        },
        {
          type: 5,
          name: "全文",
        },
        {
          type: 6,
          name: "作者",
        },
        {
          type: 7,
          name: "第一作者",
        },
        {
          type: 8,
          name: "作者单位",
        },
      ],
      // 左侧尅表数据
      list: [
        {
          name: "国别",
          isOff: true,
          children: [
            {
              name: "中国",
              id: 1,
            },
            {
              name: "美国",
              id: 2,
            },
          ],
        },
        {
          name: "国别",
          isOff: true,
          children: [
            {
              name: "中国",
              id: 3,
            },
            {
              name: "美国",
              id: 4,
            },
          ],
        },
      ],
      // 获取所有的标签
      tagList: [],
      value: 4.6,
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      valueId: 1, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children"
        // disabled:true
      },
      dialogFormVisible:false,
      // 选项列表（必选）
      treeList: [

      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 获取query的search 值
    this.getParams();
    this.getUserFloderList()
  },
  computed: {

    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.treeList)); // 对源数据深度克隆
      return cloneData.filter(father => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(child => father.id == child.parentId); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 获取所有的标签
    this.getTab();
  },
  watch: {
    $route: "getParams",
  },
  methods: {
    collectYes() {
      if(this.valueId == 9999999) {
        return this.$message.error('请添加到全部文件夹下的文件夹')
      }else{
        Collection({
          kgDocId: this.id,
          folerId:this.valueId,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "收藏成功",
            });
            this.dialogFormVisible = false
            this.getDetail()
          } else {
            this.$message({
              type: "info",
              message: data.message,
            });
          }
        });
      }
    },
    // 获取当前用户所有的文件夹
    getUserFloderList () {
      geteFloder({
      }).then((res)=>{
        var { data } = res
        if(data.code == 200 ) {
          for(var i = 0;i<data.result.records.length;i++) {
            data.result.records[i].parentId = 9999999
            data.result.records[i].name = data.result.records[i].folderName
          }
          data.result.records.unshift({
            id:9999999,
            name:'全部文件夹',
            parentId: 0
          })
          this.treeList = data.result.records
        }
      })
    },
    getValue(value) {
      this.valueId = value;
      if(value == 9999999) {
        this.$message({
          type:'info',
          message:'请在全部文件夹下的文件夹中添加收藏'
        })
      }
    },
    // 收藏
    collect(obj, index) {
      this.dialogFormVisible = true
      this.id= obj.id
    },
    // 全选和取消全选
    handleCheckAllChange(val) {
      this.checkedCities = val ? this.checkedGameId : [];
      this.isIndeterminate = false;
    },
    // 单击多选框
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedGameId.length;
      this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checkedGameId.length;
    },

    // 搜索 == 第一次搜索
    search() {
      if (this.searchVal.trim() == "") {
        return this.$message.error("内容不能为空");
      }
      var val = this.searchVal;
      this.firstVal = val;
      this.resultVal = "";
      this.getDetail();
    },
    // 在结果中搜索
    resultSearch() {
      this.resultVal = this.searchVal;
      this.getDetail();
    },
    getParams() {
      // 取到路由带过来的参数
      const routerParams = this.$route.query.search;
      // 将数据放在当前组件的数据内
      this.searchVal = routerParams;
      this.firstVal = routerParams;
      this.getDetail()
    },
    // 获取所有的标签
    getTab() {
      Title().then((res) => {
        if (res.status == 200) {
          var { data } = res;
          this.tagList = data.result;
          this.radio.QueryfieId = data.result[0].value;
          // 根据search值获取文章列表
          this.getDetail();
        }
      });
    },
    // 排序
    sort() {
      this.isSort = !this.isSort;
      this.getDetail();
    },
    // 分页
    handleSizeChange(val) {
      this.limit = val;
      // 把全选按钮重置
      this.checkAll = false;
      this.checkedCities = [];
      this.getDetail();
    },
    handleCurrentChange(val) {
      this.checkAll = false;
      // 把全选按钮重置
      this.currentPage = val;
      this.checkedCities = [];
      this.getDetail();
    },
    // 主题下拉框展示
    toggleTypeShow() {
      this.isType = !this.isType;
    },
    // 主题项的切换
    toggleType(index) {
      this.typeIndex = index;
      this.isType = false;
    },
    // 左侧分类点击事件
    toggleCate(index) {
      this.cateIndex = index;
    },
    // 高级搜索
    goSenior() {
      this.$router.push({
        path: "/senior",
      });
    },
    close(index) {
      this.list[index].isOff = !this.list[index].isOff;
    },
    // 获取文章 == 正序
    getDetail() {
      this.loading = true;
      weChatList({
        pageNo: this.currentPage, //当前页码
        pageSize: this.limit, // 当前每页的条数
        title1: this.firstVal,
        orderingrule: this.isSort ? "1" : "2", //排序规则 1 倒序 2 正序
        title2: this.resultVal,
        sortfieID: this.SortfieID, //排序字段
        queryfieId: this.radio.QueryfieId, // 查询类别 默认为标题查询
        queryrules: this.radio.Queryrules, // 查询规则 1 精确查找 2 模糊查询
      }).then((res) => {
        if (res.status == 200) {
          this.loading = false;
          var { data } = res;
          var result = data.result;
          this.recordsList = result;
          this.checkedGameId = [];
          for (let i = 0; i < this.recordsList.records.length; i++) {
            this.checkedGameId.push(this.recordsList.records[i].id);
            this.multipleSelection = this.checkedGameId;
          }
        }
      });
    },
    // 根据URL打开新窗口或者跳转到对应的文章页面
    goBook(url, id,urls) {
      if (url=='wechat') {
        // window.open(urls);
        this.$router.push({
          path: "hello",
          query: {
            id: id,
            type:'wechat'
          },
        });
      } else {
        this.$router.push({
          path: "hello",
          query: {
            id: id,
          },
        });
      }
    },
  },
};
</script>
<style scoped>
.container {
  width: 1200px;
  margin: 0 auto;
}
.sort-default {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently

not supported by any browser */
}
.el-card__body {
  min-height: calc(100% - 250px) !important;
}
/* @import url(); 引入css类 */
/* 头部开始 */
header {
  height: 60px;
  background-color: #666;
  width: 100%;
}
.box-card {
  width: 100%;
  overflow-y: scroll;
}
header ul {
  display: inline-block;
}
header li {
  display: inline-block;
  height: 60px;
  line-height: 60px;
  margin-right: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 18px;
  color: #ffffff;
}
header .right {
  float: right;
  width: 100px;
  height: 60px;
  line-height: 60px;
}
header .right img {
  display: inline-block;
  line-height: 60px;
  height: 30px;
  width: 30px;
  background-color: red;
  border-radius: 50%;
  vertical-align: middle;
}
/* 头部结束 */
/* 搜索开始 */
.search {
  width: 100%;
  height: 50px;
  margin-top: 20px;
}
.input-box {
  float: left;
  height: 40px;
  margin-bottom: 24px;
  border-radius: 2px;
  background-color: #fff;
  border: 1px solid #000;
}
.btns {
  float: left;
  margin-left: 20px;
  display: inline-block;
}
.sort {
  display: inline-block;
  position: relative;
  z-index: 1;
  float: left;
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  color: #072958;
}

.sort::before {
  position: absolute;
  content: "";
  clear: both;
  width: 1px;
  height: 25px;
  top: 8px;
  right: 0;
  background-color: #ccc;
}
.sort-list {
  background-color: #fff;
}
.sort-list li {
  color: #666;
  cursor: pointer;
  font-size: 14px;
}
.sort-list li.active {
  color: #fff;
  background-color: #6698fd;
}
.search-input {
  outline: none;
  float: left;
  width: 227px;
  height: 20px;
  padding: 10px 0 10px 20px;
  font-size: 14px;
  color: rgb(125, 125, 125);
  line-height: 20px;
  border: none;
  background-color: #fff;
  margin-right: 20px;
}
.search button {
  float: left;
  cursor: pointer;
  height: 40px;
  line-height: 40px;
  padding: 0 25px;
  border: none;
  background-color: #f2f2f2;
  border: 1px solid rgba(121, 121, 121, 1);
  margin-right: 20px;
  outline: none;
}
/* 搜索结束 */
.radio {
  height: 50px;
  line-height: 50px;
  text-align: left;
}
.search_if {
  box-sizing: border-box;
  width: 100%;
  padding: 10px 20px;
  background-color: #fff;
  margin-bottom: 20px;
}
div {
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
.el-main {
  padding: 0 !important;
  overflow: hidden;
  margin-left: 40px;
}
.html {
  background-color: #f2f2f2;
  width: 100%;
}
.banner {
  width: 1200px;
  overflow: hidden;
  margin: 0 auto;
  min-height:400px;
  max-height:600px
}
.content {
  display: flex;
  height: 100%;
}
.banner-left {
  width: 200px;
  background: #fff;
}
.banner-right {
  flex: 1;
  background: #fff;
  height: 100%;
}
/deep/.el-card__body {
  padding: 20px;
  position: relative;
}
.head-box {
  position: absolute;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 99;
}
.box-card {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/deep/.el-card__body {
  height: inherit;
  box-sizing: border-box;
  overflow: hidden;
}
.right_content {
  box-sizing: border-box;
  padding: 0 0 20px 0;
  margin-top: 70px;
  height: inherit;
  overflow: scroll;
  max-height: 400px;
}
.headLine {
  cursor: pointer;
  padding: 5px;
}
.headLine .box {
  padding: 5px 0;
}
.headLine i {
  font-size: 17px;
  vertical-align: middle;
}
.headLine span {
  margin-left: 5px;
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
}

.headLine li {
  cursor: pointer;
  padding-left: 20px;
  height: 30px;
  line-height: 30px;
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}
.headLine li.active {
  color: #25b2ff;
}
.box-card {
  width: 100%;
}
.toolTip ul {
  display: inline-block;
  margin-left: 20px;
}
.toolTip li {
  cursor: pointer;
  display: inline-block;
  margin-right: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
}
.title-box {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #333;
}
.title-box .title {
  font-weight: 900;
}
.title-box .more {
  float: right;
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  font-weight: normal;
  color: #333;
}
.bookList {
  display: flex;
  padding: 20px 0;
}
.book_right {
  flex: 1;
  padding: 0 20px;
  border-bottom: 1px dashed #bcbcbc;
}
.bHead span {
  float: right;
  font-size: 12px;
  font-weight: normal;
}
.bHead .title {
  display: inline-block;
  cursor: pointer;
}
.bContent {
  color: #333;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  line-height: 17px;
  margin-bottom: 10px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.class_item {
  display: inline-block;
  color: #999;
  font-weight: normal;
  font-size: 12px;
  background: #e6e6e6;
  border-radius: 10px;
  padding: 5px 5px;
  margin-right: 5px;
}
.bBottom {
  padding: 5px 0;
  height: 20px;
}
.bBottom .left {
  float: left;
}
.bBottom .left span {
  font-weight: normal;
  font-size: 12px;
}
.bBottom .left img {
  width: 10px;
  height: 10px;
  margin-right: 3px;
}
.bBottom .right {
  float: right;
}
.bBottom .right li {
  display: inline-block;
  margin-right: 10px;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  cursor: pointer;
}
.right_content::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
.right_content::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
.fullPage {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 20px;
  text-align: right;
  background-color: #fff;
}
/deep/.el-checkbox__label {
  display: none;
}
.el-rate {
  display: inline-block;
}
/deep/.el-rate__icon {
  margin-right: 0;
}
</style>