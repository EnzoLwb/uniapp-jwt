<template>
	<view class="bg-white container">
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
		<view class="cu-card case bg-white padding radius shadow-warp margin">
			<view style="font-size: 32rpx;color: black;">请问您几人用餐?</view>
			<view class="grid col-3 padding-sm">
				<view class="margin-tb-sm text-center" style="padding: 0px 20rpx;"  v-for="n in 9" :key="n" >
					<button class="cu-btnline-grey" :class="number==n?'line-red':''" @click="selectNumber(n)">{{n}}</button>
				</view>
			</view>
		</view>
		<view class="padding flex flex-direction" style="margin-top: 40rpx;">
			<button class="cu-btn bg-gold margin-tb-sm lg" @click="navigate()"
			:disabled="number!=0 ? false:true">确定</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				number:0,
			}
		},
		methods:{
			selectNumber(n){
				this.number = n
			},
			navigate(){
				uni.navigateTo({//不关闭当前页面 跳转到菜单页面
				    url: '/pages/menu/index?id=10'
				});
			}

		}
	}
</script>

<style>
</style>
