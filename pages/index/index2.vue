<template>
	<view>
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{ModelTitle}}</view>
					<view class="action" @tap="hideModal()">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-xl">
					{{ModelContent}}
				</view>
			</view>
		</view>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title">姓名</view>
				<input placeholder="请输入姓名" v-model="name" name="input"></input>
				<text class='text-red'>*</text>
			</view>
			<view class="cu-form-group">
				<view class="title">性别</view>
				<picker @change="GenderChange" :v-model="gender" :range="genderDesc">
					<view class="picker">
						{{gender>-1?genderDesc[gender]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group">
				<view class="title">联系方式</view>
				<input  name="input" type="number" v-model="phone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
				
			</view>
			<view class="cu-form-group">
				<view class="title">工作单位</view>
				<input placeholder="请输入工作单位" v-model="company" ></input>
				<text class='text-red'>*</text>
			</view>
			<radio-group class="block" @change="PickerChange">
				<view class="cu-form-group margin-top">
					<view class="title">所在公司职务</view><text class='text-red'>*</text>
				</view>
				
				<view class="cu-form-group" v-for="item in picker" :key="item.name">
					<view class="title">{{item.name}}</view>
					<radio class='radio' :class="item.checked?'checked':''" :checked="item.checked?true:false"  :value="item.name"></radio>
				</view>
				
			</radio-group>
			<view class="cu-form-group margin-top">
				<view class="title">邮箱</view>
				<input v-model="email" ></input>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-cyan margin-tb-sm shadow" @tap="reg()">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default  {
		data() {
			return {
				modalName:null,
				ModelTitle:'重新填写',
				ModelContent:null,
				index: -1,
				name: null,
				company: null,
				phone: null,
				email: null,
				submit: false,
				picker: [
					{
						name:'行政办公室',
						checked:false,
					},
					{
						name:'销售人员',
						checked:false,
					},
					{
						name:'采购人员',
						checked:false,
					},
					{
						name:'技术负责人',
						checked:false,
					},
					{
						name:'实验老师',
						checked:false,
					}
				],
				checkbox: [],
				gender: -1,// 0 女 1男
				genderDesc: ['女','男']
			};
		},
		onLoad() {

		},
		methods:{
			PickerChange(e) {
				console.log(e.detail.value)
				this.index = e.detail.value
			},
			GenderChange(e) {
				console.log(e.detail.value)
				this.gender = e.detail.value
			},
			SwitchC(e) {
				console.log(e.detail.value)
				this.gender = e.detail.value
				this.genderDesc = e.detail.value ? '男' : '女'
			},

			//注册
			reg() {
				if(!this.name) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写姓名~'
					return;
				}
				if(!this.company) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写工作单位~'
					return;
				}	
				if(!this.phone) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写联系方式~'
					return;
				}
				if(!this.gender == -1) {
					this.modalName = 'Modal'
					this.ModelContent = '请选择性别~'
					return;
				}
				if(this.index == -1) {
					this.modalName = 'Modal'
					this.ModelContent = '请选择所在公司职务~'
					return;
				}
				
				let post_data = {
					name:this.name,
					email:this.email,
					phone:this.phone,
					company:this.company,
					unit:this.index,//职务
					gender:this.genderDesc[this.gender]
				}
				console.log(post_data)
				let _this = this
				_this.submit = true
				_this.modalName = 'Modal'
				_this.ModelTitle = 'Succss~'
				_this.ModelContent = '申请成功~静候佳音'
				
				setTimeout(function(){
					console.log('setTimeoutapi')
					// _this.hideModal()
				},1000)
				return
				//请求
				uni.request({
					url: _this.$common.base_url + 'volunteer/register',
					method:'POST',
					data:post_data,
					success(res) {
						if(res.data.code == 0){
							_this.submit = true
							_this.modalName = 'Modal'
							_this.ModelTitle = 'Succss~'
							_this.ModelContent = '申请成功~静候佳音'
							
							setTimeout(function(){
								console.log('setTimeoutapi')
								_this.hideModal()
							},1000)
						}else{
							_this.modalName = 'Modal'
							_this.ModelContent = res.data.message
							return;
						}

					}
				})
				
				
			},
			hideModal(e) {
				this.modalName = null
				if(this.submit){
					this.submit = false
					uni.navigateBack({
						url:'/pages/index/index',
						success() {
							
						}
					})
				}
			},
		}
	}
</script>

<style>
	.text-red{
		font-size: 40rpx;
	}

	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
