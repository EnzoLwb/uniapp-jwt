<template>
	<view>
	<cu-custom :isBack="true" bgColor="bg-gold text-white">
		<block slot="backText" @click="back()" >返回</block>
		<block slot="content">已选购</block>
	</cu-custom>
	<view class="container">
		<view class="cart-popup">
			<view class="header">
				<view class="order-type">
					<view class="font-weight-bold">
						共 10 件
						</view>
					
				</view>
				<view class="d-flex align-items-center" @tap="clear">
					<image src="/static/images/common/delete.png" class="delete-btn"></image>
					<view>清空</view>
				</view>
			</view>
			<!-- card 开始 -->
			<view class="cu-card case bg-white padding radius shadow-warp margin">
				<view class="cu-list menu-avatar">
							<view class="cu-item">
								<view class="cu-avatar round lg" style="background-image:url(https://wx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEI00iav9lnXkdU7EpLLeSJWlKk5TOgBwpTnrUibvgW97HfSVictDtjRr0Uhw9wSWKTylgfaIPMq5x3Xw/132);">
								
								</view>
								<view class="content flex-sub">
									<view class="text-grey">Enzo,欢迎光临！</view>
								</view>
							</view>
				</view>
				
			</view>
			
			<!-- card结束 -->
			</view>
			<view class="footer">
				<view class="mr-30">
					合计：<text class="font-size-lg font-weight-bold">￥1333</text>
				</view>
				<button type="primary">支付</button>
			</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cart : []
			}
		},
		methods: {
			back(){
				uni.navigateBack({
				    
				});
			},
			clear() {
				uni.showModal({
				    content: '清空购物车',
					confirmColor: '#DBA871',
				    success: res => {
				        if (res.confirm) {
									this.cart = []
				        }
				    }
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.pro-img {
		width: 120rpx;
		height: 90rpx;
		flex-shrink: 0;
	}
	
	.coupon-label {
		background-color: $color-primary;
		color: #FFFFFF;
		font-size: 18rpx;
		line-height: 0.9rem;
		width: 0.9rem;
		height: 0.9rem;
		margin-left: 10rpx;
		text-align: center;
	}
	
	.wx-pay-icon {
		width: 40rpx;
		height: 40rpx;
		margin-right: 10rpx;
	}
	
	.footer {
		background-color: #FFFFFF;
		z-index: 10;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		
		button {
			width: 250rpx;
			text-align: center;
			padding: 0;
			height: 100%;
			line-height: 100rpx;
			border-radius: 0 !important;
			font-size: $font-size-lg;
		}
	}
.cart-popup {
	background-color: $bg-color-white;
	padding-bottom: 100rpx;
}

.header {
	padding: 20rpx 30rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
	font-size: $font-size-sm;
	color: $text-color-assist;

	.order-type {
		display: flex;
		align-items: center;
		font-size: $font-size-sm;
		color: $text-color-base;
		
		.extra {
			margin-right: 10rpx;
			border: 2rpx solid $color-primary;
			font-size: 18rpx;
			padding: 2rpx 10rpx;
			color: $color-primary;
			margin-left: 10rpx;
		}
	}
	
	.delete-btn {
		width: 46rpx;
		height: 46rpx;
		margin-right: 10rpx;
	}
}

.content {
	max-height: calc(100vh - 600rpx);
	
	.wrapper {
		width: 100%;
		height: 100%;
		padding: 0 30rpx;
	}
	
	.list {
		display: flex;
		flex-direction: column;
		margin-bottom: 30rpx;
		
		.item {
			display: flex;
			align-items: stretch;
			padding: 30rpx 0;
			position: relative;
			
			&:after {
				content: ' ';
				position: absolute;
				bottom: 0;
				left: 180rpx;
				right: 0;
				border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.6);
			}
			
			.left {
				flex-shrink: 0;
				display: flex;
				align-items: center;
				
				.image {
					width: 180rpx;
				}
			}
			
			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: $font-size-medium;
				color: $text-color-base;
				
				.name-and-materials {
					display: flex;
					flex-direction: column;
					margin-bottom: 20rpx;
					
					.name {
						font-weight: bold;
					}
					
					.materials {
						font-size: $font-size-sm;
						color: $text-color-assist;
					}
				}
				
				.price-and-actions {
					display: flex;
					justify-content: space-between;
				
					.price {
						color: $text-color-grey;
					}
				}
			}
		}
	}
}
</style>

