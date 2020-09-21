import Vue from 'vue'
import App from './App'
import com from './common/common.js'
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$common = com;//引入公共文件
const app = new Vue({
    ...App
})
app.$mount()
