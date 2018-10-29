<template>
    <el-container>
      <el-aside width="auto" style="height: 900px">
        <div style="height:7%;background-color: darkcyan">
          <!--<el-radio-group v-model="isCollapse">-->
            <!--<el-radio-button :label="false">展开</el-radio-button>-->
            <!--<el-radio-button :label="true">收起</el-radio-button>-->
          <!--</el-radio-group>-->
        </div>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse" unique-opened="false" :default-openeds="openeds" >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">首页</span>
            </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">用户管理</span>
            </template>
            <el-menu-item index="2-1"><router-link to="/">账号管理</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">项目管理</span>
            </template>
            <el-menu-item index="3-1"><router-link to="project">项目管理</router-link></el-menu-item>
          </el-submenu>
          <el-submenu index="4" >
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">用例管理</span>
            </template>
            <el-menu-item index="4-1">用例管理</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">任务管理</span>
            </template>
            <el-menu-item index="5-1">任务管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-document"></i>
              <span slot="title">节点管理</span>
            </template>
            <el-menu-item index="6-1">节点管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="background-color: #faebd7">
          <el-radio-group v-model="isCollapse">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
          </el-radio-group>
        </el-header>
        <el-main style="background-color: #f0f8ff">
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      openeds: ['2'],
      multipleSelection: [],
      isCollapse: false
    }
  }
}
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 93%;
    background-color : beige;
    text-color: #fff;
    active-text-color: #ffd04b
  }
  a {
     text-decoraction: none;
   }
  .router-link-active {
    text-decoration: none;
  }

</style>
