import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import store from './store/store.js'
import moment from 'moment'//导入文件
import './assets/font/iconfont.css'
import VueLazyLoad from 'vue-lazyload'
import $ from 'jquery'
import echarts from 'echarts'
import AFTableColumn from 'af-table-column'

Vue.use(AFTableColumn)
import 'fullpage.js/vendors/scrolloverflow' // Optional. When using scrollOverflow:true
// import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import VueFullPage from 'vue-fullpage.js'

Vue.use(VueFullPage);
import 'lib-flexible' //引入flexible
Vue.prototype.$echarts = echarts   
//  全局过滤器 时间戳 
Vue.filter('dateformat', function (dataStr, pattern = 'YYYY-MM-DD') {
  if (dataStr) {
    return moment(dataStr).format(pattern)
  } else {
    return dataStr
  }
})
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999,
    rotatable:false,
    scalable:false,
    tooltip:false,
  }
})
import '../src/utils/index.js'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element)
Vue.config.productionTip = false
router.afterEach((to,from,next) => {
  window.scrollTo(0,0);
});
Vue.use(VueLazyLoad,{
  error:require('./assets/images/error.jpg'), //加载失败的图
  loading:require('./assets/images/loading.gif') //加载中的默认图
})
Vue.prototype.Logindialog=false
Vue.prototype.$getBase64Image = img => {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, img.width, img.height);
  var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
  var dataURL = canvas.toDataURL("image/" + ext);
  return dataURL;
};
var vue = new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
export default vue
