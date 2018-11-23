<template>
  <div>
  <el-row :gutter="20" style="padding-bottom: 20px;">
    <el-col :span="16" style="padding-left: 30px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">用户管理</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">账号管理</a></el-breadcrumb-item>
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
          label="姓名"
          width="220">
        </el-table-column>
        <el-table-column
          prop="state"
          label="是否锁定"
          width="220">
        </el-table-column>
        <el-table-column
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button @click="editcasstest(scope.row.id)" type="text" size="small">编辑</el-button>
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
  name: 'index',
  mounted: function () {
    // GET /someUrl
    this.$http.get('http://localhost:8081/').then(response => {
      console.log(response.data)
      this.tableData3 = response.data
    },
    response => {
      console.log('error')
    })
  },
  data () {
    return {
      openeds: ['2'],
      tableData3: this.tableData3,
      multipleSelection: [],
      isCollapse: false
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>

</style>
