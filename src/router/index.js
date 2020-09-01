import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '../components/Login.vue'
import home from '../components/home.vue'
import welcome from '../components/welcome.vue'
import users from '../components/user/users.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/home',
    component:home,
    redirect:'/welcome',
    children:[ 
      {path:'/welcome',component:welcome},
      {path:'/users',component:users},
    ]
  },
  {
    path:'/login',
    component:login
  },
  {
    path:'/',
    redirect:'/login'
  }
]


const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//挂载路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path === '/login') return next();
  const tokenStr = window.sessionStorage.getItem("token");
  if(!tokenStr) return next('/login')
  next()
})

export default router
