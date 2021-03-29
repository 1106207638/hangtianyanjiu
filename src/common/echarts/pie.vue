<template>
  <div ref="mychart" :style="{height:height+'px'}"></div>
</template>

<script>
export default {
  watch: {
    data: {
      handler(newValue, oldValue) {
        this.init()
      },
      deep: true //深度监听
    },
  },
  props:['data','height'],
  mounted(){
    this.init()
  },
  methods: {
    init(){
      var that = this
      this.$refs.mychart.style.height="400px"
      let myChart = this.$echarts.init(this.$refs.mychart);
      // 绘制图表
      var options = {
        tooltip: {
          trigger: 'item',
          formatter: '{b} : {c} ({d}%)',
          textStyle:{
            fontSize:28
          }
        },
        legend: {
          orient: 'vertical',
          left: '70%',
          top :'center',
          itemWidth:30,
          itemHeight:16,
          textStyle:{
            color:'#fff',
            fontSize:28
          },
          borderRadius:15
        },
        grid:{
          top: 20
        },
        color:this.data.color,
            // ['rgba(255, 162, 109, 1)','rgba(0, 121, 254, 1)','rgba(255, 180, 175, 1)','rgba(75, 216, 99, 1)','rgba(238, 203, 95, 1)','rgba(225, 103, 87, 1)'],
        series: [
          {
            name: this.data.name,
            type: 'pie',
            radius: '80%',
            center:['40%','50%'],
            labelLine:{
            },
            label:{
                formatter: '{b}: {@2012} ({d}%)',
                fontSize: 25
            },
            data: this.data.data
            //     [
            //   {value: 178, name: '载人航天器'},
            //   {value: 119, name: '对地观测卫星'},
            //   {value: 13, name: '科学与技术试验卫星'},
            //   {value: 15, name: '通信卫星'},
            //   {value: 163, name: '空间探测器'},
            //   {value: 20, name: '导航卫星'},
            // ],

          }
        ]
      }
      myChart.setOption(options);
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
