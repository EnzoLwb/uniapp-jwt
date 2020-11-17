import Vue from 'vue'
import App from './App'
import com from './common/common.js'
import api from './api'
import store from './store'

import { http} from '@/utils/luch-request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改
import cuCustom from './colorui/components/cu-custom.vue'
import loadingModal from './components/modal/load-modal.vue'
import defaultQue from './components/nomore/default.vue'

Vue.component('cu-custom',cuCustom)
Vue.component('load-modal',loadingModal)
Vue.component('default-que',defaultQue)

Vue.prototype.$http = http
Vue.prototype.$api = api
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$common = com;//引入公共文件
const app = new Vue({
    ...App
})
app.$mount()
