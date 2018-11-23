<template>
  <div>
   <el-form ref="form" :model="form" :rules="rules">
     <el-row>
       <div style="float: left">
         <el-button size="small" type="success" @click="onSubmit('form')">立即创建</el-button>
         <el-button size="small" type="success" @click="runCass('form')">调试</el-button>
       </div>
       <el-col :span="24">
         <el-tabs v-model="activeName" @tab-click="handleClick" >
           <el-tab-pane label="接口信息管理2" name="first">
             <el-form-item label="用例名称：" :label-width="formLabelWidth" prop="Cassname" >
               <el-input v-model="form.Cassname" autocomplete="off" style="width: 350px"></el-input>
             </el-form-item>
             <el-form-item label="用例描述：" :label-width="formLabelWidth">
               <el-input v-model="form.Cassdescribe" autocomplete="off" style="width: 350px"></el-input>
             </el-form-item>
             <el-form-item label="所属模块：" :label-width="formLabelWidth">
               <el-select v-model="form.Cassmodel" placeholder="请选择模块">
                 <el-option label="POST" value="0"></el-option>
                 <el-option label="GET" value="1"></el-option>
               </el-select>
             </el-form-item>
           </el-tab-pane>
           <el-tab-pane label="配置管理" name="second">
             <el-form-item label="请求接口：" :label-width="formLabelWidth">
               <el-input v-model="form.Url" autocomplete="off" style="width: 350px"></el-input>
               <el-select v-model="form.Method" placeholder="请求方式">
                 <el-option label="POST" value="0"></el-option>
                 <el-option label="GET" value="1"></el-option>
               </el-select>
             </el-form-item>
             <el-form-item label="信息头：" :label-width="formLabelWidth">
               <el-radio-group v-model="form.Herder">
                 <el-radio label="0">无</el-radio>
                 <el-radio label="1">添加herder</el-radio>
               </el-radio-group>
               <div v-if="form.Herder==1">
                 <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addHerder">新增信息头</el-button>
                 <br/>
                <el-table class="template-list" :data="form.HerderList"  v-model="form.HerderList" style="width: 70%">
                 <el-table-column label="信息头">
                   <div slot-scope="scope">
                     <!--<el-select v-model="scope.row.hname" placeholder="信息头类型">-->
                       <!--<el-option v-for="item in imageType" :key="item.value" :label="item.label" :value="item.value">-->
                       <!--</el-option>-->
                     <!--</el-select>-->
                     <el-input v-model="scope.row.hname" placeholder="请填写参数"></el-input>
                   </div>
                 </el-table-column>
                 <el-table-column label="参数">
                   <div slot-scope="scope">
                     <el-input v-model="scope.row.hparamter" placeholder="请填写参数"></el-input>
                   </div>
                 </el-table-column>
                 <el-table-column label="操作">
                   <div slot-scope="scope">
                     <el-button size="mini" type="danger" icon="el-icon-delete" @click="HerderDelete(scope.$index,scope.row)">删除
                     </el-button>
                   </div>
                 </el-table-column>
               </el-table>
               </div>
             </el-form-item>
             <el-form-item label="Cookies：" :label-width="formLabelWidth">
               <el-radio-group v-model="form.Cookies">
                 <el-radio label="0">无</el-radio>
                 <el-radio label="1">添加Cookies</el-radio>
               </el-radio-group>
               <div v-if="form.Cookies==1">
                 <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addCookies">新增Cookies</el-button>
                 <br/>
                 <el-table class="template-list" :data="form.CookiesList"  v-model="form.CookiesList" style="width: 70%">
                   <el-table-column label="Cookies">
                     <div slot-scope="scope">
                       <!--<el-select v-model="scope.row.cname" placeholder="Cookie类型">-->
                         <!--<el-option v-for="item in imageType" :key="item.value" :label="item.label" :value="item.value">-->
                         <!--</el-option>-->
                       <!--</el-select>-->
                       <el-input v-model="scope.row.cname" placeholder="请填写参数"></el-input>
                     </div>
                   </el-table-column>
                   <el-table-column label="参数">
                     <div slot-scope="scope">
                       <el-input v-model="scope.row.cparamter" placeholder="请填写参数"></el-input>
                     </div>
                   </el-table-column>
                   <el-table-column label="操作">
                     <div slot-scope="scope">
                       <el-button size="mini" type="danger" icon="el-icon-delete" @click="CookiesDelete(scope.$index,scope.row)">删除
                       </el-button>
                     </div>
                   </el-table-column>
                 </el-table>
               </div>
             </el-form-item>
             <el-form-item label="参数：" :label-width="formLabelWidth">
               <el-radio-group v-model="form.Parameter">
                 <el-radio label="0">无</el-radio>
                 <el-radio label="1">List</el-radio>
                 <el-radio label="2">Json</el-radio>
               </el-radio-group>
               <div v-if="form.Parameter==1">
                 <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addParameter">新增参数</el-button>
                 <br/>
                 <el-table class="template-list" :data="form.ParameterList"  v-model="form.ParameterList" style="width: 70%">
                   <el-table-column label="类型">
                     <div slot-scope="scope1">
                       <el-select v-model="scope1.row.pname" placeholder="类型">
                         <el-option v-for="item in imageType2" :key="item.value" :label="item.label" :value="item.value">
                         </el-option>
                       </el-select>
                     </div>
                   </el-table-column>
                   <el-table-column label="参数">
                     <div slot-scope="scope1">
                       <el-input v-model="scope1.row.pparamter" placeholder="请填写参数"></el-input>
                     </div>
                   </el-table-column>
                   <el-table-column label="操作">
                     <div slot-scope="scope1">
                       <el-button size="mini" type="danger" icon="el-icon-delete" @click="ParameterDelete(scope1.$index,scope1.row)">删除
                       </el-button>
                     </div>
                   </el-table-column>
                 </el-table>
               </div>
             </el-form-item>
           </el-tab-pane>
           <el-tab-pane label="断言" name="third">
             <el-form-item label="断言：" :label-width="formLabelWidth">
               <el-radio-group v-model="form.CassAssert">
                 <el-radio label="0">无</el-radio>
                 <el-radio label="1">添加断言</el-radio>
               </el-radio-group>
               <div v-if="form.CassAssert==1">
                 <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addAssert">新增断言</el-button>
                 <br/>
                 <el-table class="template-list" :data="form.AssertList"  v-model="form.AssertList" style="width: 70%">
                   <el-table-column label="信息头">
                    <div slot-scope="scope2">
                     <el-select v-model="scope2.row.aname" placeholder="信息头类型">
                       <el-option v-for="item in imageType2" :key="item.value" :label="item.label" :value="item.value">
                       </el-option>
                     </el-select>
                   </div>
                   </el-table-column>
                   <el-table-column label="参数">
                     <div slot-scope="scope2">
                       <el-input v-model="scope2.row.aparamter" placeholder="请填写参数"></el-input>
                     </div>
                   </el-table-column>
                   <el-table-column label="操作">
                     <div slot-scope="scope2">
                       <el-button size="mini" type="danger" icon="el-icon-delete" @click="AssertDelete(scope2.$index,scope2.row)">删除
                       </el-button>
                     </div>
                   </el-table-column>
                 </el-table>
               </div>
             </el-form-item>
           </el-tab-pane>
           <!--<el-tab-pane label="结果" name="fourth"></el-tab-pane>-->
           <el-tab-pane label="数据提取" name="list"></el-tab-pane>
           <el-tab-pane label="报告" name="report">
             <el-input v-model="code" autocomplete="off" :data="code"></el-input>
             <div>
               <pre style="width: 500px">{{report | json}}}</pre>
             </div>
           </el-tab-pane>
         </el-tabs>
       </el-col>
     </el-row>
  </el-form>
  </div>
</template>
<script>
export default {
  name: 'index',
  data () {
    return {
      activeName: 'first',
      dialogFormVisible: false,
      report: '',
      code: '',
      form: {
        Cassname: '',
        Cassdescribe: '',
        Url: '',
        Cassmodel: '0',
        Method: '0',
        HerderList: [],
        Cookies: '0',
        CookiesList: [],
        ParameterList: [],
        AssertList: [],
        Herder: '0',
        Parameter: '0',
        CassAssert: '0'
      },
      formLabelWidth: '120px',
      imageType: [{
        label: 'Cookies',
        value: 'Cookies'
      }],
      imageType2: [{
        label: 'Cookies',
        value: 'Cookies'
      }],
      rules: {
        Cassname: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    addHerder () {
      this.form.HerderList.push({
        hname: '',
        hparamter: ''
      })
    },
    // 删除
    HerderDelete ($index, row) {
      this.form.HerderList.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    addParameter () {
      this.form.ParameterList.push({
        pname: '',
        pparamter: ''
      })
    },
    // 删除
    ParameterDelete ($index, row) {
      this.form.ParameterList.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    addAssert () {
      this.form.AssertList.push({
        aname: '',
        aparamter: ''
      })
    },
    // 删除
    AssertDelete ($index, row) {
      this.form.AssertList.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    addCookies () {
      this.form.CookiesList.push({
        cname: '',
        cparamter: ''
      })
    },
    // 删除
    CookiesDelete ($index, row) {
      this.form.CookiesList.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onSubmit (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:8081/TestCass/addCass', JSON.stringify(this.form)).then(response => {
            alert('添加成功')
            this.$router.push({path: '/testcase'})
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
    runCass (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:8081/TestCass/runCass', JSON.stringify(this.form)).then(response => {
            alert('成功')
            this.activeName = 'report'
            this.report = response.data.cassrequest
            this.code = response.data.code
          },
          response => {
            alert('失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
