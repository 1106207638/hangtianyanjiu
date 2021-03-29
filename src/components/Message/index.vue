<!-- 编辑资料 -->
<template>
  <div class="page">
    <div class="containerr">
      <header>
        <span>情报信息推送</span>
        <div class="btns">
          <el-button @click="goBack" v-if="details">
            <i class="el-icon-arrow-left"></i>
            返回
          </el-button>
        </div>
      </header>
      <div class="button" v-show="!details">
        <button :class="activeIndex=='all'?'active':''" @click="getMessageList('all')">全部消息</button>
        <el-badge :value="typeCount[item.itemText]" :hidden="typeCount[item.itemText]==0" class="item" v-for="(item,index) in messageTypeList" :key="index">
          <button :class="activeIndex==item.itemValue?'active':''"  @click="getMessageList(item.itemValue)">{{item.itemText}}</button>
        </el-badge>
      </div>
      <div class="container" v-show="!details">
        <div class="head">
          <span> 消息列表 </span>
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
              <td width="5%"></td>
              <td>内容</td>
              <td>接收时间</td>
              <td>消息类型</td>
              <td>消息状态</td>
            </tr>
            <tr v-for="(item,index) in messageList" :key="index">
              <td> <el-checkbox-group
                  v-model="checkedCities"
                  @change="handleCheckedCitiesChange"
              >
                <el-checkbox :label="item.id"></el-checkbox>
              </el-checkbox-group></td>
              <td @click="goDetail(item)" class="contents">{{item.content}}</td>
              <td>{{item.createTime}}</td>
              <td>{{item.typeText}}</td>
              <td>
                <el-badge v-if="item.readStatus=='not_read'" is-dot class="item">未读</el-badge>
                <el-badge v-else is-dot type="success" class="item">已读</el-badge>

              </td>
            </tr>

          </table>
          <div class="block" v-if="fullpage.total!=0">
            <div>
              <el-checkbox
                  :indeterminate="isIndeterminate"
                  v-model="checkAll"
                  @change="handleCheckAllChange"
              >全选
              </el-checkbox
              >
              <el-dropdown trigger="click"  @command="handleCommand">
      <span class="el-dropdown-link">
        更多操作<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-plus" command="del">批量删除</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus" command="noread">标记未读</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-circle-plus" command="read">标记已读</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
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
  </div>
</template>

<script>
import { getMessPush,focusClass,UnreadQuantity,messageStatusUpdata , removeMessage , Unread,Read } from '../../api/apis'
export default {
  filters:{
  },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      // 消息类型列表
      messageTypeList:[],
      // 消息列表
      messageList:[],
      isIndeterminate: false,
      checkAll:false,
      // 当前所有数据的唯一标识集合
      checkedCities: [],
      multipleSelection: [],
      // 当前选中的数据的集合
      checkedGameId: [],
      // 未读数量
      typeCount:{},
      fullpage:{},
      pageNum:1,
      pagesize: 10,
      activeIndex:'all',
      checked: false,
      ruleForm: {
        tel: "",
        rules: "",
        gender: "保密",
        date1: "",
        city: "",
        post: "",
        autograph: "",
        category: "",
        password: "",
        status: true,
      },
      activeObj :{},
      details: false,
      rules: {
        tel: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { type: "number", message: "必须为数字值" },
          { validator: checkPhone, trigger: "blur" },
        ],
        rules: [{ required: true, message: "请选择角色", trigger: "change" }],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }],
        date1: [
          {
            type: "date",
            message: "请选择出生日期",
            trigger: "change",
          },
        ],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        post: [{ required: true, message: "请输入职务", trigger: "blur" }],
        autograph: [{ required: true, message: "请输入签名", trigger: "blur" }],
        category: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个分类",
            trigger: "change",
          },
        ],
        password: [{ type: "password" }],
        status: [{ type: "Boolean" }],
      },
      options: [
        {
          label: "热门城市",
          options: [
            {
              value: "Shanghai",
              label: "上海",
            },
            {
              value: "Beijing",
              label: "北京",
            },
          ],
        },
        {
          label: "城市名",
          options: [
            {
              value: "Chengdu",
              label: "成都",
            },
            {
              value: "Shenzhen",
              label: "深圳",
            },
            {
              value: "Guangzhou",
              label: "广州",
            },
            {
              value: "Dalian",
              label: "大连",
            },
          ],
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getmessageCount()
    this.getMessageClass()

  },
  methods: {
    handleCommand(command) {
      if(this.checkedCities.length==0) {
        this.$message.info('请选择数据后再进行操作！')
      }else {
        if(command=='del'){
          // 批量删除
          removeMessage({
            ids: this.checkedCities.toString()
          }).then((res)=>{
            var { data } = res
            if(data.code == 200) {
                this.$message.success(data.message)
                this.getMessageList(this.activeIndex)
              this.checkedCities = []
              this.getmessageCount()
            }else {
              this.$message.error(data.message)
            }
          })
        }else if(command=='noread'){
          // 标记未读
          Unread(this.checkedCities).then((res)=>{
            var { data } = res
            if(data.code == 200) {
              this.$message({
                type:'success',
                message: data.message
              })
              this.getMessageList(this.activeIndex)
              this.getmessageCount()
            }else {
              this.$message.info(data.message)
            }
          })
        }else {
          // 标记已读
          Read(this.checkedCities).then((res)=>{
            var { data } = res
            if(data.code == 200) {
              this.$message({
                type:'success',
                message: data.message
              })
              this.getMessageList(this.activeIndex)
              this.getmessageCount()
            }else {
              this.$message.info(data.message)
            }
          })
        }
      }
    },
    // 单击多选框
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.checkedGameId.length;
      this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.checkedGameId.length;
    },
    // 全选和取消全选
    handleCheckAllChange(val) {
      console.log(val);
      this.checkedCities = val ? this.checkedGameId : [];
      this.isIndeterminate = false;
    },
    handleSizeChange(val) {
      this.pagesize = val
      this.checkAll = false
      this.getMessageList(this.activeIndex)
    },
    handleCurrentChange(val) {
      this.pageNum = val
      this.checkAll = false
      this.getMessageList(this.activeIndex)
    },
    // 获取分类
    getMessageClass(){
      focusClass({
        dictId:'1324281761262059521'
      }).then((res)=>{
        var { data} = res
        if(data.code == 200) {
          this.messageTypeList = data.result.records
          this.getMessageList('all')
        }
      })
    },
    // 获取未读消息数量
    getmessageCount(){
      UnreadQuantity({}).then((res)=>{
        var { data } = res
        if(data.code == 200) {
          this.typeCount = data.result
          // for(var key in this.typeCount) {
          //   for(var i = 0;i< this.messageTypeList.length;i++){
          //     if(key == this.messageTypeList[i].itemText){
          //       this.messageTypeList[i].countNum = this.typeCount[key]
          //     }
          //   }
          // }
        }
      })
    },
    openLogin(){},
    openFack(){},
    // 获取消息推送列表
    getMessageList(str) {
      this.activeIndex = str
      getMessPush({
        messageClass: str,
        pageNumber:this.pageNum,
        pageSize:this.pagesize
      }).then((res)=>{
        var { data } = res
        if(data.code == 200) {
          this.checkedCities = []
          this.messageList = data.result.records
          for(var i = 0 ; i< this.messageTypeList.length;i++){
            for(var j = 0;j<this.messageList.length;j++){
              if(this.messageTypeList[i].itemValue == this.messageList[j].type){
                this.messageList[j].typeText = this.messageTypeList[i].itemText
              }
            }
          }
          this.fullpage = data.result
          this.checkedGameId = [];
          for (let i = 0; i < this.messageList.length; i++) {
            this.checkedGameId.push(this.messageList[i].id);
            this.multipleSelection = this.checkedGameId;
          }
        }
      })
    },
    //   详情页
    goDetail(obj) {
      this.activeObj = obj
      if(obj.readStatus=='read'){
        this.details = true;

      }else {
        messageStatusUpdata({
          id: obj.id
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            this.getMessageList(this.activeIndex)
            this.getmessageCount()
          }
        })
        this.details = true;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {
        tel: "",
        rules: "",
        gender: "保密",
        date1: "",
        city: "",
        post: "",
        autograph: "",
        category: "",
        password: "",
        status: true,
      };
    },
    Personal() {
      this.$router.push("/Personal");
    },
    Journal() {
      this.$router.push("/Journal");
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
  padding: 0 50px;
  text-align: right;
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
</style>