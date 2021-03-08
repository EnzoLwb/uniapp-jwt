<template>
	<view>
		<cu-custom ref="cust" bgColor="bg-white" :isBack="true" :isHome="false"><block slot="content">{{title}}</block></cu-custom>
		<form style="margin-bottom: 100rpx;">
			<view class="cu-form-group">
				<view class="title">剧本名称</view>
				<input placeholder="标题" v-model="form.name" name="input"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">不限人数/男女</view>
				<switch @change="NoLimitOnPerson" :class="form.noLimit?'checked':''" :checked="form.noLimit?true:false"></switch>
			</view>
			<view v-show="!form.noLimit">
				<view class="cu-form-group margin-top">
					<view class="title">人数</view>
					<picker @change="PickerChange" :value="index" :range="picker">
						<view class="picker">
							{{index>-1?form.person_number:4}}
						</view>
					</picker>
				</view>
				<view class="cu-form-group">
					<view class="title">男女比例</view>
					<picker mode="multiSelector" @change="MultiChange" @columnchange="MultiColumnChange" :value="multiIndex" :range="multiArray">
						<view class="picker">
							{{'男 '+ multiArray[0][multiIndex[0]]}} {{'女 '+ multiArray[1][multiIndex[1]]}}
						</view>
					</picker>
				</view>
			</view>
			<view class="cu-form-group" style="justify-content:start">
				<view class="title">困难度</view><!-- difficulty -->
				<view class="cu-capsule radius">
					<view class='cu-tag margin-left' :class="item==form.detail.difficulty?'bg-blue':'line-blue'" 
					v-for="(item,index) in difficulty" :key="index" @tap="changeDifficulty(item)" >
						{{item}}
					</view>
				</view>
			</view>
			<!-- dramaStyle -->
			<view class="cu-form-group" style="justify-content:start">
				<view class="title">风格</view>
				<view class="cu-capsule radius">
					<view class='cu-tag margin-left' :class="item==form.drama_style?'bg-green':'line-green'" 
					v-for="(item,index) in dramaStyle" :key="index" @tap="changeDramaStyle(item)" >
						{{item}}
					</view>
				</view>
			</view>
			<!-- DramaForm -->
			<view class="cu-form-group" style="justify-content:start">
				<view class="title">剧本形式</view>
				<view class="cu-capsule radius">
					<view class='cu-tag margin-left' :class="item==form.drama_form?'bg-red':'line-red'" 
					v-for="(item,index) in dramaForm" :key="index" @tap="changeDramaForm(item)" >
						{{item}}
					</view>
				</view>
			</view>
			<!-- 标签-->
			<view class="cu-form-group" style="justify-content:start" @tap="showDrawer" >
				<view class="title">标签</view>
				<view class="cu-capsule radius" style="display:block">
					<view class='cu-tag bg-gold'
					v-for="(item,index) in form.tags" :key="index" >
						{{item}}
					</view>
				</view>
			</view>
			<!-- 简介 -->
			<view class="cu-form-group align-start">
				<view class="title">简介</view>
				<textarea maxlength="-1"  @input="textDescInput" placeholder="例如这是狼人杀"></textarea>
			</view>
			<!-- 价格 -->
			<view class="cu-form-group">
				<view class="title">价格</view>
				<input type="number" name="input" placeholder="请输入价格" v-model="form.price" ></input>
				<text class="text-black text-bold">元</text>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">是否上架</view>
				<switch @change="SwitchStatus" :class="form.status?'checked':''" :checked="form.status?true:false"></switch>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">是否需要换装</view>
				<switch @change="clothesChange" :class="form.clothes?'checked':''" :checked="form.clothes?true:false"></switch>
			</view>
			<view class="cu-form-group margin-top">
				<view class="title">是否支持反串</view>
				<switch @change="crossGenderChange" :class="form.cross_gender?'checked':''" :checked="form.cross_gender?true:false"></switch>
			</view>
			<!-- 封面 -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					剧本封面
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
			
			<!-- 角色列表 -->
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					角色图片
				</view>
				<view class="action">
					{{form.role_list.length}}/4
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-4 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in form.role_list" :key="index" @tap="ViewImage" :data-url="form.role_list[index]">
					 <image :src="form.role_list[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="form.role_list.length<4">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>
			<view class="padding flex flex-direction">
				<button class="cu-btn bg-olive margin-tb-sm shadow"  @tap="submit()">提交</button>
			</view>
		</form>
		<!-- 剧本题材 标签选择 抽屉 -->
	<uni-drawer :visible="drawerShow" mode="right" @close="hideDrawer()">
			<scroll-view scroll-y class="drawer">
				<view class="wrapper">
					<view class="drawer_content" >
						<view class="type"><b>剧本题材</b></view>
						<view class="grid">
							<view class="margin-tb-sm text-center"  v-for="(item,index) in dramaType" :key="index" >
								<button class="cu-btnline-grey" :class="form.tags.indexOf(item)!==-1?'line-gold':''" 
								@click="dramaTypeSelected(item)" ><b>{{item}}</b></button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="close padding flex flex-wrap justify-between align-center col-2">
				<button class="cu-btn bg-grey"  hover-class="word-btn--hover" :hover-start-time="20" @click="hideDrawer"
					:hover-stay-time="70">重置</button>
				<button class="cu-btn bg-black"  hover-class="word-btn--hover" :hover-start-time="20" @click="hideDrawer"
					:hover-stay-time="70">确认</button>	
			</view>
	</uni-drawer>
	
	</view>
</template>

<script>
	import uniDrawer from '@/components/uni-drawer/uni-drawer.vue'
	export default {
		components: {
			uniDrawer
		},
		data() {
			return {
				index: -1,
				drawerShow:false,
				title:'添加新本' ,
				picker: [4,5,6,7,8,9,10,11,12,13,14],
				multiArray: [
					[0,1,2,3,4,5,6,7,8,9,10,11,12],
					[0,1,2,3,4,5,6,7,8,9,10,11,12]
				],
				multiIndex: [0,0],
				difficulty:['新手','初级','进阶','烧脑','硬核'],//难度
				dramaStyle:['本格','微变','变格','VR','推理'],//风格
				dramaForm:['盒装','城限','独家','实景','线上','微剧本'],//剧本形式
				dramaType:["科幻","民国","情感","校园","古装","国外","神话","现代",],
				form:{
					name:'',
					cover:null,
					desc:'',
					person_number: 5,
					male:3,
					female:2,
					drama_style:'',
					drama_form:'',
					drama_open:'',
					tags:[],
					role_list:[],
					detail:{
						difficulty:'',
					},
					clothes:false,
					noLimit:false,//不限人数
					status:false,
					cross_gender:false,
					price:"",
				},
				
			}
		},
		mounted() {
			//人数
			if(this.form.person_number!=0){
				this.index = this.picker.indexOf(this.form.person_number)
				console.log(this.index)
			}
			//男女
			if(this.form.male!=0){
				this.multiIndex[0] = this.multiArray[0].indexOf(this.form.male)
				console.log(this.multiIndex[0])
			}
			if(this.form.female!=0){
				this.multiIndex[1] = this.multiArray[1].indexOf(this.form.female)
				console.log(this.multiIndex[1])
			}
			//加载门店初始价格 
			if(this.form.price){
				
			}
		},
		methods: {
			hideDrawer(e) {
				this.drawerShow = false
			},
			//打开筛选抽屉
			showDrawer(){
				this.drawerShow = true
			},
			submit(){
				console.log(this.form)
			},
			PickerChange(e) {
				this.index = e.detail.value
				this.form.person_number = this.picker[this.index]
			},
			MultiChange(e) {
				this.multiIndex = e.detail.value
				console.log('MultiChange')
				console.log(this.multiIndex)
				this.form.male = this.multiArray[this.multiIndex[0]]
				this.form.female = this.multiArray[this.multiIndex[1]]
			},
			MultiColumnChange(e) {
				console.log(e.detail.value)
			},
			SwitchStatus(e) {
				this.form.status = e.detail.value
			},
			crossGenderChange(e) {
				this.form.cross_gender = e.detail.value
			},
			clothesChange(e) {
				this.form.clothes = e.detail.value
			},
			changeDifficulty(val){
				this.form.detail.difficulty = val
			},
			changeDramaForm(val){
				this.form.drama_form = val
			},
			changeDramaStyle(val){
				this.form.drama_style = val
			},
			onBackPress() {
				if (this.drawerShow) {
					this.hideDrawer()
					return true
				}
			},
			dramaTypeSelected(item){
				//是否包含 如果有则取消 没有则添加
				var index = this.form.tags.indexOf(item)
				console.log(index)
				if(index === -1){
					this.form.tags.push(item)
				}else{
					this.form.tags.splice(index,1)
				}
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
							this.form.role_list.push(res.tempFilePaths)
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.form.role_list,
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
							this.form.role_list.splice(e.currentTarget.dataset.index, 1)
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
			//不限人数
			NoLimitOnPerson(e)
			{
				this.form.noLimit = e.detail.value
			},
		}
	}
</script>

<style scoped lang="scss">
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.drawer {
		display: flex;
		flex-direction: column;
		font-size: $font-size-sm;
		min-height: 1vh;
		max-height: calc(100vh - 100rpx - 20rpx);
		
		.wrapper {
			width: 100%;
			height: 100%;
			overflow: hidden;
			padding: 10rpx 0rpx 20rpx 30rpx;
			.drawer_content{
				padding-top: 150rpx;
				// padding-left: 20rpx;
				.grid{
					padding: 10rpx;
					.text-center{
						margin-right: 10rpx;
					}
					b{
						font-weight: bold;
					}
				}
				.type{
					font-size: $font-size-extra-lg;
					font-family: 'wenyue';
					padding: 20rpx 0rpx;
				}
			}
		}
	}
</style>
