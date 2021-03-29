<!--  -->
<template>
<div class="bg-box">
    <Headers />
    <div class="container">
        <div class="new-item">
            <p>太空战略</p>
            <ul>
                <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li> <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
            </ul>
        </div>
         <div class="new-item">
            <p>太空战略</p>
            <ul>
                <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li> <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
            </ul>
        </div>
         <div class="new-item">
            <p>太空战略</p>
            <ul>
                <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li> <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
            </ul>
        </div>
         <div class="new-item">
            <p>太空战略</p>
            <ul>
                <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
                 <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li> <li>
                    <div class="date">2020-08-01</div>
                    <div class="title">美俄战略磋商成果有限天空安全议题分歧明显</div>
                </li>
            </ul>
        </div>
    </div>
    <Footer/>
</div>
</template>

<script>
import Headers from '../../common/header'
import Footer from '../../common/footer'
export default {
    components:{
        Headers,
        Footer
    },
data() {
return {

}
},
//生命周期 - 创建完成（访问当前this实例）
created() {

},
//生命周期 - 挂载完成（访问DOM元素）
mounted() {

}
}
</script>
<style scoped>
.bg-box {
    width: 100%;
    background-color: #f2f2f2;
}
/* @import url(); 引入css类 */
ul,li {
    list-style: none;
    margin: 0;
    padding: 0;
}
div {
    font-family: 'Arial Normal', 'Arial', sans-serif;
    font-weight: 400;
    font-style: normal;
}
.container {
    width:1200px;
    margin:0 auto;
}

.new-item p {
    font-size: 20px;
}
.new-item ul {
  padding: 15px 62px 25px 62px;
    background-color: #fff;
}
.new-item li {
  display: flex;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #ccc;
}
li .date {
    width: 140px;
    font-size: 14px;
    color: #333;
}
li .title {
    flex:1;
    font-size: 14px;
    color:#333;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
</style>