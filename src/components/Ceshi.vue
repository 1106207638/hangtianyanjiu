<template>
  <div>
    <div class="header">
      <div class="left_nav">
        <button v-for="(item, index) in nav" :key="index" @click="add(item)">
          {{ item }}
        </button>
      </div>
      <div class="right_nav"></div>
    </div>

    <table width="100%">
      <tr>
        <td width="5%">演习时间</td>
        <td width="5%">演习国家</td>
        <td width="5%">演习地区</td>
        <td width="5%">演习级别</td>
        <td width="14%">演习目标</td>
        <td width="14%">演习场景</td>
        <td width="14%">演习单位</td>
        <td width="14%">演习人员</td>
        <td d>演习内容</td>
      </tr>
      <tr v-for="(item, index) in link" :key="index">
        <td>{{ item.manoeuvreTime }}</td>
        <td>{{ item.manoeuvreCountry }}</td>
        <td>{{ item.manoeuvreCrews }}</td>
        <td>{{ item.manoeuvreSite }}</td>
        <td>{{ item.manoeuvreName }}</td>
        <td>{{ item.manoeuvreTarget }}</td>
        <td>{{ item.manoeuvreTarget }}</td>
        <td>
          {{ item.manoeuvreSiteImg }}
          <viewer v-if="item.manoeuvreSiteImg" :images="item.manoeuvreSiteImg">
            <img
              :src="item.manoeuvreSiteImg"
              style="width: 50px; height: 50px; cursor: pointer"
            />
          </viewer>
        </td>
        <td>{{ item.manoeuvreSiteImg }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import { maneuversList, maneuvers } from "@/api/apis";
export default {
  data() {
    return {
      link: {},
      nav: {},
    };
  },

  created() {
    this.buttonList();
    this.tableList();
  },
  watch: {
    name: function (newValue, oldValue) {
      console.log("点击了");
    },
  },
  methods: {
    //获取列表全部内容
    tableList() {
      maneuversList({
        manoeuvreName: this.name,
        pageNo: "1",
        pageSize: "30",
      }).then((res) => {
        let { data } = res;
        let datas = data.result.records;
        for (let i = 0; i < datas.length; i++) {
          this.link = datas;
        }
      });
    },
    //获取二级分类
    buttonList() {
      maneuvers().then((res) => {
        let { data } = res;
        for (let i = 0; i < data.result.length; i++) {
          this.nav = data.result;
        }
      });
    },
    add(item) {
      this.name = item;
      return this.tableList();
    },
  },
};
</script>

<style scoped>
</style>