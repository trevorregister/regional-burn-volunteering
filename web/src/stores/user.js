import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') ?? false,
    userId: localStorage.getItem('userId') ?? null,
    role: localStorage.getItem('role') ?? null
  }),
  actions: {
    setId(userId, role) {
      this.userId = userId
      this.role  = role
      localStorage.setItem('userId', userId)
      localStorage.setItem('role', role)
    },
    authenticate() {
      this.isAuthenticated = true
      localStorage.setItem('isAuthenticated', true)
    },
    clearUser() {
      this.userId = null
      this.isAuthenticated = false
      localStorage.removeItem('userId')
      localStorage.removeItem('isAuthenticated')
    }
  }
})
