<!-- 新建收藏文件夹弹出层 -->
<template>
  <div>
    <el-dialog
      :title="switch1==true?'新建收藏文件夹':(type == 'collect'?'编辑收藏文件夹':'选择收藏文件夹')"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      :visible.sync="dialogFormVisible"
      :append-to-body="true"
      :lock-scroll="false"
    >
      <el-form
        v-if="type == 'collect'"
        :model="form"
        :rules="rules"
        ref="ruleForm"
      >
        <el-form-item
          label="文件夹名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="name"
            autocomplete="off"
            placeholder="请输入收藏文件夹的名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else :model="form1" :rules="rule" ref="ruleForm1">
        <el-form-item
          label="收藏文件夹"
          prop="collect"
          :label-width="formLabelWidth"
        >
          <el-select v-model="form1.collect" placeholder="请选择收藏文件夹">
            <el-option
              v-for="(item, index) in collectList"
              :key="index"
              :label="item.folderName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button
          type="primary"
          v-if="type == 'collect'"
          @click="detemine('ruleForm', 'order')"
          >确 定</el-button
        >
        <el-button type="primary" v-else @click="detemine('ruleForm1', 'add')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addCollFloder, GetCollList, Collection,editCollName } from "../../api/apis.js";
export default {
  name: "collDialog",
  props: ["dialogFormVisible", "switch1", "name", "type", "id", "title1"],
  data() {
    return {
      form: {
        name: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入收藏文件夹的名称",
            trigger: "blur",
          },
        ],
      },
      form1: {
        collect: "",
      },
      rule: {
        collect: [
          {
            required: true,
            message: "请选择收藏文件夹",
            trigger: "change",
          },
        ],
      },
      formLabelWidth: "130px",
      collectList: [],
    };
  },
  watch:{
    "type":{
      handler:function(val,oldVal){
        this.getCollect()
      },
      deep:true
    }
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.getCollect();
    if (this.switch1) {
      this.form.name = this.name;
    }
  },
  methods: {
    // 获取文件夹
    getCollect() {
      GetCollList({
      }).then((res) => {
        var { data } = res;
        if (data.code == 200) {
          this.collectList = data.result.records;
        }
      });
    },
    cancel() {
      this.form.name = "";
      this.$emit("cancel");
    },
    detemine(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (type == "order") {
            if(this.switch1) {
              addCollFloder({
                folderName: this.name,
              }).then((res) => {
                var { data } = res;
                if (data.code == 200) {
                  this.$message({
                    type: "success",
                    message: "创建成功",
                  });
                  this.form.name = "";
                  this.$emit("yesCancel");
                } else {
                  this.form.name = "";
                  this.$message({
                    type: "error",
                    message: "shibai",
                  });
                }
              });
            }else {
              editCollName({
                folderName: this.name,
                id:this.id
              }).then((res)=>{
                var { data } = res
                if(data.code == 200) {
                  this.$message({
                    type:'success',
                    message:'收藏文件夹修改成功'
                  })
                  this.$emit("yesCancel");
                }else{
                  this.$message({
                    type:'error',
                    message:'收藏文件夹修改失败'
                  })
                }
              })
            }
          } else {
            Collection({
              bookCollecTionName: this.title1,
              kgDocId: this.id,
              folderId: this.form1.collect,
            }).then((res) => {
              var { data } = res;
              if (data.code == 200) {
                this.form1.collect = "";
                this.$message({
                  type: "success",
                  message: '文件收藏成功',
                });
                this.$emit("yesCancel");
              } else {
                this.$message({
                  type: "info",
                  message: data.message,
                });
              }
            });
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
/deep/.el-dialog__close {
  display: none;
}

/deep/.el-dialog {
  width: 25%;
}
</style>