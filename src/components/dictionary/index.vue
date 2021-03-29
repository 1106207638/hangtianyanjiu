<!-- 数据字典 -->
<template>
  <div class="page">
    <!--    <Headers />-->
    <div class="containerr">
      <div class="container">
        <header>
          <span>词典查询服务</span>
          <!--          <div class="btns">-->
          <!--            <el-button>-->
          <!--              <i class="el-icon-refresh"></i>-->
          <!--              刷新-->
          <!--            </el-button>-->
          <!--            <el-button @click="goBack">-->
          <!--              <i class="el-icon-arrow-left"></i>-->
          <!--              返回-->
          <!--            </el-button>-->
          <!--          </div>-->
        </header>
        <el-tabs
          type="card"
          :tab-position="tabPosition"
          v-model="activeName"
          @tab-click="handleClick"
        >
          <el-tab-pane name="first">
            <span slot="label">中文首字母</span>
            <!-- 筛选 -->
            <div class="screen">
              <el-row>
                <el-col :span="4">
                  <el-form :model="numberValidateForm" ref="numberValidateForm">
                    <el-form-item prop="search">
                      <div style="display: flex">
                        <el-input
                          v-model="searchVal"
                          placeholder="请输入查询词条"
                        ></el-input>
                        <el-button
                          style="display: inline-block; margin-left: 5px"
                          type="primary"
                          @click="submitForm"
                          >搜索</el-button
                        >
                      </div>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="18" style="padding: 0 10px">
                  <!--                  <el-button-->
                  <!--                      type="primary"-->
                  <!--                      class="margin-left:20px"-->
                  <!--                      @click="submitForm"-->
                  <!--                  >-->
                  <!--                    <i class="el-icon-search"></i>-->
                  <!--                    查询-->
                  <!--                  </el-button>-->
                  <!--                  <el-button @click="resetForm('numberValidateForm')">-->
                  <!--                    <i class="el-icon-refresh-right"></i>-->
                  <!--                    重置-->
                  <!--                  </el-button>-->
                </el-col>
              </el-row>
            </div>

            <div class="dictionaryBox">
              <div class="leftBox">
                <el-tree
                  v-show="!isearch"
                  :accordion="true"
                  :highlight-current="true"
                  :props="props"
                  :load="loadNode"
                  @node-click="nodeClick"
                  ref="tree"
                  lazy
                >
                </el-tree>
                {{ isSearch }}
                <div v-show="isearch">
                  <div v-show="dictionaryList.length == 0">暂无数据</div>
                  <div v-show="dictionaryList.length != 0">
                    <div
                      :class="
                        item.dictName == activeNames
                          ? 'class_item active'
                          : 'class_item '
                      "
                      v-for="(item, index) in dictionaryList"
                      :key="index"
                      @click="snodeClick(item)"
                    >
                      {{ item.dictName }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="rightBox">
                <div class="checkOut">
                  <div class="cHead">
                    <p v-if="lableObj.dictName != '' && lableObj.dictName">
                      {{ lableObj.dictName }}
                    </p>
                  </div>
                  <div class="cContent">
                    <div v-for="(item, index) in lableObj.sign" :key="index">
                      <div
                        v-show="
                          lableObj['dictAnnotation' + (index + 1)] != '' &&
                          lableObj['dictSource' + (index + 1)] != '' &&
                          lableObj['dictAnnotation' + (index + 1)] &&
                          lableObj['dictSource' + (index + 1)]
                        "
                      >
                        <p
                          v-text="lableObj['dictAnnotation' + (index + 1)]"
                        ></p>
                        <p style="text-align: right">
                          ——来源：{{ lableObj["dictSource" + (index + 1)] }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 检索所有的词 -->
            <!-- 当前选中 -->
          </el-tab-pane>
          <el-tab-pane label="军语" name="second">
            <!-- 筛选 -->
            <div class="screen">
              <el-row>
                <el-col :span="4">
                  <el-form :model="numberValidateForm" ref="numberValidateForm">
                    <el-form-item prop="search">
                      <div style="display: flex">
                        <el-input
                          v-model="searchVal"
                          placeholder="请输入查询词条"
                        ></el-input>
                        <el-button
                          style="display: inline-block; margin-left: 5px"
                          type="primary"
                          @click="submitForm"
                          >搜索</el-button
                        >
                      </div>
                    </el-form-item>
                  </el-form>
                </el-col>
                <el-col :span="18" style="padding: 0 10px">
                  <!--                  <el-button-->
                  <!--                      type="primary"-->
                  <!--                      class="margin-left:20px"-->
                  <!--                      @click="submitForm()"-->
                  <!--                  >-->
                  <!--                    <i class="el-icon-search"></i>-->
                  <!--                    查询-->
                  <!--                  </el-button>-->
                  <!--                  <el-button @click="resetForm('numberValidateForm')">-->
                  <!--                    <i class="el-icon-refresh-right"></i>-->
                  <!--                    重置-->
                  <!--                  </el-button>-->
                </el-col>
              </el-row>
            </div>
            <div class="dictionaryBox">
              <div class="leftBox">
                <el-tree
                  v-show="!isearch"
                  :accordion="true"
                  :highlight-current="true"
                  :props="props1"
                  :load="loadNode1"
                  @node-click="nodeClick1"
                  ref="trees"
                  lazy
                >
                </el-tree>
                <div v-show="isearch">
                  <div v-show="dictionaryList.length == 0">暂无数据</div>
                  <div v-show="dictionaryList.length != 0">
                    <div
                      :class="
                        item.dictName == activeNames
                          ? 'class_item active'
                          : 'class_item'
                      "
                      v-for="(item, index) in dictionaryList"
                      :key="index"
                      @click="snodeClick(item)"
                    >
                      {{ item.dictName }}
                    </div>
                  </div>
                </div>
              </div>
              <div class="rightBox">
                <div class="checkOut">
                  <div class="cHead">
                    <p v-if="lableObj.dictName != ''">
                      {{ lableObj.dictName }}
                    </p>
                  </div>
                  <div class="cContent">
                    <div v-for="(item, index) in lableObj.sign" :key="index">
                      <div
                        v-show="
                          lableObj['dictAnnotation' + (index + 1)] != '' &&
                          lableObj['dictSource' + (index + 1)] != '' &&
                          lableObj['dictAnnotation' + (index + 1)] &&
                          lableObj['dictSource' + (index + 1)]
                        "
                      >
                        <p
                          v-text="lableObj['dictAnnotation' + (index + 1)]"
                        ></p>
                        <p style="text-align: right">
                          ——来源：{{ lableObj["dictSource" + (index + 1)] }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getDataDictionary,
  getMilitary,
  getDictionary,
  gettwoMilitary,
} from "../../api/apis";
import Headers from "../../common/header";
export default {
  components: {
    Headers,
  },
  data() {
    return {
      lauchVal: "",
      searchVal: "",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      props1: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      lableVal: "全部",
      rules: {},
      // 当前卡片id
      activeName: "first",
      activeNum: 0,
      numberValidateForm: {
        search: "",
      },
      tabPosition: "top",
      lable: [
        {
          lable: "全部",
          id: "全部",
        },
        {
          lable: "#",
          id: "#",
        },
        {
          lable: "A",
          id: "a",
        },
        {
          lable: "B",
          id: "b",
        },
        {
          lable: "C",
          id: "c",
        },
        {
          lable: "D",
          id: "d",
        },
        {
          lable: "E",
          id: "e",
        },
        {
          lable: "F",
          id: "f",
        },
        {
          lable: "G",
          id: "g",
        },
        {
          lable: "H",
          id: "h",
        },
        {
          lable: "I",
          id: "i",
        },
        {
          lable: "J",
          id: "j",
        },
        {
          lable: "K",
          id: "k",
        },
        {
          lable: "L",
          id: "l",
        },
        {
          lable: "M",
          id: "m",
        },
        {
          lable: "N",
          id: "n",
        },
        {
          lable: "O",
          id: "o",
        },
        {
          lable: "P",
          id: "p",
        },
        {
          lable: "Q",
          id: "q",
        },
        {
          lable: "R",
          id: "r",
        },
        {
          lable: "S",
          id: "s",
        },
        {
          lable: "T",
          id: "t",
        },
        {
          lable: "U",
          id: "u",
        },
        {
          lable: "V",
          id: "v",
        },
        {
          lable: "W",
          id: "w",
        },
        {
          lable: "X",
          id: "x",
        },
        {
          lable: "Y",
          id: "y",
        },
        {
          lable: "Z",
          id: "z",
        },
      ],
      dictionaryList: [],
      dictionaryList1: [],
      dictionaryList2: [],
      lableObj: {},
      value: "",
      allMilitaryList: [],
      dictId: "",
      //是否为搜索
      isearch: false,
      activeNames: "",
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // this.getDataDictionarys();
    // this.getAllMilitary();
    // this.getDictionaryList(0,this.lableVal)
  },
  watch: {
    lableObj: {
      handler: function (val, oldval) {},
      deep: true, //对象内部的属性监听，也叫深度监听
    },
    searchVal(val) {
      if (val == "") {
        this.isearch = false;
      }
    },
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    filterNode1(value, data) {
      if (!value) return true;
      return data.name.indexOf(value) !== -1;
    },
    nodeClick(data) {
      if (data.sign > 0) {
        var obj = data;
        this.lableObj = obj;
      }
    },
    snodeClick(data) {
      this.activeNames = data.dictName;
      var obj = data;
      this.lableObj = obj;
    },
    nodeClick1(data) {
      if (data.sign > 0) {
        var obj = data;
        this.lableObj = obj;
      }
    },
    loadNode(node, resolve) {
      console.log(node);
      if (node.level === 0) {
        return resolve([
          {
            name: "#",
            id: "#",
          },
          {
            name: "A",
            id: "a",
          },
          {
            name: "B",
            id: "b",
          },
          {
            name: "C",
            id: "c",
          },
          {
            name: "D",
            id: "d",
          },
          {
            name: "E",
            id: "e",
          },
          {
            name: "F",
            id: "f",
          },
          {
            name: "G",
            id: "g",
          },
          {
            name: "H",
            id: "h",
          },
          {
            name: "I",
            id: "i",
          },
          {
            name: "J",
            id: "j",
          },
          {
            name: "K",
            id: "k",
          },
          {
            name: "L",
            id: "l",
          },
          {
            name: "M",
            id: "m",
          },
          {
            name: "N",
            id: "n",
          },
          {
            name: "O",
            id: "o",
          },
          {
            name: "P",
            id: "p",
          },
          {
            name: "Q",
            id: "q",
          },
          {
            name: "R",
            id: "r",
          },
          {
            name: "S",
            id: "s",
          },
          {
            name: "T",
            id: "t",
          },
          {
            name: "U",
            id: "u",
          },
          {
            name: "V",
            id: "v",
          },
          {
            name: "W",
            id: "w",
          },
          {
            name: "X",
            id: "x",
          },
          {
            name: "Y",
            id: "y",
          },
          {
            name: "Z",
            id: "z",
          },
        ]);
      }
      if (node.level > 1) {
        return resolve([]);
      }

      getDictionary({
        tag: 0,
        letter: node.data.id,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          var result = data.result;
          var datas = [];
          for (var i = 0; i < result.length; i++) {
            result[i].name = result[i].dictName;
            result[i].leaf = true;
            datas.push(result[i]);
          }
          resolve(datas);
        }
      });
    },
    loadNode1(node, resolve) {
      if (node.level === 0) {
        getMilitary({}).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            var datas = data.result;
            var arr = [];
            for (var i = 0; i < datas.length; i++) {
              var obj = {
                name: datas[i].typename,
                id: datas[i].id,
              };
              arr.push(obj);
            }
            console.log(arr);
            return resolve(arr);
          }
        });
      }
      if (node.level == 1) {
        gettwoMilitary({
          pid: node.data.id,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            var datas = data.result;
            var arr = [];
            for (var i = 0; i < datas.length; i++) {
              var obj = {
                name: datas[i].typename,
                id: datas[i].id,
              };
              arr.push(obj);
            }
            console.log(arr);
            return resolve(arr);
          }
        });
      }
      if (node.level == 2) {
        getDictionary({
          tag: 1,
          letter: node.data.name,
          pid: node.data.id,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            var result = data.result;
            var datas = [];
            for (var i = 0; i < result.length; i++) {
              result[i].name = result[i].dictName;
              result[i].leaf = true;
              datas.push(result[i]);
            }
            console.log(datas);
            resolve(datas);
          }
        });
      }
      if (node.level > 2) {
        resolve([]);
      }
    },
    handleClick(tab, event) {
      this.activeNum = tab.index;
      if (tab.index == 0) {
        // this.getDictionaryList(tab.index,this.lableVal)
      } else if (tab.index == 1) {
        // this.getDictionaryList(tab.index,this.dictId)
      }
      // if(tab.index==0) {
      //    this.lableObj.id = this.dictionaryList[0].id;
      //       this.lableObj.kgDictionariesName =
      //          this.dictionaryList[0].kgDictionariesName;
      //       this.lableObj.kgDictionariesNote =
      //          this.dictionaryList[0].kgDictionariesNote;
      // }else if(tab.index ==1) {
      //   this.lableObj.id =  this.dictionaryList1[0].itemValue;
      //       this.lableObj.kgDictionariesName =
      //          this.dictionaryList1[0].kgDictionariesName;
      //       this.lableObj.kgDictionariesNote =
      //          this.dictionaryList1[0].kgDictionariesNote;
      // }else if(tab.index ==2) {
      //   this.lableObj.id =  this.dictionaryList2[0].itemValue;
      //       this.lableObj.kgDictionariesName =
      //          this.dictionaryList2[0].kgDictionariesName;
      //       this.lableObj.kgDictionariesNote =
      //          this.dictionaryList2[0].kgDictionariesNote;
      // }
    },
    // 获取全部的军语分类
    getAllMilitary() {},
    //   获取所有的数据字典
    // getDataDictionarys() {
    //   getDataDictionary({
    //     userid: "admin",
    //   }).then((res) => {
    //     console.log(res);
    //     var { data } = res;
    //     if (data.code == 200) {
    //       this.dictionaryList = data.result;
    //       this.lableObj = data.result[0];
    //     }
    //   });
    // },
    // 根据类别更新数据字典列表
    getDictionaryList(value, str) {
      if (value == 0) {
        this.lableVal = str;
      } else if (value == 1) {
        this.dictId = str;
      }
      getDictionary({
        tag: this.activeNum,
        letter: str,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.dictionaryList = data.result;
          if (this.activeNum == 0) {
            this.dictionaryList = data.result;
          } else if (this.activeNum == 1) {
            this.dictionaryList1 = data.result;
          } else if (this.activeNum == 2) {
            this.dictionaryList2 = data.result;
          }
          if (data.result.length == 0) {
            this.lableObj.id = "";
            this.lableObj.kgDictionariesName = "";
            this.lableObj.kgDictionariesNote = "";
          } else {
            this.lableObj.id = data.result[0].id;
            this.lableObj.kgDictionariesName =
              data.result[0].kgDictionariesName;
            this.lableObj.kgDictionariesNote =
              data.result[0].kgDictionariesNote;
          }
        }
      });
    },
    setValue(obj) {
      this.lableObj = obj;
    },
    first(value) {
      this.lableVal = value;
    },
    second(id) {
      this.dictId = id;
    },
    // 搜索
    search() {
      if (this.value == "") {
        this.$message({
          type: "info",
          message: "请输入关键字！",
        });
      } else {
      }
    },
    // 清空
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.getDictionaryList("全部", "全部");
    },
    submitForm() {
      if (this.searchVal == "") {
        return this.$message.error("检索值不能为空");
      } else {
        this.isearch = true;
        getDictionary({
          tag: 3,
          letter: this.searchVal,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            this.dictionaryList = data.result;
          }
        });
      }
    },
    // 返回上一级
    goBack() {
      this.$router.go(-1);
    },
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
/* 头部区域 */
header {
  position: relative;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
/deep/.el-tabs__nav {
  background: #fff;
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
.screen {
}
.all {
  background: #fff;
  margin-top: 20px;
  height: 280px;
  width: 100%;
  border: 1px solid rgba(233, 233, 233, 1);
  padding: 0 30px;
}
.allHead {
  margin-top: 10px;
  height: 40px;
  display: flex;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.allHead .item {
  cursor: pointer;
  height: 30px;
  line-height: 30px;
  flex: 1;
  font-size: 14px;
  color: #999999;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.allHead .item.active {
  background-color: rgb(0, 121, 254);
  color: #fff;
  border-radius: 50%;
}
.allContent {
  height: 195px;
  margin-top: 20px;
  overflow-y: scroll;
}
.allContent::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
.allContent::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
.allContent span {
  cursor: pointer;
  width: 80%;
  height: 30px;
  line-height: 30px;
  padding-left: 5px;
  border-radius: 5px;
  display: inline-block;
  margin-top: 10px;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.allContent span.active {
  background-color: rgba(0, 121, 254, 1);
  color: #fff;
}
.checkOut {
  background: #fff;
  height: 600px;
  padding: 0 30px;
  border: 1px solid rgba(233, 233, 233, 1);
  overflow-y: scroll;
}
.checkOut .cHead {
  height: 70px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.checkOut .cHead p {
  margin: 0;
  margin-top: 10px;
  display: inline-block;
  padding: 5px 25px;
  font-weight: 400;
  font-style: normal;
  font-size: 28px;
  color: #ffffff;
  background-color: rgba(0, 121, 254, 1);
  border-radius: 10px;
}
.checkOut .cContent {
  font-size: 16px;
  margin-top: 20px;
  color: #333;
}
.el-tabs {
  margin-top: 20px;
}

.dictionaryBox {
  display: flex;
}
.leftBox {
  width: 20%;
  height: calc(100vh - 350px);
  overflow: hidden;
  overflow-y: scroll;
}
.leftBox::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
.leftBox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
.rightBox {
  margin-left: 15px;
  flex: 1;
}
.class_item {
  display: flex;
  align-items: center;
  height: 26px;
  cursor: pointer;
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
}
.class_item.active {
  background: #f0f7ff;
}
</style>