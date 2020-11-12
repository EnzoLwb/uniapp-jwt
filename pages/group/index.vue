<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">组局详情</block></cu-custom>
		<!-- 剧本信息 -->
		<drama-top></drama-top>
		<!-- 店铺地点 电话 导航-->
		<shop-detail></shop-detail>
		<!-- 按钮 -->
		<view class="change_detail">
			<view class="title"><text class="cuIcon-titles text-gold">具体信息</text></view>
			<view class="change_btn flex">
				<button class="cu-btn bg-black text-white">
					{{reserve.date}} {{reserve.time}} {{reserve.person_number}}人
				</button>
			</view>
			<view class="title" style="padding-bottom: 10rpx;">
				<text class="cuIcon-titles text-gold">成员</text>
				<view class="cu-capsule round">
					<view class='cu-tag bg-grey '><text class='cuIcon-peoplelist'></text></view>
					<view class="cu-tag line-grey">7 / 12</view>
				</view>
				<view class="cu-capsule round">
					<view class='cu-tag bg-blue '><text class='cuIcon-male'></text></view>
					<view class="cu-tag line-blue">4 / 5</view>
				</view>
				<view class="cu-capsule round">
					<view class='cu-tag bg-pink '><text class='cuIcon-female'></text></view>
					<view class="cu-tag line-pink">4 / 4</view>
				</view>
			</view>
			<view class="avatars">
				<view class="cu-avatar round lg margin-left"  v-for="(item,index) in reserve.members" :key="index" :style="[{ backgroundImage:'url(' + item + ')' }]">
					<view class="cu-tag badge" :class="index%2==0?'cuIcon-female bg-pink':'cuIcon-male bg-blue'"></view>
				</view>
				<view class="cu-avatar round bg-white lg margin-left wait-join"  v-for="(item,index) in (reserve.person_number - reserve.members.length)" :key="index" >
					
				</view>
			</view>
			
		</view>
		<!-- 发起人留言 -->
		<view class="tips-box" v-show="reserve.beizhu">
			<view class="tips_title">
				<view>
					<image src="/static/images/group/tips.png" class="status-icon"/>
				</view>
				<view class="text-color-primary font-size-medium font-weight-bold ml-10">发起人留言</view>
			</view>
			<view class="tips font-size-medium">{{reserve.beizhu}}</view>
		</view>
		<!-- 剧本角色 -->
		<view class="desc">
			<view class="title" ><text class="cuIcon-titles text-gold">剧本角色</text></view>
			<view class="role">
				<swiper class="swiper" circular display-multiple-items="4"
				 next-margin="10rpx" :autoplay="false">
						<swiper-item class="swiper-item" v-for="(item, index) in role_list" :key="index">
							<view class="swiper-item-wrapper" >
								<view class="cu-item shadow" @tap="showAddressModal(index)">
									<image mode="widthFix"  
									src="https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png" >
									</image>
									<view class="neutra-font kbcs shenglue">{{item.name}}</view>
								</view>
							</view>
						</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 角色弹窗 -->
		<view class="cu-modal" :class="visible==true?'show':''" @tap="hideModal" >
			<view class="cu-dialog" @tap.stop="">
				<view class="content"  style="background-color: white;">
					<swiper :current="current_role" :circular="true" class="swiper" :autoplay="false" >
						<swiper-item v-for="(item, index) in role_list" :key="index" class="swiper-item">
							<image :src="item.coverPic" mode="aspectFill"></image>
							<view class="name">{{item.name}}</view>
							<view class="cover_desc">{{item.desc}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 弹窗角色结束 -->
		<!-- 底部按钮 -->
		<view class="footer bg-black" v-show="footer"><!-- 队伍里的人或者管理员才显示 -->
				<view class="cu-bar">
					<view class="btn-group">
						<button class="cu-btn bg-gold wenyue-font text-black"><text class="cuIcon-roundclosefill"></text>解散</button><!-- 管理员和发起人显示 -->
						<button class="cu-btn bg-gold wenyue-font text-black"><text class="cuIcon-add"></text>邀请好友</button><!-- 队伍里的人显示 -->
						<button class="cu-btn bg-gold wenyue-font text-black"><text class="cuIcon-close"></text> 退出</button><!-- 队伍里的人显示 如果只有一个发起者则直接解散 -->
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	import DramaTop from '../drama/components/drama-index.vue'
	import ShopDetail from './components/shop-detail.vue'

	export default{
		components: {
			DramaTop,ShopDetail
		},
		data(){
			return {
				visible:false,
				autoplay:false,
				current_role:0,
				reserve:{
					drama_id:11,
					date:this.$common.originReserveTime(),//默认是转天 与子组件统一
					time:"12:00",
					person_number:10,
					members: [
						'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
						'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
						'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
						'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
						'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
						'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
						'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					],
					beizhu:"不能迟到！不能迟到！",
				},
				footer:false,//底部是否显示 队伍里的人或者管理员才显示
				role_list:[
					{
						name:"柴暖心",desc:"德全装修公司总裁秘书。波浪卷发，圆脸，五官周正，很是气质",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png",
					},
					{
						name:"海光明",desc:"个体户老板。身材高大，浓眉大眼，长相粗狂，寸头",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603675034-d17b9800f4d3ebd.jpg",
					},
					{
						name:"纪克铭",desc:"银行业务员。个子不高，身材消瘦，鼻梁高挺，戴眼镜，微微驼背",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603335530-13227c8208abaac.jpg",
					},
					{
						name:"纪克铭纪克铭纪克铭纪克铭",desc:"银行业务员。个子不高，身材消瘦，鼻梁高挺，戴眼镜，微微驼背",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603675034-d17b9800f4d3ebd.jpg",
					},
				],
			}
		},
		methods:{
			showAddressModal(index)
			{
				this.visible = !this.visible
				this.current_role = index
			},
			hideModal()
			{
				this.visible = false
			}
		},
	}
</script>
<style lang="scss">
	@import './index.scss';
	.footer {
		height: 100rpx;
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		flex-direction: column;
		
		z-index: 20;
		.btn-group{
			margin: 0rpx auto;
			.cu-btn{
				margin:0rpx 20rpx;
				padding: 0rpx 50rpx;
				border-radius: 16rpx;
			}
		}
	}
	
	.change_detail{
		background-color: white;
		margin: 20rpx 0rpx 20rpx 0rpx;
		.title{
			padding: 40rpx 26rpx;
			font-size: $font-size-xl;
			font-weight: bold;
			.cu-capsule{
				margin-left: 20rpx;
				.cu-tag{
					height: 38rpx;
				}
			}
		}
		.avatars{
			padding: 20rpx 20rpx 50rpx 20rpx;
			.wait-join{
				background-image: url("/static/images/group/Add.png");
			}
			.margin-left{
				margin-left:20rpx;
				margin-top: 20rpx;
			}
			.cu-avatar.lg{
				width: 96rpx;
				height: 96rpx;
			}
		}
		.cu-btn{
			width: 85%;
			margin:0rpx auto;
			border-radius: 30rpx;
			align-items: center;
			font-size: 30rpx;
			letter-spacing: 6rpx;
		}
	}
	.tips-box {
			border-radius: 36rpx 36rpx 0 0;
			box-shadow: 0 0 20rpx 0 rgba($color: #333, $alpha: 0.1);
			display: flex;
			flex-direction: column;
			background-color: $bg-color-white;
			flex-shrink: 0;
			padding: 30rpx 30rpx 40rpx 30rpx;
			.tips_title{
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.tips{
				letter-spacing: 4rpx;
				text-indent: 1em;
				margin-top: 20rpx;
			}
			.status-icon {
				width: 60rpx;
				height: 60rpx;
				// margin-bottom: 30rpx;
			}
		}
	
	.desc{
		margin-top: 20rpx;
		background-color: white;
		padding-bottom: 40rpx;
		.title{
			padding: 20rpx 26rpx;
			font-size: $font-size-xl;
			font-weight: bold;
		}
		
		.role{
			width: 100%;
			position: relative;
			margin-left: 30rpx;
			.swiper {
				min-height: 300rpx;
				margin-bottom: 10rpx;
								
				.swiper-item {
						margin-top: 20rpx;
						.swiper-item-wrapper {
							display: flex;
							background-color: $bg-color-white;
							padding-right: 20rpx;
							margin-right: 40rpx;
								.kbcs{
									padding: 10rpx 16rpx;
									text-align: center;
								}
								image {
									width: 160rpx;
									border-radius: $border-radius-lg;
								}
						}
					}
			}
		}
	}
	.cu-dialog{
		max-width: 560rpx;
		.content{
			.swiper{
				height:900rpx;
				image{
					height:700rpx ;
				}
				.name{
					font-size: 34rpx;
					font-weight: bold;
					margin: 20rpx;
				}
				.cover_desc{
					font-size: 32rpx;
					padding: 0rpx 20rpx 20rpx 20rpx;
				}
			}
			
		}
	}
</style>
