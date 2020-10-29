<template>
<view>
	<view>WebSocket Test</view>
	<input type="text" v-model="input" placeholder="请输入内容"></input>
	<button @click="sendBtnClick()" >send</button>
	<button @click="closeWs()" >close</button>
	<view v-for="(v,k) in output" :key="k" :style="{color:v.color}">
		output:{{v.data}}
	</view>
</view>
</template>
<script>
	var socketOpen = false;
	var pingTime = 10000;//10s
	var socketMsgQueue = [];
	var wsuri = 'ws://127.0.0.1:7777/ws?name=aaa&id=112&roomid=10&openid=wxalxklakw'+Math.random()*10000
	export default{
		data(){
			return{
				output:[],
				flag:false,//链接情况
				input:"",
				heartTimer:null,// 心跳句柄 如果服务器连接不可用 则重新连接
			}
		},
		mounted:function(){
			let that = this
			this.createWs()
			uni.onSocketOpen(function (res) {
			  console.log('WebSocket连接已打开！');
				 socketOpen = true;
				 // 开始心跳
			   that.heartTimer = setInterval(() => {
							 // if( user ){
								 console.log((new Date()).getTime())
									if(that.flag)  that.doSend("ping",(new Date()).getTime())
							 // }
					},pingTime)
				  for (var i = 0; i < socketMsgQueue.length; i++) {
				    that.writeToScreen(socketMsgQueue[i]);
				  }
				  socketMsgQueue = [];
			});
			//收到服务器内容
			uni.onSocketMessage(function (res) {
				console.log(res)
			  console.log('收到服务器内容：' + res.data);
				data = JSON.parse(res.data)
				console.log(data)
				if(data.type == 4){
					//ping 就不返回
					return
				}
				that.writeToScreen(res.data)
			});
			//监听关闭
			uni.onSocketClose(function (res) {
			  console.log('WebSocket 已关闭！');
				alert("服务器开小差了~")
				that.clearHeart()
			});
			uni.onSocketError(function (res) {
			  console.log('WebSocket连接打开失败，请检查！');
				alert("服务器连接失败~")
				that.reConnect()
			});
		},
		methods:{
			//建立ws链接
			createWs(){
				uni.connectSocket({
						url: wsuri,
						success: () => {
								console.log('建立连接成功')
								this.flag = true
	/* 							typeof success === 'function' && success()
								console.log('开始心跳...')
								this._clearHeart();
								this._startHeart(); */
						},
						fail: (err) => {
								console.log('建立连接失败',err);
						}
	/* 			    data() {
								return {
										x: '',
										y: ''
								};
						},
						header: {
								'content-type': 'application/json'
						},
						protocols: ['protocol1'],
						method: 'GET' */
				});
			},
			//发送
			doSend(event,data) {
					let message = {
						event:event,
						data:data
					};
				
			    if (socketOpen) {
			        uni.sendSocketMessage({
			          data: JSON.stringify(message),
								success: (res) => {
											console.log(JSON.stringify(message))
											console.log(res,'sendSocketMessage成功..')
								},
								fail: (fail) => {
										that.reConnect();
										console.log(res,'sendSocketMessage失败..')
								}
			        });
			      } else {
			        socketMsgQueue.push(msg);
			      }
			},
			//显示接受的消息
			writeToScreen(data) {
			    this.output.push({data:data}) 
			},
		
			sendBtnClick(){
			    this.doSend("send",this.input);
			    this.input = '';
			},
			//关闭心跳
			clearHeart(){
				clearInterval(this.heartTimer)
				this.heartTimer = null
			},
			// 主动关闭
			closeWs () {
			    this.clearHeart();
			    uni.closeSocket();
			},
			//重连
			reConnect(url) {
					if (!flag) {
							return;
					}
					flag = false;
					setTimeout(function () {
							this.createWs();
							flag = true;
					}, 2000)
			}
		},
	}
</script>
<style>
</style>
