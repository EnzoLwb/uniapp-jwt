<template>
	<view>
		<cu-custom  ref="cust" bgColor="bg-white" :isBack="true"  :isHome="false"><block slot="content">充值管理</block></cu-custom>
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
			<view class="wrapper" v-for="(item,index) in list" :key="index">
				<view class="coupon shadow">
					<view class="detail">
						<view class="left">
							<view class="top">
								{{item.title}}
							</view>
							<view class="desc">
								{{item.tips}}
							</view>
							<view class="desc">
								{{item.limit_number > 0 ? ('限制'+item.limit_number+'次') : '不限制次数' }}  
							</view>
						</view>
						<view class="right text-gold">
							<view v-if="item.type == 1">
								{{item.baseline ? ('满'+item.baseline + '元'):''}}返额{{item.grant_fee}}元
							</view>
							<view v-else-if="item.type == 0">
								直充{{item.baseline}}元
							</view>
							<view v-else-if="item.type == 2" @click="showCoupons(item.coupons)">
								满{{item.baseline}}元 <text class="text-blue" style="text-decoration:underline">给券</text> 
							</view>
							<view  class="margin-top text-right">
								<text class="cuIcon-edit text-sm text-blue">编辑</text>
							</view>
						</view>
					</view>
					<view class="show">
						<view class="date">
							{{item.not_before? item.not_before:'不限'}}~{{item.not_after? item.not_after: '不限'}}
						</view>
						<view class="date text-orange text-bold">
							{{item.first_recharge?'仅限首充':''}}
						</view>
					</view>
					<text @click="deleteRecharge(123)" class="cuIcon-close right-top-close"></text>
				</view>
			</view>
		</scroll-view>
		<!-- 新增/编辑充值开始 -->
		<view class="cu-modal" :class="couponModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">新增充值活动</view>
					<view class="action" @tap="this.couponModel = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding">
					<form>
						<view class="cu-form-group margin-top">
							<view class="title">名称</view>
							<input placeholder="输入标题 例如满20元送10元" v-model="form.title" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">描述</view>
							<input placeholder="选填 例如新春大礼包/新用户专属"  v-model="form.tips" name="input"></input>
						</view>
						<radio-group class="block" @change="saleChange">
							<view class="cu-form-group">
								<view class="title">类型</view>
								<label class="radio"><radio value="0" :checked="form.type==0?true:false" />无活动/直充</label>
								<label class="radio"><radio value="1" :checked="form.type==1?true:false" />返额</label>
								<label class="radio"><radio value="2" :checked="form.type==2?true:false"/>送券</label>
							</view>
						</radio-group>
						<view class="cu-form-group">
							<view class="title">充值金额</view>
							<input placeholder="必填" name="input"  v-model="form.baseline"></input>
							<text class='text-black'>￥</text>
						</view>
						<view class="cu-form-group" v-if="form.type==1">
							<view class="title">返现金额</view>
							<input placeholder="输入" name="input"  v-model="form.grant_fee"></input>
						</view>
						<view class="cu-form-group" v-if="form.type==2">
							<view class="title">赠券</view>
							<input placeholder="输入" name="input" v-if="form.coupons.length<1" @focus="selectGiveCouponList(form.coupons)"></input>
							<view v-else @click="selectGiveCouponList(form.coupons)">
								<view class="cu-tag sm line-blue" v-for="item in 4" :key="item">
									满50送1元
								</view>
							</view>

						</view>
						<view class="cu-form-group">
							<view class="title">限制参与次数</view>
							<input placeholder="默认为0 表示不限制" name="input" type="number"  v-model="form.limit_number"></input>
						
						</view>
						<view class="cu-form-group">
							<view class="title">是否是首充活动(仅限第一次充值)</view>
							<switch @change="SwitchEnable" :class="form.first_recharge?'checked':''" :checked="form.first_recharge?true:false"></switch>
						</view>
						<view class="cu-form-group">
							<view class="title">开始日期(不填表示不限)</view>
							<picker mode="date" :value="form.not_before" start="2021-01-01" end="2031-12-30" @change="beginDateChange">
								<view class="picker">
									{{form.not_before}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">结束日期(不填表示不限)</view>
							<picker mode="date" :value="form.not_after" start="2021-01-01" end="2031-12-30" @change="endDateChange">
								<view class="picker">
									{{form.not_after}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group margin-bottom">
							<view class="title">启用</view>
							<switch @change="SwitchEnable" :class="form.enabled?'checked':''" :checked="form.enabled?true:false"></switch>
						</view>
						
					</form>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="submit()">确定</button>
					</view>
				</view>
				</view>
			</view>
		</view>
		<!-- 显示给的优惠券 -->
		<view class="cu-modal" :class="showCouponModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">赠送的优惠券列表</view>
					<view class="action" @tap="this.showCouponModel = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 860rpx;">
					<view class="wrapper" v-for="(item,index) in list" :key="index">
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
							</view>
							<text @click="deleteCoupon(item)"  class="cuIcon-close right-top-close"></text>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 从优惠券列表选择优惠券赠予 -->
		<view class="cu-modal" :class="selectCouponModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">充值赠送的优惠券</view>
					<view class="action" @tap="this.selectCouponModel = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 860rpx;">
					<view class="wrapper" v-for="(item,index) in list" :key="index">
						<view class="coupon shadow " :class="item.enable?'select-border':''">
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
							</view>
						
						</view>
					</view>
				</scroll-view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="sureCoupons()">确定</button>
					</view>
				</view>
			</view>
		</view>
		
		<view class="addBtn" @click="addCoupon()"><image src="/static/images/group/Add.png"></image></view>
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
				giveModel: false,
				showCouponModel: false,//充值给的优惠券详情
				selectCouponModel: false,
				couponModel: false,
				padding: "20rpx",
				TabCur: 0,
				giveNum: 1,
				current_name: '',
				current_user_id: '',
				scrollLeft: 0,
				current_coupon:{},
				tarbar:["全部","赠金额","赠券"],
				current_give_coupons:[],
				sale_icon:["","元","%"],
				form:	{
					"id": 52,
					"first_recharge": false,//是否是首充活动
					"title": "满0.02送10元",
					"tips": "充值即送不限次数",//描述
					"type": 1,// 0 无活动 1 返现 2 给券
					"baseline": 1.00,//'底线 最低充多少'
					"limit_number": 3,//限制次数
					"grant_fee": null,//返现金额
					"coupons": [1],
					"enable": true,
					"not_before":"2020-12-08 09:08:18",
					"not_after":"2020-12-18 09:08:18",
			 },
				list:[],
			}
		},
		async onLoad(){
			this.list = await this.$api("recharge")
		},
		methods:{
			//新增或者编辑活动时 选择/展示优惠券列表
			selectGiveCouponList(coupons){
				this.selectCouponModel = true;
				//默认是展示所有优惠券 如果有coupons 则会显示已选择
			},
			deleteRecharge(item){
				console.log(item)
				uni.showModal({
				    title: '提示',
				    content: '确定删除该充值活动吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			sureCoupons(){
				
			},
			deleteCoupon(item){
				console.log(item)
				uni.showModal({
				    title: '提示',
				    content: '确定删除该优惠券吗 ？（已发放的优惠券不会退回）',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			showCoupons(ids){
				console.log(ids)
				this.showCouponModel = true
			},
			SwitchEnable(e){
				this.form.enabled = e.detail.value
			},
			beginDateChange(e){
				this.form.begin_date = e.detail.value
			},
			endDateChange(e){
				this.form.end_date = e.detail.value
			},
			saleChange(e){
				this.form.type = e.detail.value
			},
			addCoupon(){
				this.couponModel = true;
			},
			jianNum()
			{
				if((this.giveNum -1) >0 )this.giveNum --;
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			showModal(index){
				this.visible = true
			},
			giveCoupon(item){
				if(this.via_type=='manage') return;//跳转到编辑
				this.giveModel = true
				console.log(item)
				this.current_coupon = item
			},
			//提交赠予结果
			submit(){
				console.log('确认赠予')
				this.giveNum = 1
			},
			hideModal()
			{
				this.visible = false
			}
		},
	}
</script>

<style lang="scss" scoped>
	@import "./recharge.scss";
	.select-border{
		border:2px dashed red;
	}
</style>