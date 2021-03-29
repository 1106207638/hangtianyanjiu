<!-- 编辑资料 -->
<template>
  <div class="page"  >
    <div class="containerr">
      <header>
        <span>需求反馈</span>
        <div class="btns">
          <el-button @click="addFeedBack" >
            <i class="el-icon-plus"></i>
            新增反馈
          </el-button>
        </div>
      </header>
      <div class="button" v-show="!details">
        <button :class="activeIndex=='all'?'active':''" @click="getMessageList('all')">全部反馈</button>
        <button :class="activeIndex==item.itemValue?'active':''" v-for="(item,index) in feedTypeList" :key="index"  @click="getMessageList(item.itemValue)">{{item.itemText}}</button>
        <button :class="activeIndex=='my'?'active':''"  @click="getMessageList('my')">我的反馈</button>
      </div>
      <el-row style="margin-top: 20px">
        <el-col :span="3">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </el-col>
        <el-col :span="21">
          <el-button style="margin-left: 15px;" icon="el-icon-search" type="primary" @click="search">搜索</el-button>
          <el-button icon="el-icon-refresh-right" @click="refresh">重置</el-button>
        </el-col>
      </el-row>
      <div class="container" v-show="!details">
        <div class="head">
          <span> 反馈列表 </span>
        </div>
        <div class="form_box">
          <table
              style="
            width: 100%;
            border-color: rgba(233, 233, 233, 1);
            border-right: none;
            border-bottom: none;
          "
              border="1"
              cellpadding="0"
              cellspacing="0"
              width="100%"
          >
            <tr>
              <td>反馈类型</td>
              <td>反馈内容</td>
              <td>反馈人</td>
              <td>反馈时间</td>
              <td>操作</td>
            </tr>
            <tr v-for="(item,index) in feedBackList" :key="index">
              <td @click="goDetail(item)" class="contents">{{item.type}}</td>
              <td>{{item.content}}</td>
              <td>{{item.realname}}</td>
              <td>{{item.createTime}}</td>
              <td>
                <el-button size="mini" type="success" @click="respond(item)">回应</el-button>
              </td>
            </tr>

          </table>
          <div class="block" v-if="fullpage.total!=0">
            <div>


            </div>
            <div class="fullpage">
              <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pageNum"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="fullpage.total">
              </el-pagination>
            </div>
          </div>
          <div class="dataNone" v-else>
            <img src="~@/assets/images/dataNone.png" alt="">
            <p>暂无更多数据</p>
          </div>
        </div>
      </div>
      <el-drawer
          v-loading="loading"
          element-loading-text="请耐心等待"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.6)"
          title="反馈详情"
          :visible.sync="drawer"
          direction="rtl"
          :destroy-on-close="true"
          size="30%">
        <div class="drawer">
          <div class="label">
            <div class="lable"><el-tag>反馈类型</el-tag></div>
            <div class="lable-content">{{activeObj.type}}</div>
          </div>
          <div class="label">
            <div class="lable"><el-tag>反馈内容</el-tag></div>
            <div class="lable-content">{{activeObj.content}}</div>
          </div>
          <div class="label">
            <div class="lable"><el-tag>反馈人员</el-tag></div>
            <div class="lable-content">{{activeObj.realname}}</div>
          </div>
          <div class="label">
            <div class="lable"><el-tag>反馈时间</el-tag></div>
            <div class="lable-content">{{activeObj.createTime}}</div>
          </div>

          <div class="comment">
            <div v-if="activeObj.type=='需求反馈'">
              <h3>上传文件</h3>
              <el-row>
                <el-upload
                    ref="upload"
                    class="upload-demo"
                    :action="uploadURL"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :headers="headers"
                    :on-change="onchange"
                    :data="datas"
                    :before-upload="beforeAvatarUpload"
                    :before-remove="beforeRemove"
                    :on-success="success"
                    :on-error="fileerror"
                    multiple
                    :limit="1"
                    :auto-upload="false"
                    :on-exceed="handleExceed"
                    :file-list="fileList"
                    :http-request="uploadFile"
                >
                  <el-button size="small" type="primary">选择附件</el-button>
                  <div slot="tip" class="el-upload__tip">
                    单个文件不能超过20MB
                  </div>
                </el-upload>
              </el-row>
            </div>
            <h3>回应</h3>
            <el-row>
              <el-col :span="24" class="text_BOX">
                <el-input v-model="input"  type="textarea" maxlength="50"
                          show-word-limit placeholder="请输入内容"></el-input>
                <el-button size="mini"  type="primary" @click="sendcomment">回应</el-button>

              </el-col>
              <el-col :span="5">
              </el-col>
            </el-row>
            <h3>全部回应</h3>
            <ul class="infinite-list" v-if="commentList.length!=0" v-infinite-scroll="load" style="overflow:auto">
              <li v-for="(item,index) in commentList" :key="index">
                <div class="head">
                  <img src="~@/assets/images/user.png" alt="">
                  <div class="rightt">
                    <div style="display: flex">
                      <span class="username">{{item.realname}}</span>
                    </div>
                    <p class="contentt">{{item.respondcontent}}</p>
                    <div style="display: flex">
                      <span class="createTime">{{item.createTime}}
                        <i v-show="item.status == 'yes'" class="iconfont icon-dianzan" >({{item.dz}})</i>
                        <i class="iconfont icon-dianzan1 no" v-show="item.status == 'no'" @click="dz(item.id,index)">({{item.dz}})</i>
</span>
                      <el-tag type="success" v-show="item.docName!=''&&item.docName!=null" @click="downs(item)">{{item.docName}}</el-tag>
                    </div>

                  </div>
                </div>
              </li>
            </ul>
            <div class="nullData" v-else>
              <img src="~@/assets/images/dataNone.png" alt="">
              <p>快来抢占沙发吧！</p>
            </div>
          </div>

        </div>
      </el-drawer>
      <div class="container" v-show="details">
        <div class="message_Hbox">
          <span class="title">{{activeObj.typeText}}</span>
          <span class="date">{{activeObj.createTime}}</span>
        </div>
        <div class="message_content">
          <span class="title">尊敬的用户：您好！</span>
          <span class="content">{{activeObj.content}}</span>
        </div>

      </div>
    </div>
    <FeedBack :type="type" :feedBack="feedback" @cancel="cancel" />
  </div>
</template>

<script>
import {GetFeedBackList,sendReponse,getReponse,dainzan} from '@/api/api'
import FeedBack from '../../common/dialog/feedBack'
import { getMessPush,focusClass,UnreadQuantity,messageStatusUpdata , removeMessage , Unread,Read,GetFeedback } from '../../api/apis'
export default {
  filters:{
  },
  components:{
    FeedBack
  },
  inject:['showLogin'],
  data() {
    return {
      loading:false,
      fileList:[],
      datas:{

      },
      headers: {
        "X-Access-Token": window.localStorage.getItem('token')
      },
      uploadURL:window._CONFIG['baseURL']+'kgInformationFilePut/add',
      load:false,
      commentList:[],
      input:'',
      type:1,
      feedback: false,
      // 需求反馈列表
      feedBackList:[],
      // 需求反馈类型
      feedTypeList:[],
      fullpage:{},
      pageNum:1,
      pagesize: 10,
      activeIndex:'all',
      details: false,
      activeObj:{},
      drawer:false,
      file:null,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    document.querySelector('.rtl').removeAttribute('tabindex')
    document.querySelector('.el-drawer__header span').removeAttribute('tabindex')
    // 获取反馈列表
    this.getFeed()
    // 获取反馈类型
    this.getFeedType()
  },
  methods: {
    // 下载文档
    downs(obj) {
      if(window.localStorage.getItem('token')) {
        var url = obj.docUrl
        var id = obj.id
        this.down(url, obj.docName,id)
      }else {
        this.showLogin()
      }
    },
    down(url, name,id) {
      var that = this
      if (url.indexOf('rar') != -1) {
        window.open(url)
      } else {
        var xmlreq = new XMLHttpRequest();
        xmlreq.open('get', url, true)
        xmlreq.responseType = 'blob';
        xmlreq.setRequestHeader('Content-Type', 'application/json');
        xmlreq.setRequestHeader("X-Access-Token", window.localStorage.getItem('token'));
        xmlreq.send()
        xmlreq.onreadystatechange = function () {
          // 为了保证 数据 完整返回，我们一般会判断 两个值
          if (xmlreq.readyState == 4 && xmlreq.status == 200) {
            xmlreq.onload = function () {
              var data = xmlreq.response;
              var blob = new Blob([data]);
              var a = document.createElement('a');
              var blobUrl = window.URL.createObjectURL(blob);
              a.download = name
              that.$message({
                type: 'success',
                message: name + '开始下载'
              })
              a.href = blobUrl;
              a.click();
            };
          }else if(xmlreq.status != 200) {
            that.$message({
              type: 'success',
              message: name + '下载失败'
            })
          }
        }
        // xmlreq.onload = function (req) {
        //   console.log(req)
        //   var data = req.target.response;
        //   var blob = new Blob([data]);
        //   var a = document.createElement('a');
        //   var blobUrl = window.URL.createObjectURL(blob);
        //   a.download = name
        //   that.$message({
        //     type: 'success',
        //     message: name + '开始下载'
        //   })
        //   a.href = blobUrl;
        //   a.click();
        // };
      }

    },
    uploadFile() {
        let formData = new FormData();
        // 后端接受参数 ，可以接受多个参数
        formData.append("file", this.file.raw);
        formData.append("fdid",this.activeObj.id);
        formData.append("needtype", 'file');
        formData.append("respondcontent", this.input);
        this.loading = true
        sendReponse(formData).then((res)=>{
          var { data } = res
          if(data.code == 200) {
            this.loading = false

            this.$message({
              type:'success',
              message: data.message
            })
            this.input = ''
            this.getFeedbackList(this.activeObj.id)
            this.$refs.upload.clearFiles();

          }else {
            this.loading = false
            this.$message.error(data.message)
            this.$refs.upload.clearFiles();
            this.input = ''
          }
        })

    },
    // 文件上传成功
    success(response, file, fileList) {
      if (response.code == 200) {
        setTimeout(() => {
          this.uploadcount++
          console.log(this.uploadcount)
          if (this.uploadcount == fileList.length) {
            this.$message({
              message: '上传成功',
              type: 'success'
            });
            this.uploadcount = 0
            this.dialogFormVisible = false
            this.fileList = []
            this.$refs.upload.clearFiles();
            this.getDataList()
          }
        }, 100)


      } else {
        this.$message.error(file.name + response.message)
        this.uploadcount = 0
      }

    },
    // 文件上传失败
    fileerror(err, file, fileList) {
      console.log(err)
    },
    onchange(file, fileList) {
      let fileName = file.name;
      let uid = file.uid
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      // if (
      //     lastName.toLowerCase() !== ".doc" &&
      //     lastName.toLowerCase() !== ".docx" &&
      //     lastName.toLowerCase() !== ".txt"
      // ) {
      //   this.$message.error("文件必须为.doc .docx .txt 类型");
      //   // this.resetCompressData()
      //   for (var i = 0; i < fileList.length; i++) {
      //     if (fileList[i].uid == uid) {
      //       fileList.splice(i, 1)
      //     }
      //   }
      //   return;
      // }
      // 限制上传文件的大小
      const isLt =
          file.size / 1024 / 5 >= 1 && file.size / 1024 / 1024 / 50 <= 1;
      if (!isLt) {
        this.$message.error("上传文件大小不得小于5KB,不得大于50MB!");
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].uid == uid) {
            fileList.splice(i, 1)
          }
        }
      }
      this.file = file
      return isLt;
    },
    beforeAvatarUpload(file) {
      let fileName = file.name;
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      // if (
      //     lastName.toLowerCase() !== ".doc" &&
      //     lastName.toLowerCase() !== ".docx" &&
      //     lastName.toLowerCase() !== ".txt"
      // ) {
      //   this.$message.error("文件必须为.doc .docx .txt 类型");
      //   this.resetCompressData()
      //   return;
      // }
      // 限制上传文件的大小
      const isLt =
          file.size / 1024 / 5 >= 1 && file.size / 1024 / 1024 / 50 <= 1;
      if (!isLt) {
        this.$message.error("上传文件大小不得小于5KB,不得大于100MB!");
      }
      return isLt;
    },
    handleRemove(file, fileList) {
    },
    handlePreview(file) {
    },
    handleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
          } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    cancel() {
      this.Logindialog = false
      this.feedback = false
      this.getFeed()
    },
    // 新增反馈
    addFeedBack() {
      this.feedback = true
    },
    // 重置
    refresh() {
      this.input = ''
      this.getFeed()
    },
    search() {
      if(this.input == '') {
        return this.$message.info('请输入检索字段！')
      }else {
        this.getFeed()
      }
    },
    // 点击回应
    respond(obj) {
      this.file = null
      this.input = ''
      // this.$refs.upload.clearFiles()
      this.drawer = true
      this.activeObj = obj
      this.getFeedbackList(obj.id)
    },
    // 获取反馈类型
    getFeedType() {
      GetFeedback().then((res)=>{
        var { data } = res
        if(data.code == 200) {
          this.feedTypeList = data.result
        }
      })
    },
    // 点赞
    dz(id,index) {
      dainzan({
        fdrpid: id
      }).then((res)=>{
        var { data } = res
        if(data.code == 200) {
          this.$message({
            type:'success',
            message:data.message
          })
          this.commentList[index].status="yes"
          this.commentList[index].dz=this.commentList[index].dz+1
        }else {
          this.$message.error(data.message)
        }
      })
    },
    // 获取当前反馈的回应列表
    getFeedbackList(id) {
      getReponse({
        fdid:id
      }).then((res)=>{
        var { data } = res
        if(data.code == 200) {
          this.commentList = data.result
        }
      })
    },
    // 发送回应
    sendcomment() {
      if(this.input == '' ) {
        return this.$message.error('内容不能为空')
      }
      if(this.activeObj.type=="需求反馈")  {
        if(this.file == null) {
          return this.$message.error('请上传文档！')
        }
        this.$refs.upload.submit()
      }else{
        this.loading = true
        let formData = new FormData()
        formData.append('fdid',this.activeObj.id)
        formData.append('respondcontent',this.input)
        formData.append('needtype','')
        sendReponse(formData).then((res)=>{
          var { data } = res
          if(data.code == 200) {
            this.loading = false
            this.$message({
              type:'success',
              message: data.message
            })
            this.input = ''
            this.getFeedbackList(this.activeObj.id)
          }else {
            this.loading = false
            this.$message.info(data.message)
          }
        })
      }

    },
    // 获取需求反馈列表
    getFeed() {
      GetFeedBackList({
        search:this.input,
        type:this.activeIndex,
        pageNo:this.pageNum,
        pageSize:this.pagesize,
      }).then((res)=>{
        var { data } = res
        if(data.code == 200) {
          this.feedBackList = data.result.records
          this.fullpage = data.result
        }
      })
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.getFeed()
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.getFeed()
    },
    openFack(){},
    // 获取消息推送列表
    getMessageList(str) {
      this.activeIndex = str
      this.getFeed()
    },

    goBack() {
      if(this.details==false) {
        this.$router.go(-1);
      }else {
        this.details = false
        this.getmessageCount()
      }
    },
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
.page {
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  background: rgb(52,87,145);
  padding: 20px 30px;
  /*width: 1200px;*/
  /*margin: 0 auto;*/
}
.containerr {
  background: #fff;
  padding: 20px 20px;
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
  left: 0px;
}
header > span {
  display: inline-block;
  margin-left: 10px;
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  color: #999;
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
.button button.active {
  color: rgb(0, 121, 254);
}
.container {
  margin-top: 20px;
  width: 100%;
  padding: 0 30px 30px 30px;
  border: 1px solid rgba(233, 233, 233, 1);
  background: #fff;
}
.container .head {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
  display: flex;
}
.container .head > span {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: normal;
  color: #333333;
}
.container .head .right {
  flex: 1;
  text-align: right;
  font-weight: 400;
  font-style: normal;
  text-align: right;
  color: #999;
}
.container .head .right span {
  color: #ff3b30;
}
/* form表单 */
.form_box {
  width: 100%;
  min-height: 500px;
  margin: 50px auto;
  margin-bottom: 0;
}
table td {
  border: none;
  text-align: center;
  border-right: 1px solid rgba(233, 233, 233, 1);
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
table tr:first-child {
  height: 45px;
  font-weight: 700;
  font-style: normal;
  font-size: 14px;
  color: rgb(102, 102, 102);
  background-color: rgb(245, 245, 245);
}
table tr {
  height: 50px;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
}
/deep/.el-badge__content.is-dot {
  height: 8px;
  width: 8px;
  padding: 0;
  left: -25px;
  top: 9px;
  right: 0;
  border-radius: 50%;
}
/* 详细消息 */
.message_Hbox {
  width: 100%;
  height: 120px;
  line-height: 60px;
  text-align: center;
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}
.message_Hbox .title {
  display: block;
  font-weight: 700;
  font-size: 20px;
  color: #333333;
}
.message_Hbox .date {
  display: block;
  font-size: 14px;
  color: #333;
}
.message_content {
  height: calc(100vh - 280px);
}
.message_content .title {
  margin-top: 10px;
  display: block;
  font-weight: 400;
  font-style: normal;
  line-height: 28px;
  color: #333;
  margin-bottom: 25px;
  font-size: 13px;
}
.message_content .content {
  display: block;
  font-weight: 400;
  font-style: normal;
  line-height: 28px;
  font-size: 13px;
  color: #333;
  text-indent:50px;

}
/deep/.el-badge__content.is-fixed {
  right: 46px;
}
/*分页*/
.block {
  padding-left: 25px;
  display: flex;
  margin-top: 20px;
  /*text-align: right;*/
}
.block>div {
  line-height: 32px;
}
.block .fullpage {
  flex: 1;
  text-align: right;
}
table /deep/.el-checkbox__label{
  display: none;
}
.el-dropdown {
  margin-left: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-dropdown-menu.el-popper {
  width: 100px;
}
.el-dropdown-menu.el-popper li {
  text-align: center;
}
td.contents {
  cursor: pointer;
}
.dataNone {
  text-align: center;
  height: 500px;
}
.dataNone img {
  margin-top: 100px;
}
/deep/.el-drawer__header {
  margin-bottom: 10px;
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
/deep/.el-drawer__header span {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.drawer {
  padding: 0 20px;
}
.text_BOX {
  position: relative;
}
.text_BOX button{
  position: absolute;
  bottom: 10px;
  right: 40px;
}
.label {
  display: flex;
  margin-bottom: 10px;
}
.rightt .el-tag {
  cursor: pointer;
  margin-left: 10px;
  margin-top: 10px;
}
.label .lable-content {
  margin-left: 10px;
  flex: 1;
  line-height: 32px;
  font-size: 16px;
  font-weight: bold;
}
.head {
  width: 100%;
  display: flex;
}
.head img {
  width:50px;
  height: 50px;
  border-radius: 50%;
}
.head .rightt {
  flex:1;
  padding-left: 20px;
}
.head .rightt span {
  display: block;
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
.comment li{
  margin-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgb(236, 236, 236);
}
.comment ul {
  height: calc(100vh - 450px);
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
.iconfont.icon-dianzan {
  margin-left: 50px;
  font-size: 16px;
  color: #2f99ff;
  cursor: pointer;
}
.iconfont.icon-dianzan1 {
  margin-left: 50px;
  font-size: 16px;
  cursor: pointer;
}
/deep/.rightt .el-tag {
  width: 60%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>