<template>
	<view class="flex shop_detail bg-white">
			<view class="left flex">
				<view class="map-icon">
					<text class="cuIcon-location"></text>
				</view>
				<view class="address_name flex">
					<view class="name text-black wenyue-font">
						{{shop.name}}
					</view>
					<view class="address text-gray">
						{{shop.address}}
					</view>
				</view>
			</view>
			<view class="right flex">
				<view class="daohang text-gold flex" @click="openLocation()">
					<text class="cuIcon-activityfill"></text>
					<text class="zhushi">导航</text>
				</view>
				<view class="phone text-gold flex" @click="makePhone()">
					<text class="cuIcon-dianhua"></text>
					<text class="zhushi">电话</text>
				</view>
			</view>
	</view>
	
</template>

<script>
	export default {
		name: "ShopDetail",
		props: {
			shop: {
				type: Object,
				default: {
					address:"天津市南开区西湖道龙井里B区22-2-102(麦当劳旁入口进入)",
					name:"麦侦探事务所",
					phone:"114",
					latitude:39.14111,//Number Not String!
					longitude:117.00739,
					placeholder:"迟到者直接拉入黑名单!",
					tips:"感谢您对本店的支持,预约之后记得马上分享给小伙伴哦! 让Ta们立即加入车队~记得准时参加。如临近修改信息,记得致电门店哦!",
				},
			},
		},
		methods: {
			makePhone(){
				uni.makePhoneCall({
				    phoneNumber: this.shop.phone //仅为示例
				});
			},
			openLocation(){
				console.log("openLocation")
				uni.openLocation({
				    latitude: this.shop.latitude,
				    longitude: this.shop.longitude,
						name:this.shop.name,
						address:this.shop.address,
				    success: function () {
				        console.log('success');
				    },
						fail: function (err) {
							console.log(err);
						}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.shop_detail{
		flex-direction: row;
		padding: 20rpx 0rpx 30rpx 30rpx;
		font-size: $font-size-xl;
		.left{
			width: 70%;
			flex-direction: row;
			align-items: center;
			.address_name{
				flex-direction: column;
				margin-left:20rpx;
				.address{
					font-size: $font-size-base;
					margin-top:10rpx
				}
			}
			.map-icon{
				font-size: 36rpx;
			}
		}
		.right{
			flex-direction: row;
			align-items: center;
			font-size: 50rpx;
			.daohang,.phone{
				margin:0rpx 30rpx;
				flex-direction: column;
				.zhushi{
					margin-top: 12rpx;
					color:grey;
					font-size:$font-size-extra-sm;
				}
			}
		}
	}
	
</style>
