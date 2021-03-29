<template>
  <div class="homebg">
    <header>
        <div class="container">
            <p>翻译</p>
        </div>
    </header>
    <div class="divide-wrap">
      <div class="colorbar-before"></div>
      <div class="colorbar-after"></div>
      <div class="colorbar"></div>
    </div>
    <div class="content">
        <div class="container">
          <div class="trans-operation clearfix">
            <a href="javascript:void(0);" class="language-btn select-from-language">
<span class="select-inner">
<span class="language-selected" data-lang="zh" data-detected="1"><span>自动检测</span></span>
<i class="arrow-down"></i>
</span>
            </a>
            <a href="javascript:void(0);" class="from-to-exchange language-btn" aflag="0">
<span class="exchange-mask" style="background-position: -2px 50%;">
</span>
            </a>
            <a href="javascript:void(0);" class="language-btn select-to-language">
<span class="select-inner">
<span class="language-selected" data-lang="en">中文</span>
<i class="arrow arrow-down"></i>
</span>
            </a>
            <a href="javascript:void(0);" class="trans-btn trans-btn-zh" id="translate-button" target="_self"></a>
            <a href="javascript:" class="manual-trans-btn"></a>
          </div>
          <div class="region">
<!--            左侧待翻译区域-->
            <div class="regionL">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
                <el-form-item  prop="textarea">
                  <el-input  type="textarea" resize="none" @input="change($event)" v-model="ruleForm.textarea" :clearable="true"></el-input>
                </el-form-item>
              </el-form>
            </div>
<!--            右侧翻译区域-->
            <div class="regionR" v-text="message">

            </div>
          </div>
          <div class="translate">
            <el-button type="primary" @click="translate('ruleForm')">翻   译</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import {translate} from '@/api/apis'
export default {
  data(){
    return {
      message:'',
      ruleForm:{
        textarea:'',
      },
      rules:{
        textarea: [
          { required: true, message: '请输入翻译内容', trigger: 'blur' },
        ],
      }
    }
  },
  mounted() {
  },
  methods:{
    change(e){
      this.$forceUpdate();
    },
    // 翻译
    translate(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          translate({
            query:this.ruleForm.textarea,
            from:'auto',
            to:'zh-CN',
          }).then((res)=>{
            var { data } = res
            if(data.code == 200) {
              this.message = data.message
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });


    }
  }
}
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.homebg {
  width: 100%;
  height: 100%;
  background: #fff;
}
header {
  height: 31px;
  padding: 14px 0;
}
header p {
  font-size: 20px;
  font-weight: bold;
}
.container {
  width: 1220px;
  height: 31px;
  line-height: 31px;
  margin: 0 auto;
}
.divide-wrap {
  position: relative;
  height: 1px;
  z-index: 1;
}
.colorbar-before {
  content: "";
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  z-index: 9;
  background-color: #1b24ff;
}
.colorbar-after {
  content: "";
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  z-index: 9;
  background-color: #fd0371;
}
.colorbar {
  width: 100%;
  height: 100%;
  z-index: 11;
  background: url(../../assets/images/colorbar.png) center no-repeat;
  position: relative;
}
.content {
  height: calc(100vh - 110px);
}
.region {
  margin-top: 40px;
  wdith:100%;
  display: flex;
}
.regionL,.regionR {
  width:50%;
  height: 600px;
  font-size: 20px;
  color: black;
}
.regionL {
}
/deep/.regionL textarea {
  width: 100%;
  height: 600px;
  font-size: 20px;
  color: black;
}
.regionR {
  box-sizing: border-box;
  background: #f0f0f0;
  padding: 5px 20px 20px 5px;

}
.translate {
  margin-top: 50px;
  text-align: center;
}
.clearfix:before, .clearfix:after {
  content: " ";
  display: table;
}
.trans-operation a {
  float: left;
}
.language-btn, .language-btn-disable {
  display: inline-block;
  height: 30px;
  line-height: 30px;
  color: #333;
}
.select-from-language {
  width: auto;
  min-width: 176px;
}
.select-from-language, .select-to-language {
  background: #fff;
  border: 1px solid #dcdcdc;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  width: 176px;
  text-align: center;
}
a {
  text-decoration: none;
  color: #666;
}
.from-to-exchange {
  padding: 0 21px;
  height: 30px;
  line-height: 30px;
  background-color: #f9f9f9;
  z-index: 6;
}
.from-to-exchange .exchange-mask {
  display: inline-block;
  width: 21px;
  height: 21px;
  overflow: hidden;
  background-image: -webkit-image-set(url(../../assets/images/exchange1x.png) 1x,url(../../assets/images/exchange2x.png) 2x);
  background-repeat: no-repeat;
  vertical-align: middle;
  margin-top: -4px;
  background-position: -2px 50%;
}
.trans-operation {
  margin-top: 50px;
}
</style>
