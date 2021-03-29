<!-- 我的页面 -->
<template>
  <div class="user">
    <Headers />
    <div class="container">
      <div class="box">
        <div class="left">
          <Aside :path='path' />
        </div>
        <div class="right" style="height:calc(100vh - 411px);min-height:500px">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <Footers />
  </div>
</template>

<script>
import Headers from "../../common/header";
import Aside from "../../common/user/userAside";
import Footers from "../../common/footer";
export default {
  beforeRouteUpdate(to,from,next) {
    this.path = to.path
    next()
  },
  components: {
    Headers,
    Aside,
    Footers,
  },
  data() {
    return {
      path:'/user/Info'
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {
    this.path = this.$route.path
  },
  methods: {
   
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.user {
  background-color: #f2f2f2;
}
.container {
  width: 1100px;
  margin: 0 auto;
}
.box {
  display: flex;
  margin-top: 30px;
}
.box .left {
  width: 167px;
}
.box .right {
  flex: 1;
  margin-left: 20px;
  padding: 0 30px;
  background-color: #fff;
  overflow: hidden;
}

</style>