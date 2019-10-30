<template>
  <el-container style="height:100%;width:100%;" id="box">
    <el-aside class="taskAside" id="leftAside">
      <div style="text-align: center;line-height: 0px;">
        <el-input placeholder="请输入ID" prefix-icon="el-icon-search" v-model="search" @keyup.enter.native="onSubmit"></el-input>
        <div v-if="this.$route.params.index=='1'">
        <el-menu class="el-menu-vertical-demo" >
          <el-menu-item  v-for="(item,index) in this.$store.state.taskProcessing.taskTemplate" :index="item.uid" :id="item.job_name" @click="itemclick(item)" >
            <!--:index="item.job_name" @click="itemclick(item)"-->
            <div>
              <img src="../assets/vue01.png" >
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
        <div v-if="this.$route.params.index=='2'">
          <el-menu default-active="activeIndex" class="el-menu-vertical-demo" >
            <el-menu-item  v-for="item in this.$store.state.taskProcessing.trackingTask" :index="item.uid" @click="itemclick(item)" >
              <!--:index="item.job_name" @click="itemclick(item)"-->
              <div>
                <img src="../assets/vue01.png" >
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
        <div v-if="this.$route.params.index =='3'">
          <el-menu default-active="activeIndex" class="el-menu-vertical-demo" >
            <el-menu-item  v-for="item in this.$store.state.taskProcessing.allTask" :index="item.uid" @click="itemclick(item)" >
              <!--:index="item.job_name" @click="itemclick(item)"-->
              <div>
                <img src="../assets/vue01.png" >
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

      </div>
    </el-aside>

    <el-main class="taskMain" id="rightMain">
      <el-tabs v-model="activeName" tabPosition="top">
        <el-tab-pane label="概述" name="first" style="height:600px;overflow-y:auto;overflow-x:hidden;">
          <el-form label-width="90px" >
            <el-form-item label="对象：">
              <el-input disabled  style="width: 100%" v-model="this.$store.state.taskProcessing.rightDetailTaskFist.job_name"></el-input>
            </el-form-item>
            <el-form-item label="状态：">
              <el-input disabled style="width: 100%" v-model="this.$store.state.taskProcessing.rightDetailTaskFist.task_state"></el-input>
            </el-form-item>
            <el-form-item label="任务：">
              <el-input disabled style="width: 100%" v-model="this.$store.state.taskProcessing.rightDetailTaskFist.parent_name"></el-input>
            </el-form-item>
            <el-form-item label="所有者：">
              <el-button type="text" style="margin: 0px;color:black;font-size: 14px;" >{{this.$store.state.taskProcessing.rightDetailTaskFist.responsible_party.object_string}}</el-button>
            </el-form-item>
            <el-form-item label="审核内容：">
<!--              <el-button type="text" style="margin: 0px;color: #409EFF;font-size: 14px;"  @click="clearAPaper">审批文件</el-button>-->
              <Modi-Tree :data="data" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></Modi-Tree>

              <el-dialog
                title="审核内容"
                :visible.sync="dialogVisible5"
                width="50%">
<!--                <el-tree :data="data5" :props="defaultProps5" @node-click="handleNodeClick5" default-expand-all></el-tree>-->
                <el-table
                  :data="data5"
                  style="width: 100%;"
                  @row-click="handleNodeClick5"
                class="auditTable">
                  <el-table-column
                    prop="datasetName"
                    label="数据名称">
                  </el-table-column>
                  <el-table-column
                    prop="fileName"
                    label="文件名">
                  </el-table-column>
                  <el-table-column
                    prop="datasetType"
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
           <div v-if="this.$route.params.index ==  '1'">
            <el-form-item label="委派签发：">
              <!--{{items.item1.assignment}}-->
              <el-button type="text" style="margin: 0px;color: #409EFF;font-size: 14px;" @click="dialogVisible = false,assignmentLis()"> {{sellectInitial}} </el-button>
              <el-dialog
                title="委派签发"
                :visible.sync="dialogVisible"
                width="40%"
                :before-close="handleClose">
                <el-tabs type="border-card">
                  <el-tab-pane label="组织">
<!--                    show-checkbox-->
                    <div>
                    <el-row>
                      <span>
                      <el-input v-model="input1" placeholder="请输入搜索内容" @keyup.enter.native="username" size="mini" style="width: 30%"></el-input>
                      <el-tooltip class="item" effect="dark" content="查询用户名称或Id" placement="top">
                        <el-button @click="username" type="primary" size="mini">用户名</el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="查询用户组" placement="top">
                        <el-button @click="userGroup" type="primary" size="mini">组</el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="查询用户角色" placement="top">
                        <el-button @click="userRole" type="primary" size="mini">角色</el-button>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" content="返回初始组织树" placement="top">
                        <el-button @click="assignmentLis" type="primary" size="mini">返回</el-button>
                      </el-tooltip>
                        </span>
                    </el-row>
                    </div>
                    <Modi-Tree
                      node-key="uid"
                      class="filter-tree"
                      :data="this.$store.state.taskProcessing.assignment"
                      :props="defaultProps2"
                      :filter-node-method="filterNode"
                      @node-click="handleNodeClick2"
                      @dblclick.native="assignmentOkButt()"
                      ref="tree"
                      expand-on-click-node
                    >
                      <!--                      lazy="true"-->
<!--                      default-expand-all-->
                    </Modi-Tree>
                  </el-tab-pane>
                </el-tabs>
                <span slot="footer" class="dialog-footer">
               <el-button @click="dialogVisible = false,assignmentCancelButt()">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false,assignmentOkButt()" :disabled = "appointButtDis">确 定</el-button>
                </span>
              </el-dialog>
            </el-form-item>
            <el-form-item label="审核意见：">
              <el-input type="textarea" style="width: 100%" v-model="examineInput"></el-input>
            </el-form-item>
            <el-form-item  prop="resource">
              <el-radio-group v-model="examineRadio" @change="changeHandler">
                <el-radio label="1">批准</el-radio>
                <el-radio label="2">拒绝</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="examineButt" :disabled = "examintButIsDis">审批文件</el-button>
            </el-form-item>
           </div>
          </el-form>

          <p v-model="routerIndex=this.$route.params.index"></p>

        </el-tab-pane>


        <el-tab-pane label="审签信息" name="fourth">
          <el-table :data="auditTableData" border style="width: 100%" row-key="id"  :tree-props="{children: 'child'}" default-expand-all height="600">
<!--            <el-table-column prop="serialNum" label="序号"  width="100%">-->
<!--              <template scope="scope"> <span>{{scope.$index + 1}} </span> </template>-->
<!--            </el-table-column>-->
            <el-table-column prop="numbOfSheaves" label="轮数" width="93">
            </el-table-column>
            <el-table-column prop="object_string" label="流程节点" width="203">
            </el-table-column>
            <el-table-column prop="responsible_party_object_string" label="审核者" width="130">
            </el-table-column>
            <el-table-column prop="last_mod_date" label="审批时间" width="140">
            </el-table-column>
            <el-table-column prop="comments" label="意见">
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <el-tab-pane label="流程信息" name="five">
          <el-table :data="processTableData" border style="width: 100%" height="600">
            <el-table-column prop="serialNum" label="序号"  width="50">
              <template scope="scope"> <span>{{scope.$index + 1}} </span> </template>
            </el-table-column>
            <el-table-column prop="object_string" label="流程节点" width="203">
            </el-table-column>
            <el-table-column prop="responsible_party_object_string" label="审核者"  width="130">
            </el-table-column>
            <el-table-column prop="last_mod_date" label="审批时间"  width="140">
            </el-table-column>
            <el-table-column prop="task_state" label="状态"  width="80">
            </el-table-column>
            <el-table-column prop="comments" label="意见" >
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-main>
    <div id="divisionLine"></div>
  </el-container>
</template>
<script>
  // import AssDialog from '@/components/AssignmentDialog'
  import treeTable from './TreeTable'
  import modificationTree from './modificationTree'
  import {ntkoBrowser,ExtensionInstalled,openWindow,NtkoiTop,NtkoiLeft} from './TreeTable/ntkobackground.min.js'
  //document.write("<script type='text/javascript' src='./TreeTable/ntkobackground.min.js?v1=" + Math.random()+"'><\/script>");
  export default {
    inject: ['reload'],
    components: {
      'tree-table': treeTable,
      'Modi-Tree': modificationTree
      // 'assdialog': AssDialog
    },
    data () {
      return {
        appointButtDis:true,
        isNoEPMDoTask:true,
        examintButIsDis:true,
        input1:'',
        input2:'',
        input3:'',

        sellectInitial:'选择人员',
        defaultProps2: {
          children: 'children',
          label: 'name',
        },
        // leftTasks:this.$store.state.taskProcessing.taskTemplate,
        search:'',
        // isTask: false,
        //默认选择左侧数据，暂时没有用
        // activeIndex:'0',
        examineRadio:'',
        examineInput:'',
        dialogVisible: false,
        dialogVisible5: false,
        activeName: '',

        auditTableData: '',
        tableData5:'',
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
        data5:[],
        processTableData: '',
        ruleForm: {
          resource: ''
        },
        defaultProps: {
          // children: 'uiChildren',
          children: 'child',
          label: 'fileName'
        },
        defaultProps5: {
          // children: 'uiChildren',
          children: 'child',
          label: 'fileName'
        },
        routerIndex:'',

      }
    },
    watch:{
      routerIndex:function (newQuestion, oldQuestion) {
          this.data=''
          this.search = ''
       }
    },

    mounted: function(){


      // console.log('000383/A;1-test02')
      // console.log(encodeURIComponent('000383/A;1-test02'))
      // console.log(decodeURIComponent(encodeURIComponent('000383/A;1-test02')))

      // 设置cookie
      var session = this.$route.params.cookie
      console.log(session)
      if(session != 'cookie'){
        var strBefore = session.substring(0,5);
        var strAfter = session.substring(6,session.length);
        session = strBefore+strAfter;
        window.document.cookie ='SESSION='+ session+';path=/'
      }
      // window.document.cookie="SESSION=John Smith;  path=/";

      if(window.name == ""){
        window.name = "isReload"
        if (session != 'cookie')
          return;
        location.reload();
      }else if(window.name == "isReload"){
        // 请求等待
      const loading = this.$loading({
        lock: true,
        text: '查询中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      // 请求左侧任务
      this.axios.post('apis/tc/task',this.qs.stringify({type:this.$route.params.index})
      ).then((response)=>{
        if(response.data.success){
          var taskTem = response.data.body
          var taskTemLast = []
          if(this.$route.params.index == '1'){
            for(let i in taskTem){
              if(taskTem[i].object_type == 'EPMPerformSignoffTask'){
                taskTemLast.push(taskTem[i])
              }
            }
            var taskNa = this.$route.params.taskName
            this.$store.commit('taskProcessing/savetaskTemplate',{
              msg1:taskTemLast
            })
            this.$nextTick(function(){
              if(this.$route.params.taskName != 'taskName'){
                var id = decodeURIComponent(taskNa);
                console.log(id);
                try {
                  document.getElementById(id).click()
                }catch (e) {
                  this.$alert('【'+id+'】审批任务处于编写节点，网页版TC系统仅支持非编写节点的审批，编写节点请您进入TC客户端处理。', '异常提示', {
                    confirmButtonText: '确定',
                  });
                }

              }
            })
          }else if(this.$route.params.index == '2'){
            this.$store.commit('taskProcessing/savetrackingTask',{
              msg1:taskTem
            })
          }else if(this.$route.params.index == '3'){
            this.$store.commit('taskProcessing/saveAllTask',{msg1:taskTem})
          }
          loading.close();
        }else{
          loading.close();
          if(response.data.message == '认证失败，请重新登录'){
            this.$alert(response.data.message, '异常提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.$router.push('/Login')
              }
            });
          }else{
            this.$alert(response.data.message, '异常提示', {
              confirmButtonText: '确定',
            });
          }
        }
      }).catch((error)  => {
        loading.close();
        this.$alert('请求错误！', '异常提示', {
          confirmButtonText: '确定',
        });
      })
      }

      // 清除概述数据
      this.$store.commit('taskProcessing/saveRightDetailTask',{msg1:'',
        msg2:'',
        msg3:'',
        msg4:'',
        msg5:'',
        msg6:''
      })
      // 分隔栏，调整左右界面
      var oBox = $("box"), oTop = $("leftAside"), oBottom = $("rightMain"), oLine = $("divisionLine");
      oLine.onmousedown = function(e) {
        var disX = (e || event).clientX;
        oLine.left = oLine.offsetLeft;
        document.onmousemove = function(e) {
          var iT = oLine.left + ((e || event).clientX - disX);
          var e=e||window.event,tarnameb=e.target||e.srcElement;
          var maxT = oBox.clientWight - oLine.offsetWidth;
          oLine.style.margin = 0;
          iT < 0 && (iT = 0);
          iT > maxT && (iT = maxT);
          oLine.style.left = oTop.style.width = iT + "px";
          oBottom.style.width = oBox.clientWidth - iT + "px";
          $("msg").innerText='leftAside.width:'+oLine.style.width+'---rightMain.width:'+oBottom.style.width+'---oLine.offsetLeft:'+oLine.offsetLeft+'---disX:'+disX+'---tarnameb:'+tarnameb.tagName;
          return false
        };
        document.onmouseup = function() {
          document.onmousemove = null;
          document.onmouseup = null;
          oLine.releaseCapture && oLine.releaseCapture()
        };
        oLine.setCapture && oLine.setCapture();
        return false
      };
    },
    destroyed: function () {
    },
    methods: {
      changeHandler(value){
        // 审核按钮 是否禁用
        this.examintButIsDis = false

        if(this.examineInput.length==0 ||this.examineInput=='批准'||this.examineInput=='拒绝' ){
          if(value == '1' || this.examineInput=='拒绝'){
            this.examineInput = "批准"
          }else if(value == '2' || this.examineInput=='批准'){
            this.examineInput = "拒绝"
          }
        }
      },
      // 查询用户Id
      username(){
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if(this.input1){
          this.axios.post('apis/queryGroup',this.qs.stringify({userNameOrId:this.input1,groupName:'',roleName:''}))
            .then((response)=>{
              if(response.data.success){
                var roleData = response.data.body
                for(var i =0;i<roleData.length;i++){
                  roleData[i]['children'] = []
                }
                this.$store.commit('taskProcessing/saveAssignment',{msg1:roleData
                })
                //  loading 请求等待
                loading.close();
              }else{
                //  loading 请求等待
                loading.close();
                if(response.data.message == '认证失败，请重新登录'){
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.push('/Login')
                    }
                  });
                }else{
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                  });
                }

              }
          //     else{
          //       this.$store.commit('taskProcessing/saveAssignment',{msg1:''
          //       })
          // }
            })
            .catch((error)  => {
              //  loading 请求等待
              loading.close();
              this.$alert('请求错误！', '异常提示', {
                confirmButtonText: '确定',
              })
            })
        }
        //  loading 请求等待
        loading.close();
      },
      // 查询用户组
      userGroup(){
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if(this.input1){
          this.axios.post('apis/queryGroup',this.qs.stringify({userNameOrId:'',groupName:this.input1,roleName:''}))
            .then((response)=>{
              if(response.data.success){
                var roleData = response.data.body
                for(var i =0;i<roleData.length;i++){
                  roleData[i]['children'] = []
                }
                this.$store.commit('taskProcessing/saveAssignment',{msg1:roleData
                })
                //  loading 请求等待
                loading.close();
              }else{
                //  loading 请求等待
                loading.close();
                if(response.data.message == '认证失败，请重新登录'){
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.push('/Login')
                    }
                  });
                }else{
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                  });
                }

              }
            })
            .catch((error)  => {
              //  loading 请求等待
              loading.close();
              this.$alert('请求错误！', '异常提示', {
                confirmButtonText: '确定',
              })
            })
        }
        //  loading 请求等待
        loading.close();
      },
      userRole(){
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if(this.input1){
          this.axios.post('apis/queryGroup',this.qs.stringify({userNameOrId:'',groupName:'',roleName:this.input1}))
            .then((response)=>{
              if(response.data.success){
                var roleData = response.data.body
                for(var i =0;i<roleData.length;i++){
                  roleData[i]['children'] = []
                }
                this.$store.commit('taskProcessing/saveAssignment',{msg1:roleData
                })
                //  loading 请求等待
                loading.close();
              }else{
                //  loading 请求等待
                loading.close();
                if(response.data.message == '认证失败，请重新登录'){
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.push('/Login')
                    }
                  });
                }else{
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                  });
                }

              }
            })
            .catch((error)  => {
              //  loading 请求等待
              loading.close();
              this.$alert('请求错误！', '异常提示', {
                confirmButtonText: '确定',
              })
            })
        }
        //  loading 请求等待
        loading.close();
      },
      // 树节点双击事件
      // dbc(){
      //   if(this.$store.state.taskProcessing.nodeType == 'GroupMember'){
      //     this.axios.post('apis/tc/delegate',this.qs.stringify({taskUid:this.$store.state.taskProcessing.rightDetailTaskFist.taskUid,groupMemberUid:this.$store.state.taskProcessing.assignmentMes.uid}))
      //       .then((response)=>{
      //         if(response){
      //           // 成功  删除任务，加个提示委派成功
      //           if(response = 1) {
      //             this.$message.success('委派签发成功')
      //             this.$store.commit('taskProcessing/saveAssignmentMes',{msg1:'选择人员',
      //               msg2:''
      //             })
      //             // this.activeName = ''
      //             // TODO   head头，任务数量不能实时刷新
      //             // 刷新header都的任务数量
      //             this.axios.post('apis/tc/number'
      //             ).then((response)=>{
      //               if(response.data.success){
      //                 this.$store.commit('taskProcessing/saveTaskNum',{msg1:'',msg2:response.data.body.performNum,msg3:response.data.body.trackNum})
      //               }else{
      //
      //       if(response.data.message == '认证失败，请重新登录'){
      //         this.$alert(response.data.message, '异常提示', {
      //           confirmButtonText: '确定',
      //           callback: action => {
      //             this.$router.push('/Login')
      //           }
      //         });
      //       }else{
      //           this.$alert(response.data.message, '异常提示', {
      //           confirmButtonText: '确定',
      //         });
			// }
      //
      //               }
      //             }).catch((error)  => {
      //               this.$alert('请求错误！', '异常提示', {
      //                 confirmButtonText: '确定',
      //               })
      //             })
      //             // // 刷新
      //             // this.reload()
      //           }else if(response = 0){
      //             this.$message.warning('委派签发失败')
      //           }
      //         }
      //       }).catch((error)  => {
      //       this.$alert('请求错误！', '异常提示', {
      //         confirmButtonText: '确定',
      //       })
      //     })
      //
      //     // 刷新
      //     this.reload()
      //   }
      //
      // },

      handleNodeClick5(data){
        console.log(this.$store.state.taskProcessing.lastRoundNumFile)
        if(data.datasetType){
          this.dialogVisible5 = false
          //判断插件是否安装
          var ntkoed=ntkoBrowser.ExtensionInstalled();
          var datasetType = 1;
          if(this.$route.params.index=='1' && (data.datasetType == "MSWord" || data.datasetType == "MSWordX")){
             datasetType = 2;
          }
          if(ntkoed){
            //ntkoBrowser.openWindow("http://www.baidu.com");

            var lastDataset = this.$store.state.taskProcessing.lastRoundNumFile;

            ntkoBrowser.openWindow("/static/html/editindex.html?imanFileUid="+data.imanFileUid+"&datasetUid="+data.datasetUid+"&fileType="+datasetType+"&fileName="+data.fileName+"&taskId="+this.$store.state.taskProcessing.rightDetailTaskFist.taskUid+"&lastImanFileUid="+lastDataset.imanFileUid+"&lastDatasetUid="+lastDataset.originDatasetUid+"&lastFileName="+lastDataset.fileName);
            //ntkoBrowser.openWindow
          }else{
            var iTop = ntkoBrowser.NtkoiTop();   //获得窗口的垂直位置;
            var iLeft = ntkoBrowser.NtkoiLeft();        //获得窗口的水平位置;
            window.open("/static/html/exeindex.html","","height=350px,width=600px,top="+iTop+"px,left="+iLeft+"px,titlebar=no,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no");
          }
        }
      },
      // 审核内容
      handleNodeClick(data) {
        //  job_name点击根节点，不会跳出dialog
        if(this.$store.state.taskProcessing.rightDetailTaskFist.job_name != data.fileName){
          // console.log("data66666666")
          // console.log(data.fileType)
          if(!((data.fileType != 'MSWord') && (data.fileType != 'MSWordX') && (data.fileType != 'MSExcel') && (data.fileType != 'MSExcelX') && (data.fileType != 'PDF'))){
            // 请求等待
            const loading = this.$loading({
              lock: true,
              text: '查询中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios.post('apis/numberFile',this.qs.stringify({datasetUid:data.uid,taskUid:this.$store.state.taskProcessing.rightDetailTaskFist.taskUid})
            ).then((response)=> {
              if (response.data.success) {
                var bomMes = response.data.body
                var bomMesArr = []
                for (var i = 0; i < bomMes.length; i++) {
                  var bom = ''
                  bom = {datasetName: bomMes[i].datasetName, fileName: bomMes[i].fileName, fileSize: bomMes[i].fileSize,datasetType:bomMes[i].datasetType,last_mod_date:bomMes[i].last_mod_date,imanFileUid:bomMes[i].imanFileUid,fileExt:bomMes[i].fileExt,datasetUid:bomMes[i].datasetUid,lastRound:bomMes[i].lastRound,originDatasetUid:bomMes[i].originDatasetUid}
                  bomMesArr.push(bom)
                  if(bomMes[i].lastRound){
                    this.$store.commit('taskProcessing/savaLastRoundNumFile',{msg1:bom})
                  }
                }
                this.data5 = bomMesArr
                //  loading 请求等待
                loading.close();
                this.dialogVisible5 = true

              } else{
                //  loading 请求等待
                loading.close();
                this.data5 = bomMesArr

                if(response.data.message == '认证失败，请重新登录'){
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      this.$router.push('/Login')
                    }
                  });
                }else{
                  this.$alert(response.data.message, '异常提示', {
                    confirmButtonText: '确定',
                  });
                }

              }
            }).catch((error)  => {
              //  loading 请求等待
              loading.close();
              this.$alert('请求错误！', '异常提示', {
                confirmButtonText: '确定',
              })
            })
          }else{
            this.$alert('数据集类型不支持！', '异常提示', {
              confirmButtonText: '确定',
            })
          }


        }

      },
      // input框回车  搜索
      onSubmit(){
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        var kk
        if(this.$route.params.index == '1'){
          kk = this.$store.state.taskProcessing.taskTemplate
        }else if(this.$route.params.index == '2'){
          kk = this.$store.state.taskProcessing.trackingTask
        }else if(this.$route.params.index == '3'){
          kk = this.$store.state.taskProcessing.allTask
        }
        if(this.search){
          let kks =kk.filter(val => {
            console.log(kk)
            console.log(val)
            console.log(val.job_name)
            // return val.job_name === this.search
            return String(val.job_name).toLowerCase().indexOf(this.search.toLowerCase()) > -1
          })
          if(this.$route.params.index == '1'){
            this.$store.commit('taskProcessing/savetaskTemplate',{msg1:kks})
          }else if(this.$route.params.index == '2'){
            this.$store.commit('taskProcessing/savetrackingTask',{msg1:kks})
          }else if(this.$route.params.index == '3'){
            this.$store.commit('taskProcessing/saveAllTask',{msg1:kks})
          }
          //  loading 请求等待
          loading.close();
        }else{
          this.axios.post('apis/tc/task',this.qs.stringify({type:this.$route.params.index})
          ).then((response)=>{
            if(response.data.success){
              var taskTem = response.data.body
              var taskTemLast = []
              if(this.$route.params.index == '1'){
                for(let i in taskTem){
                  if(taskTem[i].object_type == 'EPMPerformSignoffTask'){
                    taskTemLast.push(taskTem[i])
                  }
                }
                this.$store.commit('taskProcessing/savetaskTemplate',{
                  msg1:taskTemLast
                })
              }else if(this.$route.params.index == '2'){
                this.$store.commit('taskProcessing/savetrackingTask',{
                  msg1:taskTem
                })
              }else if(this.$route.params.index == '3'){
                this.$store.commit('taskProcessing/saveAllTask',{msg1:taskTem})
              }
              //  loading 请求等待
              loading.close();
            }else{
              //  loading 请求等待
              loading.close();

            if(response.data.message == '认证失败，请重新登录'){
              this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/Login')
                }
              });
            }else{
                this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
              });
			}

            }
          }).catch((error)  => {
            //  loading 请求等待
            loading.close();
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            })
          })
        }



      },
      // 点击任务，请求右侧数据
      itemclick(item){
        this.examintButIsDis = true
        this.activeName='first'
        this.examineRadio = ''
        this.examineInput = ''
        this.$store.commit('taskProcessing/saveAssignmentMes',{msg1:'选择人员',
                        msg2:''
                      })

        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });

        this.axios.post('apis/tc/detailTask',item
        ).then((response)=>{
          if(response.data.success){
            var jobName = response.data.body.job_name
            var taskState = response.data.body.task_state
            var parName = response.data.body.parent_name
            var resParObjStr = response.data.body.responsible_party
            var uid = response.data.body.uid
            var lastModData = ""
            this.$store.commit('taskProcessing/saveRightDetailTask',{msg1:jobName,
              msg2:taskState,
              msg3:parName,
              msg4:resParObjStr,
              msg5:uid,
              msg6:lastModData
            })
            if(response.data.body.workflowInfos.length > 0){
              var childTasks = response.data.body.workflowInfos

              // 审签信息
              var task1
              var objectString
              var responseiblePOS
              var lasstMD
              var comment
              var taskState
              var childTasks2 = []
              // var num = 0
              for(var i=childTasks.length-1;i>=0;i--){
                // num++
                childTasks[i]['id'] = i+1
                childTasks[i]['numbOfSheaves'] = '第'+(i+1)+'轮'
                // childTasks[i]['child'] = []
                var shenQian = []
                for(var j=0;j<childTasks[i].length;j++){
                  objectString = childTasks[i][j].taskName
                  responseiblePOS = childTasks[i][j].signName
                  lasstMD = childTasks[i][j].signDate
                  comment = childTasks[i][j].comments
                  taskState = childTasks[i][j].status
                  task1 = {numbOfSheaves:j+1,id:(i+1)+'-'+j,object_string:objectString,responsible_party_object_string:responseiblePOS,last_mod_date:lasstMD,comments:comment,task_state:taskState}
                  shenQian.push(task1)
                }
                childTasks[i]['child'] = shenQian
                childTasks2.push(childTasks[i])
              }
              this.auditTableData = childTasks2

              var childTasks2 = response.data.body.workflowInfos
              //流程信息
              var flow = []
              var task2
              var objectString2
              var responseiblePOS2
              var lasstMD2
              var comment2
              var taskState2
              for(var m=childTasks2.length-1;m<childTasks2.length;m++){
                for(var n =0;n<childTasks2[m].length;n++){
                  objectString2 = childTasks2[m][n].taskName
                  responseiblePOS2 = childTasks2[m][n].signName
                  lasstMD2 = childTasks2[m][n].signDate
                  comment2 = childTasks2[m][n].comments
                  taskState2 = childTasks2[m][n].status
                  task2 = {object_string:objectString2,responsible_party_object_string:responseiblePOS2,last_mod_date:lasstMD2,comments:comment2,task_state:taskState2}
                  flow.push(task2)
                }
              }
              this.processTableData = flow


              // 审批文件
              var resData = response.data.body.target_attachments
              this.$store.commit('taskProcessing/saveWordMes',{msg1:resData })
              var bomMes = response.data.body.target_attachments
              var bomMesArr = []
              for(var k=0;k<bomMes.length;k++){
                var bom = ''
                bom = {fileName:bomMes[k].object_name,uid:bomMes[k].uid,fileType:bomMes[k].object_type}
                bomMesArr.push(bom)
              }
              this.$store.commit('taskProcessing/saveBomMes',{msg1:bomMesArr
              })
              //  审批文件賦值
              var dataRef =  [
                {
                  fileName: this.$store.state.taskProcessing.rightDetailTaskFist.job_name,
                  time: this.$store.state.taskProcessing.rightDetailTaskFist.time,
                  operation: ' ',
                  child: bomMesArr
                }
              ]
              this.data = dataRef
            }
            //  loading 请求等待
              loading.close();
          }else{
            //  loading 请求等待
            loading.close();

            if(response.data.message == '认证失败，请重新登录'){
              this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/Login')
                }
              });
            }else{
                this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
              });
			}

          }

          //  审批文件
          //获取dataset文件信息
          // this.axios.post('apis/datasetAll',this.qs.stringify({taskUid:item.uid})
          // ).then((response)=>{
          //   if(response.data.success) {
          //     var resData = response.data.body
          //     this.$store.commit('taskProcessing/saveWordMes',{msg1:resData })
          //     var bomMes = response.data.body
          //     var bomMesArr = []
          //     for(var k=0;k<bomMes.length;k++){
          //       var bom = ''
          //       bom = {fileName:bomMes[k].object_name,uid:bomMes[k].uid,fileType:bomMes[k].object_type}
          //       bomMesArr.push(bom)
          //     }
          //     this.$store.commit('taskProcessing/saveBomMes',{msg1:bomMesArr
          //     })
          //     //  审批文件賦值
          //     var dataRef =  [
          //       {
          //         fileName: this.$store.state.taskProcessing.rightDetailTaskFist.job_name,
          //         time: this.$store.state.taskProcessing.rightDetailTaskFist.time,
          //         operation: ' ',
          //         child: bomMesArr
          //       }
          //     ]
          //     this.data = dataRef
          //   }else{
          //     this.$alert(response.data.message, '异常提示', {
          //       confirmButtonText: '确定',
          //     });
          //   }
          // //  loading 请求等待
          //   loading.close();
          // }).catch((error)  => {
          //   //  loading 请求等待
          //   loading.close();
          //   this.$alert('请求错误！', '异常提示', {
          //     confirmButtonText: '确定',
          //   })
          // })

        }).catch((error)  => {
          //  loading 请求等待
          loading.close();
          this.$alert('请求错误！', '异常提示', {
            confirmButtonText: '确定',
          })
        })




      },
      clearAPaper(){
        this.activeName = 'second'
      },
      //委派签发人员请求
      assignmentLis(){
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.input1 = ''
        this.$store.commit('taskProcessing/saveAssignment',{msg1:''
        })
        this.axios.post('apis/getGroup',this.qs.stringify({uid:'',fatherUid:''})
        ).then((response)=>{
          if(response.data.success){
            var roleData = response.data.body

            for(let i in roleData){
              roleData[i]['name'] = roleData[i]['name'].replace('HT3','三院')

              roleData[i]['children'] = [{name:''}]
              var FUid = ''
              if(roleData[i].fatherUid){
                FUid = roleData[i].fatherUid
              }
      //         this.axios.post('apis/getGroup',this.qs.stringify({uid:roleData[i].puid,fatherUid:FUid})
      //         ).then((response)=>{
      //           if(response.data.success){
      //             var roleData2 = response.data.body
      //             for(var j =0;j<roleData2.length;j++){
      //               roleData2[j]['children'] = []
      //               roleData2[j]['fatherUid'] = roleData[i].puid
      //               // this.$refs.tree.remove(roleData2[i])
      //               // this.$refs.tree.append(roleData2[i],roleData[i])
      //             }
      //             roleData[i]['children'] = roleData2
      //             // this.$refs.tree.remove(roleData[i])
      //             // this.$refs.tree.append(roleData[i],roleData)
      //           }else{
      //
      //       if(response.data.message == '认证失败，请重新登录'){
      //         this.$alert(response.data.message, '异常提示', {
      //           confirmButtonText: '确定',
      //           callback: action => {
      //             this.$router.push('/Login')
      //           }
      //         });
      //       }else{
      //           this.$alert(response.data.message, '异常提示', {
      //           confirmButtonText: '确定',
      //         });
			// }
      //
      //           }
      //           //  loading 请求等待
      //           loading.close();
      //         }).catch((error)  => {
      //           //  loading 请求等待
      //           loading.close();
      //           this.$alert('请求错误！', '异常提示', {
      //             confirmButtonText: '确定',
      //           })
      //         })
            }
            this.$store.commit('taskProcessing/saveAssignment',{msg1:roleData
            })

            //  loading 请求等待
            loading.close();
            this.dialogVisible = true
          }else{
            //  loading 请求等待
            loading.close();

            if(response.data.message == '认证失败，请重新登录'){
              this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/Login')
                }
              });
            }else{
                this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
              });
			}

          }
        }).catch((error)  => {
          //  loading 请求等待
          loading.close();
          this.$alert('请求错误！', '异常提示', {
            confirmButtonText: '确定',
          })
        })
      },
      // 树dialog的
      handleNodeClick2(data) {
        if(data.type == 'GroupMember'){
          this.appointButtDis = false
        }else{
          this.appointButtDis = true
        }
        // 请求等待
        // const loading = this.$loading({
        //   lock: true,
        //   text: '查询中',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.7)'
        // });

        // 保存当前节点的ｔｙｐｅ
        this.$store.commit('taskProcessing/saveNodeType',{msg1:data.type
        })
        this.$store.commit('taskProcessing/saveAssignmentMes',{msg1:data.name,
          msg2:data.puid
        })


        if(data.children[0].name)
          return;


        data['children'] = []
        console.log("方法开始前");
        if(data.type == 'GroupMember')
          return;
        console.log("跳出方法");



        var FUid = ''
        if(data.fatherUid){
          FUid = data.fatherUid
        }
        this.axios.post('apis/getGroup',this.qs.stringify({uid:data.puid,fatherUid:FUid})
        ).then((response)=>{
          if(response.data.success){
            var roleData = response.data.body
            for(let i in roleData){
              roleData[i]['children'] = [{name:''}]
              roleData[i]['fatherUid'] = data.puid
              var FUid = ''
              if(roleData[i].fatherUid){
                FUid = roleData[i].fatherUid
              }
      //         this.axios.post('apis/getGroup',this.qs.stringify({uid:roleData[i].puid,fatherUid:FUid})
      //         ).then((response)=>{
      //           if(response.data.success){
      //             var roleData2 = response.data.body
      //             for(var j =0;j<roleData2.length;j++){
      //               roleData2[j]['children'] = []
      //               roleData2[j]['fatherUid'] = roleData[i].puid
      //               // this.$refs.tree.remove(roleData2[i])
      //               // this.$refs.tree.append(roleData2[i],roleData[i])
      //             }
      //             roleData[i]['children'] = roleData2
      //             // this.$refs.tree.remove(roleData[i])
      //             // this.$refs.tree.append(roleData[i],roleData)
      //           }else{
      //
      //       if(response.data.message == '认证失败，请重新登录'){
      //         this.$alert(response.data.message, '异常提示', {
      //           confirmButtonText: '确定',
      //           callback: action => {
      //             this.$router.push('/Login')
      //           }
      //         });
      //       }else{
      //           this.$alert(response.data.message, '异常提示', {
      //           confirmButtonText: '确定',
      //         });
			// }
      //
      //           }
      //         }).catch((error)  => {
      //           this.$alert('请求错误！', '异常提示', {
      //             confirmButtonText: '确定',
      //           })
      //         })

            }

            data['children'] = roleData
            //  loading 请求等待
            // loading.close();
          }else{
            //  loading 请求等待
            // loading.close();
            if(response.data.message == '认证失败，请重新登录'){
              this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/Login')
                }
              });
            }else{
                this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
              });
			}

          }
        }).catch((error)  => {
          //  loading 请求等待
          // loading.close();
          this.$alert('请求错误！', '异常提示', {
            confirmButtonText: '确定',
          })
        })

      },
      // 委派签发选人人员取消按钮
      assignmentCancelButt(){
        this.$store.commit('taskProcessing/saveAssignmentMes',{msg1:'选择人员',
          msg2:''
        })
      },
      // 委派签发选择人员确定按钮，发送请求
      assignmentOkButt(){
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        // 不是组成员，不能发请求
        if(this.$store.state.taskProcessing.nodeType == 'GroupMember'){
          this.axios.post('apis/tc/delegate',this.qs.stringify({taskUid:this.$store.state.taskProcessing.rightDetailTaskFist.taskUid,groupMemberUid:this.$store.state.taskProcessing.assignmentMes.uid}))
            .then((response)=>{
              if(response.data.success){
                // 成功  删除任务，加个提示委派成功
                  this.$message.success('委派签发成功')
                  this.$store.commit('taskProcessing/saveAssignmentMes',{msg1:'选择人员',
                    msg2:''
                  })
                  this.activeName = ''
                  // TODO   head头，任务数量不能实时刷新
                  // 刷新header都的任务数量
                  this.axios.post('apis/tc/number'
                  ).then((response)=>{
                    if(response.data.success){
                      this.$store.commit('taskProcessing/saveTaskNum',{msg1:'',msg2:response.data.body.performNum,msg3:response.data.body.trackNum})
                    }else{
                        if(response.data.message == '认证失败，请重新登录'){
                          this.$alert(response.data.message, '异常提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                              this.$router.push('/Login')
                            }
                          });
                        }else{
                            this.$alert(response.data.message, '异常提示', {
                            confirmButtonText: '确定',
                          });
                        }
                    }
                  }).catch((error)  => {
                    this.$alert('请求错误！', '异常提示', {
                      confirmButtonText: '确定',
                    })
                  })
                  // 刷新
                this.reload()
                //  loading 请求等待
                loading.close();
              }else{
                //  loading 请求等待
                loading.close();
                  if(response.data.message == '认证失败，请重新登录'){
                    this.$alert(response.data.message, '异常提示', {
                      confirmButtonText: '确定',
                      callback: action => {
                        this.$router.push('/Login')
                      }
                    });
                  }else{
                      this.$alert(response.data.message, '异常提示', {
                      confirmButtonText: '确定',
                    });
                  }
              }
            }).catch((error)  => {
            //  loading 请求等待
            loading.close();
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            })
          })
        }
        //  loading 请求等待
        loading.close();
      },
      // 审批流程
      examineButt(){
        if(!this.examineRadio)
          return;
        if(!this.$store.state.taskProcessing.rightDetailTaskFist.taskUid){
          this.$alert('请重新选择左侧任务！', '异常提示', {
            confirmButtonText: '确定',
          })
          return
        }
        const loading = this.$loading({
          lock: true,
          text: '审核中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('apis/tc/perform',this.qs.stringify({taskUid:this.$store.state.taskProcessing.rightDetailTaskFist.taskUid,decision:this.examineRadio,comments:this.examineInput}))
          .then((response)=>{
            if(response.data.success){
              this.$message.success('审批文件成功')
              this.examineRadio = ''
              this.examineInput = ''
              this.activeName = ''
              // 刷新header都的任务数量
              this.axios.post('apis/tc/number'
              ).then((response)=>{
                if(response.data.success){
                  this.$store.commit('taskProcessing/saveTaskNum',{msg1:'',msg2:response.data.body.performNum,msg3:response.data.body.trackNum})
                }else{

            if(response.data.message == '认证失败，请重新登录'){
              this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/Login')
                }
              });
            }else{
                this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
              });
			}

                }
              }).catch((error)  => {
                this.$alert('请求错误！', '异常提示', {
                  confirmButtonText: '确定',
                })
              })
              var cookie = this.$route.params.cookie
              this.$router.push('/home/head/1/taskName/'+cookie+'/GtasksMain')
              // 刷新
              this.reload()
              //  loading 请求等待
              loading.close();
            }else{
              //  loading 请求等待
              loading.close();
            if(response.data.message == '认证失败，请重新登录'){
              this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.$router.push('/Login')
                }
              });
            }else{
                this.$alert(response.data.message, '异常提示', {
                confirmButtonText: '确定',
              });
			}

            }
          }).catch((error)  => {
          //  loading 请求等待
          loading.close();
          this.$alert('请求错误！', '异常提示', {
            confirmButtonText: '确定',
          })
        })
      }
    }
  }

  function $(id) {
    return document.getElementById(id)
  }

</script>

<style>
  #box{position:relative;overflow:hidden;}
  #rightMain{overflow:hidden;}
  #divisionLine{position:absolute;top:0;left:300px;height:100%;width:4px;overflow:hidden;background:#C6DEE3;cursor:w-resize;}

  .taskAside{
    background-color: #F0F0F0;
  }
  .taskMain{
    background-color: #ffffff;
    text-align:left;
    line-height: 16px;
    height:100%;
    width:100%;
  }
  .left{
    width: 20%;
    float: left;
    display: inline-block;

  }
  .left.tac{
    width: 100%;
  }
  .left.tac.el-col{
    width: 100%;
  }

  .el-menu-item div:nth-child(1){
    width: 30%;
    float: left;
    padding-top: 50px;
  }
  .el-menu-item div:nth-child(1) img{
    display: inline-block;
    max-width: 75px;
    height: 100px;
  }
  .el-menu-item div:nth-child(2){
    width: 70%;
    font-size: 12px;
    float: right;
    padding-left: 10px;
    padding-top: 15px;
    box-sizing: border-box;
    line-height: 30px;
    overflow:hidden
  }

  .right{
    width: 80%;
    height: 843px;
    float: right;
    border-left: solid 1px #000;
    box-sizing: border-box;
  }
  .el-menu-vertical-demo>.el-menu-item{
    height: 200px;
  }
  .el-menu-vertical-demo>.is-active{
    background-color:#C6DEE3 !important;
    color: black !important;
  }
  .el-menu-vertical-demo>.el-menu-item:hover{
    background-color:#C6DEE3 !important;
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
  .el-tree-node__label{
    color:rgb(64, 158, 255);
  }
  .auditTable.el-table--enable-row-hover .el-table__body tr:hover>td{
    color:#409EFF;
  }
</style>
