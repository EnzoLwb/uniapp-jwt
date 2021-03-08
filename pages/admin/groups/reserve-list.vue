<template>
	<view class="list">
		<view class="product" v-for="(item, index) in groups" :key="index" >
			<view class="cu-card article">
					<navigator class="cu-item shadow"  :url="'/pages/group/index?id='+item.drama_id"
					hover-stop-propagation>
						<view class="content" >
							<view class="img_tag">
								<image class="image" :src="item.cover" mode="aspectFill" lazy-load></image>
							</view>
							<view class="desc" style="position: relative;">
								<view class="text-content wenyue-font">{{item.name}}</view>
								<view class="detail">
									预约时间：<text class="text-black">2020-11-30(周一) 18:30</text>
								</view>
								<view class="detail">
									人数：<text class="text-black">5</text>  <text class="margin-left">门店：</text><text class="text-black">一店</text> 
								</view>
								<view class="detail">
									<text class="cu-tag round sm bg-gold text-white">开启阅读</text> DM：<text class="text-black">xixaoxie</text>
								</view>
								<view class="grid">
									<view class="cu-tag sm bg-black text-white" @click.stop="playerDetail()">玩家</view>
									<view class="cu-tag sm bg-black text-white" @click.stop="broadcast()">发起收款</view>
									<view class="cu-tag sm bg-black text-white" @click.stop="deleteReserve()">删除</view>
									<view class="cu-tag sm bg-black text-white"  @click.stop="disDM()">
									<picker @change="DMChange" ref="dmPicker" :value="distribution_dM" :range="dm_picker">
										分配DM
									</picker>
									</view>
								</view>
								<view class="flex ">
									<view class="cu-progress round sm striped active">
										<view class="bg-green" :style="[{ width:'60%'}]"></view>
									</view>
									<text class="margin-left">3/5</text>
								</view>
							</view>
						</view>
					</navigator>
			</view>
		</view>
		<!-- 玩家列表 -->
		<player-popup ref="playerPopup" :group="drama_id"></player-popup>
	</view>
</template>

<script>
	import playerPopup from '@/pages/group/components/player-popup.vue'
	export default {
		name: "ReserveList",
		components: {
			playerPopup
		},
		data(){
				return{
					all:[],
					distribution_dM:0,
					drama_id:1,
					dm_picker:["小A","小B","小C"],
				}
		},
		props: {
			groups: {
				type: Array,
				default: []
			},
		},
		methods: {
			DMChange(e){
				console.log("DMChange",e.detail.value)
				this.distribution_dM = e.detail.value
				
			},
			disDM(){
				console.log('disDM')
			},
			playerDetail(){
				console.log('playerDetail')
				this.$refs['playerPopup'].open()
			},
			deleteReserve(){
				console.log('delete')
				uni.showModal({
				    title: '提示',
				    content: '确定移除该组局吗？',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			broadcast(){
				console.log('broadcast')
			},
		}
	}
</script>

<style lang="scss" scoped>
	.list {
		padding-top: 80rpx;
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
							height: 46rpx;
							font-size: $font-size-sm;
							margin-bottom: 10rpx;
						}
						.cu-tag:first-child {
						    margin-right: 10rpx;
						}
							.detail{
								color: grey;
								font-size: $font-size-base;
								font-family: 'neutra';
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
</style>
