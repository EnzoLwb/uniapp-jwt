<template>
	<view class="container">
		<!-- 上方卡片 -->
		<view class="bg_top_card bg-gradual-blue"></view>
		<view class="cu-card case shop_card">
			<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
							<view class="cu-tag badge">DM</view>
							<view class="content">
								<view class="text-black text-bold">风继续吹</view>
								<view class="text-black text-sm">门店ID:dEDR-w4231</view>
								<view class="text-gray text-sm flex justify-between">
									<view class="text-gray text-sm">
										小程序到期时间：2022-03-01 
										<text class="bg-black text-xs add-time" @click="navTo()">回到店铺</text>
									</view>
								</view>
							</view>
						</view>
					</view>
			</view>
			</view>
		</view>
		<!-- 中部视频讲解 -->
		<view class="radius shadow-blur bg-red banner bg-img" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big91005.jpg);">
			<view>视频教程 DM功能讲解</view>
		</view>
		<!-- 导航页 -->
		<view class="manage bg-white" style="min-height:10vh;padding-top: 10px;">
			<view class="nav-list detail-grid" style="margin-top:30rpx;">
				<navigator hover-class="none" :url="item.url" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in menuList" :key="index">
					<view class="nav-title">{{item.title}}</view>
					<view class="nav-name">{{item.name}}</view>
					<text :class="'cuIcon-' + item.cuIcon"></text>
				</navigator>
			</view>
		</view>
		<!-- 底部技术支持 -->
		<view class="fixed-bottom">
			<view class="support">
				<view style="margin:0 auto">
					<image src="/static/images/common/logo.png" mode=""></image>
					<view class="mt-20" >Y2M提供技术支持</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				menuList:{}
				}
		},
		methods: {
			navTo(url=""){
				if(!url) uni.navigateBack()
				console.log(!url)
				uni.navigateTo({
					url:url
				})
			},
		},
		async onLoad(){
			this.menuList = await this.$api("dmAdmin")
		},
	}
</script>

<style lang="scss" scoped>
	@import '../index/index.scss';
</style>
