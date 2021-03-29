<!-- 编辑资料 -->
<template>
  <div class="bg">
    <div class="page">
      <header>
        <span>个人中心</span>
<!--        <div class="btns">-->
<!--          <el-button @click="goBack">-->
<!--            <i class="el-icon-arrow-left"></i>-->
<!--            返回-->
<!--          </el-button>-->
<!--        </div>-->
      </header>
      <div class="button">
        <button @click="Personal">用户详情</button>
        <button @click="editing">编辑资料</button>
        <!--      <button @click="Journal">登录日志</button>-->
        <button>修改密码</button>
      </div>
      <div class="container">
        <div class="head">
          <span> 修改密码 </span>
          <span class="right"><span>*</span>为必填项</span>
        </div>
        <div class="form_box">
          <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
          >
            <el-form-item label="原密码" prop="oldPassword">
              <el-input
                  type="password"
                  v-model.number="ruleForm.oldPassword"
                  placeholder="请输入您的旧密码"
              ></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model="ruleForm.password" placeholder="请输入您的新密码"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="newPassword">
              <el-input type="password" v-model="ruleForm.newPassword"  placeholder="请确认您的密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>

          </el-form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import {ChangePassword} from '../../api/apis'
export default {
  inject:['reload'],
  data() {
    var that = this
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== that.ruleForm.password) {
        console.log('value',value)
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        oldPassword:"",
        password: "",
        newPassword:""
      },
      rules: {
        oldPassword:[{required: true, message: "请输入旧密码", trigger: "blur"},{pattern: /^[a-zA-Z0-9_@$^!~,.*]{4,20}$/, message: '密码仅允许数字、字母、下划线、特殊字符,4到20位', trigger:['blur']},],
        password: [{required: true, message: "请输入新密码", trigger: "blur"},{pattern: /^[a-zA-Z0-9_@$^!~,.*]{4,20}$/, message: '密码仅允许数字、字母、下划线、特殊字符,4到20位', trigger: ['blur']},],
        newPassword:[{required: true, message: "请确认密码", trigger: "blur"},{pattern: /^[a-zA-Z0-9_@$^!~,.*]{4,20}$/, message: '密码仅允许数字、字母、下划线、特殊字符,4到20位', trigger: ['blur']},{ validator: validatePass, trigger: 'blur' }]

      },
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    submitForm(formName) {
      var that =  this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.ruleForm.oldPassword == this.ruleForm.password) {
            return that.$message.info('旧密码不能和新密码相同')
          }else {
            ChangePassword({
              password:this.ruleForm.oldPassword,
              newPassword:this.ruleForm.password,
              confirmPassword:this.ruleForm.newPassword
            }).then((res)=>{
              var { data } = res
              if(data.code == 200) {
                this.$message({type:'success',message:data.message})
                this.$router.push('/')
              }else {
                this.$message.error(data.message)
              }
            })
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.ruleForm = {

      }
    },
    Personal(){
      this.$router.push('/Personal')
    },
    Journal() {
      this.$router.push('/Journal')
    },
    goBack(){
      this.$router.push('/')
    },
    editPass() {
      this.$router.push('/editPass')
    },
    editing(){
      this.$router.push('/editing')
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
  background: rgb(52,87,145);
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
  font-family: '微软雅黑 Bold', '微软雅黑 Regular', '微软雅黑', sans-serif;
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
  width: 50%;
  margin: 50px auto;
}
.container {
  min-height: 500px;
}
</style>