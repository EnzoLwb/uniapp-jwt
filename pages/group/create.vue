<template>
	<view>
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">发起组局</block></cu-custom>
		<!-- 剧本信息 -->
		<drama-top></drama-top>
		<!-- 店铺地点 电话 导航-->
		<shop-detail></shop-detail>
		<!-- 调整按钮 -->
		<view class="change_detail">
			<view class="title"><text class="cuIcon-titles text-gold">具体信息</text></view>
			<view class="change_btn flex">
				<button class="cu-btn bg-black text-gold" @tap="openLoginPopup">
					{{reserve.date}} {{reserve.time}} {{reserve.person_number}}人
				</button>
			</view>
			<view class="title"><text class="cuIcon-titles text-gold">填写组局备注(可选)</text></view>
			<view class="cu-form-group">
				<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput"
				placeholder-style="color:#8a8a8a"
				 :placeholder="shop.placeholder"></textarea>
			</view>
		</view>
		<!-- 温馨提示 -->
		<view class="tips-box">
			<view class="tips_title">
				<view>
					<image src="/static/images/group/tips.png" class="status-icon"/>
				</view>
				<view class="text-color-primary font-size-lg font-weight-bold ml-10">温馨提示</view>
			</view>
			<view class="tips text-color-assist font-size-base">{{shop.tips}}</view>
		</view>
		<!-- 底部按钮 -->
		<view class="footer">
				<view class="bottom">
					<view class="font-size-lg font-weight-bold follow">
						<view><image src="/static/images/drama/follow.png" /></view>
					</view>
					<button type="primary" @click="subReserve()">确认预约</button>
				</view>
		</view>
		<!-- 下部弹出框调整信息 -->
		<reserve-popup ref="reservePopup" @reserveSubmit="reserveSubmit" :drama="drama"></reserve-popup>
	</view>

</template>

<script>
	import DramaTop from '../drama/components/drama-index.vue'
	import ShopDetail from './components/shop-detail.vue'
	import reservePopup from './components/reserve-popup.vue'
	export default{
		components: {
			DramaTop,reservePopup,ShopDetail
		},
		onLoad(option) {
			console.log(option.drama_id)
			
		},
		data(){
			return {
				reserve:{
					drama_id:11,
					date:this.$common.originReserveTime(),//默认是转天 与子组件统一
					time:"12:00",
					person_number:4,
				},
				shop:{
					address:"天津市南开区西湖道龙井里B区22-2-102(麦当劳旁入口进入)",
					name:"麦侦探事务所",
					phone:"114",
					latitude:39.14111,//Number Not String!
					longitude:117.00739,
					placeholder:"迟到者直接拉入黑名单!",
					tips:"感谢您对本店的支持,预约之后记得马上分享给小伙伴哦! 让Ta们立即加入车队~记得准时参加。如临近修改信息,记得致电门店哦!",
				},
			}
		},
		methods:{
			//子组件按钮提交后
			reserveSubmit(data)
			{
				console.log("reserveSubmit")
				console.log(data)
				this.reserve.date = data.Date + " " + data.weekend
				this.reserve.time = data.Time
				this.reserve.person_number = data.NumberPerson
				this.reserve.dateOrigin = data.Date
			},
			//确认预约
			subReserve(){
				uni.showModal({
				    title: '提示',
				    content: '确认提交预约信息？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			openLoginPopup() {
				this.$refs['reservePopup'].open()
			},

		},
	}
</script>
<style lang="scss">
	@import './create.scss';

</style>
