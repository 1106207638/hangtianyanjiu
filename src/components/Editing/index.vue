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
        <button>编辑资料</button>
        <!--        <button @click="Journal">登录日志</button>-->
        <button @click="editPass">修改密码</button>

      </div>
      <div class="container">
        <div class="head">
          <span> 编辑资料 </span>
          <!--        <span class="right"><span>*</span>为必填项</span>-->
        </div>
        <div class="form_box">
          <el-form
              :rules="rules"
              :model="ruleForm"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
          >
            <el-form-item label="手机号" prop="phone">
              <el-input
                  v-model.number="ruleForm.phone"
                  placeholder="请输入您的手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input
                  v-model="ruleForm.email"
                  placeholder="请输入您的邮箱"
              ></el-input>
            </el-form-item>
            <el-form-item label="所在城市" >
              <el-input
                  v-model="ruleForm.region"
                  placeholder="请输入您的所在城市"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" >
              <el-radio-group v-model="ruleForm.sex">
                <el-radio :label="0">保密</el-radio>
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="生日">
              <el-form-item>
                <el-date-picker
                    type="date"
                    placeholder="选择生日"
                    value-format="yyyy-MM-dd"
                    v-model="ruleForm.birthday"
                    style="width: 100%"
                ></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item label="个性签名">
              <el-input v-model="ruleForm.personalizedSignature"></el-input>
            </el-form-item>
            <el-form-item label="关注分类">
              <el-select
                  v-model="ruleForm.attentionInfoClass"
                  multiple
                  placeholder="请选择">
                <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.itemText"
                    :value="item.itemText">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button>
              <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {editUserInfo,followlist} from '../../api/apis'
export default {
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        callback();
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
      rules:{
        phone: [{ required: false, validator: checkPhone, trigger: "blur" }],
        email:[
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur'] }
        ]
      },
      ruleForm: {},
      classList:[]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getClass()
    this.getuserInfo()
  },
  methods: {
    // 获取个人资料
    getuserInfo() {
      this.ruleForm = JSON.parse(window.localStorage.getItem('userInfo'))
      if(this.ruleForm.attentionInfoClass == '') {
        this.ruleForm.attentionInfoClass = []
      }else {
        this.ruleForm.attentionInfoClass = this.ruleForm.attentionInfoClass.split(',')
      }
    },
    // 获取分类
    getClass(){
      followlist({
        dictId:'1320983092172726274'
      }).then((res)=>{
        if(res.status == 250) {
        }
        var { data } = res
        if(data.code == 200){
          this.classList = data.result
        }else {
          this.$message.error(data.message)
        }
      })
    },
    // 修改资料
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editUserInfo({
            birthday:this.ruleForm.birthday+' 00:00:00',
            sex:this.ruleForm.sex,
            phone:this.ruleForm.phone,
            personalizedSignature: this.ruleForm.personalizedSignature,
            attentionInfoClass : this.ruleForm.attentionInfoClass.toString(),
            email:this.ruleForm.email,
            region:this.ruleForm.region,
          }).then((res)=>{
            var { data } = res
            if(data.code == 200) {
              this.$message({
                type:'success',
                message:'修改资料成功'
              })
              this.$router.push('/Personal')
              // window.localStorage.setItem('userInfo',JSON.stringify({
              //   birthday:this.ruleForm.birthday,
              //   sex:this.ruleForm.sex,
              //   phone:this.ruleForm.phone,
              //   personalizedSignature: this.ruleForm.personalizedSignature,
              //   attentionInfoClass : this.ruleForm.attentionInfoClass.toString()
              // }))
            }else {
              this.$message.error(data.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    },
    resetForm() {
      this.ruleForm = {
        birthday:'',
        sex:0,
        phone:'',
        personalizedSignature: '',
        attentionInfoClass : ''
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
.button button:nth-child(2) {
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
/deep/.el-select {
  width: 100%;
}
.container {
  min-height: 500px;
}
.el-select-dropdown__item {
  padding: 0 20px;
}
</style>