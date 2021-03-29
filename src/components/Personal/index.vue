<!-- 数据字典 -->
<template>
  <div class="page">
    <div class="containerr">

    <header>
      <span>个人中心</span>
<!--      <div class="btns">-->
<!--        <el-button @click="goBack">-->
<!--          <i class="el-icon-arrow-left"></i>-->
<!--          返回-->
<!--        </el-button>-->
<!--      </div>-->
    </header>
    <div class="button">
      <button>用户详情</button>
      <button @click="editing">编辑资料</button>
<!--      <button @click="Journal">登录日志</button>-->
      <button @click="editPass">修改密码</button>
    </div>
    <div class="container">
      <!-- 基本信息 -->
      <div class="basic">
        <p>
          <i class="el-icon-user-solid" style="margin-right: 5px"></i>基本信息
        </p>
        <div class="table">
          <div class="left">
            <img src="~@/assets/images/user.png" alt=""/>
            <p class="username">{{userInfo.realname}}</p>
          </div>
          <div class="right">
            <el-row>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">ID</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="value">{{ userInfo.id }}</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">邮箱</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="value">{{ userInfo.email }}</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">联系方式</div>
                  </el-col>
                  <el-col :span="16"
                  >
                    <div class="value">{{ userInfo.phone }}</div>
                  </el-col
                  >
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">个性签名</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="value">{{userInfo.personalizedSignature}}</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">性别</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="value">{{ userInfo.sex | gender }}</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">关注分类</div>
                  </el-col>
                  <el-col :span="16"
                  >
                    <div class="value">
                      {{ userInfo.attentionInfoClass }}
                    </div>
                  </el-col
                  >
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">生日</div>
                  </el-col>
                  <el-col :span="16"
                  >
                    <div class="value">{{ userInfo.birthday }}</div>
                  </el-col
                  >
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">注册时间</div>
                  </el-col>
                  <el-col :span="16"
                  >
                    <div class="value">{{ userInfo.createTime }}</div>
                  </el-col
                  >
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">城市</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="value">{{ userInfo.region }}</div>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="8">
                    <div class="lable">所在单位</div>
                  </el-col>
                  <el-col :span="16">
                    <div class="value">{{ userInfo.orgCode | resultStr }}</div>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 统计信息 -->
      <div class="Statistics">
        <p><i class="el-icon-s-data" style="margin-right: 5px"></i>统计信息</p>
        <table
            style="
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
            <td >收藏数量</td>
            <td >共享资料数量</td>
            <td >登录次数</td>
            <td >反馈数量</td>
          </tr>
          <tr>
            <td>{{statistics.collectNumber}}</td>
            <td>{{statistics.shareNumber}}</td>
            <td>{{statistics.loginNumber}}</td>
            <td>{{statistics.feedbackNumber}}</td>
          </tr>
        </table>
      </div>
      <!-- 我的资料 -->
      <div class="myInfo">
        <p>
          <span class="left">
            <i class="el-icon-tickets" style="margin-right: 5px"></i>我的资料
          </span>
          <span
              class="right"
              style="dispaly: inline-block; text-align: right"
          >
            <span class="more" @click="goMore('Data')">查看更多</span><span class="el-icon-arrow-right more"></span>
          </span>
        </p>

        <table
            v-if="myDataList.length!=0"
            style="
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
            <td>文件名称</td>
            <td>文件大小</td>
            <td>文件类型</td>
            <td>文件来源</td>
            <td>共享状态</td>
            <td>更新时间</td>
<!--            <td>操作</td>-->
          </tr>
          <tr v-for="(item,index) in myDataList" :key="index">
            <td>{{ item.docName }}</td>
            <td>{{ item.docSize }}</td>
            <td>{{ item.docType }}</td>
            <td>{{ item.source | shareFilter}}</td>
            <td>{{ item.shareStatus }}</td>
            <td>{{ item.createTime }}</td>
<!--            <td>-->
<!--              <el-button size="mini" type="danger" @click="DELData(item)">删除</el-button>-->
<!--            </td>-->
          </tr>
        </table>
        <div class="nullData" v-else>
          <span></span>
          <img src="~@/assets/images/dataNone.png" alt="">
        </div>
      </div>
      <!-- 我的收藏 -->
      <div class="Collection myInfo">
        <p>
          <span class="left">
            <i class="el-icon-tickets" style="margin-right: 5px"></i>我的收藏
          </span>
          <span
              class="right"
              style="dispaly: inline-block; text-align: right"
              @click="openDialog"
          >
            <span class="more">新建文件夹</span><span class="el-icon-arrow-right more"></span>
          </span>
        </p>
        <div class="collFloderBox" style="border: 1px solid rgba(233, 233, 233, 1);" v-if="collFloderObj.total!=0">
          <ul>
            <li v-for="(item, index) in collList" :key="index">
              <div class="name">{{ item.folderName }}</div>
              <div class="bInfo">
                <div class="date">
                <span>{{
                    item.createTime | dateformat("YYYY-MM-DD hh:mm:ss")
                  }}</span>
                  <span>{{item.countFile}}条内容</span>
                </div>
                <div class="right">
                  <span @click="toCollection(item.id)">查看</span>
                  <span @click="editFlader(item.id,item.folderName)">编辑</span>
                  <span @click="delcollFloder(item.id)">删除</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="page">
            <el-pagination
                @size-change="CollFloderhandleSizeChange"
                @current-change="CollFloderhandleCurrentChange"
                :current-page="collFloderpageNo"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="collFloderPageSize"
                layout="total, prev, pager, next, jumper"
                :total="collFloderObj.total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="nullData" v-else>
          <span></span>
          <img src="~@/assets/images/dataNone.png" alt="">
        </div>
      </div>
      <!-- 我的浏览 -->
      <div class="Collection browse">
        <p><i class="el-icon-view" style="margin-right: 5px"></i>我的浏览</p>
        <div class="border_box" v-if="lookObj.total!=0">
          <ul>
            <li v-for="(item, index) in lookList" :key="index">
              <div class="top">
                <div class="checkBox">
                  <el-checkbox-group
                      v-model="checkedCities2"
                      @change="handleCheckedCitiesChange2"
                  >
                    <el-checkbox :label="item.id"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="content">
                  <div class="title" @click="godetail(item)">{{ item.docName }}</div>
                </div>
              </div>
              <p class="content">
                {{ item.summary }}
              </p>
              <div class="bInfo">
                <div class="date">
                  <span>浏览于：{{ item.createTime }}</span>
                </div>
                <div class="right">
                  <span @click="collect(item.docId,item.textTitle)">收藏</span>
                  <span @click="upload(item)">下载</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="block">
            <div>
              <el-checkbox
                  :indeterminate="isIndeterminate2"
                  v-model="checkAll2"
                  @change="handleCheckAllChange2"
              >全选
              </el-checkbox
              >
              <span class="del" @click="Lookdel">删除记录</span>
            </div>
            <div class="page">
              <el-pagination
                  @size-change="handleSizeChange2"
                  @current-change="handleCurrentChange2"
                  :current-page="currentPage2"
                  :page-sizes="[10, 20, 30, 50]"
                  :page-size="pagesize2"
                  layout="total,  prev, pager, next, jumper"
                  :total="lookObj.total"
              >
              </el-pagination>
            </div>
          </div>
        </div>
        <div class="nullData" v-else>
          <span></span>
          <img src="~@/assets/images/dataNone.png" alt="">
        </div>
      </div>
      <!-- 我的笔记 -->
      <div class="Collection browse myInfo">
        <p>
           <span class="left">
            <i class="el-icon-tickets" style="margin-right: 5px"></i>我的笔记
          </span>
          <span
              class="right"
              style="dispaly: inline-block; text-align: right"
              @click="goMore('Note')"
          >
            <span class="more">查看更多</span><span class="el-icon-arrow-right more"></span>
          </span>
        </p>
        <div class="border_box" v-if="fullpage.total!=0">
          <ul>
            <li v-for="(item, index) in pointList" :key="index">
              <div class="top">
                <!-- <div class="checkBox">
                  <el-checkbox-group
                      v-model="checkedCities"
                      @change="handleCheckedCitiesChange"
                  >
                    <el-checkbox :label="item.id"></el-checkbox>
                  </el-checkbox-group>
                </div> -->
                <div class="content" >
                  <div class="title" @click="look(item)">
                    {{ item.bookmarkName }}
                  </div>
                </div>
              </div>
              <p class="content" style="padding:0">
                {{ item.bookmarkValue }}
              </p>
              <div class="bInfo">
                <div class="date">
                  <span
                  style="padding:0;"
                  >浏览于：{{
                      item.createTime
                          | dateformat("YYYY年MM月DD日 HH时mm分ss秒")
                    }}</span
                  >
                  <span>标签内容：</span>
                  <span style="padding-left: 0; margin: 0">{{
                      item.kgLabels | handleStr
                    }}</span>
                </div>
                <div class="right">
<!--                  <span @click="collect(item.textid,item.bookmarkName)">收藏</span>-->
                  <span @click="noteDEL(item)">删除</span>
                  <span @click="upload(item)">下载</span>
                </div>
              </div>
            </li>
          </ul>
          <div class="block">
<!--            <div>-->
<!--              <el-checkbox-->
<!--                  :indeterminate="isIndeterminate"-->
<!--                  v-model="checkAll"-->
<!--                  @change="handleCheckAllChange"-->
<!--              >全选-->
<!--              </el-checkbox-->
<!--              >-->
<!--&lt;!&ndash;              <span class="del" @click="Notedel">删除记录</span>&ndash;&gt;-->
<!--            </div>-->
<!--            <div class="page">-->
<!--              <el-pagination-->
<!--                  @size-change="handleSizeChange"-->
<!--                  @current-change="handleCurrentChange"-->
<!--                  :current-page="currentPage"-->
<!--                  :page-sizes="[10, 20, 30, 50]"-->
<!--                  :page-size="pagesize"-->
<!--                  layout="total, prev, pager, next, jumper"-->
<!--                  :total="fullpage.total"-->
<!--              >-->
<!--              </el-pagination>-->
<!--            </div>-->
          </div>
        </div>
        <div class="nullData" v-else>
          <span></span>
          <img src="~@/assets/images/dataNone.png" alt="">
        </div>
      </div>
      <div id="contents" v-html="html" style="display:none">

      </div>
    </div>
    <CollDialog
        :switch1="editCollSwitch"
        :type="type"
        :id="collectObj.id"
        :title="collectObj.title"
        :name="editCollname"
        :dialogFormVisible="dialog"
        @cancel="cancel"
        @yesCancel="yesCancel"
    />
    </div>
  </div>
</template>

<script>
import {
  getDataDictionary,
  delFloder,
  getStatistics,
  getData,
  getLook,
  delLook,
  delNote,
  userInfo,
  delData,
  department,
  downloadRecord
} from "../../api/apis";
import CollDialog from "../../common/dialog/collectionFolder";

import {
  getAllCollection,
  cancelCollection,
  getBookNameList,
  GetAllListUrl,
  GetCollList,
} from "../../api/apis";
import $ from "jquery";

export default {
  components: {
    CollDialog,
  },
  data() {
    return {
      // 个人信息
      userInfo: {},
      // 统计信息
      statistics: [],
      // 我的资料列表
      dataList: [],
      input: "",
      currentPage: 1,
      currentPage1: 1,
      currentPage2: 1,
      pagesize: 5,
      pagesize1: 5,
      pagesize2: 5,
      pointList: [],
      pointList1: [],
      pointList2: [],
      fullpage: {},
      fullpage1: {},
      checkAll: false,
      checkAll1: false,
      checkAll2: false,
      isIndeterminate: false,
      isIndeterminate1: false,
      isIndeterminate2: false,
      // 当前所有数据的唯一标识集合
      checkedCities: [],
      checkedCities1: [],
      checkedCities2: [],
      multipleSelection: [],
      multipleSelection1: [],
      multipleSelection2: [],
      // 当前选中的数据的集合
      checkedGameId: [],
      checkedGameId1: [],
      checkedGameId2: [],
      // 收藏文件夹
      collList: [],
      // 浏览列表
      lookList: [],
      // 浏览列表分页信息
      lookObj: {},
      // 新建文件夹弹出层
      dialog: false,
      // 编辑收藏文件夹的开关
      editCollSwitch: false,
      // 编辑收藏文件夹的名称
      editCollname: '',
      form: {
        name: "",
      },
      formLabelWidth: "100px",
      type: '',
      collectObj: {
        id: '',
        title: ''
      },
      collFloderpageNo: 1,
      collFloderPageSize: 5,
      // 收藏文件夹的详细数据
      collFloderObj: {},
      // 删除笔记时的html
      html:'',
      // 我的资料列表
      myDataList:[],
      // 部门
      deptName:''
    };
  },
  filters: {
    handleStr: function (val) {
      if (val) {
        var str = "";
        for (var i = 0; i < val.length; i++) {
          str += val[i].labelName + " ";
        }
        return str;
      } else {
        return "";
      }
      // return ''
    },
    shareFilter:function (val) {
      if(val == 'upload') {
        return '上传'
      }else if(val == 'share') {
        return '分享'
      }else {
        return ''
      }
    },
    gender: function (val) {
      if (val == 0) {
        return '未知'
      } else if (val == 1) {
        return '男'
      } else {
        return '女'
      }
    },
    resultStr:function(val) {
      if(val!='') {
        return val.substring(0,val.length-1)
      }else {
        return ''
      }
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
    this.getNote();
    // this.getCollection();
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 获取个人资料
    this.getuserInfo()
    // 获取统计信息
    this.getstatistics()
    // 获取我的资料列表
    this.getDATA()
    this.GetcollList();
    this.getLookList()
    this.getdepartment()
  },
  methods: {
    // 文件下载
    upload(obj) {
      if(window.localStorage.getItem('token')) {
        var url = obj.docUrl
        var name = obj.docUrl.substring(obj.docUrl.lastIndexOf('/')+1,obj.docUrl.length)
        var id = obj.docId
        //  var frame = $('<iframe style="display: none;" class="multi-download"></iframe>');
        //  frame.attr('src', url);
        // $(document.body).append(frame);
        //  setTimeout(function() {
        //      frame.remove();
        //    }, 1000);
        this.down(url, name,id)
        // var xmlreq = new XMLHttpRequest();
        // xmlreq.open('get', 'http://192.168.1.42:9999/iallchain/personalCenter/downloadFile?fileId='+id,true)
        // xmlreq.responseType = 'blob';
        // xmlreq.setRequestHeader('Content-Type', 'application/json');
        // xmlreq.setRequestHeader("X-Access-Token", window.localStorage.getItem('token'));
        // xmlreq.onload = function(req) {
        //   console.log(req)
        //   var data = req.target.response;
        //   var blob = new Blob([data]);
        //   var a = document.createElement('a');
        //   a.setAttribute("id",'look'+i);
        //   console.log(a)
        //   a = document.getElementById('look'+i)
        //   var blobUrl = window.URL.createObjectURL(blob);
        //   //得到后台传到前台的文件名
        //   // var filename = xmlreq.getResponseHeader("content-disposition");
        //   // if(filename){
        //   // a.download = filename.match(/filename="(\S*)"/)[1];
        //   // }else{
        //   a.download = name
        //   // }
        //
        //   a.href = blobUrl;
        //   a.click();
        //
        // };
        // xmlreq.send()

        // downloadFile({
        //   fileId:this.checkedCities[0]
        // }).then((res)=>{
        //   // window.open('http://192.168.1.42:9999/iallchain/personalCenter/downloadFile?fileId='+this.checkedCities[0])
        //   // var { data } = res
        //   // const filename ='阿里巴巴Java开发手册终极版v1.3.0.pdf'
        //   // let blob = new Blob([res.data],{type: "application/pdf"});
        //   // let a = document.createElement('a');
        //   // a.download = filename;
        //   // a.href = URL.createObjectURL(blob);
        //   // a.click();
        //   // URL.revokeObjectURL(a.href); // 释放URL 对象
        //   //  document.body.removeChild(a);//dom元素找不到，报错 this.$message.success("下载成功")
        //   let blob = new Blob([res.data], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document;charset=utf-8'}); //application/vnd.openxmlformats-officedocument.wordprocessingml.document这里表示doc类型
        //   let downloadElement = document.createElement('a');
        //   let href = window.URL.createObjectURL(blob); //创建下载的链接
        //   let filename = '阿里巴巴Java开发手册终极版v1.3.0.pdf'
        // downloadElement.style.display = 'none';
        // downloadElement.href = href;
        // downloadElement.download = '阿里巴巴Java开发手册终极版v1.3.0.doc' //下载后文件名
        // document.body.appendChild(downloadElement);
        // downloadElement.click(); //点击下载
        // document.body.removeChild(downloadElement); //下载完成移除元素
        // window.URL.revokeObjectURL(href); //释放掉blob对象
        // })

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
              that.adddownloadRecord(id)
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
    // 下载文档记录
    adddownloadRecord(id) {
      downloadRecord({
        id:id
      }).then((res)=>{
        var { data } = res
        if(data.code == 200) {

        }
      })
    },
    // 查询部门
    getdepartment(){
      department().then((res)=>{
        var { data } = res
        if(data.code == 200) {
          var str = ''
          for(var i = 0; i< data.result.length;i++){
            str += data.result[i].title+','
          }
          this.deptName = str.substring(0,str.length-1)
        }
      })
    },
    // 删除我的资料
    DELData(obj){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delData({
          ids: obj.id
        }).then((res)=>{
          var { data } = res
          if(data.code == 200) {
            this.$message({
              type:'success',
              message:'删除成功'
            })
            this.getDATA()
          }else {
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
    // 删除笔记
    noteDEL(item) {
      var id  = item.bookmarkId
      console.log(id)
      this.html = item.textContentKey
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var html = document.querySelectorAll(`a[point=${id}]`)
        // for(var i = 0;i< html.length;i++) {
        //   var text = html[i].innerHTML
        //   var parent = html[i].parentElement
        //   parent.innerHTML = text
        // }
        console.log(html)
        for(var i = 0;i< html.length;i++) {
          var parent = html[i].parentElement
          var child = $(parent)[0].childNodes
          console.log(parent)
          console.log(child)
          var str = ''
          for(var j=0;j<child.length;j++){
            if(child[j].nodeName=='A') {
              str+=child[j].innerHTML
            }else if(child[j].nodeName == '#text') {
              str+=child[j].data
            }else {
              str+=child[j].innerHTML
            }
          }
          parent.innerHTML = str
        }
       
        delNote({
          id:item.id,
          fileid: item.textid,
          textContentKey:document.getElementById('contents').innerHTML,
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '笔记删除成功'
            })
            this.checkedCities = []
            this.getNote()
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {

      });

    },
    // 我的浏览跳转到TrilalXml
    godetail(item){
      this.$router.push({
        path:'/TrilalXml',
        query:{
          textid:item.docId,
          type:item.docType
        }
      })
    },
    // 获取我的浏览列表
    getLookList() {
      getLook({
        pageNo: this.currentPage2,
        pageSize: 5
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.lookList = data.result.records
          this.lookObj = data.result
          for (let i = 0; i < this.lookList.length; i++) {
            this.checkedGameId2.push(this.lookList[i].id);
            this.multipleSelection2 = this.checkedGameId2;
          }
        }
      })
    },
    // 删除浏览记录
    Lookdel() {
      if (this.checkedCities2.length == 0) {
        this.$message.info('请选择数据进行删除')
      } else {
        delLook({
          ids: this.checkedCities2.toString(),
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.checkedCities1 = []
            this.getLookList()
          } else {
            this.$message.error(data.message)
          }
        })
      }
    },
    // 收藏文件夹分页CollFloderhandleSizeChange,CollFloderhandleCurrentChange,collFloderpageNo,collFloderPageSize
    CollFloderhandleSizeChange(val) {
      this.collFloderPageSize = val
      this.GetcollList()
    },
    CollFloderhandleCurrentChange(val) {
      this.collFloderpageNo = val
      this.GetcollList()
    },
    // 获取个人资料
    getuserInfo() {
      userInfo({
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.userInfo = data.result
          window.localStorage.setItem('userInfo',JSON.stringify(data.result))
        }
      })
    },
    // 获取统计信息
    getstatistics() {
      getStatistics({
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.statistics = data.result
        }
      })
    },
    // 获取我的资料列表
    getDATA() {
      getData({
        pageNum: 1,
        pageSize: 5,
      }).then((res)=>{
        var { data} = res
        if(data.code == 200) {
          this.myDataList = data.result.records
        }else {
        }
      })
    },
    // 关闭弹出层
    cancel() {
      this.dialog = false;
    },
    // 打开新建文件夹弹窗
    openDialog() {
      this.type = 'collect'
      this.dialog = true;
      this.editCollSwitch = true
      this.editCollname = ''
    },
    // 新建收藏文件夹成功
    yesCancel() {
      this.GetcollList();
      this.dialog = false;
    },
    // 跳转到具体书籍页面
    goInfo() {
      this.$router.push("/TrilalXml");
    },
    // 打开编辑收藏文件夹
    editFlader(id, name) {
      this.type = 'collect'
      this.dialog = true;
      this.editCollSwitch = false
      this.editCollname = name
      this.collectObj.id = id
    },
    // 收藏
    collect(id, title) {
      this.type = 'collective'
      this.dialog = true;
      this.editCollSwitch = false
      this.editCollname = ''
      this.collectObj.id = id
      this.collectObj.title = '收藏文件夹'
    },
    // 跳转到详细收藏页面
    toCollection(id) {
      this.$router.push({
        path: 'myCollection',
        query: {
          id: id
        }
      });

    },
    // 删除收藏文件夹
    delcollFloder(id) {
      this.$confirm("您确定要删除该文件夹嘛, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            delFloder({
              id: id,
            }).then((res) => {
              var {data} = res;
              if (data.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功",
                });
                this.GetcollList();
              } else {
                this.$message({
                  type: "error",
                  message: data.message,
                });
              }
            });
          })
          .catch(() => {

          });
    },
    // 删除收藏
    del() {
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
      }).then((res) => {
        var {data} = res;
        if (data.code == 200) {
          this.$message({
            type: "success",
            message: "取消收藏成功",
          });
          // this.getCollection();
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
    // 全选和取消全选
    handleCheckAllChange1(val) {
      this.checkedCities1 = val ? this.checkedGameId1 : [];
      this.isIndeterminate1 = false;
    },
    // 单击多选框
    handleCheckedCitiesChange1(value) {
      let checkedCount = value.length;
      this.checkAll1 = checkedCount === this.checkedGameId1.length;
      this.isIndeterminate1 =
          checkedCount > 0 && checkedCount < this.checkedGameId1.length;
    },
    // 全选和取消全选
    handleCheckAllChange2(val) {
      this.checkedCities2 = val ? this.checkedGameId2 : [];
      this.isIndeterminate2 = false;
    },
    // 单击多选框
    handleCheckedCitiesChange2(value) {
      let checkedCount = value.length;
      this.checkAll2 = checkedCount === this.checkedGameId2.length;
      this.isIndeterminate2 =
          checkedCount > 0 && checkedCount < this.checkedGameId2.length;
    },
    handleSizeChange(val) {
      this.pagesize = val;
      this.getCollection();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCollection();
    },
    handleSizeChange1(val) {
      this.pagesize1 = val;
      this.getCollection();
    },
    handleCurrentChange1(val) {
      this.currentPage1 = val;
      this.getCollection();
    },
    handleSizeChange2(val) {
      this.pagesize2 = val;
      this.getLookList();
    },
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.getLookList();
    },
    // 获取收藏文件夹
    GetcollList() {
      GetCollList({
        pageNo: this.collFloderpageNo,
        pageSize: this.collFloderPageSize,
      }).then((res) => {
        var {data} = res;
        if (data.code == 200) {
          this.collList = data.result.records;
          this.collFloderObj = data.result
        }
      });
    },
    // // 获取收藏列表
    // getCollection() {
    //   getAllCollection({
    //     pageNo: this.currentPage,
    //     pageSize: this.pagesize,
    //   }).then((res) => {
    //     var {data} = res;
    //     if (data.code == 200) {
    //       this.pointList1 = data.result.records;
    //       this.fullpage1 = data.result;
    //       this.checkedGameId1 = [];
    //       for (let i = 0; i < this.pointList1.length; i++) {
    //         this.checkedGameId1.push(this.pointList1[i].bookCollecTionId);
    //         this.multipleSelection1 = this.checkedGameId1;
    //       }
    //     }
    //   });
    // },
    editing() {
      this.$router.push("/Editing");
    },
    Journal() {
      this.$router.push("/Journal");
    },
    goBack() {
      this.$router.push('/')

    },
    // 我的收藏查看更多
    goMore(value) {
      this.$router.push({
        path: "/information",
        query: {
          type: value
        }
      });
    },
    // 获取我的笔记
    getNote() {
      GetAllListUrl({
        pageNo: this.currentPage,
        pageSize: this.pagesize,
      }).then((res) => {
        console.log(res)
        var {data} = res;
        if (data.code == 200) {
          this.pointList = data.result.records;
          this.fullpage = data.result;
          this.checkedGameId = [];
          for (let i = 0; i < this.pointList.length; i++) {
            this.checkedGameId.push(this.pointList[i].id);
            this.multipleSelection = this.checkedGameId;
          }
        }
      });
    },
    // 删除我的笔记
    Notedel() {
      if (this.checkedCities.length == 0) {
        this.$message.error('请选择数据后进行操作')
      } else {
        // delNote({
        //   id:this.checkedCities.toString(),
        // }).then((res) => {
        //   var {data} = res
        //   if (data.code == 200) {
        //     this.$message({
        //       type: 'success',
        //       message: '笔记删除成功'
        //     })
        //     this.checkedCities = []
        //     this.getNote()
        //   } else {
        //     this.$message.error(data.message)
        //   }
        // })
      }

    },
    // 从我的笔记跳转到相关的页面并且找到瞄点
    look(obj) {
      this.$router.push({
        path: "/hello",
        query: {
          id: obj.textid,
          name: obj.bookmarkId,
          type: obj.datasource,
        },
      });
    },
    // 修改密码
    editPass(){
      this.$router.push('/editPass')
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

.page {
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  background: rgb(52,87,145);
  width: 100%;
  padding: 20px 30px;
}
.containerr{
  margin: 0 auto;
  background: #fff;
  padding: 20px 30px;
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

.button button:nth-child(1) {
  color: rgb(0, 121, 254);
}

.container {
  margin-top: 20px;
  width: 100%;
  padding: 0 30px 30px 30px;
  border: 1px solid rgba(233, 233, 233, 1);
}

.container .basic > p,
.Statistics > p,
.myInfo > p,
.Collection > p,
.browse > p {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: normal;
  color: #333333;
}

.myInfo > p {
  display: flex;
}

.myInfo .right {
  flex: 1;
}

.container .table {
  display: flex;
  width: 100%;
  height: 225px;
  border: 1px solid rgba(233, 233, 233, 1);
  border-right: none;
  border-bottom: none;
}

.container .table .left {
  width: 25%;
  text-align: center;
  border-right: 1px solid rgba(233, 233, 233, 1);
  border-bottom: 1px solid rgba(233, 233, 233, 1);
}

.container .table .left img {
  margin-top: 60px;
  height: 50px;
  border-radius: 50%;
}

.container .table .left .username {
  font-weight: 400;
  font-style: normal;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
}

.container .table .left .userRule {
  box-sizing: border-box;
  display: inline-block;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: rgb(255, 255, 255);
  padding: 6px 22px;
  margin: 0px auto;
  background-color: rgb(255, 196, 76);
  border-radius: 50px;
}

.container .table .right {
  flex: 1;
}

.table .right .lable {
  border: 1px solid rgba(233, 233, 233, 1);
  border-left: none;
  border-top: none;
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
  text-align: right;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #333;
}

.table .right .value {
  border: 1px solid rgba(233, 233, 233, 1);
  border-left: none;
  border-top: none;
  padding: 0 5px;
  text-align: left;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: rgb(102, 102, 102);
  height: 45px;
  line-height: 45px;
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

/* 我的收藏 */
.collFloderBox {
  border: 1px solid rgba(233, 233, 233, 1);
}

.collFloderBox .page {
  width: 95%;
  margin: 0 auto;
  text-align: right;
  padding-bottom: 20px;
  background: #fff;
}

.Collection ul {
  padding: 0px 0 20px 0;
}

.Collection li {
  width: 95%;
  padding: 20px 10px 10px 10px;
  margin: 0 auto;
  height: 75px;
  border-bottom: 1px dashed rgb(188, 188, 188);
}

.Collection li .name {
  cursor: pointer;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  padding-left: 20px;
  color: #333;
}

.Collection li .bInfo {
  margin-top: 10px;
  display: flex;
}

.Collection li .date {
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #333;
  padding-left: 50px;
}

.Collection li .date span {
  margin-right: 10px;
}

.Collection li .right {
  flex: 1;
  text-align: right;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #333;
}

.Collection li .right span {
  margin-left: 10px;
  cursor: pointer;
}

/* 我的浏览 */
.border_box {
  position: relative;
  height: 100%;
  padding: 0px 0 20px 0;
  border: 1px solid rgba(233, 233, 233, 1);
}

.browse ul {
  padding: 0;
  border: none;
}

.browse ul li {
  height: 120px;
}

.browse .bInfo .date {
  padding: 0;
  margin: 0;
}

.browse .bInfo .date span {
  margin-left: 0;
  padding-left: 40px;
}

.browse li .top {
  display: flex;
  height: 45px;
  padding-right: 20px;
  line-height: 45px;
}

.browse li .checkBox {
  width: auto;
  margin-right: 20px;
}

.browse li:last-child .content {
  border-bottom: none;
}

.browse /deep/ .el-checkbox__label {
  display: none;
}

.browse li .content {
  flex: 1;
  text-align: right;
}

.browse .content div {
  display: inline-block;
}

.browse .content .title {
  cursor: pointer;
  float: left;
  font-weight: 700;
  font-style: normal;
  font-size: 13px;
  color: #333;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.border_box li > .content {
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-style: normal;
  font-size: 12px;
  color: #333;
  text-align: left;
  padding-left: 35px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.browse .block {
  display: flex;
  padding: 0 25px;
  margin-top: 20px;
}

.browse .block {
  width: 100%;
}

.browse .block .del {
  margin-left: 20px;
  font-weight: 400;
  font-style: normal;
  font-size: 13px;
  color: #333;
}

.browse .page {
  flex: 1;
  text-align: right;
  background: #fff;
}
/*查看更多*/
span.more {
  cursor: pointer;
}
/deep/ .el-dialog {
  width: 25%;
}
.del {
  cursor: pointer;
}
</style>