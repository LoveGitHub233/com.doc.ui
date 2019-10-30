<template>
  <div class="loginContainer">
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" >
      <h3 style="text-align: center">系统登录</h3>
      <div class="error-wrap">
        <span class="error error-show" v-show="errorTip">用户名或者密码错误</span>
      </div>
      <el-form-item prop="account">
        <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号" @keyup.enter.native="handleSubmit2"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码" @keyup.enter.native="handleSubmit2"></el-input>
      </el-form-item>
      <el-form-item >

        <div v-if="isLoading == 'true'">
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2"  :tcerror="tcerror" icon="el-icon-loading" disabled>登录</el-button>
        </div>
        <div v-else>
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2"  :tcerror="tcerror">登录</el-button>
        </div>
        <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
<!--        <el-dialog-->
<!--          title="Teamcenter登陆"-->
<!--          v-el-drag-dialog-->
<!--          :visible.sync="tclogin"-->
<!--          width="30%">-->
<!--          <tclogdialog> </tclogdialog>-->
<!--        </el-dialog>-->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import TCLogDialog from '@/components/TCLoginDialog'
  // import NProgress from 'nprogress'
  export default {
    components: {
      'tclogdialog': TCLogDialog
    },
    data () {
      return {
        isLoading: false,

        tcerror: false,
        tclogin: false,
        errorTip: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
            // { validator: validaePass }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
            // { validator: validaePass2 }
          ]
        },
        checked: true
      }
    },
    watch: {

    },
    methods: {
      handleReset2 () {
        this.$refs.ruleForm2.resetFields()
      },
      handleSubmit2 (ev) {
        // this.$router.push('/home/main')
        var _this = this
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            // 登陆等待loading
            this.isLoading = 'true'
            // _this.$router.replace('/table');
            // this.logining = true
            // NProgress.start();
            var loginParams = { username: this.ruleForm2.account, password: this.ruleForm2.checkPass }
            this.axios.post('apis/login', this.qs.stringify(loginParams))
              .then((response) => {
                if (response.data.success) {
                  // 存储username
                  // this.$store.commit('login/savetcUserMes', {msg1: this.ruleForm2.account})
                  // 是否登陆
                  // this.$store.commit('login/saveIsLogin', {msg1: true})
                  // 跳转首页
                  this.$router.push('/home/main/cookie')
                } else {
                  // 去掉登陆等待loading
                  this.isLoading = false
                  this.tcerror = true
                  this.$message.error(response.data.message)
                }
              })
              .catch(() => {
                // 去掉登陆等待loading
                this.isLoading = false

                this.tcerror = true
                this.$message.error('请求错误！')
              })
          } else {
            // 去掉登陆等待loading
            this.isLoading = false

            return false
          }
        })
      }
    }
  }

</script>

<style>
  .loginContainer {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
</style>
