<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
			uni.setStorageSync('extConfig', extConfig);
			uni.setStorageSync('store_id', "DeZ0vmnVdfhLZtMOOZXY2zlESeHR8tvysJBp");
			//可以获取到经纬度就比较接口中的min_distance 谁是那个值谁就是最近的；没有经纬度就把第一个值作为当前店铺；两种结果都需要缓存当前店铺信息
			uni.getLocation({
			    type: 'wgs84',
					complete:function(res){
							console.log('当前位置的经度：' + res.longitude);//17.00739
							console.log('当前位置的纬度：' + res.latitude);//39.14111
							///drama/store/list
					}
			});
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
		
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif		
		
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
		
		},
		
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	@import "colorui/main.css";
	@import "colorui/icon.css";
	/* @import "app.css"; */
/* 	.container {
		height:100%;width:100%;
		position:fixed;
	} */
	
</style>
