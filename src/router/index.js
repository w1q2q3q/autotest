import Vue from 'vue'
import Router from 'vue-router'
import menu from '@/views/menu/index'
import people from '@/views/people/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'menu',
      component: menu,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'people',
          component: people
        }]
    }
  ]
})
