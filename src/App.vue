<template>
  <div id="app" @mouseover="OperatingWebsite()">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>


<script>
  export default {
    name: 'App',
    // 页面刷新
    provide (){
      return {
        reload:this.reload,
        currentTime: new Date().getTime()
      }
    },
    data(){
      return {
        isRouterAlive:true
      }
    },
    methods:{
      reload (){
        this.isRouterAlive = false
        this.$nextTick(function(){
          this.isRouterAlive = true
        })
      },
      OperatingWebsite() {
        let currentTime = this.currentTime;
        let lastTime = new Date().getTime();
        let timeOut =30 * 60 * 1000; //设置时间 10分钟
        if ((lastTime - currentTime > timeOut)) {
          // 未操作页面，跳转登录页面
          this.currentTime = new Date().getTime();
          // const fullPath = this.$route.fullPath;
          // const query = this.$Base64.encode(fullPath);
          // this.$router.push({
          //   path: "/user",
          //   query: {
          //     type: query
          //   }
          // });
          this.$alert('长时间未操作,请重新登陆!', '登陆超时提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.axios.post('apis/logout')
                .then((response) => {
                  this.$router.push('/Login')
                })
            }
          });

        } else {
          this.currentTime = new Date().getTime();
        }

        // const truthPathQuery = this.$route.query.type;
        // const truthPath = this.$Base64.decode(truthPathQuery); //点击登录的时候跳转这个地址
      }
    },
    components:{
    }
  }
</script>

