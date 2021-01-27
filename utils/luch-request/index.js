import Request from './core/Request.js'
export default Request
import jwt from '@/utils/auth/jwt.js'; // jwt 管理 见下文
const http = new Request();
const baseUrl = 'http://y2m.mynatapp.cc/drama'; // api 地址
var platform = 'MP-WEIXIN'; // 登陆时需知道来自哪个平台的小程序用户

/* 设置全局配置 */
http.setConfig((config) => { 
  config.baseURL = baseUrl; //设置 api 地址
  config.header = {
    ...config.header
  }
  return config
})

/* 请求之前拦截器 */
http.interceptors.request.use((config) => {
    if (!platform) {return Promise.reject("缺少平台参数");}
		var ext = uni.getStorageSync("extConfig")
    if (!ext.appId) {return Promise.reject("服务器开小差了~请再次访问");}
    config.header = {
        ...config.header,
        platform:platform,
        appId:ext.appId,
    } 
  if (config.custom.auth) {
			if(jwt.getAccessToken()=='Bearer '){
				return Promise.reject("401")
			}
			config.header.Authorization = jwt.getAccessToken();
  }
  return config
})

http.interceptors.response.use((response) => { /* 请求之后拦截器 */
    // 如果是需要权限认证的路由
    if(response.config.custom.auth){
				if(response.data.code == 4011){
						// 刷新 token
						jwt.setAccessToken(response.data.data.access_token);
						// 携带新 token 重新请求
						let repeatRes = http.request(response.config);
						if ( repeatRes ) {
								response = repeatRes;
						}
				}
    }
    return response

}, (response) => { // 请求错误做点什么
    if(response.statusCode == 401){
        getApp().globalData.isLogin = false;
        uni.showToast({icon:'none',duration:2000,title: "请登录"})
    }else if(response.statusCode == 403){
				var msg = response.data.msg ? response.data.msg :  "您没有权限进行此项操作，请联系客服。"
        uni.showToast({
            title: msg,
						duration:2000,
            icon: "none"
        });
    }
  return  Promise.reject(response)
})


export {
  http,jwt
}