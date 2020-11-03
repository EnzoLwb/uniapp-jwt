<template>
	<view class="container">
		<cu-custom bgColor="bg-white" :isBack="true"><block slot="content">剧本详情</block></cu-custom>
		<!-- 封面标题标签人数价格 分享 -->
		<view class="top">
			<view class="top_top p-30 flex-row">
				<view class="coupon">领券</view>
				<image class="img" 
				src="https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png" mode="widthFix"></image>
				<view class="right flex-col">
					<view class="title mt-10   mb-10 wenyue-font">
						五十世纪的
					</view>
					<view class="tags mt-20 flex-row font-weight-bold" >
						<view class="pl-10">仙侠</view>
						<view class="pl-10">古装</view><view class="pl-10">欢乐</view><view class="pl-10">情感</view>
					</view>
					<view class="type mt-20 flex-row font-weight-bold" >
						<view class="pl-10 mt8">开放</view>
						<view class="pl-30 mt8">8人</view>
						<view class="ml-30 cu-tag">5男3女</view>
					</view>
					<view class="price mt-20">
						￥68/位
					</view>
				</view>
			</view>
			<!-- 发行时间 组局次数 发行工作室 -->
			<view class="top_bottom flex-row">
				<view class="block">
					<view class="top shenglue">
						2018-12-02
					</view>
					<view class="bottom">
						发行时间
					</view>
				</view>
				<view class="block">
					<view class="top">
						9
					</view>
					<view class="bottom">
						组局次数
					</view>
				</view>
				<view class="block" style="border-right: none">
					<view class="top shenglue">
						浩天工作室
					</view>
					<view class="bottom">
						发行商
					</view>
				</view>
			</view>
		</view>
		<!-- 简介 -->
		<view class="desc">
			<view class="title">
				简介
			</view>
			<view class="content" :class="shenglue?'shenglue':''">
				2018年9月27日上午10:00，牛海市近郊的一个小海岛——温乡岛上的温乡湖如往常一样平静。几个游客刚刚抵达岸边，马上要准备垂钓。远远地看见湖中央漂浮着一个奇怪的物体。有人拿出手机，利用手机相机将镜头拉近观看，赫然发现这是一具尸体，便立即报警。 10:30，从牛海市赶来的警方开始盘问岛上所有居民与游客。而通过身份辨认，锁定此人名叫钟德全，是与现在“温乡别墅”度假的7个年轻人一同前来的。因此“温乡别墅”也就成为了警方的重点排查对象。
				<view class="more" @tap="more()">
					<text>{{shenglue?"展开":"收起"}}</text>
					<image :src="shenglue?'/static/images/common/down.png':'/static/images/common/up.png'" class="down-icon"></image>
				</view>
			</view>
			<view class="title" :class="shenglue?'':'mt-30'">
				剧本角色
			</view>
			<view class="role">
				<swiper class="swiper" circular display-multiple-items="3"
				 next-margin="40rpx" :autoplay="false">
						<swiper-item class="swiper-item" v-for="(item, index) in role_list" :key="index">
							<view class="swiper-item-wrapper" >
								<view class="cu-item shadow" @tap="showAddressModal(index)">
									<image mode="widthFix"  src="https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png" ></image>
									<view class="neutra-font kbcs shenglue">{{item.name}}</view>
								</view>
							</view>
						</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="guessyoulike">
			<view class="title">
				猜你喜欢
			</view>
			<view class="drama">
				<swiper class="swiper" display-multiple-items="3"
				 next-margin="50rpx" :autoplay="autoplay" :interval="5000" :duration="500">
						<swiper-item class="swiper-item" v-for="(item, index) in role_list" :key="index">
							<view class="swiper-item-wrapper" >
								<view class="cu-item shadow">
									<image mode="widthFix" src="https://www.myanshi.cn/wp-content/uploads/2020/10/1603675034-d17b9800f4d3ebd.jpg" ></image>
									<view class="wenyue-font kbcs shenglue">『{{item.name}}』</view>
								</view>
							</view>
						</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="footer">
			<button class="btn">
				<text class="follow">♡</text> 关注</button><!-- ❤ -->
			<button class="btn" style="margin-left: 10%;">预约组局</button>
		</view>
		<!-- 弹窗 -->
		<view class="cu-modal" :class="visible==true?'show':''" @tap="hideModal" >
			<view class="cu-dialog" @tap.stop="">
				<view class="content"  style="background-color: white;">
					<swiper :current="current_role" :circular="true" class="swiper" :autoplay="false" >
						<swiper-item v-for="(item, index) in role_list" :key="index" class="swiper-item">
							<image :src="item.coverPic" mode="aspectFill"></image>
							<view class="name">{{item.name}}</view>
							<view class="cover_desc">{{item.desc}}</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
		</view>
		<!-- 弹窗角色结束 -->
	</view>
</template>

<script>
	export default{
		components: {
			
		},
		data(){
			return{
				visible:false,
				autoplay:false,
				current_role:0,
				shenglue:true, //超过100个字就true 小于250个字就false
				role_list:[
					{
						name:"柴暖心",desc:"德全装修公司总裁秘书。波浪卷发，圆脸，五官周正，很是气质",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603674861-af5cdd01e11fa19.png",
					},
					{
						name:"海光明",desc:"个体户老板。身材高大，浓眉大眼，长相粗狂，寸头",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603675034-d17b9800f4d3ebd.jpg",
					},
					{
						name:"纪克铭",desc:"银行业务员。个子不高，身材消瘦，鼻梁高挺，戴眼镜，微微驼背",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603335530-13227c8208abaac.jpg",
					},
					{
						name:"纪克铭纪克铭纪克铭纪克铭",desc:"银行业务员。个子不高，身材消瘦，鼻梁高挺，戴眼镜，微微驼背",
						coverPic:"https://www.myanshi.cn/wp-content/uploads/2020/10/1603675034-d17b9800f4d3ebd.jpg",
					},
				],
			}
		},
		methods:{
			more(){
				this.shenglue = !this.shenglue
			},
			showAddressModal(index)
			{
				this.visible = !this.visible
				this.current_role = index
			},
			hideModal()
			{
				this.visible = false
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "./index.scss";
</style>
