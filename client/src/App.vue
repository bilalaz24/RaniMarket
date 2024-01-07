<template>
  <div class="page">
    <div class="main-content">
      <Navbar v-if="!hideNavbarAndFooter"/>
      <router-view/>
      <Footer v-if="!hideNavbarAndFooter"/>
    </div>
    <div v-if="$store.state.cartOpened" class="cart-component">
      <Cart v-if="isAuthenticated" />
    </div>
  </div>
</template>


<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import Cart from './components/Cart.vue'

export default {
  components: {
    Navbar,
    Footer,
    Cart
  },
  computed: {
    hideNavbarAndFooter() {
      return this.$route.meta.hideNavbar;
    },
    isAuthenticated() {
      return !!localStorage.getItem('user-token');
    }
  },
}
</script>

<style>
  body {
    margin: 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .container {
    margin: 50px;
  }

  .page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .main-content {
    flex: 1;
  }

  .cart-component {
    width: 400px;
  }

</style>
