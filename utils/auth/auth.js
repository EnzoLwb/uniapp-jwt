import {loginCode} from '@/utils/auth/login.js';
import jwt from '@/utils/auth/jwt.js';
import {http} from '@/utils/luch-request/index.js';

const login = function(){
    return new Promise((resolve, reject) => {
        loginCode().then(loginRes=>{
            return http.post('/auth/login',loginRes);
        })
        .then(res=>{
					console.log("setToken")
            jwt.setAccessToken(res.data.data.access_token);
            jwt.setUser(res.data.data.user);
            getApp().globalData.isLogin = true;
            resolve(res.data.data.user);
        })
        .catch(err=>{
					console.log(err)
            reject('登陆失败')
        })
    })
}

export default {login}