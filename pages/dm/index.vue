<template>
	<view class="">
		<cu-custom bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">主持人详情</block></cu-custom>
		<view class="container">
			<swiper class="banner-swiper" circular autoplay  :interval="5000" :duration="1000">
				<swiper-item class="banner-swiper-item" v-for="(item, index) in swipers" :key="index">
					<image :src="item" mode="aspectFill"  lazy-load style="max-height: 300px;"></image>
				</swiper-item>
			</swiper>
			<view class="main">
				<view class="userinfo">
					<image class="avatar" src="https://wx.qlogo.cn/mmopen/vi_32/vM0qx5z4BQUQU4icZNct8Oib0Q0ypMW6hdhejkBxrTzibvYHtdyaQI85hsWvL6PoA3ic3Jjwn99YdfxEj1ib7gvaJeQ/132"></image>
					<view class="username">tinypuppet</view>
					<view class="desc text-black" style="font-size: 28rpx;">入驻时间：2020年10月30日</view>
					<view class="desc">（消费后可对DM进行评分评价）</view>
				</view>
				<scroll-view scroll-x class="bg-white nav text-center">
					<view class="cu-item" :class="index==TabCur?'text-gold cur':''" v-for="(item,index) in tab" :key="index" @tap="tabSelect" :data-id="index">
						{{item}}
					</view>
				</scroll-view>
				<!-- 列表开始 -->
				<scroll-view scroll-y="true" class="drama_list">
					<drama-list :dramas="drama" v-show="TabCur == 0" padTop=0 class="dramaList"></drama-list>
					<view v-show="TabCur == 1">
						<view class="review">
							<view class="score">10.0</view>
							<view class="star">
								<view class="top text-gray">111人评价</view>
								<star-rating score='3'></star-rating>
							</view>
							<view class="submit">
								<button :disabled="false" @tap="showReviewModal()">我要评价</button><!-- 已评价 -->
							</view>
						</view>
						<view class="cu-list menu-avatar comment solids-top">
							<view class="cu-item" v-for="item in 14" :key="item">
								<view class="cu-avatar lg round" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
								<view class="content" style="padding:0rpx 10rpx 0rpx 30rpx;">
									<view class="text-grey">莫甘娜</view>
									<view class="text-black margin-top-sm  text-content text-df">
										凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。凯尔，你被自己的光芒变的盲目。
									</view>
									<view class="margin-top-sm flex justify-between">
										<view class="text-gray">2018年12月4日</view>
										<!-- <view>
											<text class="cuIcon-appreciatefill text-red"></text>
											<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
										</view> -->
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
				<!-- 列表 end -->
			</view>
			<view class="cu-modal" :class="visible==true?'show':''" @tap="hideModal" >
				<view class="cu-dialog" @tap.stop="">
					<view class="content">
						<view class="star-rating-box">
							<view class="title">评分</view>
							<star-rating @changeScore='changeScore' name='scoreNum' :score='scoreNum'></star-rating>
						</view>
						<view class="cu-form-group margin-top">
							<textarea maxlength="-1" :disabled="false" @input="textareaAInput" placeholder="请输入评价~开车稳!认真负责复盘!人帅得一匹!" />
						</view>
						<view class="cu-form-group margin-top submit">
							<button :disabled="scoreNum==0" @tap="submitReview()">提交评价</button>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import DramaList from '../drama/components/drama-list.vue'
	export default {
		components: {
			DramaList
		},
		data(){
			return{
				drama:[],
				scoreNum:0,
				review:"",//我填写的评价
				swipers: [
					"//d302.paixin.com/thumbs/14803258/175058196/staff_1024.jpg",
					"//d301.paixin.com/thumbs/1085342/55439821/staff_1024.jpg",
					"//d303.paixin.com/thumbs/15997358/199942388/staff_1024.jpg",
					"http://d302.paixin.com/thumbs/9880800/150263166/staff_1024.jpg"
				],
				tab:["Ta会开的剧本","用户评价"],
				TabCur:0,
				visible: false,
				scrollLeft: 0,
			}
		},
		async onLoad(){
			this.drama = await this.$api("drama")
		},
		methods:{
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			showReviewModal(){
				this.visible = true
			},
			hideModal() {
				this.visible = false
			},
			changeScore(param) {
				this[param.name] = param.score;
			},
			textareaAInput(e) {
				this.review = e.detail.value
			},
		}
	}
</script>

<style lang="scss" scoped>
 @import "./index.scss"
</style>
