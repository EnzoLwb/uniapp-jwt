<template>
	<view>
		<view class="cu-custom" :style="[{height:CustomBar + 'px'}]" >
			<view class="cu-bar fixed" :style="style" :class="[bgImage!=''?'none-bg text-white bg-img':'',bgColor]">
				<view class="action" @tap="BackPage" v-if="isBack">
					<text class="cuIcon-back"></text>
					<slot name="backText"></slot>
					<text class="cuIcon-home" v-if="isHome" @tap="BackHome"></text>
				</view>
				<view class="content" :style="[{top:StatusBar + 'px'}]">
					<slot  name="content"></slot>
				</view>
				<slot name="right"></slot>
			</view>
			
		</view>
		<!-- 登录popup -->
		<login-popup ref="loginPopup"></login-popup>
	</view>
</template>

<script>
	import loginPopup from '@/pages/mine/components/login-popup.vue'
	export default {
		data() {
			return {
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
			};
		},
		components: {
			loginPopup
		},
		name: 'cu-custom',
		computed: {
			style() {
				var StatusBar= this.StatusBar;
				var CustomBar= this.CustomBar;
				var bgImage = this.bgImage;
				var style = `height:${CustomBar}px;padding-top:${StatusBar}px;`;
				if (this.bgImage) {
					style = `${style}background-image:url(${bgImage});`;
				}
				return style
			}
		},
		props: {
			bgColor: {
				type: String,
				default: ''
			},
			isBack: {
				type: [Boolean, String],
				default: false
			},
			isHome: {
				type: [Boolean, String],
				default: true
			},
			bgImage: {
				type: String,
				default: ''
			},
		},
		methods: {
			openLogInPop(){
				this.$refs.loginPopup.open()
				
			},
			BackPage() {
				uni.navigateBack({
					delta: 1
				});
			},
			BackHome() {
				uni.switchTab({
				    url: '/pages/index/index'
				});
			},
		}
	}
</script>

<style>

</style>
