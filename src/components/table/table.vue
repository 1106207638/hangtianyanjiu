<!--  -->
<template>
  <div class="bg-box" v-loading="loading">
    <div class="container">
      <div class="tabs">
        <ul>
          <li
            :class="isActiveClass == item.id ? 'active' : ''"
            v-for="(item, index) in newArr"
            @click="toggleOne(item.id, item.name)"
            :key="index"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="table">
        <div class="tab">
          <ul>
            <li
              :class="isActive == item.id ? 'active' : ''"
              v-for="(item, index) in cuttingEdgeObj"
              :key="index"
              @click="SendClass(item.id, item.childnode)"
            >
              {{ item.childnode }}
              <span></span>
            </li>
          </ul>
          <el-select
            v-model="value"
            @change="changeStar"
            :popper-append-to-body="false"
            placeholder="请选择"
            size="medium"
          >
            <el-option
              v-for="(item, index) in startList"
              :key="index"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div class="tab">
          <ul v-if="!isInOut">
            <li
              v-if="isActive != activeDifference"
              :class="tabIndex == index ? 'active' : ''"
              v-for="(item, index) in NationaList"
              :key="index"
              @click="toggle(index, item.itemValue)"
            >
              {{ item.itemText }}
              <span v-if="index != NationaList.length - 1"></span>
            </li>
          </ul>
          <div v-else style="flex: 1">
            <el-date-picker
              @change="change"
              v-model="year"
              format="yyyy"
              value-format="yyyy"
              type="year"
              placeholder="选择年"
              size="medium"
            >
            </el-date-picker>
          </div>
        </div>

        <el-table
          v-if="!isInOut && !ispersonnel && !isassessment"
          :data="cuttingEdgeList"
          :max-height="mheight"
          border:false
          style="width: 100%; text-align: center !important"
          :header-cell-style="{ color: '#CAEDFF' }"
          :cell-style="changeCellstyle"
        >
          <el-table-column
            fixed
            prop="publishYear"
            width="200"
            label="年份"
          ></el-table-column>
          <el-table-column
            fixed
            prop="incumbentPresident"
            width="200"
            label="在任领导人"
          ></el-table-column>
          <el-table-column
            :prop="item.childnode"
            :width="item.width"
            align="center"
            v-for="(item, index) in sendClassList"
            :key="index"
            :label="item.childnode"
          >
            <template slot-scope="scope">
              <!--              {{ cuttingEdgeList[scope.$index][item.childnode].ids }}-->
              <div
                class="item"
                v-for="(item1, index1) in cuttingEdgeList[scope.$index][
                  item.childnode
                ].child"
                style="border: 1px solid green"
              >
                <div @click="look(item1)" style="cursor: pointer">
                  {{ item1.name }}
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="isInOut"
          :data="inoutList"
          :max-height="mheight"
          border
          style="
            width: 100%;
            text-align: center !important ;
            border: 5px solid blue;
          "
        >
          <el-table-column fixed prop="month" label="月份"></el-table-column>
          <el-table-column
            :width="item.width"
            align="center"
            v-for="(item, index) in attributeList"
            :key="index"
            :label="item.name"
          >
            <template slot-scope="scope">
              <!--              {{ cuttingEdgeList[scope.$index][item.childnode].ids }}-->
              <div
                class="item"
                v-for="(item1, index1) in inoutList[scope.$index][item.value]"
              >
                {{ item1 }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="ispersonnel"
          :data="personnelList"
          :max-height="mheight"
          border
          style="width: 100%; text-align: center !important"
        >
          <el-table-column
            fixed
            prop="year"
            width="200"
            label="年份"
          ></el-table-column>
          <el-table-column
            align="center"
            v-for="(item, index) in sendClassList"
            :key="index"
            :label="item.childnode"
          >
            <template slot-scope="scope">
              <div v-if="personnelList[scope.$index].type == item.childnode">
                {{ personnelList[scope.$index].count }}
              </div>
              <div v-else>0</div>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-if="isassessment"
          :data="cuttingEdgeList"
          :max-height="mheight"
          border
          style="width: 100%; text-align: center !important"
        >
          <el-table-column
            fixed
            prop="publishYear"
            label="年份"
          ></el-table-column>
          <el-table-column
            fixed
            prop="incumbentPresident"
            label="在任领导人"
          ></el-table-column>
          <el-table-column
            :prop="item.childnode"
            align="center"
            v-for="(item, index) in sendClassList"
            :key="index"
            :label="item.childnode"
          >
            <template slot-scope="scope">
              <!--              {{ cuttingEdgeList[scope.$index][item.childnode].ids }}-->
              <div
                v-if="cuttingEdgeList[scope.$index][item.childnode].length != 0"
              >
                {{ cuttingEdgeList[scope.$index][item.childnode].child.length }}
              </div>
            </template>
          </el-table-column>
        </el-table>

        <!--        <div class="dataNone"  v-else>-->
        <!--          <img src="~@/assets/images/dataNone.png" alt="">-->
        <!--          <p>暂无更多数据</p>-->
        <!--        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import Headers from "../../common/header";
import Footer from "../../common/footer";
import {
  getCuttingEdge,
  gettoggleCuttingEdge,
  getClassOrder,
  getSendClass,
  Nationa,
  InAndOut,
  personnel,
} from "../../api/apis";
export default {
  beforeRouteUpdate(to, form, next) {
    next();
    this.isNum();
  },
  components: {
    Headers,
    Footer,
  },
  computed: {
    getSearchKey() {
      return this.$store.state.isSmall;
    },
  },
  watch: {
    getSearchKey: {
      handler(newValue, oldValue) {
        var that = this;
        if (newValue) {
          this.mheight = document.body.clientHeight - 450;
        } else {
          this.mheight = document.body.clientHeight - 300;
        }
      },
    },
  },
  data() {
    return {
      mheight: 0,
      loading: false,
      personnelList: [],
      inoutList: [],
      attributeList: [],
      // 是否为天空进出活动
      isInOut: false,
      ispersonnel: false,
      isassessment: false,
      renderTable: false,
      newArr: [],
      isActiveClass: 1,
      // 星级列表
      startList: [
        {
          value: "-1",
          label: "全部",
        },
        {
          value: "0",
          label: "无星级",
        },
        {
          value: "1",
          label: "一星",
        },
        {
          value: "2",
          label: "二星",
        },
        {
          value: "3",
          label: "三星",
        },
        {
          value: "4",
          label: "四星",
        },
        {
          value: "5",
          label: "五星",
        },
      ],
      value: "-1",
      year: "",
      theade: [
        "四年防务评估",
        "国防战略",
        "军事战略",
        "国家太空战略",
        "太空政策",
        "军种太空战略",
        "太空联盟",
      ],
      isActive: 0,
      tabIndex: 0,
      cuttingEdgeObj: {},
      cuttingEdgeList: [],
      sendClassList: [],
      activeDifference: "",
      // 一级分类的名称
      oneClassName: "",
      // 二级分类的名称
      sendClassName: "",
      // 国家
      NationaList: [],
      tabs: [
        {
          name: "美国",
        },
        {
          name: "俄罗斯",
        },
        {
          name: "日本",
        },
        {
          name: "英国",
        },
        {
          name: "法国",
        },
        {
          name: "德国",
        },
      ],
      tableData: [
        {
          date: "00时代",
          name: "王小虎",
          address: "美国太空战略.doc",
        },
        {
          date: "90时代",
          name: "王小虎",
          address: "美国太空战略.doc",
        },
        {
          date: "80时代",
          name: "王小虎",
          address: "美国太空战略.doc",
        },
        {
          date: "xxx时代",
          name: "王小虎",
          address: "xxx太空战略.doc",
        },
        {
          date: "xxx时代",
          name: "王小虎",
          address: "xxx太空战略.doc",
        },
        {
          date: "xxx时代",
          name: "王小虎",
          address: "xxx太空战略.doc",
        },
        {
          date: "xxx时代",
          name: "王小虎",
          address: "xxx太空战略.doc",
        },
        {
          date: "xxx时代",
          name: "王小虎",
          address: "xxx太空战略.doc",
        },
        {
          date: "xxx时代",
          name: "王小虎",
          address: "xxx太空战略.doc",
        },
        {
          date: "xxx时代",
          name: "王小虎",
          address: "xxx太空战略.doc",
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getNationaList();
    this.year = new Date().getFullYear().toString();
    if (this.$store.state.isSmall) {
      this.mheight = document.body.clientHeight - 450;
    } else {
      this.mheight = document.body.clientHeight - 300;
    }
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 获取查询条件（国家和tabs)
    // 获取情报列表
    // this.getFootprint()
    this.getTabs();
    console.log(document.getElementsByTagName("body")[0].style.zoom);
  },
  methods: {
    changeCellstyle(row) {
      if (row.column.label === "在任领导人") {
        return " background: rgb(102,138,204,0.2);color: #CAEDFF";
      } else {
        return " background: rgb(0,103,198,0.2); color: #CAEDFF";
      }
    },
    change(val) {
      this.year = val;
      this.toggleCuttingEdge();
    },
    // 选择星级
    changeStar(val) {
      this.value = val;
      this.toggleCuttingEdge();
    },
    // 获取一级分类
    async getTabs() {
      var res = await getClassOrder();
      var { data } = res;
      if (data.code == 200) {
        var datas = data.result;
        var newArr = [];
        var obj1 = {
          name: "太空战略政策法规",
          id: "1",
          child: [],
        };
        var obj2 = {
          name: "太空组织人员",
          id: "2",
          child: [],
        };
        var obj3 = {
          name: "太空技术装备",
          id: "3",
          child: [],
        };
        var obj4 = {
          name: "太空活动",
          id: "4",
          child: [],
        };
        var obj5 = {
          name: "太空潜力",
          id: "5",
          child: [],
        };
        var obj6 = {
          name: "太空战略评估",
          id: "6",
          child: [],
        };
        for (var i = 0; i < datas.length; i++) {
          if (
            datas[i].childnode == "太空战略" ||
            datas[i].childnode == "太空政策" ||
            datas[i].childnode == "太空法规" ||
            datas[i].childnode == "太空军民融合" ||
            datas[i].childnode == "太空体系"
          ) {
            obj1.child.push(datas[i]);
          }
          if (
            datas[i].childnode == "太空国家" ||
            datas[i].childnode == "太空地区" ||
            datas[i].childnode == "太空组织" ||
            datas[i].childnode == "太空领导人" ||
            datas[i].childnode == "太空人员"
          ) {
            obj2.child.push(datas[i]);
          }
          if (
            datas[i].childnode == "太空新技术" ||
            datas[i].childnode == "太空装备"
          ) {
            obj3.child.push(datas[i]);
          }
          if (
            datas[i].childnode == "太空演习" ||
            datas[i].childnode == "太空进出活动" ||
            datas[i].childnode == "太空利用活动" ||
            datas[i].childnode == "太空控制活动" ||
            datas[i].childnode == "太空探索活动"
          ) {
            obj4.child.push(datas[i]);
          }
          if (
            datas[i].childnode == "太空投资" ||
            datas[i].childnode == "太空能力"
          ) {
            obj5.child.push(datas[i]);
          }
          if (
            datas[i].childnode == "太空领域威胁挑战" ||
            datas[i].childnode == "太空安全评估"
          ) {
            obj6.child.push(datas[i]);
          }
          if (datas[i].childnode == "太空国家") {
            this.activeDifference = datas[i].id;
          }
        }
        newArr.push(obj1, obj2, obj3, obj4, obj5, obj6);
        this.newArr = newArr;
        this.cuttingEdgeObj = newArr[0].child;
        this.SendClass(
          this.cuttingEdgeObj[0].id,
          this.cuttingEdgeObj[0].childnode
        );
      }
    },
    // 切换一级大分类
    toggleOne(index, name) {
      if (this.isActiveClass == index) {
      } else {
        this.isActiveClass = index;
        this.cuttingEdgeObj = this.newArr[index - 1].child;
        this.SendClass(
          this.cuttingEdgeObj[0].id,
          this.cuttingEdgeObj[0].childnode
        );
      }
    },
    // 根据一级分类的id查询二级分类
    async SendClass(id, name) {
      if (this.isActive == id) {
      } else {
        this.loading = true;
        this.isActive = id;
        this.oneClassName = name;
        if (this.isActiveClass == 4 && name == "太空进出活动") {
          this.isInOut = true;
          this.ispersonnel = false;
          this.isassessment = false;
        } else if (this.isActiveClass == 2 && name == "太空人员") {
          this.isInOut = false;
          this.ispersonnel = true;
          this.isassessment = false;
        } else if (this.isActiveClass == 6 && name == "太空安全评估") {
          this.isInOut = false;
          this.ispersonnel = false;
          this.isassessment = true;
        } else {
          this.isInOut = false;
          this.ispersonnel = false;
          this.isassessment = false;
        }
        var res = await getSendClass({
          pid: id,
        });
        var { data } = res;
        if (data.code == 200) {
          var datas = data.result;
          for (var i = 0; i < datas.length; i++) {
            datas[i].width = "";
          }
          console.log(datas);
          this.sendClassList = datas;
          this.toggleCuttingEdge();
        } else {
          this.loading = false;
        }
      }
    },
    // 查询情报分类的国家
    async getNationaList() {
      var res = await Nationa();
      var { data } = res;
      if (data.code == 200) {
        this.NationaList = data.result;
        this.sendClassName = data.result[0].itemValue;
      }
    },
    // 更改头部tab
    toggleIndex(index) {
      this.isActive = index;
      // this.getFootprint()
    },
    // 切换更新情报列表
    async toggleCuttingEdge() {
      if (this.isActiveClass == 4 && this.oneClassName == "太空进出活动") {
        InAndOut({ year: this.year, id: this.isActive }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            console.log(data);
            var datas = data.result[0];
            var arr = [];
            for (var key in datas) {
              if (key.indexOf("list") != -1) {
                arr.push({
                  key: key.substring(0, key.length - 4),
                  value: key,
                  name: datas[key.substring(0, key.length - 4)],
                });
              }
            }
            console.log(arr);
            this.attributeList = arr;
            this.inoutList = data.result;
          }
        });
      } else if (this.isActiveClass == 2 && this.oneClassName == "太空人员") {
        personnel({
          nation: this.sendClassName,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            this.personnelList = data.result;
          }
        });
      } else {
        if (this.isActive == this.activeDifference) {
          var obj = {
            infoType: this.oneClassName,
            nationality: "",
            star: this.value,
          };
        } else {
          var obj = {
            infoType: this.oneClassName,
            nationality: this.sendClassName,
            star: this.value,
          };
        }
        var res = await gettoggleCuttingEdge(obj);
        var { data } = res;
        if (data.code == 200) {
          var datas = data.result;
          if (datas.length == 0) {
            this.cuttingEdgeList = [];
          } else {
            // 创建表格的结构数据
            var tableData = [];
            var tableData1 = [];
            // 获取当前的年份
            var nowYear = new Date().getFullYear();
            if (this.isActive == this.activeDifference) {
              for (var i = 0; i < datas.length; i++) {
                var obj = {
                  publishYear: Number(datas[i].publishYear),
                  incumbentPresident: datas[i].incumbentPresident,
                  infoTypeTwo: datas[i].infoTypeTwo,
                };
                var sendClass = this.sendClassList;
                for (var j = 0; j < sendClass.length; j++) {
                  var str = sendClass[j].childnode;
                  obj[str] = [];
                }
                tableData.push(obj);
              }
              console.log(tableData);
              var obj = {};
              var resultObj = [];
              for (var t = 0; t < tableData.length; t++) {
                var realyear = tableData[t].publishYear; //年份
                var realincumbentPresident =
                  tableData[t].realincumbentPresident; //总统
                if (t == 0 || realyear == "") {
                  resultObj.push(tableData[t]);
                } else if (t == tableData.length - 1) {
                  resultObj.push(tableData[t]);
                } else {
                  if (realyear == "") {
                    resultObj.push(tableData[t]);
                  } else {
                    var prrevyear = tableData[t - 1].publishYear; //上一年的年份
                    if (prrevyear == "") {
                      resultObj.push(tableData[t]);
                    } else {
                      var prevrealincumbentPresident =
                        tableData[t - 1].prevrealincumbentPresident; //上一年的总统
                      // if(prrevyear+1 == realyear ) {
                      //   resultObj.push(tableData[t])
                      // } else

                      if (
                        prrevyear == realyear &&
                        realincumbentPresident != prevrealincumbentPresident
                      ) {
                        resultObj.push(tableData[t]);
                      } else if (prrevyear + 1 < realyear) {
                        // realyear 2002
                        for (var j = prrevyear; j < realyear; j++) {
                          var obj = {
                            publishYear: j + 1,
                            incumbentPresident: "",
                            infoTypeTwo: "",
                          };
                          var sendClass = this.sendClassList;
                          for (var z = 0; z < sendClass.length; z++) {
                            var str = sendClass[z].childnode;
                            obj[str] = [];
                          }
                          resultObj.push(obj);
                        }
                      } else if (prrevyear + 1 == realyear) {
                        resultObj.push(tableData[t]);
                      }
                    }
                  }
                }
              }

              for (var i = 0; i < resultObj.length; i++) {
                for (var j = 0; j < datas.length; j++) {
                  if (
                    resultObj[i].publishYear == datas[j].publishYear &&
                    resultObj[i].incumbentPresident ==
                      datas[j].incumbentPresident
                  ) {
                    resultObj[i].incumbentPresident =
                      datas[j].incumbentPresident;
                    resultObj[i][datas[j].infoTypeTwo] = datas[j];
                    var arr = datas[j].ids.split(",");
                    var newArr = [];
                    for (var q = 0; q < arr.length; q++) {
                      var str = arr[q];
                      var newsArr = arr[q].lastIndexOf("_");
                      newArr.push({
                        name: str.substring(0, newsArr + 1),
                        id: str.substring(newsArr + 1, str.length),
                      });
                    }
                    resultObj[i][datas[j].infoTypeTwo].child = newArr;
                  }
                }
              }
              var sendClassList = this.sendClassList;
              for (var j = 0; j < resultObj.length; j++) {
                for (var i = 0; i < sendClassList.length; i++) {
                  if (resultObj[j][sendClassList[i].childnode].length != 0) {
                    sendClassList[i].width = 800;
                  } else {
                    sendClassList[i].width = 300;
                  }
                }
              }
              this.sendClassList = sendClassList;
              this.cuttingEdgeList = resultObj;
            } else {
              var resultObj = [];
              var years = [];
              var innn = 0;
              for (var i = 0; i < datas.length; i++) {
                if (datas[i].publishYear == "") {
                  innn++;
                  if (innn == 1) {
                    var obj = {
                      publishYear: "",
                      incumbentPresident: "",
                      infoTypeTwo: "",
                    };
                    var sendClass = this.sendClassList;
                    for (var j = 0; j < sendClass.length; j++) {
                      var str = sendClass[j].childnode;
                      obj[str] = [];
                    }
                    var sendClass = this.sendClassList;
                    for (var j = 0; j < sendClass.length; j++) {
                      var str = sendClass[j].childnode;
                      obj[str] = [];
                    }
                    resultObj.push(obj);
                  }
                }
                if (datas[i].publishYear != "" && datas[i].publishYear) {
                  years.push(datas[i].publishYear);
                }
              }
              for (var i = years[0]; i < nowYear; i++) {
                var obj = {
                  publishYear: i,
                  incumbentPresident: "",
                  infoTypeTwo: "",
                };
                var sendClass = this.sendClassList;
                for (var j = 0; j < sendClass.length; j++) {
                  var str = sendClass[j].childnode;
                  obj[str] = [];
                }
                var sendClass = this.sendClassList;
                for (var j = 0; j < sendClass.length; j++) {
                  var str = sendClass[j].childnode;
                  obj[str] = [];
                }
                resultObj.push(obj);
              }
              for (var i = 0; i < resultObj.length; i++) {
                for (var j = 0; j < datas.length; j++) {
                  if (resultObj[i].publishYear == datas[j].publishYear) {
                    resultObj[i].incumbentPresident =
                      datas[j].incumbentPresident;
                    resultObj[i][datas[j].infoTypeTwo] = datas[j];
                    var arr = datas[j].ids.split(",");
                    var newArr = [];
                    for (var q = 0; q < arr.length; q++) {
                      var str = arr[q];
                      var newsArr = arr[q].lastIndexOf("_");
                      newArr.push({
                        name: str.substring(0, newsArr),
                        id: str.substring(newsArr + 1, str.length),
                      });
                    }
                    resultObj[i][datas[j].infoTypeTwo].child = newArr;
                  }
                }
              }
              var sendClassList = this.sendClassList;
              for (var j = 0; j < resultObj.length; j++) {
                for (var i = 0; i < sendClassList.length; i++) {
                  if (resultObj[j][sendClassList[i].childnode].length != 0) {
                    sendClassList[i].width = 800;
                  } else {
                    sendClassList[i].width = 300;
                  }
                }
              }
              this.sendClassList = sendClassList;
              this.cuttingEdgeList = resultObj;
            }
          }
        }
      }
      this.loading = false;
    },
    isNum() {
      this.isActive = this.$route.params.id;
    },
    look(obj) {
      this.$router.push({
        path: "/TrilalXml",
        query: {
          textid: obj.id,
          type: this.oneClassName,
        },
      });
    },
    toggle(index, name) {
      if (index == this.tabIndex) {
        return false;
      }
      this.tabIndex = index;
      this.sendClassName = name;
      this.toggleCuttingEdge();
    },
  },
};
</script>
<style scoped>
.bg-box {
  width: 100%;
  background-color: #f2f2f2;
  background: #1e3e74;
}
/* @import url(); 引入css类 */
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
div {
  box-sizing: border-box;
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
}
table,
tr,
td {
  box-sizing: content-box;
}
.container {
  margin: 0 auto;
  padding: 20px 30px;
}
.tabs {
}
.tabs li {
  vertical-align: bottom;
  display: inline-block;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
  font-weight: bold;
  padding: 0 20px;
  color: #fff;
  text-align: center;
  background: #2f5799;
  border-radius: 10px 0px 10px 0px;
  cursor: pointer;
  margin-right: 12px;
}

.tabs li.active {
  padding: 0 18px;
  line-height: 50px;
  font-weight: 700;
  font-size: 18px;
  font-weight: bold;
  color: #ffffff;
  height: 50px;
  background: #06789e;
  border-radius: 10px 0px 10px 0px;
  border: 2px solid #00cfff;
}
.table {
  background: url(../../assets/images/bigbg.jpg);
  padding: 20px 20px;
  border: 1px solid #397fa3;
}
.tab {
  display: flex;
  margin-bottom: 20px;
}
.tab > ul {
  flex: 1;
}
.tab > ul li {
  display: inline-block;
  font-size: 18px;
  color: #eeeeee;
  cursor: pointer;
}
.tab > ul li.active {
  font-weight: 700;
  font-size: 20px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #3cdaff;
}
.tab > ul li span {
  display: inline-block;
  margin: 0 20px;
}
.el-button--mini,
.el-button--mini.is-round {
  padding: 7px 7px;
}
.el-select-dropdown__item {
  padding: 0 20px;
}
.el-table th {
  text-align: center !important;
}
/deep/.el-table th {
  text-align: center;
}
/deep/.el-table td {
  text-align: center;
}
.dataNone {
  width: 100%;
  height: 400px;
  text-align: center;
}
.dataNone img {
  margin-top: 50px;
}
.dataNone p {
  font-size: 14px;
  font-weight: bold;
}
.el-button--mini {
  width: 90%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.el-button + .el-button {
  margin-top: 5px;
  margin-left: 0px;
}
.el-table--border {
  border: 1px solid #ccc;
  color: #000;
  font-weight: bold;
}

/deep/.el-table td {
  border-bottom: 1px solid #ccc;
  color: #000;
  font-weight: bold;
}
/deep/.el-table th.is-leaf {
  border-bottom: 1px solid #ccc;
  color: #000;
  font-weight: bold;
}
/deep/.el-table--border td,
/deep/.el-table--border th {
  border-right: 1px solid #ccc;
  color: #000;
  font-weight: bold;
}
/*/deep/.el-table__fixed-body-wrapper {*/
/*  top: 46px !important;*/
/*}*/
.item {
  margin-top: 5px;
}
.classSentend {
  margin-top: 10px;
}
.classSentend li.active {
  color: #fff;
  background: #0ab6f2;
}
.classSentend li {
  background: #fff;
  color: #000;
}
/deep/.el-table__body-wrapper {
  height: 504px;
}
/deep/.el-table__row .el-button {
  border: none;
}
/deep/.el-table {
  background: rgba(255, 255, 255, 0.6);
}

/deep/.el-input__inner {
  background-color: #2e4f82;
  color: #fff;
}
/deep/.el-table th {
  background-color: transparent;
}
/deep/.el-table tr {
  background-color: transparent;
}
</style>