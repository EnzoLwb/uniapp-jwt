<template>
	<view class="container">
		<!-- 上方卡片 -->
		<view class="bg_top_card bg-gradual-blue"></view>
		<view class="cu-card case shop_card">
			<view class="cu-item shadow">
			<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round xl" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg);">
							<view class="cu-tag badge">管理员</view>
							<view class="content">
								<view class="text-black text-bold">正义天使 凯尔</view>
								<view class="text-black text-sm">门店ID:dEDR-w423</view>
								<view class="text-gray text-sm flex justify-between">
									<view class="text-gray text-sm">
										到期时间：2022-03-01 
										<text class="light bg-cyan text-white text-xs add-time">续费</text>
										<text class="bg-pink  text-xs add-time" @click="navTo()">回到店铺</text>
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
			<view>视频教程 功能讲解</view>
		</view>
		<!-- 下部Tab导航页 -->
		<view class="manage bg-white">
			<scroll-view scroll-x class="nav text-center">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-blue cur':''" v-for="(item,index) in menuList" :key="index" @tap="tabSelect" :data-id="index">
						{{index}}
					</view>
				</view>
			</scroll-view>
			<view class="nav-list detail-grid" style="margin-top:30rpx;">
				<navigator hover-class="none" :url="item.url" class="nav-li" navigateTo :class="'bg-'+item.color"
				 :style="[{animation: 'show ' + ((index+1)*0.2+1) + 's 1'}]" v-for="(item,index) in menuList[TabCur]" :key="index">
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
				TabCur: "常用",
				scrollLeft: 0,
				menuList:{}
				}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			navTo(url=""){
				if(!url) uni.navigateBack()
				console.log(!url)
				uni.navigateTo({
					url:url
				})
			},
		},
		async onLoad(){
			this.menuList = await this.$api("admin")
		},
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
</style>
