<template>
	<view class="list" :style="{ 'padding-top': padTop+'rpx' }">
		<view class="product" v-for="(item, index) in dramas" :key="index" >
			<view class="cu-card article">
					<view class="cu-item shadow">
						<view class="content" >
							<view class="img_tag">
								<image class="image" :src="item.cover" mode="aspectFill" lazy-load></image>
								<view class="CornerText" v-if="item.corner">
									{{item.corner}}
								</view>
							</view>
							<view class="desc" style="position: relative;">
								<view class="text-content wenyue-font">{{item.name}}</view>
								<view class="detail">
									发行时间：{{item.fx_time}}
								</view>
								<view class="detail">
									剧本难度：{{item.difficulty}}
								</view>
								<view class="detail">
									剧本形式：{{item.layout}}
								</view>
								<view style="max-width: 95%;">
									<view class="cu-tag  light sm round bg-white text-grey"
									 v-for=" (tag ,key) in item.tags" :key="key " >{{tag}}</view>
								</view>

							</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "AllDramaList",
		data(){
				return{
					all:[],
				}
		},
		props: {
			dramas: {
				type: Array,
				default: []
			},
			padTop: {
				type: Number,
				default: 230
			},
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.list {
		padding-top: 230rpx;
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
						.CornerText{
								position: absolute;
								top: 10rpx;
								right: 10rpx;
								width: 130rpx;
								height: 30rpx;
								line-height: 30rpx;
								font-size: 22rpx;
								text-align: center;
								letter-spacing: .05em;
								text-indent: .05em;
								font-weight: 400;
								color: #fff;
								background: #fe6270;
								z-index: 2;
								-webkit-transform: rotate(45deg) translate(50%,90%);
								transform: rotate(45deg) translate(50%,90%);
								-webkit-transform-origin: top right;
								transform-origin: top right;
						}
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
							.finish{
								position: absolute;
								top: -10rpx;
								right: 20rpx;
								font-size: 20rpx;
								z-index: 100;
								height: 48rpx;
								color: black;
								image{
									height: 48rpx;
									width: 48rpx;
								}
							}
							.guanzhu{
								position: absolute;
								bottom: 0rpx;
								right: 20rpx;
								font-size: 20rpx;
								z-index: 0;
								height: 48rpx;
								image{
									height: 48rpx;
									width: 48rpx;
								}
							}
							.reserve{
								position: absolute;
								bottom: 10rpx;
								right: 20rpx;
								font-size: 20rpx;
								z-index: 100;
								height: 48rpx;
								button{
									border-radius: $border-radius-lg;
									font-size: 24rpx;
									height: 54rpx;
								}
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
