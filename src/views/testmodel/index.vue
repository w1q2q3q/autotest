<template>
  <div>
    <el-row :gutter="20" style="padding-bottom: 20px;">
      <el-col :span="16" style="padding-left: 30px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">模块管理</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">模块管理</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="primary" size="small" @click="dialogVisible = true">添加模块</el-button>
    <el-button type="primary" size="small" @click="dialogFormVisible = true">批量执行模块</el-button>
    <el-dialog title="添加模块" :visible.sync="dialogVisible" width="40%" :before-close="handleClose">
      <el-form ref="form" :model="form" :data="form" label-width="80px">
        <el-form-item label="项目" prop="region">
          <el-select v-model="form.projectid" placeholder="请选择模块">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块名称">
          <el-input v-model="form.modelname"></el-input>
        </el-form-item>
        <el-form-item label="模块描述">
          <el-input v-model="form.modeldescribe"></el-input>
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
            prop="modelname"
            label="模块名称"
            width="200">
          </el-table-column>
          <el-table-column
            prop="modeldescribe"
            label="模块描述"
            width="200">
          </el-table-column>
          <el-table-column
            prop="number"
            label="用例数量"
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
              <el-button @click="getModelCaseList(scope.row.id)" type="text" size="small">查看</el-button>
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
        modelname: '',
        modeldescribe: '',
        projectid: this.$route.params.id
      }
    }
  },
  created () {
    this.modelList()
  },
  methods: {
    async modelList () {
      this.$http.get(`http://localhost:8081/TestModel/getModel/${this.$route.params.id}`).then(response => {
        console.log(response.data)
        this.tableData = response.data
      },
      response => {
        console.log('error')
      })
    },
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
          this.$http.post('http://localhost:8081/TestModel/addModel/', JSON.stringify(this.form)).then(response => {
            alert('添加成功')
            this.dialogVisible = false
            this.$router.go(0)
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
    getModelCaseList (id) {
      this.$router.push({
        path: `/modelcase/${id}`
      })
    }
  }
}
</script>

<style scoped>

</style>
