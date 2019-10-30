<template>
  <el-container style="height:100%;width:100%;" id="box">
    <el-aside class="taskAside" id="leftAside">
      <div style="text-align: center;line-height: 0px;">
        <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="search"
                  @keyup.enter.native="onSubmit"></el-input>
        <el-menu default-active="2" class="el-menu-vertical-demo">
          <el-menu-item v-for="item in this.$store.state.taskProcessing.trackingTask" :index="item.uid"
                        @click="itemclick(item)">
            <!--:index="item.job_name" @click="itemclick(item)"-->
            <div>
              <img src="../assets/vue01.png">
            </div>
            <div>
              <h6>{{item.job_name}}</h6>
              <p>
                {{item.object_name}}<br>
                开始时间：{{item.creation_date}}
              </p>
            </div>
          </el-menu-item>
        </el-menu>
      </div>
    </el-aside>

    <el-main class="taskMain" id="rightMain">
      <el-tabs v-model="activeName" tabPosition="top">
        <el-tab-pane label="概述" name="first" style="height:600px;overflow-y:auto;overflow-x:hidden;">
          <el-form label-width="90px">
            <el-form-item label="名称：">
              <el-input disabled style="width: 100%"
                        v-model="this.$store.state.taskProcessing.rightDetailTaskFist.job_name"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-input disabled style="width: 100%"
                        v-model="this.$store.state.taskProcessing.rightDetailTaskFist.task_state"></el-input>
            </el-form-item>
            <el-form-item label="任务：">
              <el-input disabled style="width:  100%"
                        v-model="this.$store.state.taskProcessing.rightDetailTaskFist.parent_name"></el-input>
            </el-form-item>
            <el-form-item label="所有者：">
              <el-button type="text" style="margin: 0px;color:black;font-size: 14px;">
                {{this.$store.state.taskProcessing.rightDetailTaskFist.responsible_party.object_string}}
              </el-button>
            </el-form-item>
            <el-form-item label="审核内容：">
              <!--              <el-button type="text" style="margin: 0px;color: #409EFF;font-size: 14px;"  @click="clearAPaper">审批文件</el-button>-->
              <Modi-Tree :data="data" :props="defaultProps" @node-click="handleNodeClick"
                         default-expand-all></Modi-Tree>
              <el-dialog
                title="审核内容"
                :visible.sync="dialogVisible5"
                width="50%">
                <!--                <el-tree :data="data5" :props="defaultProps5" @node-click="handleNodeClick5" default-expand-all></el-tree>-->
                <el-table
                  :data="data5"
                  style="width: 100%"
                  @row-click="handleNodeClick5">
                  <el-table-column
                    prop="datasetName"
                    label="数据名称">
                  </el-table-column>
                  <el-table-column
                    prop="fileName"
                    label="文件名">
                  </el-table-column>
                  <!--                  <el-table-column-->
                  <!--                    prop="fileSize"-->
                  <!--                    label="文件大小">-->
                  <!--                  </el-table-column>-->
                  <el-table-column
                    prop="fileType"
                    label="类型">
                  </el-table-column>
                  <el-table-column
                    prop="last_mod_date"
                    label="日期">
                  </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
              </span>
              </el-dialog>

            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!--        <el-tab-pane label="审批文件" name="second">-->
        <!--          <div>-->
        <!--            <tree-table :data="data" :columns="columns" border/>-->
        <!--          </div>-->
        <!--        </el-tab-pane>-->
        <el-tab-pane label="审签信息" name="fourth">
          <el-table :data="auditTableData" border style="width: 100%" row-key="id" :tree-props="{children: 'child'}"
                    default-expand-all height="600">
            <!--            <el-table-column prop="serialNum" label="序号"  width="100%">-->
            <!--              <template scope="scope"> <span>{{scope.$index + 1}} </span> </template>-->
            <!--            </el-table-column>-->
            <el-table-column prop="numbOfSheaves" label="轮数" width="93">
            </el-table-column>
            <el-table-column prop="object_string" label="节点" width="203">
            </el-table-column>
            <el-table-column prop="responsible_party_object_string" label="审核者" width="130">
            </el-table-column>
            <el-table-column prop="last_mod_date" label="时间" width="140">
            </el-table-column>
            <el-table-column prop="comments" label="意见">
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="流程信息" name="five">
          <el-table :data="processTableData" border style="width: 100%" height="600">
            <el-table-column prop="serialNum" label="序号" width="50">
              <template scope="scope"><span>{{scope.$index + 1}} </span></template>
            </el-table-column>
            <el-table-column prop="object_string" label="流程节点" width="203">
            </el-table-column>
            <el-table-column prop="responsible_party_object_string" label="责任人" width="130">
            </el-table-column>
            <el-table-column prop="last_mod_date" label="最后的审批时间" width="140">
            </el-table-column>
            <el-table-column prop="task_state" label="状态" width="80">
            </el-table-column>
            <el-table-column prop="comments" label="意见">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <div id="divisionLine"></div>
  </el-container>
</template>
<script>
  import AssDialog from '@/components/AssignmentDialog'
  import {ntkoBrowser, ExtensionInstalled, NtkoiTop, NtkoiLeft} from './TreeTable/ntkobackground.min.js'
  import treeTable from './TreeTable2'
  import modificationTree from './modificationTree'

  export default {
    components: {
      'tree-table': treeTable,
      'assdialog': AssDialog,
      'Modi-Tree': modificationTree
    },
    inject: ['reload'],
    data () {
      return {
        search: '',
        dialogVisible: false,
        dialogVisible5: false,
        activeName: '',

        auditTableData: '',
        processTableData: '',
        ruleForm: {
          resource: ''
        },
        columns: [
          {
            text: 'BOM行',
            value: 'fileName',
            width: 300
          },
          {
            text: '日期',
            value: 'time'
          },
          {
            text: '操作',
            value: 'operation'
          }
        ],
        data: [],
        data5: [],
        defaultProps: {
          // children: 'uiChildren',
          children: 'child',
          label: 'fileName'
        },
        defaultProps5: {
          // children: 'uiChildren',
          children: 'child',
          label: 'fileName'
        }
      }
    },
    mounted: function () {
      // 请求等待
      const loading = this.$loading({
        lock: true,
        text: '查询中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      // 请求左侧任务
      this.axios.post('apis/tc/task', this.qs.stringify({type: '2'})
      ).then((response) => {
        console.log('进入跟踪任务页面前，请求左侧任务')
        this.$store.commit('taskProcessing/savetrackingTask', {
          msg1: response.data.body
        })
        //  loading 请求等待
        loading.close()
      }).catch((error) => {
        //  loading 请求等待
        loading.close()
        console.log(error)
        this.$message.error('请求失败')
      })

      // 清除概述数据
      this.$store.commit('taskProcessing/saveRightDetailTask', {
        msg1: '',
        msg2: '',
        msg3: '',
        msg4: '',
        msg5: '',
        msg6: ''
      })

      // 分隔栏
      let oBox = $('box')
      let oTop = $('leftAside')
      let oBottom = $('rightMain')
      let oLine = $('divisionLine')
      oLine.onmousedown = function (e) {
        let disX = (e || event).clientX
        oLine.left = oLine.offsetLeft
        document.onmousemove = function (e) {
          let iT = oLine.left + ((e || event).clientX - disX)
          e = e || window.event
          let tarnameb = e.target || e.srcElement
          let maxT = oBox.clientWight - oLine.offsetWidth
          oLine.style.margin = 0
          iT < 0 && (iT = 0)
          iT > maxT && (iT = maxT)
          oLine.style.left = oTop.style.width = iT + 'px'
          oBottom.style.width = oBox.clientWidth - iT + 'px'
          $('msg').innerText = 'leftAside.width:' + oLine.style.width + '---rightMain.width:' + oBottom.style.width + '---oLine.offsetLeft:' + oLine.offsetLeft + '---disX:' + disX + '---tarnameb:' + tarnameb.tagName
          return false
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          oLine.releaseCapture && oLine.releaseCapture()
        }
        oLine.setCapture && oLine.setCapture()
        return false
      }
    },
    methods: {
      // 审核内容
      handleNodeClick5 (data) {
        if (data.fileType) {
          // 判断插件是否安装
          var ntkoed = ntkoBrowser.ExtensionInstalled()
          if (ntkoed) {
            ntkoBrowser.openWindow('/static/html/editindex.html?id=' + data.uid + '&fileType=pdf&username=' + this.$store.state.login.tcUserMes.username + '&fileName=' + data.fileName + '&taskId=' + this.$store.state.taskProcessing.rightDetailTaskFist.taskUid + '&path=' + escape(data.path))
            // ntkoBrowser.openWindow
          } else {
            var iTop = ntkoBrowser.NtkoiTop() // 获得窗口的垂直位置;
            var iLeft = ntkoBrowser.NtkoiLeft() // 获得窗口的水平位置;
            window.open('/static/html/exeindex.html', '', 'height=200px,width=500px,top=' + iTop + 'px,left=' + iLeft + 'px,titlebar=no,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no')
          }
        }
      },
      // 审核内容
      handleNodeClick (data) {
        // if((data.fileType == 'MSWord') || (data.fileType == 'MSWordX')){
        if (this.$store.state.taskProcessing.rightDetailTaskFist.job_name !== data.fileName) {
          this.dialogVisible5 = true
          this.axios.post('apis/numberFile', this.qs.stringify({
              username: this.$store.state.login.tcUserMes.username,
              datasetUid: data.uid
            })
          ).then((response) => {
            if (response.data.body !== '获取文件失败') {
              // var resData = response.data.body
              var bomMes = response.data.body
              var bomMesArr = []
              for (var i = 0; i < bomMes.length; i++) {
                var bom = ''
                bom = {
                  datasetName: bomMes[i].datasetName,
                  fileName: bomMes[i].fileName,
                  fileSize: bomMes[i].fileSize,
                  fileType: bomMes[i].fileType,
                  last_mod_date: bomMes[i].last_mod_date,
                  path: bomMes[i].path,
                  id: bomMes[i].id
                }
                bomMesArr.push(bom)
              }
              // this.$store.commit('taskProcessing/saveBomMes',{msg1:bomMesArr
              // })
              //  审批文件賦值
              // var dataRef = [
              //   {
              //     fileName: this.$store.state.taskProcessing.rightDetailTaskFist.job_name,
              //     child: bomMesArr
              //   }
              // ]
              this.data5 = bomMesArr
              console.log('this.data5')
              console.log(this.data5)
            } else if (response.data.body === '获取文件失败') {
              //  审批文件賦值
              // var dataRef = [
              //   {
              //     fileName: this.$store.state.taskProcessing.rightDetailTaskFist.job_name,
              //     children: []
              //   }
              // ]
              this.data5 = bomMesArr
              this.$message.error('请求numberFile失败')
            }
          }).catch((error) => {
            console.log(error)
            this.$message.error('numberFile请求失败')
          })
          // }else{
          //   console.log(data.fileType);
          //   //判断插件是否安装
          //   var ntkoed=ntkoBrowser.ExtensionInstalled();
          //   if(ntkoed){
          //     ntkoBrowser.openWindow("/static/html/editindex.html?id="+data.uid+"&fileType="+data.fileType+"&username="+this.$store.state.login.tcUserMes.username+"&fileName="+data.fileName+"&taskId="+this.$store.state.taskProcessing.rightDetailTaskFist.taskUid);
          //     //ntkoBrowser.openWindow
          //   }else{
          //     var iTop = ntkoBrowser.NtkoiTop();   //获得窗口的垂直位置;
          //     var iLeft = ntkoBrowser.NtkoiLeft();        //获得窗口的水平位置;
          //     window.open("/static/html/exeindex.html","","height=200px,width=500px,top="+iTop+"px,left="+iLeft+"px,titlebar=no,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no");
          //   }
          // }
        }
      },
      // input框回车  搜索
      onSubmit () {
        var kk = this.$store.state.taskProcessing.trackingTask
        if (this.search) {
          let kks = kk.filter(val => {
            // return val.job_name === this.search
            return String(val.job_name).toLowerCase().indexOf(this.search) > -1
          })
          this.$store.commit('taskProcessing/savetrackingTask', {msg1: kks})
        } else {
          this.axios.post('apis/tc/task', this.qs.stringify({type: '2'})
          ).then((response) => {
            console.log('进入新任务页面前，请求左侧任务')
            this.$store.commit('taskProcessing/savetrackingTask', {
              msg1: response.data.body
            })
          }).catch((error) => {
            console.log(error)
            this.$message.error('左侧任务，请求失败')
          })
        }
      },
      itemclick (item) {
        this.activeName = 'first'

        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })

        // var _this = this;
        // 点击，请求右侧数据
        this.axios.post('apis/tc/detailTask', this.qs.stringify({taskUid: item.uid})
        ).then((response) => {
          console.log('请求右侧数据')
          console.log(response)
          console.log(response.data.body)
          this.$store.commit('taskProcessing/saveRightDetailTask', {
            msg1: response.data.body.job_name,
            msg2: response.data.body.task_state,
            msg3: response.data.body.parent_name,
            msg4: response.data.body.responsible_party.object_string,
            msg5: response.data.body.uid,
            msg6: response.data.body.last_mod_date
          })
          if (response.data.body.workflowInfos.length > 0) {
            var childTasks = response.data.body.workflowInfos

            // 审签信息
            var task1
            var objectString
            var responseiblePOS
            var lasstMD
            var comment
            var taskState
            for (var i = 0; i < childTasks.length; i++) {
              childTasks[i]['id'] = i + 1
              childTasks[i]['numbOfSheaves'] = '第' + (i + 1) + '轮'
              // childTasks[i]['child'] = []
              var shenQian = []
              for (var j = 0; j < childTasks[i].length; j++) {
                objectString = childTasks[i][j].taskName
                responseiblePOS = childTasks[i][j].signName
                lasstMD = childTasks[i][j].signDate
                comment = childTasks[i][j].comments
                taskState = childTasks[i][j].status
                task1 = {
                  numbOfSheaves: j + 1,
                  id: (i + 1) + '-' + j,
                  object_string: objectString,
                  responsible_party_object_string: responseiblePOS,
                  last_mod_date: lasstMD,
                  comments: comment,
                  task_state: taskState
                }
                shenQian.push(task1)
              }
              childTasks[i]['child'] = shenQian
            }
            this.auditTableData = childTasks

            var childTasks2 = response.data.body.workflowInfos
            // 流程信息
            var flow = []
            var task2
            var objectString2
            var responseiblePOS2
            var lasstMD2
            var comment2
            var taskState2
            for (var m = childTasks2.length - 1; m < childTasks2.length; m++) {
              for (var n = 0; n < childTasks2[m].length; n++) {
                objectString2 = childTasks2[m][n].taskName
                responseiblePOS2 = childTasks2[m][n].signName
                lasstMD2 = childTasks2[m][n].signDate
                comment2 = childTasks2[m][n].comments
                taskState2 = childTasks2[m][n].status
                task2 = {
                  object_string: objectString2,
                  responsible_party_object_string: responseiblePOS2,
                  last_mod_date: lasstMD2,
                  comments: comment2,
                  task_state: taskState2
                }
                flow.push(task2)
              }
            }
            this.processTableData = flow
          }

          //  审批文件
          // 请求word pdf文件信息
          this.axios.post('apis/datasetAll', this.qs.stringify({taskUid: item.uid})
          ).then((response) => {
            console.log('datasetAll')
            console.log(response.data.body)

            console.log(response.data.body)
            if (response.data.body !== '获取文件失败') {
              var resData = response.data.body
              this.$store.commit('taskProcessing/saveWordMes', {msg1: resData})
              var bomMes = response.data.body
              var bomMesArr = []
              for (var i = 0; i < bomMes.length; i++) {
                var bom = ''
                bom = {fileName: bomMes[i].object_name, uid: bomMes[i].uid, fileType: bomMes[i].object_type}
                bomMesArr.push(bom)
              }
              this.$store.commit('taskProcessing/saveBomMes', {
                msg1: bomMesArr
              })
              //  审批文件賦值
              var dataRef = [
                {
                  fileName: this.$store.state.taskProcessing.rightDetailTaskFist.job_name,
                  time: this.$store.state.taskProcessing.rightDetailTaskFist.time,
                  operation: ' ',
                  child: bomMesArr
                }
              ]
              this.data = dataRef
              console.log('999999999999999999999999999999999999999999999999999')

              console.log(this.data)
            } else if (response.data.body === '获取文件失败') {
              //  审批文件賦值
               dataRef = [
                {
                  fileName: this.$store.state.taskProcessing.rightDetailTaskFist.job_name,
                  time: this.$store.state.taskProcessing.rightDetailTaskFist.time,
                  operation: ' ',
                  children: []
                }
              ]
              this.data = dataRef
              this.$message.error('请求word等文件信息失败')
            }
            //  loading 请求等待
            loading.close()
          }).catch((error) => {
            //  loading 请求等待
            loading.close()
            console.log(error)
            this.$message.error('请求word等文件信息失败')
          })
        }).catch((error) => {
          //  loading 请求等待
          loading.close()
          console.log(error)
          this.$message.error('请求失败')
        })
      },
      clearAPaper () {
        this.activeName = 'second'
      }

    }
  }

  function $ (id) {
    return document.getElementById(id)
  }
</script>

<style>

  #box {
    position: relative;
    overflow: hidden;
  }

  #rightMain {
    overflow: hidden;
  }

  #divisionLine {
    position: absolute;
    top: 0;
    left: 300px;
    height: 100%;
    width: 4px;
    overflow: hidden;
    background: #C6DEE3;
    cursor: w-resize;
  }

  .taskAside {
    background-color: #F0F0F0;
  }

  .taskMain {
    background-color: #ffffff;
    text-align: left;
    line-height: 16px;
    height: 100%;
    width: 100%;
  }

  .left {
    width: 20%;
    float: left;
    display: inline-block;

  }

  .left.tac {
    width: 100%;
  }

  .left.tac.el-col {
    width: 100%;
  }

  .el-menu-item div:nth-child(1) {
    width: 30%;
    float: left;
    padding-top: 50px;
  }

  .el-menu-item div:nth-child(1) img {
    display: inline-block;
    max-width: 75px;
    height: 100px;
  }

  .el-menu-item div:nth-child(2) {
    width: 70%;
    font-size: 12px;
    float: right;
    padding-left: 10px;
    padding-top: 15px;
    box-sizing: border-box;
    line-height: 30px;
    overflow: hidden
  }

  .right {
    width: 80%;
    height: 843px;
    float: right;
    border-left: solid 1px #000;
    box-sizing: border-box;
  }

  .el-menu-vertical-demo > .el-menu-item {
    height: 200px;
  }

  .el-menu-vertical-demo > .is-active {
    background-color: #C6DEE3 !important;
    color: black !important;
  }

  .el-menu-vertical-demo > .el-menu-item:hover {
    background-color: #C6DEE3 !important;
    color: black !important;
  }

  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }

  .tableHeader {
    width: 100%;
    font-size: 14px;
    color: #606266;
    text-align: center;
  }

  .el-tree-node__label {
    color: rgb(64, 158, 255);
  }
</style>
