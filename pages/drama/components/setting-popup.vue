<template>
<view>
	<uni-popup ref="popup"  type="bottom">
		<view class="admin-detail bg-white padding" ><text>修改剧本内容</text></view>
		<view class="admin-detail bg-white padding" @click="removeDrama()"><text>移除该剧本</text></view>
		<view class="admin-detail bg-white padding" @click="updateClothes()"><text>{{current_drama.clothes ? '取消支持换装':'改为支持换装'}}</text></view>
		<view class="admin-detail bg-white padding" @click="updateDmed()"><text>{{current_drama.dmed ? '取消我会开':'改为我会开的本'}}</text></view>
		<view class="admin-detail bg-white padding" @click="updateTagModel=true"><text>设置右上角内容</text></view>
		<view class="admin-detail bg-white padding" @click="updatePriceModel=true"><text>设置价格</text></view>
		<view class="admin-detail bg-white padding" @click="close()"><text>取消</text></view>
	</uni-popup>
	<!-- 修改价格弹窗 -->
	<view class="cu-modal" :class="updatePriceModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改价格</view>
					<view class="action" @tap="this.updatePriceModel = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding">
					<view class="cu-form-group">
						<view class="title">金额</view>
						<input v-model="current_drama.price" name="input" type="number"></input>
						<text class='text-black'>￥</text>
					</view>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="submitUpdate('price')">确定</button>
					</view>
				</view>
			</view>
	</view>
	<!-- 修改价格弹窗结束 -->
	<!-- 修改右上角弹窗 -->
	<view class="cu-modal" :class="updateTagModel?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改右上角标签</view>
					<view class="action" @tap="this.updateTagModel = false">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding">
					<radio-group class="block" @change="cornerChange">
						<view class="cu-form-group">
							<view class="title">类型</view>
							<label class="radio"><radio value="0" :checked="current_drama.corner===0?true:false" />无</label>
							<label class="radio"><radio value="1" :checked="current_drama.corner==1?true:false" />DM推荐</label>
							<label class="radio"><radio value="2" :checked="current_drama.corner==2?true:false"/>New</label>
							<label class="radio"><radio value="3" :checked="current_drama.corner==3?true:false"/>狼人杀</label>
						</view>
					</radio-group>
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn bg-green margin-left" @tap="submitUpdate('corner')">确定</button>
					</view>
				</view>
			</view>
	</view>
	<!-- 修改右上角结束 -->
</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
			name: 'admin',
			components: {
				uniPopup
			},
			data(){
				return{
					current_drama:{},
					updatePriceModel:false,
					updateTagModel:false,
				}
			},
			props: {
			},
			methods: {
				open() {
					this.$refs['popup'].open()
				},
				removeDrama(){
					console.log('removeDrama')
					uni.showModal({
					    title: '提示',
					    content: '确定移除该剧本吗？',
					    success: function (res) {
					        if (res.confirm) {
					            console.log('用户点击确定');
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				},
				updateClothes(){
					
				},
				updateDmed(){
					
				},
				cornerChange(e){
					this.current_drama.corner = e.detail.value
					console.log(this.current_drama.corner)
				},
				submitUpdate(type){
					//全都走这个接口 传不同type
					uni.showLoading({
						 title: '加载中',
						 mask:true
					})
					console.log(type,this.current_drama)
				},
				setDrama(drama){
					this.current_drama = drama
				},
				close() {
					this.$refs['popup'].close()
				},
				change({show}) {
					this.$emit('change', show)
				},
			}
		}
	
</script>

<style>
	.admin-detail{
		font-size: 36rpx;
		font-weight: bold;
		text-align: center;
		border-bottom: 1rpx solid #e2e0e0;
	}
</style>
