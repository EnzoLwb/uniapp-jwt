<template>
	<view>
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">用户管理</block></cu-custom>
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
					<view class="flex align-center"  @click="changeRegisterTime()" >
						注册时间<text class="icon cuIcon-order":class="registerTimeUp?'text-gold':''"></text>
					</view>
					<view class="flex align-center" @click="changeTime()">
						活跃时间<text class="icon cuIcon-order"  :class="timeUp?'text-gold':''"></text>
					</view>
				</view>
		</view>
		<!-- list -->
		<view class="list">
			<view class="item bg-white" v-for="(item,index) in userList" :key="index">
				<view class="people flex justify-start">
					<view class="flex align-center">
						<view class="cu-avatar lg round"
						:style=" {backgroundImage:'url('+item.avatar+')' }"></view>
					</view>
					<view class="flex right-part justify-around">
						<view class="grid col-1">
							<view class="name text-bold">{{item.nickname}}({{item.user_id}})</view>
							<view class="something">余额：{{item.balance}}</view>
							<view class="something">手机号：{{item.phone}}</view>
							<view class="something">{{item.time}}</view>
						</view>
						<view class="flex align-center">
							<button class="cu-btn bg-black identify">{{type_picker[item.identify_type]}}</button>
						</view>
					</view>
				</view>
				<!-- 按钮 -->
				<view class="grid col-4">
					<button class="cu-btn bg-cyan shadow-blur" @click="navTo('/pages/admin/finance/person')">资金明细</button>
					<button class="cu-btn bg-cyan shadow-blur" @tap="showModal(item)" data-target="Modal">手动增加余额/积分</button>
					<button class="cu-btn bg-cyan shadow-blur" @click="navTo('/pages/admin/members/coupons?name='+item.nickname+'&user_id=3')">给Ta发券</button>
					<picker @change="settingIdentifyChange" :value="type_index" :range="setting_picker">
						<button class="cu-btn bg-cyan shadow-blur">设置身份</button>
					</picker>
					
				</view>
			</view>

		</view>
	</view>
	<!-- 手动增加余额 积分开始 -->
	<view class="cu-modal" :class="scoreModal ? 'show':''">
		<view class="cu-dialog">
			<view class="cu-bar bg-white justify-end">
				<view class="content">手动增加余额/积分</view>
				<view class="action" @tap="scoreModal = false">
					<text class="cuIcon-close text-red"></text>
				</view>
			</view>
			<view class="padding">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style=" {backgroundImage:'url('+userCurent.avatar+')' }"></view>
						<view class="content">
							<view class="text-grey">{{userCurent.nickname}}</view>
						</view>
					</view>
				</view>
				<view class="cu-form-group mt-30">
					<view class="title">积分</view>
					<input :placeholder="'当前积分为'+userCurent.score" name="input"></input>
					<button class='cu-btn bg-green shadow'>保存</button>
				</view>
				<view class="cu-form-group mt-30">
					<view class="title">余额</view>
					<input :placeholder="'当前余额为'+userCurent.balance" name="input"></input>
					<button class='cu-btn bg-green shadow'>保存</button>
				</view>
			</view>
		</view>
	</view>
	<!-- 手动增加余额 积分结束 -->

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
					type_picker: ['全部类型','普通玩家',"店小二","主持人",'分店长'],
					setting_picker: ['普通玩家',"店小二","主持人",'分店长'],
					type_index: 0,
					userList:[{},{},{},{}],
				}
		},
		methods: {
			showModal(e) {
				this.userCurent = e
				this.scoreModal = true
			},
			navTo(url=""){
				if(!url) uni.navigateBack()
				uni.navigateTo({
					url:url
				})
			},
			changeTime(){
				this.timeUp = !this.timeUp
			},
			changeRegisterTime(){
				this.registerTimeUp = !this.registerTimeUp
			},
			PickerIdentifyChange(e){
				console.log("PickerIdentifyChange",e.detail.value)
				this.type_index = e.detail.value
				// this.changePicker() 刷新请求
			},
			//设置身份
			settingIdentifyChange(e){
				console.log("settingIdentifyChange",e.detail.value)
			},
			openLoginPopup() {
				this.$refs['identyPopup'].open()
			},
		},
		async onLoad(){
			this.userList = await this.$api("adminUserList")
		},
		onBackPress() {
			this.$refs['identyPopup'].close()
		}
	}
</script>

<style lang="scss" scoped>
	@import "./list.scss";
</style>
