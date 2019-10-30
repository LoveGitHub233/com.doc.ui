<template>
  <el-container>
    <el-main style="width:100%;height: 100%;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <br>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <br />
      <el-form-item style="width:100%;text-align:center">
        <el-button type="primary" style="width:50%;" @click.native.prevent="handleSubmit3">登录</el-button>
      </el-form-item>
    </el-main>
  </el-container>

</template>

<script>
  export default {
    watch: {
      filterText (val) {
        this.$refs.tree2.filter(val)
      }
    },

    data () {
      return {
        ruleForm: {
          name: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
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
              var loginParams = {tcName: this.ruleForm.name, tcPassword: this.ruleForm.password, username: this.$store.state.login.tcUserMes.username}
              this.axios.post('apis/user/bindTc', this.qs.stringify(loginParams),
                {headers: {'Authorization': 'Bearer ' + this.$store.state.login.resposeMessage.token}})
                .then((response) => {
                  console.log(response)
                  // data=1 成功绑定s
                  if (response.data.body === 1) {
                    this.$router.push('/home/main')
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
