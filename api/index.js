import categories from './categories.js'
import notices from './notices.js'
import hotSearch from './hotSearch.js'
import historySearch from './historySearch.js'
import boardcast from './boardcast.js'
import hotList from './hotList.js'
import drama from './drama.js'

const json = {
	categories,
	drama,
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