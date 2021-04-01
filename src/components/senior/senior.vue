<!-- 高级检索 -->
<template>
  <div class="content">
    <div class="search-classify">
      <div class="search-classify-content">
        <!--高级检索 start-->
        <div class="grade-search-content" style="display: flex">
          <div class="search-mainbox is-off" style>
            <div class="search-middle" style="float: left; padding: 20px">
              <el-form ref="form" :model="form" label-width="90px">
                <div
                  style="display: flex; margin-bottom: 10px"
                  v-for="(item, index) in form.criteria"
                  :key="index"
                >
                  <el-select
                    v-model="form.criteria[index].joint"
                    v-if="index != 0"
                    style="width: 140px; margin-right: 10px"
                  >
                    <el-option
                      v-for="(item, index) in conditionList"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <div v-else style="width: 140px; margin-right: 10px"></div>
                  <el-select
                    v-model="form.criteria[index].wechartitle"
                    @change="onchange(index)"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="(item, index) in tagList"
                      :key="index"
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-input
                    v-model="form.criteria[index].titlecontent"
                  ></el-input>
                  <el-select
                    v-model="form.criteria[index].inquirymode"
                    style="width: 140px"
                  >
                    <el-option
                      v-for="(item, index1) in rangeList"
                      :key="index1"
                      :disabled="
                        form.criteria[index].wechartitle == 'title' &&
                        item.name == '精确'
                      "
                      :label="item.name"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                  <el-button
                    icon="el-icon-minus"
                    circle
                    v-if="index != 0"
                    @click="del(index)"
                  ></el-button>
                  <el-button
                    icon="el-icon-minus"
                    circle
                    v-else
                    class="noneBtn"
                  ></el-button>
                  <el-button
                    icon="el-icon-plus"
                    circle
                    @click="add"
                  ></el-button>
                </div>

                <div class="extend">
                  <div class="extend-indent-labels"></div>

                  <div class="extend-row">
                    <!--日历日期 start-->
                    <el-form-item label="时间范围：">
                      <el-col :span="14">
                        <el-date-picker
                          v-model="form.timeRange"
                          type="daterange"
                          @change="change"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd hh:mm:ss"
                        >
                        </el-date-picker>
                      </el-col>
                      <el-col :span="2"></el-col>
                      <el-col :span="5" style="margin-left: 20px">
                        <el-select
                          v-model="form.timeperiod"
                          @change="timeChange"
                          placeholder="更新时间"
                        >
                          <el-option
                            v-for="(item, index) in updateTime"
                            :key="index"
                            :label="item.name"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                    <!--日历日期 end-->
                    <el-form-item label="星级：">
                      <el-select
                        v-model="form.star"
                        style="width: 140px; margin-right: 10px"
                      >
                        <el-option
                          v-for="(item, index) in starList"
                          :key="index"
                          :label="item.name"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </div>

                <div class="search-buttons">
                  <a class="btn-reset" href="javascript:void(0);" @click="reset"
                    >重置条件</a
                  >
                  <input
                    type="button"
                    class="btn-search"
                    value="检索"
                    @click="search"
                  />
                  <a
                    style="display: none"
                    class="btn-result-search is-hide btn-advResult-search"
                    href="javascript:void(0)"
                    >结果中检索</a
                  >
                </div>
              </el-form>
            </div>

            <a href="javascript:void(0)" class="btn-fold is-hidden"></a>
          </div>
          <div class="search-sidebar-b" style="height: 315px">
            <dl class="default-info" style="max-height: 315px">
              <dt class="default-tit">
                <span>高级检索使用方法：</span>
              </dt>
              <dd>
                <p>
                  高级检索支持使用条件（AND,OR,NOT）进行不通检索项内检索词的组合运算，检索框内输入的内容不得超过20个字符。
                </p>
                <p>运算符含义：AND(并且)、OR(或者)、NOT(非)</p>
                <p>
                  使用输入框右侧的+ -
                  按钮进行条件的增加与删除，但是必须保证至少有一个查询条件
                </p>
              </dd>
              <dt class="default-subtit">使用须知：</dt>
              <dd>
                <p class="major-p">
                  标题只能够模糊查询，其他的分类均支持模糊与精确查找
                </p>
                <p class="major-p">
                  （1）标题检索项后输入：美国 ，可以检索到标题为“美国”的文献。
                </p>
                <p class="major-p">
                  （2）如果需检索标题包含“中国”和“航天
                  ”的文献，在标题检索项后输入：'中国'
                  ，点击加号增加条件，然后选择标题选项，检索项输入'航天',
                </p>
              </dd>
            </dl>
            <div class="recommend-info is-hide prototype" style="display: none">
              <i class="icon-triangle" style="top: 89px"></i>
              <h5>
                <span class="reopt-tit"></span>
              </h5>
              <p>相关推荐如下，选择后，可在检索条件中查看</p>
              <h6>
                <span></span>
                <a class="btn-clear-selected" href="javascript:void(0);"
                  >清除</a
                >
              </h6>
              <ul class="recommendList"></ul>
              <div class="btn-morefund" style="display: none">
                <a href="javascript:void(0)">点击加载更多</a>
              </div>
              <div class="search-page" style="display: none">
                <a class="but-l">&lt;</a>
                <b>1</b> /
                <em>10</em>
                <a class="but-r">&gt;</a>
              </div>
            </div>
          </div>
          <div class="clearfix"></div>
        </div>
        <!--高级检索 end-->
      </div>
      <!--search-classify-content-->
    </div>
    <div class="container">
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
                <div></div>
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
                        <li
                          v-else-if="(item.source = 'wechat')"
                          @click="pormpt"
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
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="recordsList.total"
              ></el-pagination>
            </div>
          </el-card>
        </div>
      </el-main>
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
      :isLoad="false"
      @cancel="cancel"
      @yesCancel="LoginReload"
    />
  </div>
</template>

<script>
import SelectTree from "../../common/dialog/select";
import {
  Title,
  getSenior,
  Collection,
  downloadRecord,
  conditionSearch,
} from "../../api/apis";
import Login from "../../common/Login/index";
import $ from "jquery";
import CollDialog from "../../common/dialog/collectionFolder";

export default {
  name: "senior",
  components: {
    SelectTree,
    Login,
    CollDialog,
  },
  computed: {},
  data() {
    return {
      dialog: false,
      collid: "",
      dialogFormVisible: false,
      class1: false,
      class2: false,
      class0: true,
      nationality: "",
      infoType: "",
      publishYear: "",
      value: [],
      form: {
        criteria: [
          {
            wechartitle: "title",
            joint: "",
            inquirymode: "模糊",
            titlecontent: "",
          },
          {
            wechartitle: "title",
            joint: "and",
            inquirymode: "模糊",
            titlecontent: "",
          },
        ],
        name: "",
        region: "上海",
        startdate: "",
        stopdate: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        timeperiod: 0,
        timeRange: [],
        star: "-1",
      },
      organizationData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
                {
                  id: 11,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      isOff: false,
      checkAll: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      count: 1,
      // 下拉框列表
      tagList: [],
      // 条件列表
      conditionList: [
        {
          name: "AND",
          value: "and",
        },
        {
          name: "OR",
          value: "or",
        },
        {
          name: "NOT",
          value: "not",
        },
      ],
      starList: [
        {
          name: "全部",
          value: "-1",
        },
        {
          name: "1星",
          value: "1",
        },
        {
          name: "2星",
          value: "2",
        },
        {
          name: "3星",
          value: "3",
        },
        {
          name: "4星",
          value: "4",
        },
        {
          name: "5星",
          value: "5",
        },
      ],
      // 精确度列表
      rangeList: [
        {
          name: "精确",
          value: "精确",
        },
        {
          name: "模糊",
          value: "模糊",
        },
      ],
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
            {
              name: "日本",
              id: 3,
            },
            {
              name: "法国",
              id: 4,
            },
            {
              name: "俄罗斯",
              id: 5,
            },
            {
              name: "德国",
              id: 6,
            },
            {
              name: "意大利",
              id: 7,
            },
            {
              name: "Japan",
              id: 8,
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
      // 更新时间列表
      updateTime: [
        {
          name: "不限",
          value: 0,
        },
        {
          name: "最近一周",
          value: 1,
        },
        {
          name: "最近一月",
          value: 2,
        },
        {
          name: "最近半年",
          value: 3,
        },
        {
          name: "最近一年",
          value: 4,
        },
        {
          name: "今年迄今",
          value: 5,
        },
        {
          name: "上一年度",
          value: 6,
        },
      ],
      cateIndex: 1,
      loading: false,
      isIndeterminate: false,
      isSort: true,
      searchVal: "",
      recordsList: [],
      currentPage: 1,
      pagesize: 10,
      activeHover: "none",
      conditionSearchList: [],
      isGrade: true,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getSelect();
    this.getconditionSearch();
  },
  methods: {
    pormpt() {
      this.$message.error("文件来源自微信，暂时不支持下载");
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
          this.search();
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
          this.search();
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
          this.search();
        }
      }
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
        this.down(url, name, id);
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
    itemMouseover: function (id) {
      this.activeHover = "none";
    },

    itemMouseout: function (id) {
      this.activeHover = "none";
    },
    itemMousemove: function (id) {
      this.activeHover = id;
    },
    // 登录完成后的操作
    LoginReload() {
      this.dialog = false;
      this.getUserFloderList();
    },
    cancel(val) {
      this.dialog = false;
      this.feedBack = false;
    },
    collectYes() {
      if (this.valueId == 9999999) {
        return this.$message.error("请添加到全部文件夹下的文件夹");
      } else {
        Collection({
          kgDocId: this.id,
          folerId: this.valueId,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "收藏成功",
            });
            this.dialogFormVisible = false;
          } else {
            this.$message({
              type: "info",
              message: data.message,
            });
          }
        });
      }
    },
    // 选择标题是
    onchange(index) {
      if (this.form.criteria[index].wechartitle == "title") {
        this.form.criteria[index].inquirymode = "模糊";
      }
      // console.log(index)
      // console.log(this.form.criteria[index].wechartitle)
    },
    // 去详情页
    goBook(item) {
      this.$router.push({
        path: "TrilalXml",
        query: {
          textid: item.id,
          type: item.infoType,
        },
      });
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
    sort() {
      this.isSort = !this.isSort;
      this.search();
    },
    grade() {
      this.isGrade = !this.isGrade;
      this.search();
    },
    timeChange() {
      this.form.timeRange = [];
    },
    // 获取下拉选择框
    getSelect() {
      Title().then((res) => {
        if (res.status == 200) {
          var { data } = res;
          this.tagList = data.result;
          // 根据search值获取文章列表
        }
      });
    },
    // 重置表单
    reset() {
      this.form = {
        criteria: [
          {
            wechartitle: "title",
            joint: "",
            inquirymode: "模糊",
            titlecontent: "",
          },
          {
            wechartitle: "title",
            joint: "and",
            inquirymode: "模糊",
            titlecontent: "",
          },
        ],
        name: "",
        region: "上海",
        startdate: "",
        stopdate: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        timeperiod: "",
        timeRange: [],
      };
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      // 把全选按钮重置
      this.search();
    },
    handleCurrentChange(val) {
      // 把全选按钮重置
      this.currentPage = val;
      this.search();
    },
    search() {
      if (this.form.timeRange == null) {
        this.form.timeRange = "";
      }
      var list = this.form.criteria;
      var newList = [];
      for (var i = 0; i < list.length; i++) {
        newList.push(list[i]);
      }
      if (newList.length == 0) {
        this.$message.info("请输入关键字");
      } else {
        getSenior({
          pageNo: this.currentPage,
          pageSize: this.pagesize,
          list: newList,
          startdate: this.form.timeRange[0]
            ? this.form.timeRange[0].substring(0, 10)
            : "",
          stopdate: this.form.timeRange[1]
            ? this.form.timeRange[1].substring(0, 10)
            : "",
          timeperiod: this.form.timeperiod,
          star: this.form.star,
          publishYear: this.publishYear, // 发布年份
          infoType: this.infoType, //情报分类
          nationality: this.nationality, //国别
          timeorderingrule: this.isSort ? "1" : "2", //排序规则 1 倒序 2 正序
          statorderingrule: this.isGrade ? "1" : "2",
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            console.log(data);
            var result = data.result;
            this.recordsList = result;
            this.checkedGameId = [];
            for (let i = 0; i < this.recordsList.records.length; i++) {
              this.checkedGameId.push(this.recordsList.records[i].id);
              this.multipleSelection = this.checkedGameId;
            }
          }
        });
      }
    },
    // 搜索条件删除
    del(index) {
      this.form.criteria.splice(index, 1);
    },
    // 搜索条件增加
    add() {
      this.form.criteria.push({
        wechartitle: "title",
        joint: "and",
        inquirymode: "模糊",
        titlecontent: "",
      });
    },
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
    // 关闭左侧分类
    close(index) {
      if (index == 0) {
        this.class0 = !this.class0;
      } else if (index == 1) {
        this.class1 = !this.class1;
      } else if (index == 2) {
        this.class2 = !this.class2;
      }
    },
    change() {
      this.form.timeperiod = "";
    },
    handleCheckAllChange(val) {
      if (this.checkAll) {
        //全选
        this.$refs.organizationData.setCheckedNodes(this.organizationData);
      } else {
        //取消选中
        this.$refs.organizationData.setCheckedNodes([]);
      }
    },
    toggle() {
      this.isOff = !this.isOff;
    },
    handleCheckChange(data, checked, indeterminate) {},
    handleNodeClick(data) {},
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([{ name: "region1" }, { name: "region2" }]);
      }
      if (node.level > 3) return resolve([]);

      var hasChild;
      if (node.data.name === "region1") {
        hasChild = true;
      } else if (node.data.name === "region2") {
        hasChild = false;
      } else {
        hasChild = Math.random() > 0.5;
      }

      setTimeout(() => {
        var data;
        if (hasChild) {
          data = [
            {
              name: "zone" + this.count++,
            },
            {
              name: "zone" + this.count++,
            },
          ];
        } else {
          data = [];
        }

        resolve(data);
      }, 500);
    },
  },
};
</script>
<style scoped>
ul,
dl,
dd {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
/* @import url(); 引入css类 */
.content {
  padding: 20px 30px;
  margin: 0 auto;
  background: rgba(52, 87, 145, 1);
}
.search-classify-content .search-mainbox,
.search-classify-content .search-sidebar-b {
  border: 1px solid #e4e4e4;
  box-shadow: 0 5px 5px #cdcdcd;
  -ms-box-shadow: 0 5px 5px #cdcdcd;
  -moz-box-shadow: 0 5px 5px #cdcdcd;
  -webkit-box-shadow: 0 5px 5px #cdcdcd;
  -o-box-shadow: 0 5px 5px #cdcdcd;
}
.search-classify-content .search-mainbox {
  position: relative;
  width: 80%;
  margin-right: 14px;
  background-color: #fff;
}

.special.disableclick {
  cursor: default;
}
.search-classify-content .sort {
  z-index: 9;
  float: left;
  width: 70px;
  height: 28px;
  font-size: 14px;
  text-align: center;
  border: 1px solid #cdd4dc;
}
/deep/.noneBtn {
  opacity: 0;
}
.search-classify {
  clear: both;
  width: 100%;
  padding-bottom: 21px;
}
.search-classify-menu {
  margin-right: 0;
}
.search-classify-menu {
  float: right;
  height: 43px;
  margin-top: -24px;
  margin-right: 294px;
}
.search-classify-menu .link {
  width: 278px;
  padding: 0;
  margin-left: 16px;
  text-align: right;
}
.search-classify-menu li {
  float: right;
  height: 43px;
  padding: 0 20px;
  font-size: 15px;
  line-height: 43px;
  color: #2b2b2b;
  cursor: pointer;
}
.search-classify-menu .link a {
  display: inline-block;
  height: 14px;
  font-size: 12px;
  line-height: 14px;
  color: #0e55b5;
}
input:not([type="image"]),
textarea {
  box-sizing: content-box;
}
.search-classify-content {
}
.is-off .search-sidebar-a {
  width: 47px;
  height: 130px;
  border-right: none;
}
.search-sidebar-a {
  position: relative;
  float: left;
  width: 189px;
  height: 100%;
  border-right: 1px solid #e6e6e6;
  margin-left: -1px;
}
.is-off .search-sidebar-a .icon-arrow {
  top: 19px;
  width: 21px;
  height: 70px;
  padding-left: 6px;
  font-size: 14px;
  line-height: 17px;
  color: #fff;
}
.search-back i {
  top: 7px;
  right: 0;
  background-position: -62px -130px;
}
.search-back i {
  position: absolute;
  z-index: 6;
  width: 11px;
  height: 22px;
  cursor: pointer;
  background-image: url("~@/assets/images/icon-btns.png");
  background-repeat: no-repeat;
}
.search-sidebar-a i {
  right: -8px;
  top: 41px;
  background-position: -73px -130px;
}
.search-sidebar-a i {
  position: absolute;
  z-index: 6;
  width: 11px;
  height: 22px;
  cursor: pointer;
  background-image: url("~@/assets/images/icon-btns.png");
  background-repeat: no-repeat;
}
a {
  text-decoration: none;
  color: #666;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}
.is-off {
  display: flex;
}
.is-off .search-middle {
  flex: 1;
  padding: 25px 0 30px;
}
input[type="text"],
input[type="password"],
button {
  border: none;
  outline: none;
  -webkit-appearance: none;
}
.search-back {
  position: relative;
  width: 20%;
  border-right: 1px solid #ccc;
}
.search-back p {
  text-align: center;
}
.search-back .operation {
  padding: 0 25px;
}
.search-back .operation span {
  margin-left: 5px;
  color: #666;
  cursor: pointer;
}
.extend-indent-labels {
  margin-top: 25px;
  margin-left: 80px;
}
.extend-row {
  min-height: 30px;
  margin-top: 20px;
}
.search-mainbox .search-buttons {
  margin-top: 20px;
  padding-top: 20px;
  line-height: 32px;
  text-align: center;
  border-top: 1px solid #cdd4dc;
}
.search-mainbox .search-buttons .btn-reset {
  margin-right: 35px;
  color: #3f424a;
  font-size: 14px;
}
.search-mainbox .btn-search {
  width: 161px;
  height: 34px;
  padding-left: 6px;
  font-size: 15px;
  color: #fff;
  font-weight: bold;
  letter-spacing: 6px;
  cursor: pointer;
  border-radius: 2px;
  outline: none;
  border: none;
  background-color: #fd7010;
}
.search-sidebar-b {
  position: relative;
  float: left;
  flex: 1;
  padding: 14px;
  background-color: #fff;
}
.search-sidebar-b .default-info {
  overflow-y: auto;
}
.search-sidebar-b .default-tit {
  padding-bottom: 10px;
  font-size: 15px;
  color: #000;
  font-weight: normal;
  border-bottom: 1px solid #cdd4dc;
}
.search-sidebar-b .default-info span {
  color: #000;
}
.search-sidebar-b .default-tit a {
  float: right;
  margin-right: 10px;
  color: #0e55b5;
}
.search-sidebar-b .default-info dd {
  margin: 9px 0;
  font-size: 12px;
  color: #888;
  line-height: 24px;
}
div {
  font: 12px/150% Arial, "Microsoft YaHei", "宋体", serif;
}
.default-info::-webkit-scrollbar,
.recommend-fund-list::-webkit-scrollbar,
.recommend-info-list::-webkit-scrollbar,
.nav-content-list::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
.default-info::-webkit-scrollbar-thumb,
.recommend-fund-list::-webkit-scrollbar-thumb,
.recommend-info-list::-webkit-scrollbar-thumb,
.nav-content-list::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
.search-sidebar-a .icon-arrow {
  position: absolute;
  padding: 16px 0;
  border-radius: 0 4px 4px 0;
  background-color: #b4d3ec;
}
.search-middle .reopt .icon-sort {
  display: inline-block;
  vertical-align: middle;
  width: 6px;
  height: 3px;
  background: url("~@/assets/images/icon-jt (1).png") no-repeat 0 -130px;
}
/* 清楚浮动 */
.clearfix:after {
  /*伪元素是行内元素 正常浏览器清除浮动方法*/
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.clearfix {
  *zoom: 1; /*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
}
.container {
  display: flex;
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
.headLine .box {
  height: 38px;
  line-height: 38px;
  font-size: 14px;
  color: #333;
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
  line-height: 38px;
}
.right_content {
  box-sizing: border-box;
  padding: 0 0 80px 0;
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
  font-weight: bold;
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
.el-rate {
  display: inline-block;
}
[class*=" el-icon-"],
[class^="el-icon-"] {
  line-height: 1.5;
}
.el-aside {
  box-sizing: border-box;
  border: 1px solid #ccc;
  overflow: visible;
  background: #fff;
  height: 100%;
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
  z-index: 999;
}
.headLine ul li {
  box-sizing: border-box;
  width: 199px;
  display: inline-block;
}
.el-main {
  padding: 0 0 0 20px;
  overflow: hidden;
}
.headLine .box {
  padding: 0;
  padding-left: 10px;
  color: #333;
  line-height: 38px;
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