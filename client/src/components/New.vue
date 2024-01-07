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
      newProducts: [        
        "Whirlpool Double Door Refrigerator",
        "iRobot Roomba s9+",
        "Apple MacBook Pro 16-inch",
        "Samsung Galaxy Tab S7+",
        "Bose QuietComfort 35 II",
        "Sony Bravia 4K Ultra HD"
      ]
    }
  },
  methods: {
    async fetchProducts() {
      try {                
        const res = await axios.get('http://localhost:5000/products')

        const products = res.data.data

        const newProducts = products.filter(product => this.newProducts.includes(product.name))

        this.products = newProducts

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