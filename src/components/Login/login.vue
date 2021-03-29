<template>
  <!-- <div class="login-wrap">
  <div class="video-bg">
   <video muted="" data-autoplay="" loop="" autoplay="" src="https://gss3.baidu.com/6LZ0ej3k1Qd3ote6lo7D0j9wehsv/tieba-movideo/65886292_9687ec67dfc37bfbf847d82b6b52a276_96e56b0f4bfc.mp4" class="video-tvc" id="video-tvc" data-object-fit="">
   </video>
  </div>
  <div class="ms-title">{{title}}</div>
  <div class="ms-login">
   <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
    <el-form-item prop="username">
     <el-input v-model="ruleForm.username" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item prop="password">
     <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
    </el-form-item>
    <el-form-item prop="verifyCode" class="verifyCodeItemCss">
     <el-input class="verify_css" placeholder="请输入4位验证码" v-model="ruleForm.verifyCode" @keyup.enter.native="submitForm('ruleForm')"></el-input>
     <div id="v_container"></div>
    </el-form-item>
    <div class="login-btn">
     <el-button class="loginBtn" type="primary" @click="submitForm('ruleForm')">登录</el-button>
    </div>
   </el-form>
  </div>
 </div> -->
  <div class="container">
    <div class="top">
      <div class="header">
        <a href="/"
          ><img src="~@/assets/images/logo.png" alt="logo" class="logo" /><span
            class="title"
            >知识图谱后台管理系统</span
          ></a
        >
      </div>
      <div class="desc"></div>
    </div>
    <div class="main">
      <div class="ant-tabs-ta">
        <div
          role="tab"
          aria-disabled="false"
          aria-selected="true"
          class="ant-tabs-tab-active ant-tabs-tab"
        >
          账号密码登陆
        </div>
      </div>

      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0px"
        class="demo-ruleForm"
      >
        <el-form-item prop="username">
          <el-input
            v-model="ruleForm.username"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
        </el-form-item>
        <el-form-item prop="verifyCode" class="verifyCodeItemCss">
          <el-input
            class="verify_css"
            placeholder="请输入4位验证码"
            v-model="ruleForm.verifyCode"
            @keyup.enter.native="submitForm('ruleForm')"
          ></el-input>
          <div id="v_container"></div>
        </el-form-item>
        <div class="login-btn">
          <el-button
            class="loginBtn"
            type="primary"
            @click="submitForm('ruleForm')"
            >登录</el-button
          >
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { GVerify } from "../../assets/js/initImg";
export default {
  data: function () {
    return {
      title: "若晨后台管理系统",
      ruleForm: {
        username: "",
        password: "",
        verifyCode: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        verifyCode: [
          { required: true, message: "请输入验证码", trigger: "blur" },
        ],
      },
      verifyCode: null,
    };
  },
  mounted() {
    // 随机播放帧数
    this.videoCut();

    this.verifyCode = new GVerify("v_container");
  },
  methods: {
    submitForm(formName) {
      var that = this;

      // 获取验证码
      var verifyCode = this.ruleForm.verifyCode;
      var verifyFlag = this.verifyCode.validate(verifyCode);
      if (!verifyFlag) {
        that.$notify.error({
          title: "系统提示",
          message: "验证码输入错误",
        });
        return;
      } else {
        that.$notify({
          title: "系统提示",
          message: "验证码输入正确",
          type: "success",
        });
      }

      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 判断是否登录成功

          let param = {
            userName: that.ruleForm.username,
            passWord: that.ruleForm.password,
          };

          // this.axios.post(this.$service.user.USER_LOGIN_API.url,param).then(res=>{
          //   console.log("请求成功",res)
          //   if(res.data.data != undefined){
          //     that.$notify({
          //       title: '系统提示',
          //       message: '登录成功',
          //       type:"success"
          //     });
          //           // 存local
          //     localStorage.setItem('ms_username',res.data.data.userNickName);
          //     localStorage.setItem('token',res.data.data.id);
          //     self.$router.push('/index');
          //   }else{
          //     that.$notify.error({
          //     title: '系统提示',
          //     message: '用户账户密码输出错误'
          //     });
          //   }

          localStorage.setItem("ms_username", "admin");
          localStorage.setItem("token", "admin");
          that.$router.push("/");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    videoCut() {
      document.getElementsByTagName("video").onloadedmetadata = function (
        event
      ) {
        var duration = Math.ceil(this.duration);
        this.currentTime = Math.round(Math.random() * duration);
      };
    },
  },
};
</script>


<style scoped>
.verify_css {
  width: 45%;
}

.login-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
.ms-title {
  position: absolute;
  top: 50%;
  width: 100%;
  margin-top: -230px;
  text-align: center;
  font-size: 30px;
  color: #fff;
}

.ms-login {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 300px;
  height: 13rem;
  margin: -150px 0 0 -190px;
  padding: 40px;
  border-radius: 6%;
  background: #fff;
  box-shadow: -2px -2px 17px 1px #1e9fff;
}
.login-btn {
  text-align: center;
}
.login-btn button {
  width: 100%;
  height: 36px;
}
.video-bg {
  min-width: 100%;
  min-height: 100%;
  width: 100%;
  height: 100%;
  opacity: 0.9;
}
video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* opacity: 0.6; */
}

.loginBtn:hover {
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3),
    0px 0px 20px rgba(0, 0, 0, 0.1) inset;
}

/* #v_container {
  width: auto;
  height: auto;
  display: inline-flex;
  position: relative;
  top: 16px;
  margin-top: -2rem;
} */

.container {
  width: 100%;
  min-height: 100%;
  background: #f0f2f5 url(~@/assets/images/background.svg) no-repeat 50%;
  background-size: 100%;
  padding: 110px 0 144px;
  position: relative;
  box-sizing: border-box;
}
.top {
  text-align: center;
}
.top .header {
  height: 44px;
  line-height: 44px;
}
.container a {
  text-decoration: none;
}
.container .top .header .logo {
  height: 44px;
  vertical-align: top;
  margin-right: 16px;
  border-style: none;
}
.container .top .header .title {
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Chinese Quote, -apple-system, BlinkMacSystemFont, Segoe UI,
    PingFang SC, Hiragino Sans GB, Microsoft YaHei, Helvetica Neue, Helvetica,
    Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
  font-weight: 600;
  position: relative;
  top: 2px;
}
.container .top .desc {
  font-size: 14px;
  color: rgba(0, 0, 0, 0.45);
  margin-top: 12px;
  margin-bottom: 40px;
}
.container .main {
  min-width: 260px;
  width: 368px;
  margin: 0 auto;
}
.ant-tabs-ta {
  text-align: center;
}
.ant-tabs-tab-active {
  color: #1890ff;
  font-weight: 500;
}
.ant-tabs-tab {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  height: 100%;
  margin: 0 32px 0 0;
  padding: 12px 16px;
  text-decoration: none;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  font-size: 14px;
  line-height: 1.5;
  border-bottom: 2px solid #1890ff;
  margin: 0 0 16px 0;
}
#v_container {
    float: right;
    height: 40px;
}
</style>