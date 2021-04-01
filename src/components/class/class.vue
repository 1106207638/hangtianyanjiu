<!--  -->
<template>
  <div class="html">
    <div class="container">
      <!-- 搜索区域 -->
      <div class="search">
        <div class="input-box">
          <!--          <div id="DBFieldBox" class="sort reopt">-->
          <!--            <div class="sort-default" @click="toggleTypeShow">-->
          <!--              <span>{{ tagList[typeIndex].name }}</span>-->
          <!--              <i class="sort-icon">▼</i>-->
          <!--            </div>-->
          <!--            <div id="DBFieldList" class="sort-list" v-show="isType">-->
          <!--              <ul>-->
          <!--                <li-->
          <!--                    v-for="(item, index) in tagList"-->
          <!--                    :key="index"-->
          <!--                    @click="toggleType(index)"-->
          <!--                    :class="typeIndex == index ? 'active cur' : 'cur'"-->
          <!--                >-->
          <!--                  {{ item.name }}-->
          <!--                </li>-->
          <!--              </ul>-->
          <!--            </div>-->
          <!--          </div>-->
          <el-select v-model="select" placeholder="请选择">
            <el-option
              v-for="item in tagList"
              :key="item.value"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <input
            id="txt_SearchText"
            name="txt_SearchText"
            type="text"
            autocomplete="off"
            placeholder="中文文献、外文文献"
            @keyup.enter="search"
            value
            v-model="searchVal"
            maxlength="100"
            class="search-input"
            style="color: rgb(125, 125, 125)"
          />
        </div>
        <div class="btns">
          <el-button type="primary" icon="el-icon-search" @click="search"
            >搜索</el-button
          >
          <el-button type="primary" icon="el-icon-tickets" @click="resultSearch"
            >在结果中搜索</el-button
          >
          <el-button type="primary" icon="el-icon-s-operation" @click="goSenior"
            >高级搜索</el-button
          >
        </div>
      </div>
      <!--      <div class="radio">-->
      <!--        <el-radio-->
      <!--            v-for="(item, index) in tagList"-->
      <!--            :key="index"-->
      <!--            v-model="radio.QueryfieId"-->
      <!--            :label="item.value"-->
      <!--        >{{ item.name }}-->
      <!--        </el-radio-->
      <!--        >-->
      <!--        |-->
      <!--        <el-radio v-model="radio.Queryrules" label="1">精确搜索</el-radio>-->
      <!--        <el-radio v-model="radio.Queryrules" label="2">模糊搜索</el-radio>-->
      <!--      </div>-->
      <!-- 搜索条件 -->
      <!--      <div class="search_if">搜索条件</div>-->
    </div>
    <div class="banner">
      <div class="content">
        <!-- 左侧导航栏 -->
        <el-aside width="202px">
          <div class="banner-left">
            <!-- 每一个大分类 -->
            <div
              class="headLine"
              v-for="(item, index) in conditionSearchList"
              :key="index"
            >
              <div @click="close(index)" class="box">
                <div v-if="index == 0">
                  <span>国别</span>
                  <i class="el-icon-arrow-down" v-show="!class0"></i>
                  <i class="el-icon-arrow-up" v-show="class0"></i>
                </div>
                <div v-if="index == 1">
                  <span>分类</span>
                  <i class="el-icon-arrow-down" v-show="!class1"></i>
                  <i class="el-icon-arrow-up" v-show="class1"></i>
                </div>
                <div v-if="index == 2">
                  <span>年代</span>
                  <i class="el-icon-arrow-down" v-show="!class2"></i>
                  <i class="el-icon-arrow-up" v-show="class2"></i>
                </div>
              </div>
              <div
                v-if="index == 0"
                v-show="class0"
                :class="index == activeHover ? 'box-visi isshow' : 'box-visi'"
              >
                <ul
                  @mousemove="itemMousemove(index)"
                  @mouseover="itemMouseover(index)"
                  @mouseout="itemMouseout(index)"
                  :class="index == activeHover ? 'isshow' : ''"
                >
                  <li
                    v-for="(item1, index1) in item"
                    :key="index1"
                    :class="item1.itemValue == nationality ? 'active' : ''"
                    @click="toggleCate(0, item1.itemValue)"
                  >
                    {{ item1.itemText }}
                  </li>
                </ul>
              </div>
              <div
                v-if="index == 1"
                v-show="class1"
                :class="index == activeHover ? 'box-visi isshow' : 'box-visi'"
              >
                <ul
                  @mousemove="itemMousemove(index)"
                  @mouseover="itemMouseover(index)"
                  @mouseout="itemMouseout(index)"
                  :class="index == activeHover ? 'isshow' : ''"
                >
                  <li
                    v-for="(item1, index1) in item"
                    :key="index1"
                    :class="item1.itemValue == infoType ? 'active' : ''"
                    @click="toggleCate(1, item1.itemValue)"
                  >
                    {{ item1.itemText }}
                  </li>
                </ul>
              </div>
              <div
                v-if="index == 2"
                v-show="class2"
                :class="index == activeHover ? 'box-visi isshow' : 'box-visi'"
              >
                <ul
                  @mousemove="itemMousemove(index)"
                  @mouseover="itemMouseover(index)"
                  @mouseout="itemMouseout(index)"
                  :class="index == activeHover ? 'isshow' : ''"
                >
                  <li
                    v-for="(item1, index1) in item"
                    :key="index1"
                    :class="item1.itemValue == publishYear ? 'active' : ''"
                    @click="toggleCate(2, item1.itemValue)"
                  >
                    {{ item1.itemText }}
                  </li>
                </ul>
              </div>
              <!--                  <li-->
              <!--                      v-if="index==1"-->
              <!--                      :class="'' == infoType ? 'active' : ''"-->
              <!--                      @click="toggleCate(1,'')"-->
              <!--                  >全部</li>-->
              <!--                  <li-->
              <!--                      v-if="index==1"-->
              <!--                      v-for="(item1, index1) in item"-->
              <!--                      :key="index1"-->
              <!--                      :class="item1.itemValue == infoType ? 'active' : ''"-->
              <!--                      @click="toggleCate(1,item1.itemValue)"-->
              <!--                  >-->
              <!--                    {{ item1.itemText }}-->
              <!--                  </li>-->
              <!--                  <li-->
              <!--                      v-if="index==2"-->
              <!--                      :class="'' == publishYear ? 'active' : ''"-->
              <!--                      @click="toggleCate(2,'')"-->
              <!--                  >全部</li>-->
              <!--                  <li-->
              <!--                      v-if="index==2"-->
              <!--                      v-for="(item1, index1) in item"-->
              <!--                      :key="index1"-->
              <!--                      :class="item1.itemValue == publishYear ? 'active' : ''"-->
              <!--                      @click="toggleCate(2,item1.itemValue)"-->
              <!--                  >-->
              <!--                    {{ item1.itemText }}-->
              <!--                  </li>-->
              <!--                </ul>-->
              <!--              </div>-->
            </div>
          </div>
        </el-aside>

        <!-- 右侧表格 -->
        <el-main>
          <div class="banner-right">
            <el-card
              class="box-card"
              style="min-height: calc(100%-250px)"
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
                    >全选
                  </el-checkbox>
                  <ul>
                    <li @click="grade">
                      星级排序
                      <i class="el-icon-bottom" v-show="isGrade"></i>
                      <i class="el-icon-top" v-show="!isGrade"></i>
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
                      <div class="title" @click="goBook(item)">
                        {{ item.title }}
                      </div>
                      <span>[{{ item.createTime | dateformat }}]</span>
                    </div>
                    <div class="bContent">{{ item.summary }}</div>
                    <!-- 分类 -->
                    <div class="class">
                      <div class="class_item">{{ item.infoType }}</div>
                    </div>
                    <div class="bBottom">
                      <div class="left">
                        <span>星级：</span>
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
                          <li @click="collect(item, index)">收藏</li>
                          <li
                            v-if="item.source != 'wechat'"
                            @click="upload(item)"
                          >
                            下载
                          </li>
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
                  layout="total, prev, pager, next, jumper"
                  :total="recordsList.total"
                ></el-pagination>
              </div>
            </el-card>
          </div>
        </el-main>
      </div>
    </div>
    <CollDialog
      :switch1="false"
      :type="'collective'"
      :id="collid"
      :title="''"
      :name="''"
      :dialogFormVisible="dialogFormVisible"
      @cancel="ccancel"
      @yesCancel="cyesCancel"
    />
    <Login
      :dialogFormVisible="dialog"
      @cancel="cancel"
      @yesCancel="LoginReload"
    />
  </div>
</template>

<script>
import {
  weChatList,
  Title,
  Collection,
  downloadRecord,
  conditionSearch,
} from "../../api/apis";
import SelectTree from "../../common/dialog/select";
import Login from "../../common/Login/index";
import CollDialog from "../../common/dialog/collectionFolder";

export default {
  components: {
    SelectTree,
    Login,
    CollDialog,
  },
  data() {
    return {
      class0: true,
      class1: false,
      class2: false,
      // 左侧的数据
      conditionSearchList: [],
      activeHover: "none",
      dialog: false,
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
      // 等级
      isGrade: true,
      // 当前的页码
      currentPage: 1,
      // 内容区域
      recordsList: {},
      // 下拉框是否显示
      isType: false,
      // 左侧列表选中的id
      cateIndex: 1,
      // 分类下拉框的id
      typeIndex: 0,
      // 对那个字段进行排序
      SortfieID: "create_time",
      isIndeterminate: false,
      // 当前所有数据的唯一标识集合
      checkedCities: [],
      multipleSelection: [],
      // 当前选中的数据的集合
      checkedGameId: [],
      nationality: "", //国
      publishYear: "", //发布年份
      infoType: "", //情报分类
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
      dialogFormVisible: false,
      // 选项列表（必选）
      treeList: [],
      // 默认的选项
      select: "title",
      select1: "",
      select2: "",
      collid: "",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    // 获取query的search 值
    this.getParams();
    // this.getUserFloderList()
  },
  computed: {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 获取所有的标签
    this.getTab();
    this.getconditionSearch();
  },
  watch: {
    $route: "getParams",
  },
  methods: {
    // 获取高级搜索的条件
    getconditionSearch() {
      conditionSearch().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          var datas = data.result;
          console.log(datas);
          for (var i = 0; i < datas.length; i++) {
            var obj = {
              itemText: "全部",
              itemValue: "",
            };
            datas[i].unshift(obj);
          }
          this.conditionSearchList = datas;
        }
      });
    },
    itemMouseover: function (id) {
      this.activeHover = "none";
    },

    itemMouseout: function (id) {
      this.activeHover = "none";
    },
    itemMousemove: function (id) {
      this.activeHover = id;
    },
    // 文件下载
    upload(obj) {
      if (window.localStorage.getItem("token")) {
        var url = obj.docUrl;
        var name = obj.docUrl.substring(
          obj.docUrl.lastIndexOf("/") + 1,
          obj.docUrl.length
        );
        var id = obj.id;
        //  var frame = $('<iframe style="display: none;" class="multi-download"></iframe>');
        //  frame.attr('src', url);
        // $(document.body).append(frame);
        //  setTimeout(function() {
        //      frame.remove();
        //    }, 1000);
        this.down(url, name, id);
        // var xmlreq = new XMLHttpRequest();
        // xmlreq.open('get', 'http://192.168.1.42:9999/iallchain/personalCenter/downloadFile?fileId='+id,true)
        // xmlreq.responseType = 'blob';
        // xmlreq.setRequestHeader('Content-Type', 'application/json');
        // xmlreq.setRequestHeader("X-Access-Token", window.localStorage.getItem('token'));
        // xmlreq.onload = function(req) {
        //   console.log(req)
        //   var data = req.target.response;
        //   var blob = new Blob([data]);
        //   var a = document.createElement('a');
        //   a.setAttribute("id",'look'+i);
        //   console.log(a)
        //   a = document.getElementById('look'+i)
        //   var blobUrl = window.URL.createObjectURL(blob);
        //   //得到后台传到前台的文件名
        //   // var filename = xmlreq.getResponseHeader("content-disposition");
        //   // if(filename){
        //   // a.download = filename.match(/filename="(\S*)"/)[1];
        //   // }else{
        //   a.download = name
        //   // }
        //
        //   a.href = blobUrl;
        //   a.click();
        //
        // };
        // xmlreq.send()

        // downloadFile({
        //   fileId:this.checkedCities[0]
        // }).then((res)=>{
        //   // window.open('http://192.168.1.42:9999/iallchain/personalCenter/downloadFile?fileId='+this.checkedCities[0])
        //   // var { data } = res
        //   // const filename ='阿里巴巴Java开发手册终极版v1.3.0.pdf'
        //   // let blob = new Blob([res.data],{type: "application/pdf"});
        //   // let a = document.createElement('a');
        //   // a.download = filename;
        //   // a.href = URL.createObjectURL(blob);
        //   // a.click();
        //   // URL.revokeObjectURL(a.href); // 释放URL 对象
        //   //  document.body.removeChild(a);//dom元素找不到，报错 this.$message.success("下载成功")
        //   let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
        //   let downloadElement = document.createElement('a');
        //   let href = window.URL.createObjectURL(blob); //创建下载的链接
        //   let filename = '阿里巴巴Java开发手册终极版v1.3.0.pdf'
        // downloadElement.style.display = 'none';
        // downloadElement.href = href;
        // downloadElement.download = '阿里巴巴Java开发手册终极版v1.3.0.doc' //下载后文件名
        // document.body.appendChild(downloadElement);
        // downloadElement.click(); //点击下载
        // document.body.removeChild(downloadElement); //下载完成移除元素
        // window.URL.revokeObjectURL(href); //释放掉blob对象
        // })
      } else {
        this.showLogin();
      }
    },
    down(url, name, id) {
      var that = this;
      if (url.indexOf("rar") != -1) {
        window.open(url);
      } else {
        var xmlreq = new XMLHttpRequest();
        xmlreq.open("get", url, true);
        xmlreq.responseType = "blob";
        xmlreq.setRequestHeader("Content-Type", "application/json");
        xmlreq.setRequestHeader(
          "X-Access-Token",
          window.localStorage.getItem("token")
        );
        xmlreq.send();

        xmlreq.onreadystatechange = function () {
          // 为了保证 数据 完整返回，我们一般会判断 两个值
          if (xmlreq.readyState == 4 && xmlreq.status == 200) {
            xmlreq.onload = function () {
              var data = xmlreq.response;
              var blob = new Blob([data]);
              var a = document.createElement("a");
              var blobUrl = window.URL.createObjectURL(blob);
              a.download = name;
              that.$message({
                type: "success",
                message: name + "开始下载",
              });
              a.href = blobUrl;
              a.click();
              that.adddownloadRecord(id);
            };
          } else if (xmlreq.status != 200) {
            that.$message({
              type: "success",
              message: name + "下载失败",
            });
          }
        };
        // xmlreq.onload = function (req) {
        //   console.log(req)
        //   var data = req.target.response;
        //   var blob = new Blob([data]);
        //   var a = document.createElement('a');
        //   var blobUrl = window.URL.createObjectURL(blob);
        //   a.download = name
        //   that.$message({
        //     type: 'success',
        //     message: name + '开始下载'
        //   })
        //   a.href = blobUrl;
        //   a.click();
        // };
      }
    },
    // 下载文档记录
    adddownloadRecord(id) {
      downloadRecord({
        id: id,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
        }
      });
    },
    ccancel() {
      this.dialogFormVisible = false;
    },
    cyesCancel() {
      this.dialogFormVisible = false;
    },
    // 登录完成后的操作
    LoginReload() {
      this.dialog = false;
    },
    cancel(val) {
      this.dialog = false;
      this.feedBack = false;
    },

    // 收藏
    collect(obj, index) {
      if (
        window.localStorage.getItem("token") != "" &&
        window.localStorage.getItem("token") != null
      ) {
        this.dialogFormVisible = true;
        this.id = obj.id;
        this.collid = obj.id;
      } else {
        this.$message.info("请登录后再试");
        this.dialog = true;
      }
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
      this.firstVal = val; //第一次搜索
      this.resultVal = "";
      this.select1 = this.select;
      this.select2 = "";
      this.getDetail();
    },
    // 在结果中搜索
    resultSearch() {
      if (this.firstVal == "") {
        this.search();
      } else {
        if (this.resultVal != "") {
          this.select1 = this.select2;
          this.firstVal = this.resultVal;
          this.select2 = this.select;
          this.resultVal = this.searchVal;
          this.getDetail();
        } else {
          this.select2 = this.select;
          this.resultVal = this.searchVal;
          this.getDetail();
        }
      }
    },
    getParams() {
      // 取到路由带过来的参数
      const routerParams = this.$route.query.search;
      // 将数据放在当前组件的数据内
      this.searchVal = routerParams;
      this.firstVal = routerParams;
      this.getDetail();
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
    // 等级排序
    grade() {
      this.isGrade = !this.isGrade;
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
    toggleCate(index, str) {
      if (index == 0) {
        if (str == this.nationality) {
          return;
        } else {
          this.nationality = str;
          var arr = this.conditionSearchList[0];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].itemValue == str) {
              var str = arr.splice(i, 1);
              arr.unshift(str[0]);
            }
          }
          this.conditionSearchList[0] = arr;
          this.getDetail();
        }
      }
      if (index == 1) {
        if (str == this.infoType) {
          return;
        } else {
          this.infoType = str;
          var arr = this.conditionSearchList[1];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].itemValue == str) {
              var str = arr.splice(i, 1);
              arr.unshift(str[0]);
            }
          }
          this.conditionSearchList[1] = arr;
          this.getDetail();
        }
      }
      if (index == 2) {
        if (str == this.publishYear) {
          return;
        } else {
          this.publishYear = str;
          var arr = this.conditionSearchList[2];
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].itemValue == str) {
              var str = arr.splice(i, 1);
              arr.unshift(str[0]);
            }
          }
          this.conditionSearchList[2] = arr;
          this.getDetail();
        }
      }
    },
    // 高级搜索
    goSenior() {
      this.$router.push({
        path: "/senior",
      });
    },
    close(index) {
      if (index == 0) {
        this.class0 = !this.class0;
      } else if (index == 1) {
        this.class1 = !this.class1;
      } else if (index == 2) {
        this.class2 = !this.class2;
      }
    },
    // 获取文章 == 正序
    getDetail() {
      this.loading = true;
      weChatList({
        pageNo: this.currentPage, //当前页码
        pageSize: this.limit, // 当前每页的条数
        title1: this.firstVal,
        orderingrule: this.isSort ? "1" : "2", //排序规则 1 倒序 2 正序
        statorderingrule: this.isGrade ? "1" : "2",
        title2: this.resultVal,
        sortfieID: this.SortfieID, //排序字段
        title1fieId: this.select1, // 查询类别 默认为标题查询
        title2fieId: this.select2,
        queryrules: this.radio.Queryrules, // 查询规则 1 精确查找 2 模糊查询
        publishYear: this.publishYear, // 发布年份
        infoType: this.infoType, //情报分类
        nationality: this.nationality, //国别
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.loading = false;
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
    goBook(item) {
      this.$router.push({
        path: "TrilalXml",
        query: {
          textid: item.id,
          type: item.infoType,
        },
      });
      // if (url == 'wechat') {
      //   // window.open(urls);
      //   this.$router.push({
      //     path: "hello",
      //     query: {
      //       id: id,
      //       type: 'wechat'
      //     },
      //   });
      // } else {
      //   this.$router.push({
      //     path: "hello",
      //     query: {
      //       id: id,
      //     },
      //   });
      // }
    },
  },
};
</script>
<style scoped>
.container {
  padding: 0 30px;
  margin: 0 auto;
}

.sort-default {
  cursor: pointer;
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none;
  /* Non-prefixed version, currently

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
.container {
  padding-top: 20px;
}
.box-card {
  width: 100%;
  min-height: 500px;
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
}

.input-box {
  float: left;
  height: 40px;
  margin-bottom: 24px;
  border-radius: 2px;
  background-color: #fff;
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

/*.search button {*/
/*  float: left;*/
/*  cursor: pointer;*/
/*  height: 40px;*/
/*  line-height: 40px;*/
/*  padding: 0 25px;*/
/*  border: none;*/
/*  background-color: #f2f2f2;*/
/*  border: 1px solid rgba(121, 121, 121, 1);*/
/*  margin-right: 20px;*/
/*  outline: none;*/
/*}*/

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
  background-color: rgba(52, 87, 145, 1);
  width: 100%;
  padding-bottom: 30px;
}

.banner {
  padding: 0 30px;
  min-height: 400px;
}

.content {
  width: 100%;
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

/deep/ .el-card__body {
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

/deep/ .el-card__body {
  height: inherit;
  box-sizing: border-box;
  overflow: hidden;
}

.right_content {
  box-sizing: border-box;
  padding: 0 0 20px 0;
  margin-top: 80px;
  height: inherit;
  overflow: scroll;
}

.headLine {
  cursor: pointer;
  margin-top: 20px;
  border: 1px solid #ebebeb;
  box-shadow: 0 2px 3px 0 rgba(210, 210, 210, 0.75);
}
.headLine:first-child {
  margin-top: 0;
}
.headLine .box {
  height: 38px;
  line-height: 38px;
  font-size: 14px;
  color: #333;
}
.box div {
  display: flex;
}
.box div span {
  flex: 1;
}
.box div i {
  height: 38px;
  line-height: 38px;
  width: auto;
  vertical-align: middle;
  margin-right: 20px;
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
  font-size: 12px;
  color: #333;
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
  border-bottom: 1px solid #999;
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
  padding: 0 0 20px 0;
}

.book_right {
  flex: 1;
  padding: 0 20px;
  padding-bottom: 10px;
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

/deep/ .el-checkbox__label {
  display: none;
}

.el-rate {
  display: inline-block;
}

/deep/ .el-rate__icon {
  margin-right: 0;
}
.el-select {
  float: left;
}
/deep/.container .el-input__inner {
  box-sizing: content-box;
  border: none;
  width: 40px;
  padding: 0 30px;
  text-align: center;
}
/deep/.el-select .el-input__inner:focus {
  border-color: #fff;
}
.el-select-dropdown__item {
  padding: 0 20px;
}
.container .el-select::before {
  content: "";
  clear: both;
  position: absolute;
  width: 1px;
  height: 24px;
  background: rgb(210, 210, 210);
  right: 0px;
  top: 10px;
  z-index: 999;
}
.el-aside {
  height: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  overflow: visible;
  background: #fff;
}
.box-visi {
  position: relative;
  width: 200px;
  height: 60px;
  overflow: hidden;
}
.box-visi.isshow {
  overflow: visible;
}
.headLine .box {
  padding-left: 10px;
  color: #333;
  background-color: #e3ecfd;
}
.headLine ul {
  box-sizing: border-box;
  width: 600px;
  border: 1px solid #ccc;
  border-left: none;
  border-bottom: none;
}
.headLine ul.isshow {
  position: absolute;
  border-bottom: 1px solid #ccc;
  background: #fff;
  width: 602px;
  z-index: 999999;
  border-color: #ccc;
  box-shadow: 2px 2px 5px #cccbcb;
}
.headLine ul li {
  box-sizing: border-box;
  width: 199px;
  display: inline-block;
}
.box-visi ul {
  position: relative;
}
.box-visi ul:before {
  clear: both;
  content: "";
  position: absolute;
  left: 180px;
  top: 30px;
  width: 8px;
  height: 6px;
  padding: 7px 2px;
  margin-top: -10px;
  cursor: default;
  background: url("~@/assets/images/icon-jt (1).png");
  background-repeat: no-repeat;
  background-position: 0 -33px;
}
.box-visi ul.isshow:before {
  clear: both;
  content: "";
  position: absolute;
  left: 580px;
  top: 50%;
  width: 8px;
  height: 6px;
  padding: 7px 2px;
  margin-top: -10px;
  cursor: default;
  background: url("~@/assets/images/icon-jt (1).png");
  background-repeat: no-repeat;
  background-position: -10px -33px;
}
</style>