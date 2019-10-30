const documentEnquiry = {
  namespaced: true,
  state: {
    query: {
      queryName: ''
    },
    queryCondition: {
    },
    queryConditionUid: {
      uid: ''
    },
    paging: {
      totalElements: 0,
      pageSize: 10,
      currentPage: 1,
      objectUIDS:''
    },
    pagingParameters: {
      entryNames: '',
      entryValues: ''
    },
    treeBomData: [],
    fileName:'',

    // 保存文档查询结果点击的那条数据,tableHeader
    searchRow:'',
    searchTableHeader:'',

    // 查询结果属性 请求
    resultPropety:'',
  },
  mutations: {
    saveQuery (state, msg) {
      state.query.queryName = msg.msg1
    },
    saveQueryCondition (state, msg) {
      state.queryCondition = msg.msg1
    },
    saveQueryCondeitionUid (state, msg) {
      state.queryConditionUid.uid = msg.msg1
    },
    savePaging (state, msg) {
      state.paging.totalElements = msg.msg1
      state.paging.pageSize = msg.msg2
      state.paging.currentPage = msg.msg3
      state.paging.objectUIDS = msg.msg4
    },
    savePagingParameters (state, msg) {
      state.pagingParameters.entryNames = msg.msg1
      state.pagingParameters.entryValues = msg.msg2
    },
    saveTreeBomData (state, msg) {
      state.treeBomData = msg.msg1
    },
    saveFileName (state, msg) {
      state.fileName = msg.msg1
    },
    saveSearchRow (state, msg) {
      state.searchRow = msg.msg1
    },
    saveSearchTableHeader (state, msg) {
      state.searchTableHeader = msg.msg1
    },
    saveResultPropety (state, msg) {
      state.resultPropety = msg.msg1
    }

  },
  actions: {

  },
  getters: {

  }
}

export default documentEnquiry
