<template>
	<uni-popup ref="popup" type="bottom" @change="change">
		<view class="popup-content d-flex flex-column">
			<view class="d-flex justify-content-end">
				<image src="/static/images/common/clousex-big.png" class="close_btn" @tap="close"></image>
			</view>
			<view class="d-flex flex-fill flex-column justify-content-between">
				<view class="d-flex flex-column">
					<view class="font-size-extra-lg font-weight-bold text-color-base mb-30">欢迎登陆~</view>
					<view class="font-size-base text-color-assist">登录后组队开局方便，享受更好的服务体验</view>
				</view>
				<view class="d-flex flex-column">
					<button type="primary" :loading="btnLoading" class="w-100 font-size-lg mb-30" 
					open-type="getUserInfo" :disabled="btnLoading" @getuserinfo="getUserInfo">微信一键登陆</button>
					<!-- <view class="text-center mb-30 font-size-sm text-color-assist">
						点击登陆喜茶GO，即表示已阅读并同意<font class="text-color-primary">《喜茶隐私政策》</font>
					</view>
					<view class="text-center font-primary font-size-sm text-color-primary">《喜茶GO小程序服务指南》</view> -->
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import { mapMutations ,mapState} from 'vuex'
	import auth from '@/utils/auth/auth.js';
	export default {
		name: 'LoginPopup',
		components: {
			uniPopup
		},
		data() {
			return {
				btnLoading:false,
			}	
		},
		props: {

		},
		methods: {
			...mapMutations(['SET_USERINFO', 'SET_ISLOGIN']),
			...mapState(['isLogin']),
			open() {
				this.$refs['popup'].open()
			},
			close() {
				this.$refs['popup'].close()
			},
			change({show}) {
				this.$emit('change', show)
			},
			getUserInfo(e) {
				this.btnLoading = true;
				//请配置AppID，否则获取失败
				if(e.target.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '提示',
						content: '您已取消了授权，请重新授权登录',
						showCancel: false
					})
					return
				}

				auth.login().then(res=>{
					//更改头像和昵称啥的
					this.SET_USERINFO(res)
					this.SET_ISLOGIN(true)					uni.setStorageSync("is_login",true)
					//跳转到之前的页面
					var path = uni.getStorageSync("LOGIN_CURRENTPATH")
					if(path){
						uni.redirectTo({
						    url: "/"+path,
								success() {
									uni.removeStorageSync("LOGIN_CURRENTPATH")
								}
						});
					}
					this.close()
				}, function(error) {
					uni.showToast({
					    title: 'error',
					});
					this.btnLoading = false;
				});

			}
		}
	}
</script>

<style lang="scss" scoped>
	.popup-content {
		background-color: #FFFFFF;
		border-radius: 24rpx 24rpx 0 0;
		height: 30vh;
		padding: 50rpx 60rpx;
	}
	
	.close_btn {
		width: 40rpx;
		height: 40rpx;
	}
</style>
