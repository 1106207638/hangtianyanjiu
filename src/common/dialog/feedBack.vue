<template>
  <el-dialog title="信息反馈" :visible.sync="feedBack" :close-on-click-modal="false"
             :close-on-press-escape="false"
             :append-to-body="true"
             :lock-scroll="false"
             :destroy-on-close="true">
    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="问题类型" :label-width="formLabelWidth" prop="problem">
        <el-select v-model="form.problem" placeholder="请选择问题类型">
          <el-option :label="item.itemText" :value="item.itemValue" v-for="(item,index) in questList" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="问题内容" :label-width="formLabelWidth" prop="content">
        <el-input
            type="textarea"
            placeholder="请输入内容"
            v-model="form.content"
            maxlength="200"
            show-word-limit
        >
        </el-input>
      </el-form-item>

    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="yes('ruleForm')">确 定</el-button>
      <el-button @click="cancel" type="info" plain>取 消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import {GetFeedback,addFeedBack} from '../../api/apis'
export default {
  name:'feedBack',
  props:['feedBack','type'],
  data() {
    return {
      form: {
        problem:"",
        content:""
      },

      formLabelWidth: '120px',
      questList:[],
      rules: {
        content: [
          { required: true, message: '请输入问题内容', trigger: 'blur' },
        ],
        problem: [
          { required: true, message: '请选择问题类型', trigger: 'change' }
        ]
      }
    }
  },
  mounted(){
    this.getquest()
  },
  methods: {
    getquest() {
      GetFeedback().then((res)=>{
        var { data } = res
        if(data.code == 200) {
            this.questList = data.result
        }
      })
    },
    cancel() {
      this.form.problem = ''
      this.form.content = ''
      this.$emit('cancel')
    },
    yes(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(this.type == 1) {
            var sym = {
              type:this.form.problem,
              content: this.form.content,
              fkType: 0
            }
          }else {
            var sym = {}
          }

          addFeedBack(sym).then((res)=>{
            var { data } = res
            if(data.code == 200) {
              this.$message({
                type:'success',
                message:'反馈成功'
              })
              this.form.problem = ''
              this.form.content = ''
              this.$emit('cancel')
            }else {
              this.$message.error(data.message)
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });

    }
  },
  watch: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/.el-dialog__close {
  display: none;
}
/deep/.el-dialog__header {
  color: #fff;
  height: 50px;
  line-height: 50px;
  padding-top: 0;
  padding-bottom: 0;
}

/deep/.el-dialog__body {
  position: relative;
  text-align: center;
  padding: 30px 30px 0 30px;
  padding-top: 10px;
}
/deep/.el-dialog {
  width: 800px;
  height: 600px;

}
/deep/.el-dialog__footer {
  text-align: center;
}
/deep/.el-form {
  margin-top: 10px;
  text-align: left;
}
.el-select {
  width: 510px;
 }
/deep/.el-textarea {
  width: 510px;
  height: 350px;
}
/deep/textarea {
  resize:none
}
/deep/.el-textarea__inner{
  height: 350px;
}
/deep/.el-dialog__body .el-textarea__inner {
  height: 350px;
}
/deep/.el-button {
  /*border: none;*/
  width: 125px;
}
/deep/.el-button--primary {
  /*border: none;*/
}
</style>