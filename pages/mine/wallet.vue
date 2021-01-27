<template>
	<view class="wallet">
		<cu-custom  ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">我的钱包</block></cu-custom>
		<view class="top ">
			<view class="title">
				可用余额
			</view>
			<view class="amount flex  padding justify-center" >
				<view class="flex align-center">
					<view>￥</view><view class="fee">10.00</view>
				</view>
			</view>
		</view>
		<view class="flex justify-center">
			<navigator class="log">
				消费记录 >
			</navigator>
		</view>
		<view class="recharge">
			<view class="padding flex text-bold justify-center">请选择充值金额</view>
			<view class="act flex padding justify-between" v-for="i in 4" :key="i">
				<view class="left flex align-center">
					<view class="group">
						<view class="title text-bold">首次充值活动</view>
						<view class="desc text-gray">充 0.01 送 1 元</view>
					</view>
					<view class="cu-tag bg-red round" v-if="i%2 ==0">
						送券
					</view>
				</view>
				<view class="right">
					<navigator class="amount">
						￥1.00
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		methods:{
			
		},
	}
</script>

<style lang="scss" scoped>
	.wallet{
		background-color: white;
		.top{
			margin-top: 40rpx;
			text-align: center;
			.title{
				font-size: 26rpx;font-weight: bold;
			}
			.amount{
				font-size: 34rpx;
				.fee{
					font-size: 64rpx;
				}
			}
			.cz_btn{
				font-size: 30rpx;
				height: 80rpx;
				line-height: 80rpx;
				width: 300rpx;
				color: white;
				background-color: $color-primary;
			}
		}
		.log{
			text-decoration: underline;
			padding: 50rpx;
		}
		.recharge{
			background-color: $bg-color-grey;
			.act{
				background-color: white;
				.right{
					.amount{
						text-align: center;
						font-size: 26rpx;
						height: 60rpx;
						line-height: 60rpx;
						width: 150rpx;
						color: white;
						border-radius: 10rpx;
						background-color: $color-primary;
					}
				}
				.left{
					.group{
						margin-right: 16rpx;
						
						.desc{
							padding-top: 10rpx;
							font-size: 26rpx;
						}
					}
					.cu-tag{
							font-size: 20rpx;
					}
				}
			}			
		}
	}
</style>
