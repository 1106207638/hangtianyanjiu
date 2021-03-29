<template>
  <div class="homebg">
    <div class="hometop">
      <div class="title">
        <img src="../../assets/images/home/logo01.png">
        航天（试验）情报研究与服务平台
      </div>
    </div>
    <div class="homemid">
      <div class="homemidcon">
        <div class="homemidcircl1"></div>
        <div class="homemidcircl2"></div>
        <div class="homemidcircl3"></div>
        <div class="homemidcircl4"></div>
        <div class="homemidcircl5"></div>
        <div class="homemidcircl6"></div>
        <div class="homemidcircl7"></div>

        <!-- <div class="navbox1">
          <router-link to="/scattermap">
          <div class="navtextbox">
            <div class="cf subbox" >
              <img src="../../assets/images/home/icon3.png" class="fl">
              <div class="fl">
                <div class="zntt">疫情威胁</div>
                <div class="entt">Epidemic Threat</div>
              </div>
            </div>
          </div>
           </router-link>
        </div> -->
        <div class="navbox1">

            <div class="navtextbox" @click="routers(1)">
              <div class="cf subbox" >
                <img src="../../assets/images/home/icon3.png" class="fl">
                <div class="fl">
                  <div class="zntt">情报数据采集子系统</div>
                  <div class="entt">data acquisition</div>
                </div>
              </div>
            </div>
        </div>
        <div class="navbox2">

            <div class="navtextbox" @click="routers(2)">
              <div class="cf subbox">
                <img src="../../assets/images/home/icon4.png" class="fl">
                <div class="fl">
                  <div class="zntt">情报数据智能处理子系统</div>
                  <div class="entt">data processing</div>
                </div>
              </div>
            </div>

        </div>
        <div class="navbox3">

            <div class="navtextbox" @click="home">
              <div class="cf subbox">
                <img src="../../assets/images/home/icon1.png" class="fl">
                <div class="fl">
                  <div class="zntt">情报信息一站式服务子系统</div>
                  <div class="entt">information service</div>
                </div>
              </div>
            </div>

        </div>
        <div class="navbox4">

            <div class="navtextbox" @click="echart">
              <div class="cf subbox">
                <img src="../../assets/images/home/icon2.png" class="fl">
                <div class="fl">
                  <div class="zntt">情报信息综合演示子系统</div>
                  <div class="entt">Information presentation</div>
                </div>
              </div>
            </div>

        </div>
        <div class="navbox5">

            <div class="navtextbox" @click="routers(4)">
              <div class="cf subbox" >
                <img src="../../assets/images/home/icon3.png" class="fl">
                <div class="fl">
                  <div class="zntt">情报用户与资源管理子系统</div>
                  <div class="entt">User resources</div>
                </div>
              </div>
            </div>

        </div>
        <div class="navbox6">

            <div class="navtextbox" @click="news">
              <div class="cf subbox">
                <img src="../../assets/images/home/icon4.png" class="fl">
                <div class="fl">
                  <div class="zntt">航天新闻</div>
                  <div class="entt">Space News</div>
                </div>
              </div>
            </div>

        </div>
        <div class="navbox7">

            <div class="navtextbox" @click="routers(5)">
              <div class="cf subbox">
                <img src="../../assets/images/home/icon1.png" class="fl">
                <div class="fl">
                  <div class="zntt">安全保密管理子系统</div>
                  <div class="entt">Security and confidentiality</div>
                </div>
              </div>
            </div>
        </div>
        <div class="navbox8">

            <div class="navtextbox" @click="routers(6)">
              <div class="cf subbox">
                <img src="../../assets/images/home/icon2.png" class="fl">
                <div class="fl">
                  <div class="zntt">基础运维管理子系统</div>
                  <div class="entt">Mocha ITOM</div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <a href="http://192.168.1.78:3000/iallchain/kgInformationTypeManger/list">123</a>
    <div class="homebottom">
<!--      <div class="left"><div class="box">Epidemic situation prediction and prevention <br>and control management platform</div></div>-->
<!--      <div class="right"><div class="box">copyright 2020 版权所有</div></div>-->
    </div>
  </div>
</template>

<script>
import { userInfo } from '@/api/apis'
export default {
  data:{
    return() {

    }
  },
  mounted() {
    // this.iframe()
  },
  methods:{
    echart() {
      this.$router.push('view/5')
    },
    routers(index) {
      if(window.localStorage.getItem('token')) {
        userInfo({
        }).then((res) => {
          var {data} = res
          if (data.code == 200) {
            var token = window.localStorage.getItem('token')
            var url = window._CONFIG['goURL']+'?ticket='+token+'&type='+index
            window.open(url)
          }else {
            window.open(window._CONFIG['goURL'])
          }
        })

      }else {
        window.open(window._CONFIG['goURL'])
      }
    },
    home() {
      this.$router.push('/')
    },
    news() {
      this.$router.push('/newsList')
    }
  }
}
</script>

<style scoped>
.homebg{
  height: 100vh;
  background: url("../../assets/images/home/img-bg-all.png");
  background-size: 100% 100%;
}
.hometop{
  height: 117px;
  background: url("../../assets/images/home/img-bg-top.png");
  background-size:100% 100%;
}
.hometop .title{
  font-size: 24px;
  color: #FFFFFF;
  letter-spacing: 1px;
  margin-left: 14.1%;
  width: 28%;
  text-align: center;
  line-height: 33px;
  padding-top: 40px;
}
.hometop .title img{
  height: 33px;
  vertical-align: middle;
}

.homebottom{
  position: fixed;
  bottom: 5.3%;
  width: 92%;
  margin: 0 4%;
  overflow: hidden;
}
.homebottom>div{
  width: 42%;
  height: 62px;
  box-sizing: border-box;
}
.homebottom>div .box{
  font-size: 16px;
  color: rgba(255,255,255,0.60);
  letter-spacing: 1px;
}
.homebottom>div.left{
  float: left;
  text-align: right;
  background: url("../../assets/images/home/img-bg-bottom01.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 40px;

}
.homebottom>div.right{
  padding-left: 40px;
  float: right;
  text-align: left;
  background: url("../../assets/images/home/img-bg-bottom02.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.homemid{
  margin: 0 4%;
  height: calc( 94% - 190px);
  background: url("../../assets/images/home/img-bg-center.png");
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.homemidcon{
  width: 40vw;
  height: 32vw;
  background: url("../../assets/images/home/tu-08.png");
  background-size: 100% 100%;
  position: relative;
}
.homemidcircl1{
  width: 27vw;
  height: 27vw;
  background: url("../../assets/images/home/tu-07.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
}
.homemidcircl2{
  width: 21.66vw;
  height: 21.66vw;
  background: url("../../assets/images/home/tu-06.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -10.83vw;
  margin-top: -10.83vw;
}
.homemidcircl3{
  width: 19.3vw;
  height: 19.3vw;
  background: url("../../assets/images/home/tu-05.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -9.65vw;
  margin-top: -9.65vw;
  animation:cirrotate 5s infinite;
}
.homemidcircl4{
  width: 16.8vw;
  height: 16.8vw;
  background: url("../../assets/images/home/tu-04.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -8.4vw;
  margin-top: -8.4vw;
  animation:cirrotate 5s infinite;
}
.homemidcircl5{
  width: 11.5vw;
  height: 11.5vw;
  background: url("../../assets/images/home/tu-03.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -5.75vw;
  margin-top: -5.75vw;
  animation:cirscale 5s infinite;
}
.homemidcircl6{
  width: 8.7vw;
  height: 8.7vw;
  background: url("../../assets/images/home/tu-02.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -4.35vw;
  margin-top: -4.35vw;
  animation:cirscale 5s infinite;
}
.homemidcircl7{
  width: 5.2vw;
  height: 5.2vw;
  background: url("../../assets/images/home/tu-01.png");
  background-size: 100% 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -2.6vw;
  margin-top: -2.6vw;
  animation:cirscale 5s infinite;
}
.navbox1,.navbox5{
  width: 14.2vw;
  height: 7.5vw;
  background: url("../../assets/images/home/img-bg-box01.png");
  background-size: 100% 100%;
  position: absolute;
  right:-6vw ;
  top: 3vw;
}
.navbox5 {
  right:-8vw ;
  top: 13vw;
}
.navbox2,.navbox6{
  width: 14.2vw;
  height: 7.5vw;
  background: url("../../assets/images/home/img-bg-box02.png");
  background-size: 100% 100%;
  position: absolute;
  right:-6vw ;
  bottom: 3vw;
}
.navbox6 {
  right:14vw ;
  bottom: -2vw;
}
.navbox3,.navbox7{
  width: 14.2vw;
  height: 7.5vw;
  background: url("../../assets/images/home/img-bg-box03.png");
  background-size: 100% 100%;
  position: absolute;
  left:-6vw ;
  top: 3vw;
}
.navbox7 {
  left:14vw ;
  top: -2vw;
}
.navbox4,.navbox8{
  width: 14.2vw;
  height: 7.5vw;
  background: url("../../assets/images/home/img-bg-box04.png");
  background-size: 100% 100%;
  position: absolute;
  left:-6vw ;
  bottom: 3vw;
}
.navbox8 {
  left:-8vw ;
  top: 11vw;
  bottom: 0;
}
.navtextbox{
  cursor: pointer;
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  line-height: 26px;
}
.navtextbox img{
  width: 2.5vw;
  margin-right: 10px;
}
.navtextbox {
  font-size: 14px;
}
.navtextbox .subbox{
  display: flex;
  align-items: center;
}
.navtextbox .subbox .entt{
  font-size: 12px;
}

.navbox1 .navtextbox,.navbox5 .navtextbox{
  margin-left: 13%;

}

.navbox2 .navtextbox,.navbox6 .navtextbox{
  margin-left: 13%;
  margin-top: 16%;
}

.navbox3 .navtextbox,.navbox7 .navtextbox{
  margin-right:13%;
}

.navbox4 .navtextbox,.navbox8 .navtextbox{
  margin-right:13%;
  margin-top: 16%;
}


@keyframes cirrotate
{
  0%   {transform:rotate(0deg);}
  25%  {transform:rotate(-90deg);}
  50%  {transform:rotate(0deg);}
  75% {transform:rotate(90deg);}
}
@keyframes cirscale
{
  0%   {transform:scale(1,1);}
  25%  {transform:scale(0.5,0.5);}
  50%  {transform:scale(1,1);}
  75% {transform:scale(0.5,0.5);}
}



</style>
