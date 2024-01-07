<template>
    <div class="search">
            <input placeholder="Search" class="search-input" v-model="searchInput" type="text">

            <div class="top-buttons-container">
                <div class="buttons-container">
                    <button @click="selectedCategory = ''">All</button>
                    <div class="buttons">
                        <button @click="selectedCategory = 'camera'">Cameras</button>
                        <button @click="selectedCategory = 'cleaner'">Cleaners</button>
                        <button @click="selectedCategory = 'console'">Consoles</button>
                        <button @click="selectedCategory = 'headphone'">Headphones</button>
                        <button @click="selectedCategory = 'laptop'">Laptops</button>
                        <button @click="selectedCategory = 'phone'">Phones</button>
                        <button @click="selectedCategory = 'fridge'">Refridgerators</button>
                        <button @click="selectedCategory = 'ipad'">Tablets</button>
                        <button @click="selectedCategory = 'tv'">TVs</button>
                        <button @click="selectedCategory = 'watch'">Watches</button>
                    </div>
                </div>
            </div>


        <div class="container">
            <div class="product" v-for="product in check" :key="product._id">
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
            selectedCategory: '',
            searchInput: ''
        }
    },
    computed: {
        check() {
            if (this.selectedCategory !== '') {
                this.searchInput = ''
                if (this.selectedCategory !== 'phone')
                    return this.products.filter(product => product.image.match(this.selectedCategory))
                else {
                    return this.products.filter(product => product.image.match(this.selectedCategory) && product.price > 800)
                }
            }
            else if (this.searchInput !== '') {
                return this.products.filter(product => product.name.toLowerCase().match(this.searchInput.toLowerCase()))
            }
            else {
                return this.products
            }
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
    }

    .search-input {
        font-size: 30px;
        border-radius: 50px;
        padding: 10px;
        width: 500px;
        display: flex;
        margin: auto;
        margin-top: 100px;
        align-self: center;
    }

    .top-buttons-container {
        display: flex;
        justify-content: center;
        margin-top: 70px;
    }

    .buttons-container {
        display: flex;
        flex-wrap: wrap;
        max-width: 1100px;
        justify-content: center;
    }

    .buttons {
        margin: auto;
        margin-top: 20px;
    }

    button {
        background-color: rgb(254, 114, 90);
        width: 200px;
        font-size: 25px;
        border: none;
        border-radius: 20px;
        padding: 20px;
        margin: 10px;
        cursor: pointer;
        transition: 0.5s;
    }

    button:hover {
        background-color: black;
        color: white;
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