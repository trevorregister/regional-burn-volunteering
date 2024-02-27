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
    clearUser() {
      this.token = ''
      this.userId = ''

      localStorage.removeItem('token')
      localStorage.removeItem('userId')
    }
  }
});
