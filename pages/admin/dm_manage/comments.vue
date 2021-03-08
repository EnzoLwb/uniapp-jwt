<template>
	<view>
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">评价审核</block></cu-custom>
		<view class="review">
			<view class="score">10.0</view>
			<view class="star">
				<view class="top text-gray">111人评价</view>
				<star-rating score='3'></star-rating>
			</view>
			<view class="submit">
				<button :disabled="false">我要评价</button>
			</view>
		</view>
		<view class="cu-list menu-avatar comment solids-top">
			<view class="cu-item" v-for="item in 14" :key="item">
				<view class="cu-avatar lg round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
				<view class="content" style="padding:0rpx 10rpx 0rpx 30rpx;">
					<view class="text-grey">莫甘娜</view>
					<view class="text-black margin-top-sm  text-content text-df">
						凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。
					</view>
					<view class="margin-top-sm flex justify-between">
						<view class="text-gray">2018年12月4日</view>
						<view class="text-lg">
							<text class="cuIcon-add text-red" v-if="!passed" @click="verifyPass()">审核通过</text>
							<text class="cuIcon-check text-gray margin-left-sm" @click="cancelPass()" v-else>已通过</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				drama:[],
				scoreNum:0,
				review:"",//我填写的评价
				visible: false,
				passed:true,
			}
		},
		async onLoad(){
			
		},
		methods:{
			verifyPass(){
				uni.showModal({
				    title: '提示',
				    content: '审核通过并将此评价评分计入',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			cancelPass(){
				uni.showModal({
				    title: '提示',
				    content: '取消显示该评论评价并重新计算评分',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	
.review{
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	padding: 40rpx;
	.score{
		font-size: 70rpx;
		font-family: "neutra";
	}
	.star{
		display: flex;
		flex-direction: column;
		.top{
			margin-bottom: 10rpx;
			padding: 0rpx 30rpx;
		}
	}
	button{
		border-radius: $border-radius-lg;
		margin-top: 20rpx;
	}
}
</style>

