// vue.config.js
module.exports = {
    lintOnSave: false,
    publicPath:"./",
    productionSourceMap:false,
    css:{
        sourceMap: false,
    },
    devServer: {
        host: "0.0.0.0",
        port: 8080, // 端口号
        https: false, // https:{type:Boolean}
        open: true, //配置自动启动浏览器
        //设置完成后重启npm
             proxy: {
                 //设置代理
                 "/devapi": {
                     target: "http://49.233.189.45:1000", // 接口的域名
                 }
             },
         },
}