import { createStore } from 'vuex'

export default createStore({
  state: {
    cartOpened: false,
    exist: [],
    user: null
  },
  getters: {
  },
  mutations: {
    openCart(state) {
      state.cartOpened = true
    },
    closeCart(state) {
      state.cartOpened = false
    },
    endCheckout(state) {
      state.cart = []
    },
    setUser(state, user) {
      state.user = user;
    },
    logout(state) {
      state.user = null;
    }
  },
  actions: {
    initializeStore({ commit }) {
      const user = localStorage.getItem('user');
      console.log(user);
      if (user) {
        commit('setUser', JSON.parse(user));
      }
    }
  },
  modules: {
  }
})
