<!-- 记笔记 -->
<template>
  <div class="bg-box" v-loading="loading">
    <div class="container">
      <div
        class="left"
        v-if="
          kgInformationFile.type == 'docx' ||
          kgInformationFile.type == 'doc' ||
          kgInformationFile.type == 'txt'
        "
        id="left_main"
      >
        <el-button
          class="hoverbutton"
          size="small"
          icon="el-icon-arrow-left"
          @click="goback"
          style="
            color: #fff;
            border: 1px solid #ffffff;
            border-radius: 2px;
            background: #001529;
            margin-left: 46px;
            margin-top: 20px;
          "
          >返回</el-button
        >
        <div
          class="left_catalog"
          v-show="
            cententCatalog != '' &&
            cententCatalog != null &&
            cententCatalog != undefined
          "
          ref="mulu"
          v-html="cententCatalog"
          style="height: 70vh"
        >
          <!-- 左侧目录展示 -->
        </div>
      </div>
      <div class="main" style="background: #022343" id="main_main">
        <div class="head" style="height: 64px; background: #00305f">
          <el-button
            size="small"
            icon="el-icon-arrow-left"
            @click="goback"
            style="
              color: #fff;
              border: 1px solid #ffffff;
              border-radius: 2px;
              background: #001529;
              margin-left: 46px;
              margin-top: 10px;
              margin-bottom: 10px;
            "
            v-if="
              kgInformationFile.type !== 'docx' &&
              kgInformationFile.type !== 'doc' &&
              kgInformationFile.type !== 'txt'
            "
            >返回</el-button
          >
          <!-- 文章标题 -->
          <span>{{ kgInformationFile.docFilename }}</span>
        </div>
        <div class="cont" style="overflow: auto">
          <div class="top">
            <!--              文档展示-->
            <div
              class="lContent"
              v-show="kgInformationFile.contents != null"
              v-if="
                kgInformationFile.type == 'docx' ||
                kgInformationFile.type == 'doc' ||
                kgInformationFile.type == 'txt'
              "
            >
              <div class="leftCatalog" v-html="contents"></div>
            </div>
            <div
              class="lContent"
              id="fatherimg"
              v-else-if="kgInformationFile.docType == 'image'"
              style="text-align: center; max-width: 100%"
            >
              <!-- 图片展示 -->
              <img
                :src="kgInformationFile.docUrl"
                alt=""
                style="
                  position: absolute;
                  top: 50%;
                  left: 50%;
                  transform: translate(-50%, -50%);
                  max-width: 100%;
                  max-height: 100%;
                "
              />
            </div>
            <div
              class="lContent"
              v-else-if="kgInformationFile.source == 'wechat'"
            >
              <div
                class="leftCatalog"
                v-html="contents"
                style="text-align: center"
              ></div>
            </div>
            <!--              pdf展示-->
            <div
              class="lContent pdf"
              style="background: rgb(82, 86, 89)"
              v-else-if="
                kgInformationFile.docType == 'text' &&
                kgInformationFile.type == 'pdf'
              "
            >
              <iframe
                :src="src"
                width="100%"
                height="100%"
                style="min-height: 74vh"
              ></iframe>
            </div>
            <!--              其他格式展示-->
            <div class="lContent other" v-else>
              <div>
                <img src="~@/assets/images/nosee.png" alt="" />
                <p>该文档无法在线预览，请下载后进行查看</p>
              </div>
            </div>
            <!-- 评论 -->
          </div>
        </div>
      </div>
      <div class="right" style="max-width: 370px" id="right_main">
        <div class="features">
          <ul style="display: flex">
            <li
              class="look"
              @click="toggleLauch"
              v-show="kgInformationFile.contentTranferCnKey"
              v-if="
                kgInformationFile.source == 'wechat' &&
                kgInformationFile.contentTranferCnKey != ''
              "
            >
              <div v-if="!isbig">
                <i class="el-icon-edit-outline"></i>
                <span>切换语言</span>
              </div>
              <div v-else>
                <i class="el-icon-edit-outline" title="切换语言"></i>
              </div>
            </li>
            <li
              class="look"
              v-if="
                kgInformationFile.contents != null &&
                kgInformationFile.contents != 'undefined'
              "
              @click="goBook"
            >
              <div v-if="!isbig">
                <i class="el-icon-edit-outline"></i>
                <span>记笔记</span>
              </div>
              <div v-else>
                <i class="el-icon-edit-outline" title="记笔记"></i>
              </div>
            </li>
            <li
              v-if="kgInformationFile.come != '微信'"
              @click="upload(kgInformationFile)"
            >
              <div v-if="!isbig">
                <i class="el-icon-download"></i>
                <span>下载</span>
              </div>
              <div v-else>
                <i class="el-icon-upload" title="下载"></i>
              </div>
            </li>
            <li v-else @click="prompt">
              <div v-if="!isbig">
                <i class="el-icon-download"></i>
                <span>下载</span>
              </div>
              <div v-else>
                <i class="el-icon-upload" title="下载"></i>
              </div>
            </li>
            <li @click="collect(kgInformationFile)">
              <div v-if="!isbig">
                <i class="el-icon-folder-add"></i>
                <span>收藏</span>
              </div>
              <div v-else>
                <i class="el-icon-folder-add" title="收藏"></i>
              </div>
            </li>
            <li @click="commentk">
              <div v-if="!isbig">
                <i class="el-icon-s-comment"></i>
                <span>评论</span>
              </div>
              <div v-else>
                <i class="el-icon-s-comment" title="评论"></i>
              </div>
            </li>
            <li @click="seting" v-if="user">
              <div v-if="!isbig">
                <i class="el-icon-s-tools"></i>
                <span>密级</span>
              </div>
              <div v-else>
                <i class="el-icon-s-tools" title="设置密级"></i>
              </div>
            </li>
          </ul>
        </div>

        <div class="detail">
          <div class="Dtitle">| 文档简介</div>
          <div class="dInfo">
            <div
              class="infoItem"
              v-show="
                kgInformationFile.publisher != '' &&
                kgInformationFile.publisher != null
              "
            >
              <div class="lable">
                <div>作者</div>
              </div>
              <div class="font">{{ kgInformationFile.publisher }}</div>
            </div>
            <div
              class="infoItem"
              v-show="
                kgInformationFile.publishYear != '' &&
                kgInformationFile.publishYear != null
              "
            >
              <div class="lable">
                <div>发表年份</div>
              </div>
              <div class="font">{{ kgInformationFile.publishYear }}</div>
            </div>
            <div
              class="infoItem"
              v-show="
                kgInformationFile.come != '' && kgInformationFile.come != null
              "
            >
              <div class="lable">
                <div>情报来源</div>
              </div>
              <div class="font">{{ kgInformationFile.come }}</div>
            </div>
            <div
              class="infoItem"
              v-show="
                kgInformationFile.publishAddress != '' &&
                kgInformationFile.publishAddress != null
              "
            >
              <div class="lable">
                <div>国别</div>
              </div>
              <div class="font">
                {{ kgInformationFile.publishAddress }}
              </div>
            </div>
            <div
              class="infoItem"
              v-show="
                kgInformationFile.infoType != '' &&
                kgInformationFile.infoType != null
              "
            >
              <div class="lable">
                <div>类别</div>
              </div>
              <div class="font">{{ kgInformationFile.infoType }}</div>
            </div>
            <div
              class="infoItem"
              v-show="
                kgInformationFile.securityClassification != '' &&
                kgInformationFile.securityClassification != null
              "
            >
              <div class="lable">
                <div>密级</div>
              </div>
              <div class="font">
                {{ kgInformationFile.securityClassification | formDATA }}
              </div>
            </div>

            <div
              class="infoItem"
              v-show="
                kgInformationFile.publisher != '' &&
                kgInformationFile.realname != null
              "
            >
              <div class="lable">
                <div>上传用户</div>
              </div>
              <div class="font">{{ kgInformationFile.realname }}</div>
            </div>
            <div
              class="infoItem"
              v-show="
                kgInformationFile.createTime != '' &&
                kgInformationFile.createTime != null
              "
            >
              <div class="lable">
                <div>上传时间</div>
              </div>
              <div class="font">{{ kgInformationFile.createTime }}</div>
            </div>
            <div
              class="infoItem"
              v-show="
                kgInformationFile.docSize != '' &&
                kgInformationFile.docSize != null
              "
            >
              <div class="lable">
                <div>上传大小</div>
              </div>
              <div class="font">{{ kgInformationFile.docSize }}</div>
            </div>

            <div
              class="infoItem last"
              v-show="
                kgInformationFile.summary != '' &&
                kgInformationFile.summary != null
              "
            >
              <div class="lable">
                <div>简介</div>
              </div>
              <div class="font jianjie">
                {{ kgInformationFile.summary }}
              </div>
            </div>
          </div>
        </div>
        <div class="detail relation">
          <div class="Dtitle">| 关联文档</div>
          <ul v-if="kgInformationFiles.length != 0">
            <li
              v-for="(item, index) in kgInformationFiles"
              :key="index"
              @click="toggle(item, index)"
            >
              <div class="Associate_img">
                <img
                  src="~@/assets/images/doc.png"
                  v-if="item.docType == 'text' && item.type != 'pdf'"
                  alt
                />
                <img
                  src="~@/assets/images/pdf.png"
                  v-if="item.docType == 'text' && item.type == 'pdf'"
                  alt
                />
                <img
                  src="~@/assets/images/movie.png"
                  v-if="item.docType == 'video'"
                  alt
                />
                <img
                  src="~@/assets/images/img.png"
                  v-if="item.docType == 'image'"
                  alt
                />
                <img
                  src="~@/assets/images/else.png"
                  v-if="item.docType == 'else'"
                  alt
                />
                <span :title="item.docFilename">{{ item.docFilename }}</span>
              </div>
            </li>
          </ul>
          <div class="nullData" v-else>
            <img src="~@/assets/images/dataNone.png" alt="" />
            <p>暂无数据</p>
          </div>
        </div>
      </div>
    </div>
    <el-drawer
      title="评论服务"
      :visible.sync="drawer"
      :direction="direction"
      :close-on-press-escape="false"
      :wrapperClosable="false"
      :append-to-body="true"
    >
      <div class="drawer">
        <div class="block">
          <h3>请对该文档进行评分</h3>
          <el-rate v-model="score"> </el-rate>
        </div>
        <div class="comment">
          <h3>评论</h3>
          <el-row>
            <el-col :span="24" class="text_BOX">
              <el-input
                v-model="input"
                type="textarea"
                maxlength="50"
                show-word-limit
                placeholder="请输入内容"
              ></el-input>
              <el-button size="mini" type="primary" @click="sendcomment"
                >发表评论</el-button
              >
            </el-col>
            <el-col :span="5"> </el-col>
          </el-row>
          <h3>全部评论</h3>
          <ul
            class="infinite-list"
            v-if="commentList.length != 0"
            v-infinite-scroll="load"
            style="overflow: auto"
          >
            <li v-for="(item, index) in commentList" :key="index">
              <div class="head">
                <img src="~@/assets/images/user.png" alt="" />
                <div class="rightt">
                  <div style="display: flex">
                    <span class="username">{{ item.createBy }}</span>
                    <el-rate v-model="item.point" disabled text-color="#ff9900">
                    </el-rate>
                  </div>
                  <p class="contentt">{{ item.appraise }}</p>
                  <div style="display: flex">
                    <span class="createTime">{{ item.createTime }}</span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="nullData" v-else>
            <img src="~@/assets/images/dataNone.png" alt="" />
            <p>快来抢占沙发吧！</p>
          </div>
        </div>
      </div>
    </el-drawer>
    <el-dialog
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="设置密集"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form>
        <el-form-item label="文档密级" :label-width="formLabelWidth">
          <el-select v-model="miji" placeholder="请选择文档密级">
            <el-option
              v-for="(item, index) in mijiList"
              :key="index"
              :label="item.title"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="chooseYes">确 定</el-button>
      </span>
    </el-dialog>
    <CollDialog
      :switch1="false"
      :type="'collective'"
      :id="collid"
      :title="''"
      :name="''"
      :dialogFormVisible="dialogFormVisible2"
      @cancel="ccancel"
      @yesCancel="cyesCancel"
    />
  </div>
</template>

<script>
import {
  getBeforeDetail,
  comment,
  sendcomment,
  geteFloder,
  Collection,
  downloadRecord,
  miji,
  editmiji,
} from "../../api/apis";
import CollDialog from "../../common/dialog/collectionFolder";
import tree from "../ewTree";
import pdf from "vue-pdf";
import axios from "axios";
import $ from "jquery";
export default {
  beforeRouteUpdate(to, form, next) {
    next();
    // this.isNum()
  },
  watch: {
    isbig: {
      handler: function () {
        let left = document.querySelector(".left_catalog");
        this.$nextTick(function () {
          if (this.isbig === true) {
            console.log(left.innerHTML);
            left.style.height = "50vh";
            console.log("变大了");
          } else {
            console.log("变小了");
            left.style.height = "70vh";
          }
        });
      },
      deep: true,
      immediate: true,
    },

    cententCatalog: {
      handler: function (val, oldval) {
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
            let left = document.querySelector(".left_catalog");

            if (this.isbig === true) {
              left.style.height = "50vh";
            } else {
              left.style.height = "70vh";
            }
          });
        }
      },
      deep: true, //对象内部的属性监听，也叫深度监听
    },
    contents: {
      handler: function (val, oldval) {
        if (
          val != null &&
          val != "" &&
          val != undefined &&
          val != "undefined"
        ) {
          this.$nextTick(() => {
            var aList = document.querySelectorAll(".lContent a");
            for (var i = 0; i < aList.length; i++) {
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
    getSearchKey: {
      handler(newValue, oldValue) {
        var that = this;
        if (newValue) {
        } else {
        }
      },
    },
  },
  inject: ["showLogin"],
  components: {
    tree,
    pdf,
    CollDialog,
  },
  computed: {
    getSearchKey() {
      this.isbig = this.$store.state.changeShow;
      return this.$store.state.changeShow;
    },

    /* 转树形数据 */
    optionData() {
      let cloneData = JSON.parse(JSON.stringify(this.treeList)); // 对源数据深度克隆
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
  filters: {
    formDATA(val) {
      if (val == "public") {
        return "公开文档";
      }
      if (val == "interior") {
        return "内部文档";
      }
      if (val == "secret") {
        return "秘密文档";
      }
      if (val == "confidential") {
        return "核心文档";
      }
    },
  },
  data() {
    return {
      loading: false,
      isbig: false,
      formLabelWidth: "120px",
      dialogVisible: false,
      // 中外文的切换开关
      switch: "contents",
      contents: "",
      // 文档目录
      cententCatalog: "",
      collid: "",
      // 选项列表（必选）
      treeList: [],
      commentText: "",
      // 详情页全部数据
      dialogFormVisible2: false,
      beforeDetailObj: {},
      kgInformationFile: {},
      kgInformationFiles: [],
      drawer: false,
      direction: "rtl",
      score: 1,
      commentList: [],
      input: "",
      // 评论列表的页数
      pagenum: 1,
      pagesize: 10,
      commentObj: {},
      isClearable: false,
      isAccordion: false,
      src: "",
      numPages: null, // pdf 总页数
      user: false,
      // 文档的类型 微信数据，doc
      downType: "",
      mijiList: [],
      miji: "",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    if (!window.sessionStorage.getItem("webpack-dev-server")) {
      this.user = false;
    } else {
      // console.log
      window.sessionStorage
        .getItem("webpack-dev-server")
        .indexOf("system_administrator") != -1;
      this.user =
        window.sessionStorage
          .getItem("webpack-dev-server")
          .indexOf("system_administrator") != -1 ||
        window.sessionStorage
          .getItem("webpack-dev-server")
          .indexOf("content001") != -1;
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getBeforeDetailObj();
    this.getUserFloderList();
    document.querySelector(".rtl").removeAttribute("tabindex");
    document
      .querySelector(".el-drawer__header span")
      .removeAttribute("tabindex");
    this.getMijiList();
    $("body").on(
      "click",
      ".container p.MsoToc1,.container p.MsoToc2,.container p.MsoToc3",
      function () {
        $(
          ".container p.MsoToc1,.container p.MsoToc2,.container p.MsoToc3"
        ).css({ background: "none" });
        $(this).css({ background: "#2F3A44" });
      }
    );

    // if (this.$store.state.changeShow) {
    //   let bannersize = document.querySelectorAll(" .bannerBox p");
    //   let banitem = document.querySelectorAll(".ban_item");

    //   document.querySelector(".header .head_main").style.zoom = 1;
    //   for (let i = 0; i < bannersize.length; i++) {
    //     bannersize[i].style.fontSize = "23px";
    //   }
    //   for (let i = 0; i < banitem.length; i++) {
    //     banitem[i].style.fontSize = "23px";
    //   }

    //   document.querySelector("#left_main").style.zoom = 10.1;
    //   document.querySelector("#main_main").style.zoom = 10.1;
    //   document.querySelector("#right_main").style.zoom = 10.1;
    // } else {
    //   console.log("1111");
    //   document.querySelector("#left_main").style.zoom = 0.1;
    //   document.querySelector("#main_main").style.zoom = 0.1;
    //   document.querySelector("#right_main").style.zoom = 0.1;
    // }
  },
  methods: {
    istag() {
      console.log("this.isbig");

      if (this.isbig === true) {
        console.log(left.innerHTML);
        left.style.height = "50vh";
        console.log("变大了");
      } else {
        console.log("变小了");
        left.style.height = "70vh";
      }
    },

    insertAfter(newElement, targetElement) {
      // newElement是要追加的元素 targetElement 是指定元素的位置
      var parent = targetElement.parentNode; // 找到指定元素的父节点
      if (parent.lastChild == targetElement) {
        // 判断指定元素的是否是节点中的最后一个位置 如果是的话就直接使用appendChild方法
        parent.appendChild(newElement, targetElement);
      } else {
        parent.insertBefore(newElement, targetElement.nextSibling);
      }
    },
    prompt() {
      this.$message.error("文件来源自微信，暂时不支持下载");
    },
    commentk() {
      if (window.localStorage.getItem("token")) {
        this.drawer = true;
      } else {
        this.showLogin();
      }
    },
    handleClose(done) {
      done();
    },
    chooseYes() {
      editmiji({
        id: this.kgInformationFile.id,
        securityClassification: this.miji,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: data.message,
          });
          this.dialogVisible = false;
          this.getBeforeDetailObj();
        } else {
          this.$message.error(data.message);
        }
      });
    },
    //获取文档的密集（列表）
    getMijiList() {
      miji().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.mijiList = data.result;
        }
      });
    },
    // 切换中外文
    toggleLauch() {
      if (this.switch == "contents") {
        this.switch = "contentTranferCnKey";
        this.contents = this.kgInformationFile.contentTranferCnKey;
      } else {
        this.switch = "contents";
        this.contents = this.kgInformationFile.contents;
      }
    },
    goback() {
      this.$router.go(-1);
    },
    // 设置密级
    seting() {
      // window.open(window._CONFIG['goURL']+'/ResourceSecurityLevel?id='+this.kgInformationFile.id+'&ticket='+window.localStorage.getItem('token'))
      this.miji = this.kgInformationFile.securityClassification;
      this.dialogVisible = true;
    },
    cyesCancel() {
      this.dialogFormVisible2 = false;
    },
    ccancel() {
      this.dialogFormVisible2 = false;
    },
    collectYes() {
      if (this.valueId == 9999999 || this.valueId == 1) {
        return this.$message.error("请选择到全部文件夹下的文件夹");
      } else {
        Collection({
          kgDocId: this.kgInformationFile.id,
          folderId: this.valueId,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "收藏成功",
            });
            this.dialogFormVisible2 = false;
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
          this.treeList = data.result.records;
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
    // 收藏
    collect(obj) {
      if (window.localStorage.getItem("token")) {
        this.collid = obj.id;
        this.dialogFormVisible2 = true;
      } else {
        this.showLogin();
      }
    },
    // 文件下载
    upload(obj) {
      // console.log(window.localStorage.getItem("token"));
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
      that.$message({
        type: "success",
        message: name + "开始下载",
      });
      that.loading = true;
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
              a.href = blobUrl;
              a.click();
              that.adddownloadRecord(id);
              that.loading = false;
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
    getPdfCode(url) {
      let that = this;
      axios({
        method: "get",
        url: url,
        headers: {
          "Content-Type":
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "X-Access-Token": window.localStorage.getItem("token"),
        },
        responseType: "blob", //设置响应的数据类型为一个包含二进制数据的 Blob 对象，必须设置！！！
      })
        .then((response) => {
          that.src = that.getObjectURL(response.data);
        })
        .catch(function (error) {
          // console.log(error);
        });
    },

    // 将返回的流数据转换为url
    getObjectURL(file) {
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        try {
          url = window.webkitURL.createObjectURL(file);
        } catch (error) {}
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        try {
          url = window.URL.createObjectURL(file);
        } catch (error) {}
      }
      let CMAP_URL = "https://unpkg.com/pdfjs-dist@2.0.943/cmaps/";
      this.src = pdf.createLoadingTask({
        url: url,
        cMapUrl: CMAP_URL,
        cMapPacked: true,
      });
      // console.log(this.src);
      this.numPages = 4;
      return url;
    },
    // 发表评论
    sendcomment() {
      if (window.localStorage.getItem("token")) {
        this.input = this.input.trim();
        if (this.input == "") {
          this.$message.info("评论内容不能为空！");
        } else {
          sendcomment({
            fileId: this.kgInformationFile.id,
            appraise: this.input,
            point: this.score,
          }).then((res) => {
            var { data } = res;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: data.message,
              });
              this.getCommentList();
              this.score = 1;
              this.input = "";
            } else {
              this.$message.error(data.message);
            }
          });
        }
      } else {
        this.showLogin();
      }
    },
    // 获取评论列表
    getCommentList() {
      comment({
        informationId: this.kgInformationFile.id,
        pageNum: this.pagenum,
        pageSize: this.pagesize,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.commentList = data.result.records;
          this.commentObj = data.result;
        }
      });
    },
    load() {
      // 加载更多的判断
      if (this.commentObj.total >= this.pagesize) {
        this.pagesize += 5;
        this.getCommentList();
      }
    },
    // 打开反馈
    openFeed() {
      this.feedback = true;
    },
    // 切换文档
    toggle(item, index) {
      if (this.kgInformationFiles[index].cententCatalog == "") {
        this.cententCatalog = "";
      } else {
        this.cententCatalog = this.kgInformationFiles[index].cententCatalog;
      }
      if (item.type == "pdf") {
        this.getPdfCode(item.docUrl);
      }
      if (item.source == "wechar") {
        this.downType = "wechar";
      } else {
        this.downType = "html";
      }
      this.$router.push({
        path: "/TrilalXml",
        query: {
          textid: item.id,
          type: item.infoType,
        },
      });
      this.switch = "contents";

      var obj = this.kgInformationFile;
      var obj1 = this.kgInformationFiles[index];
      if (obj1.source == "upload") {
        obj1.come = "上传";
      } else if (obj1.source == "wechat") {
        obj1.come = "微信";
      }
      this.kgInformationFile = obj1;
      this.contents = this.kgInformationFiles[index].contents;
      this.kgInformationFiles[index] = obj;
    },
    // 根据id获取详情页签的数据
    getBeforeDetailObj() {
      getBeforeDetail({
        doctype: this.$route.query.type,
        textid: this.$route.query.textid,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          // console.log(data);
          var obj = data.result.kgInformationFile;
          // 获取文件后缀
          obj.type = obj.docUrl.split(".")[obj.docUrl.split(".").length - 1];
          if (obj.type == "pdf") {
            this.getPdfCode(obj.docUrl);
          }
          if (obj.source == "wechar") {
            this.downType = "wechar";
          } else {
            this.downType = "html";
          }
          if (obj.source == "upload") {
            obj.come = "上传";
          } else if (obj.source == "wechat") {
            obj.come = "微信";
          }
          this.kgInformationFile = obj;
          this.contents = obj.contents;
          this.cententCatalog = obj.cententCatalog;
          var obj1 = data.result.kgInformationFiles;
          for (var i = 0; i < obj1.length; i++) {
            obj1[i].type = obj1[i].docFilename.split(".")[
              obj1[i].docFilename.split(".").length - 1
            ];
          }
          this.kgInformationFiles = obj1;

          this.getCommentList();
        } else if (data.code == 250) {
          this.showLogin();
        }
      });
    },
    //   点击标题跳转到表格页面
    goTable() {
      this.$router.push({
        path: "/Table/1",
      });
    },
    //   点击记笔记跳转到详情页
    goBook() {
      if (window.localStorage.getItem("token")) {
        // console.log(this.kgInformationFile);
        if (this.kgInformationFile.source == "upload") {
          this.kgInformationFile.source = "html";
        }
        this.$router.push({
          path: "/hello",
          query: {
            id: this.kgInformationFile.id,
            type: this.kgInformationFile.source,
            title: this.kgInformationFile,
          },
        });
      } else {
        this.showLogin();
      }
    },
  },
};
</script>
<style scoped>
/deep/button:hover {
  background: #00305f !important;
}
.bg-box {
  width: 100%;
}
/* @import url(); 引入css类 */
.page {
  padding: 20px 0;
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}

div {
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
}
.container {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
}
table {
  width: 100% !important;
}

.title span {
  color: #333;
  cursor: pointer;
}
.main {
  box-sizing: border-box;
  flex: 1;
  min-width: 750px;
  position: relative;
  height: calc(100vh - 195px);
}
.cont {
  padding: 0 45px;
  height: calc(100vh - 64px - 195px);
}
.main .head {
  display: flex;
  line-height: 64px;
}
.main .head span {
  flex: 1;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.content {
  height: 100%;
}
.lContent {
  max-height: 100%;
}
.lContent.other {
  text-align: center;
}
.lContent.other img {
  width: 50%;
}
.lContent.other p {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}
/deep/.lContent span {
  color: #fff !important;
}
/deep/ .lContent a {
  color: #fff !important;
}
.features {
  height: 64px;
  background: #002140;
}
.features ul {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  margin: 0 20px;
  line-height: 64px;
}
.features ul li {
  color: #fff;
  font-size: 16px;
  font-weight: normal;
  cursor: pointer;
}
.features ul li:hover {
  color: #00cfff;
}
.detail {
  min-height: 360px;
}
.Dtitle {
  box-sizing: border-box;
  height: 70px;
  margin: 0 20px;
  border-bottom: 1px solid #2f3a44;

  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  line-height: 70px;
}
.dInfo {
}
.dInfo .infoItem {
  display: flex;
  height: 30px;
}
.dInfo .infoItem.last {
  height: auto;
}
.infoItem .lable {
  width: 80px;
  padding: 0 10px 0 0;
  text-align: right;
  margin-left: 20px;
}
.dInfo .infoItem .lable div {
  margin-top: 5px;
  color: #ffffff;
  width: 100%;
  text-align: center;
  padding: 2px 0;
  margin-right: 5px;
  font-weight: normal;
  text-align: justify;
  text-align-last: justify;
  font-size: 16px;
  letter-spacing: 1px;
}
.dInfo .infoItem .font {
  line-height: 30px;
  font-size: 16px;
  font-weight: normal;
  color: #a0a0a0;
  margin-top: 5px;
}
.dInfo .infoItem .font.jianjie {
  overflow: hidden;
}

.relation {
  margin-top: 38px;
}
.relation ul {
  overflow: hidden;
  margin-left: 20px;
}
.relation ul li {
  cursor: pointer;
  margin-top: 34px;
}
.relation ul li div {
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
}
.relation ul li img {
  display: inline-block;
  line-height: 87px;
  width: 22px;
  height: 26px;
}
.relation ul li span {
  display: inline-block;
  color: #fff;
  font-size: 16px;
  margin-left: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*评论*/
/deep/.el-drawer {
  padding: 0 20px;
}
.head {
  width: 100%;
  height: 64px;
}
.head span {
  color: #fff;
}
.head img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.left {
  background: #001529;
  width: 370px;
  height: calc(100vh - 195px);
  overflow: auto;
}

.left_catalog {
  max-width: 286px;
  padding-left: 26px;
  margin-right: 20px;
  overflow: auto;
}
::-webkit-scrollbar {
  width: 0px;
  height: 5px;
  background-color: #f5f5f5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 3px #001529;
  background-color: #001529;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.3);
  background-color: #fff;
}
.right {
  max-width: 370px;
  box-sizing: border-box;
  overflow: auto;
  background: #001529;
  height: calc(100vh - 195px);
}
.rightt .username {
  font-size: 20px;
  color: #00a1d6;
}
.rightt .createTime {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}

.comment ul {
  height: calc(100vh - 310px);
  overflow: scroll;
}
.comment ul::-webkit-scrollbar {
  width: 8px;
  padding: 0 20px;
  background-color: #f5f7f8;
}
.comment ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
.comment li {
  margin-top: 10px;
  padding-bottom: 10px;
}
/deep/.el-rate {
  margin-left: 20px;
  /*line-height: 40px;*/
  vertical-align: middle;
}
/deep/.el-drawer__header {
  padding-left: 0;
}
/deep/.el-drawer__header span {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
/deep/.el-drawer__close-btn {
  border: none;
}
/deep/.el-drawer__close-btn {
  border-image: none !important;
  border: none;
  outline: none;
}
/deep/.el-textarea__inner {
  resize: none;
  height: 100px;
}
.text_BOX {
  position: relative;
}
.text_BOX button {
  position: absolute;
  bottom: 10px;
  right: 40px;
}
/*目录*/
.leftCatalog {
  width: 100%;
  height: calc(100vh - 64px);
  position: relative;
}
/deep/.left_catalog p {
  white-space: nowrap;
}
.un,
.un:link,
.un:visited,
.un:hover,
.un:active {
  text-decoration: none;
  color: inherit;
}

/deep/.left_catalog a {
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 38px;
  font-weight: bold;
  text-decoration: none;
}
/deep/.leftCatalog a,
/deep/.leftCatalog a:link,
/deep/span.MsoHyperlink {
  text-decoration: none !important;
}
/deep/.WordSection1 p {
  color: #fff;
}
/deep/.WordSection1 span {
  color: #fff;
}
/deep/.MsoTocHeading span {
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #ffffff;
  line-height: 38px;
  font-weight: bold;
  text-decoration: none;
}
</style>