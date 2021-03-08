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
			</view>
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item wenyue-font" :class="index==TabCur?'text-gold cur':''" v-for="(item,index) in personNumber" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
			<scroll-view scroll-x class="nav text-center" scroll-with-animation :scroll-left="kuScrollLeft">
				<view class="cu-item wenyue-font" :class="index==kuTabCur?'text-gold cur':''" v-for="(item,index) in ['门店库','剧本总库']" :key="index" @tap="kuTypeSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<!-- 搜索结束 -->
		<!-- 列表开始 -->
		<drama-list :dramas="drama" type="admin" v-if="kuTabCur==0"></drama-list>
		<all-drama-list v-show="kuTabCur==1" :dramas="allDrama"></all-drama-list>
		<!-- 列表 end -->
		<nomore text="已经到底了" visible></nomore>
	</view>
</view>
</template>

<script>
	import nomore from '@/components/nomore/nomore.vue'
	import DramaList from '@/pages/drama/components/drama-list.vue'
	import AllDramaList from '@/pages/drama/components/all-drama-list.vue'
	export default {
		components: {
			nomore,DramaList,AllDramaList
		},
		data() {
			return {
				keyword:"",
				TabCur:0,
				scrollLeft: 0,
				typeTabCur:0,
				kuTabCur:1,
				typeScrollLeft: 0,
				kuScrollLeft: 0,
				drama:[],
				allDrama:[],
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
			this.drama = await this.$api("drama")
			this.allDrama = this.drama.splice(0,1)
			console.log(this.allDrama)
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

			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			tabTypeSelect(e){
				this.typeTabCur = e.currentTarget.dataset.id;
				this.typeScrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			kuTypeSelect(e){
				this.kuTabCur = e.currentTarget.dataset.id;
				this.kuScrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			onBackPress() {

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
