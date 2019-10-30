const taskProcessing = {
  namespaced: true,
  state: {
    taskNum: {
      newTaskNum: '0',
      commissionTaskNum: '0',
      trackingTaskNum: '0'
    },
    taskTemplate: {
    },
    trackingTask: {
    },
    allTask: {
    },
    rightDetailTaskFist: {
      job_name: '',
      task_state: '',
      parent_name: '',
      responsible_party: {
        object_string: ''
      },
      // 流程uid
      taskUid: '',
      time: ''
    },
    rightDetailTaskSecond: {
      uiChildren: []
    },
    rightDetailTaskThree: {
    },
    rightDetailTaskFourth: {
    },
    // 委派签发
    assignment: [],
    // 委派签发选中人员、uid
    assignmentMes: {
      name: '选择人员',
      uid: ''
    },
    // 审批文件，获取word pdf文件信息
    bomMes: [],
    // 获取word pdf文件信息
    wordMes: [],
    // el-tree当前节点的ｔｙｐｅ
    nodeType: '',
    // assignmentDialog 关闭窗口参数
    isClose: false,
    // lastRound
    lastRoundNumFile: ''
  },
  mutations: {
    saveTaskNum (state, msg) {
      state.taskNum.newTaskNum = msg.msg1
      state.taskNum.commissionTaskNum = msg.msg2
      state.taskNum.trackingTaskNum = msg.msg3
    },
    savetaskTemplate (state, msg) {
      state.taskTemplate = msg.msg1
      // state.taskTemplate.object_type = msg.msg1
      // state.taskTemplate.task_template.object_string = msg.msg2
      // state.taskTemplate.task_template.uid = msg.msg3
      // state.taskTemplate.task_template.template_name = msg.msg4
      // state.taskTemplate.creation_date = msg.msg5
      // state.taskTemplate.object_string = msg.msg6
      // state.taskTemplate.uid = msg.msg7
      // state.taskTemplate.job_name = msg.msg8
      // state.taskTemplate.object_name = msg.msg9
    },
    savetrackingTask (state, msg) {
      state.trackingTask = msg.msg1
    },
    saveAllTask (state, msg) {
      state.allTask = msg.msg1
    },
    saveRightDetailTask (state, msg) {
      state.rightDetailTaskFist.job_name = msg.msg1
      state.rightDetailTaskFist.task_state = msg.msg2
      state.rightDetailTaskFist.parent_name = msg.msg3
      state.rightDetailTaskFist.responsible_party.object_string = msg.msg4
      state.rightDetailTaskFist.taskUid = msg.msg5
      state.rightDetailTaskFist.time = msg.msg6
    },
    saveAssignment (state, msg) {
      // if(msg.msg2.length < 0){
        state.assignment = msg.msg1
      // }else {
      //   state.assignment = msg.msg1
      //   state.assignment.push(msg.msg2)
      // }
    },
    saveAssignmentMes (state, msg) {
      state.assignmentMes.name = msg.msg1
      state.assignmentMes.uid = msg.msg2
    },
    saveBomMes (state, msg) {
      state.bomMes = msg.msg1
    },
    saveWordMes (state, msg) {
      state.wordMes = msg.msg1
    },
    saveNodeType (state, msg) {
      state.nodeType = msg.msg1
    },
    saveIsClose (state, msg) {
      state.isClose = msg.msg1
    },
    savaLastRoundNumFile (state, msg) {
      state.lastRoundNumFile = msg.msg1
    }
  },
  actions: {

  },
  getters: {
    updataAssignmentData (state) {
      return state.assignment
    },
    updataIsClose (state) {
      return state.isClose
    }
  }
}

export default taskProcessing
