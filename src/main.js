// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import axios from 'axios'
import qs from 'qs'
import store from './store'
import App from './App'
import 'babel-polyfill'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.component('icon', Icon)
Vue.prototype.axios = axios
Vue.prototype.qs = qs
Vue.prototype.bus = new Vue()

axios.defaults.withCredentials = true
/* eslint-disable no-new */

// 若没有登陆，则跳转到首页
// router.beforeEach((to, from, next) => {
//   if (to.path === '/Login') {
//     next()
//     return
//   }
//   if (store.state.login.isLogin) {
//     next()
//   } else {
//     next({
//       path: '/Login'
//     })
//   }
// })

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

/*
new Vue({
  router,
  render: h => h(home)
}).$mount('#app')
*/
