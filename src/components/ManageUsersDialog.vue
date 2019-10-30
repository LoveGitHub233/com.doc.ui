<template>
  <el-container>
    <el-main style="width:100%;height: 100%;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="web用户名" prop="account">
          <el-input v-model="ruleForm.account"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="web密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="tc用户名" prop="tcAccount">
          <el-input v-model="ruleForm.tcAccount"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="tc密码" prop="tcPassword">
          <el-input v-model="ruleForm.tcPassword"></el-input>
        </el-form-item>
        <br>
        <div style="text-align:center">
        <el-button type="primary"  @click.native.prevent="handleSubmit3"> 添加用户 </el-button>
        </div>
      </el-form>
    </el-main>
  </el-container>

</template>

<script>
  export default {

    data () {
      return {
        ruleForm: {
          name: ''
        },
        rules: {
          account: [
            {required: true, message: '请输入账号', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          tcAccount: [
            {required: true, message: '请输入tc账号', trigger: 'blur'}
          ],
          tcPassword: [
            {required: true, message: '请输入tc密码', trigger: 'blur'}
          ]
        }
      }
    },

    methods: {
      filterNode (value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
    },
    handleSubmit3 () {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(this.$store.state.login.resposeMessage.token)
          var loginParams = {username: this.ruleForm.account,
password: this.ruleForm.password,
            name: this.ruleForm.name,
tcUser: this.ruleForm.tcAccount,
tcPassword: this.ruleForm.tcPassword}
          this.axios.post('apis/user/addUser', this.qs.stringify(loginParams),
            {headers: {'Authorization': 'Bearer ' + this.$store.state.login.resposeMessage.token}})
            .then((response) => {
              console.log(response)
              // data=1 成功绑定
              if (response.data.body === 1) {
                this.$message.success('添加用户成功了')
              } else if (response.data.body === 0) {
                this.$message.error('账号或密码错误,请重新输入')
              }
            })
            .catch((error) => {
              console.log(error)
              this.$message.error('请求失败')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }

  }
</script>

<style>
  .title{
    padding: 0px;
    margin: 0px;
  }
</style>
