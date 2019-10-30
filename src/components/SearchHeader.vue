<template>
  <div style="width: 100%;height: 100%;">
    <el-row>
      <el-col class="search">搜索</el-col>

    </el-row>
    <el-container id="box">
      <el-aside class="searchAside" id="leftAside">
        <el-form ref="form" :model="form"  >
          <el-form-item style="margin: 0px;" >
            <el-select  v-model="qvalue" placeholder="选择查询项" style="width:100%;"  @change="selectTrigger(qvalue)">
              <el-option
                v-for="item in this.$store.state.documentEnquiry.query.queryName"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div v-if = 'isHide'>
          <el-button  @click="pullDown" icon="el-icon-arrow-up" style="padding: 0px;width: 70px;"></el-button>
        </div>
        <div v-else>
        <el-button  @click="pullDown" icon="el-icon-arrow-down" style="padding: 0px;width: 70px;"></el-button>
        </div>
        <el-form ref="formTwo" :model="form" style="width:100%;" size="mini" v-for="(item,index) in this.$store.state.documentEnquiry.queryCondition " @submit.native.prevent>
          <!--<div>-->
          <!--<span> {{item.userEntryNameDisplay}}:</span>-->
          <!--<span> <el-input v-model="index"></el-input></span>-->
          <!--</div>-->
          <div v-if="item.userEntryName.length>0">
            <el-form-item :label="item.userEntryName" label-width="35%"  v-if="isHide" >
              <!--            “item.tag && item.tag.indexOf(‘str’) != -1”-->
              <div v-if="item.userEntryName && item.userEntryName.indexOf('时间') !=-1">
                <el-date-picker v-model="item.value" type="datetime" placeholder="选择日期时间" format="yyyy-M-dd HH:mm" value-format="yyyy-M-dd HH:mm" style="width:80%;"></el-date-picker>
              </div>
              <div v-else>
                <el-input v-model="item.value"  @keyup.enter.native="onSubmit()" style="width:80%;"></el-input>
              </div>
            </el-form-item>
          </div>

          <!--<el-form-item label="编号">-->
          <!--<el-input v-model="form.num"></el-input>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="编制单位" label-width="80px">-->
          <!--<el-select v-model="form.unit" placeholder="">-->
          <!--<el-option label="单位一" value="shanghai"></el-option>-->
          <!--<el-option label="单位二" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="所有者" label-width="80px">-->
          <!--<el-select v-model="form.owner" placeholder="">-->
          <!--<el-option label="张三" value="shanghai"></el-option>-->
          <!--<el-option label="李四" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="所属型号" label-width="80px">-->
          <!--<el-select v-model="form.type" placeholder="">-->
          <!--<el-option label="型号一" value="shanghai"></el-option>-->
          <!--<el-option label="型号二" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="文档类型" label-width="80px">-->
          <!--<el-select v-model="form.doctype" placeholder="">-->
          <!--<el-option label="PDF" value="shanghai"></el-option>-->
          <!--<el-option label="TEXT" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="状态" label-width="80px">-->
          <!--<el-select v-model="form.state" placeholder="">-->
          <!--<el-option label="状态一" value="shanghai"></el-option>-->
          <!--<el-option label="状态二" value="beijing"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->

          <!--<el-form-item>-->
          <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
          <!--</el-form-item>-->
          <!--<h3 style="text-align: left;">4个查询结果</h3>-->
        </el-form>
<!--        <br>-->
        <el-button type="primary" @click.native.prevent="onSubmit()" style="text-align: center;line-height: 0px;">查询</el-button>
<!--        <h4 style="text-align: left;">{{this.$store.state.documentEnquiry.paging.totalElements}}个查询结果</h4>-->

        <!--<el-table :data="tableData" border style="width: 100%;">-->
        <!--<el-table-column prop="date" label="对象">-->
        <!--</el-table-column>-->
        <!--&lt;!&ndash;<el-table-column prop="name" label="类型">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column prop="address" label="关系">&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->
        <!--</el-table>-->

      </el-aside>

      <el-main class="searchMain" id="rightMain">
        <div id="app">
          　　<el-table :data="tableData" style="width: 100% ;" border @row-click="getDetails"  class="searchTable">
          　　　　<el-table-column v-for="item in tableHeader" :prop="item.key" :label="item.name" v-if="!(item.name.toLowerCase().indexOf('uid') !=-1)" show-overflow-tooltip=true>
          　　　　</el-table-column>
          　　</el-table>
<!--          <el-dialog title="详细信息" :visible.sync="dialogVisible" width="80%" :before-close="handleClose">-->
<!--                  <el-tabs v-model="activeName" @tab-click="handleClick">-->
<!--                    <el-tab-pane label="产品结构" name="second">-->
<!--                      <div>-->
<!--                        <treetable :data="this.$store.state.documentEnquiry.treeBomData" :columns="columns" border/>-->
<!--                      </div>-->
<!--                    </el-tab-pane>-->
<!--                    <el-tab-pane label="文档查看" name="three">-->
<!--                      <div>-->
<!--&lt;!&ndash;                        <treetable :data="DSData" :columns="DSColumns" border/>&ndash;&gt;-->
<!--                        <el-tree :data="DSData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
<!--                      </div>-->
<!--                    </el-tab-pane>-->
<!--                    <el-tab-pane label="审签信息" name="third">-->
<!--                      <el-table :data="auditTableData" border style="width: 50%">-->
<!--                        <el-table-column prop="serial" label="序号" width="100%">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="category" label="类别"  width="100%">-->
<!--                        </el-table-column>-->
<!--                        <el-table-column prop="content" label="内容">-->
<!--                        </el-table-column>-->
<!--                      </el-table>-->
<!--                    </el-tab-pane>-->
<!--                  </el-tabs>-->
<!--            <span slot="footer" class="dialog-footer">-->
<!--&lt;!&ndash;            <el-button @click="dialogVisible = false">取 消</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;            <el-button type="primary" @click="dialogVisible = false,clearData()">确 定</el-button>&ndash;&gt;-->
<!--          </span>-->
<!--          </el-dialog>-->
          　　<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="this.$store.state.documentEnquiry.paging.currentPage" :page-size="pageSize"　layout="total, prev, pager, next,jumper" :total="this.$store.state.documentEnquiry.paging.totalElements">
          　　</el-pagination>
        </div>
      </el-main>
      <div id="divisionLine"></div>
    </el-container>
  </div>
</template>

<script>
  import treeTable from './TreeTable'
  import {ntkoBrowser, ExtensionInstalled, openWindow, NtkoiTop, NtkoiLeft} from './TreeTable/ntkobackground.min.js'
  export default {
    components: { 'treetable': treeTable },
    data () {
      return {
        defaultProps: {
          // children: 'uiChildren',
          children: 'child',
          label: 'fileName'
        },
        // dialogVisible:false,

        isHide:true,
        isPDHide:true,

        auditTableData: '',
        tableHeader:'',

        tableData: '',
        pageSize: this.$store.state.documentEnquiry.paging.pageSize,
        currentPage: this.$store.state.documentEnquiry.paging.currentPage,
        qvalue: '',
        activeName: 'second',

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
        DSData: [],

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
      }
    },
    methods: {
      // 审核内容
      handleNodeClick(data) {
        if(data.fileType){
          //判断插件是否安装
          var ntkoed=ntkoBrowser.ExtensionInstalled();
          if(ntkoed){
            ntkoBrowser.openWindow("/static/html/editindex.html?id="+data.id+"&fileType="+data.fileType+"&username="+this.$store.state.login.tcUserMes.username+"&fileName="+data.fileName);
            //ntkoBrowser.openWindow
          }else{
            var iTop = ntkoBrowser.NtkoiTop();   //获得窗口的垂直位置;
            var iLeft = ntkoBrowser.NtkoiLeft();        //获得窗口的水平位置;
            window.open("/static/html/exeindex.html","","height=200px,width=500px,top="+iTop+"px,left="+iLeft+"px,titlebar=no,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no");
          }
        }

      },
      // 确定后,清除内容
      clearData(){
        this.auditTableData = ''
        this.DSData = ''
        this.$store.commit('documentEnquiry/saveQueryCondition',{msg1:''})
      },
      pullDown() {
        if(this.isHide){
          this.isHide = false
        }else {
          this.isHide = true
        }
        // 显示条件
        // this.isHide =true
        // // 不显示下拉
        // this.isPDHide = false
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (this.$store.state.documentEnquiry.pagingParameters.entryValues !== 'undefined'){
          var parameters = this.qs.stringify({queryUid :this.$store.state.documentEnquiry.queryConditionUid.uid,
            entryNames:this.$store.state.documentEnquiry.pagingParameters.entryNames,entryValues:this.$store.state.documentEnquiry.pagingParameters.entryValues,objectUIDS:JSON.stringify(this.$store.state.documentEnquiry.paging.objectUIDS),currentPage:val-1
          })
          this.axios.post('apis/page',parameters)
            .then((response)=>{
              if(response.data.success){
                // 取出content中的table头,table表数据
                var arrTableHeader = []
                for(let i in response.data.body.head[0]){
                  var obj = {name:response.data.body.head[0][i],key:i}
                  arrTableHeader.push(obj)
                }
                this.tableHeader = arrTableHeader
                this.tableData = response.data.body.content
                //保存总数据条数
                this.$store.commit('documentEnquiry/savePaging',{msg1:response.data.body.totalElements,
                  msg2:response.data.body.pageable.pageSize,
                  msg3:response.data.body.pageable.pageNumber+1
                })
                this.currentPage = val
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
              if(response.data.body){
                // 取出content中的table头,table表数据
                var arrTableHeader = []
                for(let i in response.data.body.head[0]){
                  var obj = {name:response.data.body.head[0][i],key:i}
                  arrTableHeader.push(obj)
                }
                this.tableHeader = arrTableHeader
                this.tableData = response.data.body.content
                var objectUids  =  response.data.body.objectUIDS
                //保存总数据条数
                this.$store.commit('documentEnquiry/savePaging',{msg1:response.data.body.totalElements,
                  msg2:response.data.body.pageable.pageSize,
                  msg3:response.data.body.pageable.pageNumber+1,
                  msg4:objectUids
                })
                this.currentPage = val
              }else{
                this.$alert(response.data.message, '异常提示', {
                  confirmButtonText: '确定',
                });
              }
            }

              }


              //  loading 请求等待
              loading.close();
            }) .catch((error)  => {
            //  loading 请求等待
            loading.close();
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            })
          })

        }

      },
      // 查询按钮
      onSubmit () {
        if(this.$store.state.documentEnquiry.queryCondition.length>0){
          // 请求等待
          const loading = this.$loading({
            lock: true,
            text: '查询中',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          });
          // 隐藏
          // this.isHide = false
          // // 显示下拉选项
          // this.isPDHide = false
          // 请求数据
          var arrQueryValue = '';
          var arrQueryKey = '';
          this.$store.state.documentEnquiry.queryCondition.forEach(item =>{
            if(!(item.value)){
              arrQueryValue+=''
            }else{
              arrQueryValue+=(item.value+',')
              arrQueryKey+=(item.userEntryName+',')
            }
          })
          arrQueryKey = arrQueryKey.substring(0,arrQueryKey.length-1);
          arrQueryValue = arrQueryValue.substring(0,arrQueryValue.length-1);
          var parameters = this.qs.stringify({queryUid :this.$store.state.documentEnquiry.queryConditionUid.uid,
            entryNames:arrQueryKey,objectUIDS:'',entryValues:arrQueryValue,currentPage:0
          })
          //存/page请求参数
          this.$store.commit('documentEnquiry/savePagingParameters',{msg1:arrQueryKey,msg2:arrQueryValue})



          this.axios.post('apis/page',parameters)
            .then((response)=>{
              if(response.data.success){
                // 取出content中的table头,table表数据
                var arrTableHeader = []
                for(let i in response.data.body.head[0]){
                  var obj = {name:response.data.body.head[0][i],key:i}
                  arrTableHeader.push(obj)
                }
                this.tableHeader = arrTableHeader
                this.tableData = response.data.body.content

                var objectUids  =  response.data.body.objectUIDS
                //保存总数据条数
                this.$store.commit('documentEnquiry/savePaging',{msg1:response.data.body.totalElements,
                  msg2:response.data.body.pageable.pageSize,
                  msg3:response.data.body.pageable.pageNumber+1,
                  msg4:objectUids
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
              if(response.data.body){
                // 取出content中的table头,table表数据
                var arrTableHeader = []
                for(let i in response.data.body.head[0]){
                  var obj = {name:response.data.body.head[0][i],key:i}
                  arrTableHeader.push(obj)
                }
                this.tableHeader = arrTableHeader
                this.tableData = response.data.body.content

                var objectUids  =  response.data.body.objectUIDS
                //保存总数据条数
                this.$store.commit('documentEnquiry/savePaging',{msg1:response.data.body.totalElements,
                  msg2:response.data.body.pageable.pageSize,
                  msg3:response.data.body.pageable.pageNumber+1,
                  msg4:objectUids
                })
                // this.$alert('当前查询结果超过500条，将只显示500条结果，请您精确查询条件缩小查询范围', '查询提示', {
                //   confirmButtonText: '确定',
                // });
              }
                this.$alert(response.data.message, '异常提示', {
                  confirmButtonText: '确定',
                });

            }

              }


              //  loading 请求等待
              loading.close();
            }) .catch((error)  => {
            //  loading 请求等待
            loading.close();
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            });
          })
        }else{
          this.$message.warning('请选择查询构建器!')
        }


      },
      handleClick (tab, event) {
      },
      // 选择查询构建器名称，发起请求
      selectTrigger(val) {

        // 不隐藏
        this.isHide = true

        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });


        this.axios.post('apis/device',this.qs.stringify({queryName:val}))
          .then((response)=>{
            if(response.data.success){
              this.$store.commit('documentEnquiry/saveQueryCondition',{msg1:response.data.body.queryClauses
              })
              this.$store.commit('documentEnquiry/saveQueryCondeitionUid',{msg1:response.data.body.uid
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

            // 清除搜索出来的table数据
            this.tableData = ''
            this.tableHeader = ''

            //  loading 请求等待
            loading.close();
          }) .catch((error)  => {
          //  loading 请求等待
          loading.close();
          this.$alert('请求错误！', '异常提示', {
            confirmButtonText: '确定',
          });
        })
      },
      getDetails(row){
        //判断插件是否安装
        var ntkoed=ntkoBrowser.ExtensionInstalled();
        if(ntkoed){
          const newOpenWindow = window.open('about:blank')
          this.axios.post('apis/queryNumberFile',this.qs.stringify({uid:row.uid}))
            .then((response)=>{
              console.log('response.data.body')
              console.log(response.data.body)
              if (response.data.success) {
                newOpenWindow.location = "/static/html/editindex.html?imanFileUid=" + response.data.body+"&fileType=1";
              } else {
                newOpenWindow.close();
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



        }else{
          var iTop = ntkoBrowser.NtkoiTop();   //获得窗口的垂直位置;
          var iLeft = ntkoBrowser.NtkoiLeft();        //获得窗口的水平位置;
          window.open("/static/html/exeindex.html","","height=350px,width=600px,top="+iTop+"px,left="+iLeft+"px,titlebar=no,toolbar=no,menubar=no,scrollbars=auto,resizeable=no,location=no,status=no");
        }





        // 保存当前选择的站点名称
        // this.$store.commit('multipleSiteCollaboration/saveCurrentSiteName',{msg1:row.uid
        // })
        // this.$store.commit('documentEnquiry/saveFileName',{msg1:row.object_string})

        // 保存 这条数据  在tableHeader中添加一个attributeValue
        // var tableH = this.tableHeader
        // var attributeValue = 'attributeValue'
        // for(var i = 0;i<tableH.length;i++){
        //   var tableKey = tableH[i].key
        //   tableH[i][attributeValue] = row[tableKey]
        // }
        // this.$store.commit('documentEnquiry/saveSearchRow',{msg1:tableH})

        // 点击跳出新页面
        // let routeUrl = this.$router.resolve({
        //   path: "/SearchResult",
        //   query: {}
        // });
        // window.open(routeUrl .href, '_blank');


        // this.dialogVisible = true
      }
    },
    mounted() {
      // 请求等待
      const loading = this.$loading({
        lock: true,
        text: '查询中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      //  清楚查询构构建器条件
      this.$store.commit('documentEnquiry/saveQueryCondition',{msg1:''})

      // 请求查询构建器名称
      this.axios.post('apis/condition')
        .then((response)=>{
          if(response.data.success){
            this.$store.commit('documentEnquiry/saveQuery',{msg1:response.data.body
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

  .search {
    height: 10%;
    font-weight:bold;
    color:#FFFFFF;
    font-size:40px;
    padding: 1% 0%;
    /*box-sizing: padding-box;*/
    background-color: #076998;
  }
  .el-container{
    width:100%;
    height:90%;
  }
  .searchAside{
    background-color: #F0F0F0;
  }
  .searchMain{
    background-color: #ffffff;
    height:100%;
    width:100%;
  }
  .searchTable.el-table--enable-row-hover .el-table__body tr:hover>td{
    color:#409EFF;
  }
</style>
