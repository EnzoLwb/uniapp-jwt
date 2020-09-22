import Vue from 'vue'
import App from './App'
import com from './common/common.js'
import { http} from '@/utils/luch-request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改

Vue.prototype.$http = http

Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$common = com;//引入公共文件
const app = new Vue({
    ...App
})
app.$mount()
