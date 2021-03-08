<template>
	<view class="container">
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">DM管理</block></cu-custom>
		<!-- 正式列表 -->
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				<text class="cuIcon-question text-red"></text>
				<text class="text-sm">辞退操作请在会员管理中操作：设置身份——选择其他身份</text>
			</view>
		</view>
		<view class="flex text-gray margin-bottom font-size-sm margin-top">
			<view class="flex-sub text-center">昵称</view>
			<view class="flex-sub text-center">上/本月开本数</view>
			<view class="flex-sub text-center">开本时长</view>
			<view class="flex-sub text-center">评分</view>
			<view class="flex-sub text-center">热度</view>
			<view class="flex-sub text-center">评论数</view>
			<view class="flex-sub text-center">状态</view>
			<view class="flex-sub text-center">操作</view>
		</view>
		<view class="bg-white finance-list">
			<view class="flex margin-bottom" v-for="(item,index) in list" :key="index">
				<view class="flex-sub text-center text-sm text-bold">{{item.nickname}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{item.kaiben_number_last_month}}/{{item.kaiben_number_current_month}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{item.kaiben_duration}}</view>
				<view class="flex-sub text-center text-sm">{{item.score}}</view>
				<view class="flex-sub text-center text-sm">{{item.hot}}</view>
				<view class="flex-sub text-center text-sm">{{item.comments_number}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{formatStatus(item.status)}}</view>
				<view class="cu-tag bg-black text-white" >{{formatOption(item.status)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
					list:[],
				}
		},
		methods: {
			formatStatus(status){
				switch (status){//1 已显示 2 不显示 3 已辞退
					case 1:
						return "已上线";
					case 2:
						return "未显示";
					case 3:
						return "已辞退";
					default:
						return "";
				}
			},
			formatOption(status){
				switch (status){//1 已显示 2 不显示 3 已辞退
					case 1:
						return "不显示";
					case 2:
						return "显示";
					case 3:
						return "重新雇佣";
					default:
						return "";
				}
			},
		},
		async onLoad(){
			this.list = await this.$api("dms")
		},
	}
</script>

<style lang="scss" scoped>
	.container{
		min-height: 100vh;
		.finance-list{
			min-height:150px;
			padding:30rpx 10rpx 0rpx 10rpx
		}

	}
</style>
