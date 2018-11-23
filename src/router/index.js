import Vue from 'vue'
import Router from 'vue-router'
import menu from '@/views/menu/index'
import people from '@/views/people/index'
import project from '@/views/project/index'
import testcase from '@/views/testcase/index'
import addtestcase from '@/views/testcase/addtestcase/index'
import edittestcase from '@/views/testcase/edittestcase/index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '菜单',
      component: menu,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'people',
          name: '人员',
          component: people
        },
        {
          path: 'project',
          name: '项目',
          component: project
        },
        {
          path: 'testcase',
          name: '用例',
          component: testcase
        },
        {
          path: 'addtestcase',
          name: '添加用例',
          component: addtestcase
        },
        {
          path: 'edittestcase/:id',
          name: '修改用例',
          component: edittestcase
        }
      ]
    }
  ]
})
