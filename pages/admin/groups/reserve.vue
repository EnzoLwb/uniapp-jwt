<template>
<view>
	<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">预约管理</block></cu-custom>
	<view class="container">
		<view class="header">
			<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item wenyue-font" :class="index==TabCur?'text-gold cur':''" v-for="(item,index) in commonDatePicker" :key="index" @tap="tabSelect" :data-id="index">
					{{item}}
				</view>
			</scroll-view>
		</view>
		<!-- 搜索结束 -->
		<!-- 列表开始 -->
		<reserve-list :groups="groups"></reserve-list>
		<!-- 列表 end -->
		<nomore text="已经到底了" visible></nomore>
	</view>
</view>
</template>

<script>
	import nomore from '@/components/nomore/nomore.vue'
	import ReserveList from '@/pages/admin/groups/reserve-list.vue'
	export default {
		components: {
			nomore,ReserveList
		},
		data() {
			return {
				TabCur:1,//有前一天
				scrollLeft: 0,
				groups:[],
				commonDatePicker:[],//上方的日期
			}
		},
		async onLoad(option){
			this.groups = await this.$api("groups")
			this.commonDatePicker = await this.$common.adminReserveDateList()
			console.log(commonDatePicker)
		},
		methods:{
			tabSelect(e){
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
		}
	}
</script>

<style scoped lang="scss">
	@import './reserve.scss';
</style>
