<template>
  <div id="app" :class="{ active: isActive }">
    <Headers
      ref="headers"
      :isSearch="isSearch"
      :isZoom="isZoom"
      :headers="isSmall"
      :Logindialog="isLogin"
      @yess="yes"
      v-if="isShow"
      @loginOut="loginout"
    />
    <router-view v-if="isRouterAlive"></router-view>
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import store from "@/store/store";
import Headers from "./common/header";
import Footers from "./common/footer";
export default {
  name: "App",
  components: {
    Headers,
    Footers,
  },
  provide() {
    return {
      reload: this.reload,
      showLogin: this.showLogin,
      cancelLogin: this.cancelLogin,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      isShow: true,
      isSearch: true,
      isActive: false,
      isLogin: false,
      isZoom: true,
      isSmall: true,
    };
  },
  computed: {
    getSearchKey() {
      return this.$store.state.isSmall;
    },
  },
  watch: {
    $route: {
      handler(val, oldval) {
        console.log(val);
        if (
          val.name == "hello" ||
          val.name == "Nav" ||
          val.name == "Translate"
        ) {
          this.isShow = false;
        } else {
          this.isShow = true;
        }
        if (val.name == "home") {
          this.isActive = true;
          this.isSmall = true;
          document.querySelector(".header").style.zoom = 1;
        } else {
          this.isActive = false;
          this.isSmall = this.$store.state.isSmall;
          if (val.name != "Echarts") {
            if (this.isSmall) {
              document.getElementsByTagName("body")[0].style.zoom = 1;
              document.querySelector(".header").style.zoom = 1;
            } else {
              document.querySelector(".header").style.zoom = 1;
              document.getElementsByTagName("body")[0].style.zoom = 1.5;
            }
          }
        }

        if (val.name == "Class" || val.name == "senior") {
          this.isSearch = false;
        } else {
          this.isSearch = true;
        }
        if (val.name == "Nav") {
          document.getElementsByTagName("body")[0].style.zoom = 1;
        }
        if (val.name == "Echarts") {
          this.$nextTick(() => {
            document.getElementsByTagName("body")[0].style.zoom = 1;
            document.querySelector(".header").style.zoom = 1.5;
            this.isSmall = false;
            store.commit("toggleZoom1", false);
          });
        } else if (oldval.name == "Echarts") {
          store.commit("toggleZoom", true);
        }
      },
      // 深度观察监听
      deep: true,
    },
    isLogin: {
      handler: function (val, oldVal) {},
      deep: true,
    },
    getSearchKey: {
      handler(newValue, oldValue) {
        var that = this;
        console.log(this.$route);
        if (this.$route.name == "home") {
          this.isSmall = true;
        } else {
          this.isSmall = newValue;
        }
      },
    },
  },
  mounted() {
    if (window.localStotage.userInfo) {
      this.isLogin = true;
    } else {
      this.isLogin = false;
      window.localStotage.removeItem("token");
    }
  },
  methods: {
    yes() {
      this.isLogin = false;
    },
    loginout() {
      this.reload();
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    showLogin() {
      this.isLogin = true;
    },
    cancelLogin() {
      this.isLogin = false;
    },
  },
};
</script>

<style>
body,
html {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  /*background-color: rgba(52, 87, 145, 1);*/
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", 微软雅黑, sans-serif;
  background: url("./assets/images/bigbg.jpg");
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
}
@media screen and (max-width: 1549px) {
  #app {
    min-width: 1549px;
    overflow-x: scroll;
  }
}

.aaaa {
  color: #ccc;
}
.bbbbbb {
  display: block;
}
.nullData {
  width: 100%;
  height: 200px;
  text-align: center;
}
.nullData span {
  width: 0px;
  height: 100%;
  display: inline-block;
  vertical-align: middle;
}
.nullData p {
  font-size: 17px;
}
.nullData img {
  vertical-align: middle;
}
/deep/.dataNone.png {
  border-color: #345791;
}
/deep/.viewer-zoom-in {
  display: none !important;
}
body::-webkit-scrollbar {
  width: 0px;
}
body::-webkit-scrollbar-track {
  background-color: #fff;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
body::-webkit-scrollbar-thumb {
  background-color: #ccc;
  -webkit-border-radius: 2em;
  -moz-border-radius: 2em;
  border-radius: 2em;
}
/*[v-cloak] {*/
/*  display: none !important;*/
/*}*/
</style>
