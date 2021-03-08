<template>
	<view>
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">充值记录</block></cu-custom>
		<view class="">
			<view class="header">
				<view class="search-box">
					<view class="search-input">
						<image src="/static/images/common/search-icon.png" class="search-icon"></image>
						<input type="text" v-model="keyword" 
								placeholder="输入玩家ID或者昵称进行搜索吧~	" 
								placeholder-class="placeholder">
							<image v-if="keyword" src="/static/images/common/image-delete.png" class="close-icon" @tap="keyword=''" />
					</view>
				  <view class="flex align-center search-btn">
				  	<button class="cu-btn bg-gold shadow-blur" style="border-radius:4000rpx;height: 50rpx;">搜索</button>
				  </view>
				</view>
				<view class="flex justify-between bg-white top-screen">
					<view class="flex align-center">
						<picker @change="PickerIdentifyChange" :value="type_index" :range="type_picker">
							<view class="picker">
								{{type_picker[type_index]}}
							</view>
						</picker>
						<text class="cuIcon-triangledownfill"></text>
					</view>
					<view class="flex align-center" @click="changeTime()">
						充值时间<text class="icon cuIcon-order"  :class="timeUp?'text-gold':''"></text>
					</view>
				</view>
		</view>
		<!-- list -->
		<view class="list">
			<view class="item bg-white" style="border-radius:0rpx;margin:20rpx;padding:20rpx 20rpx 20rpx 0"
			v-for="(item,index) in userList" :key="index">
				<view class="people flex justify-start">
					<view class="flex align-center">
						<view class="cu-avatar lg round"
						:style=" {backgroundImage:'url('+item.avatar+')' }"></view>
					</view>
					<view class="flex right-part justify-around" style="margin-left: 20rpx;">
						<view class="grid col-1">
							<view class="name text-bold">{{item.nickname}}({{item.user_id}})</view>
							<view class="something">当前余额：{{item.balance}}</view>
							<view class="something">{{item.time}} </view>
							<view class="something text-bold" v-show="index%2==0">满150送50 </view>
						</view>
						<view class="grid col-1" style="text-align: right;">
							<view class="something">实际支付 <text class="text-orange">99</text> 元</view>
							<view class="something">充值前：99元</view>
						</view>
					</view>
				</view>
			</view>

		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
					timeUp:true,
					keyword:"",
					scoreModal:false,
					userCurent:{},
					registerTimeUp:true,
					type_picker: ['全部角色','普通玩家',"店小二","主持人",'分店长'],
					setting_picker: ['普通玩家',"店小二","主持人",'分店长'],
					type_index: 0,
					userList:[{},{},{},{}],
				}
		},
		methods: {
			navTo(url=""){
				if(!url) uni.navigateBack()
				uni.navigateTo({
					url:url
				})
			},
			changeTime(){
				this.timeUp = !this.timeUp
			},
			PickerIdentifyChange(e){
				console.log("PickerIdentifyChange1",e.detail.value)
				this.type_index = e.detail.value
				// this.changePicker() 刷新请求
			},
		},
		async onLoad(){
			this.userList = await this.$api("adminUserList")
		},

	}
</script>

<style lang="scss" scoped>
	@import "../members/list.scss";
</style>
