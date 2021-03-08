<template>
	<uni-popup ref="popup" type="bottom">
		<scroll-view scroll-y class="popup-content flex flex-column">
			<checkbox-group class="block" @change="CheckboxChange">
			<view class="player_item bg-white" v-for="(item,index) in members" :key="index">
				<view class="people flex justify-start">
					<view class="flex align-center">
						<view class="cu-avatar round"
						:style=" {backgroundImage:'url('+item.avatar+')' }"></view>
					</view>
					<view class="flex right-part justify-around">
						<view class="grid col-1">
							<view class="name text-bold">文博ENZP(154567)</view>
							<view>
								<text class="something text-bold" :class="index%2 ==0 ?'text-red':'' ">未支付</text>
								<text class="something margin-left">价格:￥118.0</text>
								
								<checkbox class='round cyan margin-left' :class="item.checked?'checked':''" 
								:checked="item.checked?true:false" :value="item.player_id"></checkbox>
							</view>
							<view class="something">余额：￥99.00</view>
						</view>
						<view class="flex align-center">
							<button class="cu-btn bg-black identify">联系TA</button>
							<button class="cu-btn bg-black identify margin-left">MVP</button>
						</view>
					</view>
				</view>
			</view>
			</checkbox-group>				
			<view class="btn flex justify-center">
				<button type="primary" class="w-30 font-size"  @click="submit" >更改为已付</button>
			</view>
		</scroll-view>
	</uni-popup>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		name: 'playerPopup',
		components: {
			uniPopup
		},
		data(){
			return{
					select_player:[],
					all_selected:false,
					items:[],
					members: [
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
							checked:false,
							player_id:2311,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
							checked:false,
							player_id:2309,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
							checked:false,
							player_id:238,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
							checked:false,
							player_id:236,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
							checked:false,
							player_id:235,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
							checked:false,
							player_id:234,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							checked:false,
							player_id:233,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
							checked:false,
							player_id:232,
						},
						{
							avatar:'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
							checked:false,
							player_id:231,
						},
					],
			}
		},
		onLoad() {
			
		},
		props: {
			group:{
				type: Number,
				default: 1,
			},
		},
		methods: {
			CheckboxChange(e) {
				 var items = this.members
				this.select_player = JSON.parse(JSON.stringify(e.detail.value))
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
						const item = items[i]
						if(e.detail.value.includes(item.player_id)){
								this.$set(item,'checked',true)
								
						}else{
								this.$set(item,'checked',false)
						}
				}
			},
			open() {
				this.$refs['popup'].open()
			},
			close() {
				this.$refs['popup'].close()
			},

		}
	}
</script>

<style lang="scss" scoped>
	.popup-content {
		background-color: #FFFFFF;
		border-radius: 24rpx 24rpx 0 0;
		height: 40vh;
		padding: 30rpx;
		padding-bottom:100rpx;
		position: relative;
		.player_item{
			padding-bottom:16rpx;
			margin-bottom: 16rpx;
			border-radius:40rpx;
			.people{
				padding: 0 10rpx;
				.right-part{
					margin-left: 20rpx;
					.identify{
						font-size: 20rpx;
						border-radius: 10rpx;
						padding: 0 20rpx;
						height: 46rpx;
						min-width: 100rpx;
					}
					.name{
						font-size:$font-size-sm;
					}
					.something{
						margin-top:10rpx;
						font-size:$font-size-extra-sm;
					}
				}
			}
			.grid{
				button{
					font-size:$font-size-extra-sm;
					padding: 10rpx 20rpx;
					margin-left: 20rpx;
				}
			}
		
		}
		
		.btn{
			position: fixed;
			width: 100%;
			bottom: 30rpx;
			display: flex;
			.cancel{
				background-color: #f3ca7e;
			}
			.sure{
				margin-left: 70rpx;
			}
		}
	}
	
	.close_btn {
		width: 30rpx;
		height: 30rpx;
	}
</style>
