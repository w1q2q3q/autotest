<template>
  <div>
    <el-row :gutter="20" style="padding-bottom: 20px;">
      <el-col :span="16" style="padding-left: 30px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">项目管理</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">项目管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="20" :offset="1" style="padding-top: 30px">
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          align="center"
          height="650"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="100">
          </el-table-column>
          <el-table-column
            prop="id"
            label="id"
            width="220">
          </el-table-column>
          <el-table-column
            label="创建日期"
            width="220">
            <template slot-scope="scope">{{ scope.row.data }}</template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="项目名称"
            width="220">
          </el-table-column>
          <el-table-column
            prop="number"
            label="用例数量"
            width="220">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="220">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
              <el-button type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--<div style="margin-top: 20px">-->
        <!--<el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>-->
        <!--<el-button @click="toggleSelection()">取消选择</el-button>-->
        <!--</div>-->
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000" align="right" style="padding-top: 30px">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'index'
}
</script>

<style scoped>

</style>
