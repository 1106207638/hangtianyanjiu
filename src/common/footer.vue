<!--  -->
<template>
  <footer>
    <div class="container">
      <ul>
        <li class="thead">太空分类</li>
        <li>
          <router-link to="/Table/1">太空战略</router-link>
        </li>
        <li>
          <router-link to="/Table/2">太空战略</router-link>
        </li>
        <li>
          <router-link to="/Table/3">太空战略</router-link>
        </li>
      </ul>
      <ul>
        <li class="thead">太空数据视图可视化</li>
        <li>
          <router-link tag="li" to="/Echarts/1">各国太空发射统计图</router-link>
        </li>
        <li>
          <router-link tag="li" to="/Echarts/2"
            >各国太空装备对比统计图</router-link
          >
        </li>
        <li>
          <router-link tag="li" to="/Echarts/3">各国太空装备统计图</router-link>
        </li>
        <li>
          <router-link tag="li" to="/Echarts/4"
            >各国太空力量对比统计图</router-link
          >
        </li>
      </ul>
      <ul>
        <li class="thead" @click="hello">太空介绍</li>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>企业服务</li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

},
methods:{
    hello(){
        this.$router.push({
        path:'/hello',
        query: {
          name: '_Toc51256477'
        }
    })
}
}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
footer {
  width: 100%;
  height: 321px;
  background-color: rgba(102, 102, 102, 1);
}
.container {
  width: 1200px;
  margin: 0 auto;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul {
  float: left;
  margin-top: 50px;
}
li {
  padding: 0 25px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
li a {
  color: inherit;
  text-decoration: none;
}
.thead {
  font-size: 16px;
}
</style>