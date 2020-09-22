<template>
    <view>
        <button type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" 
				@getuserinfo="wxGetUserInfo">
        	点击登录
        </button>
				<button @tap="me">获取用户数据</button>
        <button @tap="clear">清除用户数据</button>
    </view>
</template>

<script>
    import auth from '@/utils/auth/auth.js';
    import jwt from '@/utils/auth/jwt.js';
    var _self;
    export default{
        data() {return {}},
        onLoad(option) {},
        onShow(){},
        methods: {
            wxGetUserInfo: function(e){
                auth.login().then(res=>{
									//更改头像和昵称啥的
									console.log(res)
								}, function(error) {
									console.log(error)
								});//登陆
								// console.log(jwt.getUser())
            },
            me: function(){
                this.$http.get('/auth/me',{custom: {auth: true}}).then(res=>{
                    console.log(res,'success')
                }).catch(err=>{
                    console.log(err,'error60')
                })
            },
            clear: function(){
                jwt.clearAccessToken();
                jwt.clearUser();
                uni.showToast({
                    icon: 'success',
                    title: '清除成功',
                    duration:2000,
                });
            }
        },
        components: {}
    }
</script>

<style>
</style>