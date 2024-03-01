import { defineStore } from 'pinia';

export const initUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') ?? '',
    userId: localStorage.getItem('userId') ?? ''
  }),
  actions: {
    setToken(token) {
      this.token = token
      localStorage.setItem('token', token)
    },
    setId(userId) {
      this.userId = userId
      localStorage.setItem('userId', userId)
    },
    setRole(role) {
      this.role = role
      localStorage.setItem('role', role)
    },
    clearUser() {
      this.token = ''
      this.userId = ''

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      localStorage.removeItem('role')
    }
  }
});
