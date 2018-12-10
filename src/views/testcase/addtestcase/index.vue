<template>
  <div>
    <el-form ref="form" :model="form" :data="form" :rules="rules">
      <el-row>
        <div style="float: left">
          <el-button size="small" type="success" @click="onSubmit('form')">立即创建</el-button>
          <el-button size="small" type="success" @click="runCase('form')">调试 </el-button>
        </div>
        <el-col :span="24">
          <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loading">
            <el-tab-pane label="接口信息管理1" name="first">
              <el-form-item label="用例名称：" :label-width="formLabelWidth" prop="Casename" >
                <el-input v-model="form.Casename" autocomplete="off" style="width: 350px"></el-input>
              </el-form-item>
              <el-form-item label="用例描述：" :label-width="formLabelWidth">
                <el-input v-model="form.Casedescribe" autocomplete="off" style="width: 350px"></el-input>
              </el-form-item>
              <el-form-item label="所属模块：" :label-width="formLabelWidth">
                <!--<el-select v-model="form.Casemodel" placeholder="请选择模块">-->
                <!--<el-option label="POST"  :value="0"></el-option>-->
                <!--<el-option label="GET" :value="1"></el-option>-->
                <!--</el-select>-->
                <el-select v-model="form.Casemodel" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.modelname"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="second">
              <el-form-item label="请求接口：" :label-width="formLabelWidth">
                <el-input v-model="form.Url" autocomplete="off" style="width: 350px"></el-input>
                <el-select v-model="form.Method" placeholder="请求方式">
                  <el-option label="POST" :value="0"></el-option>
                  <el-option label="GET" :value="1"></el-option>
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
                <div v-if="form.Parameter==2">
                  <el-button size="small" type="primary" @click="jsonupdate2">Json格式化</el-button>
                  <el-row>
                    <el-col :span="11">
                      <div>
                        <el-input  type="textarea" rows="20" v-model="jsontext" :data="jsontext" ></el-input>
                      </div>
                    </el-col>
                    <el-col :span="11">
                      <div>
                        <pre v-highlightjs="jsontext"><code style="height: 400px"></code></pre>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="断言" name="third">
              <el-form-item label="断言：" :label-width="formLabelWidth">
                <el-radio-group v-model="form.CaseAssert">
                  <el-radio label="0">无</el-radio>
                  <el-radio label="1">添加断言</el-radio>
                </el-radio-group>
                <div v-if="form.CaseAssert==1">
                  <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addAssert">新增断言</el-button>
                  <br/>
                  <el-table class="template-list" :data="form.AssertList"  v-model="form.AssertList" style="width: 70%">
                    <el-table-column label="断言内容">
                      <div slot-scope="scope2">
                        <el-select v-model="scope2.row.responsetype" placeholder="断言内容">
                          <el-option label="响应内容Json"  :value="0"></el-option>
                          <el-option label="响应内容Text" :value="1"></el-option>
                          <el-option label="响应Code" :value="2"></el-option>
                        </el-select>
                      </div>
                    </el-table-column>
                    <el-table-column label="断言参数">
                      <div slot-scope="scope2">
                        <el-input v-model="scope2.row.assertparameter" placeholder="请填写参数"></el-input>
                      </div>
                    </el-table-column>
                    <el-table-column label="方法">
                      <div slot-scope="scope2">
                        <el-select v-model="scope2.row.assertmethod" placeholder="信息头类型">
                          <el-option label="等于"  :value="0"></el-option>
                          <el-option label="包含" :value="1"></el-option>
                          <el-option label="正则匹配" :value="2"></el-option>
                        </el-select>
                      </div>
                    </el-table-column>
                    <!--<el-table-column label="结果参数">-->
                    <!--<div slot-scope="scope2">-->
                    <!--<el-input v-model="scope2.row.responsedate" placeholder="请填写参数"></el-input>-->
                    <!--</div>-->
                    <!--</el-table-column>-->
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
              <el-tag>状态码：{{code}}</el-tag>
              <br/>
              <el-tabs  v-model="reportactive" @tab-click="handleClick">
                <el-tab-pane style="width: 1300px" label="断言结果" name="AssertResult">
                  <el-table
                    :data="assertList"
                    style="width:100%">
                    <el-table-column
                      prop="responsetype"
                      label="断言内容"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="assertparameter"
                      label="断言参数"
                      width="280">
                    </el-table-column>
                    <el-table-column
                      prop="assertmethod"
                      label="方法"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="response"
                      label="结果参数"
                      width="280">
                    </el-table-column>
                    <el-table-column
                      prop="assertresult"
                      label="断言结果"
                      width="180">
                    </el-table-column>
                    <el-table-column
                      prop="result"
                      label="状态"
                      width="180">
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane style="width: 700px" label="Response" name="Response">
                  <el-button size="small" type="primary" @click="jsonupdate">Json格式化</el-button>
                  <div>
                    <pre v-highlightjs="caserequest"><code style="height: 400px"></code></pre>
                  </div>
                </el-tab-pane>
                <el-tab-pane style="width: 700px" label="文本显示" name="jsons">
                  <el-button size="small" type="primary" @click="jsonupdate">Json格式化</el-button>
                  <div>
                    <el-input  type="textarea" rows="20" v-model="caserequest" :data="caserequest"  v-highlightjs></el-input>
                  </div>
                </el-tab-pane>
              </el-tabs>
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
      options: [],
      activeName: 'first',
      reportactive: 'AssertResult',
      dialogFormVisible: false,
      caserequest: '',
      code: '',
      loading: false,
      assertList: [],
      form: {
        Casename: '',
        Casedescribe: '',
        Url: '',
        Casemodel: '',
        Method: '0',
        HerderList: [],
        Cookies: '0',
        CookiesList: [],
        ParameterList: [],
        jsontext: '',
        AssertList: [],
        Herder: '0',
        Parameter: '0',
        CaseAssert: '0'
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
        Casename: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    // this.editCase()
    this.getAllModel()
  },
  methods: {
    async getAllModel () {
      this.$http.get('http://localhost:8081/TestModel/getAllModel').then(response => {
        console.log(response.data)
        this.options = response.data
      },
      response => {
        console.log('error')
      })
    },
    async editCase () {
      this.$http.get(`http://localhost:8081/TestCase/editCase/${this.$route.params.id}`).then(response => {
        console.log(response.data)
        this.form = response.data
      },
      response => {
        console.log('error')
      })
    },
    addHerder () {
      this.form.HerderList.push({
        hname: '',
        hparamter: ''
      })
      console.log(this.$route.params.id)
      alert('cc')
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
        responsetype: '',
        assertparameter: '',
        assertmethod: ''
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
          this.$http.post('http://localhost:8081/TestCase/addCase', JSON.stringify(this.form)).then(response => {
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
    runCase (form) {
      this.loading = true
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$http.post('http://localhost:8081/TestCase/runCase', JSON.stringify(this.form)).then(response => {
            alert('成功')
            this.activeName = 'report'
            this.caserequest = response.data.caserequest
            this.code = response.data.code
            this.assertList = response.data.assertList
          },
          response => {
            alert('失败')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      this.loading = false
    },
    jsonupdate: function () {
      try {
        this.caserequest = JSON.stringify(JSON.parse(this.caserequest), null, 2)
      } catch (e) {
        alert('解析失败')
      }
    },
    jsonupdate2 () {
      this.jsontext = JSON.stringify(JSON.parse(this.jsontext), null, 2)
    }
  }
}
</script>

<style scoped>
  pre{
    white-space: pre-wrap!important;
    word-wrap: break-word!important;
    *white-space:normal!important;
  }
</style>
