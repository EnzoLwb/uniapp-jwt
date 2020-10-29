<template>

	<view class="cu-load load-modal" v-if="show" style="border-radius:50%">
		<!-- <view class="cuIcon-emojifill text-orange"></view> -->
		<image src="https://image.weilanwl.com/gif/rhomb-white.gif" style="height: 160rpx;width: 160rpx;" mode="aspectFit"></image>
	</view>

</template>

<script>
	export default {
		name: "LoadingModal",
		props: {
			//是否显示
			show: {
				type: Boolean,
				default: true
			},

		},
		data() {
			return {

			};
		},
		methods: {

		}
	}
</script>

<style lang="scss">


</style>
