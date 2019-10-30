<template>
  <el-row class="startMain">
    <div style="height: 10%"></div>
    <div class="startTask">
    <el-col class="elCol">
      <div class="grid-content bg-purple-dark">
          <div style="width: 100%;height: 50%">

            <p class="el-p"><span>{{this.$store.state.taskProcessing.taskNum.commissionTaskNum}}</span></p>
            <p class="el-p"><span>/</span></p>
            <p class="el-p"><span>{{this.$store.state.taskProcessing.taskNum.trackingTaskNum}}</span></p>
          </div>

        <el-button @click="getButton2" type="text" id="elButton2">待办任务</el-button>&nbsp;
        <el-button @click="getButton3" type="text" id="elButton3">跟踪任务</el-button>
        <!--<div style="width: 100%;padding: 5% 10%;">-->
          <!--<img style="float: left;" src="../assets/imgs/main/mail.png" width="8%" height="8%">-->
        <!--</div>-->
      </div>
    </el-col>
    </div>
    <div class="startTask">
    <el-col class="elCol">
      <div class="grid-content bg-purple-dark">
        <p style="font-size: 20px;color: #ffffff;display: inline-block;float: left;margin: 12% 0% 0% 7%;">文档查询</p>
        <div style="text-align: center;padding:0px;display: inline-block;float: left;margin: 10% 0% 0% 10%;">
        <el-button type="text" @click="getImg1"><img src="../assets/imgs/main/search.png" width="85%" height="85%" id="imgSearch"></el-button>
        </div>
      </div>
    </el-col>
    </div>
    <div class="startTask" v-if="this.$store.state.login.isDBA ">
    <el-col class="elCol">
      <div class="grid-content bg-purple-dark">
        <p style="font-size: 20px;color: #ffffff;display: inline-block;float: left;margin: 12% 0% 0% 7%;">多站点协同</p>
        <div style="text-align: center;padding:0px;display: inline-block;float: left;margin: 10% 0% 0% 0%;">
        <el-button type="text" @click="getImg2"><img src="../assets/imgs/main/crossSiteTask.png" width="70%" height="70%" id="imgCrossSiteTask"></el-button>
        </div>
      </div>
    </el-col>
    </div>
  </el-row>
</template>

<script>
  export default {
    data () {
      return {
      }
    },
    methods: {
      // getButton1 () {
      //   this.$router.push('/home/head/1/GtasksMain')
      // },
      getButton2 () {
        this.$router.push('/home/head/1/taskName/cookie/GtasksMain')
    },
      getButton3 () {
        this.$router.push('/home/head/2/taskName/cookie/GtasksMain')
      },
      getImg1 () {
        this.$router.push('/home/search')
        this.$store.commit('documentEnquiry/savePaging',{msg1:0,
          msg2:10,
          msg3:1
        })
        this.$store.commit('documentEnquiry/saveQueryCondition',{msg1:''})
      },
      getImg2 () {
        // 点击平判断是否是超级管理员
        // TODO  siteNames
              if(this.$store.state.login.isDBA){
                // 请求等待
                const loading = this.$loading({
                  lock: true,
                  text: '查询中',
                  spinner: 'el-icon-loading',
                  background: 'rgba(0, 0, 0, 0.7)'
                });
                // 是超级管理员,获取站点名称
                this.axios.post('apis/siteNames' )
                  .then((response)=>{
                    if(response.data.success){
                      // 测试的，
                      // var stiteName = ['HT0003','HT0031','HT0033']
                      // this.$store.commit('multipleSiteCollaboration/saveState',{msg1:stiteName})})
                      // 存站点名称
                      this.$store.commit('multipleSiteCollaboration/saveState',{msg1:response.data.body})
                      //  loading 请求等待
                      loading.close();
                    }else{
                      if(response.data.message == '认证失败，请重新登录'){
                        //  loading 请求等待
                        loading.close();
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

                this.$router.push('/home/multiple')
              }
         }
    }
    ,
    //路由跳转过来，不会走这个方法
    mounted: function () {
      // 设置cookie
      var session = this.$route.params.cookie
      if(session != 'cookie'){
        var strBefore = session.substring(0,5);
        var strAfter = session.substring(6,session.length);
        session = strBefore+strAfter;
        window.document.cookie ='SESSION='+ session+';path=/'
      }
      // console.log(this.$route.params.isLogin)
      // 是否登陆
      // this.$store.commit('login/saveIsLogin', {msg1: this.$route.params.isLogin})
      // console.log('this.$route.params.isLogin')
      // 请求等待
      const loading = this.$loading({
        lock: true,
        text: '查询中',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
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
        //  loading 请求等待
        loading.close();
      }).catch((error)  => {
        //  loading 请求等待
        loading.close();
        this.$alert('请求错误！', '异常提示', {
          confirmButtonText: '确定',
        })
      })




      // this.$store.commit('taskProcessing/saveIsDBA',{msg1:false})
      this.axios.post('apis/isdba'
      ).then((response)=>{
        if(response.data.success){
          this.$store.commit('login/saveIsDBA',{msg1:response.data.body})
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
        });
      })

    }
  }
</script>
<style>
  .startMain{
    width: 100%;
    height:90%;
  }
  .startTask {
    display: inline-block;
    text-align: center;
    line-height: 0px;
    width: 40%;
    height: 40%;
    float: left;
    margin-bottom: 5%;
    margin-right: 10%;
    border:1px solid #797979;
    box-sizing: border-box;
  }
  .elCol{
    height: 100%;
    background: #006487;
  }
  .el-p{
    display: inline-block;
    font-size: 80px;
    color: #ffffff;
    padding: 0% 2%;
  }
  #elButton1,#elButton2,#elButton3{
    color: #409eff;
    font-size:20px;
    margin: 0% 5%;
  }
  #elButton1 :hover{
    color: #409eff;
  }
  #elButton2 :hover{
    color: #409eff;
  }
  #elButton3 :hover{
    color: #409eff;
  }
  #imgCrossSiteTask:hover{
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
  }
  #imgSearch:hover{
    transform: scale(1.1);
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
  }
</style>
