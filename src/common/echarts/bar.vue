<template>
    <div ref="mychart"  id="barBox"></div>
</template>

<script>
export default {
  name:'barBox',
  props:['datas'],
  watch: {
    datas: {
      handler(newValue, oldValue) {
        this.init();
      },
      deep: true //深度监听
    },
  },
  mounted(){
    this.init()
  },
  methods: {
    init(){
      var datas = this.datas
      var x = []
      var y = []
      for(var i = 0;i<datas.length;i++) {
        x.push(datas[i].name)
        y.push(datas[i].count)
      }
      this.$refs.mychart.style.width="100%"
      this.$refs.mychart.style.height="400px"
      let myChart = this.$echarts.init(this.$refs.mychart);
      // 绘制图表
      var counted = [
        '中国',
        '德国',
        '美国',
        '日本',
        '朝鲜',
        '韩国',
        '俄罗斯',
        '加拿大',
        '意大利',
        '法国',
        '印度',
        '瑞士',
        '泰国',
        '越南',
        '马来西亚',
        '缅甸']
      myChart.resize();

      myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          textStyle:{
            fontSize:28
          }
        },
        // 修改图表的大小
        grid: {
          left: "3%",
          top: "60px",
          right: "0%",
          bottom: "4%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: x,
            axisTick: {
              alignWithLabel: true
            },
            // 修改刻度标签 相关样式
            axisLabel: {
              color: "rgba(255,255,255) ",
              fontSize: "28",
              formatter:function(value)
              {
                var ret = "";//拼接加\n返回的类目项
                var maxLength = 2;//每项显示文字个数
                var valLength = value.length;//X轴类目项的文字个数
                var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
                if (rowN > 1)//如果类目项的文字大于3,
                {
                  for (var i = 0; i < rowN; i++) {
                    var temp = "";//每次截取的字符串
                    var start = i * maxLength;//开始截取的位置
                    var end = start + maxLength;//结束截取的位置
                    //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                    temp = value.substring(start, end) + "\n";
                    ret += temp; //凭借最终的字符串
                  }
                  return ret;
                }
                else {
                  return value;
                }
              },
              interval:0
            },
            // 不显示x坐标轴的样式
            axisLine: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            // 修改刻度标签 相关样式
            axisLabel: {
              color: "rgba(255,255,255) ",
              fontSize: 28
            },
            // y轴的线条改为了 2像素
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
                width: 2
              }
            },
            // y轴分割线的颜色
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)"
              }
            }
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "35%",
            data: y,
            itemStyle: {
              // 修改柱子圆角
              color: function(params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                var colorList =  ["#61A5E8","#7E5F51","#EECB5F","#9570E5"];
                if(params.dataIndex<3){
                  return colorList[params.dataIndex]
                }
                return colorList[(params.dataIndex+1)%4]
              }
            }
          }
        ]
      });
      window.addEventListener("resize", function() {
        myChart.resize();
      });
    }
  }
}
</script>

<style scoped>
#barBox {
  width: 100%;
  height: 400px;
}
</style>
