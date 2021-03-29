<!--  -->
<template>
  <div class="hist-box">
    <ul style="height:calc(100vh - 461px);min-height:450px">
      <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="top">
            <div class="left">
              <img src="~@/assets/images/book.jpg" alt />
            </div>
            <div class="right">
              <p class="title">美俄战略磋商成果有限太空安全议题分歧明显</p>
              <div class="flag">
                <div class="flag-item">太空战略</div>
                <div class="flag-item">太空战略</div>
              </div>
              <p class="autor">殷洁 著</p>
              <div
                class="font"
              >日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商</div>
            </div>
          </div>
          <div class="bottom">
            <span>浏览于：2018-02-22 16:35</span>
            <span>收藏</span>
          </div>
        </div>
      </li>
      <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="top">
            <div class="left">
              <img src="~@/assets/images/book.jpg" alt />
            </div>
            <div class="right">
              <p class="title">美俄战略磋商成果有限太空安全议题分歧明显</p>
              <div class="flag">
                <div class="flag-item">太空战略</div>
                <div class="flag-item">太空战略</div>
              </div>
              <p class="autor">殷洁 著</p>
              <div
                class="font"
              >日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商</div>
            </div>
          </div>
          <div class="bottom">
            <span>浏览于：2018-02-22 16:35</span>
            <span>收藏</span>
          </div>
        </div>
      </li>
      <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="small">
            <p class="title">美俄战略磋商成果有限太空安全议题分歧明显</p>

            <p
              class="font"
            >日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商</p>
          </div>
          <div class="bottom">
            <span>浏览于：2018-02-22 16:35</span>
            <span>收藏</span>
          </div>
        </div>
      </li>
       <li>
        <div class="checkBox">
          <el-checkbox v-model="checked"></el-checkbox>
        </div>
        <div class="content">
          <div class="small">
            <p class="title">美俄战略磋商成果有限太空安全议题分歧明显</p>

            <p
              class="font"
            >日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商日前在维也纳举行的美俄战略磋商,未能就太空安全及《新削减战略武器条约》有效期延长等问题取得具体成果。外界普遍担忧,美俄两国战略磋商</p>
          </div>
          <div class="bottom">
            <span>浏览于：2018-02-22 16:35</span>
            <span>收藏</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="block" style="">
      <div>
        <el-checkbox v-model="checked">全选</el-checkbox>
        <span class="del">删除记录</span>
      </div>
      <div class="page">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checked: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  //生命周期 - 创建完成（访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（访问DOM元素）
  mounted() {},
  methods: {
    handleSizeChange(val) {
    },
    handleCurrentChange(val) {
    },
  },
};
</script>
<style scoped>
/* @import url(); 引入css类 */
.hist-box {
  position: relative;
  height: 100%;
}
p {
  margin: 0;
  padding: 5px 0;
}
div {
  font-family: "Arial Normal", "Arial", sans-serif;
  font-weight: 400;
  font-style: normal;
  font-size: 14px;
  color: #333;
}
ul,
li {
  list-style: none;
  padding: 0;
  margin: 0;
}
ul {
    overflow-x: hidden;
    overflow-y: scroll;
}
li {
  display: flex;
  padding: 10px 0 0 0;
}
li .checkBox {
  width: auto;
  margin-right: 20px;
}
li:last-child .content {
  border-bottom: none;
}
li .content {
  flex: 1;
  width: 100%;
  border-bottom: 1px dashed #ccc;
  max-width: 811px;
}
.content .top {
  display: flex;
}
.content .bottom {
  height: 15px;
  margin-bottom: 10px;
}
.content .bottom span:nth-child(1) {
  font-size: 12px;
}
.content .bottom span:nth-child(2) {
  font-size: 12px;
  float: right;
}
.content .left {
  width: 136px;
  margin-right: 20px;
}
.content .left img {
  width: 100%;
  height: 173px;
}
.content .right {
  flex: 1;
}
.content .title {
  font-weight: 700;
  font-size: 14px;
}
.content .flag-item {
  display: inline-block;
  font-size: 12px;
  padding: 3px 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-right: 10px;
}
.content .autor {
  font-size: 12px;
}
.small .font {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content .font {
  font-size: 12px;
  line-height: 20px;
}
.block {
  position: absolute;
  bottom: 0px;
  display: flex;
}
.block {
  width: 100%;
}
.block .del {
  margin-left: 20px;
}
.page {
  flex: 1;
  text-align: right;
}
ul::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f7f8;
}
ul::-webkit-scrollbar-thumb{
  border-radius: 10px;
  background-color: #cdcdcd;
  -webkit-box-shadow: inset 0 0 0 rgba(0, 0, 0, 0.3);
}
</style>