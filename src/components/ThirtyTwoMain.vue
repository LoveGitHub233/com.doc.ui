<template>
  <div style="width: 100%;height: 100%;">
      <el-container style="height:100%;width:100%;background: #FFFFFF">
        <el-aside style="background: #f0f0f0">
          <el-tabs v-model="activeName1" @tab-click="handleClick" style="text-align: center;line-height: 0px;">
            <el-tab-pane label="问题流程" name="first1">
              <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input21"></el-input>
              <el-menu default-active="2" class="el-menu-vertical-demo" >
                <el-menu-item  v-for="item in items" :index="item.id" @click="itemclick(item)">
                  <div>
                    <img src="../assets/vue01.png" >
                  </div>
                  <div>
                    <h6>{{item.id}}</h6>
                    <p>
                      {{item.name}}<br>
                      开始时间：{{item.date}}
                    </p>
                  </div>
                </el-menu-item>
              </el-menu>
            </el-tab-pane>
            <el-tab-pane label="未完成" name="second1">未完成</el-tab-pane>
            <el-tab-pane label="跟踪流程" name="third1">跟踪流程</el-tab-pane>
          </el-tabs>

        </el-aside>
        <el-main style="text-align:left;line-height: 16px;" >
          <el-tabs v-model="activeName" tabPosition="leftAside">
            <el-tab-pane label="概述" name="first">
              <el-form label-width="100px" >
                <el-form-item label="名称：">
                  <el-input disabled style="width: 400px" v-model="summarize.id"></el-input>
                </el-form-item>
                <el-form-item label="状态：">
                  <el-input disabled v-model="summarize.name" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="任务：">
                  <el-input disabled value="校对" style="width: 100px"></el-input>
                </el-form-item>
                <el-form-item label="责任方：">
                  <a href="" target="_blank">00038(张三)</a>
                </el-form-item>
                <el-form-item label="审核内容：">
                  <a href="" target="_blank">目标附件</a>
                </el-form-item>
                <el-form-item label="委派签发：">
                  <el-button type="text" style="margin: 0px;color: #409EFF;font-size: 14px;" @click="dialogVisible = true">00085(李四)-技术中心/室主任</el-button>
                  <el-dialog
                    title="委派签发"
                    v-el-drag-dialog
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <assdialog></assdialog>
                    <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
                  </el-dialog>
                </el-form-item>
                <el-form-item label="审核意见：">
                  <el-input type="textarea" style="width: 900px"></el-input>
                </el-form-item>
                <el-form-item  prop="resource">
                  <el-radio-group v-model="summarize.radio">
                    <el-radio label="批准"></el-radio>
                    <el-radio label="拒绝"></el-radio>
                    <el-radio label="不做决定"></el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" >执行审批</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="审核文件" name="second">
              <div>
                <tree-table :data="data" :columns="columns" border/>
              </div>
            </el-tab-pane>
            <el-tab-pane label="审核人员" name="third">
              审核人员
            </el-tab-pane>
            <el-tab-pane label="日志信息" name="fourth">
              <el-table :data="logTtableData" border style="width: 100%;">
                <el-table-column prop="logNum" label="序号" width=100% >
                </el-table-column>
                <el-table-column prop="category" label="类别" width=100%>
                </el-table-column>
                <el-table-column prop="logDetails" label="详细信息">
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="审签信息" name="fifth">
              审签信息
            </el-tab-pane>
            <el-tab-pane label="异常处理" name="sixth">
              <el-table :data="excepTtableData" border style="width: 100%;">
                <el-table-column prop="logNum" label="序号" width=100% >
                </el-table-column>
                <el-table-column prop="category" label="类别" width=100%>
                </el-table-column>
                <el-table-column prop="site" label="站点" width=100%>
                </el-table-column>
                <el-table-column prop="state" label="状态" width=100%>
                </el-table-column>
                <el-table-column prop="logDetails" label="详细信息">
                </el-table-column>
                <el-table-column prop="dispose" label="处理" width=150%>
                  <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">创建</el-button>
                    <el-button type="text" size="small">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
          </el-tabs>
        </el-main>
      </el-container>
  </div>
</template>

<script>
  import AssDialog from '@/components/AssignmentDialog'
  import treeTable from './TreeTable2'
  export default {
    components: {
      'tree-table': treeTable,
      'assdialog': AssDialog
    },
    data () {
      return {
        activeName: 'first',
        activeName1: 'first1',
        dialogVisible: false,
        asideData: [{
          id: '000007/A;1-飞轮',
          name: '自制件三级审签流程校对',
          time: '开始时间：2018-12-15 15:25'
        }],
        excepTtableData: [{
          logNum: '1',
          category: '主站点',
          site: '33所',
          state: '正常',
          logDetails: '',
          dispose: ''
        }, {
          logNum: '2',
          category: '跨站点',
          site: '302所',
          state: '正常',
          logDetails: '',
          dispose: ''
        }, {
          logNum: '3',
          category: '跨站点',
          site: '31所',
          state: '异常',
          logDetails: '审批目标附件XXX零部件未找到，创建跨站点上审批流程失败！',
          dispose: ''
        }, {
          logNum: '4',
          category: '跨站点',
          site: 'XX所',
          state: '正常',
          logDetails: '',
          dispose: ''
        }],
        logTtableData: [{
          logNum: '...',
          category: '信息',
          logDetails: '...'
        }, {
          logNum: '9',
          category: '信息',
          logDetails: '开始创建跨站点历程信息完整性检查'
        }, {
          logNum: '10',
          category: '错误',
          logDetails: '审批目标附件XXX零部件未找到，创建跨站点上审批流程失败！'
        }],
        ruleForm: {
          resource: ''
        },
        columns: [
          {
            text: 'BOM行',
            value: 'bom',
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
        data: [
          {
            bom: '000007/A;1 - 飞轮',
            time: '2018-12-15',
            operation: ' ',
            children: [
              {
                bom: '000007/A;1-1',
                time: '2018-12-15 15:25',
                operation: '批注'
              },
              {
                bom: '000007/A;1-2',
                time: '2018-12-15 16:44',
                operation: '查看'
              },
              {
                bom: '000007/A;1-3',
                time: '2018-12-15 17:12',
                operation: '查看'
              }
            ]
          }],
        summarize: {
          id: '',
          name: '',
          date: '',
          responsible: '',
          assignment: '',
          radio: ''
        },
        items: {}
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        switch (key) {
          case '1':
            this.$router.push('/home/multiple/collmain')
            break
          case '2':
            this.$router.push('/home/multiple/')
            break
          case '3':
            this.$router.push('/home/multiple/')
            break
          case '4':
            this.$router.push('/home/multiple/')
            break
          case '5':
            this.$router.push('/home/multiple/')
            break
          case '6':
            this.$router.push('/home/multiple/')
            break
        }
      },
      handleNodeClick (data) {
        console.log(data)
      },
      append (data) {
      },
      itemclick (item) {
        var _this = this
        _this.summarize = item
      }
    }
  }
</script>

<style>
  .head{
    width: 100%;
    height: 10%;
  }
  .el-menu-demo{
    background-color: #076998;
    color: azure;
    font-weight: bold;
  }
  .main{
    width: 100%;
    height: 90%;
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
    font-size: 20px;
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
  .left{
    width: 20%;
    float: left;
    display: inline-block;
  }
  .left.tac{
    width: 100%;
  }
  .left.tac.el-col{
    width: 100%;
  }

  .el-menu-item div:nth-child(1){
    width: 30%;
    float: left;
    padding-top: 50px;
  }
  .el-menu-item div:nth-child(1) img{
    display: inline-block;
    width: 100%;
  }
  .el-menu-item div:nth-child(2){
    width: 70%;
    font-size: 12px;
    float: right;
    padding-left: 10px;
    padding-top: 15px;
    box-sizing: border-box;
    line-height: 30px;
  }

  .right{
    width: 80%;
    height: 843px;
    float: right;
    border-left: solid 1px #000;
    box-sizing: border-box;
  }
  .el-menu-vertical-demo>.el-menu-item{
    height: 200px;
  }
  .el-menu-vertical-demo>.is-active{
    background-color:#C6DEE3 !important;
    color: black !important;
  }
  .el-menu-vertical-demo>.el-menu-item:hover{
    background-color:#C6DEE3 !important;
    color: black !important;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
  }
  .tableHeader {
    width: 100%;
    font-size: 14px;
    color: #606266;
    text-align: center;
  }

</style>
