<!-- 登录组件 -->
<template>
  <div class="login-dialog">
    <el-dialog
        title="登录"
        :visible.sync="dialogFormVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        :destroy-on-close="true"
        :append-to-body="true"
        :lock-scroll="false"
    >
      <div class="close">
        <i style="float: right" @click="close" class="el-icon-close"></i>
      </div>
      <img class="logo" src="~@/assets/images/logo1.png" alt=""/>
      <el-form :model="form" ref="ruleForm" v-show="toggle" :rules="rules">
        <el-form-item prop="name">
          <el-input
              prefix-icon="el-icon-user"
              v-model="form.name"
              autocomplete="off"
              placeholder="请输入您的账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              prefix-icon="el-icon-key"
              placeholder="请输入您的密码"
              v-model="form.password"
              @keyup.enter.native="login('ruleForm')"
              show-password
          ></el-input>
        </el-form-item>
        <el-form-item>
<!--          <el-checkbox v-model="form.checked">记住登录状态</el-checkbox>-->
        </el-form-item>
      </el-form>
      <el-form :model="forms" ref="ruleForms" v-show="!toggle" :rules="ruless">
        <SelectTree
            :props="props"
            :options="deptList"
            :value="valueId"
            :clearable="isClearable"
            :accordion="isAccordion"
            placeholder="请选择部门"
            @getValue="getValue($event)"
        />
        <el-form-item prop="name">
          <el-input
              prefix-icon="el-icon-user"
              v-model="forms.name"
              autocomplete="off"
              placeholder="请输入您的账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
              prefix-icon="el-icon-key"
              placeholder="请输入您的密码"
              v-model="forms.password"
              show-password
          ></el-input>
        </el-form-item>
        <el-form-item prop="realname">
          <el-input
              prefix-icon="el-icon-user"
              placeholder="请输入您的真实姓名"
              v-model="forms.realname"
              autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <el-button type="primary" @click="login('ruleForm')" v-if="toggle">登录</el-button>
      <el-button type="primary" @click="login('ruleForms')" v-else>立即注册</el-button>
      <span class="toggle" @click="togglee" v-if="toggle">注册新用户</span>
      <span class="toggle" @click="togglee" v-else>账号密码登录</span>
    </el-dialog>
  </div>
</template>

<script>
import {Login, getAllDeptList, register, nameCheck,userRule} from '../../api/apis'
import SelectTree from "../dialog/select";
export default {
  inject: ['reload','cancelLogin'],
  components: {
    SelectTree
  },
  name: "Login",
  props: {
      dialogFormVisible: {
        type: Boolean,
        default: () => {
          return false
        }
      },
    toggle:{
      type: Boolean,
      default: () => {
        return true
      }
    },
      isLoad: {
        type: Boolean,
        default: () => {
          return true
        }
      },
    },
  data() {
    var checkUsername = (rule, value, callback) => {
      if (value != '') {
        this.getList(callback)
        // if (this.getList(callback)) {
        //   callback(new Error('用户名已存在'));
        // }
        // callback();
      }
    };
    return {
      userRules:[{
        name:'普通用户',
        code:'commonuser'
      },{
        name:'情报操作员',
        code :'Information_operator'
      },{
        name:'情报审核员',
        code:'information_audit'
      },{
        name:'课代表',
        code:'subject_representative'
      },{
        name:'用户注册管理员',
        code:'user_register_administrator'
      },{
        name:'系统管理员',
        code:'system_administrator'
      },{
        name:'超级管理员',
        code:'super_administrator'
      },{
        name:'管理员',
        code:'admin'
      }],
      form: {
        name: "",
        password: "",
        checked: false,
      },
      rules: {
        name: [{required: true, message: "请输入账号", trigger: "blur"}],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
      },
      forms: {
        name: "",
        realname: "",
        password: "",
        checked: false,
      },
      ruless: {
        realname: [{required: true, message: "请输入真实姓名", trigger: "blur"}],
        name: [{required: true, message: "请输入账号", trigger: "blur"}, {validator: checkUsername, trigger: 'blur'}],
        password: [{required: true, message: "请输入密码", trigger: "blur"}],
      },
      // 开关
      props: {
        // 配置项（必选）
        value: "id",
        label: "departName",
        children: "children"
        // disabled:true
      },
      deptList: [],
      valueId: '',
      isClearable: true, // 可清空（可选）
      isAccordion: false, // 可收起（可选）
      timer: ''
    };
  },
  // watch: {
  //   'forms.name': {
  //     deep: true,
  //     handler(newVal, oldVal) {
  //       // if (newVal.trim().length !== 0) {
  //       //this.getList是methods中延迟后调用的方法 延迟500ms
  //       this.debounce(this.getList, 900)
  //       // }
  //     }
  //   }
  // },
  //生命周期 - 创建完成（访问当前this实例）
  created() {
  },
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getdeptList()
  },
  methods: {
    // 获取用户权限
    getuserRule(){
      userRule().then((res)=>{
        var { data } = res
        if(data.code == 200) {
          var str = ''
          for(var i = 0; i< data.result.length;i++) {
            str+=data.result[i]+','
          }
          window.sessionStorage.setItem('webpack-dev-server',str)
          var arr = data.result
          var length = arr.length
          if(length == 1) {
            if(arr[0]=='commonuser') {
              window.localStorage.setItem('backstage',false)
            }else {
              window.localStorage.setItem('backstage',true)
            }
          }else {
            window.localStorage.setItem('backstage',true)
          }
          for(var i = 0;i<arr.length;i++) {
            if(arr[i] == 'content001') {
              window.localStorage.setItem('webpack-edit',true)
            }
          }
          this.$emit("yesCancel");
        }
      })
    },
    // 验证用户名是否被注册
    getList(callback) {
      nameCheck({
        username: this.forms.name
      }).then((res) => {
        var {data} = res
        if (data.code == 200) {
          callback()
        } else {
          callback(new Error('用户名已存在'));
        }
      })
    },
    // 获取部门
    getdeptList() {
      getAllDeptList().then((res) => {
        var {data} = res
        if (data.code == 200) {
          this.deptList = data.result
        }
      })
    },
    getValue(value) {
      this.valueId = value;
    },
    togglee(rulename) {
      this.toggle = !this.toggle
      this.$refs['ruleForm'].resetFields();
      this.$refs['ruleForms'].resetFields();
    },
    cancel() {
      this.form.name = ''
      this.form.password = ''
      this.$emit("cancel");
    },
    close() {
      this.form.name = ''
      this.form.password = ''
      this.$emit("cancel");
    }, login
        (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.toggle) {
            Login({
              username: this.form.name,
              password: this.form.password
            }).then((res) => {
              var {data} = res
              if (data.code == 200) {
                this.$message({
                  type: 'success',
                  message: '登陆成功'
                })
                this.$store.commit('editPassword',this.form.password)
                this.form.name = ''
                this.form.password = ''
                window.localStorage.setItem('token', data.result.token)
                window.localStorage.setItem('Authorization', data.result.token)
                window.localStorage.setItem('userInfo', JSON.stringify(data.result.userInfo))
                this.getuserRule()
                // if(this.isLoad) {
                //   this.reload()
                // }
              } else  {
                this.$message({
                  type: 'error',
                  message: data.message
                })
              }
            })
          } else {
            if (this.valueId == '') {
              this.$message.error('请选择部门')
            } else {
              register({
                partID: this.valueId,
                password: this.forms.password,
                realname: this.forms.realname,
                username: this.forms.name
              }).then((res) => {
                var {data} = res
                if (data.code == 200) {
                  this.$message({
                    type: 'success',
                    message: data.message
                  })
                  this.$refs[formName].resetFields();
                  this.valueId = ''
                  this.dialogFormVisible = false
                  this.$emit("yesCancell");
                } else {
                  this.$message.info(data.message)
                }
              })
            }
          }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
/deep/ .el-dialog__close {
  display: none;
}

/deep/ .el-dialog__header {
  display: none;
}

/deep/ .el-dialog__body {
  position: relative;
  text-align: center;
  padding: 30px 30px 20px 30px;
  padding-top: 10px;
  line-height: initial;
}

/deep/ .el-dialog {
  width: 340px;
}

.logo {
  width: 100px;
  margin: 0 auto;
}

/deep/ .el-form {
  margin-top: 10px;
  text-align: left;
}

/deep/ .el-dialog__footer {
  display: none;
}

.login-dialog /deep/ .el-checkbox__label {
  display: inline-block;
}

.el-button {
  width: 100%;
}

.close {
  height: 20px;
}

.close i {
  top: 15px;
  right: 15px;
  position: absolute;
  cursor: pointer;
  padding: 5px;
}

/*.el-form .el-form-item:last-child {*/
/*  margin-bottom: 0;*/
/*}*/
.el-select {
  margin-bottom: 20px;
}

.toggle {
  margin-top: 10px;
  cursor: pointer;
  display: block;
  text-align: right;
  line-height: 1.5;
}
</style>