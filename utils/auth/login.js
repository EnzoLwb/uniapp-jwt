// #ifndef H5
const loginCode = provider => {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: "weixin",
            success: function(loginRes) {
                if (loginRes && loginRes.code) { 
									uni.getUserInfo({
									      provider: 'weixin',
									      success: function (infoRes) {
													console.log(1111)
													var res = Object.assign({},loginRes,infoRes.userInfo)
													resolve(res) 
									      }
									    });
									console.log(2222)
								} else { 
									reject("获取code失败")
								}
            },
            fail:function(){ reject("获取code失败")}
        });
    })
}
// #endif
export {
    loginCode //登录获取code
}