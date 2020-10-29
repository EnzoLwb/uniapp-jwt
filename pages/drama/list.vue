<template>
	<view class="container">
		<view class="header">
			<view class="search-box">
				<view class="search-input">
					<image src="/static/images/common/search-icon.png" class="search-icon"></image>
					<input type="text" v-model="keyword" 
							placeholder="搜索剧本名试试" 
							placeholder-class="placeholder">
				    <image v-if="keyword" src="/static/images/common/image-delete.png" class="close-icon" @tap="keyword=''" />
				</view>
				<view class="ml-30" @tap="search">查询</view>
			</view>
		</view>
		<!-- 搜索结束 -->
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				keyword:"",
			}
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
		}
	}
</script>

<style scoped lang="scss">
	@import './list.scss';
</style>
