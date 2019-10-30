const login = {
  namespaced: true,
  state: {
    resposeMessage: {
      token: '',
      resToken: '',
      time: '',
      organization: 'zhangsan'
    },
    tcUserMes: {
      username: ''
    },
    isDBA: '',
    isLogin: false

  },
  mutations: {
    savetoken (state, msg) {
      state.resposeMessage.token = msg.msg1
      state.resposeMessage.resToken = msg.msg2
      state.resposeMessage.time = msg.msg3
      state.resposeMessage.organization = msg.msg4
    },
    savetcUserMes (state, msg) {
      state.tcUserMes.username = msg.msg1
    },
    saveIsDBA (state, msg) {
      state.isDBA = msg.msg1
    },
    saveIsLogin (state, msg) {
      state.isLogin = msg.msg1
    }
  },
  actions: {

  },
  getters: {

  }
}

export default login
