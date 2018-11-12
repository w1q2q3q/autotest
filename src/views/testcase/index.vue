<template>
  <div>
    <el-row :gutter="20" style="padding-bottom: 20px;">
      <el-col :span="16" style="padding-left: 30px">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">用例管理</el-breadcrumb-item>
          <el-breadcrumb-item><a href="/">用例列表</a></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-button type="primary" @click="dialogFormVisible = true">添加用例</el-button>
    <el-dialog title="添加用例" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用例名称：" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="用例描述：" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="所属模块：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择模块">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请求接口：" :label-width="formLabelWidth">
          <el-input v-model="form.intertext" autocomplete="off" style="width: 350px"></el-input>
          <el-select v-model="form.methodc" placeholder="请求方式">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="信息头：" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="参数：" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="断言：" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off" style="width: 350px"></el-input>
        </el-form-item>
        <el-form-item label="优先级：" :label-width="formLabelWidth">
          <el-input v-model="form.describe" autocomplete="off" style="width: 350px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">提 交</el-button>
      </div>
    </el-dialog>
    <el-row :gutter="20">
      <el-col :span="20" :offset="1" style="padding-top: 30px">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          align="center"
          height="650"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            prop="id"
            label="id"
            width="100">
          </el-table-column>
          <el-table-column
            prop="name"
            label="用例名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="model"
            label="所属模块"
            width="180">
          </el-table-column>
          <el-table-column
            prop="api"
            label="Api"
            width="150">
          </el-table-column>
          <el-table-column
            prop="edition"
            label="版本"
            width="150">
          </el-table-column>
          <el-table-column
            prop="describe"
            label="描述"
            width="150">
          </el-table-column>
          <el-table-column
            prop="state"
            label="状态"
            width="100">
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
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        methodc: '',
        tableData: []
      },
      formLabelWidth: '120px'
    }
  },
  created () {
    this.getList()
  },
  methods: {
    // GET /someUrl
    getList () {
      this.$http.get('http://localhost:8081/TestCass/getCassList').then(response => {
        console.log(response.data)
        this.tableData = response.data
      },
      response => {
        console.log('error')
      })
    }
  }
}
</script>

<style scoped>

</style>
