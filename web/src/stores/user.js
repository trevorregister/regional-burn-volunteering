import { defineStore } from 'pinia';

export const initUserStore = defineStore('user', {
  state: () => ({
    isAuthenticated: false,
    userId: null
  }),
  actions: {

    setId(userId) {
      this.userId = userId
    },
    authenticate(){
      this.isAuthenticated = true
    },
    clearUser() {
      this.userId = null
      this.isAuthenticated = false
    }
  }
});
