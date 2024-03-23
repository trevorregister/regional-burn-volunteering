import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: localStorage.getItem('isAuthenticated') ?? false,
    userId: localStorage.getItem('userId') ?? null
  }),
  actions: {

    setId(userId) {
      this.userId = userId
      localStorage.setItem('userId', userId)
    },
    authenticate(){
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
});
