<template>
  <el-container>
    <el-header style="width:100%;height: 100%;">
      <el-tabs type="border-card">
        <el-tab-pane label="组织">
          <h3 class="title">组织</h3>
          <el-tree
            node-key="uid"
            load="loadNode"
            class="filter-tree"
            :data="this.$store.state.taskProcessing.assignment"
            :props="defaultProps2"
            :filter-node-method="filterNode"
            @node-click="handleNodeClick"
            @dblclick.native="dbc()"
            ref="tree">
          </el-tree>
        </el-tab-pane>
        <!--        <el-tab-pane label="项目小组">-->
        <!--          <h3 class="title">项目小组</h3>-->
        <!--          <el-tree-->
        <!--            class="filter-tree"-->
        <!--            :data="data3"-->
        <!--            :props="defaultProps"-->
        <!--            :filter-node-method="filterNode"-->
        <!--            ref="tree2">-->
        <!--          </el-tree>-->
        <!--        </el-tab-pane>-->
      </el-tabs>
    </el-header>
    <!--<el-main style="width:100%;height: 100%;">-->
    <!--<el-input placeholder="搜索" prefix-icon="el-icon-search" v-model="input1"></el-input>-->
    <!--</el-main>-->
  </el-container>

</template>

<script>
  export default {
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }

    },
    // computed: {
    //   updataAssignmentData () {
    //     return this.$store.state.taskProcessing.assignment
    //   }
    // },
    methods: {
      // append(data){
      //   console.log(data.uid)
      //   if(data.type != 'GroupMember'){
      //     this.axios.post('apis/getGroup',this.qs.stringify({uid:data.uid,fatherUid:''})
      //     ).then((response)=>{
      //       console.log(response.data.body)
      //       if(response.data.body){
      //         console.log('委派签发人员请求')
      //         let roleData = response.data.body
      //         for(var i =0;i<roleData.length;i++){
      //           roleData[i]['children'] = []
      //         }
      //
      //         let finalRoleData =  this.$store.state.taskProcessing.assignment.children.push(roleData)
      //         this.$store.commit('taskProcessing/saveAssignment',{msg1:finalRoleData
      //         })
      //         console.log(finalRoleData)
      //
      //
      //
      //       }
      //     }).catch((error)  => {
      //       console.log(error)
      //       this.$message.error('委派签发人员tree，请求失败')
      //     })
      //
      //   }
      //
      //
      //   this.$store.commit('taskProcessing/saveAssignmentMes',{msg1:data.name,
      //     msg2:data.uid
      //   })
      // },
      dbc () {
        if (this.$store.state.taskProcessing.nodeType === 'GroupMember') {
          this.axios.post('apis/tc/delegate', this.qs.stringify({
            taskUid: this.$store.state.taskProcessing.rightDetailTaskFist.taskUid,
            groupMemberUid: this.$store.state.taskProcessing.assignmentMes.uid
          }))
            .then((response) => {
              console.log(response.data.body)
              console.log(response)
              if (response) {
                console.log('委派签发选择人员确定按钮')
                // 成功  删除任务，加个提示委派成功
                if (response === 1) {
                  this.$message.success('委派签发成功')
                  this.$store.commit('taskProcessing/saveAssignmentMes', {
                    msg1: '选择人员',
                    msg2: ''
                  })
                  // this.activeName = ''
                  // TODO   head头，任务数量不能实时刷新
                  // 刷新header都的任务数量
                  this.axios.post('apis/tc/number'
                  ).then((response) => {
                    // console.log(response.data.body)
                    let newTask = response.data.body.newTask
                    let backlog = response.data.body.backlog
                    let after = response.data.body.after
                    this.$store.commit('taskProcessing/saveTaskNum', {msg1: newTask, msg2: backlog, msg3: after})
                  }).catch((error) => {
                    console.log(error)
                    this.$message.error('任务数量，请求失败')
                  })
                  // // 刷新
                  // this.reload()
                } else if (response.status === 0) {
                  this.$message.warning('委派签发失败')
                }
              }
            }).catch((error) => {
            console.log(error)
            this.$message.error('delegate请求失败')
          })

          // TODO  后续看需不需要
          // 请求左侧任务
          this.axios.post('apis/tc/task', this.qs.stringify({type: '1'})
          ).then((response) => {
            if (response.data.body) {
              console.log('进入新任务页面前，请求左侧任务')
              var taskTem = response.data.body
              this.$store.commit('taskProcessing/savetaskTemplate', {
                msg1: taskTem
              })
            }
          }).catch((error) => {
            console.log(error)
            this.$message.error('左侧任务，请求失败')
          })

          this.$store.commit('taskProcessing/saveIsClose', {
            msg1: true
          })
        }
      },
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      // // 加载树结点
      // loadNode(node, resolve) {
      //   // 如果是顶级的父节点
      //   if (node.level === 0) {
      //     // 查找顶级对象
      //     typeList(node.level).then(res => {
      //       if (res.Data) {
      //         return resolve(res.Data)
      //       } else {
      //         this.$message.error(res.Msg)
      //       }
      //     }).catch(() => {
      //       let data = []
      //       return resolve(data)
      //     })
      //   } else {
      //     // 根据父节点id找寻下一级的所有节点
      //     typeList(node.data.Id).then(res => {
      //       if (res.Data) {
      //         return resolve(res.Data)
      //       } else {
      //         this.$message.error(res.Msg)
      //       }
      //     }).catch(() => {
      //       let data = []
      //       return resolve(data)
      //     })
      //   }
      // },
      // unique(arr) { // 根据唯一标识orderId来对数组进行过滤
      //   const res = new Map();  //定义常量 res,值为一个Map对象实例
      //   //返回arr数组过滤后的结果，结果为一个数组   过滤条件是，如果res中没有某个键，就设置这个键的值为1
      //   return arr.filter((arr) => !res.has(arr.OrderId) && res.set(arr.OrderId, 1))
      // },
      handleNodeClick (data) {
        // 保存当前节点的ｔｙｐｅ
        this.$store.commit('taskProcessing/saveNodeType', {
          msg1: data.type
        })

        // var chkIds1 = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
        // console.log('父节点id'+chkIds1)

        this.axios.post('apis/getGroup', this.qs.stringify({uid: data.uid, fatherUid: ''})
        ).then((response) => {
          console.log(response.data.body)
          if (response.data.body) {
            console.log('委派签发人员请求')
            var roleData = response.data.body

            var assignmentData = this.$store.state.taskProcessing.assignment
            console.log(assignmentData)
            console.log(assignmentData.length)

            for (var i = 0; i < roleData.length; i++) {
              roleData[i]['children'] = []
              // for(var j=0;j<assignmentData.length;j++){
              //   console.log(assignmentData[j].uid +'*********'+data.uid)
              //   if(assignmentData[j].uid == data.uid){
              //     assignmentData[j].children.push(roleData[i])
              //   }
              // }
              // this.$refs.tree.remove(data.uid)
              this.$refs.tree.remove(roleData[i])
              this.$refs.tree.append(roleData[i], data)
            }

            // var roleData = {name:'kkkk'}

            this.$store.commit('taskProcessing/saveAssignment', {
              msg1: assignmentData
            })
            console.log(assignmentData)
          }
        }).catch((error) => {
          console.log(error)
          this.$message.error('委派签发人员tree，请求失败')
        })

        this.$store.commit('taskProcessing/saveAssignmentMes', {
          msg1: data.name,
          msg2: data.uid
        })
      }
    },

    data () {
      return {
        filterText: '',
        // data2: '',
        defaultProps2: {
          children: 'children',
          label: 'name'
        }
      }
    }
  }
</script>

<style>
  .title {
    padding: 0;
    margin: 0;
  }
</style>
