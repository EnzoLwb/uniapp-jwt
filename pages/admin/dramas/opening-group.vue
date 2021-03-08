<template>
	<view class="container">
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">开本管理</block></cu-custom>
		<view class=" shadow bg-white top_type" >
			<view class="grid col-2 padding-sm">
				<view class="padding  border-radius-left text-center light bg-black">
					<view class="text-sm text-gold text-lg">场次</view>
					<view class="margin-top-sm text-lg wenyue-font text-white ">300</view>
				</view>
				<view class="padding border-radius-right text-center light bg-black">
					<view class="text-sm text-gold text-lg">玩家数</view>
					<view class="margin-top-sm text-white wenyue-font  text-lg">15</view>
				</view>
			</view>
			<!-- 结算内容 -->
			<view class="grid col-4">
				<view class="padding-sm" @click="selectTag('drama')">
					<view class="padding  border-radius-lg text-center light bg-black  text-lg" :class="selected_tag=='drama'?'selected':'' ">
						<view class="text-gold wenyue-font">全部</view>
					</view>
				</view>
				<view class="padding-sm" @click="selectTag('recharge')">
					<view class="padding border-radius-lg text-center light bg-black  text-lg" :class="selected_tag=='recharge'?'selected':'' ">
						<view class="text-gold wenyue-font">本周</view>
					</view>
				</view>
				<view class="padding-sm" @click="selectTag('refund')">
					<view class="padding border-radius-lg text-center light bg-black  text-lg" :class="selected_tag=='refund'?'selected':'' ">
						<view class="text-gold wenyue-font">上月</view>
					</view>
				</view>
				<view class="padding-sm" @click="selectTag('refund')">
					<view class="padding border-radius-lg text-center light bg-black  text-lg" :class="selected_tag=='refund'?'selected':'' ">
						<view class="text-gold wenyue-font">本月</view>
					</view>
				</view>
				<view class="text-gold text-sm" style="padding-left: 30rpx;">
					点击进行筛选
				</view>
			</view>
			
		</view>
		<!-- 选择 -->
		<view class="header padding">
				<view class="flex justify-end top-screen">
					<view class="flex align-center " @click="changeRegisterTime()">
						时间<text class="icon cuIcon-order"  :class="registerTimeUp?'text-gold':''"></text>
					</view>
					<view class="flex align-center margin-left">
						<picker @change="PickerIdentifyChange" :value="type_index" :range="type_picker">
							<view class="picker">
								{{type_picker[type_index]}}
							</view>
						</picker>
						<text class="cuIcon-triangledownfill"></text>
					</view>
				</view>
		</view>
		<!-- 正式列表 -->
		<view class="flex text-gray margin-bottom padding-lr">
			<view class="flex-sub text-center">开本日期</view>
			<view class="flex-sub text-center">名称</view>
			<view class="flex-sub text-center">人数</view>
			<view class="flex-sub text-center">主持人</view>
			<view class="flex-sub text-center">时长</view>
			<view class="flex-sub text-center">状态</view>
		</view>
		<view class="bg-white padding finance-list">
			<view class="flex margin-bottom" v-for="(item,index) in list" :key="index">
				<view class="flex-sub text-center text-sm text-bold">{{item.date}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{item.name}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{item.number}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{item.dm}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{item.duration}}</view>
				<view class="flex-sub text-center text-sm text-bold">{{formatStatus(item.status)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
					list:[],
					selected_tag:"drama",
					registerTimeUp:true,
					type_index:0,
					type_picker: ['全部','组局未开始',"组局未结束"],
					type: {
						'wallet':'余额支付',
						'wx':'微信支付',
						'sum':"混合支付",
						},
				}
		},
		methods: {
			formatStatus(status){
				switch (status){
					case 1:
						return "组局成功";
					case 2:
						return "组局未开始";
					case 3:
						return "组局未结束";
					default:
						return "";
				}
			},
			selectTag(type){
				if(type == this.selected_tag){
					this.selected_tag='';
				}else{
					this.selected_tag= type;
				}
			},
			changeRegisterTime(){
				this.registerTimeUp = !this.registerTimeUp
			},
			PickerIdentifyChange(e){
				this.type_index = e.detail.value
				// this.changePicker() 刷新请求
			},
		},
		async onLoad(){
			this.list = await this.$api("kaiben")
		},
	}
</script>

<style lang="scss" scoped>
	.container{
		min-height: 100vh;
		.top_type{
			border-radius: 30px;margin-top: 10px;padding: 20px 0;
		}
		.finance-list{
			min-height:200px
		}
		.border-radius-left{
			border-radius: 16px 0 0 16px;
		}
		.border-radius-right{
			border-radius:  0 16px 16px 0;
		}
		.border-radius-lg{
			border-radius: 32rpx;
		}
		.selected{
			border:4px solid #DBA871;
		}
	}
</style>
