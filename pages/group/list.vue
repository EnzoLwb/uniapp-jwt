<template>
	<view class="container">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">组局</block></cu-custom>
		<view class="addBtn" @click="navToCreate()"><image src="/static/images/group/Add.png"></image></view>
		<view class="flex justify-between bg-white top-screen" v-if="groupList.length>0">
			<view class="flex align-center">
				按发起时间排序<text class="icon text-gold" @click="changeTime()" :class="timeUp?'cuIcon-triangledownfill':'cuIcon-triangleupfill'"></text>
			</view>
			<view class="flex align-center">
				<text class="icon" @click="FullRoom()"  :class="fullRoom?'cuIcon-roundcheckfill text-gold':'cuIcon-roundcheck'" :checked="fullRoom?true:false"></text>
				<text style="font-size: 26rpx;">剔除人满局</text>
			</view>
		</view>
		<view class="list" v-if="groupList.length>0">
			<navigator class="cu-card article" :url="'/pages/group/index?id='+item.group_id"
			v-for="(item,index) in groupList" :key="index">
				<view class="cu-item shadow">
					<view class="content" >
						<view class="img_tag">
							<image class="image" :src="item.cover" mode="aspectFill" lazy-load></image>
						</view>
						<view class="desc" style="position: relative;">
							<view class="text-content wenyue-font">{{item.name}}</view>
							<view class="detail">
								报名人数：<text class="text-gold">{{item.sign_in_number}}</text> / <text>{{item.total_number}}</text>
							</view>
							<view class="detail">
								<text style="margin-right: 20rpx;">{{item.date}}</text> <text style="margin-right: 20rpx;">{{item.time}}</text> 开局
							</view>
							<view class="">
								<button class="cu-btn btn" :disabled="item.sign_in_number>=item.total_number">
								{{item.sign_in_number < item.total_number ? "上 车 !":"已满员"}}</button>
							</view>
						</view>
					</view>
				</view>
			</navigator>	
		</view>
		<!-- 缺省图 -->
		<view class="no-group flex justify-center flex-direction" v-else>
			<view class="">
				<image src="/static/images/group/no_more.png"></image>
			</view>
			<view class="tips wenyue-font">
				暂时没有车队啊~
			</view>
			<button @click="navToCreate()">我来组织吧</button>
		</view>
		<view class="fenjiexian">
			<text class="normal">————</text>  	<text style="margin-left:10rpx">过往数据</text>		<text class="normal">————</text>
		</view>
		<!-- 历史列车 -->
		<view class="list">
			<view class="cu-card article" v-for="(item,index) in groupList" :key="index">
				<view class="cu-item shadow">
					<view class="content" >
						<view class="img_tag">
							<image class="image" :src="item.cover" mode="aspectFill" lazy-load></image>
						</view>
						<view class="desc" style="position: relative;">
							<view class="text-content wenyue-font">{{item.name}}</view>
							<view class="detail">
								报名人数：<text class="text-gold">{{item.total_number}}</text> / <text>{{item.total_number}}</text>
							</view>
							<view class="detail">
								<text style="margin-right: 20rpx;">{{item.date}}</text> <text style="margin-right: 20rpx;">{{item.time}}</text> 开局
							</view>
							<view class="">
								<button class="cu-btn btn" disabled>
								已满员</button>
							</view>
						</view>
					</view>
				</view>
			</view>	
		</view>
	</view>
</template>

<script>
	export default{
		components: {
		
		},
		data(){
			return {
				fullRoom:true,
				timeUp:true,
				groupList2:[],
				groupList:[
					{
						cover:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png",
						group_id:6,
						total_number:6,
						sign_in_number:3,
						date:"8月7日",
						time:"12:20",
						name:"蒹葭",
					},
					{
						cover:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603335530-13227c8208abaac.jpg",
						group_id:6,
						total_number:6,
						sign_in_number:3,
						date:"8月8日",
						time:"17:00",
						name:"五十世纪的精神病院患者之我是谁",
					},
					{
						cover:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603335530-13227c8208abaac.jpg",
						group_id:6,
						total_number:6,
						sign_in_number:6,
						date:"8月8日",
						time:"17:00",
						name:"五十世纪的精神病院患者之我是谁",
					},
				],
			}
		},
		methods:{
			FullRoom(){
				this.fullRoom = !this.fullRoom 
			},
			changeTime(){
				this.timeUp = !this.timeUp
			},
			navToCreate(){
				//判断权限 是否是管理员权限
				uni.navigateTo({
				    url: '/pages/drama/list?type=createGroup'
				});
			},
		},
	}
</script>

<style lang="scss">
	@import './list.scss';
</style>

