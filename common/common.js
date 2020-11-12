import jwt from '@/utils/auth/jwt.js'; // jwt 管理 见下文
export default {
	base_url : 'https://test.zhichang.iduoye.cn/jobs/',// http://jobs.ps/jobs/ 别少/!
	login_url : 'https://zhichang.iduoye.cn/jobs/', // https://app.tysxpt.com/volunteer/api/ 正式地址  
	memberObj:{
			name:'初始姓名',
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
			
			dateArr.push(d)
			weekend.push(day)
			multiShow.push(d + "	" + day)
		}
		let mulData = {
			date:dateArr,
			weekend:weekend,
			multiShow:multiShow,
		}
		return mulData
	},
	
}