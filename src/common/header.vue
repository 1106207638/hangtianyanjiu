<!--  -->
<template>
  <!-- 头部区域 -->
  <div class="header">
    <div class="head_main" v-show="headers">
      <div class="logo">
        <img src="~@/assets/images/logo1.png" @click="logo" alt="" />
        <span>航天（实验）情报研究与服务平台</span>
      </div>
      <div class="search" v-if="isSearch">
        <el-input
          v-model="input"
          @keyup.enter.native="search"
          placeholder="请输入关键词进行检索"
          autosize="true"
          style="
            width: 400px;
            height: 48px;
            background: #f2f2f2;
            box-shadow: 0px 1px 20px 0px rgba(36, 36, 36, 0.2);
            border-radius: 6px;
          "
        >
          <el-button
            @click="search"
            slot="append"
            icon="el-icon-search"
            style="
              backwidth: 59px;
              height: 45px;
              background: #00cfff;
              border-radius: 0px 6px 6px 0px;
              color: #ffffff;
              font-size: 20px;
              height: 100%;
            "
          ></el-button>
        </el-input>
        <span
          style="
            width: 70px;
            height: 18px;
            font-size: 18px;
            font-family: Adobe Heiti Std;
            font-weight: normal;
            color: #ffffff;
            margin-left: 34px;
            cursor: pointer;
          "
          @click="senior"
          >高级检索></span
        >
      </div>
      <div class="btnss" v-if="isZoom">
        <el-button
          :type="issmall == true ? 'primary' : ''"
          @click="small"
          icon="el-icon-zoom-out"
          ><span style="margin-left: 10px">PC模式</span></el-button
        >
        <el-button
          :type="issmall == false ? 'primary' : ''"
          @click="big"
          icon="el-icon-zoom-in"
          ><span style="margin-left: 10px">研讨模式</span></el-button
        >
      </div>
    </div>
    <div class="nav">
      <div class="left">
        <div
          :class="activeNav == 'home' ? 'left_item active' : 'left_item'"
          @click="home"
        >
          首页
        </div>
        <div
          :class="activeNav == 'Table' ? 'left_item active' : 'left_item'"
          @click="table"
        >
          情报列表
        </div>
        <div
          :class="activeNav == 'echarts' ? 'left_item active aaa' : 'left_item'"
          style="position: relative"
          @click="itemMousemove($event)"
          @mouseleave="mouseLeave"
        >
          <!--          <el-dropdown :popper-append-to-body="false"  @command="handleCommand1">-->
          <span class="el-dropdown-link"> 情报视图 </span>
          <ul
            data-v-6a1e17a8=""
            class="aaaaaa el-dropdown-menu el-popper"
            v-show="isshow"
            @mousemove="itemMousemove($event)"
            @mouseover="itemMouseover"
            @mouseout="itemMouseout"
            style="
              transform-origin: center top;
              z-index: 2026;
              position: absolute;
              width: 170px;
              top: 50px;
              left: 50%;
              margin-left: -85px;
            "
          >
            <li
              data-v-6a1e17a8=""
              tabindex="-1"
              :class="indexEchart == '1' ? 'dropItem active' : 'dropItem'"
              @click="handleCommand1(1)"
            >
              太空发射图
            </li>
            <li
              data-v-6a1e17a8=""
              tabindex="-1"
              :class="indexEchart == '2' ? 'dropItem active' : 'dropItem'"
              @click="handleCommand1(2)"
            >
              太空主要装备图
            </li>
            <li
              data-v-6a1e17a8=""
              tabindex="-1"
              :class="indexEchart == '3' ? 'dropItem active' : 'dropItem'"
              @click="handleCommand1(3)"
            >
              太空战略演习图
            </li>
            <li
              data-v-6a1e17a8=""
              tabindex="-1"
              :class="indexEchart == '4' ? 'dropItem active' : 'dropItem'"
              @click="handleCommand1(4)"
            >
              太空领域威胁挑战图
            </li>
            <li
              data-v-6a1e17a8=""
              tabindex="-1"
              :class="indexEchart == '5' ? 'dropItem active' : 'dropItem'"
              @click="handleCommand1(5)"
            >
              太空安全危机处置图
            </li>
            <li
              data-v-6a1e17a8=""
              tabindex="-1"
              :class="indexEchart == '6' ? 'dropItem active' : 'dropItem'"
              @click="handleCommand1(6)"
            >
              太空力量部署图
            </li>
            <div style="width: 100%">
              <div
                x-arrow=""
                class="popper__arrow"
                style="left: 85px; top: -12px"
              ></div>
            </div>
          </ul>
          <!--            <el-dropdown-menu slot="dropdown">-->
          <!--              <el-dropdown-item  command="1">太空发射图</el-dropdown-item>-->
          <!--              <el-dropdown-item  command="2">太空主要装备图</el-dropdown-item>-->
          <!--              <el-dropdown-item  command="3">太空战略演习图</el-dropdown-item>-->
          <!--              <el-dropdown-item  command="4">太空领域威胁挑战图</el-dropdown-item>-->
          <!--              <el-dropdown-item  command="5">太空安全危机处置图</el-dropdown-item>-->
          <!--              <el-dropdown-item  command="6">太空力量部署图</el-dropdown-item>-->
          <!--            </el-dropdown-menu>-->
          <!--          </el-dropdown>-->
        </div>
        <div
          :class="activeNav == 'Dictionary' ? 'left_item active' : 'left_item'"
          @click="dictionary"
        >
          词典查询
        </div>
        <div
          :class="activeNav == 'NewsList' ? 'left_item active' : 'left_item'"
          @click="news"
        >
          航天新闻
        </div>
      </div>
      <div class="right">
        <div
          :class="activeNav == 'FeedBack' ? 'right_item active' : 'right_item'"
          @click="feedBack"
        >
          <i class="el-icon-phone-outline"></i>
          需求反馈
        </div>

        <div
          class="right_item"
          style="position: relative"
          @click="itemMousemove2"
          @mouseleave="mouseLeave"
          v-if="toolList.length != 0"
        >
          <span class="el-dropdown-link">
            <i class="el-icon-s-cooperation"></i>
            工具下载
          </span>
          <ul
            data-v-6a1e17a8=""
            class="ccc el-dropdown-menu el-popper"
            @mousemove="itemMousemove2($event)"
            @mouseover="itemMouseover2"
            @mouseout="itemMouseout2"
            style="
              transform-origin: center top;
              z-index: 2026;
              position: absolute;
              width: 170px;
              top: 50px;
              left: 50%;
              margin-left: -85px;
            "
          >
            <li
              data-v-6a1e17a8=""
              tabindex="-1"
              v-for="(item, index) in toolList"
              :key="index"
              :class="indexEchart == '1' ? 'dropItem active' : 'dropItem'"
              @click="handleCommand(item.toolPath)"
            >
              {{ item.toolName }}
            </li>
            <div
              x-arrow=""
              class="popper__arrow"
              style="left: 85px; top: -12px"
            ></div>
          </ul>
        </div>
        <div class="right_item" v-if="!isLogin" @click="login">
          <i class="el-icon-house"></i>
          登录
        </div>
        <div
          class="right_item b"
          style="position: relative"
          @click="itemMousemove1"
          @mouseleave="mouseLeave"
          v-else
        >
          <span class="el-dropdown-link">
            {{ userInfo.realname }}
          </span>
          <ul
            data-v-6a1e17a8=""
            class="bbb el-dropdown-menu el-popper"
            @mousemove="itemMousemove1($event)"
            @mouseover="itemMouseover1"
            @mouseout="itemMouseout1"
            style="
              transform-origin: center top;
              z-index: 2026;
              position: absolute;
              width: 90px;
              top: 50px;
              left: 50%;
              margin-left: -40px;
            "
          >
            <li
              class="el-dropdown-menu__item"
              v-if="isrule"
              @click="handleCommand2(2)"
            >
              后台页面
            </li>
            <li class="el-dropdown-menu__item" @click="handleCommand2(1)">
              退出登录
            </li>
            <li class="el-dropdown-menu__item" @click="goUser">个人中心</li>
            <li class="el-dropdown-menu__item" @click="message">信息推送</li>
            <div
              x-arrow=""
              class="popper__arrow"
              style="left: 50%; top: -12px; margin-left: -5px"
            ></div>
          </ul>
          <!--            <el-dropdown-menu slot="dropdown">-50%!--              <el-dropdown-item command="2" >后台</el-dropdown-item>-->
          <!--              <el-dropdown-item command="1">退出</el-dropdown-item>-->
          <!--            </el-dropdown-menu>-->
        </div>
        <div class="right_item pc" v-show="!headers && urlType" @click="small">
          PC模式
        </div>
      </div>
      <FeedBack :type="type" :feedBack="feedback" @cancel="cancel" />
      <Login
        :dialogFormVisible="Logindialog"
        :toggle="true"
        @cancel="cancel"
        @yesCancell="regist"
        @yesCancel="LoginReload"
      ></Login>
    </div>
  </div>
</template>

<script>
import { LoginOut, getTool, uploadTool } from "../api/apis";
import FeedBack from "./dialog/feedBack";
import Login from "./Login/index";
import $ from "jquery";

export default {
  components: {
    FeedBack,
    Login,
  },
  props: ["isSearch", "Logindialog", "headers"],
  inject: ["reload", "isLogin"],
  data() {
    return {
      isshow: false,
      input: "",
      isLogin: false,
      feedback: false,
      // Logindialog: false,
      // 反馈的类型 （1： 系统反馈 2 ：文档反馈）
      type: 1,
      // 是否登录
      userInfo: {},
      toolList: [],
      issmall: true,
      isZoom: true,
      // 判断用户是否为普通用户 --- false === 普通用户;true==== 非
      isrule: false,
      urlType: true,
      indexEchart: null,
      time1: null,
      activeNav: "",
    };
  },
  computed: {
    getUserIcons() {
      return this.$store.state.isZoom;
    },
  },
  watch: {
    getUserIcons(val) {
      this.isZoom = val;
    },
    Logindialog: {
      handler: function (val, oldVal) {
        if (val) {
        } else {
        }
      },
      deep: true,
    },
    $route: {
      handler(val, oldval) {
        if (oldval.name == "Echarts") {
          this.indexEchart = "";
        }
        if (val != "Echarts") {
          this.urlType = true;
        }
        if (val.name == "home") {
          this.activeNav = "home";
        } else if (val.name == "Table") {
          this.activeNav = "Table";
        } else if (val.name == "Dictionary") {
          this.activeNav = "Dictionary";
        } else if (val.name == "NewsList") {
          this.activeNav = "NewsList";
        } else if (val.name == "FeedBack") {
          this.activeNav = "FeedBack";
        } else if (val.name == "Message") {
          this.activeNav = "Message";
        } else if (val.name == "Personal") {
          this.activeNav = "Personal";
        } else if (val.name == "Editing") {
          this.activeNav = "Personal";
        } else if (val.name == "EditPass") {
          this.activeNav = "Personal";
        } else if (val.name == "Echarts") {
          this.activeNav = "echarts";
          this.urlType = false;
          if (val.params.id == 1) {
            this.indexEchart = 2;
          }
          if (val.params.id == 2) {
            this.indexEchart = 3;
          }
          if (val.params.id == 3) {
            this.indexEchart = 4;
          }
          if (val.params.id == 4) {
            this.indexEchart = 5;
          }

          if (val.params.id == 5) {
            this.indexEchart = 1;
          }
          if (val.params.id == 6) {
            this.indexEchart = 6;
          }
        } else {
          this.indexEchart = null;
          this.activeNav = "";
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    var userInfo = window.localStorage.getItem("userInfo");
    this.getToolList();
    if (userInfo) {
      this.userInfo = JSON.parse(userInfo);
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }
    if (window.localStorage.getItem("backstage")) {
      this.isrule = window.localStorage.getItem("backstage") == "true";
    } else {
      this.isrule = false;
    }
  },
  methods: {
    reloads() {
      this.isrule = false;
      this.$store.commit("editPassword", "");
      this.userInfo = {};
      this.isLogin = false;
      this.reload();
    },
    // 跳转航天重大新闻
    news() {
      this.$router.push("/newsList");
    },
    ceshi() {
      this.$router.push("/ceshi");
    },
    upload() {
      for (var i = 0; i < arr.length; i++) {
        var id = arr[i].id;
        var name = arr[i].docName;
        this.down(
          window._CONFIG["baseURL"] +
            "/personalCenter/downloadFile?fileId=" +
            id,
          name
        );
      }
    },
    down(url, name) {
      var xmlreq = new XMLHttpRequest();
      xmlreq.open("get", url, true);
      xmlreq.responseType = "blob";
      xmlreq.setRequestHeader("Content-Type", "application/json");
      xmlreq.setRequestHeader(
        "X-Access-Token",
        window.localStorage.getItem("token")
      );
      xmlreq.onload = function (req) {
        var data = req.target.response;
        var blob = new Blob([data]);
        var a = document.createElement("a");
        var blobUrl = window.URL.createObjectURL(blob);
        //得到后台传到前台的文件名
        // var filename = xmlreq.getResponseHeader("content-disposition");
        // if(filename){
        // a.download = filename.match(/filename="(\S*)"/)[1];
        // }else{
        a.download = name;
        // }

        a.href = blobUrl;
        a.click();
      };
      xmlreq.send();
    },
    // 文件下载
    handleCommand(url) {
      var name = "";
      for (var i = 0; i < this.toolList.length; i++) {
        if (url == this.toolList[i].toolPath) {
          name = this.toolList[i].toolName;
        }
      }
      window.open(url);
      // this.down(url,name)

      // uploadTool(url).then((res)=>{
      //
      // })
    },
    handleCommand1(id) {
      this.indexEchart = id;
      this.isshow = false;
      document.querySelector(".aaaaaa").style.display = "none";
      if (id == 1) {
        this.$router.push("/view/5");
        document.querySelector(".aaaaaa").style.display = "none";
      } else if (id == 2) {
        this.$router.push("/view/1");
        document.querySelector(".aaaaaa").style.display = "none";
      } else if (id == 3) {
        this.$router.push("/view/2");
        document.querySelector(".aaaaaa").style.display = "none";
      } else if (id == 4) {
        this.$router.push("/view/3");
        document.querySelector(".aaaaaa").style.display = "none";
      } else if (id == 5) {
        this.$router.push("/view/4");
        document.querySelector(".aaaaaa").style.display = "none";
      } else if (id == 6) {
        this.$router.push("/view/6");
        document.querySelector(".aaaaaa").style.display = "none";
      }
    },
    handleCommand2(id) {
      if (id == 1) {
        this.cancelLogin();
      } else {
        window.open(
          window._CONFIG["goURL"] +
            "?ticket=" +
            window.localStorage.getItem("token")
        );
      }
    },
    // 获取工具列表
    getToolList() {
      getTool().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.toolList = data.result.records;
        }
      });
    },
    LoginReload() {
      this.Logindialog = false;
      this.isLogin = true;
      this.userInfo = JSON.parse(window.localStorage.getItem("userInfo"));
      this.$emit("yess");
      if (window.localStorage.getItem("backstage")) {
        this.isrule = window.localStorage.getItem("backstage") == "true";
      } else {
        this.isrule = false;
      }
      this.reload();
    },
    regist() {
      this.Logindialog = false;
      this.$emit("yess");
    },
    cancel() {
      this.Logindialog = false;
      this.feedback = false;
      this.$emit("yess");
    },
    // 反馈
    feedBack() {
      if (
        window.localStorage.getItem("token") != "" &&
        window.localStorage.getItem("token") != null
      ) {
        // this.feedback = true
        this.$router.push("/FeedBack");
      } else {
        this.$message.error("请登录后再试");
        this.Logindialog = true;
      }
      // this.$emit('openFack')
    },
    // 搜索
    search() {
      this.input = this.input.replace(/(^\s*)|(\s*$)/g, "");
      if (this.input == "") {
        this.$message({
          type: "error",
          message: "请输入内容",
        });
      } else {
        this.$router.push({
          path: "/class",
          query: {
            search: this.input.replace(/(^\s*)|(\s*$)/g, ""),
          },
        });
      }
    },
    home() {
      this.$router.push("/");
    },
    // 高级搜索
    senior() {
      this.$router.push("/senior");
    },
    index() {
      this.$router.push("/");
    },

    dictionary() {
      this.$router.push("/Dictionary");
    },
    table() {
      this.$router.push("/Table/1");
    },
    login() {
      this.Logindialog = true;
      // this.$emit('openLogin')
      // this.dialog = false
      // this.dialog = true
    },
    message() {
      if (
        window.localStorage.getItem("token") != "" &&
        window.localStorage.getItem("token") != null
      ) {
        this.$router.push("/Message");
      } else {
        this.$message.error("请登录后再试");
        this.Logindialog = true;
      }
    },
    // 跳转到个人中心
    goUser() {
      if (
        window.localStorage.getItem("token") != "" &&
        window.localStorage.getItem("token") != null
      ) {
        this.$router.push("/Personal");
      } else {
        this.$message.error("请登录后再试");
        this.Logindialog = true;
      }
    },
    // 跳转到首页
    logo() {
      this.$router.push("/Nav");
    },

    cancelLogin() {
      this.$confirm("此操作将退出当前用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        lockScroll: false,
      })
        .then(() => {
          LoginOut().then((res) => {
            var { data } = res;
            if (data.code == 200) {
              window.localStorage.removeItem("token");
              window.localStorage.removeItem("Authorization");
              window.localStorage.removeItem("userInfo");
              window.localStorage.removeItem("backstage");
              window.localStorage.removeItem("webpack-edit");
              this.isrule = false;
              this.$store.commit("editPassword", "");
              this.userInfo = {};
              this.$notify.success({
                title: "退出成功",
                showClose: false,
              });
              this.isLogin = false;
              this.$router.push("/");
              this.reload();
            } else {
            }
          });
        })
        .catch(() => {});
    },
    itemMouseover: function () {
      $(".aaaaaa").css({
        display: "none",
      });
    },
    itemMouseout: function () {
      $(".aaaaaa").css({
        display: "none",
      });
    },
    itemMousemove: function (e) {
      this.isshow = true;
      $(".aaaaaa").css({
        display: "block",
      });
    },
    mouseLeave(n) {
      $(".aaaaaa").css({
        display: "none",
      });
      $(".bbb").css({
        display: "none",
      });
      $(".ccc").css({
        display: "none",
      });
    },
    itemMouseover1: function () {
      $(".bbb").css({
        display: "none",
      });
    },
    itemMouseout1: function () {
      $(".bbb").css({
        display: "none",
      });
    },
    itemMousemove1: function (e) {
      $(".bbb").css({
        display: "block",
      });
    },
    itemMouseover2: function () {
      $(".ccc").css({
        display: "none",
      });
    },
    itemMouseout2: function () {
      $(".ccc").css({
        display: "none",
      });
    },
    itemMousemove2: function (e) {
      $(".ccc").css({
        display: "block",
      });
    },
    small() {
      let bannersize = document.querySelectorAll(" .bannerBox p");
      let banitem = document.querySelectorAll(".ban_item");

      this.issmall = true;
      this.$store.dispatch("init", false);
      this.$store.dispatch("toggleSmall", true);
      if (this.$route.name == "home") {
        document.querySelector(".header").style.zoom = 1;
        for (let i = 0; i < bannersize.length; i++) {
          bannersize[i].style.fontSize = "18px";
        }
        for (let i = 0; i < banitem.length; i++) {
          banitem[i].style.fontSize = "18px";
        }
        document.querySelector(".hot").style.zoom = 1;
        document.querySelector(".big_cate").style.zoom = 1;
        document.querySelector(".category").style.zoom = 1;
        document.querySelector(".big_cate").style.zoom = 1;
        document.querySelector(".lastBom").style.zoom = 1;
        document.querySelector(".classleft").style.zoom = 1;
        document.querySelector(".el-dropdown-menu").style.zoom = 1;
        document.querySelector(".ciYun").style.height = "500px";
      } else {
        document.getElementsByTagName("body")[0].style.zoom = 1;
      }
      document.querySelector(".ciYun").style.height = "500px";
    },
    big() {
      this.issmall = false;
      let bannersize = document.querySelectorAll(" .bannerBox p");
      let banitem = document.querySelectorAll(".ban_item");

      if (this.$route.name == "home") {
        document.querySelector(".header .head_main").style.zoom = 1;
        for (let i = 0; i < bannersize.length; i++) {
          bannersize[i].style.fontSize = "23px";
        }
        for (let i = 0; i < banitem.length; i++) {
          banitem[i].style.fontSize = "23px";
        }
        document.querySelector(".hot").style.zoom = 1.5;
        document.querySelector(".big_cate").style.zoom = 1.5;
        document.querySelector(".category").style.zoom = 1.5;
        document.querySelector(".big_cate").style.zoom = 1.5;
        document.querySelector(".lastBom").style.zoom = 1.5;
        document.querySelector(".classleft").style.zoom = 1.5;
        document.querySelector(".nav").style.zoom = 1.3;

        // document.querySelector('header').style.zoom=1.5
      } else {
        document.getElementsByTagName("body")[0].style.zoom = 1.5;
      }
      // document.body.style.cssText += '; -moz-transform: scale(1.5);-moz-transform-origin: 0 0; ';
      this.$store.dispatch("init", true);
      this.$store.dispatch("toggleBig", true);
    },
  },
};
</script>
<style scoped>
div {
  box-sizing: border-box;
}

/* @import url(); 引入css类 */
.header {
  width: 100%;
}

.head_main {
  background: url("~@/assets/images/xing.png");
  background-size: auto 135px;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;

  height: 145px;
  line-height: 145px;
}
.left > div,
.right > div {
  padding-left: 20px;
  padding-right: 20px;
}
.search {
  flex: 1;
  text-align: right;
  margin-right: 150px;
}

.header .logo {
  height: 100%;
  padding: 7px;
  line-height: 135px;
}

.header .logo img {
  display: inline-block;
  width: 75px;
  height: 75px;
  vertical-align: middle;
}
.logo span {
  width: 358px;
  height: 23px;
  font-size: 24px;
  font-weight: 400;
  color: #ffffff;
  line-height: 12px;
  margin-left: 20px;
}

/deep/.el-input__inner {
  height: 100%;
}
.nav {
  padding: 0 20px;
  height: 50px;
  line-height: 50px;
  background: url("../assets/images/bg.jpg");
}

.nav .left {
  float: left;
}
.nav .left .left_item {
  margin-right: 30px;
}
.nav .left .left_item,
.nav .right .right_item {
  display: inline-block;
  cursor: pointer;
  font-weight: 700;
  font-style: normal;
  font-size: 18px;
  color: #fbfbfb;
}
.nav .left .left_item.active,
.nav .right .right_item.active {
  color: #0ab6f2;
  border-bottom: 2px solid #00cfff;
  background: rgb(22, 46, 89);
  font-size: 20px;
}
.nav .right .right_item {
  font-size: 18px;
  margin-right: -5px;
}

.nav .right {
  float: right;
}

.nav .right .right_item i {
  display: inline-block;
  font-size: 16px;
  vertical-align: middle;
}

.cancel {
  display: none;
  width: 100px;
  text-align: center;
  position: absolute;
  background: rgb(10, 60, 119);
  border-radius: 2px;
}

.nav .el-dropdown {
  color: inherit;
  font-size: inherit;
}

.el-dropdown-menu {
  background: rgb(10, 60, 119);
  border: none;
}

.el-dropdown-menu li {
  font-size: 12px;
  color: #fdf9f9;
  text-align: center;
}

.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  font-size: 12px;
  color: #fdf9f9;
  background: rgb(10, 60, 119);
}

/deep/ .popper__arrow {
  border-bottom-color: rgb(10, 60, 119) !important;
}

/deep/ .popper__arrow::after {
  top: 1px;
  margin-left: -6px;
  border-top-width: 0;
  border-bottom-color: rgb(10, 60, 119) !important;
}

.bbb,
.ccc {
  display: none;
}
.btnss {
}
.aaaaaa .active {
  background-color: #0ab6f2;
}
.aaaaaa li:hover {
  background-color: none;
}
.dropItem {
  list-style: none;
  line-height: 36px;
  padding: 0 20px;
  margin: 0;
  font-size: 14px;
  color: #606266;
  cursor: pointer;
  outline: 0;
}
/deep/.el-dropdown-menu {
  margin: 0;
}
</style>