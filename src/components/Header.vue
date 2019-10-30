<template>
  <div style="width: 100%;height: 100%;" >
    <el-header style="background-color: #076998;">
      <el-menu :default-active="activeIndex" class="el-menu-demo" style="background-color: #076998;border-bottom: 0px;"
               mode="horizontal"
               @select="handleSelect"
               text-color="#fff"
               active-text-color="#ffd04b"

      >
        <span class="span">任务箱</span>
        <el-menu-item index="1" id="item1" >待办任务</el-menu-item>
        <el-menu-item index="2" id="item2" >跟踪任务</el-menu-item>
        <el-menu-item index="3" id="item3" >所有任务</el-menu-item>
       </el-menu>
      <el-row class="text">{{taskNumHint}}</el-row>
<!--      <el-row>{{ refTaskNumHint}}</el-row>-->
    </el-header>
    <el-main class="main"><router-view></router-view></el-main>
  </div>

</template>

<script>
  export default {
    inject: ['reload'],
    data () {
      return {
        taskNumHint: '',
        activeIndex:''
      }
    },
    // 监听路由中的参数，动态渲染header
    watch : {
      $route() {
        let index = this.$route.params.index
        if (index == 1) {
          // document.getElementById('item1').click()
          this.activeIndex = 1
          this.taskNumHint = this.$store.state.taskProcessing.taskNum.commissionTaskNum + '个待办任务'
        } else if (index == 2) {
          // document.getElementById('item2').click()
          this.activeIndex = 2
          this.taskNumHint = this.$store.state.taskProcessing.taskNum.trackingTaskNum + '个跟踪任务'
        } else if (index == 3) {
          // document.getElementById('item3').click()
          this.activeIndex = 3
          var j = parseInt(this.$store.state.taskProcessing.taskNum.commissionTaskNum)
          var k = parseInt(this.$store.state.taskProcessing.taskNum.trackingTaskNum)
          this.taskNumHint = j + k + '个所有任务'
        }
      },
        listenCommissionTaskNum : function () {
            // 刷新 header  任务数量
            this.reload()
        }
    } ,
    //   listenCommissionTaskNum : function () {
    //       // 刷新 header  任务数量
    //       this.reload()
    //   }
    // },
    computed: {
      listenCommissionTaskNum(){
        return this.$store.state.taskProcessing.taskNum.commissionTaskNum
      }
    },
    // computed: {
    //   // 计算属性的 getter
    //   refTaskNumHint: function () {
    //     // `this` 指向 vm 实例
    //     return this.taskNumHint
    //   }
    // },
    mounted: function () {
      let index = this.$route.params.index
      if(index == 1){
        // document.getElementById('item1').click()
        this.activeIndex = 1
        this.taskNumHint = this.$store.state.taskProcessing.taskNum.commissionTaskNum+'个待办任务'
      }
      else if (index == 2){
        // document.getElementById('item2').click()
        this.activeIndex = 2
        this.taskNumHint = this.$store.state.taskProcessing.taskNum.trackingTaskNum+'个跟踪任务'
      }

      else if (index == 3){
        // document.getElementById('item3').click()
        this.activeIndex = 3
        var j = parseInt(this.$store.state.taskProcessing.taskNum.commissionTaskNum)
        var k = parseInt(this.$store.state.taskProcessing.taskNum.trackingTaskNum)
        this.taskNumHint = j+k+'个所有任务'
      }

      this.axios.post('apis/tc/number')
        .then((response)=>{
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

    },
    methods: {
      handleSelect (key, keyPath) {
        // 清除概述数据
        this.$store.commit('taskProcessing/saveRightDetailTask',{msg1:'',
          msg2:'',
          msg3:'',
          msg4:'',
          msg5:'',
          msg6:''
        })
        switch (key) {
          case '1':
            this.$router.push('/home/head/1/taskName/cookie/GtasksMain')
            const loading2 = this.$loading({
              lock: true,
              text: '查询中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios.post('apis/tc/task',this.qs.stringify({type:'1'})
            ).then((response)=>{
              if(response.data.success){
                var taskTem = response.data.body
                var taskTemLast = []

                  for(let i in taskTem){
                    // if(taskTem[i].object_type == 'EPMDoTask'){
                    //    taskTem.splice(i,1)
                    // // }
                    if(taskTem[i].object_type == 'EPMPerformSignoffTask'){
                      taskTemLast.push(taskTem[i])
                    }
                  }
                  this.$store.commit('taskProcessing/savetaskTemplate',{
                    msg1:taskTemLast
                  })

                //  loading 请求等待
                loading2.close();
              }else{
                //  loading 请求等待
                loading2.close();

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
              loading2.close();
              this.$alert('number请求失败，请刷新页面或联系管理员！', '异常提示', {
                confirmButtonText: '确定',
              });
            })
            // document.getElementById('item1').click()
            // this.activeIndex = 1
            this.taskNumHint = this.$store.state.taskProcessing.taskNum.commissionTaskNum+'个待办任务'
            break
          case '2':
            this.$router.push('/home/head/2/taskName/cookie/GtasksMain')
            // 请求等待
            const loading = this.$loading({
              lock: true,
              text: '查询中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios.post('apis/tc/task',this.qs.stringify({type:'2'})
            ).then((response)=>{
              if(response.data.success){
                  this.$store.commit('taskProcessing/savetrackingTask',{msg1:response.data.body})
                //  loading 请求等待
                loading.close();
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
              //  loading 请求等待
              loading.close();
              this.$alert('number请求失败，请刷新页面或联系管理员！', '异常提示', {
                confirmButtonText: '确定',
              });
            })
            // document.getElementById('item2').click()
            // this.activeIndex = 2
            this.taskNumHint = this.$store.state.taskProcessing.taskNum.trackingTaskNum+'个跟踪任务'
            break
          case '3':
            this.$router.push('/home/head/3/taskName/cookie/GtasksMain')
            // 请求等待
            const loading3=this.$loading({
              lock: true,
              text: '查询中',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });
            this.axios.post('apis/tc/task',this.qs.stringify({type:'3'})
            ).then((response)=>{
              if(response.data.success){
                  this.$store.commit('taskProcessing/saveAllTask',{msg1:response.data.body})
                //  loading 请求等待
                loading3.close();
              }else{
                //  loading 请求等待
                loading3.close();

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
              loading3.close();
              this.$alert('number请求失败，请刷新页面或联系管理员！', '异常提示', {
                confirmButtonText: '确定',
              });
            })
            // document.getElementById('item3').click()
            // this.activeIndex = 3
            var j = parseInt(this.$store.state.taskProcessing.taskNum.commissionTaskNum)
            var k = parseInt(this.$store.state.taskProcessing.taskNum.trackingTaskNum)
            this.taskNumHint = j+k+'个所有任务'
            break
        }

        }

    }
  }
</script>

<style>
  .el-header{
    width: 100%;
    height: 10%;
  }
  .main{
    width: 100%;
    height: 90%;
  }
  .el-menu-demo{
    width: 100%;
    height: 100%;
    background-color: #076998;
    color: azure;
    font-weight: bold;

  }
  .el-menu.el-menu--horizontal{
    border: 0px;
  }
  .span{
    font-size: 40px;
    margin-right: 10px;
    display: inline-block;
    float: left;
  }
  .el-menu-item{
    font-size: 25px;
  }
  .el-menu-item.is-active {
     background-color: #076998 !important;
  }
  .el-menu-item:hover{
    color: #FFD04B !important;
    background-color: #076998 !important;
  }
  .text{
    color: azure;
    float: left;
    padding: 0px;
    font-weight: lighter;
  }

</style>
