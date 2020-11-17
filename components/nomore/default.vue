<template>
	<view class="no-group flex justify-center flex-direction">
		<view class="">
			<image src="/static/images/group/no_more.png"></image>
		</view>
		<view class="tips wenyue-font">
			{{textShow}}
		</view>
		<button @click="navTo()">{{btnShow}}</button>
	</view>
</template>

<script>
export default {
	name: 'defaultQue',
	props: {
		//显示的缺省文字
		textShow: {
			type: String,
			default: "暂时没有数据哦~"
		},
		//当前页面背景颜色
		btnShow: {
			type: String,
			default: '去看看剧本吧'
		},
		//是否以圆点代替 "没有更多了"
		navToUrl: {
			type: String,
			default: "/pages/drama/list"
		},
	},
	methods:{
		navTo(){
			uni.navigateTo({
				url:this.navToUrl
			})
		},
	},
	data() {
		return {
			dotText: '●'
		};
	}
};
</script>

<style lang="scss" scoped>
	.no-group{
		margin-bottom: 40rpx;
		image{
			width:800rpx;
			height:480rpx;
		}
		.tips{
			text-align: center;font-size: 30rpx;margin-bottom: 40rpx;
		}
		button{
			font-weight: bold;margin: 0rpx auto;width: 50%;background-color: #DBA871;color:white;font-size: 30rpx;border-radius: 6rpx;
		}
	}
</style>
