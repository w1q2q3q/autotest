<template>
  <div>
    <el-container>
      <el-aside width="auto" style="height: 900px">
        <div class="tilte1">
          <!--<el-radio-group v-model="isCollapse">-->
            <!--<el-radio-button :label="false">展开</el-radio-button>-->
            <!--<el-radio-button :label="true">收起</el-radio-button>-->
          <!--</el-radio-group>-->
        </div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"  :collapse="isCollapse" unique-opened >
          <!--:default-openeds="openeds"-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">首页</span>
            </template>
            <el-menu-item index="1-1">项目动态</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="2-1"><router-link to="/people">账号管理</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">项目管理</span>
            </template>
            <el-menu-item index="3-1"><router-link to="/project">项目管理</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="4" >
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">用例管理</span>
            </template>
            <el-menu-item index="4-1"><router-link to="/addtestcase">添加用例</router-link></el-menu-item>
            <el-menu-item index="4-2"><router-link to="/testcase">用例列表</router-link></el-menu-item>
            <el-menu-item index="4-3">mock列表</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务管理</span>
            </template>
            <el-menu-item index="5-1">任务管理</el-menu-item>
            <el-menu-item index="5-2">定时任务管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">节点管理</span>
            </template>
            <el-menu-item index="6-1">节点管理</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">测试报告</span>
            </template>
            <el-menu-item index="7-1">测试报告</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="background-color: antiquewhite">
          <el-radio-group size="small" v-model="isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
        </el-header>
        <el-main class="note2">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      // openeds: ['2'],
      multipleSelection: [],
      isCollapse: false,
      note: {
        backgroundImage: 'url(' + require('../../image/1.jpg') + ')',
        backgroundSize: 'auto'
      },
      note1: {
        backgroundImage: 'url(' + require('../../image/6.jpg') + ')',
        backgroundSize: 'auto'
      }
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 93%;
    /*background-image: url('../../image/6.jpg');*/
    /*background-color: azure;*/
    /*background-color : beige;*/
    text-color: #fff;
    active-text-color: #ffd04b
  }
  a{
     text-decoraction: none;
   }
  .router-link-active {
    text-decoration: none;
  }
  .tilte1{
     height:60px;
     /*background-image: url('../../image/5.jpg');*/
     background-color: lightskyblue;
  }

</style>
