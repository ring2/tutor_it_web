import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/components/Login')
  },
  {
    path: '/index',
    component: () => import('@/components/portal/Index.vue')
  },
  {
    path: '/course',
    component: () => import('@/components/portal/Course.vue')
  },
  {
    path: '/header',
    component: () => import('@/components/portal/Header.vue')
  },
  {
    path: '/home',
    component: () => import('@/components/Home'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: () => import('@/components/Welcome')
      },
      {
        path: '/home/user',
        component: () => import('@/components/users/UserList')
      },
      {
        path: '/role',
        component: () => import('@/components/power/RoleList')
      },
      {
        path: '/home/rights',
        component: () => import('@/components/power/Rights')
      },
      {
        path: '/home/goodsCate',
        component: () => import('@/components/goods/GoodsCate')
      },
      {
        path: '/home/courseList',
        component: () => import('@/components/course/CourseList')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path === '/index') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
