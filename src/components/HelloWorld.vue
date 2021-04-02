<template>
  <div class="hello">
    <div class="headers">
      <div>
        <el-button size="small" icon="el-icon-arrow-left" @click="goback"
          >返回</el-button
        >
      </div>
      <span>{{ wechar.title }}</span>
      <div>
        <el-button
          type="success"
          icon="el-icon-star-off"
          title="收藏"
          @click="collect"
          circle
          v-show="!star"
        ></el-button>
        <el-button
          type="danger"
          icon="el-icon-star-off"
          circle
          title="取消收藏"
          @click="cancelC"
          v-show="star"
        ></el-button>
      </div>
    </div>
    <div class="main_container">
      <div
        class="left"
        id="left"
        v-if="type"
        style="height: 100%; overflow: scroll"
      >
        <div
          class="left_catalog"
          style="width: 100%"
          v-html="catalogList"
        ></div>
      </div>
      <div style="height: 100%; overflow: scroll" id="left_content">
        <!-- docx -->
        <div v-if="type">
          <div v-html="html" ref="html"></div>
        </div>
        <div v-if="!type" style="max-width: 677px; margin: 0 auto">
          <h2
            class="title"
            style="
              font-size: 22px;
              line-height: 1.4;
              margin-bottom: 14px;
              font-weight: 400;
            "
          >
            {{ wechar.title }}
          </h2>
          <div>
            <span
              style="
                color: rgba(0, 0, 0, 0.3);
                margin: 0 10px 10px 0;
                font-size: 15px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              "
              >{{ wechar.author }}</span
            >
            <span
              style="margin: 0 10px 10px 0; font-size: 15px; color: #576b95"
            >
              来源： {{ kgInformationFile.data.result.publisher }} ;
              {{ kgInformationFile.data.result.createTime }}
            </span>
            <span
              style="
                color: rgba(0, 0, 0, 0.3);
                margin: 0 10px 10px 0;
                font-size: 15px;
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
              "
              >{{ wechar.date | dateformat("YYYY年MM月DD日") }}</span
            >
            <div v-html="html" ref="htmls" id="contents"></div>
          </div>

          <!-- <iframe src="http://192.168.1.222:8080/conversion/wordToHtml/1301710369047318501" id="test_iframe" frameborder="0" width="100%" height="100%"></iframe> -->
        </div>
        <div class="add" :style="posi" v-show="isAdd">
          <button @click="enableNiteWriterPen()">笔记</button>
        </div>
      </div>
      <!-- 右侧列表 -->
      <div class="right" id="right">
        <div class="footer">
          <h2>书签列表</h2>
        </div>
        <span class="none" v-if="pointList.length == 0">请添加书签</span>
        <ul>
          <li
            :class="name == item.bookmarkId ? 'active' : ''"
            v-for="(item, index) in pointList"
            :key="index"
            @click="go(item.bookmarkId)"
          >
            <div class="head">
              <span class="date">{{
                item.createTime | dateformat("YYYY-MM-DD HH:mm:ss")
              }}</span>
              <i
                class="el-icon-delete"
                @click.stop="del(item.id, index, item)"
                style="color: rgb(254, 108, 111)"
              ></i>
              <i
                class="el-icon-edit"
                @click.stop="
                  open(item.id, index, item.bookmarkName, item.kgLabels, item)
                "
                style="color: #3594ff"
              ></i>
            </div>
            <p class="content threedian">
              <i class="el-icon-reading"></i><span class="lable">原文：</span>
              {{ item.bookmarkValue }}
            </p>
            <p class="content note">
              <i class="el-icon-edit-outline"></i
              ><span class="lable">笔记：</span>
              {{ item.bookmarkName }}
            </p>
            <p class="content note tag">
              <i class="el-icon-collection-tag"></i
              ><span class="lable">标签：</span>
              <span class="tag_box">
                <el-tag v-for="(item1, index) in item.kgLabels" :key="index">{{
                  item1.labelName
                }}</el-tag>
              </span>
            </p>
          </li>
        </ul>
      </div>
    </div>

    <div
      v-show="show"
      style="
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        top: 0;
        left: 0;
      "
      class="dioge"
    >
      <div class="ask">
        <p>编辑</p>
        <el-input
          v-model="lableName"
          style="margin-bottom: 20px"
          placeholder="请输入笔记"
        >
        </el-input>
        <el-form label-position="top" label-width="80px" v-if="addTitle">
          <el-form-item>
            <el-select
              v-model="value1"
              filterable
              multiple
              placeholder="请选择标签"
            >
              <el-option
                v-for="item in titleList"
                :key="item.id"
                :label="item.labelName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button
            class="addFlag"
            type="primary"
            @click="toggleAdd"
            icon="el-icon-plus"
            >添加</el-button
          >
        </el-form>
        <el-form label-position="top" label-width="80px" v-if="!addTitle">
          <el-form-item style="margin-bottom: 32px">
            <el-input v-model="value" placeholder="请输入要增加的标签">
            </el-input>
          </el-form-item>
          <el-button class="addFlag" type="primary" @click="addFLag"
            >确定</el-button
          >
          <el-button class="addFlag" type="primary" @click="toggleAdd"
            >取消</el-button
          >
        </el-form>
        <!-- <input type="text" v-model="text" placeholder="请输入标签" /> -->
        <div class="dialog-footer">
          <el-button type="primary" @click="yes" v-if="!editOpen"
            >确 定</el-button
          >
          <el-button type="primary" @click="editYes" v-else>确 定</el-button>
          <el-button @click="cancel">取 消</el-button>
        </div>
      </div>
    </div>
    <!-- 收藏文件 -->
    <el-dialog title="选择收藏夹" :visible.sync="dialogFormVisible">
      <SelectTree
        :props="props"
        :options="optionData"
        :value="valueId"
        :clearable="isClearable"
        :accordion="isAccordion"
        @getValue="getValue($event)"
      />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="collectYes">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Range from "../assets/js/Range";
import SelectTree from "../common/dialog/select";
import tree from "./ewTree";
import { getAccessToDirectory, getWordToHtml } from "../api/api";
import $ from "jquery";

import {
  AddNote,
  GetlistUrl,
  editNote,
  delNote,
  Collection,
  cancelCollection,
  Getflag,
  ADDflag,
  geteFloder,
} from "../api/apis";

export default {
  name: "HelloWorld",
  components: {
    tree,
    SelectTree,
  },
  data() {
    return {
      kgInformationFile: {},
      // 当前书籍的id
      id: 0,
      pointList: [],
      text: "",
      show: false,
      range: {},
      // 目录列表
      catalogList: [],
      html: "",
      posi: {
        left: "",
        top: "",
      },
      form: {
        text: "",
      },
      isAdd: false,
      scrollTop: 0,
      seleText: "",
      oldName: "",
      name: "",
      star: false,
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: [],
      addTitle: true,
      titleList: [],
      // 标签名称
      lableName: "",
      value: "",
      // 编辑开关，可对是否进行编辑做判断
      editOpen: false,
      editObj: {
        id: 0,
        index: 0,
      },
      type: true,
      // 微信数据数据是否有标签
      isSentend: true,
      htmls: "",
      wechar: {
        title: "",
        author: "",
        date: "",
      },
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                },
              ],
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                },
              ],
            },
          ],
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                },
              ],
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      isClearable: true, // 可清空（可选）
      isAccordion: false, // 可收起（可选）
      valueId: 1, // 初始ID（可选）
      props: {
        // 配置项（必选）
        value: "id",
        label: "name",
        children: "children",
        // disabled:true
      },
      place: "请选择笔记文件夹",
      dialogFormVisible: false,
      // 选项列表（必选）
      list: [],
      list1: [],
      valueId1: 0, // 可收起（可选）
    };
  },
  filters: {
    data_substring: function (value) {
      if (!value) return "";
      value = value.split("：")[0];
      return value;
    },
  },
  watch: {
    html: {
      handler: function (val, oldval) {
        if (
          val != null &&
          val != "" &&
          val != undefined &&
          val != "undefined"
        ) {
          this.$nextTick(() => {
            var aList = document.querySelectorAll("#left_content a");
            for (var i = 0; i < aList.length; i++) {
              // console.log(aList[i]);
              var href = aList[i].getAttribute("href");
              aList[i].setAttribute("href", "javascript:void();");
              aList[i].setAttribute("data-src", href);
            }
            for (var i = 0; i < aList.length; i++) {
              aList[i].onclick = function (e) {
                if (e.target.nodeName == "A") {
                  var str = e.target.getAttribute("data-src");
                  var str = str.substring(1, str.length);
                  document.querySelector(`a[name=${str}]`).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                } else {
                  if (e.target.parentElement.nodeName == "A") {
                    var str = e.target.parentElement.getAttribute("data-src");
                    var str = str.substring(1, str.length);
                    document.querySelector(`a[name=${str}]`).scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  } else if (
                    e.target.parentElement.parentElement.nodeName == "A"
                  ) {
                    var str = e.target.parentElement.parentElement.getAttribute(
                      "data-src"
                    );
                    var str = str.substring(1, str.length);
                    document.querySelector(`a[name=${str}]`).scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  } else if (
                    e.target.parentElement.parentElement.parentElement
                      .nodeName == "A"
                  ) {
                    var str = e.target.parentElement.parentElement.parentElement.getAttribute(
                      "data-src"
                    );
                    var str = str.substring(1, str.length);
                    document.querySelector(`a[name=${str}]`).scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  }
                }
              };
            }
          });
        }
      },
      deep: true, //对象内部的属性监听，也叫深度监听
    },

    catalogList: {
      handler: function (val, oldval) {
        console.log(val);
        if (
          val != null &&
          val != "" &&
          val != undefined &&
          val != "undefined"
        ) {
          this.$nextTick(() => {
            var aList = document.querySelectorAll("a");
            for (var i = 0; i < aList.length; i++) {
              var href = aList[i].getAttribute("href");
              aList[i].setAttribute("href", "javascript:void();");
              aList[i].setAttribute("data-src", href);
            }
            for (var i = 0; i < aList.length; i++) {
              aList[i].onclick = function (e) {
                if (e.target.nodeName == "A") {
                  var str = e.target.getAttribute("data-src");
                  //锚点
                  var str = str.substring(1, str.length);
                  console.log(str.substring(1, str.length));
                  document.querySelector(`a[name=${str}]`).scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                    inline: "nearest",
                  });
                } else {
                  if (e.target.parentElement.nodeName == "A") {
                    var str = e.target.parentElement.getAttribute("data-src");
                    var str = str.substring(1, str.length);
                    document.querySelector(`a[name=${str}]`).scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  } else {
                    var str = e.target.parentElement.parentElement.getAttribute(
                      "data-src"
                    );
                    var str = str.substring(1, str.length);
                    document.querySelector(`a[name=${str}]`).scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  }
                }
              };
            }
          });
        }
      },
      deep: true, //对象内部的属性监听，也叫深度监听
    },
  },
  created() {},
  computed: {
    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.list)); // 对源数据深度克隆
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          (child) => father.id == child.parentId
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    },
    optionData1() {
      let cloneData = JSON.parse(JSON.stringify(this.list1)); // 对源数据深度克隆
      // console.log(cloneData);
      return cloneData.filter((father) => {
        // 循环所有项，并添加children属性
        let branchArr = cloneData.filter(
          (child) => father.id == child.parentId
        ); // 返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //给父级添加一个children属性，并赋值
        return father.parentId == 0; //返回第一层
      });
    },
  },
  mounted() {
    this.getUserFloderList();
    this.getHign();
    var that = this;
    this.getNote();
    this.getUserFlag();
    // 获取笔记文件夹
    // 获取选中的文本的位置信息并显示操作面板
    document.getElementById("left_content").onmouseup = function (e) {
      var objss = window.getSelection();
      var elements = objss.anchorNode.parentElement.localName;
      console.log(elements);

      var content = window.getSelection().toString();
      var clientX = e.screenX;
      var clientY = e.screenY;
      that.isAdd = false;
      if (elements === "h2") {
        alert("标题不能记笔记");
      } else {
        if (content.trim() != "") {
          var range = window.getSelection().getRangeAt(0);
          // console.log(range);
          //  当前选中的文本的坐标信息
          var rect = range.getBoundingClientRect();
          //  中间区域的坐标信息
          var center = document
            .getElementById("left_content")
            .getBoundingClientRect();
          that.isAdd = true;
          that.posi = {
            top: rect.top + that.scrollTop - 100 + "px",
            left: rect.left - center.left + rect.width / 2 - 30 + "px",
          };
        }
      }
    };
    document.getElementById("left_content").onscroll = function (e) {
      that.scrollTop = document.getElementById("left_content").scrollTop || 0;
    };
    // 监听鼠标点击右侧的区域，并把操作面板隐藏
    document.getElementById("right").addEventListener("click", function () {
      that.isAdd = false;
    });
    // 监听鼠标点击左侧的区域，并把操作面板隐藏
    document.getElementById("left").addEventListener("click", function () {
      that.isAdd = false;
    });
    document.addEventListener("click", (e) => {
      if (that.name == "" || that.name == undefined) {
      } else {
        // console.log(that.name);
        var eles = document.querySelectorAll(`a[point=${that.name}]`);
        for (var i = 0; i < eles.length; i++) {
          eles[i].style.background = "none";
        }
      }
    });
  },
  methods: {
    add() {
      console.log(this.kgInformationFile.data.result);
    },
    // 选择笔记文件夹
    getValue1(value) {
      this.valueId1 = value;
      if (value == 9999999) {
        this.$message({
          type: "info",
          message: "请在全部文件夹下的文件夹中添加笔记",
        });
      }
    },
    // 获取当前用户所有的收藏文件夹
    getUserFloderList() {
      geteFloder({}).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          for (var i = 0; i < data.result.records.length; i++) {
            data.result.records[i].parentId = 9999999;
            data.result.records[i].name = data.result.records[i].folderName;
          }
          data.result.records.unshift({
            id: 9999999,
            name: "全部文件夹",
            parentId: 0,
          });
          this.list = data.result.records;
          this.valueId = data.result.records[1].id;
        }
      });
    },
    getValue(value) {
      this.valueId = value;
      if (value == 9999999) {
        this.$message({
          type: "info",
          message: "请在全部文件夹下的文件夹中添加收藏",
        });
      }
    },
    handleNodeClick(data) {},
    addFLag() {
      if (this.value == "") {
        this.$message({
          type: "info",
          message: "请输入要增加的标签",
        });
      } else {
        ADDflag({
          labelName: this.value,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
            this.value = "";
            this.getUserFlag();
            this.addTitle = !this.addTitle;
          } else {
            this.$message({
              type: "error",
              message: data.message,
            });
          }
        });
      }
    },
    // 获取当前用户的标签
    getUserFlag() {
      Getflag({}).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.titleList = data.result;
        }
      });
    },
    toggleAdd() {
      this.addTitle = !this.addTitle;
      this.value = "";
      this.getUserFlag();
    },
    // 取消收藏
    cancelC() {
      cancelCollection({
        bookCollecTionId: this.id,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: "取消收藏成功",
          });
          this.star = !this.star;
        }
      });
    },
    // 收藏确认
    collectYes() {
      if (this.valueId == 9999999) {
        return this.$message.error("请添加到全部文件夹下的文件夹");
      } else {
        Collection({
          kgDocId: this.id,
          folderId: this.valueId,
        }).then((res) => {
          var { data } = res;
          // console.log(data);
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "收藏成功",
            });
            this.dialogFormVisible = false;
            this.star = !this.star;
          } else {
            this.$message({
              type: "info",
              message: data.message,
            });
          }
        });
      }
    },
    // 收藏
    collect() {
      this.dialogFormVisible = true;
    },
    // 删除笔记
    del(id, index, item) {
      this.$confirm("此操作将永久删除该笔记, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          var id = item.bookmarkId;
          var html = document.querySelectorAll(`a[point=${id}]`);
          for (var i = 0; i < html.length; i++) {
            var text = html[i].innerHTML;
            var parent = html[i].parentElement;
            var child = $(parent)[0].childNodes;
            var str = "";
            for (var j = 0; j < child.length; j++) {
              if (child[j].nodeName == "A") {
                str += child[j].innerHTML;
              } else if (child[j].nodeName == "#text") {
                str += child[j].data;
              } else {
                str += child[j].innerHTML;
              }
            }
            parent.innerHTML = str;
          }
          delNote({
            id: item.id,
            fileid: item.textid,
            textContentKey: document.getElementById("left_content").innerHTML,
          }).then((res) => {
            var { data } = res;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.pointList.splice(index, 1);
              this.star = !this.star;
            } else {
              this.$message({
                type: "info",
                message: "网络错误，请稍后再试!",
              });
            }
          });
        })
        .catch(() => {});
    },
    // 修改笔记标题
    open(id, index, name, lableList, item) {
      this.editOpen = true;
      this.show = true;
      this.lableName = name;
      this.value1 = [];
      this.editObj.id = id;
      this.editObj.index = index;
      if (lableList.length == 0) {
      } else {
        this.value1 = [];
        for (var i = 0; i < lableList.length; i++) {
          this.value1.push(lableList[i].id);
        }
      }
    },
    // 获取我的笔记id
    getHign() {
      this.name = this.$route.query.name;
      this.id = this.$route.query.id;
      // console.log(this.$route.query.type);
      if (this.$route.query.type == undefined) {
        this.type = true;
      } else if (this.$route.query.type == "wechat") {
        this.type = false;
      } else {
        this.type = true;
      }
    },
    goLeft(url) {
      var str = url.substring(1, url.length);
      // console.log(str);
      document.querySelector(`a[name=${str}]`).scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    },
    // 瞄点跳转
    go(url) {
      var that = this;
      this.name = url;
      var oldName = that.oldName;
      if (oldName == "") {
      } else {
        var eles = document.querySelectorAll(`a[point=${oldName}]`);
        for (var i = 0; i < eles.length; i++) {
          eles[i].style.background = "none";
        }
        // document.querySelector(`a[name=${oldName}]`).style.background = "#fff";
        // document.querySelector(`a[name=${oldName}]`).style.padding = "0px 0";
      }
      that.oldName = url;
      setTimeout(function () {
        //         behavior	[可选]定义过渡动画。 "auto","instant"或"smooth"。默认为"auto"。
        // block	[可选] "start"，"center"，"end"或"nearest"。默认为"center"。
        // inline	[可选] "start"，"center"，"end"或"nearest"。默认为"nearest"。

        document.querySelector(`a[point=${url}]`).scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
        var eles = document.querySelectorAll(`a[point=${url}]`);
        for (var i = 0; i < eles.length; i++) {
          eles[i].style.background = "rgb(153,205,255)";
        }
        // document.querySelector(`a[name=${url}]`).style.background =
        //   "rgb(153,205,255)";
        // document.querySelector(`a[name=${url}]`).style.padding = "5px 0";
      }, 200);
    },
    // 获取html
    getHtml() {
      getWordToHtml().then((res) => {
        this.html = res.data;
        var name = this.name;
        if (name == "" || name == undefined) {
        } else {
          setTimeout(function () {
            document.querySelector(`a[point=${name}]`).scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });
            var eles = document.querySelectorAll(`a[point=${name}]`);
            for (var i = 0; i < eles.length; i++) {
              eles[i].style.background = "rgb(153,205,255)";
            }
            // document.querySelector(`a[name=${name}]`).style.background =
            //   "rgb(153,205,255)";
            // document.querySelector(`a[name=${name}]`).style.padding = "5px 0";
          }, 200);
        }
      });
    },
    // 编辑确认修改
    editYes() {
      this.show = !this.show;
      if ((this.show = true)) {
        if (this.lableName == "") {
          this.$message({
            type: "info",
            message: "请输入标题!",
          });
        } else if (this.value1.length == 0) {
          this.$message({
            type: "info",
            message: "请选择标签!",
          });
        } else {
          var kgLabels = [];
          // console.log(this.value1);
          for (var i = 0; i < this.value1.length; i++) {
            kgLabels.push({ labelId: this.value1[i] });
          }
          var arr = [];
          for (var i = 0; i < this.titleList.length; i++) {
            for (var j = 0; j < this.value1.length; j++) {
              if (this.value1[j] == this.titleList[i].id) {
                arr.push(this.titleList[i]);
              }
            }
          }
          editNote({
            id: this.editObj.id,
            bookmarkName: this.lableName,
            kgLabels: arr,
          }).then((res) => {
            // console.log(res);
            var { data } = res;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "书签修改成功",
              });
              // this.pointList[this.editObj.index].bookmarkName = this.lableName;
              // this.pointList[this.editObj.index].kgLabels = this.lableName;
              this.show = false;
              this.lableName = "";
              this.value1 = [];
              this.editOpen = false;
              this.getNote();
            } else {
              this.$message({
                type: "error",
                message: "网络错误，操作失败",
              });
            }
          });
        }
      }
    },
    // 点击确认取消
    yes() {
      // var flag = new RegExp(
      //   "[`~!@#$^&*()=|{}':;'\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]"
      // );
      this.show = !this.show;
      if ((this.show = true)) {
        if (this.lableName == "") {
          this.$message({
            type: "info",
            message: "请输入标题!",
          });
        } else if (this.value1.length == 0) {
          this.$message({
            type: "info",
            message: "请选择标签!",
          });
        } else {
          var timestamp = "a" + Date.parse(new Date());
          this.range.applyInlineStyle("a", {
            point: timestamp,
          });
          this.seleText = this.seleText.substring(0, this.seleText.length / 2);
          // console.log(this.seleText);
          this.range.select();
          var dataList = this.value1;
          var kgLabel = [];
          for (var i = 0; i < dataList.length; i++) {
            var obj = {
              id: dataList[i],
            };
            kgLabel.push(obj);
          }
          if (this.type == false) {
            var html = this.$refs.htmls.innerHTML;
          } else {
            var html = this.$refs.html.innerHTML;
          }
          var data = {
            textid: this.id, //文件id
            kgLabels: kgLabel, // 标签名字
            filetitle: this.wechar.title,
            bookmarkName: this.lableName,
            bookmarkValue: this.seleText, // 标签内容
            textContentKey: html, //html
            bookmarkId: timestamp, // 标签id对应相应的html
            datasource: this.type ? "html" : "wechat",
          };
          var parm = JSON.stringify(data);
          AddNote(parm).then((res) => {
            var { data } = res;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "添加成功!",
              });
              var date = new Date();
              var time = date.getTime();
              this.getNote();
              this.show = false;
              this.text = "";
              this.value1 = [];
              this.lableName = "";
            } else {
              this.$message({
                type: "info",
                message: data.message,
              });
              this.show = false;
              this.text = "";
            }
          });
        }
      }
    },
    getNote() {
      var that = this;
      GetlistUrl({
        textid: this.id,
      }).then((res) => {
        this.kgInformationFile = res;

        var { data } = res;
        if (data.code == 200) {
          // 有笔记的情况下
          if (data.result.kgSaveTheBookmarks) {
            // 笔记列表
            this.pointList = data.result.kgSaveTheBookmarks;
            this.html = data.result.contents;
            if (this.type == true) {
              if (data.result.cententCatalog != "") {
                this.catalogList = data.result.cententCatalog;
              } else {
                this.catalogList = "";
              }
            } else {
              this.isSentend = false;
            }
          } else if (this.type == false) {
            this.html = data.result.contents;
          } else {
            this.html = data.result.contents;
            this.catalogList = data.result.cententCatalog;
          }
          this.wechar.title = data.result.title;
          // this.wechar.author = data.result.author;
          // this.wechar.date = data.result.dataDate;
          var name = this.name;
          // this.html = data.result.textcontent;
          // 文章是否被收藏

          setTimeout(function () {
            // var imgs = document
            //   .getElementById("left_content")
            //   .querySelectorAll("img");
            // for (var i = 0; i < imgs.length; i++) {
            //   var strArr = imgs[i].getAttribute("data-src")
            //   imgs[i].setAttribute(
            //     "src", strArr);
            // }

            if (name != undefined) {
              document.querySelector(`a[point=${name}]`).scrollIntoView({
                behavior: "smooth",
                block: "start",
                inline: "nearest",
              });
              var eles = document.querySelectorAll(`a[point=${name}]`);
              for (var i = 0; i < eles.length; i++) {
                eles[i].style.background = "rgb(153,205,255)";
              }
            }
          }, 200);
        }
      });
    },

    cancel() {
      this.show = false;
      this.text = "";
    },
    // 获取目录

    /**
     * 添加下划线
     */
    addUnderline() {
      this.replaceSelectedStrByEle("aaaa");
    },

    /**
     * 启用荧光笔
     */
    enableNiteWriterPen() {
      this.isAdd = false;
      this.addTitle = true;
      this.value = "";

      // var word =document.getElementById("test_iframe").contentWindow.getSelection();
      // alert( word )
      this.replaceSelectedStrByEle("bbbbbb");
    },

    /**
     * 用元素替换被选中的文本
     */
    replaceSelectedStrByEle(className) {
      this.value1 = [];
      this.lableName = "";
      var getRange = () => {
        var me = window;
        var range = new Range(me.document);
        var sel = window.getSelection();
        if (sel && sel.rangeCount) {
          var firstRange = sel.getRangeAt(0);
          var lastRange = sel.getRangeAt(sel.rangeCount - 1);
          this.seleText = firstRange + lastRange;
          range
            .setStart(firstRange.startContainer, firstRange.startOffset)
            .setEnd(lastRange.endContainer, lastRange.endOffset);
        }
        return range;
      };
      var selectionObj = window.getSelection();
      var selectedText = selectionObj.toString();
      var selectionObj = window.getSelection();
      var rangeObj = selectionObj.getRangeAt(0);
      // console.log(rangeObj);
      var docFragment = rangeObj.cloneContents();
      // console.log(docFragment.parentNode);
      var testDiv = document.createElement("div");
      testDiv.appendChild(docFragment);
      var selectHtml = testDiv.innerHTML;
      var range = getRange();

      if (range.collapsed == false) {
        var parentHtml = $(range.startContainer.parentElement).parents("a");
        // console.log(parentHtml);
        var parentHtml1 = range.endContainer.parentElement.outerHTML;
        if (parentHtml.length != 0) {
          if (
            selectHtml.indexOf("</a>") != -1 ||
            selectHtml.indexOf("<a") != -1 ||
            parentHtml[0].nodeName == "A"
          ) {
            return this.$message.error("此处已有标签，请删除后再试");
          } else {
            this.show = true;
            this.range = range;
          }
        } else {
          if (
            selectHtml.indexOf("</a>") != -1 ||
            selectHtml.indexOf("<a") != -1
          ) {
            return this.$message.error("此处已有标签，请删除后再试");
          } else {
            this.show = true;
            this.range = range;
          }
        }
      } else {
        alert("请选择相应的文本");
      }
    },
    load() {
      let param = {
        accept: "text/html, text/plain",
      };
      GetHtmL(
        "https://mp.weixin.qq.com/s?__biz=MzA3NzgzODUwNA==&mid=2653476728&idx=1&sn=49dea7f4603d1c7df09278940eb6c9db&chksm=849796bfb3e01fa93829802990cce0203480e2cb08d36fd58830cb5319d2c7c7eda82f8891ca#rd",
        {}
      ).then((res) => {
        // console.log(res);
      });
    },
    goback() {
      this.$router.go(-1);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,
body {
  height: 100vh;
  overflow: hidden;
}
a {
  cursor: pointer !important;
}
.main_container {
  display: flex;
  width: 100%;
  padding-top: 50px;
}
#left_content {
  flex: 1;
}
.left {
  width: 20%;
  min-width: 300px;
  text-align: center;
}
.left li {
  display: block;
  padding: 10px 0;
  text-align: left;
}
.left li a {
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  color: #333;
}
.hello {
  display: flex;
  width: 100%;
  height: 100vh;
  background: #fff;
}
#left_content {
  position: relative;
  box-shadow: 0 0 20px #999;
  padding: 0 50px;
  overflow-y: scroll;
}
.right {
  text-align: center;
  height: 100%;
  min-width: 284px;
  max-width: 284px;
  overflow: hidden;
}
.top {
  position: fixed;
  box-sizing: border-box;
  width: 60%;
  text-align: right;
  padding: 20px;
  top: 0;
  left: 20%;
}
.top div {
  background: #fff;
  display: inline;
}
.top div a {
  margin-left: 20px;
}
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
/* 询问框 */
.ask {
  position: fixed;
  text-align: center;
  width: 500px;
  background: #fff;
  border: 1px solid #ccc;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  padding: 0 50px 50px 50px;
}
.hello .dioge .ask p {
  font-size: 18px;
  text-align: center;
  font-weight: bold;
  line-height: 1;
  color: #303133;
  padding: 20px;
  margin: 0;
}
.ask input {
  margin-top: 30px;
  color: black;
  padding: 0 20px 0 30px;
  background-color: #ccc;
  border: none;
  height: 30px;
  font-size: 18px;
  -webkit-appearance: none;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  width: 80%;
}
.btns {
  margin-top: 66px;
}
.ask .el-select {
  margin-bottom: 20px;
}

.success {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
}
.cancel {
  color: #fff;
  background-color: #dd6161;
  border-color: #dd6161;
}
.right {
  position: relative;
}

.right .footer h2 {
  text-align: center;
}
.right li {
  display: block;
  cursor: pointer;
  margin-top: 10px;
  padding: 10px 10px;
}
.right .head {
  text-align: left;
  color: #999;
  font-size: 14px;
  line-height: 1.5;
}
.right .head i {
  float: right;
  font-size: 18px;
  margin-left: 10px;
}
.right ul {
  overflow-y: scroll;
  height: calc(100vh - 112px);
  box-sizing: border-box;
  padding-bottom: 20px;
}
.right li:hover {
  outline: 1px solid #c4daf3;
  box-shadow: 0px 3px 6px rgba(53, 148, 255, 0.3);
}
.right li.active {
  background: #fff;
  outline: 1px solid #3594ff;
  box-shadow: 0px 3px 6px rgba(53, 148, 255, 0.3);
}
.right .content {
  font-size: 14px;
  line-height: 1.5;
  color: #999;
  text-align: left;
}
.right .content.tag {
  display: flex;
}
.right .tag .tag_box {
  flex: 1;
}
.el-tag {
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
  margin-bottom: 5px;
}

.right .content i {
  color: #999;
  margin-right: 5px;
  font-size: 14px;
  line-height: 1.5;
}
.right .content .lable {
  font-size: 14px;
  line-height: 1.5;
  color: #666;
}
.right .none {
  display: inline-block;
  text-align: center;
  font-size: 12px;
  color: #666;
}
::-webkit-scrollbar {
  display: none;
}
/* 添加书签区域 */
.add {
  position: absolute;
  background: #fff;
  text-align: center;
  white-space: nowrap;
  font-size: 0;
  z-index: 99;
  cursor: pointer;
}
.add button {
  cursor: pointer;
  position: relative;
  padding: 0 15px;
  line-height: 36px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background-color: #545454;
  border: none;
  outline: none;
  border-radius: 4px;
}
.add button::after {
  content: "";
  position: absolute;
  bottom: -16px;
  left: 50%;
  margin-left: -8px;
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-top-color: #545454;
}
/deep/.el-form-item__label {
  float: left;
}
.el-select-dropdown__list li {
  display: block;
}
.ask .el-select {
  width: 100%;
}
.ask .addFlag {
  width: 100px;
  margin-right: 20px;
  height: 40px;
  line-height: 16px;
}

.ask .el-form {
  display: flex;
}
/deep/.el-form-item {
  flex: 1;
  margin-right: 20px;
}
/* 头部 */
.headers {
  box-sizing: border-box;
  position: fixed;
  width: 100%;
  height: 50px;
  line-height: 50px;
  top: 0;
  left: 0;
  background-color: #fff;
  display: flex;
  padding: 0 20px;
  border-bottom: 2px solid #3474d9;
  z-index: 999;
}
.headers span {
  padding: 0 20px;
  width: 80%;
  font-size: 20px;
  font-weight: bold;
}
/deep/.el-button.is-circle {
  padding: 7px;
}
.dioge .ask {
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
}
.leftCatalog {
  width: 100%;
}
/deep/.left_catalog p {
  white-space: nowrap;
}
/deep/.left_catalog a {
  color: #000;
  font-weight: bold;
}
/deep/#left_content a,
/deep/#left_content a:link,
/deep/span.MsoHyperlink {
  color: #333 !important;
  text-decoration: none !important;
}
.threedian {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
