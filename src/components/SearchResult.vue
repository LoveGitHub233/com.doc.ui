<template>
  <div style="width: 100%;height: 100%;">
                      <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="属性" name="first" style="height:100%;overflow-y:auto;overflow-x:hidden;">
                          <div>
                            <el-form  style="width:100%;" >
                              <el-form-item label="文档对象"　label-width="10%">
                                <Modi-Tree :data="DSData" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></Modi-Tree>
                                <!--<el-dialog-->
                                  <!--title="审核内容"-->
                                  <!--:visible.sync="dialogVisible5"-->
                                  <!--width="50%">-->
                                  <!--&lt;!&ndash;                <el-tree :data="data5" :props="defaultProps5" @node-click="handleNodeClick5" default-expand-all></el-tree>&ndash;&gt;-->
                                  <!--<el-table-->
                                    <!--:data="data5"-->
                                    <!--style="width: 100%"-->
                                    <!--@row-click="handleNodeClick5">-->
                                    <!--<el-table-column-->
                                      <!--prop="datasetName"-->
                                      <!--label="数据名称">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                      <!--prop="fileName"-->
                                      <!--label="文件名">-->
                                    <!--</el-table-column>-->
<!--&lt;!&ndash;                                    <el-table-column&ndash;&gt;-->
<!--&lt;!&ndash;                                      prop="fileSize"&ndash;&gt;-->
<!--&lt;!&ndash;                                      label="文件大小">&ndash;&gt;-->
<!--&lt;!&ndash;                                    </el-table-column>&ndash;&gt;-->
                                    <!--<el-table-column-->
                                      <!--prop="fileType"-->
                                      <!--label="类型">-->
                                    <!--</el-table-column>-->
                                    <!--<el-table-column-->
                                      <!--prop="last_mod_date"-->
                                      <!--label="日期">-->
                                    <!--</el-table-column>-->
                                  <!--</el-table>-->
                                  <!--<span slot="footer" class="dialog-footer">-->
                                  <!--</span>-->
                                <!--</el-dialog>-->
                              </el-form-item>
                            </el-form>
<!--                            <el-form  style="width:100%;" >-->
<!--                              <el-form-item label="模型对象"　label-width="7%">-->
<!--                                <treetable :data="data" :columns="columns" border/>-->
<!--                              </el-form-item>-->
<!--                            </el-form>-->
                            <el-form  style="width:100%;" >
                                <el-form-item v-for="(item,index) in this.$store.state.documentEnquiry.resultPropety" :label="item.key" v-if="!(item.key.indexOf('Uid') !=-1)" label-width="10%" >
                                    <el-input disabled v-model="item.value"  style="width:100%;"></el-input>
                                </el-form-item>
                            </el-form>

                          </div>
                        </el-tab-pane>
                        <el-tab-pane label="模型对象" name="second" style="height:100%;overflow-y:auto;overflow-x:hidden;">
                          <div>
<!--                            <treetable :data="this.$store.state.documentEnquiry.treeBomData" :columns="columns" border/>-->
<!--                            <treetable :data="data" :columns="columns" border/>-->
<!--                        默认展开    default-expand-all-->
                            <el-table
                              :data="data"
                              row-key="uid"
                              border
                              :tree-props="{children: 'bl_child_lines'}" >

                              <el-table-column v-for="item in columns" :prop="item.value" :label="item.text" show-overflow-tooltip=true>
                                　　　　</el-table-column>
                            </el-table>
                          </div>
                        </el-tab-pane>
<!--                        <el-tab-pane label="文档查看" name="three">-->
<!--                          <div>-->
<!--    &lt;!&ndash;                        <treetable :data="DSData" :columns="DSColumns" border/>&ndash;&gt;-->
<!--                            <el-tree :data="DSData" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree>-->
<!--                          </div>-->
<!--                        </el-tab-pane>-->
                        <el-tab-pane label="审签信息" name="fourth" style="height:100%;overflow-y:auto;overflow-x:hidden;">
                          <el-table :data="auditTableData" border style="width: 100%" row-key="id"  :tree-props="{children: 'child'}" default-expand-all>
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


                      </el-tabs>

  </div>
</template>

<script>
  import treeTable from './TreeTable'
  import {ntkoBrowser,ExtensionInstalled,NtkoiTop,NtkoiLeft} from "./TreeTable/ntkobackground.min.js";
  import modificationTree from './modificationTree'
  export default {
    inject: ['reload'],
    components: { 'treetable': treeTable,
                  'Modi-Tree': modificationTree
    },
    data () {
      return {
        tableHeader:'',
        tableData: '',

        activeName: 'first',
        columns: [
          {
            text: 'BOM行',
            value: 'object_string',
            width: 300
          },
          {
            text: '零组件类型',
            value: 'bl_item_object_type'
          },
          {
            text: '规格配置依据',
            value: 'bl_config_string'
          },
          {
            text: '零组件版本状态',
            value: 'bl_rev_release_status_list'
          },
          {
            text: '查找编号',
            value: 'bl_sequence_no'
          }
        ],

        DSColumns: [
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
        data5:[],
        DSData: [],
        defaultProps: {
          // children: 'uiChildren',
          children: 'child',
          label: 'datasetName'
        },

        auditTableData: '',
        dialogVisible5:false,
        data:[],
      }
    },
    methods: {
      // handleNodeClick5(data){
      //   if(data.fileType){
      //     //判断插件是否安装
      //     var ntkoed=ntkoBrowser.ExtensionInstalled();
      //     if(ntkoed){
      //       ntkoBrowser.openWindow("/static/html/editindex.html?id="+data.uid+"&fileType=pdf"+"&username="+this.$store.state.login.tcUserMes.username+"&fileName="+data.fileName+"&taskId="+this.$store.state.taskProcessing.rightDetailTaskFist.taskUid+"&path="+escape(data.path));
      //       //ntkoBrowser.openWindow
      //     }else{
      //       var iTop = ntkoBrowser.NtkoiTop();   //获得窗口的垂直位置;
      //       var iLeft = ntkoBrowser.NtkoiLeft();        //获得窗口的水平位置;
      //       window.open("/static/html/exeindex.html","","height=200px,width=500px,top="+iTop+"px,left="+iLeft+"px,titlebar=no,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no");
      //     }
      //   }
      // },
      // 审核内容
      handleNodeClick(data) {
        if(data.fileType){
          this.dialogVisible5 = false
          //判断插件是否安装
          var ntkoed=ntkoBrowser.ExtensionInstalled();
          var datasetType = 1;
          // if(this.$route.params.index=='1'){
          //   datasetType = data.datasetType
          // }
          if(ntkoed){
            //ntkoBrowser.openWindow("http://www.baidu.com");
            ntkoBrowser.openWindow("/static/html/editindex.html?imanFileUid="+data.imanFileUid);
            //ntkoBrowser.openWindow
          }else{
            var iTop = ntkoBrowser.NtkoiTop();   //获得窗口的垂直位置;
            var iLeft = ntkoBrowser.NtkoiLeft();        //获得窗口的水平位置;
            window.open("/static/html/exeindex.html","","height=200px,width=500px,top="+iTop+"px,left="+iLeft+"px,titlebar=no,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no");
          }
        }
      },

    },
    mounted() {
      // 请求等待
      const loading = this.$loading({
        lock: true,
        text: '查询中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //右侧bom请求
      this.axios.post('apis/bom',this.qs.stringify({uid:this.$store.state.multipleSiteCollaboration.currentSiteName}))
        .then((response)=>{
          if(response.data.success){
            var dataTree = []
            dataTree.push(response.data.body)
            this.data = dataTree
            this.$store.commit('documentEnquiry/saveTreeBomData',{msg1:response.data.body
            })
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
        }) .catch((error)  => {
        this.$alert('请求错误！', '异常提示', {
          confirmButtonText: '确定',
        });
      })

      // 查询结果属性
      this.axios.post('apis/property',this.qs.stringify({uid:this.$store.state.multipleSiteCollaboration.currentSiteName}))
        .then((response)=>{
          if(response.data.success){
            this.$store.commit('documentEnquiry/saveResultPropety',{msg1:response.data.body[0]
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
        }) .catch((error)  => {
        //  loading 请求等待
        loading.close();
        this.$alert('请求错误！', '异常提示', {
          confirmButtonText: '确定',
        });
      })


      //  审批文件
      //请求word pdf文件信息
      this.axios.post('apis/queryNumberFile',this.qs.stringify({uid:this.$store.state.multipleSiteCollaboration.currentSiteName})
      ).then((response)=>{
        if(response.data.success) {
          var resData = response.data.body
          this.$store.commit('taskProcessing/saveWordMes',{msg1:resData })
          var bomMes = response.data.body
          var bomMesArr = []
          for(var i=0;i<bomMes.length;i++){
            var bom = ''
            bom = {datasetName: bomMes[i].datasetName, fileName: bomMes[i].fileName, fileSize: bomMes[i].fileSize,fileType:bomMes[i].datasetType,last_mod_date:bomMes[i].last_mod_date,imanFileUid:bomMes[i].imanFileUid,fileExt:bomMes[i].fileExt,datasetUid:bomMes[i].datasetUid}
            bomMesArr.push(bom)
          }
          this.$store.commit('taskProcessing/saveBomMes',{msg1:bomMesArr
          })
          //  审批文件賦值
          var dataRef =  [
            {
              datasetName: this.$store.state.documentEnquiry.fileName,
              child: bomMesArr
            }
          ]
          this.DSData = dataRef
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
        // else if(response.data.body == '获取文件失败'){
        //   //  审批文件賦值
        //   var dataRef =  [
        //     {
        //       fileName: this.$store.state.documentEnquiry.fileName,
        //       time: this.$store.state.taskProcessing.rightDetailTaskFist.time,
        //       operation: ' ',
        //       children: []
        //     }
        //   ]
        //   this.DSData = dataRef
        //   this.$message.error('请求word等文件信息失败')
        // }
      }).catch((error)  => {
        console.log(error)
        this.$message.error('请求word等文件信息失败')
      })


      // 审签信息
      this.axios.post('apis/signoff',this.qs.stringify({uid:this.$store.state.multipleSiteCollaboration.currentSiteName}))
        .then((response)=>{
          if(response.data.success){
            if(!response.data.body)
              return
            if(response.data.body.workflowInfos.length > 0) {
              var childTasks = response.data.body.workflowInfos

              // 审签信息
              var task1
              var objectString
              var responseiblePOS
              var lasstMD
              var comment
              var taskState
              var childTasks2 = []
              var num = 0
              for(var i=childTasks.length-1;i>=0;i--){
                num++
                childTasks[i]['id'] = i+1
                childTasks[i]['numbOfSheaves'] = '第'+(num)+'轮'
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
            }
          }else {

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
        }) .catch((error)  => {
        this.$alert('请求错误！', '异常提示', {
          confirmButtonText: '确定',
        });
      })
    }
  }


</script>
<style>
  .el-tree-node__label{
    color:rgb(64, 158, 255);
  }
</style>
