<!--  -->
<template>
<div>
    <ul>
        <li v-for="(item,index) in data" :key="index">
            <a  @click="go(item.url)">{{item.directory_name}}</a>
            <tree :data="item.node_list"></tree>
        </li>
    </ul>
</div>
</template>

<script>

export default {
    name:'tree',
    props:['data'],
  
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
methods:{
    go(url) {
        var str = url.substring(1,url.length)
        document.querySelector(`a[name=${str}]`).scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        // console.log(document.getElementById(str))
    }
},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
ul {
    padding-left:20px
}
ul ,li {
    list-style: none;
    color: #333;
  text-align: left;

}
 li a {
   font-size: 14px;
   font-weight: 700;
  text-decoration: none;
  color: #333;
  cursor: pointer;
}
</style>