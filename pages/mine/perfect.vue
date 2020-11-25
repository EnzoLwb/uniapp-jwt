<template>
	<view class="container">
		<cu-custom  ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">我玩过的本</block></cu-custom>
		<view class="main">
			<drama-list :dramas="drama" padTop=10 ></drama-list>
			<!-- 列表 end -->
			<nomore text="已经到底了" visible></nomore>
		</view>
	</view>
</template>

<script>
	import DramaList from '../drama/components/drama-list.vue'
	export default {
		components: {
			DramaList
		},
		data() {
			return {
					drama:[],
			}
		},
		async onLoad(){
			this.drama = await this.$api("drama")
		},
		methods: {
			navToDrama(){
				uni.navigateTo({
					url:"/pages/drama/list"
				})
			},
		},
	}
</script>

<style lang="scss" scoped>

	
</style>
