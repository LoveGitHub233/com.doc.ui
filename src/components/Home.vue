<template>
  <div style="width:100%;height: 900px;">
      <el-aside width="10%" style="height: 100%;" class="elAside">
        <el-menu  @select="handleSelect" style="border: 0px">
          <el-menu-item-group class="startMenu">
            <el-menu-item index="1-1" class="elMunuItem"><img src="../assets/imgs/home/icon1.png"/></el-menu-item>
            <el-menu-item index="1-2" class="elMunuItem"><img src="../assets/imgs/home/icon2.png"/> </el-menu-item>
            <el-menu-item index="1-3" class="elMunuItem"><img src="../assets/imgs/home/icon3.png"/></el-menu-item>
<!--            <el-menu-item index="1-4" class="elMunuItem"><img src="../assets/imgs/home/icon4.png"/></el-menu-item>-->
            <el-dropdown style="position:fixed;left:0px;bottom:0px; width:10%;">
            <span>
              <el-menu-item index="1-5" class="elMunuItem">
              <img src="../assets/imgs/home/icon5.png"/>
              </el-menu-item>
            </span>
                <el-dropdown-menu slot="dropdown">
<!--                  <el-dropdown-item>我的消息</el-dropdown-item>-->
<!--                  <el-dropdown-item>设置</el-dropdown-item>-->

<!--                  <el-dropdown-item @click.native="dialogVisible = true,kk()" v-if="isDba == 'true'">添加用户</el-dropdown-item>-->
<!--                  <el-dialog-->
<!--                    title="添加用户"-->
<!--                    :visible.sync="dialogVisible"-->
<!--                    width="30%"-->
<!--                    :append-to-body="true">-->
<!--                    <mudialog></mudialog>-->
<!--                    &lt;!&ndash;<el-button @click="dialogVisible = false">取 消</el-button>&ndash;&gt;-->
<!--                  </el-dialog>-->
                  <el-dropdown-item @click.native="handleClick">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-menu-item-group>
        </el-menu>
      </el-aside>
    <div style="width: 90%;height: 100%;float: right;"> <el-main  width="10%" style="height: 100%;"><router-view></router-view></el-main> </div>
  </div>
</template>
<script>
  import MUDialog from '@/components/ManageUsersDialog'

  export default {
    components: {
      'mudialog': MUDialog
    },
    data() {
      return {
        dialogVisible: false,
        isDba: this.$store.state.login.tcUserMes.isdba
      };
    },
    methods: {
      handleSelect (key, keyPath) {
        switch (key) {
          case '1-1':
            location.reload()
            break
          case '1-2':
            if (history.length > 1) {
              this.$router.back()
              // this.$router.go(-1)
            }
            break
          case '1-3':
            this.$router.push('/home/main/cookie')
            break
          case '1-4':
            this.$router.push('/page6')
            break
        }
      },
      handleClick(){
        this.axios.post('apis/logout')
          .then((response) => {
            if(response.data.success){
              this.$router.push('/Login')
              this.$store.commit('login/savetcUserMes',{msg1:''})
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
      .catch((error)  => {
           this.$alert('请求错误！', '异常提示', {
          confirmButtonText: '确定',
    })
  })

      }
      // ,
      // handleClose(done) {
      //   this.$confirm('确认关闭？')
      //     .then(_ => {
      //       done();
      //     })
      //     .catch(_ => {});
      // }
    },
    //创建前设置
    beforeCreate () {
      document.querySelector('body').setAttribute('style', ' padding: 0px;margin: 0px;width: 100%; height: 100%;background-color: #076998;')
    },
//销毁前清除
    beforeDestroy () {
      document.querySelector('body').removeAttribute('style')
    }
  }
</script>
<style>
  /*body{*/
    /*padding: 0px;*/
    /*margin: 0px;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*background-color: #076998;*/
  /*}*/
  .elAside{
    float: left;
  }
  .startMenu {
    background-color: #076998;
    text-align: center;
  }
  .elMunuItem:hover {
    background-color: #003750;
  }
  .elMunuItem:focus{
    background-color: #003750;
  }
</style>
