<!-- 我的收藏 -->
<template>
  <div class="collectBox">
    <div class="page">
      <header>
        <span>我的收藏</span>
        <div class="btns">
          <el-button @click="goBack">
            <i class="el-icon-arrow-left"></i>
            返回
          </el-button>
        </div>
      </header>
      <div class="container">
        <div class="head">
          <span>我的收藏夹</span>
        </div>
        <div v-if="collFolderFileList.total!=0">
          <ul>
          <li v-for="(item,index1) in collFolderFileList.records" :key="index1">

            <div class="content">
              <div class="small">
                <p class="title" @click="goDetail(item)">{{ item.title }}</p>

                <p
                    class="font"
                >{{ item.content }}</p>
              </div>
              <div class="bottom">
                <span style="float:left">创建于：{{ item.createTime }}</span>
                <span class="cancel" @click="cancel(item)">取消收藏</span>
              </div>
            </div>
          </li>
        </ul>
          <div class="fullPage">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pageNo"
                :page-sizes="[10, 50, 100, 150]"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="collFolderFileList.total">
            </el-pagination>
          </div>
        </div>
       <div v-else class="nullData">
         <img style="margin-top: 100px;" src="~@/assets/images/dataNone.png" alt="">
         <p>暂无更多数据</p>
       </div>

      </div>
    </div>

  </div>
</template>

<script>
import {getCollFolderFile, cancelCollection} from '../../api/apis'

export default {
  data() {
    return {
      collFolderFileList: {},
      pageSize: 10,
      pageNo: 1
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getCollFloderList()
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pageSize = val
      this.getCollFloderList()
    },
    handleCurrentChange(val ) {
      this.pageNo = val
      this.getCollFloderList()
    },
    Personal() {
      this.$router.push("/Personal");
    },
    // 获取当前收藏文件夹下的所有文件
    getCollFloderList() {
      getCollFolderFile({
        id: this.$route.query.id,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.collFolderFileList = data.result
        }
      })
    },
    // 去详情页
    // 取消收藏
    goDetail(item) {
      this.$router.push({
        path: '/TrilalXml',
        query: {
          textid: item.id,
          type: item.infoType,
        }
      })
    },
    cancel(obj) {
      this.$confirm('此操作将删除该收藏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        cancelCollection({
          folerid: this.$route.query.id,
          kgdocid: obj.id,
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '取消收藏成功'
            })
            this.getCollFloderList()
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });


    },
    goBack() {
      this.$router.go(-1);
    },
    Editing() {
      this.$router.push("/Editing");
    }
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
ul,
li {
  padding: 0;
  margin: 0;
  list-style: none;
  box-sizing: border-box;
}

div {
  box-sizing: border-box;
}
.collectBox {
  background: #345791;
  padding: 20px;
}
.page {
  background: #fff;
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  margin: 0 auto;
  background: #fff;
  padding: 20px 30px;
}
.container {
  min-height: 500px;
}
/* 头部区域 */
header {
  position: relative;
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
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

/* 按钮组 */
.button {
  margin-top: 20px;
}

.button button {
  width: 100px;
  height: 40px;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: #999999;
  line-height: 1.5;
  border: 1px solid rgba(233, 233, 233, 1);
  background-color: #fff;
  outline: none;
  cursor: pointer;
  margin-right: 20px;
}

.button button:nth-child(3) {
  color: rgb(0, 121, 254);
}

.container {
  margin-top: 20px;
  width: 100%;
  padding: 0 30px 30px 30px;
  border: 1px solid rgba(233, 233, 233, 1);
}

.container .head {
  height: 60px;
  line-height: 60px;
  display: flex;
}

.container .head > span, .bread span {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: normal;
  color: #333333;
}

li {
  display: flex;
  padding: 10px 0 0 0;
}

li .checkBox {
  width: auto;
  margin-right: 20px;
}

li:last-child .content {
  border-bottom: none;
}

li .content {
  flex: 1;
  width: 100%;
  border-bottom: 1px dashed #ccc;
}

.content .top {
  display: flex;
}

.content .bottom {
  height: 15px;
  margin-bottom: 10px;
}

.content .bottom span:nth-child(1) {
  font-size: 12px;
}

.content .bottom span:nth-child(2) {
  font-size: 12px;
  float: right;
}

.content .left {
  width: 136px;
  margin-right: 20px;
}

.content .left img {
  width: 100%;
  height: 173px;
}

.content .right {
  flex: 1;
  text-align: left;
}

.content .title {
  font-weight: 700;
  font-size: 14px;
}

.content .flag-item {
  display: inline-block;
  font-size: 12px;
  padding: 3px 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 10px;
}

.content .autor {
  font-size: 12px;
}

.small {
  text-align: left;
}

.small .font {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content .title {
  cursor: pointer;
}
.content .font {
  font-size: 12px;
  line-height: 20px;

}

div.font {
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
}

.block {
  position: absolute;
  bottom: 0px;
  display: flex;
}

.block {
  width: 100%;
}

.block .del {
  margin-left: 20px;
}
.fullPage {
  text-align: right;
  margin-top: 20px;
}
.cancel {
  cursor: pointer;
}
</style>