import { isJson } from '@/utils/socket/helper.js' // 见下方
import jwt from '@/utils/auth/jwt.js' // 管理用户登陆信息的js，见其他文章
var Pool = {};   // Promise池
var IsConnected = false;    // 是否connect成功;
var IsOpen = false;     // 是否打开,必须open之后才能发送消息;
var IsLogin = false;    //是否登录到socket进行fd绑定
var heartTimer = null;      // 心跳句柄 如果服务器连接不可用 则重新连接
var reConnectTimer = null;   // 重连句柄
var user=null; // 用户
var callback={}; // 自定义事件
var that;

export default class PromiseWebSocket
{
    config = {
        url: '',
        debug: false,
        reConnectTime: 5000, // 断线重连检测时间间隔
        heartTime: 1 * 60 * 1000, //心跳间隔
    };

    // socket 重连
    _connectionLoop () {
        reConnectTimer = setInterval(
            () => {
                if( getApp().globalData.isLogin !== true ){
                    this.config.debug && console.warn('用户未登录!');
                    return;
                }
                if (!IsConnected || !IsOpen || !IsLogin) {
                    this.config.debug && console.log('连接中..')
                    this.initSocket(
                        function () {
                            user = jwt.getUser();
                            if(user){
                                that._send('login',{u: 'user:'+ user.user_id, token: user.socket_token}).then(res=>{
                                    IsLogin = true;
                                    uni.showToast({icon:'none',title: '上线成功',duration:2000});
                                }).catch(err=>{
                                    IsLogin = false;
                                });
                            }
                        }
                    )
                }else{
                    this.config.debug && console.log('连接正常')
                }
            }, 
            this.config.reConnectTime
        )
    }

    // ----------初始化websocket连接----------
    initSocket (success) {
        if (IsConnected) {
            this.config.debug && console.log('已经建立连接')
            if(IsOpen){
                // 必须在open之后才能发送消息
                typeof success === 'function' && success()
            }
            return
        }
        uni.getNetworkType({
            success: (res) => {
                if (res.networkType === 'none') {
                    this.config.debug && console.log('网络异常，无法连接');
                } else {
                    this.config.debug && console.log('网络正常,开始建立连接...');
                    uni.connectSocket({
                        url: this.config.url,
                        success: () => {
                            IsConnected = true;
                            this.config.debug && console.log('建立连接成功')
                            typeof success === 'function' && success()
                            this.config.debug && console.log('开始心跳...')
                            this._clearHeart();
                            this._startHeart();
                        },
                        fail: (err) => {
                            this.config.debug && console.log('建立连接失败',err);
                        }
                    });
                }
            }
        })
    }

    constructor(config){
        that = this;
        this.config = {
            url: config.url,
            debug: config.debug || this.config.debug,
            reConnectTime: config.reConnectTime || this.config.reConnectTime,
            heartTime: config.heartTime || this.config.heartTime
        };

        uni.onSocketOpen((header) => {
            IsConnected = true;
            IsOpen = true;
            this.config.debug && console.log('socket打开成功')
        })

        uni.onSocketMessage((e) => {
            try{
                const msg = isJson(e.data);
                if(!msg){
                    this.config.debug && console.log('不是json对象'); return;
                }else{
                    this.config.debug && console.log('收到消息:', msg)
                }
                const type = msg['type'];
                if( type == 'app' ){
                    let event = msg['event'];
                    if( callback.hasOwnProperty(event) ){
                        callback[event](msg);
                    }
                }
                else if( type == 'respon' ){
                    let uuid = msg['event'];
                    if(!uuid){
                        this.config.debug && console.log('响应缺少event参数');
                        return;
                    }
                    if( !Pool[uuid] ){
                        this.config.debug && console.log('pool池中没有该event');
                        return;
                    }
                    let data = msg['data'] || null
                    if (data.error === 0) {
                        Pool[uuid].resolve(data);
                    } else {
                        Pool[uuid].reject(data);
                    }
                    delete Pool[uuid]
                }
                else if( type == 'ping' ){
                    this._response( msg['uuid'] )
                }else{
                    this.config.debug && console.log('缺少type参数或无此事件！');
                }
            }catch (e) {
                //console.log('socket on message',e)
            }
        })

        uni.onSocketError((res) => {
            this.config.debug && console.error('发生错误', res)
            this._close();
        })

        uni.onSocketClose((res) => {
            this.config.debug && console.error('连接被关闭', res)
            this._close();
        })

        // 监听网络状态
        uni.onNetworkStatusChange((res) => {
            if (res.isConnected) {
                this.config.debug && console.log('监听到有网络服务')
            } else {
                this.config.debug && console.log('监听到没有网络服务')
            }
        })
    }

    // 清理心跳
    _clearHeart () {
      clearInterval(heartTimer)
      heartTimer = null
    }

    // 开始心跳
    _startHeart () {
        heartTimer = setInterval(() => {
            if( user ){
                this._send('ping').then(res=>{
                    IsLogin = true;
                    this.config.debug && console.log('socket身份验证正常');
                }).catch(err=>{
                    IsLogin = false;
                    this.config.debug && console.log('socket身份验证失败重新登入');
                });
            }
        }, this.config.heartTime)
    }

    /**
     * 发送socket消息
     * @param string event 事件名称 ask 响应式问答 | ping
     * @param object data  请求数据 必须json对象或者空对象{}或者不传值
     * @param object extraData  同级附加参数 注意event,data会被覆盖
     */
    _send (event, data) {
        let message = { event, data };
        const uuid = (new Date()).getTime();
        return new Promise((resolve, reject) => {
            if ( IsConnected && IsOpen ) {
                if (!Pool[uuid]) {
                    Pool[uuid] = { message, resolve, reject }
                }
                this.config.debug && console.log('发送消息:',  message);
                message.uuid = uuid;
                uni.sendSocketMessage({
                    data: JSON.stringify(message),
                    success: (res) => {
                        that.config.debug && console.log(res,'sendSocketMessage成功..')
                    },
                    fail: (fail) => {
                        that._close();
                        that.config.debug && console.log(res,'sendSocketMessage失败..')
                    }
                })
            } else {
                this.config.debug && console.log('PING..socket 未打开:',  message);
            }
      })
    }

    // 响应服务器端主动ping
    _response(uuid){
        if(!uuid){
            this.config.debug && console.log('缺少uuid');return;
        }
        let event = 'response';
        let message = {event};
        message.uuid = uuid;
        if(IsConnected && IsOpen){
            uni.sendSocketMessage({
                data: JSON.stringify(message),
                success: (res) => {
                    that.config.debug && console.log(res,'发送响应成功..');
                },
                fail: (fail) => {
                    that._close();
                    that.config.debug && console.log(fail,'发送响应失败..');
                }
            })
        }else{
            this.config.debug && console.log('RESPONSE..socket 未打开:',  message);
        }
    }

    // 主动关闭
    _close (option) {
        IsConnected = false;
        IsOpen = false;
        IsLogin = false;
        Pool = {};
        this._clearHeart();
        uni.closeSocket(option);
    }
    // 添加自定义事件
    on (event,func){
        if(typeof func === 'function'){
            callback[event] = func;
        }
    }
    // 移除自定义事件
    uninstall (event){
        delete(callback[event]);
    }

}