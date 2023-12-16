import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: ()=>import("../components/login.vue")
  },
  {
    path: '/index',
    component: ()=>import("../components/index.vue")
  },
  {
    path: '/list',
    redirect:"/dashboard",
    component: ()=>import("../components/list.vue"),
    children:[
      {
        path:"/corporate_member",
        component: ()=>import("../components/HY1.vue"),
      },
      {
        path:"/individual_member",
        component: ()=>import("../components/HY2.vue"),
      },
      {
        path:"/Invalid_member",
        component: ()=>import("../components/HY3.vue"),
      },
      {
        path:"/dashboard",
        component: ()=>import("../components/index.vue"),
      },
    ]
  },
  {
    path: '/add',
    component: ()=>import("../components/add.vue")
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path==="/login"){
    next()
  }else{
    if(sessionStorage.getItem("token")){
      next()
    }else{
      next("/login")
    }
  }
})

export default router
