import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import login from './views/Login.vue'
import admin from './views/Admin.vue'
import setting from './views/Setting'
import weui from 'weui.js'
import 'weui'
import store from './store'
Vue.prototype.$weui = weui
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path:'/index',
      name:'index',
      component:Home
    },
    {
      path:'/home',
      name:'home2',
      component:Home
    },
    {
      path:'/login',
      name:'login',
      component:login
    },
    {
      path:'/admin',
      name:'admin',
      component:admin
    },
    {
      path:'/setting',
      name:'setting',
      component:setting
    }
  ]
})