import notices from './notices.js'
import hotSearch from './hotSearch.js'
import historySearch from './historySearch.js'
import boardcast from './boardcast.js'
import hotList from './hotList.js'
import drama from './drama.js'
import myGroup from './myGroup.js'
import admin from './admin.js'
import adminUserList from './adminUserList.js'
import finance from './finance.js'
import recharge from './recharge.js'
import groups from './groups.js'
import kaiben from './kaiben.js'
import dms from './dms.js' //DM管理
import dmAdmin from './dmAdmin.js' //我的DM管理

const json = {
	drama,
	dms,
	admin,
	dmAdmin,
	kaiben,
	finance,
	recharge,
	groups,
	adminUserList,
	myGroup,
	notices,
	historySearch,
	boardcast,
	hotList,
	hotSearch,
}

export default (name, loading = true) => {
	if(loading) {
		uni.showLoading()
	}
	
	return new Promise(resolve => {
		setTimeout(() => {
			uni.hideLoading()
			resolve(json[name])
		}, 500)
	})
}