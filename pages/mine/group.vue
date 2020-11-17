<template>
	<view class="container">
		<cu-custom bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">我的组局</block></cu-custom>
		<view class="main">
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="item.tag==TabCur?'text-gold cur':''" v-for="(item,index) in tab" :key="index" @tap="tabSelect" :data-id="item.tag">
						{{item.name}}
					</view>
				</view>
			</scroll-view>
			<!-- 列表开始 -->
			<scroll-view scroll-y="true" class="drama_list">
				<view class="list">
					<navigator class="product" v-for="(item, index) in drama[TabCur]"  :key="index" 
					 hover-class="none" :url="'/pages/group/index?reserve_id='+item.reserve_id">
						<view class="cu-card article">
							<view class="cu-item shadow">
								<view class="content" >
									<view class="img_tag">
										<image class="image" :src="item.cover" mode="aspectFill" lazy-load></image>
									</view>
									<view class="desc" style="position: relative;">
										<view class="text-content wenyue-font">{{item.name}}</view>
										<view class="detail">
											<text>创建时间</text>：{{item.created_at}}
										</view>
										<view class="detail">
											<text>开始时间</text>：{{item.begin_at}}
										</view>
										<view class="detail">
											<text>人数</text>：{{item.person_number}}
										</view>
										<view class="detail">
											<text>状态</text>：等待中
										</view>
									</view>
								</view>
							</view>
						</view>
					</navigator>
					<!-- 缺省图 -->
					<default-que v-if="drama[TabCur].length==0"></default-que>
				</view>
				
			</scroll-view>
			<!-- 列表 end -->
		</view>
	</view>
</template>

<script>
	import listCell from '@/components/list-cell/list-cell.vue'
	import modal from '@/components/modal/modal.vue'
	
	export default {
		components: {
			listCell,
			modal
		},
		data() {
			return {
				drama:{},
				tab:[//我的组局 全部 组局中 已成局 已解散
					{
						name:"全部",
						tag:"all"
					},
					{
						name:"组局中",
						tag:"ing"
					},
					{
						name:"已成局",
						tag:"finish"
					},
					{
						name:"已解散",
						tag:"exit"
					},
				],
				TabCur:"all",
				visible: false,
				scrollLeft: 0,
			}
		},
		async onLoad(){
			this.drama = await this.$api("myGroup")
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
			},
			navToDrama(){
				uni.navigateTo({
					url:"/pages/drama/list"
				})
			},
		},
	}
</script>

<style lang="scss" scoped>
	.main {
		z-index: 10;
		flex: 1;
		display: flex;
		flex-direction: column;
		.nav .cu-item.cur {
			border-bottom: 4rpx solid;
			font-size: 28rpx;
			font-weight: bold;
		}
		.drama_list{
			background-color: #FFFFFF;
			height:  calc(100vh - 80rpx - 120rpx );
			.list {
					.cu-card{	
						.cu-item{
							  margin: 10rpx 20rpx;
								padding-bottom: 20rpx;
							.content{
								padding: 30rpx 10rpx 0rpx 20rpx;
								.img_tag{
									position: relative;    
									overflow: hidden;
									margin-right:30rpx;
									.image{
										width: 200rpx;
										height: 260rpx;
										/* margin-right: 30rpx; */
										-webkit-border-radius: 3px;
										border-radius: $border-radius-lg;
									}
								}
								.desc{
									.cu-tag.sm{
										padding: 20rpx 12rpx;
										height: 40rpx;
										font-size: $font-size-sm;
										margin-bottom: 10rpx;
										border:1px solid #8799a3;
									}
									.cu-tag+.cu-tag {
									    margin-right: 10rpx;
									    margin-left: 0rpx;
									}
									.cu-tag:first-child {
									    margin-right: 10rpx;
									}
									.detail{
											color: grey;
											font-size: $font-size-base;
											font-family: 'neutra';
											text{
												color:#515151;
												font-family: 'wenyue';
											}
										}
										.text-content{
											height:1.2em;
											line-height: 1.2;
											font-size: $font-size-extra-lg;
											color: $text-color-base;
											max-width: 90%;
											overflow: hidden;
											white-space: nowrap;
											text-overflow: ellipsis;
										}
									}
								
								
							}
						}
					}
						
				}	
			
		}
		
	}
	
</style>
