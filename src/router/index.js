import { createWebHistory, createRouter } from 'vue-router'

import Login from '../views/Login.vue'
import Home from '../views/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
    const isLogin = Boolean(Number(localStorage.getItem('isLogin')))
    if (!isLogin && to.name !== 'Login') {
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router
