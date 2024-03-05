import { createRouter, createWebHistory } from 'vue-router'
import { teams } from './teams'
import { shifts } from './shifts'
import { users } from './users'
import { root } from './root'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...root,
    ...teams,
    ...shifts,
    ...users
  ]
})

export default router
