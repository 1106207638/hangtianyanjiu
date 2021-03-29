<!--  -->
<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <!-- 用户头像区域 -->
        <div class="userHead">
          <img v-if="imageUrl==''" src="~@/assets/images/u60.png" alt="">
          <img v-else :src="imageUrl" alt />
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar" /> -->
            <el-button>上传头像</el-button>
            <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
          </el-upload>
        </div>
        <div class="form">
          <ul>
            <li v-for="(item,index) in info" :key="index">
              <div class="left">{{item.name}}：</div>
              <div class="center">
                <div v-show="item.isOff==false">
                  <span v-show="item.value!=''">{{item.value}}</span>
                  <span v-show="item.value == ''">{{item.placeholder}}</span>
                </div>
                <el-input v-show="item.isOff" v-model="item.value" placeholder="请输入内容"></el-input>
              </div>
              <div class="right">
                <i v-show="item.isOff == false" class="el-icon-edit" @click="edit(index)"></i>
                <div v-show="item.isOff" class="btns">
                  <el-button type="primary" @click="confirm(index)">确认</el-button>
                  <el-button @click="cancel(index)">取消</el-button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="账户安全" name="second">
        <div class="pass">
          <p class="title">修改密码</p>
          <p>当前密码：</p>
          <el-input placeholder="请输入旧密码" v-model.trim="form.oldPass" show-password></el-input>
          <p>新密码：</p>
          <el-input placeholder="请输入新密码" v-model.trim="form.newPass" show-password></el-input>
          <p>新确认密码：</p>
          <el-input placeholder="请确认新密码" v-model.trim="form.confirmPass" show-password></el-input>
          <el-button type="primary" @click="submit" class="btn-send">提交</el-button>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      activeName: "first",
      form: {
        oldPass: "",
        newPass: "",
        confirmPass: "",
      },
      input: "",
      info: [
        {
          name: "昵称",
          value: "",
          placeholder: "请完善昵称",
          isOff: false,
        },
        {
          name: "机构名称",
          value: "",
          placeholder: "请完善机构名称",
          isOff: false,
        },
        {
          name: "身份",
          value: "",
          placeholder: "完善资料，提高您的影响力",
          isOff: false,
        },
        {
          name: "地区",
          value: "",
          placeholder: "完善资料，提高您的影响力",
          isOff: false,
        },
      ],
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    handleClick(tab, event) {
    },
    // 提交密码修改
    submit() {
      if (
        this.form.oldPass == "" ||
        this.form.newPass == "" ||
        this.form.confirmPass == ""
      ) {
        this.$message.error("请完善密码信息");
        return false;
      }

      if (this.form.newPass != this.form.confirmPass) {
        this.form.newPass = "";
        this.form.confirmPass = "";
        this.$message.error("两次输入密码不一致");
      }
    },
    // 个人信息修改
    edit(index) {
      this.info[index].isOff = true;
    },
    // 确认
    confirm(index) {
      if (this.info[index].value == "") {
        this.info[index].isOff = false;
      } else {
        this.info[index].isOff = false;
      }
      this.info[index].isOff = false;
    },
    // 取消
    cancel(index) {
      this.info[index].isOff = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.userHead {
  height: 90px;
  line-height: 90px;
}
.userHead img {
  float: left;
  width: 90px;
  height: 90px;
  border: 1px solid #ccc;
  border-radius: 50%;
}
.userHead button {
  margin-left: 50px;
}
.form ul {
  padding: 0;
  margin: 0;
  margin-top: 20px;
}
.form li {
  border-top: 1px dashed #ccc;
  width: 100%;
  height: 50px;
  line-height: 50px;
  display: flex;
}
.form li .left {
  width: 20%;
}
.form li .center {
  width: 40%;
}
.form li .right {
  flex: 1;
}
.btn-send {
  margin-top: 20px;
}
div {
  font-family: "Arial Negreta", "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #333;
}
.pass .title {
  font-size: 20px;
  font-weight: normal;
}
.pass p {
  font-size: 14px;
  font-weight: 700;
  color: #333;
}
.btns {
  margin-left: 20px;
}
/* 用户上传头像 */
/* .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  } */
</style>