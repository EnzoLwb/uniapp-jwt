<template>
	<uni-popup ref="popup" type="bottom" @change="change">
		<view class="popup-content flex flex-column">
			<view class="d-flex justify-content-end">
				<image src="/static/images/common/clousex-big.png" class="close_btn" @tap="close"></image>
			</view>
			<view class="reserve">
				<view><text class="cuIcon-titles reserve-title text-black"><text class="wenyue-font">人数:</text></text></view>
				<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeftNumber">
					<view class="cu-item " :class="index==NumberCur?'text-gold cur':''" v-for="(item,index) in drama.personNumber" 
					:key="index" @tap="tabSelect" :data-id="index">
						{{drama.personNumber-index}}
					</view>
				</scroll-view>
				
				<view class="cu-form-group">
					<view class="title"> 
						<text class="cuIcon-titles reserve-title text-black">
							<text class="wenyue-font">时间:</text>
						</text>
					</view>
					<picker mode="time" :value="time" start="00:00" end="23:00" @change="TimeChange">
						<view class="picker">
							{{time}}
						</view>
					</picker>
				</view>
				
				<view class="cu-form-group">
					<view class="title">
						<text class="cuIcon-titles reserve-title text-black">
							<text class="wenyue-font">日期:</text>
						</text>
					</view>
					<picker @change="DatePickerChange" :value="DateCur" :range="datePicker">
						<view class="picker">
							{{datePicker[DateCur]}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">
						<text class="cuIcon-titles reserve-title text-black">
							<text class="wenyue-font">是否支持反串:</text>
						</text>
					</view>
					<switch class="yellow" @change="SwitchFanChuan()" :class="fanchuan?'checked':''" :checked="fanchuan?true:false"></switch>
				</view>
			</view>
			<view class="btn">
				<button type="primary" class="w-40 cancel font-size-lg" >取消</button>
				<button type="primary" class="w-40 sure font-size-lg" @click="submit" >确定</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: 'reservePopup',
		components: {
			uniPopup
		},
		created() {
			var commonDatePicker = this.$common.latestDay()
			console.log(commonDatePicker)
			this.datePicker = commonDatePicker.multiShow
			this.dateArr = commonDatePicker.date
			this.weekend = commonDatePicker.weekend
			
		},
		data(){
			return{
				fanchuan:true,
				time:"12:00",
				datePicker:[],
				NumberCur:0,
				DateCur:1,
				TimeCur:0,
				scrollLeftNumber:0,
				weekend:[],//周几数组
				dateArr:[],//日期数组 直接返回给父组件
			}
		},
		onLoad() {
			
		},
		props: {
			drama:{
				type: Object,
				default: [],
			},
		},
		methods: {
			open() {
				this.$refs['popup'].open()
			},
			SwitchFanChuan(e) {
				this.fanchuan = e.detail.value
			},
			DatePickerChange(e) {
				this.DateCur = e.detail.value
			},
			TimeChange(e) {
				this.time = e.detail.value
			},
			DateChange(e) {
				this.date = e.detail.value
			},
			tabSelect(e){
				this.NumberCur = e.target.dataset.id
			},
			close() {
				this.$refs['popup'].close()
			},
			change({show}) {
				this.$emit('change', show)
			},
			submit() {
				var dateCur = this.DateCur > -1 ? this.DateCur:0;
				let data = {
					NumberPerson:this.drama.personNumber - this.NumberCur, //
					Date:this.dateArr[dateCur],
					Time:this.time,
					weekend:this.weekend[dateCur], //周几数组
					
				}
				this.$emit('reserveSubmit', data)
				this.$refs['popup'].close()
			},
		}
	}
</script>

<style lang="scss" scoped>
	.popup-content {
		background-color: #FFFFFF;
		border-radius: 24rpx 24rpx 0 0;
		height: 50vh;
		padding: 50rpx 40rpx;
					position: relative;
		.reserve{
			width: 100%;
			.cu-form-group{
				padding: 10rpx 0rpx;
				picker .picker{
					font-size: 30rpx;
				}
			}
			.cu-form-group+.cu-form-group{
				border-top: none;
			}
			.reserve-title{
				font-size: $font-size-xl ;
			}
			.nav{
				margin: 30rpx 0rpx 0rpx 0rpx;
			}
			.nav .cu-item{
				height: 70rpx;
				line-height: 70rpx;
				font-size: $font-size-medium;
				margin: 0 14rpx;
				padding: 0rpx 40rpx;
				background-color: #e6e6e6;
				color:black;
				 white-space: nowrap;
			}
			.nav .cu-item.cur{
				background-color: white;
				border: 1px solid #DBA871;
				color:#DBA871;
			}

		}
		.btn{
			position: fixed;
			width: 100%;
			bottom: 30rpx;
			display: flex;
			.cancel{
				background-color: #f3ca7e;
			}
			.sure{
				margin-left: 70rpx;
			}
		}
	}
	
	.close_btn {
		width: 30rpx;
		height: 30rpx;
	}
</style>
