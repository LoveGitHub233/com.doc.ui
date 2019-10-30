<template>
  <div style="width: 100%;height: 100%;">
    <el-header style="background-color: #076998;">
      <el-menu :default-active="activeIndex" class="el-menu-demo" style="background-color: #076998;border-bottom: 0px;"
               mode="horizontal"
               @select="handleSelect"
               text-color="#fff"
               active-text-color="#ffd04b"
      >
        <span class="span">多站点协同</span>
        <el-menu-item v-for="(item,index) in this.$store.state.multipleSiteCollaboration.siteName" :index="index"
                      @click="itemclick(item)">{{ item }}
        </el-menu-item>

      </el-menu>
      <button @click="synchron">用户组织生成</button>
      <span><button @click="synchronPull">用户组织同步</button></span>
      <span></span>
    </el-header>
    <el-main class="main">
      <div style="width: 100%;height: 100%;">
        <el-container style="height:100%;width:100%;background: #FFFFFF">

          <el-main style="text-align:left;line-height: 16px;">
            <el-tabs v-model="activeName" tabPosition="leftAside">

              <el-tab-pane label="日志信息" name="fourth">
                <div id="app">
                  <!--                  <el-table :data="tableData" style="width: 100%" border @row-click="getDetails">-->

                  <el-table :data="tableData" style="width: 100%" border>
                    <el-table-column label="序号" width="50">
                      <template scope="scope"><span>{{scope.$index + 1}} </span></template>
                    </el-table-column>

                    <el-table-column v-for="item in tableHeader" :prop="item.key" :label="item.name"
                                     show-overflow-tooltip=true>
                    </el-table-column>
                    <el-table-column label="记录时间" width="180">
                      <template slot-scope="scope">
                        <span>{{timestampToTime(scope.row.logTimestamp)}}</span>
                      </template>
                    </el-table-column>

                  </el-table>

                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                                 :current-page.sync="this.$store.state.multipleSiteCollaboration.logPage.currentPage" :page-size="this.$store.state.multipleSiteCollaboration.logPage.pageSize"
                                 layout="total, prev, pager, next,jumper"
                                 :total="this.$store.state.multipleSiteCollaboration.logPage.totalElements">
                  </el-pagination>
                </div>
              </el-tab-pane>

              <el-tab-pane label="异常处理" name="sixth">
                <div id="app2">
                  <el-table :data="tableData2" style="width: 100%" border>
                    <el-table-column label="序号" width="50">
                      <template scope="scope"><span>{{scope.$index + 1}} </span></template>
                    </el-table-column>
                    <el-table-column v-for="item in tableHeader2" :prop="item.key" :label="item.name"
                                     show-overflow-tooltip=true>
                    </el-table-column>
                    <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                      <template slot-scope="scope">
                        <el-button @click="handleClickCreate(scope.row)" type="text" size="small">重处理</el-button>
                        <el-button @click="handleClickDelete(scope.row)" type="text" size="small">删除</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column label="记录时间" width="180">
                      <template slot-scope="scope">
                        <span>{{timestampToTime(scope.row.logTimestamp)}}</span>
                      </template>
                    </el-table-column>

                  </el-table>

                  <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
                                 :current-page.sync="this.$store.state.multipleSiteCollaboration.errorInfoPage.currentPage2" :page-size="this.$store.state.multipleSiteCollaboration.errorInfoPage.pageSize2"
                                 layout="total, prev, pager, next,jumper"
                                 :total="this.$store.state.multipleSiteCollaboration.errorInfoPage.totalElements2">

                  </el-pagination>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-main>
        </el-container>
      </div>
    </el-main>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data () {
      return {
        tableData: '',
        tableHeader: [
          //   {
          //   name: '序号',
          //   key: 'id'
          // }
          //   ,
          {
            name: '任务ID',
            key: 'taskId'
          },

          {
            name: '任务所有者',
            key: 'taskOwner'
          },

          {
            name: '任务名称',
            key: 'taskName'
          },

          {
            name: '发起站点',
            key: 'originSite'
          },

          {
            name: '远程站点',
            key: 'remoteSite'
          },

          {
            name: '目标附件',
            key: 'targets'
          },

          {
            name: '审批者',
            key: 'approver'
          },

          {
            name: '记录站点',
            key: 'logSite'
          },

          {
            name: '日志信息',
            key: 'logMessage'
          }
          // ,
          // {
          //   name: '记录时间',
          //   key: 'logTimestamp'
          // }
        ],
        pageSize: this.$store.state.multipleSiteCollaboration.logPage.pageSize,
        currentPage: this.$store.state.multipleSiteCollaboration.logPage.currentPage,

        pageSize2: this.$store.state.multipleSiteCollaboration.errorInfoPage.pageSize2,
        currentPage2: this.$store.state.multipleSiteCollaboration.errorInfoPage.currentPage2,

        tableData2: '',
        tableHeader2: [
          //   {
          //   name: '序号',
          //   key: 'id'
          // }
          //   ,
          {
            name: '任务ID',
            key: 'taskId'
          },

          {
            name: '任务所有者',
            key: 'taskOwner'
          },

          {
            name: '任务名称',
            key: 'taskName'
          },

          {
            name: '发起站点',
            key: 'sendSite'
          },

          {
            name: '接收站点',
            key: 'receiveSite'
          },

          {
            name: '错误类别',
            key: 'errorType'
          },

          {
            name: '错误消息',
            key: 'logMessage'
          },

          // {
          //   name: '时间',
          //   key: 'logTimestamp'
          // }
          // ,
          {
            name: '处理',
            key: 'receiveSite'
          }
        ],

        activeName: 'fourth'

      }
    },
    mounted: function () {

    },
    methods: {
      // 用户组织生成
      synchron () {
        var siteUid = this.$store.state.multipleSiteCollaboration.currentSiteName
        var parameters = this.qs.stringify({site: siteUid})
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('apis/synchron', parameters)
          .then((response) => {
            if(response.data.success) {
              this.$message.success('用户组织生成成功!')
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
          })
          .catch((error)=>{
          this.$alert('请求错误！', '异常提示', {
            confirmButtonText: '确定',
          })
        })
      },
      // 上传组织文件
      synchronPull () {
        var siteUid = this.$store.state.multipleSiteCollaboration.currentSiteName
        var parameters = this.qs.stringify({site: siteUid})
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('apis/synchronPull', parameters)
          .then(() => {
            if(response.data.success) {
              this.$message.success('用户组织同步成功!')
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
          })
          .catch((error)=>{
            loading.close();
          this.$alert('请求错误！', '异常提示', {
            confirmButtonText: '确定',
          })
        })
      },
      timestampToTime (timestamp) {
        var date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return Y + M + D + h + m + s
      },
      // 站点更新
      // siteUpdate(){
      // var siteUid = this.$store.state.multipleSiteCollaboration.currentSiteName
      //   var parameters = this.qs.stringify({site:siteUid})
      //   this.axios.post('apis/site',parameters)
      //     .then((response)=>{
      //
      //     }) .catch((error)  => {
      //     this.$message.error('siteUpdate请求失败')
      //   })
      // },
      handleSizeChange (val) {
        console.log('555')
        console.log(`每页 ${val} 条`)
      },

      // 跳转页,请求数据
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        var parameters = this.qs.stringify({
          site: this.$store.state.multipleSiteCollaboration.currentSiteName, page: val-1
        })
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
           this.axios.post('apis/getLog', parameters)
                  .then((response) => {
                    if(response.data.success){

                      this.tableData =  JSON.parse(response.data.body).content
                      console.log(this.tableData)
                      console.log( JSON.parse(response.data.body))
                      this.$store.commit('multipleSiteCollaboration/saveLogPage', {
                        msg1: JSON.parse(response.data.body).totalElements,
                        msg2: JSON.parse(response.data.body).size,
                        msg3: JSON.parse(response.data.body).number+1
                      })
                      // this.currentPage = val
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

                  })
                  .catch((error)=>{
                    loading.close();
                    this.$alert('请求错误！', '异常提示', {
                      confirmButtonText: '确定',
                    })
                  })
      },

      handleSizeChange2 (val) {
        console.log('555')
        console.log(`每页 ${val} 条`)
      },

      // 跳转页,请求数据
      handleCurrentChange2 (val) {
        console.log(`当前页: ${val}`)
        var parameters = this.qs.stringify({
          site: this.$store.state.multipleSiteCollaboration.currentSiteName, page: val-1
        })
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('apis/getErrorInfo', parameters)
                  .then((response) => {

                    if(response.data.success){
                      this.tableData2 = JSON.parse(response.data.body).content
                      this.$store.commit('multipleSiteCollaboration/saveErrorInfoPage', {
                         msg1: JSON.parse(response.data.body).totalElements,
                         msg2: JSON.parse(response.data.body).size,
                         msg3: JSON.parse(response.data.body).number+1
                      })
                      // this.currentPage2 = val
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


                  })
                  .catch((error)=>{
                    loading.close();
                    this.$alert('请求错误！', '异常提示', {
                      confirmButtonText: '确定',
                    })
                  })
      },

      // 点击多站点头，获取信息
      itemclick (item) {
        // 请求日志信息
        // 存入当前点击的多站点名称
        this.$store.commit('multipleSiteCollaboration/saveCurrentSiteName', {msg1: item})
        // 参数：site 站点名称 page  当前页码
        var parameters = this.qs.stringify({
          site: item, page: 0
        })
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('apis/getLog', parameters)
          .then((response) => {
            if(response.data.success){

              this.tableData =  JSON.parse(response.data.body).content
              console.log(this.tableData)
              this.$store.commit('multipleSiteCollaboration/saveLogPage', {
                msg1: JSON.parse(response.data.body).totalElements,
                msg2: JSON.parse(response.data.body).size,
                msg3: JSON.parse(response.data.body).number+1
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
                //  loading 请求等待
                loading.close();
                this.$alert(response.data.message, '异常提示', {
                  confirmButtonText: '确定',
                });
              }
            }

          })
          .catch((error)=>{
            //  loading 请求等待
            loading.close();
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            })
          })



        // 异常处理
        // 参数：site 站点名称 page  当前页码
        parameters = this.qs.stringify({site: item, page: 0})
        this.axios.post('apis/getErrorInfo', parameters)
          .then((response) => {

            if(response.data.success){
              this.tableData2 = JSON.parse(response.data.body).content
              this.$store.commit('multipleSiteCollaboration/saveErrorInfoPage', {
                 msg1: JSON.parse(response.data.body).totalElements,
                 msg2: JSON.parse(response.data.body).size,
                 msg3: JSON.parse(response.data.body).number+1
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


          })
          .catch((error)=>{
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            })
          })
      },

      // getDetails2(row){
      //   console.log(row)
      //   // 点击左侧搜索的属性数据，请求
      //   this.form.name = row.object_string
      //   this.form.object_string = row.object_string
      //   this.form.object_type = row.object_type
      //
      //   // 右侧bom请求
      //   this.axios.post('apis/bom',this.qs.stringify({uid:row.uid}),
      //     {headers : {'Authorization' : 'Bearer '+this.$store.state.login.resposeMessage.token}})
      //     .then((response)=>{
      //
      //
      //     }) .catch((error)  => {
      //     console.log(error)
      //     this.$message.error('请求失败')
      //   })
      //
      //
      // },

      // 创建流程
      handleClickCreate (row) {
        // 参数：site 站点名称  cusError 异常对象
        // JSON.stringify(Object.assign(row))
        var parameters = {
          site: {'site': this.$store.state.multipleSiteCollaboration.currentSiteName},
          cusError: row
        }
        console.log(parameters)
        // 'Content-Type':'application/json;charset=UTF-8'
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('apis/taksCreate?site=' + this.$store.state.multipleSiteCollaboration.currentSiteName,row
          , {
            headers: {
              'Content-Type': 'application/json;charset=UTF-8'
            }
          })
          .then((response) => {
            if(response.data.success){
                          this.$message.success('删除流程成功!')

                          // 刷新界面,重新请求数据
                          var parameters = this.qs.stringify({
                            site: this.$store.state.multipleSiteCollaboration.currentSiteName, page: 0
                          })
                          this.axios.post('apis/getErrorInfo', parameters)
                            .then((response) => {
                              if(response.data.success){
                                this.tableData2 = JSON.parse(response.data.body).content
                                this.$store.commit('multipleSiteCollaboration/saveErrorInfoPage', {
                                  msg1: JSON.parse(response.data.body).totalElements,
                                  msg2: JSON.parse(response.data.body).size,
                                  msg3: JSON.parse(response.data.body).number+1
                                })
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
                                  loading.close();
                                  this.$alert(response.data.message, '异常提示', {
                                    confirmButtonText: '确定',
                                  });
                                }
                              }
                            })
                            .catch((error)=>{
                              loading.close();
                              this.$alert('请求错误！', '异常提示', {
                                confirmButtonText: '确定',
                              })
                            })


            } else{
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
          .catch((error)=>{
            loading.close();
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            })
          })
      },

      // 删除流程
      handleClickDelete (row) {
        // 参数：site 站点名称  taskId 流程id
        var parameters = this.qs.stringify({
          site: this.$store.state.multipleSiteCollaboration.currentSiteName,
          taskId: row.taskId,
          id:row.id
        })
        // 请求等待
        const loading = this.$loading({
          lock: true,
          text: '查询中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.axios.post('apis/taksDelete', parameters)
          .then((response) => {
            if(response.data.success){
                        this.$message.success('删除流程成功!')
                        // 刷新界面,重新请求数据

                        var parameters = this.qs.stringify({
                          site: this.$store.state.multipleSiteCollaboration.currentSiteName, page: 0
                        })
                        this.axios.post('apis/getErrorInfo', parameters)
                          .then((response) => {
                            if(response.data.success){
                              this.tableData2 = JSON.parse(response.data.body).content
                              this.$store.commit('multipleSiteCollaboration/saveErrorInfoPage', {
                                msg1: JSON.parse(response.data.body).totalElements,
                                msg2: JSON.parse(response.data.body).size,
                                msg3: JSON.parse(response.data.body).number+1
                              })
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
                          })
                          .catch((error)=>{
                            loading.close();
                            this.$alert('请求错误！', '异常提示', {
                              confirmButtonText: '确定',
                            })
                          })


            } else{
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
          .catch((error)=>{
            loading.close();
            this.$alert('请求错误！', '异常提示', {
              confirmButtonText: '确定',
            })
          })
      }

    }

  }
</script>

<style>

  .el-menu-item {
    font-size: 25px;
  }

  .el-menu-item.is-active {
    background-color: #076998 !important;
  }

  .el-menu-item:hover {
    color: #FFD04B !important;
    background-color: #076998 !important;
  }

  .el-menu-demo {
    width: 100%;
    height: 100%;
    background-color: #076998;
    color: azure;
    font-weight: bold;
  }

  .main {
    width: 100%;
    height: 90%;
  }

  .span {
    font-size: 40px;
    margin-right: 10px;
    display: inline-block;
    float: left;
  }

  .el-menu-item div:nth-child(1) {
    width: 30%;
    float: left;
    padding-top: 50px;
  }

  .el-menu-item div:nth-child(1) img {
    display: inline-block;
    width: 100%;
  }

  .el-menu-item div:nth-child(2) {
    width: 70%;
    font-size: 12px;
    float: right;
    padding-left: 10px;
    padding-top: 15px;
    box-sizing: border-box;
    line-height: 30px;
  }

</style>
