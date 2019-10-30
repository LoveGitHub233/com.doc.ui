<template>
  <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
    <el-table-column v-if="columns.length===0" width="150">
      <template slot-scope="scope">
        <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(0,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        {{ scope.$index }}
      </template>
    </el-table-column>
    <el-table-column v-for="(column, index) in columns" v-else :key="column.value" :label="column.text" :width="column.width">
      <template slot-scope="scope">
        <!-- Todo -->
        <!-- eslint-disable-next-line vue/no-confusing-v-for-v-if -->
        <span v-for="space in scope.row._level" v-if="index === 0" :key="space" class="ms-tree-space"/>
        <span v-if="iconShow(index,scope.row)" class="tree-ctrl" @click="toggleExpanded(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon-plus"/>
          <i v-else class="el-icon-minus"/>
        </span>
        <!--<img width="20px" height="20px" style="position: relative;bottom: -5px;" src="../../assets/imgs/searchHeader/u1163.png"/>-->
        <span v-if="iconShow(index,scope.row)" ></span>
        <!--<img width="20px" height="20px" style="position: relative;bottom: -5px;" src="../../assets/imgs/searchHeader/u1164.png"/>-->
        <span v-if="index === 0 && !iconShow(index,scope.row)"></span>
        <span v-if="index !==2">
          {{ scope.row[column.value] }}
        </span>
        <span v-if="index === 2 && !iconShow(0,scope.row)">
           <el-button type="text" size="small" @click="aa(scope)">{{ scope.row[column.value] }}</el-button>
        </span>
        <!--<img width="20px" height="20px" style="position: relative;bottom: -5px;" src="../../assets/imgs/searchHeader/u1162.png"/>-->
        <span v-if="iconShow(index,scope.row)"></span>
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>

<script>
  /**
   Auth: Lei.j1ang
   Created: 2018/1/19-13:59
   */
  import treeToArray from './eval'
  export default {
    name: 'TreeTable',
    props: {
      /* eslint-disable */
      data: {
        type: [Array, Object],
        required: true
      },
      columns: {
        type: Array,
        default: () => []
      },
      evalFunc: Function,
      evalArgs: Array,
      expandAll: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 格式化数据源
      formatData: function() {
        let tmp;
        if (!Array.isArray(this.data)) {
          tmp = [this.data];
        } else {
          tmp = this.data;
        }
        const func = this.evalFunc || treeToArray;
        const args = this.evalArgs
          ? Array.concat([tmp, this.expandAll], this.evalArgs)
          : [tmp, this.expandAll];
        return func.apply(null, args);
      }
    },
    methods: {
      showRow: function(row) {

        const show = row.row.parent
          ? row.row.parent._expanded && row.row.parent._show
          : true;
        row.row._show = show;
        return show
          ? "animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;"
          : "display:none;";
      },
      // 切换下级是否展开
      toggleExpanded: function(trIndex) {
        const record = this.formatData[trIndex];
        record._expanded = !record._expanded;
      },
      // 图标显示
      iconShow(index, record) {
        return index === 0 && record.children && record.children.length > 0;
      },
      aa(scope){
        console.log(scope.row.fileName);
        console.log(this.$store.state.taskProcessing.rightDetailTaskFist.taskUid)
        var newWindow = window.open();
        //  操作
        this.axios.get('http://127.0.0.1:8088/api/file/fileMd5',
          {params: { fileName:scope.row.fileName,taskId:this.$store.state.taskProcessing.rightDetailTaskFist.taskUid}}
        ).then((response)=>{
          console.log(response.data.body)
          var id = response.data.body.body.id
          console.log(id)
          //  编辑查看文件
          if(response.data.body.body.fileType == 'docx' || response.data.body.body.fileType == 'doc'){
            newWindow.location.href = " http://127.0.0.1:8088/api/file/edit?id=" + encodeURIComponent(id)
              + "&edit=" + true + "&username=" + encodeURIComponent(this.$store.state.login.tcUserMes.username)
              +"&taskId=" + this.$store.state.taskProcessing.rightDetailTaskFist.taskUid
               + "&type=" + encodeURIComponent('desktop') + "&d=" + new Date().getTime();
                // this.axios.get('http://127.0.0.1:8088/api/file/fileMd5',
                //   {params: {id:id,edit:true,type:'desktop'}}
                // ).then((response)=>{
                //   console.log(response.data.body)
                //
                //
                // }) .catch((error)  => {
                //   console.log(error)
                //   this.$message.error('请求失败')
                // })
          }else{
            newWindow.location.href = " http://127.0.0.1:8088/api/file/edit?id=" + encodeURIComponent(id)
              + "&edit=" + false + "&username=" + encodeURIComponent(this.$store.state.login.tcUserMes.username)
              +"&taskId=" + this.$store.state.taskProcessing.rightDetailTaskFist.taskUid
              + "&type=" + encodeURIComponent('desktop') + "&d=" + new Date().getTime();
                // this.axios.get('http://127.0.0.1:8088/api/file/fileMd5',
                //   {params: {id:scope.row.id,edit:true,type:desktop}}
                // ).then((response)=>{
                //   console.log(response.data.body)
                //
                //
                // }) .catch((error)  => {
                //   console.log(error)
                //   this.$message.error('请求失败')
                // })
          }

        }) .catch((error)  => {
          console.log(error)
          this.$message.error('请求失败')
        })
      }
    }
  };
</script>
<style rel="stylesheet/css">
  @keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @-webkit-keyframes treeTableShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
</style>

<style scoped>
  .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 18px;
    height: 14px;
  }
  .ms-tree-space::before {
    content: "";
  }
  .processContainer {
    width: 100%;
    height: 100%;
  }
  table td {
    line-height: 26px;
  }
  .tree-ctrl {
    position: relative;
    cursor: pointer;
    color: #2196f3;
    margin-left: -18px;
  }
</style>
