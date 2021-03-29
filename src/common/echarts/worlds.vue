<template>
  <div>
    <div ref="mychart" style="width:100%;height:100%" id="worldBox">
    </div>
    <div class="details">
      <el-dialog :title="send" :visible.sync="dialogFormVisible">
        <h2>基本介绍</h2>
        <p> 肯尼迪航天中心（Kennedy Space Center，缩写KSC）位于美国东部佛罗里达州东海岩的梅里特岛，成立于1962年7月，是美国国家航空航天局（NASA, Nationa Aeronautics and
          Spce Administration）进行载人与不载人航天器测试、准备和实施发射的最重要场所，为纪念已故美国总统约翰.肯尼迪（John F.Kennedy）而得名。地理坐标：28°35°'28.31°
          北纬80°90'03.48''西经。</p>
        <p>2020年11月9日，据美联社报道，美国宇航局（NASA）和美国太空探索技术公司（SpaceX）计划于11月14日执行首次商业载人航天任务。当地时间11月8日，4名宇航员已抵达肯尼迪航天中心。</p>
        <h2>基地组成</h2>
        <p> 肯尼迪航天中心由四个部分组成，工业区、39号发射中心和它的两个发射场LC-39和LC-38B、飞行器组装建筑物和参观者中心。</p>
        <h2>发射中心</h2>
        <p>工作区由装配车间、控制中心、气象中心、新闻工作区组成。控制中心是发射的神经枢纽，气象中心负责提供实时的卫星气象云图、风速等数据，供控制中心参考。装配车间则负责
          装配火箭或航天飞机，装配完成后，由履带车拖到发射架上。发射架位于距离工作区3公里之外的大西洋畔，两座发射塔分别标号“A”和"B".

          美国联合通讯社、路透社、CNN等一些世界主要媒
          体在航天中心设有专职记者，并拥有自己的工作楼。工作楼的一层供文字记者使用，二楼平台则供摄影记者拍摄使用。此外每逢重大新闻事件，很多电视媒体和文字媒体会租用卫星工作车，进行现场报道。</p>
        <div class="img_box">
          <img src="~@/assets/images/details.jpg" alt="">
          <img src="~@/assets/images/details.jpg" alt="">
          <img src="~@/assets/images/details.jpg" alt="">
          <img src="~@/assets/images/details.jpg" alt="">

        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
          >确 定
          </el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
import "../../../node_modules/echarts/map/js/world.js";
import '../../../node_modules/echarts/map/js/china.js'

export default {
  watch: {
    // allList: {
    //   handler(newValue, oldValue) {
    //     this.mapsetoption();
    //   },
    //   deep: true //深度监听
    // },
  },
  data() {
    return {
      dialogFormVisible: false,
      send: ''
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      var that = this
      let nameMap = {
        Afghanistan: "阿富汗",
        Singapore: "新加坡",
        Angola: "安哥拉",
        Albania: "阿尔巴尼亚",
        "United Arab Emirates": "阿联酋",
        Argentina: "阿根廷",
        Armenia: "亚美尼亚",
        "French Southern and Antarctic Lands": "法属南半球和南极领地",
        Australia: "澳大利亚",
        Austria: "奥地利",
        Azerbaijan: "阿塞拜疆",
        Burundi: "布隆迪",
        Belgium: "比利时",
        Benin: "贝宁",
        "Burkina Faso": "布基纳法索",
        Bangladesh: "孟加拉国",
        Bulgaria: "保加利亚",
        "The Bahamas": "巴哈马",
        "Bosnia and Herzegovina": "波斯尼亚和黑塞哥维那",
        Belarus: "白俄罗斯",
        Belize: "伯利兹",
        Bermuda: "百慕大",
        Bolivia: "玻利维亚",
        Brazil: "巴西",
        Brunei: "文莱",
        Bhutan: "不丹",
        Botswana: "博茨瓦纳",
        "Central African Republic": "中非共和国",
        Canada: "加拿大",
        Switzerland: "瑞士",
        Chile: "智利",
        China: "中国",
        "Ivory Coast": "象牙海岸",
        Cameroon: "喀麦隆",
        "Democratic Republic of the Congo": "刚果民主共和国",
        "Republic of the Congo": "刚果共和国",
        Colombia: "哥伦比亚",
        "Costa Rica": "哥斯达黎加",
        Cuba: "古巴",
        "Northern Cyprus": "北塞浦路斯",
        Cyprus: "塞浦路斯",
        "Czech Republic": "捷克共和国",
        Germany: "德国",
        Djibouti: "吉布提",
        Denmark: "丹麦",
        "Dominican Republic": "多明尼加共和国",
        Algeria: "阿尔及利亚",
        Ecuador: "厄瓜多尔",
        Egypt: "埃及",
        Eritrea: "厄立特里亚",
        Spain: "西班牙",
        Estonia: "爱沙尼亚",
        Ethiopia: "埃塞俄比亚",
        Finland: "芬兰",
        Fiji: "斐",
        "Falkland Islands": "福克兰群岛",
        France: "法国",
        Gabon: "加蓬",
        "United Kingdom": "英国",
        Georgia: "格鲁吉亚",
        Ghana: "加纳",
        Guinea: "几内亚",
        Gambia: "冈比亚",
        "Guinea Bissau": "几内亚比绍",
        Greece: "希腊",
        Greenland: "格陵兰",
        Guatemala: "危地马拉",
        "French Guiana": "法属圭亚那",
        Guyana: "圭亚那",
        Honduras: "洪都拉斯",
        Croatia: "克罗地亚",
        Haiti: "海地",
        Hungary: "匈牙利",
        Indonesia: "印度尼西亚",
        India: "印度",
        Ireland: "爱尔兰",
        Iran: "伊朗",
        Iraq: "伊拉克",
        Iceland: "冰岛",
        Israel: "以色列",
        Italy: "意大利",
        Jamaica: "牙买加",
        Jordan: "约旦",
        Japan: "日本",
        Kazakhstan: "哈萨克斯坦",
        Kenya: "肯尼亚",
        Kyrgyzstan: "吉尔吉斯斯坦",
        Cambodia: "柬埔寨",
        Kosovo: "科索沃",
        Kuwait: "科威特",
        Laos: "老挝",
        Lebanon: "黎巴嫩",
        Liberia: "利比里亚",
        Libya: "利比亚",
        "Sri Lanka": "斯里兰卡",
        Lesotho: "莱索托",
        Lithuania: "立陶宛",
        Luxembourg: "卢森堡",
        Latvia: "拉脱维亚",
        Morocco: "摩洛哥",
        Moldova: "摩尔多瓦",
        Madagascar: "马达加斯加",
        Mexico: "墨西哥",
        Macedonia: "马其顿",
        Mali: "马里",
        Myanmar: "缅甸",
        Montenegro: "黑山",
        Mongolia: "蒙古",
        Mozambique: "莫桑比克",
        Mauritania: "毛里塔尼亚",
        Malawi: "马拉维",
        Malaysia: "马来西亚",
        Namibia: "纳米比亚",
        "New Caledonia": "新喀里多尼亚",
        Niger: "尼日尔",
        Nigeria: "尼日利亚",
        Nicaragua: "尼加拉瓜",
        Netherlands: "荷兰",
        Norway: "挪威",
        Nepal: "尼泊尔",
        "New Zealand": "新西兰",
        Oman: "阿曼",
        Pakistan: "巴基斯坦",
        Panama: "巴拿马",
        Peru: "秘鲁",
        Philippines: "菲律宾",
        "Papua New Guinea": "巴布亚新几内亚",
        Poland: "波兰",
        "Puerto Rico": "波多黎各",
        "North Korea": "北朝鲜",
        Portugal: "葡萄牙",
        Paraguay: "巴拉圭",
        Qatar: "卡塔尔",
        Romania: "罗马尼亚",
        Russia: "俄罗斯",
        Rwanda: "卢旺达",
        "Western Sahara": "西撒哈拉",
        "Saudi Arabia": "沙特阿拉伯",
        Sudan: "苏丹",
        "South Sudan": "南苏丹",
        Senegal: "塞内加尔",
        "Solomon Islands": "所罗门群岛",
        "Sierra Leone": "塞拉利昂",
        "El Salvador": "萨尔瓦多",
        Somaliland: "索马里兰",
        Somalia: "索马里",
        "Republic of Serbia": "塞尔维亚",
        Suriname: "苏里南",
        Slovakia: "斯洛伐克",
        Slovenia: "斯洛文尼亚",
        Sweden: "瑞典",
        Swaziland: "斯威士兰",
        Syria: "叙利亚",
        Chad: "乍得",
        Togo: "多哥",
        Thailand: "泰国",
        Tajikistan: "塔吉克斯坦",
        Turkmenistan: "土库曼斯坦",
        "East Timor": "东帝汶",
        "Trinidad and Tobago": "特里尼达和多巴哥",
        Tunisia: "突尼斯",
        Turkey: "土耳其",
        "United Republic of Tanzania": "坦桑尼亚",
        Uganda: "乌干达",
        Ukraine: "乌克兰",
        Uruguay: "乌拉圭",
        "United States": "美国",
        Uzbekistan: "乌兹别克斯坦",
        Venezuela: "委内瑞拉",
        Vietnam: "越南",
        Vanuatu: "瓦努阿图",
        "West Bank": "西岸",
        Yemen: "也门",
        "South Africa": "南非",
        Zambia: "赞比亚",
        Korea: "韩国",
        Tanzania: "坦桑尼亚",
        Zimbabwe: "津巴布韦",
        Congo: "刚果",
        "Central African Rep.": "中非",
        Serbia: "塞尔维亚",
        "Bosnia and Herz.": "波黑",
        "Czech Rep.": "捷克",
        "W. Sahara": "西撒哈拉",
        "Lao PDR": "老挝",
        "Dem.Rep.Korea": "朝鲜",
        "Falkland Is.": "福克兰群岛",
        "Timor-Leste": "东帝汶",
        "Solomon Is.": "所罗门群岛",
        Palestine: "巴勒斯坦",
        "N. Cyprus": "北塞浦路斯",
        Aland: "奥兰群岛",
        "Fr. S. Antarctic Lands": "法属南半球和南极陆地",
        Mauritius: "毛里求斯",
        Comoros: "科摩罗",
        "Eq. Guinea": "赤道几内亚",
        "Guinea-Bissau": "几内亚比绍",
        "Dominican Rep.": "多米尼加",
        "Saint Lucia": "圣卢西亚",
        Dominica: "多米尼克",
        "Antigua and Barb.": "安提瓜和巴布达",
        "U.S. Virgin Is.": "美国原始岛屿",
        Montserrat: "蒙塞拉特",
        Grenada: "格林纳达",
        Barbados: "巴巴多斯",
        Samoa: "萨摩亚",
        Bahamas: "巴哈马",
        "Cayman Is.": "开曼群岛",
        "Faeroe Is.": "法罗群岛",
        "IsIe of Man": "马恩岛",
        Malta: "马耳他共和国",
        Jersey: "泽西",
        "Cape Verde": "佛得角共和国",
        "Turks and Caicos Is.": "特克斯和凯科斯群岛",
        "St. Vin. and Gren.": "圣文森特和格林纳丁斯",
      };
      const geoCoordMap = {
        江西: [115.892151, 28.676493],
        河南: [113.665412, 34.757975],
        四川: [104.065735, 30.659462],
        重庆: [106.504962, 29.533155],
        西藏: [91.132212, 29.660361],
        贵州: [106.713478, 26.578343],
        辽宁: [123.429096, 41.796767],
        新疆: [87.617733, 43.792818],
        山东: [117.000923, 36.675807],
        上海: [121.472644, 31.231706],
        澳門: [113.54909, 22.198951],
        山西: [112.549248, 37.857014],
        浙江: [120.153576, 30.287459],
        海南: [110.33119, 20.031971],
        福建: [119.306239, 26.075302],
        青海: [101.778916, 36.623178],
        宁夏: [106.278179, 38.46637],
        湖北: [114.298572, 30.584355],
        甘肃: [103.823557, 36.058039],
        安徽: [117.283042, 31.86119],
        台湾: [121.509062, 25.044332],
        陕西: [108.948024, 34.263161],
        广西: [108.320004, 22.82402],
        天津: [117.190182, 39.125596],
        云南: [102.712251, 25.040609],
        黑龙江: [126.642464, 45.756967],
        广东: [113.280637, 23.125178],
        湖南: [112.982279, 28.19409],
        河北: [114.502461, 38.045474],
        内蒙古: [111.670801, 40.818311],
        吉林: [125.3245, 43.886841],
        江苏: [118.767413, 32.041544],
        北京: [116.405285, 39.904989],
        香港: [114.173355, 22.320048]
      };
      var usa = [{
        name: '加州海豹突击队第 3 小分队沙漠训练基地',
        value: [33.172998, 115.292781]
      }]
      var imgs = require('../../assets/images/u89.png')
      var bumen = require('../../assets/images/bumen.png')
      var base64 = ''
// lines引导线数据和坐标
      function dataLines(province, data) {
        var res = [];
        province.forEach(name => {
          res.push({
            name: name,
            value: data[name],
            coords: [
              geoCoordMap[name],
              linesEndCoords[name]
            ],
          })
        })
        return res;
      }

// 散点图数据，其中value属性值为地理坐标和value拼接

      function dataScatter(province, data) {
        var res = [];
        province.forEach(name => {
          res.push({
            name: name,
            value: [geoCoordMap[name][0], geoCoordMap[name][1], data[name]]
          })
        })
        return res;
      }

      var datas = [
        {
          coords: [
            [-158.305115, 23.212751], [-225.305115, 23.212751]
          ],
          name: "美国国防支援计划",
          lineStyle: {
            opacity: 1
          },
          label: {
            formatter: [
              '{a|美国国防支援计划（DSP）}{imgBG|}'
            ].join('\n'),
            backgroundColor: 'rgb(27,38,49)',
            borderRadius: 4,
            rich: {
              a: {
                backgroundColor: "rgb(27,38,49)",
                color: '#fff',
                align: 'left',
              },
              imgBG:{
                height: 64,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              abg: {
                backgroundColor: '#fff',
                width: '100%',
                align: 'right',
                height: 25,
                borderRadius: [4, 4, 0, 0]
              },
              Sunny: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Cloudy: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Showers: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              weatherHead: {
                color: '#333',
                height: 24,
                align: 'left'
              },
              hr: {
                borderColor: '#777',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              value: {
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'left'
              },
              valueHead: {
                color: '#fff',
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'center'
              },
              rate: {
                width: 40,
                align: 'right',
                padding: [0, 10, 0, 0]
              },
              rateHead: {
                color: '#fff',
                width: 40,
                align: 'center',
                padding: [0, 10, 0, 0]
              }
            }
          }
        },
        {
          coords: [
            [-158.305115, 23.212751], [-235.305115, 55.212751]
          ],
          name: "太空跟踪与监视系统",
          lineStyle:{
            opacity : 1,
          },
          label: {
            formatter: [
              '{title|{b}}{abg|}',
              // '{rightBG|}',
              '{a|主要为低轨道的弹道导弹系统服务。它由“防}','{a|务支持计划”的地球同步轨道卫星天基红外}','{a|系统和顶置非成象红外系统等构成，其任务为}','{a|地面系统提供导弹跟踪支持。“太空跟踪与监}','{a|视系统”被划分为几个阶段，第一阶段相关部}','{a|门已经发射了两枚演示卫星。美国将对演示卫}','{a|星进行性能试验和对整个系统进行论证，从而}','{a|为未来的设计提供必要之时储备。}',
            ].join('\n'),
            color: '#fff',
            fontSize: 5,
            fontFamily: 'Arial',
            borderWidth: 1,
            borderColor: "#0075FF",
            backgroundColor: '#0E4381',
            lineHeight: 20,
            rich: {
              a: {
                color: '#fff',
                backgroundColor:'#0E4381',
                align: 'left',
                lineHeight: 18,
                padding:[0,5,5,5],
                width: 250,
                textShadowColor:'#fff'
              },
              title: {
                color: '#0E4381',
                align: 'center'
              },
              rightBG:{
                height: 80,
                align: 'center',
                backgroundColor: {
                  image: imgs
                }
              },
              abg: {
                backgroundColor: '#fff',
                // color:"#0E4381",
                width: '100%',
                align: 'right',
                height: 25,
                borderRadius: [4, 4, 0, 0]
              },
              Sunny: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Cloudy: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Showers: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              weatherHead: {
                color: '#333',
                height: 24,
                align: 'left'
              },
              hr: {
                borderColor: '#777',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              value: {
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'left'
              },
              valueHead: {
                color: '#fff',
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'center'
              },
              rate: {
                width: 40,
                align: 'right',
                padding: [0, 10, 0, 0]
              },
              rateHead: {
                color: '#fff',
                width: 40,
                align: 'center',
                padding: [0, 10, 0, 0]
              }
            }
          }
        },
        {
          coords: [
            [-158.305115, 23.212751], [-250.305115, 85.212751]
          ],
          name: "天基红外系统（SBIRS）",
          lineStyle:{
            opacity : 1,
          },
          label: {
            formatter: [
              '{title|{b}}{abg|}',
              // '{rightBG|}',
              '{a|天基红外系统的主要任务是为美军提供全球范围内的战略和战术弹}','{a|道导弹预警，对弹道导弹从助推段开始进行可靠稳定的跟踪，为反}','{a|导系统提供关键的目标指示功能。天基红外系统提供了更为强大}','{a|可靠和灵活的弹道导弹预警信息，不仅可以更早的探测到远程和洲}','{a|际弹道导弹的发射，增加了对飞行中段弹道导弹的探测跟踪能力}','{a|还在设计之初就考虑到对中短程战术弹道导弹的探测跟踪能力。}'
            ].join('\n'),
            color: '#fff',
            fontSize: 5,
            fontFamily: 'Arial',
            borderWidth: 1,
            borderColor: "#0075FF",
            backgroundColor: '#0E4381',
            lineHeight: 20,
            rich: {
              a: {
                color: '#fff',
                backgroundColor:'#0E4381',
                align: 'left',
                lineHeight: 18,
                padding:[0,5,5,5],
                width: 350,
                textShadowColor:'#fff'
              },
              title: {
                color: '#0E4381',
                align: 'center'
              },
              rightBG:{
                height: 80,
                align: 'center',
                backgroundColor: {
                  image: imgs
                }
              },
              abg: {
                backgroundColor: '#fff',
                // color:"#0E4381",
                width: '100%',
                align: 'right',
                height: 25,
                borderRadius: [4, 4, 0, 0]
              },
              Sunny: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Cloudy: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Showers: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              weatherHead: {
                color: '#333',
                height: 24,
                align: 'left'
              },
              hr: {
                borderColor: '#777',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              value: {
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'left'
              },
              valueHead: {
                color: '#fff',
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'center'
              },
              rate: {
                width: 40,
                align: 'right',
                padding: [0, 10, 0, 0]
              },
              rateHead: {
                color: '#fff',
                width: 40,
                align: 'center',
                padding: [0, 10, 0, 0]
              }
            }
          }
        },
        {
          coords: [
            [-115.292781, 33.172998], [-100.305115, 70.212751]
          ],
          name: "作战单位",
          lineStyle:{
            opacity : 1,
          },
          label: {
            formatter: [
              '{titlehead|单位}{titlehead1|指挥单位}{titlehead2|职位等级}',
              '{title|第1航空队（北方航空队）}{title1|第601空开作战中心}{title2|航空队队长为少将}',
              '{title|第3航空队（欧洲航空队）}{title1|第603空天作战中心}{title2|航空队队长为中将}',
              '{title|第13航空队（太平洋航空队）}{title1|第613空天作战中心}{title2|航空队队长为中将}',
              '{title|第7航空队（驻韩航空队）}{title1|第607空天作战中心}{title2|航空队队长为中将}'
            ].join('\n'),
            backgroundColor: 'rgba(19,58,94,.6)',
            borderColor: 'rgb(0,114,248,.6)',
            padding:0,
            rich: {
              title: {
                width:180,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30,
              },
              title1: {
                width:268,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30

              },
              title2: {
                width:218,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30

              },
              titlehead: {
                width:180,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30,
                backgroundColor:'rgba(8, 81, 106, .6)'
              },
              titlehead1: {
                width:268,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30,
                backgroundColor:'rgba(8, 81, 106, .6)'
              },
              titlehead2: {
                width:218,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30,
                backgroundColor:'rgba(8, 81, 106, .6)'
              },

            }
          }
        },
        {
          coords: [
            [-79.0716, 35.63714], [-40.305115, 20.212751]
          ],
          name: "作战单位",
          lineStyle:{
            opacity : 1,
          },
          label: {
            formatter: [
              '{imgBG|}'
            ].join('\n'),
            backgroundColor: 'rgba(19,58,94,.6)',
            borderColor: 'rgb(0,114,248,.6)',
            borderWidth: 1,
            rich: {
              title: {
                width:180,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30,
              },
              imgBG:{
                height: 260,
                align: 'left',
                backgroundColor: {
                  image: bumen
                }
              },
              title1: {
                width:268,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30

              },
              title2: {
                width:218,
                height:30,
                borderColor: 'rgb(0,114,248,.6)',
                borderWidth: 1,
                color: '#fff',
                align: 'center',
                lineHeight:30

              },
              abg: {
                backgroundColor: '#fff',
                width: '100%',
                align: 'right',
                height: 25,
                borderRadius: [4, 4, 0, 0]
              },
              Sunny: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Cloudy: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              Showers: {
                height: 30,
                align: 'left',
                backgroundColor: {
                  image: imgs
                }
              },
              weatherHead: {
                color: '#333',
                height: 24,
                align: 'left'
              },
              hr: {
                borderColor: '#777',
                width: '100%',
                borderWidth: 0.5,
                height: 0
              },
              value: {
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'left'
              },
              valueHead: {
                color: '#fff',
                width: 20,
                padding: [0, 20, 0, 30],
                align: 'center'
              },
              rate: {
                width: 40,
                align: 'right',
                padding: [0, 10, 0, 0]
              },
              rateHead: {
                color: '#fff',
                width: 40,
                align: 'center',
                padding: [0, 10, 0, 0]
              }
            }
          }
        },
      ]
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(this.$refs.mychart);
      myChart.setOption({
        backgroundColor: "#1B2631",
        nameMap: nameMap,
        tooltip: {
          trigger: "item",
          formatter: function (params) {
          },
          extraCssText: "font-size:18px;",
        },
        geo: {
          map: "world",
          aspectScale: 0.65,
          left: '30%',
          label: {
            formatter: function (params) {
              return params.name;
            },
            emphasis: {
              show: true,
              color: "#fff",
            },
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "rgba(0, 26, 45, 0.4)",
              borderColor: "#3697AD",
              borderWidth: 1,
              shadowColor: "#3697AD",
              shadowBlur: 30,
            },
            emphasis: {
              areaColor: "#2a333d",
            },
          },
        },
        series: [
          { // 含引导线的省份，用lines实现
            type: 'lines',
            symbol: 'arrow',
            symbolSize: [10, 0],
            label: {
              show: true,
              backgroundColor: '#3697AD',
              formatter: function (params) {
                return '<div>456456456</div>'
              }
            },
            lineStyle: {
              width: 2,
              color: '#0075FF',
              type: 'solid',
              shadowBlur: 3,
            },
            data: datas
          },
          {
            type: "effectScatter",
            coordinateSystem: "geo",
            zlevel: 2,
            symbolSize: [31,27],
            rippleEffect: {
              brushType: "fill",
              scale: 0,
              period: 0,
            },
            label:{
              show:true,
              position:'left',
              fontSize:14,
              color:'#fff',
              formatter:function(params) {
                return params.name
              },

            },
            itemStyle: {
              normal: {
                color: "#44FCF7",
              },
            },
            data: [
              {
                name: '第613空天作战中心',
                value: [-158.305115, 23.212751],
                symbol:base64
              },
              {
                name:'刘易斯-麦克德联合基地',
                value:[-115.292781, 33.172998],
                symbol:base64
              },
              {
                name: '美国陆军太军与导弹防御司令部',
                value: [-79.0716,35.63714],
                symbol:base64
              }

            ],
          }
        ]
      });

    }
  }
}
</script>

<style scoped>
.details {

}

.details .img_box {
  display: flex;
}

.details img {
  flex: 1;
  height: 130px;
  display: inline-block;
}
</style>
