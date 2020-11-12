<template>
	<view class="top">
		<view class="top_top p-30 flex-row">
			<navigator class="coupon"  hover-class="none" url="/pages/mine/coupons">领券</navigator>
			<image class="img" 
			src="https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png" mode="widthFix"></image>
			<view class="right flex-col">
				<view class="title mt-10  mb-10 wenyue-font">
					{{drama.name}}
				</view>
				<view class="tags mt-10 flex-row font-weight-bold" >
					<view class="pl-10" v-for="type in drama.dramaType" :key="type" >{{type}}</view>
					
				</view>
				<view class="type mt-20 flex-row font-weight-bold" >
					<view class="pl-10 mt8">{{drama.dramaOpen}}</view>
					<view class="pl-30 mt8">{{drama.personNumber}}人</view>
					<view class="ml-30 cu-tag">{{drama.male}} 男  {{drama.female}} 女</view>
					<view class="ml-60 cu-tag bg-black text-white" v-show="clothes">可换装</view>
				</view>
				<view class="type mt-20 flex-row font-weight-bold" >
					<view class="ml-10 pl-10 pr-10 mt8 drama_style">{{drama.dramaStyle}}</view>
					<view class="ml-30 pl-10 pr-10 mt8 drama_form">{{drama.dramaForm}}</view>
				</view>
				<view class="price mt-20">
					￥{{drama.prices}}/位
				</view>
			</view>
		</view>
	</view>
		
	
</template>

<script>
	export default {
		name: "DramaTop",
		props: {
			drama: {
				type: Object,
				default: {
					drama_id:11,
					name:"蒹葭2麦侦探事务所麦侦探事务",
					cover:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png",
					personNumber:7,
					dramaType:["科幻","民国","情感","校园","古装"],
					dramaStyle:"本格",//"本格","变格","微变","VR"
					dramaForm:"城限",//"盒装","城限","独家","实景","线上","微剧本"
					dramaOpen:"开放式",
					male:4,
					female:3,
					clothes:true,
					prices:68,
				},
			},
			type: {
				type: String,//从哪跳转来的
				default: ""
			},
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.top{
		background-color: white;
		.top_top{
				position: relative;
			.coupon{
				height: 50rpx;
				line-height: 50rpx;
				width: 90rpx;
				border-radius: 30rpx 0rpx 0rpx 30rpx;
				position: absolute;
				right: 0;
				bottom: 40rpx;
				padding-left: 20rpx;
				color: #DBA871;
				background-color: black;
			}
			.img{
				width: 210rpx;
				min-height: 300rpx;
				max-height: 400rpx;
				border-radius: $border-radius-lg;
			}
			.right{
				padding: 10rpx 30rpx;
				font-size: $font-size-base;
				.title{
					font-size: $font-size-extra-lg;
				}
				.type{
					.cu-tag{
						height: 38rpx;
						font-weight: normal;
						border-radius: $border-radius-base;
					}
					.mt8{
						margin-top: 4rpx;
					}
					.drama_style,.drama_form{
						border: 1px solid grey;
						border-radius: $border-radius-lg;
					}
				}
				.price{
					font-family: neutra;
					font-size:$font-size-lg;
					color: $color-primary;
				}
			}
		}
		
		.top_bottom{
			display: flex;
			flex-direction: row;
			font-size: $font-size-base;
			padding: 30rpx 0rpx;
			.block{
				display: flex;
				flex-direction: column;
				width: 33%;
				padding: 0rpx 40rpx;
				text-align: center;
				border-right: 1px solid #cdcdcd;
				.top{
					font-weight: bold;
					font-size: $font-size-medium;
				}
				.bottom{
					color: grey;
					margin-top: 20rpx;
				}
			}
		}
	}
	
</style>
