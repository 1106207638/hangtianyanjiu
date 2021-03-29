<template>
  <div ref="mychart" style="width:100%;height:100%" id="lineBox"></div>
</template>

<script>
export default {
  data(){
    return{
      myChart:null
    }
  },
  watch: {
    "datas": {
      handler(newValue, oldValue) {
        this.init();
      },
      deep: true //深度监听
    }
  },
  props:['datas'],
  mounted(){
    this.init()
    window.onreset=function() {
      this.myChart.resize();
    }
  },
  methods: {
    init(){
      this.$refs.mychart.style.width="100%"
      this.$refs.mychart.style.height="400px"
      let myChart = this.$echarts.init(this.$refs.mychart);
      this.myChart = myChart
      // 绘制图表
      myChart.setOption({
        // 通过这个color修改两条线的颜色
        color: ["#7ECF51", "#6E56CF","#61E8C8","#61A5E8","#E8C361"],
        tooltip: {
          trigger: "axis",
          textStyle:{
            color:'#fff',
            fontSize:28
          },
        },
        legend: {
          // 如果series 对象有name 值，则 legend可以不用写data
          // 修改图例组件 文字颜色
          top: 15,
          itemGap: 20,
          icon: "roundRect",
          itemWidth:30,
          itemHeight:16,
          textStyle:{
            color:'#fff',
            fontSize:28
          },
          borderRadius:15
          // 这个10% 必须加引号
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "4%",
          bottom: "3%",
          borderColor: "#fff", // 边框颜色
          containLabel: true, // 包含刻度文字在内
        },

        xAxis: {
          type: "category",
          data:this.datas[0].xdata,
          axisTick: {
            show: false, // 去除刻度线
          },
          axisLabel: {
            color: "#fff", // 文本颜色
          },
          axisLine: {
            show: false, // 去除轴线
          },
        },
        yAxis: {
          name:'次数',
          nameLocation:'end',
          nameTextStyle:{
            color: '#fff',
            fontSize:20,
            align:'left'
          },
          type: "value",
          axisTick: {
            show: false, // 去除刻度线
          },
          axisLabel: {
            color: "#fff", // 文本颜色
            fontSize: 28
          },
          axisLine: {
            show: false, // 去除轴线
          },
          splitLine: {
            lineStyle: {
              color: "#ccc", // 分割线颜色
            },
          },
        },
        series: this.datas
      },true);
      myChart.resize();
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
}
</script>

<style scoped>

</style>
