import { createRouter, createWebHistory } from 'vue-router'
import { teams } from './teams'
import { shifts } from './shifts'
import { users } from './users'
import { root } from './root'
import { initUserStore } from '@/stores/user'

const publicPages = ['/login', '/create-account', '/about', '/test']

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...root,
    ...teams,
    ...shifts,
    ...users
  ]
})

router.beforeEach( (to) =>{
  const userStore = initUserStore()
  const authRequired = !publicPages.includes(to.path)

  if (!userStore.isAuthenticated && authRequired){
    return '/login'
  }

})

export default router
