<!-- 我的收藏 -->
<template>
  <div class="hist-box">
    <el-row class="search">
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <el-button icon="el-icon-search" circle @click="search"></el-button>
    </el-row>

    <ul style="height: calc(100vh - 521px);min-height:500px">
      <li v-for="(item, index) in pointList" :key="index">
        <div class="checkBox">
          <el-checkbox-group
            v-model="checkedCities"
            @change="handleCheckedCitiesChange"
          >
            <el-checkbox :label="item.bookCollecTionId"></el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="content">
          <div class="title">{{ item.bookCollecTionName }}</div>
          <div class="date">2018-02-24 17:47</div>
        </div>
      </li>
    </ul>
    <div class="block">
      <div>
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          >全选</el-checkbox
        >
        <span class="del" @click="del">取消收藏</span>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="fullpage.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllCollection,
  cancelCollection,
  getBookNameList,
} from "../../api/apis";
export default {
  data() {
    return {
      input: "",
      currentPage: 1,
      pagesize: 10,
      pointList: [],
      fullpage: {},
      checkAll: false,
      isIndeterminate: false,
      // 当前所有数据的唯一标识集合
      checkedCities: [],
      multipleSelection: [],
      // 当前选中的数据的集合
      checkedGameId: [],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getCollection();
  },
  methods: {
    // 删除收藏
    del() {
      console.log(this.checkedCities);
      if (this.checkedCities.length == 0) {
        this.$message({
          type: "info",
          message: "请选择数据",
        });
      }
      var ids = this.checkedCities;
      var IDS = "";
      for (var i = 0; i < ids.length; i++) {
        IDS += ids[i] + ",";
      }
      IDS = IDS.substring(0, IDS.length - 1);
      cancelCollection({
        bookCollecTionId: IDS,
        bookCollecTionUserid: "admin",
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: "取消收藏成功",
          });
          this.getCollection();
        }
      });
    },
    // 全选和取消全选
    handleCheckAllChange(val) {
      console.log(val);
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

    handleSizeChange(val) {
      this.pagesize = val;
      this.getCollection();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCollection();
    },
    search() {
      this.input = this.input.replace(/^\s*|\s*$/g, "");
      if (this.input == "") {
        return this.$message({
          type: "info",
          message: "请输入关键字",
        });
      }
      getBookNameList({
        pageNo: this.currentPage,
        pageSize: this.pagesize,
        bookCollecTionUserid: "admin",
        bookCollecTionName: this.input,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.pointList = data.result.records;
          this.fullpage = data.result;
          this.checkedGameId = [];
          for (let i = 0; i < this.pointList.length; i++) {
            this.checkedGameId.push(this.pointList[i].bookCollecTionId);
            this.multipleSelection = this.checkedGameId;
          }
        }
      });
    },
    // 获取收藏列表
    getCollection() {
      getAllCollection({
        userid: "admin",
         pageNo: this.currentPage,
        pageSize: this.pagesize,
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.pointList = data.result.records;
          this.fullpage = data.result;
          this.checkedGameId = [];
          for (let i = 0; i < this.pointList.length; i++) {
            this.checkedGameId.push(this.pointList[i].bookCollecTionId);
            this.multipleSelection = this.checkedGameId;
          }
        }
      });
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.hist-box {
  position: relative;
  height: 100%;
}
div {
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #333;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul {
  overflow: hidden;
  overflow-y: scroll;
}
li {
  display: flex;
  height: 45px;
  padding-right: 20px;
  line-height: 45px;
}
li .checkBox {
  width: auto;
  margin-right: 20px;
}
li:last-child .content {
  border-bottom: none;
}
.search {
  padding: 10px;
  display: flex;
}
/deep/.el-checkbox__label {
  display: none;
}
/deep/.el-input {
  width: 30%;
  margin-right: 20px;
}
li .content {
  flex: 1;
  border-bottom: 1px dashed #ccc;
  text-align: right;
}
.content div {
  display: inline-block;
}
.content .title {
  float: left;
}
.block {
  position: absolute;
  bottom: -0;
  display: flex;
}
.block {
  width: 100%;
}
.block .del {
  margin-left: 20px;
}
.page {
  flex: 1;
  text-align: right;
}
ul::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
ul::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
</style>