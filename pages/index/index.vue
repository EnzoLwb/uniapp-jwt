<template>
	<view class="bg-white" style="min-height: 100%;">
		<view class="container bg-white">
			<swiper class="screen-swiper square-dot" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper>
			<view class="cu-card case bg-white padding radius shadow-warp margin">
				<view class="cu-item">
					<view class="cu-avatar round xl"  style="float: right;background-image:url(https://cdn.learnku.com/uploads/avatars/25478_1552028471.jpg!/both/400x400);"></view>
					<view>
						<h3>异想天开天津大学城店</h3>
						<view class="margin-top" style="font-size: 28rpx;">桌号10</view>
					</view>
				</view>
				<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg" style="background-image:url(https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEI00iav9lnXkdU7EpLLeSJWlKk5TOgBwpTnrUibvgW97HfSVictDtjRr0Uhw9wSWKTylgfaIPMq5x3Xw/132);">
									<view class="cu-tag badge cuIcon-female bg-pink"></view>
									<!-- cuIcon-male bg-blue 男 -->
								</view>
								<view class="content flex-sub">
									<view class="text-grey">Enzo,欢迎光临！</view>
								</view>
							</view>
				</view>
				
			</view>
			<view class="padding flex flex-direction" style="margin-top: 80rpx;">
				<button class="cu-btn bg-gold margin-tb-sm lg" @click="navigate()">点餐</button>
			</view>
		</view>

	</view>
</template>

<script>
	export default{
		data(){
			return {
				swiperList: [{
							id: 0,
							type: 'image',
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
						}, {
							id: 1,
							type: 'image',
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
						}, {
							id: 2,
							type: 'image',
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
						}, {
							id: 3,
							type: 'image',
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
						}, {
							id: 4,
							type: 'image',
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
						}, {
							id: 5,
							type: 'image',
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
						}, {
							id: 6,
							type: 'image',
							url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
						}],
					}

		},
		onLoad() {
			this.TowerSwiper('swiperList');
			// 初始化towerSwiper 传已有的数组名即可
		},
		methods:{
			// 初始化towerSwiper
			TowerSwiper(name) {
				let list = this[name];
				for (let i = 0; i < list.length; i++) {
					list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
					list[i].mLeft = i - parseInt(list.length / 2)
				}
				this.swiperList = list
			},
			navigate(){
				uni.redirectTo({
				    url: 'person_number?id=10'
				});
			}
		}
	}
</script>

<style>

	 
</style>
