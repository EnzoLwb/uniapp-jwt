<template>
<view>
	<view>WebSocket Test</view>
	<input type="text" v-model="input" placeholder="请输入内容"></input>
	<button @click="sendBtnClick()" >send</button>
	<button @click="closeBtnClick()" >close</button>
	<view v-for="(v,k) in output" :key="k" :style="{color:v.color}">
		output:{{v.data}}
	</view>
</view>
</template>
<script>
	var socketOpen = false;
	var socketMsgQueue = [];
	export default{
		data(){
			return{
				output:[],
				input:"",
			}
		},
		mounted:function(){
			let that = this
			uni.connectSocket({
			    url: 'ws://127.0.0.1:7777/ws?name=aaa&id=112',
					success: () => {
							console.log('建立连接成功')
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
			uni.onSocketOpen(function (res) {
			  console.log('WebSocket连接已打开！');
				 socketOpen = true;
				  for (var i = 0; i < socketMsgQueue.length; i++) {
				    that.writeToScreen(socketMsgQueue[i]);
				  }
				  socketMsgQueue = [];
			});
			//收到服务器内容
			uni.onSocketMessage(function (res) {
				console.log(res)
			  console.log('收到服务器内容：' + res.data);
				that.writeToScreen(res.data)
			});
		},
		methods:{
			//发送
			doSend(msg) {
			    if (socketOpen) {
			        uni.sendSocketMessage({
			          data: msg
			        });
			      } else {
			        socketMsgQueue.push(msg);
			      }
			},
			//显示接受的消息
			writeToScreen:function(data) {
				console.log("writeToScreen:"+data)
			    this.output.push({data:data}) 
			},
		
			sendBtnClick(){
			    this.doSend(this.input);
			    this.input = '';
			},
			closeBtnClick(){
			    uni.onSocketClose(function (res) {
			      console.log('WebSocket 已关闭！');
			    });
			},
		},
	}
</script>
<style>
</style>
