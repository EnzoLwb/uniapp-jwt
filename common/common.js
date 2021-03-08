import jwt from '@/utils/auth/jwt.js'; // jwt 管理 见下文
export default {
	memberObj:{
			name:'初始姓名',
	},
	//通用网络请求failed显示
	catchErr(err,that){
		console.log(err)
		if(err=="401" || err.statusCode=="401"){that.$refs.cust.openLogInPop()}//显示登陆框
		if(err.statusCode=="400"){
			uni.showToast({
			    icon: "none",
			    title: err.data.message == '' ? "服务器开小差了":err.data.message,
			    duration:2000,
			});
		}
	},
	checkLogin(){
	    var TOKEN  = jwt.getAccessToken();
	    var userInfo  = jwt.getUser();
	    return TOKEN && userInfo
	},
	setMemberObj(data){
			this.memberObj = Object.assign({},this.memberObj,data)
	},
	checkPhone(phone){
	    if(!(/^1[3456789]\d{9}$/.test(phone))){ 
	        return false; 
	    } 
			return true
	},
	checkEmail(email){
	    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
	    if(re.test(email)){
	        return true
	    }else{
	        return false; 
	    }
	},
	getTime(){
	    let date = new Date();
	    let y = date.getFullYear();
	    let MM = date.getMonth() + 1;
	    MM = MM < 10 ? ('0' + MM) : MM;
	    let d = date.getDate();
	    d = d < 10 ? ('0' + d) : d;
	    let h = date.getHours();
	    h = h < 10 ? ('0' + h) : h;
	    let m = date.getMinutes();
	    m = m < 10 ? ('0' + m) : m;
	    let s = date.getSeconds();
	    s = s < 10 ? ('0' + s) : s;
	   return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
	},
	originReserveTime(){
		var curDate = new Date();
		let date = new Date(curDate.getTime() + 24*60*60*1000);
		// let y = date.getFullYear();
		let MM = date.getMonth() + 1;
		MM = MM < 10 ? ('0' + MM) : MM;
		let d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var day = "周" + "日一二三四五六".charAt(date.getDay());
		return  MM + '月' + d + "日"+ "	" + day
	},
	latestDay(){
		//获取系统当前时间
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var oneDayTime = 24*60*60*1000 ; 
		var dateArr = new Array()
		var weekend = new Array()
		var putArr = new Array()
		var multiShow = new Array()
		for(var i = 0 ; i < 8 ; i++){
			//显示周一
			var ShowTime = nowTime + (i)*oneDayTime ; 
			//初始化日期时间
			var myDate = new Date(ShowTime); 
			var month=myDate.getMonth()+1;  
			month = month < 10 ? ('0' + month) : month;
			var date=myDate.getDate(); 
			date = date < 10 ? ('0' + date) : date;
			var day = "周" + "日一二三四五六".charAt(myDate.getDay());
			var d = month+"月"+date+"日"
			var put = month+"-"+date
			
			dateArr.push(d)
			putArr.push(put)
			weekend.push(day)
			multiShow.push(d + "	" + day)
		}
		let mulData = {
			date:dateArr,
			weekend:weekend,
			multiShow:multiShow,
			putArr:putArr,
		}
		return mulData
	},
	adminReserveDateList(){
		//获取系统当前时间
		var now = new Date(); 
		var nowTime = now.getTime() ; 
		var oneDayTime = 24*60*60*1000 ; 
		var putArr = new Array()
		for(var i = -1 ; i < 8 ; i++){
			//显示周一
			var ShowTime = nowTime + (i)*oneDayTime ; 
			//初始化日期时间
			var myDate = new Date(ShowTime); 
			var month=myDate.getMonth()+1;  
			month = month < 10 ? ('0' + month) : month;
			var date=myDate.getDate(); 
			date = date < 10 ? ('0' + date) : date;
			var day = "日一二三四五六".charAt(myDate.getDay());
			var put = month+"."+date
			
			putArr.push(put+day)
		}
		return putArr
	},
	
}