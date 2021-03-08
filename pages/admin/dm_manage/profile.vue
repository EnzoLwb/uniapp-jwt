<template>
	<view>
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">编辑资料</block></cu-custom>
		<form style="margin-bottom: 100rpx;">
			<view class="cu-form-group">
				<view class="title">昵称</view>
				<input placeholder="请输入" v-model="form.name" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码</view>
				<input placeholder="输入框" name="input"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">简介</view>
				<textarea maxlength="-1"  @input="textDescInput" placeholder="例如这是狼人杀"></textarea>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						男
					</view>
				</view>
				<switch class='switch-sex' @change="SwitchGender" :class="switchC?'checked':''" :checked="switchC?true:false"></switch>
			</view>
			<!-- 头像 -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					头像
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-show="form.cover">
						<image :src="form.cover" mode="aspectFill" @tap="ViewCover" ></image>
						<view class="cu-tag bg-red" @tap.stop="DelCover">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseCover" v-if="!form.cover">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			
			<!-- 主页背景 -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					主页背景
				</view>
				<view class="action">
					{{form.bg_list.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in form.bg_list" :key="index" @tap="ViewImage" :data-url="form.bg_list[index]">
					 <image :src="form.bg_list[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="form.bg_list.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-blue margin-tb-sm shadow"  @tap="submit()">提交</button>
			</view>
		</form>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				index: -1,
				drawerShow:false,
				title:'添加新本' ,
				multiIndex: [0,0],
				form:{
					name:'',
					cover:null,
					clothes:false,
					gender:false,
					status:false,
					bg_list:[],
				},
				
			}
		},
		mounted() {

		},
		methods: {
			submit(){
				console.log(this.form)
			},
			SwitchGender(e) {
				this.form.gender = e.detail.value
			},
			SwitchStatus(e) {
				this.form.status = e.detail.value
			},
			onBackPress() {
				//确定离开?
			},
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			//角色列表图片
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
							this.form.bg_list.push(res.tempFilePaths)
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.form.bg_list,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除此图片吗？',
					cancelText: '再看看',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.form.bg_list.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			//封面操作
			ChooseCover() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
							this.form.cover = res.tempFilePaths
					}
				});
			},
			ViewCover(e) {
				uni.previewImage({
					urls: [this.form.cover],
					current: e.currentTarget.dataset.url
				});
			},
			DelCover(e) {
				uni.showModal({
					title: '删除',
					content: '确定要删除此封面吗？',
					cancelText: '再看看',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.form.cover = null
						}
					}
				})
			},
			textDescInput(e) {
				this.form.desc = e.detail.value
			},
		}
	}
</script>
