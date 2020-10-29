<template>
	<view class="container">
		<view class="header">
			<!-- 搜索栏 begin -->
			<view class="search-box">
				<view class="search-input" @tap="showSearch=true">
					<image src="/static/images/common/search-icon.png" class="search-icon"></image>
					<view>搜索</view>
				</view>
			</view>
			<!-- 搜索栏 end -->
			<!-- 滚动公告栏 begin -->
			<view class="notices">
				<swiper class="swiper" autoplay vertical :interval="3000" :duration="1000" circular>
					<swiper-item v-for="(notice, index) in notices" :key="index">
						<view class="swiper-item">
							<image :src="notice.image" class="image"></image>
							<view class="content">{{ notice.content }}</view>
						</view>
					</swiper-item>
				</swiper>
				<view class="more">
					<text>更多</text>
					<image src="/static/images/common/gray_arrow_down.png" class="down-icon"></image>
				</view>
			</view>
		</view>
		<!-- 滚动公告栏 end -->
		<view class="main">
			<!-- 左侧菜单 begin -->
			<scroll-view class="menu-bar" scroll-y scroll-with-animation>
				<view class="wrapper">
					<view class="menu-item" @tap="handleMenuSelected(category.id)" 
						  :class="{active: currentCategoryId == category.id}" v-for="(category, index) in categories" :key="index">
						<image :src="category.category_image_url" v-if="category.category_image_url" class="image" mode="widthFix"></image>
						<view class="title">{{ category.name }}</view>
					</view>
				</view>
			</scroll-view>
			<!-- 左侧菜单 end -->
			<!-- 右侧商品列表 begin -->
			<scroll-view class="product-section" scroll-y scroll-with-animation :scroll-top="productsScrollTop" @scroll="productsScroll">
				<view class="wrapper">
					<!-- 商品 begin -->
					<view class="products-list" v-for="(category, index) in categories" :key="index" :id="`products-${category.id}`">
						<view class="category-name">{{ category.name }}</view>
						<view class="products">
							<view class="product" v-for="(product, key) in category.products" :key="key" 
								@tap="showProductDetailModal(product)">
								<image :src="product.images[0].url" mode="widthFix" class="image"></image>
								<view class="content">
									<view class="name">{{ product.name }}</view>
									<view class="description">{{ product.description }}</view>
									<view class="price">
										<view>￥{{ product.price }}</view>
										<actions :materials-btn="!product.is_single" 
												@materials="showProductDetailModal(product)" 
												:number="productCartNum(product.id)"
												@add="handleAddToCart(product)" 
												@minus="handleMinusFromCart(product)" />
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 商品 end -->
				</view>
			</scroll-view>
			<!-- 右侧商品列表 end -->
		</view>
		<!-- 商品详情 modal begin -->
		<product-modal :product="product" 
						:visible="productModalVisible" 
						@cancel="closeProductDetailModal" 
						@add-to-cart="handleAddToCartInModal" 
		/>
		<!-- 商品详情 modal end -->
		<!-- 购物车栏 begin -->
		<cart-bar :cart="cart" 
				  @add="handleAddToCart" 
				  @minus="handleMinusFromCart"
				  @clear="clearCart"
				  @pay="pay"
		/>
		<!-- 购物车栏 end -->
		<search :show="showSearch" :categories="categories" @hide="showSearch=false" @choose="showProductDetailModal"></search>
	</view>
</template>

<script>
	import {mapState, mapMutations} from 'vuex'
	import Actions from './components/actions/actions.vue'
	import CartBar from './components/cartbar/cartbar.vue'
	import ProductModal from './components/product-modal/product-modal.vue'
	import cartPopup from './components/cart-popup/cart-popup.vue'
	import Search from './components/search/search.vue'
	
	export default {
		components: {
			Actions,
			CartBar,
			ProductModal,
			cartPopup,
			Search
		},
		data() {
			return {
				categories:[],
				cart: [],
				product: {},
				currentCategoryId: 0,
				notices: [{
						"id": 10,
						"content": "多肉车厘回归，精选当季山东樱桃，颗颗手工去核，入茶清甜消暑，快来下单尝鲜吧~",
						"image_id": 114210,
						"image": "https://go.cdn.heytea.com/2020/02/26/tmp/f5d557b627b640838d0c324bd96eabfb.jpg"
					},
					{
						"id": 7,
						"content": "太妃焦糖爆米花全新上市，焦香十足，美味易爆，快来「喜茶食验室」下单尝鲜吧~",
						"image_id": 104726,
						"image": "https://go.cdn.heytea.com/2020/01/09/tmp/3f393edea5094c1d8f8b524610caa531.jpg"
					}
				],
				productModalVisible: false,
				cartPopupShow: false,
				productsScrollTop: 0,
				showSearch: false
			}
		},
		computed: {
			// ...mapState(['orderType', 'address']),
			productCartNum() {	//计算单个饮品添加到购物车的数量
				return id => this.cart.reduce((acc, cur) => {
						if(cur.id === id) {
							return acc += cur.number
						}
						return acc
					}, 0)
			}
		},
		async onLoad() {
/* 			this.notices = await this.$api('notices')
			console.log(this.notices)
			this.categories = await this.$api('categories')
			console.log(this.categories) */
			this.categories = await this.$api('categories')
			this.currentCategoryId = this.categories.length && this.categories[0].id
			this.$nextTick(() => this.calcSize())
		},
		methods: {
/* 			...mapMutations(['SET_ORDER_TYPE']),
			switchOrderType() {
				if(this.orderType === 'takein') {
					uni.navigateTo({
						url: '/pages/addresses/addresses'
					})
				} else {
					this.SET_ORDER_TYPE('takein')
				}
			}, */
			handleAddToCart(product) {	//添加到购物车
				const index = this.cart.findIndex(item => {
					if(!product.is_single) {
						return (item.id == product.id) && (item.materials_text == product.materials_text)
					} else {
						return item.id === product.id
					}
				})
				
				if(index > -1) {
					this.cart[index].number += (product.number || 1)
					return
				}
				
				this.cart.push({
					id: product.id,
					cate_id: product.category_id,
					name: product.name,
					price: product.price,
					number: product.number || 1,
					image: product.images[0].url,
					is_single: product.is_single,
					materials_text: product.materials_text || ''
				})
			},
			handleMinusFromCart(product) { //从购物车减商品
				let index
				if(product.is_single) {
				   index = this.cart.findIndex(item => item.id == product.id)
				} else {
				   index = this.cart.findIndex(item => (item.id == product.id) && (item.materials_text == product.materials_text))
				}
				this.cart[index].number -= 1
				if(this.cart[index].number <= 0) {
					this.cart.splice(index, 1)
				}
			},
			showProductDetailModal(product) {
				this.product = product
				this.productModalVisible = true
			},
			handleAddToCartInModal(product) {
				this.handleAddToCart(product)
				this.closeProductDetailModal()
			},
			closeProductDetailModal() {
				this.productModalVisible = false
				this.product = {}
			},
			openCartDetailsPopup() {
				this.$refs['cartPopup'].open()
			},
			clearCart() {
				this.cart = []
			},
			handleMenuSelected(id) {
				this.productsScrollTop = this.categories.find(item => item.id == id).top
				this.$nextTick(() => this.currentCategoryId = id)
			},
			productsScroll({detail}) {
				const {scrollTop} = detail
				let tabs = this.categories.filter(item=> item.top <= scrollTop).reverse()
				if(tabs.length > 0){
					this.currentCategoryId = tabs[0].id
				}
			},
			calcSize() {
				let h = 0
				this.categories.forEach(item => {
					let view = uni.createSelectorQuery().select(`#products-${item.id}`)
					view.fields({
						size: true
					}, data => {
						item.top = h
						h += Math.floor(data.height)
						item.bottom = h
					}).exec()
				})
			},
			pay() {
				uni.setStorageSync('cart', this.cart)
				uni.navigateTo({
					url: '/pages/order/list',
					fail(err) {
						console.log(err)
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import './index.scss';
</style>
