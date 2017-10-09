/**
 * Created by xiezg on 2017/3/10.
 */

import 'es6-promise/auto'
import Vue from 'vue'
import App from '~pages/App.vue'
import storeFactory from './store/index'
import router from './router'
import { sync } from 'vuex-router-sync'
import vueTap from 'v-tap'
// import platform from '~common/platform'
const store = storeFactory()
sync(store, router)
Vue.use(vueTap)

const app = new Vue(Object.assign({
    router,
    store,
    _hmt: []
}, App))

app.$mount('#app')

// platform.ready(() => {
//     if (window.EsApp) {
//         EsApp.invoke('titleBar', {isShow: 0})
//     }
//     app.$mount('#app')
// })
//
// platform.dataChanged(() => {
//     location.reload()
// })

export { app, router, store }
