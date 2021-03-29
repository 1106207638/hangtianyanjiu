<!--  -->
<template>
  <div class="hist-box">
      <el-row class="search">
        <el-input v-model="input" placeholder="请输入内容"></el-input>
        <el-button icon="el-icon-search" circle @click="search"></el-button>
      </el-row>
 
    <ul style="height:calc(100vh - 521px);min-height:400px" class="right">
        <li
          :class="name == item.bookmarkId ? 'active' : ''"
          v-for="(item, index) in pointList"
          :key="index"
          @click="go(item.bookmarkId,item.textid)"
        >
          <div class="head">
            <span class="date">{{item.createTime}}</span>
            <i class="el-icon-delete" @click.stop="del(item.bid,index)" style="color: rgb(254, 108, 111)"></i>
            <i class="el-icon-edit" @click.stop="open(item.bid, index, item.bookmarkName, item.kgLabels)" style="color: #3594ff"></i>
          </div>
          <p class="content">
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
    <div class="block" style="">
      <div>
       
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
        ></el-pagination>
      </div>
    </div>
    <div
      v-show="show"
      style="width:100vw;height:100vh;background:rgba(0,0,0,.5);position:fixed;top:0;left:0"
    >
      <div class="ask" style="padding: 0 50px">
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
                :key="item.labelId"
                :label="item.labelName"
                :value="item.labelId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-button class="addFlag" type="primary" @click="toggleAdd"
            >添加</el-button
          >
        </el-form>
        <el-form label-position="top" label-width="80px" v-if="!addTitle">
          <el-form-item>
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
        <div class="btns">
         
          <button
            class="success"
            style="margin-right: 40px"
            @click="editYes"
          >
            确定
          </button>
          <button class="cancel" @click="cancel">取消</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { AddNote,GetSearchlistUrl, editNote, delNote,GetAllListUrl,Getflag ,ADDflag} from "../../api/apis";

export default {
  data() {
    return {
      checked: false,
      currentPage: 1,
      input:'',
      pointList:[],
      name:'',
      pagesize:10,
      fullpage:{}, // 分页对象
      show:false,
      value1:[],
      lableName:"",
      addTitle:true,
      value:"",
      titleList:[],
        editObj: {
        id: 0,
        index: 0,
      },

    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
      this.getNote()
      this.getUserFlag()
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val
      this.getNote()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getNote()
    },
    getNote(){
      GetAllListUrl({
        userid:'admin',
        pageNo: this.currentPage,
        pageSize:this.pagesize
      }).then((res)=>{
          var {data} = res
          if(data.code == 200) {
              this.pointList = data.result.records
              this.fullpage = data.result
          }
      })
    },
    // 删除笔记
    del(id, index) {
      this.$confirm("此操作将永久删除该书签, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delNote({ bid: id }).then((res) => {
            var { data } = res;
            if (data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.pointList.splice(index, 1);
            } else {
              this.$message({
                type: "info",
                message: "网络错误，请稍后再试!",
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 修改笔记标题
    open(id, index, name, lableList) {
      this.show = true
      this.lableName = name;
      this.value1 = [];
      this.editObj.id = id;
      this.editObj.index = index;
      if (lableList.length == 0) {
      } else {
        for (var i = 0; i < lableList.length; i++) {
          this.value1.push(lableList[i].labelId);
        }
      }
      // this.$prompt("请输入书签名称", "提示", {
      //   confirmButtonText: "确定",
      //   cancelButtonText: "取消",
      // })
      //   .then(({ value }) => {
      //     editNote({
      //       bid: id,
      //       bookmarkName: value,
      //     }).then((res) => {
      //       console.log(res);
      //       var { data } = res;
      //       if (data.code == 200) {
      //         this.$message({
      //           type: "success",
      //           message: "书签修改成功",
      //         });
      //         this.pointList[index].bookmarkName = value;
      //       }
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "已取消",
      //     });
      //   });

    },
    go(name,id) {
        this.$router.push({
            path:'/hello',
            query:{
                name:name,
                id:id
            }
        })
    },
    // 查找笔记
    search(){
      this.input = this.input.replace (/^\s*|\s*$/g,'')
      if(this.input == '') {
        return this.$message({
          type:'info',
          message:'请输入关键字'
        })
      }
        GetSearchlistUrl({
            BookmarkName:this.input
        }).then((res)=>{
            var {data} = res
            if(data.code == 200) {
                this.pointList = data.result.records
                 this.fullpage = data.result
            }
        })
    },
     toggleAdd() {
      this.addTitle = !this.addTitle;
      this.value = ""
      this.getUserFlag();
    },
    // 获取当前用户的标签
    getUserFlag() {
      Getflag({ userid: "admin" }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.titleList = data.result;
        }
      });
    },
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
          for (var i = 0; i < this.value1.length; i++) {
            kgLabels.push({ labelId: this.value1[i] });
          }

          editNote({
            bid: this.editObj.id,
            bookmarkName: this.lableName,
            kgLabels: kgLabels,
          }).then((res) => {
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
            }else {
               this.$message({
                type: "error",
                message: "网络错误，操作失败",
              });
            }
          });
        }
      }
    },
     cancel() {
      this.show = false;
      this.text = "";
    },
    addFLag() {
      if (this.value == "") {
        this.$message({
          type: "info",
          message: "请输入要增加的标签",
        });
      } else {
        ADDflag({
          labelCreateUser: "admin",
          labelName: this.value,
        }).then((res) => {
          var { data } = res;
          if (data.code == 200) {
            this.$message({
              type: "success",
              message: "添加成功",
            });
          } else {
            this.$message({
              type: "error",
              message: data.message,
            });
          }
        });
      }
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
p {
  margin: 0;
  padding: 5px 0;
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
    box-sizing: border-box;
  list-style: none;
  padding: 0;
  margin: 0;
}
.search {
    padding: 10px;
    display: flex;
}
/deep/.el-input {
    width: 30%;
    margin-right: 20px;
}
ul {
    overflow-x: hidden;
    overflow-y: scroll;
}
li {
  display: flex;
  padding: 10px 0 0 0;
    box-sizing: border-box;

}
.right {
    padding: 0 5px;
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
.right .content i {
  color: #999;
  margin-right: 5px;
  font-size: 14px;
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
.page {
  flex: 1;
  text-align: right;
}
ul::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
ul::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
.ask {
  position: fixed;
  text-align: center;
  width: 500px;
  height: 300px;
  background: #fff;
  border: 1px solid #ccc;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
}
.ask p {
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  color: #303133;
  margin: 16px auto;
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
.ask button {
  width: 100px;
  height: 30px;
  border: none;
  line-height: 30px;
  font-weight: 500;
  outline: none;
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
/deep/.el-input {
  width: 100%;
}
ul .el-select-dropdown__item {
    font-size: 14px;
    padding: 0 20px !important;
    position: relative;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #606266;
    height: 34px;
    line-height: 34px;
    box-sizing: border-box;
    cursor: pointer;
}
</style>