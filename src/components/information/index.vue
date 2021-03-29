<!-- 我的资料 -->
<template>
  <div class="bg">
    <div class="page">
      <header>
        <span>{{ type == 'Note' ? '我的笔记' : '我的资料' }}</span>
        <div class="btns">
<!--          <el-button @click="refresh">-->
<!--            <i class="el-icon-refresh"></i>-->
<!--            刷新-->
<!--          </el-button>-->
          <el-button @click="goBack">
            <i class="el-icon-arrow-left"></i>
            返回
          </el-button>
        </div>
      </header>
      <div class="condition">
        <el-row>
          <el-col :span="16">
            <div class="left">
              <div v-if="type=='Data'" :class="dataIndex=='upload'?'condition_item active':'condition_item'" @click="toggleData('upload')"
                  ><i class="el-icon-upload"></i>我上传的
              </div>
              <div v-if="type=='Data'" :class="dataIndex=='share'?'condition_item active':'condition_item'" @click="toggleData('share')"
                   ><i class="el-icon-share"></i>共享给我的
              </div>
              <div v-if="type=='Data'" style="width:200px;position: relative">
                <div :class="dataIndex=='fileClass'?'condition_item active':'condition_item'"
                     @mousemove="itemMousemove($event)"
                     @mouseover="itemMouseover"
                     @mouseout="itemMouseout">文件筛选
                </div>
                <div class="hovers" @mousemove="itemMousemove($event)"
                     @mouseover="itemMouseover"
                     @mouseout="itemMouseout">
                  <ul>
                    <li :class="classs =='全部'?'active':''" @click="toggleTYPE('全部')">全部</li>
                    <li v-for="(item,index) in fileType" :class="classs == item.itemText?'active':''"
                        @click="toggleTYPE(item.itemText)" :key="index">{{ item.itemText }}
                    </li>
                  </ul>
                </div>
              </div>
              <el-input
                  v-if="type=='Data'"
                  placeholder="请输入文件名称"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="onSubmit"
                  v-model="value"
              >
              </el-input>
              <div v-if="type=='Note'" style="width:200px;position: relative">
                <div class="condition_item active"
                     @mousemove="itemMousemove($event)"
                     @mouseover="itemMouseover"
                     @mouseout="itemMouseout">标签筛选
                </div>
                <div class="hovers" @mousemove="itemMousemove($event)"
                     @mouseover="itemMouseover"
                     @mouseout="itemMouseout">
                  <ul>
                    <li :class="activelabelname =='全部'?'active':''" @click="toggleTYPE('全部')">全部</li>
                    <li v-for="(item,index) in flagList" :class="activelabelname == item.labelName?'active':''"
                        @click="toggleTYPE(item.labelName)" :key="index">{{ item.labelName }}
                    </li>
                  </ul>
                </div>
              </div>
              <el-input
                  v-if="type=='Note'"
                  placeholder="请输入文件名称"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="onSubmit"
                  v-model="noteFileInput"
              >
              </el-input>
              <div v-if="type=='Note'" style="width: 10px"></div>
              <el-input
                  v-if="type=='Note'"
                  placeholder="请输入笔记名称"
                  prefix-icon="el-icon-search"
                  @keyup.enter.native="onSubmit"
                  v-model="noteInput"
              >
              </el-input>
            </div>
          </el-col>

          <el-col :span="8">
            <div class="right" v-if="type=='Data'">
              <!--            <el-button @click="NewFolder">-->
              <!--              <i class="el-icon-folder-add"></i>-->
              <!--              新建文件夹</el-button-->
              <!--            >-->

              <el-button type="primary" @click="newFile">
                <i class="el-icon-tickets"></i>
                新建资料
              </el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="container">
        <!--      <div class="bread" style="height: 50px; line-height: 50px" v-if="type=='Data'">-->
        <!--        <span>全部文件</span>-->
        <!--        <i>/</i>-->
        <!--        <span>全部文件</span>-->
        <!--      </div>-->
        <div class="head">
          <span> {{ type == 'Note' ? '笔记列表' : '资料列表' }} </span>
          <div class="function" v-if="type=='Data'">
            <el-button @click="share">
              <i class="el-icon-folder-add"></i>
              分享
            </el-button
            >
            <el-button @click="upload">
              <i class="el-icon-tickets"></i>
              下载
            </el-button
            >
            <!--          <el-button>-->
            <!--            <i class="el-icon-edit-outline"></i>-->
            <!--            重命名</el-button-->
            <!--          >-->

            <!--          <el-button>-->
            <!--            <i class="el-icon-document-copy"></i>-->
            <!--            复制</el-button-->
            <!--          >-->
            <!--          <el-button>-->
            <!--            <i class="el-icon-rank"></i>-->
            <!--            移动</el-button-->
            <!--          >-->

            <el-button @click="DELData">
              <i class="el-icon-delete"></i>
              删除
            </el-button
            >
          </div>
        </div>
        <div v-if="fullpage.total!=0">
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
              <td width="5%">
                <el-checkbox
                v-if="type=='Data'"
                    :indeterminate="isIndeterminate"
                    v-model="checkAll"
                    @change="handleCheckAllChange"
                >全选
                </el-checkbox
                >
              </td>
              <td>文件</td>
              <td v-if="type=='Data'">文件大小</td>
              <td v-if="isall&&type=='Note'">笔记内容</td>
              <td v-if="type=='Data'">文件类型</td>
              <td v-if="isall&&type=='Note'">笔记标签</td>
              <td v-if="type=='Data'">文件来源</td>
              <td v-if="type=='Data'">共享状态</td>
              <td>更新时间</td>
              <td v-if="type=='Note'">操作</td>

            </tr>
            <tr v-for="(item,index) in collList" :key="index">
              <td>
                <el-checkbox-group
                    v-if="type=='Data'"
                    v-model="checkedCities"
                    @change="handleCheckedCitiesChange"
                >
                  <el-checkbox :label="item.id"></el-checkbox>
                </el-checkbox-group>
              </td>
              <td @click="getInto('in',item.id)" v-if="type=='Data'">{{ item.docName }}</td>
              <td @click="getInto(item)" v-if="isall&&type=='Note'">{{ item.filetitle }}</td>
              <td v-if="type=='Data'">{{ item.docSize }}</td>
              <td v-if="isall&&type=='Note'">{{ item.bookmarkName }}</td>
              <td v-if="type=='Data'">{{ item.docType }}</td>
              <td v-if="isall&&type=='Note'">{{ item.kgLabels | renders }}</td>
              <td v-if="type=='Data'&&dataIndex=='share'">{{item.shareUser}}</td>
              <td v-if="type=='Data'&&dataIndex!='share'">{{item.source | shareFilter}}</td>
              <td v-if="type=='Data'">{{ item.shareStatus }}</td>
              <td>{{ item.createTime }}</td>
              <td v-if="type=='Note'"><el-button type="danger" @click="deleteNote(item)">删除</el-button></td>
            </tr>

          </table>
          <div class="fullPage">

            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="fullpage.total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="nullData" v-else>
          <span></span>
          <img src="~@/assets/images/dataNone.png" alt="">
        </div>

      </div>
      <div id="contents" style="display:none" v-html="html"></div>
      <el-dialog title="新建文件" :close-on-press-escape="false" :append-to-body="true"
                 :lock-scroll="false" :close-on-click-modal="false" :visible.sync="dialogFormVisible">
        <el-form :model="form" :rules="rules">
          <el-form-item label="上传文件" :label-width="formLabelWidth">
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
                :limit="100"
                :auto-upload="true"
                :on-exceed="handleExceed"
                :file-list="fileList"
            >
              <el-button size="small" type="primary">选择附件</el-button>
              <div slot="tip" class="el-upload__tip">
                单个文件不能超过20MB
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onloadFile"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
      <el-dialog title="添加文件夹" :append-to-body="true"
                 :lock-scroll="false" :visible.sync="dialogNewFolder">
        <el-form :model="form">
          <el-form-item>
            <el-input
                v-model="folderName"
                placeholder="输入文件夹名称"
                autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogNewFolder = false">取 消</el-button>
          <el-button type="primary" @click="dialogNewFolder = false"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
      <el-dialog title="分享" :append-to-body="true"
                 :lock-scroll="false" :visible.sync="dialogFormVisible1">

        <!--      <div class="operation">-->
        <!--        <el-checkbox-->
        <!--            v-model="checkAll1"-->
        <!--            @change="handleCheckAllChange1"-->
        <!--        />全选-->
        <!--      </div>-->
        <el-tree
            ref="organizationData"
            :load="loadNode"
            lazy
            show-checkbox
            default-expand-all
            node-key="id"
            @check-change="handleCheckChange"
            :props="defaultprops"
        ></el-tree>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="shareYES">确 定</el-button>
        </div>
      </el-dialog>

    </div>

  </div>
</template>

<script>
import {
  GetCollList,
  getAllNote,
  GetMyNote,
  getNoteSearch,
  focusClass,
  getData,
  downloadFile,
  ajaxRequest,
  delData,
  delNote,
  getPeopelTree,
  Department,
  Share,
  Getflag
} from '../../api/apis'
import $ from 'jquery'
import SelectTree from "../../common/dialog/select";

export default {
  inject: ['reload'],
  components: {
    SelectTree
  },
  data() {
    return {
      uploadURL:window._CONFIG['baseURL']+'kgInformationFilePut/add',
      datas:{
        source:'upload',
        usershare:'usershare'
      },
      props: {
        // 配置项（必选）
        value: "id",
        label: "departName",
        children: "children"
        // disabled:true
      },
      defaultprops: {
        value: "id",
        label: "departName",
        children: "children"
      },
      // 人员选择当前选中的节点
      checkNode: [],
      isClearable: true, // 可清空（可选）
      isAccordion: false, // 可收起（可选）
      dialogFormVisible1: false,
      currentPage: 1,
      classs: '全部',
      pagesize: 10,
      fullpage: {},
      value: "",
      isall: true,
      checked: false,
      dialogFormVisible: false,
      dialogNewFolder: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      flagList:[],
      headers: {
        "X-Access-Token": window.localStorage.getItem('token')
      },
      // 我的资料刚进来的类型
      dataIndex: 'upload',
      // 当前页面的类型 我的笔记/我的资料
      type: '',
      rules: {
        name: [{required: true, message: "请输入文件标题", trigger: "blur"}],
      },
      // 文件夹列表
      collList: [],
      checkAll: false,
      // 人员选择（全选）
      checkAll1: false,
      isIndeterminate: false,
      // 当前所有数据的唯一标识集合
      checkedCities: [],
      multipleSelection: [],
      // 当前选中的数据的集合
      checkedGameId: [],
      folderName: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value2: [],
      formLabelWidth: "80px",
      fileList: [],
      fileType: [],
      uploadcount: 0,
      // 部门数据
      treeList: [],
      valueId: 1,
      noteInput:'',
      noteFileInput:'',
      activelabelname:'全部',
      html:''
    };
  },
  filters: {
    renders(val) {
      if (val) {
        var str = ''
        for (var i = 0; i < val.length; i++) {
          str += val[i].labelName + ','
        }
        return str.substring(0, str.length - 1)
      } else {
        return ''
      }
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
  },
  computed: {},
  //生命周期 - 创建完成（访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    // 我的资料获取帅选条件
    if (this.$route.query.type == 'Note') {
      this.type = 'Note'
      this.GetcollList()
      this.getflag()
    } else {
      this.type = 'Data'
      this.getFILEtype()
      this.getDataList()
      this.treepeopel()
    }
  },
  methods: {
    deleteNote(item) {
      var id  = item.bookmarkId
      console.log(id)
      this.html = item.textContentKey
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        var html = document.getElementById('contents').querySelectorAll(`a[point=${id}]`)
        // for(var i = 0;i< html.length;i++) {
        //   var text = html[i].innerHTML
        //   var parent = html[i].parentElement
        //   parent.innerHTML = text
        // }
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
            this.GetcollList()
          } else {
            this.$message.error(data.message)
          }
        })
      }).catch(() => {

      });

    },
    // 获取所有的标签
    getflag() {
      Getflag().then((res)=>{
        var { data} = res
        if(data.code == 200) {
          this.flagList = data.result
        }
      })
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(this.treeList);
      }
      if (node.level === 1) {
        return resolve(this.treeList[0].children);
      } else {
        Department({
          depId: node.key
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            if (data.result != null) {
              var list = data.result.records
              for (var i = 0; i < list.length; i++) {
                list[i].departName = list[i].realname
              }
              return resolve(list);
            } else {
              return resolve([]);
            }

          } else {
            return resolve([])
          }
        })
        // return resolve(this.treeList[0].children);
      }


    },
    // 分享确认人员
    shareYES() {
      var checkedKeys = this.$refs.organizationData.getCheckedKeys()
      var list = this.treeList
      var arr = []
      arr.push(list[0].id)
      for (var i = 0; i < list[0].children.length; i++) {
        arr.push(list[0].children[i].id)
      }

      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < checkedKeys.length; j++) {
          if (arr[i] == checkedKeys[j]) {
            checkedKeys.splice(j, 1)
          }
        }
      }
      Share({
        users: checkedKeys,
        files: this.checkedCities
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.$message({
            type: 'success',
            message: data.message
          })
          this.dialogFormVisible1 = false
          this.getDataList()
        } else {
          this.$message.error(data.message)
        }
      })
    },
    handleCheckChange(data, checked, indeterminate) {
      var checkedKeys = this.$refs.organizationData.getCheckedKeys()
    },
    getCurrentKey(data) {
      console.log(data);
    },
    // 分享
    share() {
      if (this.checkedCities.length == 0) {
        this.$message.info("请选择要共享的数据")
      } else {
        this.dialogFormVisible1 = true
      }

    },
    getValue(value) {
      this.valueId = value;

    },
    // 获取人员部门（树形结构）
    treepeopel() {
      getPeopelTree({}).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.treeList = data.result
        }
      })
    },
    // 删除我的资料（多选）
    DELData() {
      if(this.checkedCities.length == 0 ) {
        this.$message.info('请选择数据后再进行操作')
      }else {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delData({
            ids: this.checkedCities.toString()
          }).then((res) => {
            var {data} = res
            if (data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.getDataList()
              this.checkedCities = []
              this.checkAll = false
            } else {
              this.$message.error(data.message)
            }
          })
        }).catch(() => {

        });
      }

    },
    // 文件下载
    upload() {
      if (this.checkedCities.length == 0) {
        this.$message.info("请选择要下载的数据")
      } else {
        console.log(this.collList)
        var list = this.collList
        var arr = []
        for (var j = 0; j < this.checkedCities.length; j++) {
          for (var i = 0; i < list.length; i++) {
            if (this.checkedCities[j] == list[i].id) {
              arr.push(list[i])
            }
          }
        }
        for (var i = 0; i < arr.length; i++) {
          var url = arr[i].docUrl
          var name = arr[i].docUrl.substring(arr[i].docUrl.lastIndexOf('/')+1,arr[i].docUrl.length)
          //  var frame = $('<iframe style="display: none;" class="multi-download"></iframe>');
          //  frame.attr('src', url);
          // $(document.body).append(frame);
          //  setTimeout(function() {
          //      frame.remove();
          //    }, 1000);
          this.down(url, name)
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
        }

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

      }
    },
    down(url, name) {
      var that = this
      if (url.indexOf('rar') != -1) {
        window.open(url)
      } else {
        var xmlreq = new XMLHttpRequest();
        xmlreq.open('get', url, true)
        xmlreq.responseType = 'blob';
        xmlreq.setRequestHeader('Content-Type', 'application/json');
        xmlreq.setRequestHeader("X-Access-Token", window.localStorage.getItem('token'));
        xmlreq.onload = function (req) {
          console.log(req)
          var data = req.target.response;
          var blob = new Blob([data]);
          var a = document.createElement('a');
          var blobUrl = window.URL.createObjectURL(blob);
          //得到后台传到前台的文件名
          // var filename = xmlreq.getResponseHeader("content-disposition");
          // if(filename){
          // a.download = filename.match(/filename="(\S*)"/)[1];
          // }else{
          a.download = name
          // }
          that.$message({
            type: 'success',
            message: name + '开始下载'
          })
          a.href = blobUrl;
          a.click();

        };
        xmlreq.send()
      }

    },
    // 全选和取消全选
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedCities = val ? this.checkedGameId : [];
      this.isIndeterminate = false;
    },
    // 全选和取消全选（人员）
    handleCheckAllChange1(val) {
      if (this.checkAll1) {
        //全选
        this.$refs.organizationData.setCheckedNodes(this.treeList);
      } else {
        //取消选中
        this.$refs.organizationData.setCheckedNodes([]);
      }
    },
    // 单击多选框
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedGameId.length;
      this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checkedGameId.length;
    },
    // 上传文件
    onloadFile() {
      this.$refs.upload.submit();
    },
    // 我的资料列表
    getDataList() {
      if (this.dataIndex == 'keyWord') {
        var obj = {
          conditionClass: this.dataIndex,
          parameter: this.value,
          pageNum: this.currentPage,
          pageSize: this.pagesize,
        }
      } else if (this.dataIndex == 'upload' || this.dataIndex == 'share') {
        var obj = {
          conditionClass: 'source',
          parameter: this.dataIndex,
          pageNum: this.currentPage,
          pageSize: this.pagesize,
        }
      } else if (this.dataIndex == 'fileClass') {
        var obj = {
          conditionClass: 'fileClass',
          parameter: this.classs + '类型',
          pageNum: this.currentPage,
          pageSize: this.pagesize,
        }
      }
      getData(obj).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.collList = data.result.records
          this.fullpage = data.result
          this.checkedGameId = [];
          for (let i = 0; i < this.collList.length; i++) {
            this.checkedGameId.push(this.collList[i].id);
            this.multipleSelection = this.checkedGameId;
          }
        }
      })
    },
    toggleTYPE(str) {
      if(this.type=='Data') {
        this.classs = str
        this.checkedCities = []
        this.checkAll = ''
        this.dataIndex = 'fileClass'
        this.getDataList()
      }else {
        this.activelabelname = str
        this.GetcollList()
      }

    },
    // 获取文件类型
    getFILEtype() {
      focusClass({
        dictId: '1315842972834656258'
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.fileType = data.result.records
        }
      })
    },
    itemMouseover: function () {
      $('.hovers').css({
        display: 'none'
      })
    },

    itemMouseout: function () {
      $('.hovers').css({
        display: 'none'
      })
    },
    itemMousemove: function (e) {
      $('.hovers').css({
        display: 'block'
      })
    },
    // 切换条件
    toggleData(str) {
      this.dataIndex = str
      this.checkedCities = []
      this.checkAll = ''
      this.getDataList()

    },
    // 输入框回车事件
    onSubmit() {
      // if(this.value=='') {
      //   this.$message.info('请输入关键字')
      // }else
      if (this.type == 'Data') {
        this.checkedCities = []
        this.checkAll = ''
        this.dataIndex = 'keyWord'
        this.getDataList()
      } else {
        this.GetcollList()
      }
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
        this.$refs.upload.clearFiles();
        this.uploadcount = 0
      }

    },
    // 文件上传失败
    fileerror(err, file, fileList) {
      console.log(err)
    },
    onchange(file, fileList) {
      console.log(fileList)
      let fileName = file.name;
      let uid = file.uid
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      // if (
      //     lastName.toLowerCase() !== ".zip" &&
      //     lastName.toLowerCase() !== ".rar" &&
      //     lastName.toLowerCase() !== ".docx" &&
      //     lastName.toLowerCase() !== ".pdf"
      // ) {
      //   this.$message.error("文件必须为.rar .zip .doc .docx .pdf 类型");
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
          file.size / 1024 / 5 >= 1
      if (!isLt) {
        this.$message.error("上传文件大小不得小于5KB,不得大于20MB!");
        for (var i = 0; i < fileList.length; i++) {
          if (fileList[i].uid == uid) {
            fileList.splice(i, 1)
          }
        }
      }
      return isLt;
    },
    beforeAvatarUpload(file) {
      let fileName = file.name;
      let pos = fileName.lastIndexOf(".");
      let lastName = fileName.substring(pos, fileName.length);
      if (
          lastName.toLowerCase() !== ".zip" &&
          lastName.toLowerCase() !== ".rar" &&
          lastName.toLowerCase() !== ".docx" &&
          lastName.toLowerCase() !== ".pdf"
      ) {
        // this.$message.error("文件必须为.rar .zip .doc .docx .pdf 类型");
        // this.resetCompressData()
        // return;
      }
      // 限制上传文件的大小
      const isLt =
          file.size / 1024 / 5 >= 1 && file.size / 1024 / 1024 / 100 <= 1;
      if (!isLt) {
        this.$message.error("上传文件大小不得小于5KB,不得大于100MB!");
      }
      return isLt;
    },
    NewFolder() {
      this.dialogNewFolder = true;
    },
    // 新建文件
    newFile() {
      this.fileList = []
      this.dialogFormVisible = true;
    },
    Personal() {
      this.$router.push("/Personal");
    },
    goBack() {
      this.$router.go(-1);
    },
    // 刷新当前页面
    refresh() {
      this.reload()
    },
    Editing() {
      this.$router.push("/Editing");
    },
    handleSizeChange(val) {
      this.pagesize = val;
      if(this.type=='Note') {
        this.GetcollList()
      }else {
        this.getDataList()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      if(this.type=='Note') {
        this.GetcollList()
      }else {
        this.getDataList()
      }
    },
    // 进入文件夹
    getInto(index, obj) {
      if (index == 'in') {
        this.isall = false;
        if (this.type == 'Data') {

        }
      } else {
        this.$router.push({
          path: '/hello',
          query: {
            type: index.datasource,
            id: index.textid,
            name: index.bookmarkId
          }
        });
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
          `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
              files.length + fileList.length
          } 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 获取文件夹
    GetcollList() {
      // 判断是什么类型的页面  Data ---- 我的资料   Note ---- 我的笔记
      if (this.type == 'Data') {
        GetCollList({}).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.collList = data.result
          }
        })
      } else {
        if(this.activelabelname=='全部') {
          var name = ''
        }else {
          var name = this.activelabelname
        }
        getNoteSearch({
          pageNo: this.currentPage,
          pageSize: this.pagesize,
          KgMarkName: this.noteInput,
          filename:this.noteFileInput,
          labelname:name
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            var resultt = data.result.records
            for (var i = 0; i < resultt.length; i++) {
              resultt[i].folderName = resultt[i].markFolderName
            }
            this.collList = resultt
            this.fullpage = data.result
          }
        })
      }
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
.bg {
  background: rgb(52, 87, 145);
  padding: 20px 30px;
}
.page {
  background: #fff;
  box-sizing: border-box;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑", sans-serif;
  margin: 0 auto;
  padding: 20px 30px;
}

/* 头部区域 */
header {
  position: relative;
  height: 60px;
  line-height: 60px;
  margin-top: 3px;
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
  min-height: 500px;
}

.container .head {
  height: 60px;
  line-height: 60px;
  display: flex;
}

.container .head > span,
.bread span {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: normal;
  color: #333333;
}

.bread span:hover {
  cursor: pointer;
  color: rgb(64, 158, 255);
}

.bread i {
  display: inline-block;
  font-size: 12px;
  width: 20px;
  text-align: center;
}

.container .head .function {
  flex: 1;
  text-align: right;
}

table td {
  border: none;
  text-align: center;
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

table tr td:last-child {
  border-right: 1px solid rgba(233, 233, 233, 1);
}

.page .fullPage {
  margin-top: 30px;
  text-align: right;
}

.condition {
  padding: 0 30px;
  height: 100px;
  line-height: 100px;
  border: 1px solid rgba(233, 233, 233, 1);
}

.condition .left {
  display: flex;
  line-height: 100px;
}

.condition .left .el-input {
  width: 34%;
}

.condition .left .condition_item {
  margin-top: 32px;
  text-align: center;
  flex: 1;
  height: 35px;
  line-height: 35px;
  margin-right: 10px;
  font-size: 14px;
  color: #999;
  font-weight: normal;
  border: 1px solid rgba(233, 233, 233, 1);
  cursor: pointer;
}

.condition .left .condition_item.active {
  border: 1px solid rgb(0, 121, 254);
  color: rgb(0, 121, 254);
}

.hovers {
  display: none;
  width: 100%;
  width: 260px;
  max-height: 180px;
  background: #fff;
  border: 1px solid #ccc;
  border-top: 0;
  position: absolute;
  line-height: 1;
  padding: 20px;
  overflow-y: scroll;
}

.hovers::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}

.hovers::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}

.hovers ul {
  width: 218px;
}

.hovers li {
  float: left;
  text-align: center;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  cursor: pointer;
}

.hovers li.active {
  border: 1px solid rgb(0, 121, 254);
  color: rgb(0, 121, 254);
}

.hovers li:nth-child(2n) {
  float: right;
}

.condition .right {
  text-align: right;
}

/* 修改弹出层样式 */
/deep/ .el-dialog {
  width: 27%;
}

/deep/ .el-dialog__body {
  padding: 30px 30px;
}

.el-select-dropdown__item {
  padding: 0 20px;
}

.el-checkbox-group {
  font-size: 12px;
}

.mess_num {
  margin-left: 5px;
  color: rgb(64, 158, 255);
}

/* 新建文件夹 */
/deep/ .el-dialog__title {
  font-weight: 700;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  color: #333;
}

td /deep/ .el-checkbox__label {
  display: none;
}
</style>