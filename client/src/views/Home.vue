<template>
  <div class="home">
    <div class="welcome-container">
      <div class="welcome">
        <h1 class="welcome-title">Welcome to Rani Market</h1>
        <p class="about">This is your premier destination for the latest and greatest in home electronics, we bring the future of technology to your doorstep</p>
        <div>
          <router-link v-if="!isLoggedIn" @click="$store.commit('closeCart')" to="/signin">
                <button class="sign-in">Sign In/Sign Up</button>
          </router-link>
        </div>
      </div>
      <div class="img-container">
        <img src="../assets/welcome-img.png" alt="welcome-img">
      </div>
    </div>
    <div class="popular">
      <h2 class="title">Our Most Popular Products</h2>
      <div class="products">
        <Popular />
      </div>
    </div>
    <div class="new">
      <h2 class="title">New Products</h2>
      <div class="products">
        <New />
      </div>
    </div>
  </div>
</template>

<script>
import Popular from '../components/Popular.vue';
import New from '../components/New.vue';
import axios from 'axios';

export default {
  components: {
    Popular,
    New
  },
  name: 'HomeView',
  data() {
    return {
      products: []
    }
  },
  methods: {
    async fetchProducts() {
      try {                
        const products = await axios.get('http://localhost:5000/products')

        this.products = products.data.data
      } catch (err) {
        console.error('Error fetching products', err);
      }
    }
  },
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('user-token');
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>

  .welcome-container {
    height: 855px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  .welcome {
    width: 100%;
    color: #222;
    text-align: center;
  }

  .welcome-title {
    font-size: 80px;
  }

  .about {
    font-size: 30px;
  }
  .sign-in {
        background-color: rgb(254, 114, 90);
        width: 200px;
        font-size: 20px;
        border: none;
        border-radius: 50px;
        padding: 20px;
        cursor: pointer;
        transition: 0.5s;
    }

    .sign-in:hover {
        background-color: black;
        color: white;
    }

  img {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1895px;
  }

  .img-container {
    position: relative;
  }

  .popular {
    height: auto;
    background-color: whitesmoke;
    padding: 75px 0;
  }
  
  .products {
    display: flex;
    justify-content: center;
  }

  .title {
    font-size: 60px;
    color: #222;
    text-align: center;
    margin-top: 50px;
    width: 100%;
  }
  
  
  .new {
    height: auto;
    padding: 75px 0;
  }
</style>
