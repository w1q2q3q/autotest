<template>
  <div>
   <el-form ref="form" :model="form">
     <el-tabs v-model="activeName" @tab-click="handleClick">
       <el-tab-pane label="接口信息管理" name="first">
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
       </el-tab-pane>
       <el-tab-pane label="配置管理" name="second">
         <el-form-item label="请求接口：" :label-width="formLabelWidth">
           <el-input v-model="form.intertext" autocomplete="off" style="width: 350px"></el-input>
           <el-select v-model="form.methodc" placeholder="请求方式">
             <el-option label="区域一" value="shanghai"></el-option>
             <el-option label="区域二" value="beijing"></el-option>
           </el-select>
         </el-form-item>
         <el-form-item label="信息头：" :label-width="formLabelWidth">
           <el-radio-group v-model="form.radio1">
             <el-radio label="0">无</el-radio>
             <el-radio label="1">添加herder</el-radio>
           </el-radio-group>
           <div v-if="form.radio1==1">
             <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addTemp">新增信息头</el-button>
             <br/>
            <el-table class="template-list" :data="form.tempList"  v-model="form.tempList" style="width: 70%">
             <el-table-column label="信息头">
               <div slot-scope="scope">
                 <el-select v-model="scope.row.pre" placeholder="信息头类型">
                   <el-option v-for="item in imageType" :key="item.value" :label="item.label" :value="item.value">
                   </el-option>
                 </el-select>
               </div>
             </el-table-column>
             <el-table-column label="参数">
               <div slot-scope="scope">
                 <el-input v-model="scope.row.name" placeholder="请填写参数"></el-input>
               </div>
             </el-table-column>
             <el-table-column label="操作">
               <div slot-scope="scope">
                 <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.$index,scope.row)">删除
                 </el-button>
               </div>
             </el-table-column>
           </el-table>
           </div>
         </el-form-item>
         <el-form-item label="参数：" :label-width="formLabelWidth">
           <el-radio-group v-model="form.radio">
             <el-radio label="0">无</el-radio>
             <el-radio label="1">List</el-radio>
             <el-radio label="2">Json</el-radio>
           </el-radio-group>
           <div v-if="radio==1">
             <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addTemp1">新增参数</el-button>
             <br/>
             <el-table class="template-list" :data="form.tempList1"  style="width: 70%">
               <el-table-column label="类型">
                 <div slot-scope="scope1">
                   <el-select v-model="scope1.row.pre" placeholder="类型">
                     <el-option v-for="item in imageType2" :key="item.value" :label="item.label" :value="item.value">
                     </el-option>
                   </el-select>
                 </div>
               </el-table-column>
               <el-table-column label="参数">
                 <div slot-scope="scope1">
                   <el-input v-model="scope1.row.name" placeholder="请填写参数"></el-input>
                 </div>
               </el-table-column>
               <el-table-column label="操作">
                 <div slot-scope="scope1">
                   <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete1(scope1.$index,scope1.row)">删除
                   </el-button>
                 </div>
               </el-table-column>
             </el-table>
           </div>
         </el-form-item>
       </el-tab-pane>
       <el-tab-pane label="断言" name="third">
         <el-form-item label="断言：" :label-width="formLabelWidth">
           <el-radio v-model="radio2" label="0">无</el-radio>
           <el-radio v-model="radio2" label="1">添加断言</el-radio>
           <div v-if="radio2==1">
             <el-button size="small" type="primary" icon="el-icon-circle-plus-outline" @click="addTemp2">新增断言</el-button>
             <br/>
             <el-table class="template-list" :data="tempList2"  style="width: 70%">
               <el-table-column label="信息头">
                <div slot-scope="scope2">
                 <el-select v-model="scope2.row.pre" placeholder="信息头类型">
                   <el-option v-for="item in imageType2" :key="item.value" :label="item.label" :value="item.value">
                   </el-option>
                 </el-select>
               </div>
               </el-table-column>
               <el-table-column label="参数">
                 <div slot-scope="scope2">
                   <el-input v-model="scope2.row.name" placeholder="请填写参数"></el-input>
                 </div>
               </el-table-column>
               <el-table-column label="操作">
                 <div slot-scope="scope2">
                   <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete2(scope2.$index,scope2.row)">删除
                   </el-button>
                 </div>
               </el-table-column>
             </el-table>
           </div>
         </el-form-item>
       </el-tab-pane>
       <el-tab-pane label="结果" name="fourth">定时任务补偿</el-tab-pane>
     </el-tabs>
     <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
      form: {
        name: '',
        region: '',
        methodc: '',
        intertext: '',
        radio1: '0',
        tempList: [],
        tempList1: []
      },
      formLabelWidth: '120px',
      tempList2: [],
      imageType: [{
        label: 'Cookies',
        value: 'Cookies'
      }],
      imageType2: [{
        label: 'Cookies',
        value: 'Cookies'
      }],
      radio: '0',
      radio2: '0'
    }
  },
  methods: {
    addTemp () {
      this.form.tempList.push({
        name: '',
        pre: '',
        next: ''
      })
    },
    // 删除
    handleDelete ($index, row) {
      this.form.tempList.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    addTemp1 () {
      this.tempList1.push({
        name: '',
        pre: '',
        next: ''
      })
    },
    // 删除
    handleDelete1 ($index, row) {
      this.tempList1.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    addTemp2 () {
      this.tempList2.push({
        name: '',
        pre: '',
        next: ''
      })
    },
    // 删除
    handleDelete2 ($index, row) {
      this.tempList2.splice($index, 1)
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    onSubmit () {
      this.$http.post('http://localhost:8080/', JSON.stringify(this.form)).then(response => {
        console.log(response.data)
        this.tableData3 = response.data
      },
      response => {
        console.log('error')
      })
      console.log('submit!')
    }
  }
}
</script>

<style scoped>

</style>
