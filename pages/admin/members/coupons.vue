<template>
	<view>
		<cu-custom  ref="cust" bgColor="bg-white" :isBack="true"  :isHome="false"><block slot="content">优惠券</block></cu-custom>
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
					<view class="detail" @click="giveCoupon(item)">
						<view class="left">
							<view class="top">
								满150减50
							</view>
							<view class="desc">
								部分商品可用
							</view>
							<view class="desc">
								剩余 {{item.all_count}}张
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
					<text @click="deleteCoupon(item)"  v-show="via_type=='manage'" class="cuIcon-close right-top-close"></text>
				</view>
			</view>
		</scroll-view>
		<!-- 优惠券详情弹窗 -->
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
		<!-- 优惠券详情弹窗结束 -->
		<!-- 赠予弹窗开始 -->
		<view class="cu-modal" :class="giveModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">发券</view>
					<view class="action" @tap="this.giveModel = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					将 <text class="cougive text-bold margin text-lg">{{current_coupon.name}}</text> 赠予
					<text class="user text-bold text-lg margin text-gray">{{current_name}}</text>
					<view class="cu-bar bg-white margin-top">
						<view class="action">
							赠予数量：{{giveNum}}
						</view>
						<view class="action">
							<text class="cu-tag bg-orange light cuIcon-add" @click="giveNum++"></text>
							<text class="cu-tag bg-orange light cuIcon-move" style="margin-left:80rpx" @click="jianNum()"></text>
						</view>
					</view>
				</view>

				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="submit()">确定</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 赠予弹窗结束 -->
		<!-- 新增/编辑优惠券开始 -->
		<view class="cu-modal" :class="couponModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">新增优惠券</view>
					<view class="action" @tap="this.couponModel = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding">
					<form>
						<view class="cu-form-group margin-top">
							<view class="title">名称</view>
							<input placeholder="输入标题 例如满150减50" name="input"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">描述</view>
							<input placeholder="选填 例如新春大礼包/会员用户专属" name="input"></input>
						</view>
						<radio-group class="block" @change="saleChange">
							<view class="cu-form-group">
								<view class="title">类型</view>
								<label class="radio"><radio value="1" :checked="form.type==1?true:false" />折扣</label>
								<label class="radio"><radio value="2" :checked="form.type==2?true:false"/>固定金额</label>
							</view>
						</radio-group>
						<view class="cu-form-group">
							<view class="title">折扣</view>
							<input :placeholder="sale_placeholder[form.type]" name="input"></input>
							<text class='text-black'>{{sale_icon[form.type]}}</text>
						</view>
						<view class="cu-form-group">
							<view class="title">总量</view>
							<input placeholder="输入总数" name="input" type="number"></input>
						</view>
						<view class="cu-form-group">
							<view class="title">最低金额</view>
							<input placeholder="选填" name="input"></input>
							<text class='text-black'>￥</text>
						</view>
						<view class="cu-form-group">
							<view class="title">开始日期(不填表示不限)</view>
							<picker mode="date" :value="form.begin_date" start="2021-01-01" end="2031-12-30" @change="beginDateChange">
								<view class="picker">
									{{form.begin_date}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group">
							<view class="title">结束日期(不填表示不限)</view>
							<picker mode="date" :value="form.end_date" start="2021-01-01" end="2031-12-30" @change="endDateChange">
								<view class="picker">
									{{form.end_date}}
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
		<view class="addBtn" v-show="via_type == 'manage' " @click="addCoupon()"><image src="/static/images/group/Add.png"></image></view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell.vue'
	export default {
		name: 'adminCouponList',
		components: {
			listCell
		},
		onLoad(option) {
			console.log(option)
			//给人发券
			if(option.name && option.user_id){
				this.current_name = option.name
				this.current_user_id = option.user_id
			}
		},
		props:{
			via_type:{
				type: String,
				default: '',
			},
		},
		data(){
			return{
				visible: false,
				giveModel: false,
				couponModel: false,
				padding: "20rpx",
				TabCur: 0,
				giveNum: 1,
				current_name: '',
				current_user_id: '',
				scrollLeft: 0,
				current_coupon:{},
				tarbar:["全部","减金额","打折"],
				sale_placeholder:["",'输入金额',"输入折扣数"],
				sale_icon:["","元","%"],
				form:{
					"begin_date":"2020-10-16",
					"end_date":"2020-12-16",
					"type":1,//1 比例 2 固定金额
					"name":"优惠券标题",
					"value":5,//折扣值，根据不同类型含义不同
					"min_amount":50,
					"enabled":true,
					"desc":"部分商品可用",
					"all_count":98,//此券总数
				},
				list:[
					{
						"begin_date":"2020.10.16",
						"end_date":"2020.12.16",
						"type":1,//1 比例 2 固定金额
						"name":"优惠券标题",
						"value":5,//折扣值，根据不同类型含义不同
						"min_amount":50,
						"enabled":true,
						"desc":"部分商品可用",
						"all_count":98,//此券总数
					},
				],
			}
		},
		methods:{
			deleteCoupon(item){
				console.log(item)
				uni.showModal({
				    title: '提示',
				    content: '确定删除该优惠券吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
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
	@import "./coupons.scss";
</style>