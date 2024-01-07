<template>
    <div class="shop">
        <div class="container">
            <div class="product" v-for="product in products" :key="product._id">
                <Product @view-product="viewProduct" :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import Product from '../components/Product.vue'
import axios from 'axios'

export default {
    components: {
        Product
    },
    data() {
        return {
            products: [],
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
        },
        viewProduct(productId) {
            this.$router.push(`/view-product/${productId}`)
        }
    },
    mounted() {
        this.fetchProducts()
    }
}
</script>

<style scoped>

    .container {
        display: flex;
        flex-wrap: wrap;
    }
    .product {
        box-shadow: 0 0 30px darkgrey;
        border-radius: 30px;
        height: 400px;
        width: 300px;
        margin: 20px;
        justify-content: center;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: 0.5s;
    }

    img {
        width: 250px;
        height: 150px;
        object-fit: contain;
    }

    h2 {
        font-size: 25px;
    }
    h3 {
        font-size: 20px;
    }
</style>