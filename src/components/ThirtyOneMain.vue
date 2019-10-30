<template>
  <div style="width: 100%;height: 100%;">
    <el-row>
      <el-col class="search">搜索</el-col>
    </el-row>
    <el-container id="box">
      <el-aside class="searchAside" id="leftAside">
        <el-form ref="form" :model="form"  >
          <el-form-item style="margin: 0px;" >
            <el-select  v-model="qvalue" placeholder="文档查询" style="width:100%;"  @change="selectTrigger(qvalue)">
              <el-option
                v-for="item in this.$store.state.documentEnquiry.query.queryName"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form ref="formTwo" :model="form" style="width:100%;" size="mini" v-for="(item,index) in this.$store.state.documentEnquiry.queryCondition " @submit.native.prevent>
          <!--<div>-->
          <!--<span> {{item.userEntryNameDisplay}}:</span>-->
          <!--<span> <el-input v-model="index"></el-input></span>-->
          <!--</div>-->
          <div v-if="item.userEntryNameDisplay.length>0">
            <el-form-item :label="item.userEntryNameDisplay" label-width="35%"  v-if="isHide == 'true'" >
              <!--            “item.tag && item.tag.indexOf(‘str’) != -1”-->
              <div v-if="item.userEntryNameDisplay && item.userEntryNameDisplay.indexOf('时间') !=-1">
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
        <el-button  @click="pullDown" icon="el-icon-arrow-down" style="padding: 0px;width: 70px;" v-if="isPDHide == 'true'"></el-button>
        <br>
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
        <div id="app">
          　　<el-table :data="tableData" style="width: 100%" border @row-click="getDetails">
          　　　　<el-table-column v-for="item in tableHeader" :prop="item.key" :label="item.name" v-if="!(item.name.indexOf('Uid') !=-1)" show-overflow-tooltip=true>
          　　　　</el-table-column>
          　　</el-table>
          　　<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pageSize"　layout="total, prev, pager, next,jumper" :total="this.$store.state.documentEnquiry.paging.totalElements">
          　　</el-pagination>
        </div>
      </el-aside>

      <el-main class="searchMain" id="rightMain">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!--          <el-tab-pane label="属性" name="first">-->
          <!--            <el-form ref="form" :model="form" label-width="25%"  style="width:50%;">-->
          <!--              <el-form-item label="名称">-->
          <!--                <el-input disabled v-model="form.name"></el-input>-->
          <!--              </el-form-item>-->
          <!--              <el-form-item label="object_string">-->
          <!--                <el-input disabled v-model="form.object_string"></el-input>-->
          <!--              </el-form-item>-->
          <!--              <el-form-item label="object_type">-->
          <!--                <el-input disabled v-model="form.object_type"></el-input>-->
          <!--              </el-form-item>-->
          <!--            </el-form>-->
          <!--          </el-tab-pane>-->
          <el-tab-pane label="产品结构" name="second">
            <div>
              <treetable :data="this.$store.state.documentEnquiry.treeBomData" :columns="columns" border/>
            </div>
          </el-tab-pane>

          <el-tab-pane label="文档查看" name="three">
            <div>
              <treetable :data="DSData" :columns="DSColumns" border/>
            </div>
          </el-tab-pane>

          <el-tab-pane label="审签信息" name="third">
            <el-table :data="auditTableData" border style="width: 50%">
              <el-table-column prop="serial" label="序号" width="100%">
              </el-table-column>
              <el-table-column prop="category" label="类别"  width="100%">
              </el-table-column>
              <el-table-column prop="content" label="内容">
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-main>
      <div id="divisionLine"></div>
    </el-container>
  </div>
</template>

<script>
  import treeTable from './TreeTable'
  export default {
    components: { 'treetable': treeTable },
    data () {
      return {
        isHide: 'true',
        isPDHide: 'false',

        auditTableData: '',
        tableHeader: '',
        // tableHeader: [{
        //   name: '对象名称',
        //   key: 'object_string'
        // }
        //   ,
        //   {
        //     name: '文档类型',
        //     key: 'ht3_object_type'
        //   }
        //   ,
        //   {
        //     name: '文档编号',
        //     key: 'ht3_DocPin'
        //   }
        //   ,
        //   {
        //     name: '文档名称',
        //     key: 'ht3_DocName'
        //   }
        //   ,
        //   {
        //     name: '版本',
        //     key: 'current_revision_id'
        //   }
        //   ,
        //   {
        //     name: '创建者（所有者）',
        //     key: 'owning_user'
        //   }
        //   ,
        //   {
        //     name: '创建时间',
        //  key: 'creation_date'
        //   }
        //   ,
        //   {
        //     name: '编制单位',
        //     key: 'owning_group'
        //   }
        //   ,
        //   {
        //     name: '所属型号',
        //     key: 'projects_list'
        //   }
        //   ,
        //   {
        //     name: '型号专业',
        //     key: 'ht3_Major'
        //   }
        //   ,
        //   {
        //     name: '修改者',
        //     key: 'last_mod_user'
        //   }
        //   ,
        //   {
        //     name: '修改时间',
        //     key: 'last_nod_date'
        //   }
        //   ,
        //   {
        //     name: '密级',
        //     key: 'ht3_Secrecy'
        //   }
        //   ,
        //   {
        //     name: '主题词',
        //     key: 'ht3_KeyWords'
        //   }
        //   ,
        //   {
        //     name: '摘要',
        //     key: 'ht3_abstract'
        //   }
        //   ,
        //   {
        //     name: '型号代号',
        //     key: 'ht3_WeaponModel'
        //   }
        //   ,
        //   {
        //     name: '产品代号',
        //     key: 'ht3_ProductModel'
        //   }
        //   ,
        //   {
        //     name: '是否技术状态文件',
        //     key: 'ht3_isTechStaFile'
        //   }
        //   ,
        //   {
        //     name: '当前状态',
        //     key: 'release_statuses'
        //   }
        //   ,
        //   {
        //     name: '产品结构树位置',
        //     key: 'HT3_SYS'
        //   }
        //
        // ],
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
        // form: {
        //   unit: '',
        //   name: '',
        //   object_string: '',
        //   object_type: '',
        //   region: '',
        //   date1: '',
        //   date2: '',
        //   delivery: false,
        //   type: [],
        //   resource: '',
        //   desc: '',
        //   activeName: 'second'
        // },
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
        ]
      }
    },
    methods: {
      pullDown () {
        // 显示条件
        this.isHide = 'true'
        // 不显示下拉
        this.isPDHide = 'false'
      },
      handleSizeChange (val) {
        console.log('555')
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(this.$store.state.documentEnquiry.pagingParameters)
        console.log(`当前页: ${val}`)
        if (this.$store.state.documentEnquiry.pagingParameters.entryValues !== 'undefined') {
          console.log(this.$store.state.documentEnquiry.pagingParameters.entryValues)
          console.log('entryValues不为空，可以发请求')
          var parameters = this.qs.stringify({queryUid: this.$store.state.documentEnquiry.queryConditionUid.uid,
            entryNames: this.$store.state.documentEnquiry.pagingParameters.entryNames,
entryValues: this.$store.state.documentEnquiry.pagingParameters.entryValues,
currentPage: val - 1
          })
          this.axios.post('apis/page', parameters)
            .then((response) => {
              // 取出content中的table头,table表数据
              var arrTableHeader = []
              for (let i in response.data.body.head[0]) {
                var obj = {name: response.data.body.head[0][i], key: i}
                arrTableHeader.push(obj)
              }
              this.tableHeader = arrTableHeader
              this.tableData = response.data.body.content

              // 保存总数据条数
              console.log(response.data.body.totalElements)
              this.$store.commit('documentEnquiry/savePaging', {msg1: response.data.body.totalElements,
                msg2: response.data.body.pageable.pageSize,
                msg3: response.data.body.pageable.pageNumber + 1
              })
              this.currentPage = val
              console.log(this.$store.state.documentEnquiry.paging.currentPage)
            }).catch((error) => {
            console.log(error)
            this.$message.error('请求失败')
          })
        }
      },
      // 查询按钮
      onSubmit () {
        console.log('submit!')
        console.log()

        // 隐藏
        this.isHide = false
        // 显示下拉选项
        this.isPDHide = 'true'
        // 请求数据
        // console.log(this.item_id)
        var arrQueryValue = ''
        var arrQueryKey = ''
        this.$store.state.documentEnquiry.queryCondition.forEach(item => {
          console.log(item.value)
          if (!(item.value)) {
            arrQueryValue += ''
          } else {
            arrQueryValue += (item.value + ',')
            arrQueryKey += (item.userEntryNameDisplay + ',')
          }
        })
        arrQueryKey = arrQueryKey.substring(0, arrQueryKey.length - 1)
        arrQueryValue = arrQueryValue.substring(0, arrQueryValue.length - 1)
        console.log(arrQueryValue)
        console.log(JSON.stringify(arrQueryValue))
        console.log(arrQueryKey)
        console.log(JSON.stringify(arrQueryKey))
        var parameters = this.qs.stringify({queryUid: this.$store.state.documentEnquiry.queryConditionUid.uid,
          entryNames: arrQueryKey,
entryValues: arrQueryValue,
currentPage: 0
        })
        // 存/page请求参数
        this.$store.commit('documentEnquiry/savePagingParameters', {msg1: arrQueryKey, msg2: arrQueryValue})
        console.log('99999999999')
        console.log(this.$store.state.documentEnquiry.pagingParameters.entryValues)

        this.axios.post('apis/page', parameters)
          .then((response) => {
            // 取出content中的table头,table表数据
            console.log('测试table表格')
            console.log(response.data.body.head[0])
            var arrTableHeader = []
            for (let i in response.data.body.head[0]) {
              var obj = {name: response.data.body.head[0][i], key: i}
              arrTableHeader.push(obj)
            }
            this.tableHeader = arrTableHeader
            console.log(arrTableHeader)
            this.tableData = response.data.body.content
            console.log(response.data.body.content)

            // 保存总数据条数
            console.log(response.data.body.totalElements)
            this.$store.commit('documentEnquiry/savePaging', {msg1: response.data.body.totalElements,
              msg2: response.data.body.pageable.pageSize,
              msg3: response.data.body.pageable.pageNumber + 1
            })
          }).catch((error) => {
          console.log(error)
          this.$message.error('请求失败')
        })
      },
      handleClick (tab, event) {
        console.log(tab, event)
      },
      // 选择查询构建器名称，发起请求
      selectTrigger (val) {
        // 不隐藏
        this.isHide = 'true'
        // 不显示下拉
        this.isPDHide = 'false'

        console.log(val)
        this.axios.post('apis/device', this.qs.stringify({queryName: val}))
          .then((response) => {
            this.$store.commit('documentEnquiry/saveQueryCondition', {msg1: response.data.body.queryClauses
            })
            this.$store.commit('documentEnquiry/saveQueryCondeitionUid', {msg1: response.data.body.uid
            })
            // 清除搜索出来的table数据
            this.tableData = ''
            this.tableHeader = ''
          }).catch((error) => {
          console.log(error)
          this.$message.error('查询构建器请求失败')
        })
      },
      getDetails (row) {
        console.log(row)
        // 点击左侧搜索的属性数据，请求
        // this.form.name = row.object_string
        // this.form.object_string = row.object_string
        // this.form.object_type = row.object_type

        // 右侧bom请求
        this.axios.post('apis/bom', this.qs.stringify({uid: row.uid}))
          .then((response) => {
            console.log(response.data.body)
            if (response.data.body == '传入的类型不可展示BOM') {
              this.$message.warning('传入的类型不可展示BOM')
            } else {
              // this.data = response.data.body
              this.$store.commit('documentEnquiry/saveTreeBomData', {msg1: response.data.body
              })
            }
          }).catch((error) => {
          console.log(error)
          this.$message.error('右侧bom请求失败')
        })

        // 审批信息
        this.axios.post('apis/signoff', this.qs.stringify({uid: row.uid}))
          .then((response) => {
            console.log(response.data.body)
            if (response.data.body == '无法获取签审信息') {
              this.$message.warning('无法获取签审信息')
            } else {
              // 审签信息
              var childTasks = response.data.body
              // console.log(childTasks.length)
              var shenQian = []
              var serial = ''
              var category = ''
              var content = ''
              // var parent_name = response.data.body.task_state
              for (var i = 0; i < childTasks.length; i++) {
                var task1 = {serial: i + 1, category: '节点', content: childTasks[i].object_string}
                var task2 = {serial: '', category: '审签者', content: childTasks[i].responsible_party.object_string}
                var task3 = {serial: '', category: '意见', content: childTasks[i].responsible_party.assignable_projects}
                var task4 = {serial: '', category: '时间', content: childTasks[i].last_mod_date}
                shenQian.push(task1)
                shenQian.push(task2)
                shenQian.push(task3)
                shenQian.push(task4)
                console.log(childTasks[i].task_state)
                if (childTasks[i].task_state == '已开始') {
                  break
                }
              }
              this.auditTableData = shenQian
            }

            //  审批文件
            // 请求word pdf文件信息
            this.axios.post('apis/wordPdf', this.qs.stringify({taskUid: row.uid})
            ).then((response) => {
              console.log(response.data.body)
              if (response.data.body != '获取文件失败') {
                var resData = response.data.body
                this.$store.commit('taskProcessing/saveWordMes', {msg1: resData })
                var bomMes = response.data.body
                var bomMesArr = []
                var fileName = ''
                var time = ''
                var operation = ''
                var id = ''
                for (var i = 0; i < bomMes.length; i++) {
                  var bom = ''
                  // 搜索文档都只能查看数据集
                  // if(bomMes[i].fileType == 'docx' || bomMes[i].fileType == 'doc'){
                  //   bom = {fileName:bomMes[i].fileName,time:bomMes[i].last_mod_date,operation:'批注',id:bomMes[i].id,fileType:bomMes[i].fileType}
                  // }else{
                  bom = {fileName: bomMes[i].fileName, time: bomMes[i].last_mod_date, operation: '查看', id: bomMes[i].id, fileType: 'pdf'}
                  // }
                  bomMesArr.push(bom)
                }
                this.$store.commit('taskProcessing/saveBomMes', {msg1: bomMesArr
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
                this.DSData = dataRef
                console.log('999999999999999999999999999999999999999999999999999')

                console.log(this.data)
              } else if (response.data.body == '获取文件失败') {
                //  审批文件賦值
                var dataRef = [
                  {
                    fileName: this.$store.state.taskProcessing.rightDetailTaskFist.job_name,
                    time: this.$store.state.taskProcessing.rightDetailTaskFist.time,
                    operation: ' ',
                    children: []
                  }
                ]
                this.DSData = dataRef
                this.$message.error('请求word等文件信息失败')
              }
            }).catch((error) => {
              console.log(error)
              this.$message.error('请求word等文件信息失败')
            })
          }).catch((error) => {
          console.log(error)
          this.$message.error('审批信息请求失败')
        })
      }
    },
    mounted () {
      // 请求查询构建器名称
      this.axios.post('apis/condition')
        .then((response) => {
          console.log('查询构建器名称')
          console.log(response.data.body)
          this.$store.commit('documentEnquiry/saveQuery', {msg1: response.data.body
          })
        }).catch((error) => {
        console.log(error)
        this.$message.error('请求失败')
      })

      // 分隔栏，调整左右界面
      var oBox = $('box'), oTop = $('leftAside'), oBottom = $('rightMain'), oLine = $('divisionLine')
      oLine.onmousedown = function (e) {
        var disX = (e || event).clientX
        oLine.left = oLine.offsetLeft
        document.onmousemove = function (e) {
          var iT = oLine.left + ((e || event).clientX - disX)
          var e = e || window.event, tarnameb = e.target || e.srcElement
          var maxT = oBox.clientWight - oLine.offsetWidth
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
    }
  }

  function $ (id) {
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
    box-sizing: padding-box;
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
</style>
