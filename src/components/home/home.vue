<!-- 首页 -->
<template>
  <div>
    <div
      class="bannerBox"
      style="padding: 0 30px; width: 100%; margin-top: 40px"
    >
      <div style="display: flex; width: 100%">
        <div style="flex: 1; box-sizing: border-box">
          <el-carousel
            height="462px"
            width="100%"
            trigger="click"
            @change="change"
            ref="banner"
          >
            <el-carousel-item v-for="(item, index) in banner" :key="index">
              <div class="bannerBox">
                <img
                  class="bannerImage"
                  :src="item.cover"
                  @click="gonews(item.id)"
                  alt=""
                />
                <!-- banner图的图片文字 -->
                <div class="digest">
                  <p>{{ item.digest }}</p>
                </div>
              </div>
            </el-carousel-item>
          </el-carousel>
        </div>
        <!-- banner右边 -->
        <div class="ban__right">
          <div class="ban_right" style="display: flex">
            <div
              :class="activeIndex == index ? 'ban_item active' : 'ban_item'"
              v-for="(item, index) in banner"
              @mouseenter="enter(index)"
              @mouseleave="leave(index)"
              :key="index"
            >
              {{ item.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="home">
      <!-- 头部区域 -->
      <!--    <Headers />-->
      <!-- 头部导航栏 -->
      <!-- 搜索热刺 -->
      <div class="container">
        <div class="hot">
          <div class="hot_box_left">
            <div style="hot_box">
              <div
                class="hot_item"
                style="
                  border: 1px solid #397fa3;
                  background: rgb(15, 50, 94, 0.6);
                  margin-top: 10px;
                  margin-bottom: 35px;
                "
              >
                <p>
                  <span
                    :class="classActive == '热搜' ? 'active' : 'noactive'"
                    @click="toggleClass('热搜')"
                  >
                    <i class="el-icon-s-data"></i>
                    热搜
                  </span>
                  <span
                    :class="classActive == '推荐' ? 'active' : 'noactive'"
                    @click="toggleClass('推荐')"
                  >
                    <i class="el-icon-s-management"></i>
                    推荐
                  </span>
                  <span
                    :class="classActive == '最近更新' ? 'active' : 'noactive'"
                    @click="toggleClass('最近更新')"
                  >
                    <i class="el-icon-s-unfold"></i>
                    最近更新
                  </span>
                </p>
                <ul>
                  <li
                    v-for="(item, index) in classList"
                    v-if="index < 5"
                    :key="index"
                  >
                    <p @click="goTxml(item)" :title="item.title">
                      <i class="el-icon-reading"></i>
                      {{ item.title }}
                    </p>
                    <p>{{ item.summary }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--        大分类-->
        <!-- 分类 -->
        <div
          class="category"
          style="
            border: 1px solid #397fa3;
            padding-left: 30px;
            padding-right: 30px;
            background: rgb(15, 50, 94, 0.6);
            margin-top: 20px;
          "
        >
          <div class="big_cate">
            <p class="class left" style="">情报分类</p>
          </div>

          <div class="left">
            <div class="cate classBox">
              <div class="inlineBlock">
                <div>
                  <div
                    :class="
                      cateIndex == item.name ? 'cateItem active' : 'cateItem'
                    "
                    @click="toggleCate(item.name)"
                    v-show="index < 4"
                    v-for="(item, index) in allCate"
                    :key="index"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div>
                  <div
                    :class="
                      cateIndex == item.name ? 'cateItem active' : 'cateItem'
                    "
                    @click="toggleCate(item.name)"
                    v-show="index > 3"
                    v-for="(item, index) in allCate"
                    :key="index"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="inlineBlock">
                <div>
                  <div
                    :class="
                      cateIndex == item.name ? 'cateItem active' : 'cateItem'
                    "
                    @click="toggleCate(item.name)"
                    v-for="(item, index) in allCate1"
                    :key="index"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
              <div class="inlineBlock">
                <div>
                  <div
                    :class="
                      cateIndex == item.name ? 'cateItem active' : 'cateItem'
                    "
                    @click="toggleCate(item.name)"
                    v-show="index < 3"
                    v-for="(item, index) in allCate2"
                    :key="index"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div>
                  <div
                    :class="
                      cateIndex == item.name ? 'cateItem active' : 'cateItem'
                    "
                    @click="toggleCate(item.name)"
                    v-show="index > 3 && index < 6"
                    v-for="(item, index) in allCate2"
                    :key="index"
                  >
                    {{ item.name }}
                  </div>
                </div>
                <div>
                  <div
                    :class="
                      cateIndex == item.name ? 'cateItem active' : 'cateItem'
                    "
                    @click="toggleCate(item.name)"
                    v-show="index > 5"
                    v-for="(item, index) in allCate2"
                    :key="index"
                  >
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex">
              <div class="hot">
                <div class="hot_box_left">
                  <div style="">
                    <div class="hot_item">
                      <ul style="padding-top: 10px">
                        <li
                          v-for="(item, index) in informationList"
                          v-if="index < 5"
                          :key="index"
                        >
                          <p @click="goTxml(item)" :title="item.title">
                            <i class="el-icon-reading"></i>
                            {{ item.title }}
                          </p>
                          <p>{{ item.summary }}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 词云 -->
        <footer class="footer ciYun">
          <div class="left cici">
            <div
              class="big_cate"
              style="
                border-bottom: 1px solid #1e3e74;
                margin-bottom: -2px;
                margin: 0 30px;
              "
            >
              <p
                class="class left bigciyun"
                style="
                  margin-top: 20px;
                  margin-bottom: -2px;
                  text-align: center;
                  width: 124px;
                  padding-left: 0;
                  margin-left: 0;
                "
              >
                词云
              </p>
            </div>
            <div id="value" ref="myChart"></div>
          </div>
        </footer>
        <div class="lastBom" style="border: 1px solid red">
          <div
            class="hot category"
            style="
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
            "
          >
            <div
              class="hot_box_right"
              style="
                width: 49%;
                background: rgb(15, 50, 94, 0.6);
                border: 1px solid #397fa3;
              "
            >
              <p
                class="class left user"
                style="margin-left: 30px; margin-right: 30px; width: 850px"
              >
                活跃用户
              </p>

              <div class="hot_item" style="">
                <ul>
                  <li v-for="(item, index) in Footprint" :key="index">
                    <div class="time_line">
                      <i class="el-icon-time"></i>
                      <span>{{ item.requestTime }}</span>
                    </div>
                    <div class="content">{{ item.content }}</div>
                  </li>
                </ul>
              </div>
            </div>
            <div
              class="right"
              style="
                width: 49%;
                border: 1px solid #397fa3;
                background: rgb(15, 50, 94, 0.6);
                overflow: hidden;
              "
            >
              <p
                class="class left foot"
                style="margin-left: 30px; margin-right: 30px; width: 850px"
              >
                我的足迹
              </p>

              <div class="content_item" style="">
                <div
                  class="content_box"
                  v-for="(item, index) in activeList"
                  :key="index"
                >
                  <div class="boxItem">
                    <span>{{ index + 1 }}</span>
                    <span>{{ item }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "echarts-wordcloud/dist/echarts-wordcloud";
import "echarts-wordcloud/dist/echarts-wordcloud.min";
import Headers from "../../common/header";
import FeedBack from "../../common/dialog/feedBack";
import { GetHomeNews } from "@/api/api";
import {
  getNav,
  getInformation,
  getActive,
  getComment,
  getNews,
  getFootprint,
  getciyun,
} from "../../api/apis";
export default {
  components: {
    Headers,
    FeedBack,
  },
  inject: ["showLogin"],
  computed: {
    getSearchKey() {
      return this.$store.state.changeShow;
    },
  },
  watch: {
    getSearchKey: {
      handler(newValue, oldValue) {
        var that = this;
        if (newValue) {
          document.querySelector(".header").style.zoom = 1;
          document.querySelector(".bannerBox").style.zoom = 1.5;
          document.querySelector(".hot").style.zoom = 1.5;
          document.querySelector(".big_cate").style.zoom = 1.5;
          document.querySelector(".category").style.zoom = 1.5;
          document.querySelector(".big_cate").style.zoom = 1.5;
          document.querySelector(".lastBom").style.zoom = 1.5;
          document.querySelector(".classleft").style.zoom = 1.5;

          document.querySelector(".ciYun").style.height = "526px";
        } else {
          document.querySelector(".header").style.zoom = 1;
          document.querySelector(".bannerBox").style.zoom = 1;
          document.querySelector(".hot").style.zoom = 1;
          document.querySelector(".big_cate").style.zoom = 1;
          document.querySelector(".category").style.zoom = 1;
          document.querySelector(".big_cate").style.zoom = 1;
          document.querySelector(".lastBom").style.zoom = 1;
          document.querySelector(".classleft").style.zoom = 1;
          document.querySelector(".el-dropdown-menu").style.zoom = 1;
          document.querySelector(".ciYun").style.height = "500px";
        }
        const width = document.body.clientWidth;
        that.zoom = 1 / (width / 1920);
        window.addEventListener("resize", () => {
          const width = document.body.clientWidth;
          that.zoom = 1 / (width / 1920);
        });
        this.initEcharts();
        this.myChart.resize();
      },
    },
  },
  data() {
    return {
      classActive: "热搜",
      classList: [],
      // 当前轮播如的下标
      activeIndex: 0,
      // 所有的分类（已经处理ok）
      allCates: [],
      allCate: [],
      allCate1: [],
      allCate2: [],
      cateIndex: "",
      zoom: "",
      myChart: "",
      input: "",
      // 首页四大分类
      navObj: {
        hot: [],
        commend: [],
        news: [],
      },
      // 情报分类
      informationList: [],
      informationLists: [],
      // 动态列表
      dynamicList: [],
      // 活跃用户列表
      activeList: [],
      Footprint: [],
      ciyun: [],
      show: true,
      newCiyun: [],
      slidename: "slide-right",
      feedBack: false,
      banner: [
        {
          name: "航天一",
          path: require("../../assets/images/timg (1).jpg"),
        },
        {
          name: "航天二",
          path: require("../../assets/images/timg.jpg"),
        },
        {
          name: "航天二",
          path: require("../../assets/images/timg.jpg"),
        },
        {
          name: "航天二",
          path: require("../../assets/images/timg.jpg"),
        },
        {
          name: "航天二",
          path: require("../../assets/images/timg.jpg"),
        },
        {
          name: "航天二",
          path: require("../../assets/images/timg.jpg"),
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    document.getElementsByTagName("body")[0].style.zoom = 1;
  },
  mounted() {
    // 获取首页四大分类
    this.getBanner();
    this.getNavList();
    this.getcomm();
    this.getNews();
    this.getFootprint();
    // 词云
    this.getciyun();
    // 获取情报分类
    this.getInformationList();
    // 获取动态列表
    // 获取活跃用户
    this.getActiveList();
    var that = this;
    if (this.$store.state.changeShow) {
      let bannersize = document.querySelectorAll(" .bannerBox p");
      let banitem = document.querySelectorAll(".ban_item");
      console.log(bannersize);
      document.querySelector(".header .head_main").style.zoom = 1;
      for (let i = 0; i < bannersize.length; i++) {
        bannersize[i].style.fontSize = "23px";
      }
      for (let i = 0; i < banitem.length; i++) {
        banitem[i].style.fontSize = "23px";
      }

      document.querySelector(".header").style.zoom = 1;
      document.querySelector(".hot").style.zoom = 1.5;
      document.querySelector(".big_cate").style.zoom = 1.5;
      document.querySelector(".category").style.zoom = 1.5;
      document.querySelector(".big_cate").style.zoom = 1.5;
      document.querySelector(".lastBom").style.zoom = 1.5;
      document.querySelector(".classleft").style.zoom = 1.5;
      document.querySelector(".ciYun").style.height = "526px";
      document.querySelector(".ciYun").style.opacity = "1";
    } else {
      document.querySelector(".header").style.zoom = 1;
      document.querySelector(".bannerBox").style.zoom = 1;
      document.querySelector(".hot").style.zoom = 1;
      document.querySelector(".big_cate").style.zoom = 1;
      document.querySelector(".category").style.zoom = 1;
      document.querySelector(".big_cate").style.zoom = 1;
      document.querySelector(".lastBom").style.zoom;
      document.querySelector(".classleft").style.zoom = 1;
      document.querySelector(".ciYun").style.height = "500px";
      document.querySelector(".ciYun").style.opacity = "1";
    }
    window.onresize = function () {
      that.myChart.resize();
    };
  },
  methods: {
    // 点击分类===
    toggleClass(str) {
      if (this.classActive == str) {
      } else {
        this.classActive = str;
        if (str == "推荐") {
          this.classList = this.navObj.commend;
        } else if (str == "热搜") {
          this.classList = this.navObj.hot;
        } else if (str == "最近更新") {
          this.classList = this.navObj.news;
        }
      }
    },
    enter(index) {
      this.activeIndex = index;
      this.$refs.banner.setActiveItem(index);
    },
    leave(index) {},
    change(index, old) {
      this.activeIndex = index;
    },
    // 切换到新闻详情页
    gonews(id) {
      this.$router.push({
        path: "/newsList",
        query: {
          id: id,
        },
      });
    },
    // 切换情报分类大分类
    toggleCate(index) {
      if (index == this.cateIndex) {
      } else {
        this.cateIndex = index;
        var datas = this.allCates;
        for (var i = 0; i < datas.length; i++) {
          if (datas[i].name == index) {
            this.informationList = JSON.parse(
              JSON.stringify(this.allCates[i].child)
            );
            this.informationLists = JSON.parse(
              JSON.stringify(this.allCates[i].child)
            );
          }
        }
      }
    },
    // 获取首页新闻轮播图
    getBanner() {
      GetHomeNews().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.banner = data.result;
        }
      });
    },
    // 跳转到文档页面
    goTxml(obj) {
      this.$router.push({
        path: "/trilalXml",
        query: {
          textid: obj.id,
          type: obj.infoType,
        },
      });
    },
    // 打开反馈
    openFack() {
      this.feedBack = true;
    },
    // 获取词云
    getciyun() {
      getciyun().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.ciyun = data.result;
          var obj = {
            id: 0,
            value: "",
            name: "",
          };
          this.newCiyun = [];
          for (var i = 0; i < this.ciyun.length; i++) {
            this.newCiyun.push({
              id: this.ciyun[i].id,
              value: this.ciyun[i].number,
              name: this.ciyun[i].wordName,
            });
          }
          this.initEcharts();
          // 测试重新登录
          // this.$message.error('token失效，请重新登陆')
          // this.dialog = true
        } else {
          this.$message.error(data.message);
        }
      });
    },
    prev() {
      this.slidename = "slide-left";
      this.show = !this.show;
      var list = this.informationList;
      let popped = list.pop();
      list.unshift(popped);
      this.informationList = list;
    },
    next() {
      this.slidename = "slide-right";
      this.show = !this.show;
      var list = this.informationList;
      let popped = list.shift();
      list.push(popped);
    },
    // 获取首页四大分类
    getNavList() {
      getNav().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.navObj.hot = data.result;
          this.classList = data.result;
        }
      });
    },
    // 获取推荐
    getcomm() {
      getComment({}).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.navObj.commend = data.result;
        }
      });
    },
    // 最近更新
    getNews() {
      getNews({}).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.navObj.news = data.result;
        }
      });
    },
    // 我的更新
    getFootprint() {
      getFootprint({}).then((res) => {
        if (res.status == 250) {
          // this.$message.error('登录超时，请重新登录')
          if (window.localStorage.getItem("token")) {
            // this.showLogin()
          } else {
          }
        }
        var { data } = res;
        if (data.code == 200) {
          this.Footprint = data.result;
          // this.navObj.myUpdata = JSON.parse(data.result)
        }
      });
    },
    table() {
      this.$router.push("/Table/1");
    },
    // 获取情报分类
    getInformationList() {
      getInformation().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          var datas = data.result;
          this.allCates = datas;
          this.cateIndex = datas[0].name;
          this.allCate = datas.slice(0, 8);
          this.informationList = datas[0].child;
          this.allCate1 = datas.slice(8, 13);
          this.allCate2 = datas.slice(13, 21);
        }
      });
    },
    // 获取活跃用户
    getActiveList() {
      getActive().then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.activeList = data.result;
        }
      });
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
    initEcharts() {
      var that = this;
      if (this.myChart == "") {
      } else {
        this.myChart.clear();
      }
      let data = [];
      let randcolor = () => {
        let r = 100 + ~~(Math.random() * 100);
        let g = 135 + ~~(Math.random() * 100);
        let b = 100 + ~~(Math.random() * 100);
        return `rgb(${r}, ${g}, ${b})`;
      };
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.myChart);
      this.myChart = myChart;
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: "item",
          // padding: [0, 15],

          formatter: (params) => {
            const { name, value } = params;
            return `
                    搜索热词：    ${name} <br/>
                    搜索次数：${value}
                `;
          },
        },
        series: [
          {
            type: "wordCloud",
            sizeRange: [12, 80],
            rotationRange: [0, 0],
            textStyle: {
              normal: {
                color: (params) => {
                  return randcolor();
                },
              },
              emphasis: {
                shadowBlur: 10,
                shadowColor: "#333",
              },
            },
            autoSize: {
              enable: true,
              minSize: 6,
            },
            textPadding: 0,
            data: that.newCiyun,
          },
        ],
      });
      myChart.on("click", function (params) {
        if (params.name != undefined) {
          that.$router.push({
            path: "/class",
            query: {
              search: params.name,
            },
          });
        }
      });
    },
  },
};
</script>
<style scoped>
ul,
li {
  list-style: none;
}
div {
  box-sizing: border-box;
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑, sans-serif;
}
ul {
  padding: 0;
  margin: 0;
}
.home {
  box-sizing: border-box;
  width: 100%;
  overflow: hidden;
  padding: 0 0px 36px 0px;
}

.container {
  padding: 20px 30px;
  padding-top: 28px;
}
.bannerBox {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.digest {
  position: absolute;
  z-index: 86;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 66px;
  background-image: url(~@/assets/images/back.png);
  background-repeat: repeat;
  background-position: -9px 0;
}
.digest p {
  font-size: 16px;
  color: #fff;
  line-height: 60px;
  letter-spacing: 1px;
  padding-left: 20px;
}
.el-carousel__indicator--horizontal {
  display: inline-block;
  padding: 12px 4px;
}
/deep/.el-carousel__button {
  display: block;
  opacity: 0.48;
  width: 10px;
  height: 10px;
  background-color: #fff;
  border: none;
  border-radius: 50%;
  outline: 0;
  padding: 0;
  margin: 0;
  cursor: pointer;
  transition: 0.3s;
}
/deep/.el-carousel__indicators--horizontal {
  bottom: 0;
  left: 85%;
  transform: translateX(0);
}
.hot {
  width: 100%;
  /*display: flex;*/
}
.hot_box_left {
  width: 100%;
  /*background: url(~@/assets/images/box.svg)  no-repeat;*/
  background-size: 100% 100%;
}
.hot_box_right {
  /*background: url(~@/assets/images/box.svg)  no-repeat;*/
  background-size: 100% 100%;
}
.hot_item {
  width: 100%;
  padding-top: 10px;
  margin-bottom: 20px;
}
.hot_item ul {
  height: 448px;
  position: relative;
}
.hot_box_left .hot_item:last-child ul:before {
  display: none;
}
.hot_box_right .hot_item {
  max-width: 100%;
}
.hot_item {
  width: 100%;
  height: 100%;
  padding: 10px 30px;
  padding-bottom: 20px;
}
.hot_item:last-child {
  border: 0;
}
.hot_item > p {
  border-bottom: 2px solid #1e3e74;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #7ba7db;
  height: 42px;
}
.hot_item > p .active {
  color: whitesmoke;
  background: url("../../assets/images/button.png") no-repeat;
}
.hot_item > p span {
  display: inline-block;
  cursor: pointer;
  margin-right: 20px;
  padding: auto;
  width: 124px;
  background: url(../../assets/images/nobutton.png) no-repeat;
  text-align: center;
  line-height: 42px;
  height: 42px;
}
.hot_item li {
  height: 63px;
}
.hot_item li p {
  margin: 0;
}
.hot_item li p:nth-child(2) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-size: 14px;
  color: #999;
}

.hot_item ul {
  padding: 0 30px;
  list-style: none;
}
.hot .hot_box_right .hot_item ul::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}

.hot .hot_box_right .hot_item ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
.hot_item li {
  margin-top: 30px;
}
.hot_item li:nth-child(1) {
  margin-top: 0;
}
.hot_item li p:nth-child(1) {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.hot_item li p:nth-child(1):hover {
  color: #0ab6f2;
}
.hot_item li p:nth-child(2) {
  margin-top: 5px;
  font-size: 16px;
  color: #6488b3;
}
.hot_item .time_line i {
  margin-right: 10px;
  color: #fff;
  font-size: 20px;
  vertical-align: middle;
}
.hot_item .time_line span {
  font-size: 14px;
  color: #fff;
}
.hot_item .content {
  margin-top: 10px;
  height: 38px;
  padding: 0 0 0 30px;
  font-size: 14px;
  color: #999;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.big_cate {
  display: flex;
  justify-content: space-between;
}
.class.foot {
  width: 49%;
}
.class.user {
  width: 49%;
}
.class {
  box-sizing: border-box;
  width: 121px;

  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: #ffffff;
  height: 43px;
  line-height: 43px;
  padding-left: 20px;
  border-bottom: 2px solid #1e3e74;
  display: inline-block;
  background: url(../../assets/images/button.png) no-repeat;
}
.noactive {
  font-size: 16px;
}
.class.right {
  flex: 1;
  margin-left: 20px;
  margin-right: 20px;
}
.category .left {
  width: 100%;
}
.category .content_item > p {
  width: 95%;
  border-bottom: none;
}
.category .right {
  width: 100%;
}
.category .right .content_item {
  width: 100%;
  max-width: 100%;
  padding-top: 40px;
  padding-bottom: 40px;
}
.category .right .content_item {
}
.classBox {
  /*display: flex;*/
  justify-content: space-between;
}
.content_center {
  flex: 1;
  overflow: hidden;
  padding: 5px;
}
.content_center .content_item ul li {
  position: relative;
  /*height: 45px;*/
}
.content_center .content_item ul li div {
  position: absolute;
  left: 5px;
  top: 3px;
}
.category .content_item {
  max-width: 49%;
  min-width: 49%;
  width: 100%;
  height: 100%;
  margin-right: 2%;
  padding: 0 30px;
  background: rgb(21, 53, 105);
}
/deep/.content_center .content_item {
  box-shadow: 0 0 5px rgb(8, 24, 57);
}
.right .content_item {
  border: 0;
}
.content_item > p {
  width: 75%;
  height: 35px;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: rgb(254, 254, 254);
  border-bottom: 2px solid rgb(115, 138, 177);
}
.content_item li {
  width: 95%;
  margin: 0 auto;
  box-sizing: border-box;
  cursor: pointer;
  margin-top: 18px;
  padding: 3px 20px;
  font-size: 16px;
  color: #fff;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /*line-height: 30px;*/
  /*text-overflow:ellipsis;*/
  /*white-space:nowrap*/
}
.content_item li:hover {
  color: #0ab6f2;
}
.boxItem {
  height: 40px;
  line-height: 28px;
  display: flex;
}
.boxItem span:nth-child(1) {
  position: relative;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  width: 26px;
  height: 26px;
  line-height: 26px;
  border-radius: 50%;
  text-align: center;
  background: rgb(41, 92, 138);
}
.category .right .content_box:nth-child(1) span:nth-child(1) {
  background: rgb(131, 38, 39);
  border: none;
  color: #fff;
}
.category .right .content_box:nth-child(2) span:nth-child(1) {
  background: rgb(133, 68, 31);
  border: none;
  color: #fff;
}
.category .right .content_box:nth-child(3) span:nth-child(1) {
  background: rgb(140, 134, 43);
  border: none;
  color: #fff;
}
.category .right .content_box:nth-child(4) span:nth-child(1) {
  background: rgb(89, 137, 44);
  border: none;
  color: #fff;
}
.category .right .content_box:nth-child(5) span:nth-child(1) {
  background: rgb(57, 137, 76);
  border: none;
  color: #fff;
}
.category .right .content_box:nth-child(6) span:nth-child(1) {
  background: rgb(57, 137, 115);
  border: none;
  color: #fff;
}

.content_item .content_box:last-child span:nth-child(1):before {
  display: none;
}
.boxItem span:nth-child(2) {
  flex: 1;
  padding-left: 50px;
}
.boxItem {
  color: #fff;
  font-size: 14px;
  /*font-weight: 700;*/
}
.footer {
  display: flex;
  box-sizing: border-box;
}
.footer .left {
  width: 100%;
}
.footer .left .class {
  width: 100%;
  height: 46px;
  margin-left: 30px;
}
.footer .left > p {
}
.footer .right {
  flex: 1;
}
.footer .right .footer_item {
  width: 100%;
  height: 100%;
  margin-right: 20px;
  padding: 0 30px;
}
.footer_item > p {
  width: 75%;
  height: 35px;
  font-weight: 700;
  font-style: normal;
  font-size: 20px;
  color: rgb(254, 254, 254);
  border-bottom: 2px solid rgb(115, 138, 177);
}
#value {
  max-width: 100%;
  height: 410px;
}
.footer .right li span:first-child {
  display: inline-block;
  width: 10px;
  text-align: center;
  margin-right: 20px;
}
.footer .right li span {
  margin-top: 20px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.988235294117647);
  font-weight: 700;
}
.slide-left-enter {
  transform: translateX(-100%);
}

.slide-left-enter-active {
  transition: transform 0.2s;
}

.slide-left-enter-to {
  transform: translateX(0);
}

.slide-left-leave {
  transform: translateX(0);
}

.slide-left-leave-active {
  transition: transform 0.5s;
}

.slide-left-leave-to {
  transform: translateX(-100%);
}

.slide-right-enter {
  transform: translateX(100%);
}

.slide-right-enter-active {
  transition: transform 0.2s;
}

.slide-right-enter-to {
  transform: translateX(0);
}

.slide-right-leave {
  transform: translateX(0);
}

.slide-right-leave-active {
  transition: transform 0.5s;
}

.slide-right-leave-to {
  transform: translateX(100%);
}
/deep/.el-carousel {
  width: 100%;
}
.bannerImage {
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: 0 auto;
  /*width: 100%;*/
  /*height: 100%;*/
  /*max-width: 100%;*/
  /*max-height: 100%;*/
  /*object-fit: cover;*/
}
.cate {
  margin-bottom: 15px;
}
.cateItem {
  display: inline-block;
  padding: 4px 10px;
  color: #00f0ff;
  font-size: 18px;
  cursor: pointer;
  margin-right: 10px;
  border: 1px solid #00f0ff;
  border-radius: 6px;
}
.cateItem:hover {
  color: #fff;
}
.cateItem.active {
  color: #fff;
  background: #00abcc;
}
.ban_right {
  display: flex;
  flex-flow: column;
  height: 100%;
  color: #6e95ba;
}
.ban__right {
  width: 24%;
  margin-left: 20px;
  padding: 20px;
  background: rgb(15, 50, 94, 0.6);
  border: 1px solid #397fa3;
}
.ban_right .ban_item {
  cursor: pointer;
  height: 16%;
  font-size: 18px;
  font-weight: 700;
  line-height: 3.5;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
  padding: 0 15px;
}
.ban_right .ban_item.active {
  color: #fff;
  background: #345791;
}

.inlineBlock {
  margin-bottom: 10px;
}
.inlineBlock > div {
  display: inline-block;
  padding: 8px;
  padding-left: 15px;
  border: 1px dashed rgba(255, 255, 255, 0.3);
  margin-right: 15px;
}
.footer {
  box-sizing: border-box;
  border: 1px solid #397fa3;
  background: rgb(15, 50, 94, 0.6);
  margin-top: 40px;
}
.hot_box > .hot_item {
}
</style>