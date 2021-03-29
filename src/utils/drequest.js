import axios from 'axios'
import Vue from 'vue'
import vue from '../main'

// create an axios instance
const service = axios.create({
  baseURL: window._CONFIG['baseURL'],//服务器
  timeout: 50000, // request timeout
  withCredentials:false ,
})

// request interceptor
service.interceptors.request.use(
    config => {
    if (!config.headers['X-Access-Token']) {
      config.headers['X-Access-Token'] = `${window.localStorage.getItem(
        'Authorization'
      ) || ''}`;
    }
    return config;
  },
  err => Promise.reject(err)
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response

    if (res.errno === 501) {
      return Promise.reject('error')
    } else if (res.errno === 502) {
      return Promise.reject('error')
    } if (res.errno === 401) {
      return Promise.reject('error')
    } if (res.errno === 402) {
      return Promise.reject('error')
    }else if(res.status == 250) {
        window.sessionStorage.removeItem('webpack-dev-server')
        window.localStorage.removeItem('userInfo')
        window.localStorage.removeItem('Authorization')
        window.localStorage.removeItem('webpack-edit')
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('backstage')
          // vue.$router.push('/home')
          return response
      } else if (res.status===200||res.status==500) {
          // 非5xx的错误属于业务错误，留给具体页面处理
      return response
    } else {
      return Promise.reject(response)

    }
  }, error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  })

export default service
