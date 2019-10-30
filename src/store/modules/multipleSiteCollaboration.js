const multipleSiteCollaboration = {
  namespaced: true,
  state: {
    // 多站点名称数组(所有)
    siteName:'',
    // 当前点击多站点名称
    currentSiteName:'',
    logPage: {
      totalElements: 0,
      pageSize: 10,
      currentPage: 1
    },
    errorInfoPage: {
      totalElements2: 0,
      pageSize2: 10,
      currentPage2: 1
    }
  },
  mutations: {
    saveState (state,msg) {
      state.siteName = msg.msg1
    },
    saveCurrentSiteName (state,msg) {
      state.currentSiteName = msg.msg1
    },
    saveLogPage (state,msg) {
      state.logPage.totalElements = msg.msg1
      state.logPage.pageSize = msg.msg2
      state.logPage.currentPage = msg.msg3
    },
    saveErrorInfoPage (state,msg) {
      state.errorInfoPage.totalElements2 = msg.msg1
      state.errorInfoPage.pageSize2 = msg.msg2
      state.errorInfoPage.currentPage2 = msg.msg3
    }
  },
  actions: {

  },
  getters: {

  }
}

export default multipleSiteCollaboration
