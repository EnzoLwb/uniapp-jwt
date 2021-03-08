<template>
	<view class="container">
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">资金明细</block></cu-custom>
		<view class=" shadow bg-white top_type" >
			<view class="grid col-2 padding-sm">
				<view class="padding  border-radius-left text-center light bg-gray">
					<view class="text-sm text-gray">充值收入</view>
					<view class="margin-top-sm text-lg wenyue-font text-black ">￥11964.00</view>
				</view>
				<view class="padding border-radius-right text-center light bg-gray">
					<view class="text-sm text-gray">总支出</view>
					<view class="margin-top-sm text-black wenyue-font  text-lg">￥21964.00</view>
				</view>
			</view>
			<!-- 结算内容 -->
			<view class="grid col-3">
				<view class="padding-sm" @click="selectTag('drama')">
					<view class="padding  border-radius-lg text-center light bg-gray  text-lg" :class="selected_tag=='drama'?'selected':'' ">
						<view class="text-gray wenyue-font">剧本支出</view>
						<view class="margin-top-sm wenyue-font text-black">￥964.00</view>
					</view>
				</view>
				<view class="padding-sm" @click="selectTag('recharge')">
					<view class="padding border-radius-lg text-center light bg-gray  text-lg" :class="selected_tag=='recharge'?'selected':'' ">
						<view class="text-gray wenyue-font">充值收入</view>
						<view class="margin-top-sm wenyue-font text-black ">￥11964.00</view>
					</view>
				</view>
				<view class="padding-sm" @click="selectTag('refund')">
					<view class="padding border-radius-lg text-center light bg-gray  text-lg" :class="selected_tag=='refund'?'selected':'' ">
						<view class="text-gray wenyue-font">退款</view>
						<view class="margin-top-sm text-black wenyue-font ">￥21964.00</view>
					</view>
				</view>
				<view class="padding-lr text-blue text-sm">
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
		<view class="bg-white padding-xl finance-list">
			<view class="flex justify-between margin-bottom" v-for="(item,index) in list" :key="index">
				<view>
					<view class="text-black">{{formatTitle(item)}}</view>
					<view class="text-gray text-sm padding-top">
						{{item.date}}
					</view>
				</view>
				<view class="text-right">
					<view class="text-blue wenyue-font">{{item.type == 3 ? '-':'+'}} ￥{{item.amount}}</view>
					<view class="text-grey text-sm padding-top">{{type[item.pay_type]}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
					list:[],
					selected_tag:"",
					registerTimeUp:true,
					type_index:0,
					type_picker: ['全部结算方式','余额支付',"微信支付"],
					type: {
						'wallet':'余额支付',
						'wx':'微信支付',
						'sum':"混合支付",
						},
				}
		},
		methods: {
			formatTitle(item){
				switch (item.type){
					case 1:
						return item.data.drama_name + "	 买单";
					case 2:
						return item.data.drama_name + "	 替他人买单";
					case 3:
						return "退款";
					case 4:
						return "充值";
					case 5:
						return "充值获赠";
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
			this.list = await this.$api("finance")
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
			border-radius: 30px 30px 0 0;min-height:200px
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
			border: 2px solid #53a3dc;
		}
	}
</style>
