import Vue from 'vue'
import Vuex from 'vuex'
import taskProcessing from './modules/taskProcessing'
import documentEnquiry from './modules/documentEnquiry'
import multipleSiteCollaboration from './modules/multipleSiteCollaboration'
import login from './modules/login'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  supportCircular: true
})

const store = new Vuex.Store({
  modules: {
    taskProcessing,
    documentEnquiry,
    multipleSiteCollaboration,
    login
  },
  //  配置，F5刷新，持久化保存
  plugins: [vuexLocal.plugin]

})
export default store
