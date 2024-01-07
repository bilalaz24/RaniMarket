<template>
    <div>
    <div class="products">
        <div class="product" v-for="product in products" :key="product._id">
          <Product :product="product" />
        </div>
      </div>
    </div>
</template>

<script>
import Product from '../components/Product.vue';
import axios from 'axios';

export default {
  components: {
   Product
  },
  data() {
    return {
      products: [],
      popular: [
        "Samsung QLED 4K Smart TV",
        "Dyson V11 Torque Drive",
        "Dell XPS 15",
        "Apple iPhone 13 Pro Max",
        "Sony PlayStation 5",
        "Garmin Fenix 6",
      ]
    }
  },
  methods: {
    async fetchProducts() {
      try {                
        const res = await axios.get('http://localhost:5000/products')

        const products = res.data.data

        const popular = products.filter(product => this.popular.includes(product.name))

        this.products = popular

      } catch (err) {
        console.error('Error fetching products', err);
      }
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
    
  .product {
    box-shadow: 0 0 30px darkgrey;
    background-color: white;
    border-radius: 30px;
    height: 400px;
    width: 300px;
    margin: 20px;
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .products {
    width: 1100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

</style>