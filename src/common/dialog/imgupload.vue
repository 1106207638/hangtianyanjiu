<template>
  <div>
    <el-upload
        :action="action"
        :headers="headers"
        list-type="picture-card"
        :on-success="imgsuccess"
        :file-list="fileList"
        :on-remove="remove"
        :before-upload="beforeAvatarUpload"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="item.url" v-for="(item,index) in fileList" :key="index" alt="">
    </el-dialog>
  </div>

</template>
<script>

export default {
  created(){
    this.action = window._CONFIG['orderURL'] + 'common/upload'
  },
  props:['fileList'],
  data() {
    return{
      action:'',
      headers:{
        "X-Access-Token": window.localStorage.getItem('token')
      },
      dialogVisible:false,
    }
  },
  methods:{
    beforeAvatarUpload(file) {
      
      const isJPG = file.type.indexOf('image')!=-1

      if (!isJPG) {
        this.$message.error('上传类型只能是图片格式!');
      }

      return isJPG;
    },
    remove(file,fileList) {
      this.fileList = fileList
      this.$emit('file',this.fileList)
    },
    imgsuccess(response,file,fileList) {
      if(response.code==200) {
        file.url = response.message
        this.fileList.push(file)
        this.$emit('file',this.fileList)
      }else {

      }
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
  },
}
</script>
<style>

</style>