const tokenKey = 'accessToken';//键值
const userKey    = 'user'; // 用户信息
// token
const getAccessToken = function(){
    let token='';
    try {token = 'Bearer '+ uni.getStorageSync(tokenKey);} catch (e) {}
    return token;
}
const setAccessToken = (access_token) => {
    try {uni.setStorageSync(tokenKey, access_token);return true;} catch (e) {return false;}
}
const clearAccessToken = function(){
    try {uni.removeStorageSync(tokenKey);} catch (e) {}
}
// userinfo
const setUser = (user)=>{
    try {uni.setStorageSync(userKey, user);return true;} catch (e) {return false;}
}
const getUser = function(){
    try {return uni.getStorageSync(userKey)} catch (e) {return false;}
}
const clearUser = function(){
    try {uni.removeStorageSync(userKey)} catch (e) {}
}
export default {
  getAccessToken,setAccessToken,clearAccessToken,getUser,setUser,clearUser
}