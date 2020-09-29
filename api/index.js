import categories from './categories.js'
import notices from './notices.js'
import hotSearch from './hotSearch.js'
import historySearch from './historySearch.js'


const json = {
	categories,
	notices,
	historySearch,
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