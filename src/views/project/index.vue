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
    <el-button type="primary" size="small" @click="dialogVisible = true">添加项目</el-button>
    <el-dialog title="添加项目" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
        <el-form ref="form" :model="form" :data="form" label-width="80px">
           <el-form-item label="项目名称">
             <el-input v-model="form.projectname"></el-input>
           </el-form-item>
           <el-form-item label="项目描述">
             <el-input v-model="form.projectdescribe"></el-input>
           </el-form-item>
          <el-form-item>
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('form')">确 定</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
    <el-row :gutter="20">
      <el-col :span="20" style="padding-top: 30px">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          align="center"
          height="550"
          width="900">
          <el-table-column
            type="selection"
            width="80">
          </el-table-column>
          <el-table-column
            prop="id"
            label="id"
            width="100">
          </el-table-column>
          <el-table-column
            prop="projectname"
            label="项目名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="projectdescribe"
            label="项目描述"
            width="200">
          </el-table-column>
          <el-table-column
            prop="number"
            label="模块数量"
            width="100">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="120">
          </el-table-column>
          <el-table-column
            label="操作"
            width="100">
            <template slot-scope="scope">
              <el-button @click="Testmodel(scope.row.id)" type="text" size="small">查看</el-button>
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
  name: 'index',
  data () {
    return {
      tempList: [],
      dialogVisible: false,
      tableData: [],
      form: {
        projectname: '',
        projectdescribe: ''
      }
    }
  },
  mounted: function () {
    this.$http.get('http://localhost:8081/TestProject/getAllProject').then(response => {
      console.log(response.data)
      this.tableData = response.data
    },
    response => {
      console.log('error')
    })
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    submitForm (formname) {
      this.$refs[formname].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:8081/TestProject/addProject', JSON.stringify(this.form)).then(response => {
            alert('添加成功')
            this.dialogVisible = false
            // this.$router.push({path: '/testcase'})
          },
          response => {
            console.log('error')
            alert('error')
          })
          console.log('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    Testmodel (id) {
      this.$router.push({
        path: `/testmodel/${id}`
      })
    }
  }
}
</script>

<style scoped>

</style>
