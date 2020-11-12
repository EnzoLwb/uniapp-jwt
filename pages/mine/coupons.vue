<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">优惠券</block></cu-custom>
		<!-- tab -->
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-gold cur':''" :scroll-left="scrollLeft"
				v-for="(item,index) in tarbar" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</view>
		</scroll-view>
		<scroll-view scroll-y="true" class="coupon_list">
			<view class="wrapper" v-for="item in 4" :key="item">
				<view class="coupon shadow">
					<view class="detail">
						<view class="left">
							<view class="top">
								满150减50
							</view>
							<view class="desc">
								部分商品可用
							</view>
						</view>
						<view class="right text-gold">
							50 <text>元</text>
						</view>
					</view>
					<view class="show">
						<view class="date">
							2020.10.16~2020.12.16
						</view>
						<view class="href" @tap="showModal(0)">
							查看详情<image src="/static/images/common/black_arrow_right.png" class="right-icon"></image>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 弹窗 -->
		<view class="cu-modal" :class="visible==true?'show':''" @tap="hideModal" >
			<view class="cu-dialog" @tap.stop="">
				<view class="content">
					<view class="header">
						满150减30元
					</view>
					<list-cell :padding="padding" :hover="false" last>
						<view class="row">
							<view class="label">有效期限</view>
							<view class="text">2020.10.16~2020.12.16内有效</view>
						</view>
					</list-cell>
					<list-cell :padding="padding" :hover="false" last>
						<view class="row">
							<view class="label">卡券面额</view>
							<view class="text">5</view>
						</view>
					</list-cell>
					<list-cell :padding="padding" :hover="false" last>
						<view class="row">
							<view class="label">卡卷门槛</view>
							<view class="text">50</view>
						</view>
					</list-cell>
					<list-cell :padding="padding" :hover="false" last>
						<view class="row">
							<view class="label">可用商品</view>
							<view class="text">全部商品全部商品全部商品全部商品全部商品全部商品全部商品全部商品全部商品全部商品全部商品全部商品</view>
						</view>
					</list-cell>
					<list-cell :padding="padding" :hover="false" last>
						<view class="row">
							<view class="label">可用门店</view>
							<view class="text">全部门店</view>
						</view>
					</list-cell>
					<list-cell :padding="padding" :hover="false" last>
						<view class="row">
							<view class="label">其他说明</view>
							<view class="text">其他说明其他说明其他说明其他说明其他说明</view>
						</view>
					</list-cell>
				</view>
				
			</view>
		</view>
		<!-- 弹窗店铺结束 -->
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell.vue'
	export default {
		components: {
			listCell
		},
		data(){
			return{
				visible: false,
				padding: "20rpx",
				TabCur: 0,
				scrollLeft: 0,
				tarbar:["可使用","已使用","已失效"],
				list:[
					{
						"begin_date":"2020.10.16",
						"end_date":"2020.12.16",
						"type":1,//1 满额减值 2 固定金额
						"name":"优惠券标题",
						"value":5,//折扣值，根据不同类型含义不同
						"min_amount":50,
						"enabled":true,
						"desc":"部分商品可用",
					},
				],
			}
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			showModal(index){
				this.visible = true
			},
			hideModal()
			{
				this.visible = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "./coupons.scss";
</style>