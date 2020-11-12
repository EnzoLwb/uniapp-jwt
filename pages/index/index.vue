<template>
	<view class="container">
		<view class="navbar">
			<button type="default" plain class="talk-btn" @tap="showAddressModal">
				<image src="/static/images/home/pos.png"></image>
				<view class="wenyue-font">柯基侦探联盟</view>
				<image src="/static/images/common/black_arrow_right.png" class="right-icon"></image>
			</button>
		</view>
		<swiper class="banner-swiper" circular :autoplay="autoplay" :interval="5000" :duration="1000">
			<swiper-item class="banner-swiper-item" v-for="(item, index) in swipers" :key="index">
				<image :src="item" mode="widthFix"  lazy-load style="max-height: 300px;"></image>
			</swiper-item>
		</swiper>
		<view class="content">
			<!-- 剧本列表 && 组局开车 begin -->
			<view class="section-1">
				<navigator class="item" open-type="navigate" url="/pages/drama/list" hover-class="none">
					<image src="/static/images/home/book.png" lazy-load mode="widthFix"></image>
					<view class="wenyue-font">剧本列表</view>
					<view class="text-color-assist">开始受理立案</view>
				</navigator>
				<navigator class="item" open-type="navigate" url="/pages/group/list" hover-class="none">
					<image src="/static/images/home/chedui.png" mode="widthFix"></image>
					<view class="wenyue-font">组局开车</view>
					<view class="text-color-assist">就差你啦~大侦探</view>
				</navigator>
			</view>
			<!-- 剧本列表 && 组局开车 end -->
			<!-- 新到剧本的公告 begin -->
			<view class="xinqiubobao">
				<view class="title" style="display: flex;padding-left: 15rpx;">
					<span class="wenyue-font">最新案件</span>
					<view>
						<view class="cu-tag badge">New!</view>
					</view>
				</view>
				<swiper class="swiper" next-margin="80rpx" :autoplay="false" :interval="5000" :duration="500" circular>
					<swiper-item class="swiper-item" v-for="(item, index) in boardcast" :key="index">
						<view class="swiper-item-wrapper">
							<image :src="item.coverPic" lazy-load class="img"></image>
							<view class="desc" style="width: 600rpx;">
								<view class="title wenyue-font">{{ item.title }}</view>
								<view class="desc" >{{ item.subtitle }}</view>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- 新到剧本的公告 end -->
			<!-- DM推荐剧本 begin -->
			<view class="recommend">
				<view class="title" style="display: flex;padding-left: 15rpx;">
					<span class="wenyue-font">主持人推荐</span>
					<view>
						<view class="cu-tag badge">Hot!</view>
					</view>
				</view>
				<swiper class="swiper" next-margin="20rpx" :autoplay="autoplay" :interval="5000" :duration="500" circular>
					<swiper-item class="swiper-item" v-for="(item, index) in hot_list" :key="index">
						<view class="swiper-item-wrapper cu-card case" >
							<navigator class="cu-item shadow" url="/pages/drama/index" hover-class="none">
								<view class="image">
									<image :src="item.coverPic" lazy-load
									 ></image>
									<view class="cu-tag bg-blue">{{item.title}}</view>
									<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{item.recommend_reason}}</text></view>
								</view>
							</navigator>							
						</view>
					</swiper-item>
				</swiper>
			</view>
			<!-- DM推荐剧本 end -->
			<!-- 本店DM begin -->
			<view class="hostess">
				<view class="title" style="display: flex;padding-left: 15rpx;">
					<span class="wenyue-font">本店主持人</span>
					<view>
						<view class="cu-tag badge">DM!</view>
					</view>
					<image src="/static/images/common/black_arrow_right.png" class="right-icon"></image>
				</view>
				<swiper class="swiper" next-margin="40rpx" :autoplay="autoplay" :interval="5000" :duration="500">
					<swiper-item class="swiper-item" v-for="(item, index) in dm_list" :key="index">
						<navigator class="swiper-item-wrapper cu-card case" hover-class="none" url="/pages/dm/index">
							<view class="cu-item shadow">
								<view class="image">
									<image  class="image" :src="item.coverPic" ></image>
									<view class="cu-bar bg-shadeBottom"> 
										<image src="/static/images/home/fire.png" class="hot"></image>
										<span>{{item.number}}</span>
									</view>
								</view>
								<view class="neutra-font kbcs">开本次数：34</view>
							</view>
						</navigator>
					</swiper-item>
				</swiper>
			</view>
			<!-- 本店DM end -->
		</view>
		<!-- 弹窗 -->
		<view class="cu-modal" :class="visible==true?'show':''" @tap="hideModal" >
			<view class="cu-dialog" @tap.stop="">
				<view class="content"  style="background-color: white;">
					<list-cell v-for="(address, index) in addresses" :key="index" :line-left="false">
						<view class="address">
							<view class="info">
								<view class="user-row wenyue-font">
									{{ `${address.name}` }}
								</view>
								<view class="address-row">
									<view class="is-default">{{address.union}}</view>
									<view class="address neutra-font">{{ `${address.address}` }}</view>
								</view>
							</view>
							<image v-if="address.status" src="/static/images/home/pos.png"  class="edit-btn"></image>
							<image v-else src="/static/images/home/change.png"  class="edit-btn"></image>
						</view>
					</list-cell>
				</view>
			</view>
		</view>
		<!-- 弹窗店铺结束 -->
		<!-- 加载 -->
		<load-modal :show="loadModal"></load-modal>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell.vue'
	export default {
		components: {
			listCell
		},
		data() {
			return {
				addresses: [
					{
						name:"柯基推理馆南开分店",
						address:"龙德里22-10-1001",
						union:"南开店",
						id:"DD11LJH391",
						status:true
					},
					{
						name:"柯基推理馆红桥分店",
						address:"千禧园22-10-1001",
						union:"红桥店",
						id:"DD11LJH391",
						status:false
					},
					{
						name:"柯基推理馆和平分店",
						address:"福利中心12-10-1001",
						union:"和平店",
						id:"DD11LJH391",
						status:false
					},
				],
				boardcast: [],
				hot_list:[],
				autoplay:false,
				loadModal:true,
				visible:false,
				dm_list:[
					{
						coverPic:"//d303.paixin.com/thumbs/15997358/199942388/staff_1024.jpg",
						number:134,
					},
					{
						coverPic:"//d301.paixin.com/thumbs/1085342/55439821/staff_1024.jpg",
						number:1134,
					},
					{
						coverPic:"//d302.paixin.com/thumbs/14803258/175058196/staff_1024.jpg",
						number:31,
					},
				],
				swipers: [
					"//d303.paixin.com/thumbs/13193658/265378856/staff_1024.jpg",
					"//d301.paixin.com/thumbs/1729220/57714753/staff_1024.jpg",
					"//d302.paixin.com/thumbs/9880800/150262624/staff_1024.jpg",
					"http://d302.paixin.com/thumbs/9880800/150263166/staff_1024.jpg",
					"http://d103.paixin.com/4218696/27071/i/380/depositphotos_270712738-stock-photo-celebrating-meeting-diverse-friends-drinking.jpg",
					"//d102.paixin.com/3258807/13652/i/380/depositphotos_136521122-stock-photo-attractive-bearded-man-showing-something.jpg",
				]
			}
		},
		computed: {
			reverseSum() {
					// return this.boardcast.reverse();
			}
		},
		async onLoad() {
			this.boardcast = await this.$api('boardcast')
			this.hot_list =  await this.$api('hotList')
			this.loadModal = false;
			/* setTimeout(() => {
				this.loadModal = false;
			}, 3000) */
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮  menu 右上角
		    }
		    return {
		      title: '剧本杀',
		      path: '/pages/index/index'
		    }
		},
		methods: {
			showAddressModal()
			{
				this.visible = !this.visible
			},
			hideModal()
			{
				this.visible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import './index.scss';
	.badge {
		color: #FFFFFF;
		font-size: 20rpx;
		line-height: 1rem;
		padding: 10rpx 16rpx 10rpx 10rpx;
		border-radius: 50rem 50rem 50rem 0;
		font-family: 'neutra';
		position: relative;
		margin-top: -10rpx;
		margin-left: 6rpx;
		&.danger {
			background-color: #d36661;
		}
		
		&.primary {
			background-color: $color-primary;
		}
	}
</style>
