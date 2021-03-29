<!-- 我的页面左侧aside -->
<template>
  <div>
    <ul>
      <li @click="user(item.url)" v-for="(item,index) in userList" :key="index" :class="path == '/user/'+item.url?'active':''">
        {{item.name}}
        <i class="el-icon-arrow-right"></i>
      </li>
      
    </ul>
  </div>
</template>

<script>
export default {
  props:['path'],
  data() {
    return {
      active:'Info',
      userList :[{
        name:'个人信息',
        url:'Info'
      },{
        name:'搜索历史',
        url:'SearchHistory'
      },{
        name:'浏览历史',
        url:'BrowsingHistory'
      },{
        name:'我的收藏',
        url:'Collection'
      },{
        name:'我的笔记',
        url:'Note'
      }]
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods:{
    user(url) {
      this.$router.push({
        path:url
      })
    }
  }
};
</script>
<style scoped>
/* @import url(); 引入css类 */
ul,li {
    list-style: none;
}
ul{
    padding: 0;
    margin: 0;
    background-color: #fff;
}
li {
  padding: 0 35px;
  cursor: pointer;
  height:40px;
  line-height: 40px;
}
li i {
    text-align: right;
}
li.active {
  background-color: #409eff;
  color: #fff;
}
</style>