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
				<input name="input" placeholder="请输入手机号"  type="number" v-model="phone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>
			<view class="cu-form-group ">
				<view class="title">微信</view>
				<input placeholder="请输入微信号" v-model="wx" name="input"></input>

			</view>
			<view class="cu-form-group">
				<view class="title">邮箱</view>
				<input placeholder="填写邮箱" v-model="email" name="input"></input>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">地址选择</view>
				<picker mode="region" @change="RegionChange" :value="region">
					<view class="picker">
						{{region[0]}}，{{region[1]}}，{{region[2]}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group ">
				<view class="title">居住地址</view>
				<input placeholder="请输入区域-街道-小区名称" v-model="address" name="input"></input>
				<text class='cuIcon-locationfill text-cyan'></text>
			</view>
			<view class="cu-form-group">
				<view class="title">公司名称</view>
				<input placeholder="请输入公司名称" v-model="company" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">工作地址</view>
				<input placeholder="请输入工作地址" v-model="company_address" ></input>
				<text class='cuIcon-locationfill text-cyan'></text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">公司性质</view>
				<picker @change="PickerChange" :value="index" :range="picker">
					<view class="picker">
						{{index>-1?picker[index]:'请选择'}}
					</view>
				</picker>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">培训目的</view>
				<input  v-model="aim" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">个人喜好</view>
				<input  v-model="hobby" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">兴趣爱好</view>
				<input  v-model="interest" ></input>
			</view>
			<view class="cu-form-group">
				<view class="title">熟悉品类</view>
				<input  v-model="knowtype" ></input>
			</view>
			<view class="cu-form-group align-start">
				<view class="title">个人评价</view>
				<textarea maxlength="-1"  @input="textareaBInput" placeholder="请输入个人评价"></textarea>
			</view>

			<view class="cu-bar bg-white margin-top">
				<view class="action">
					个人自拍照上传
				</view>
				<view class="action">
					{{imgList.length}}/2
				</view>
			</view>
			
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
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
				index: -1,//公司名称
				name: null,
				wx: null,
				phone: null,
				email: null,
				address:null,//居住地址
				company:null,//公司名称
				company_address:null,//工作地址
				aim:null,//培训目的
				hobby:null,//个人喜好
				interest :null,//兴趣爱好
				knowtype  :null,//熟悉品类
				evaluae :null,//个人评价
				submit: false,
				region:['江苏省', '苏州市', '昆山市'],
				picker:['国有企业','集体企业','私营企业','个体工商户','合伙企业','股份合作制企业','有限责任公司',],
				checkbox: [],
				gender: -1,// 0 女 1男
				genderDesc: ['女','男'],
				imgList: [],
				uploadImgsUrl:[],
				isLogin:null
			};
		},
		onLoad() {
				this.isLogin = this.$common.checkLogin();
				console.log(this.isLogin);
		},
		methods:{
			RegionChange(e) {
				this.region = e.detail.value
			},
			textareaBInput(e) {
				this.evaluae = e.detail.value
			},
			PickerChange(e) {//选择公司性质
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
				if(!this.email || !this.$common.checkEmail(this.email)) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写正确的邮箱格式~'
					return;
				}
				if(!this.phone || this.phone.length!=11 || !this.$common.checkPhone(this.phone)) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写正确联系方式~'
					return;
				}
				if(!this.wx) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写微信账号~'
					return;
				}
				if(!this.company) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写公司名称~'
					return;
				}	
				if(!this.gender == -1) {
					this.modalName = 'Modal'
					this.ModelContent = '请选择性别~'
					return;
				}
				if(this.index == -1) {
					this.modalName = 'Modal'
					this.ModelContent = '请选择所在公司性质~'
					return;
				}
				if(!this.region) {
					this.modalName = 'Modal'
					this.ModelContent = '请选择地址~'
					return;
				}
				if(!this.address) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写居住地址~'
					return;
				}
				if(!this.company_address) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写工作地址~'
					return;
				}
				if(!this.aim) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写培训目的~'
					return;
				}
				if(!this.hobby) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写个人喜好~'
					return;
				}
				if(!this.interest) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写兴趣爱好~'
					return;
				}
				if(!this.knowtype) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写熟悉品类~'
					return;
				}
				if(!this.evaluae) {
					this.modalName = 'Modal'
					this.ModelContent = '请填写个人评价~'
					return;
				}
				if(this.uploadImgsUrl.length == 0) {
					this.modalName = 'Modal'
					this.ModelContent = '请上传自拍照~'
					return;
				}
				let post_data = {
					name:this.name,
					email:this.email,
					phone:this.phone,
					company:this.company,
					region:this.region,
					address:this.address,
					company_address:this.company_address,
					aim:this.aim,
					wx:this.wx,
					hobby:this.hobby ,
					interest:this.interest ,
					knowtype:this.knowtype ,
					evaluae:this.evaluae,
					gsxz:this.picker[this.index],
					imgs:this.uploadImgsUrl,
					gender:this.genderDesc[this.gender],
				}
				console.log(post_data)
				let _this = this
				//请求
				uni.request({
					url: _this.$common.base_url + 'duoye_mini/register',
					method:'POST',
					data:post_data,
					success(res) {
						if(res.data.code == 0){
							_this.submit = true
							_this.modalName = 'Modal'
							_this.ModelTitle = 'Succss~'
							_this.ModelContent = '提交成功~感谢您的支持!'
							
							setTimeout(function(){
								console.log('setTimeoutapi')
								_this.hideModal()
								uni.redirectTo({
									url:'/pages/index/index',
									success() {
										
									}
								})
							},2000)
						}else{
							_this.modalName = 'Modal'
							_this.ModelContent = res.data.message
							return;
						}

					}
				})
				
			},
			ChooseImage() {
				let that = this
				uni.chooseImage({
					count: 2, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res) => {
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.$common.base_url + 'saveImg',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {
								// 'openid': uni.getStorageSync('openId')
							},
							success: (uploadFileRes) => {
								if (that.imgList.length != 0) {
									that.imgList = that.imgList.concat(tempFilePaths)
								} else {
									that.imgList = tempFilePaths
								}
								var res = JSON.parse(uploadFileRes.data).data.path;
								// that.uploadImgsUrl=[...that.uploadImgsUrl,...uploadFileRes.data.path];
								that.uploadImgsUrl.push(res);
							}
						});
						
					}
				});
			},
			
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '删除图片',
					content: '确定要删除这张图片吗？',
					cancelText: '再看看',
					confirmText: '确定',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
							this.uploadImgsUrl.splice(e.currentTarget.dataset.index, 1)
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
