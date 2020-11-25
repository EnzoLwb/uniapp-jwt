<template>
<view>
	<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">剧本库</block></cu-custom>
	<view class="container">
		<view class="header">
			<view class="search-box">
				<view class="search-input">
					<image src="/static/images/common/search-icon.png" class="search-icon"></image>
					<input type="text" v-model="keyword" 
							@input="search"
							placeholder="搜索剧本名试试" 
							placeholder-class="placeholder">
				    <image v-if="keyword" src="/static/images/common/image-delete.png" class="close-icon" @tap="keyword=''" />
				</view>
				<view class="ml-30 wenyue-font" @tap="showDrawer">更多筛选</view>
			</view>
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item wenyue-font" :class="index==TabCur?'text-gold cur':''" v-for="(item,index) in personNumber" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="typeScrollLeft">
				<view class="cu-item wenyue-font" :class="index==typeTabCur?'text-gold cur':''" v-for="(item,index) in dramaType" :key="index" @tap="tabTypeSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<!-- 搜索结束 -->
		<!-- 列表开始 -->
		<drama-list :dramas="drama" :type="type"></drama-list>
		<!-- 列表 end -->
		<nomore text="已经到底了" visible></nomore>
	</view>
	<!-- 抽屉 （筛选列表）-->
	<uni-drawer :visible="drawerShow" mode="right" @close="hideDrawer()">
		<scroll-view scroll-y class="drawer">
			<view class="wrapper">
				<view class="drawer_content" >
					<view class="type">剧本人数</view>
					<view class="grid">
						<view class="margin-tb-sm text-center" style="margin-right: 20rpx;" v-if="index > 0"
						 v-for="(item,index) in personNumber" :key="index" >
							<button  class="cu-btnline-grey" :class="personSelected==item?'line-gold':''" @click="personSelected = item" ><b>{{item}}</b></button>
						</view>
					</view>
					<view class="type">剧本题材</view>
					<view class="grid">
						<view class="margin-tb-sm text-center"  v-for="(item,index) in dramaType" :key="index" >
							<button class="cu-btnline-grey" :class="dramaTypeSelected==item?'line-gold':''" @click="dramaTypeSelected = item" ><b>{{item}}</b></button>
						</view>
					</view>
					<view class="type">剧本风格</view>
					<view class="grid">
						<view class="margin-tb-sm text-center"  v-for="(item,index) in dramaStyle" :key="index" >
							<button class="cu-btnline-grey" :class="dramaStyleSelected==item?'line-gold':''"  @click="dramaStyleSelected = item" ><b>{{item}}</b></button>
						</view>
					</view>
					<view class="type">剧本形式</view>
					<view class="grid">
						<view class="margin-tb-sm text-center"  v-for="(item,index) in dramaForm" :key="index" >
							<button class="cu-btnline-grey" :class="dramaFormSelected==item?'line-gold':''"  @click="dramaFormSelected = item" ><b>{{item}}</b></button>
						</view>
					</view>
					<view class="type">剧本类型</view>
					<view class="grid">
						<view class="margin-tb-sm text-center"  v-for="(item,index) in dramaOpen" :key="index" >
							<button class="cu-btnline-grey" :class="dramaOpenSelected==item?'line-gold':''"  @click="dramaOpenSelected = item" ><b>{{item}}</b></button>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="close padding flex flex-wrap justify-between align-center col-2">
			<button class="cu-btn bg-grey"  hover-class="word-btn--hover" :hover-start-time="20" @click="hideDrawer"
				:hover-stay-time="70">重置</button>
			<button class="cu-btn bg-black"  hover-class="word-btn--hover" :hover-start-time="20" @click="hideDrawer"
				:hover-stay-time="70">确认</button>	
		</view>
	</uni-drawer>
</view>
</template>

<script>
	import nomore from '@/components/nomore/nomore.vue'
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	import DramaList from './components/drama-list.vue'
	export default {
		components: {
			nomore,uniDrawer,DramaList
		},
		data() {
			return {
				keyword:"",
				TabCur:0,
				scrollLeft: 0,
				typeTabCur:0,
				typeScrollLeft: 0,
				drama:[],
				drawerShow:false,
				personSelected:null,
				dramaTypeSelected:null,
				dramaFormSelected:null,
				dramaStyleSelected:null,
				dramaOpenSelected:null,
				type:null,//跳转链接 如果从组局createGroup跳转来的应该显示预约按钮
				personNumber:["全部","4人","5人","6人","7人","8人","9人","10人","10+"],
				dramaType:["全部","科幻","民国","情感","校园","古装","国外","神话","现代",],
				dramaForm:["盒装","城限","独家","实景","线上","微剧本",],
				dramaStyle:["本格","变格","微变","VR",],
				dramaOpen:["封闭式","半封闭式","开放式"],
			}
		},
		async onLoad(option){
			this.$http.post('/test2',{rttt:1111}, {custom: {auth: true},}).then(res => {
				console.log(res)
			}).catch(err => {
				console.log(err)
				if(err=="401"){this.$refs.cust.openLogInPop()}
			})
			//获取type
			if(option.type){
				console.log(option)
				this.type = option.type
			}
			this.drama = await this.$api("drama")
		},
		onShareAppMessage(res) {
		    if (res.from === 'button') {// 来自页面内分享按钮  menu 右上角
		    }
		    return {
		      title: '剧本库',
		      path: '/pages/drama/list'
		    }
		},
		methods:{
			search(){
				
			},
			hideDrawer(e) {
				this.drawerShow = false
			},
			//打开筛选抽屉
			showDrawer(){
				this.drawerShow = true
			},
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tabTypeSelect(e){
				this.typeTabCur = e.currentTarget.dataset.id;
				this.typeScrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			onBackPress() {
				if (this.drawerShow) {
					this.hideDrawer()
					return true
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	@import './list.scss';
	.close {
		padding: 20rpx 40rpx;
		button{
			font-size: 32rpx;
			color: white;
			border-radius: 14rpx;
			padding: 0rpx 40rpx;
		}
	}

	.drawer {
		display: flex;
		flex-direction: column;
		font-size: $font-size-sm;
		// color: $text-color-assist;
		min-height: 1vh;
		max-height: calc(100vh - 100rpx - 20rpx);
		
		.wrapper {
			width: 100%;
			height: 100%;
			overflow: hidden;
			padding: 10rpx 0rpx 20rpx 30rpx;
		}
	}
</style>
