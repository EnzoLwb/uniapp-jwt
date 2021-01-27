// #ifndef H5
const loginCode = provider => {
    return new Promise((resolve, reject) => {
        uni.login({
            provider: "weixin",
            success: function(loginRes) {
							console.log("login")
                if (loginRes && loginRes.code) { 
									uni.getUserInfo({
									      provider: 'weixin',
									      success: function (infoRes) {
													console.log("getUserInfo")
													loginRes.store_id = uni.getStorageSync("store_id")
													var res = Object.assign({},loginRes,infoRes.userInfo)
													resolve(res) 
									      }
									    });
								} else { 
									reject("获取code失败")
								}
            },
            fail:function(){ reject("获取code失败")}
        });
    })
}

export {
    loginCode //登录获取code
}
// #endif