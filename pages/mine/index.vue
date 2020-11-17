<template>
	<view class="container bg-white">
		<view class="content">
			<view class="welcome" @tap="openLogin()">
				<view class="wenyue-font login"  >
					你好，<text> {{ isLogin ? userInfo.nickName : '立即登录' }}</text>
				</view>
				<view class="wel wenyue-font font-size-base" v-show="isLogin">欢迎光临本店</view>
			</view>
			<!-- member card begin -->
			<view class="member-card">
				<view class="info">
					<view class="title">
						<view class="vip tips" @tap="openBenefits">普通会员</view>
						<!-- <view class="tips" @tap="openMember">
							<view>成为星球会员享双倍积分</view>
							<image src="/static/images/my/icon_arrow.png"></image>
						</view> -->
					</view>
					<image @tap="myProfile()" 
					:src="userInfo.avatarUrl ? userInfo.avatarUrl :'/static/images/my/avatar.png'" class="avatar"></image>
					<view class="badage">
						Lv1
					</view>
				</view>
			</view>
			<!-- member card end -->
			
		</view>
		<!-- 钱包优惠券 begin -->
		<view class="wallet_coupon">
			<view class="task-center">
				<view class="intro">
					<view class="title wenyue-font">优惠券</view>
					<view class="subtitle">Coupon Center</view>
				</view>
				<view class="image-wrapper">
					<image src="/static/images/my/coupons.png"></image>
				</view>
			</view>
			<view class="task-center wallet">
				<view class="intro">
					<view class="title wenyue-font">钱包余额</view>
					<view class="subtitle">Wallet Balance</view>
				</view>
				<view class="image-wrapper">
					<image src="/static/images/my/qianbao.png"></image>
				</view>
			</view>
		</view>
		<!-- 钱包优惠券 end -->
		<view class="cell mt-30">
			<list-cell hover arrow @click="myProfile()">
				<view class="list-cell-wrapper">
					<view class="title"><text class="icon cuIcon-people line-gold"></text> 个人资料</view>
					<view class="subtitle">个性签名 让别人更了解你</view>
				</view>
			</list-cell>
			<!-- 我的组局 全部 组局中 已成局 已解散-->
			<list-cell hover arrow @click="myGroup()">
				<view class="list-cell-wrapper">
					<view class="title"><text class="icon cuIcon-activity line-gold"></text>我的组局</view>
					<view class="subtitle">过往组队记录</view>
				</view>
			</list-cell>
			<list-cell hover arrow @click="myFollow()">
				<view class="list-cell-wrapper">
					<view class="title"><text class="icon cuIcon-favor line-gold"></text>我的关注</view>
				</view>
			</list-cell>
			<list-cell hover arrow @click="myPerfect()">
				<view class="list-cell-wrapper">
					<view class="title"><text class="icon cuIcon-footprint line-gold"></text>我玩过的本</view>
					<!-- <view class="subtitle">标记已玩</view> -->
				</view>
			</list-cell>
			<list-cell hover  @click="contactMe()">
				<view class="list-cell-wrapper">
					<view class="title"><text class="icon cuIcon-phone line-gold"></text>联系我们</view>
				</view>
			</list-cell>
		</view>
		<view class="fixed-bottom">
			<view class="support">
				<view style="margin:0 auto">
					<image src="/static/images/common/logo.png" mode=""></image>
					<view class="mt-20" >Y2M提供技术支持</view>
				</view>
			</view>
		</view>
			<!-- 登录popup -->
			<login-popup ref="loginPopup"></login-popup>
	</view>
</template>

<script>
	import loginPopup from './components/login-popup.vue'
	import listCell from '@/components/list-cell/list-cell.vue'
		import { mapState } from 'vuex'
  export default{
			data() {
				return {
				}	
			},
			computed: {
				...mapState(['isLogin', 'userInfo'])
			},
			onLoad(option) {},
			onShow(){},
			methods: {
				openLogin() {
					if(this.isLogin) {
						return
					}
					this.$refs['loginPopup'].open()
				},
				myProfile() {
					//没有登录就先登录
					if(!this.isLogin) {
						this.openLogin()
						return
					}
					console.log(this.isLogin)
					uni.navigateTo({
						url:"/pages/mine/info"
					})
				},
				myGroup() {
					uni.navigateTo({
						url:"/pages/mine/group"
					})
				},
				myFollow(){
					uni.navigateTo({
						url:"/pages/mine/follow"
					})
				},
				myPerfect(){
					uni.navigateTo({
						url:"/pages/mine/perfect"
					})
				},
				contactMe() {
					uni.makePhoneCall({
					    phoneNumber: "114" //仅为示例
					});
				},
			},
			components: {
				loginPopup,listCell
			}
  }
</script>

<style lang="scss" scoped>
	.container{
		// position: relative;
		height: 100vh;
	}
	.content {
		margin: 0 40rpx;
		padding-top: 180rpx;
		// border-bottom: 1rpx solid rgba($color: $border-color, $alpha: 0.5);
		
	}
	.fixed-bottom{
		z-index:10;
		bottom: 60rpx;
		.support{
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			color:$text-color-assist;
			font-size: $font-size-extra-sm;
			image{
				width:40rpx;height:40rpx;
			}
		}
		
	}
	.welcome {
		position: relative;
		padding: 0rpx 20rpx;
		// margin-top: -136rpx;
		display: flex;
		flex-direction: column;
		font-size: $font-size-lg;
		color: $text-color-warning;
		.login{
			// text-decoration: underline;
			z-index:10;
		}
		.wel{
			padding-top: 20rpx;
		}
	}
	
	.member-card {
		background-color: $bg-color-white;
		padding: 20rpx;
		display: flex;
		flex-direction: column;
		border-radius: $border-radius-base;
		
		.info {
			position: relative;
			margin-top: -50rpx;
			display: flex;
			align-items: center;
			position: relative;
			padding: 20rpx 0;
			
			.title {
				flex: 1;
				font-size: 40rpx;
				color: $text-color-base;
				display: flex;
				align-items: center;
				.vip {
					font-size: 32rpx;
				}
				.tips {
					margin-left: 10rpx;
					font-size: $font-size-sm;
					color: $text-color-assist;
					background-color: #e9e9e9;
					padding: 10rpx 30rpx;
					border-radius: 50rem !important;
					display: flex;
					align-items: center;
					
					image {
						width: 20rpx;
						height: 20rpx;
					}
				}
			}
			
			.avatar {
				width: 150rpx;
				height: 150rpx;
				border-radius: 100%;
			}
			
			.badage {
				font-family: 'neutra';
				position: absolute;
				bottom: 20rpx;
				left: 12rpx;
				border: 2rpx solid $text-color-base;
				padding: 2rpx 20rpx;
				border-radius: $border-radius-lg;
				font-size: $font-size-base;
			}
		}
		
		.row {
			margin-top: $spacing-row-base;
			width: 100%;
			display: flex;
			align-items: center;
	
			.grid {
				flex: 1;
				flex-shrink: 0;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				image {
					width: 100rpx;
					height: 100rpx;
				}
				
				.value {
					font-family: 'neutra';
					margin-bottom: $spacing-col-sm;
					font-size: $font-size-lg;
				}
				
				.title {
					font-size: $font-size-sm;
					color: $text-color-grey;
				}
			}
		}
	}
	
	.xinqiubobao {
		width: 100%;
		position: relative;
		
		.title {
			margin: 10rpx 0;
			font-size: $font-size-lg;
			font-weight: 500;
		}
		
		.swiper {
			height: 200rpx;
			margin-bottom: 10rpx;
			
			.swiper-item {
				
				.swiper-item-wrapper {
					display: flex;
					background-color: $bg-color-white;
					padding: 40rpx 60rpx;
					border-radius: $border-radius-base;
					align-items: center;
					margin-right: 40rpx;
					
					image {
						width: 100rpx;
						height: 100rpx;
						border-radius: 100%;
						margin-right: 20rpx;
					}
					
					.desc {
						display: flex;
						flex-direction: column;
						
						.title {
							font-size: $font-size-medium;
							font-weight: 500;
							margin-bottom: 10rpx;
						}
						
						.desc {
							font-size: $font-size-sm;
							color: $text-color-grey;
						}
					}
				}
			}
		}
	}
	.wallet_coupon{
		
		display: flex;
		flex-direction: row;
		padding: 0rpx 20rpx;
		justify-content: space-between;
	}
	.task-center {
		margin: 20rpx 0;
		background-color: $bg-color-white;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		border-radius: $border-radius-lg;
		
		.intro {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			.title {
				font-size: $font-size-medium;
				color: $text-color-base;
			}
			.subtitle {
				font-family: 'neutra';
				font-size: 32rpx;
				text-align: center;
				margin-top: 15rpx;
			}
		}
		
		.image-wrapper {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			
			image {
				width: 180rpx;
				height: 180rpx;
			}
		}
	}
	.cell   {
		padding: 0rpx 30rpx;	
	}
	list-cell .list-cell-wrapper {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		
		.title {
			font-size: $font-size-xl;
			font-weight: bold;
			.icon{
				margin-right: 20rpx;
			}
		}
		
		 .subtitle {
			font-size: $font-size-sm;
			color: $text-color-assist;
		}
	}
	
</style>