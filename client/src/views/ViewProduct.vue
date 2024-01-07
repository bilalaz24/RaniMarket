<template>
    <div class="container">
        <div class="product" v-for="product in products" :key="product._id">
            <div class="img-container">
                <img class="img" :src="require(`../assets/shop-images/${product.image}`)" alt="product image">
            </div>
            <div>
                <h1>{{ product.name }}</h1>
                <h2>Price: ${{ product.price }}</h2>
                <Button v-if="isAuthenticated" :productID="product._id" />
                <router-link v-else to="/signin">
                    <button class="sign-in">Sign In/Sign Up</button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Button from '../components/AddToCart.vue'

export default {
    components: {
        Button
    },
    data() {
        return {
            products: []
        }
    },
    methods: {
        async fetchProducts() {
            const id = this.$route.params.id
            try {
                const response = await axios.get(`http://localhost:5000/products/${id}`)

                this.products = response.data.data                
            } catch (err) {
                console.error(err);
            }
        }
    },
    computed: {
        isAuthenticated() {
            return !!localStorage.getItem('user-token');
        }
    },
    mounted() {
        this.fetchProducts()
    }
}
</script>

<style scoped>

    button {
        background-color: rgb(254, 114, 90);
        width: 200px;
        height: 75px;
        font-weight: 600;
        font-size: 24px;
        border: none;
        border-radius: 50px;
        padding: 10px;
        margin: 10px;
        cursor: pointer;
        transition: 0.5s;
    }

    button:hover {
        background-color: black;
        color: white;
    }
    .img {
        width: 800px;
    }

    .img-container {
        margin-right: 100px;
    }

    .product {
        display: flex;
        margin: 100px 30px;
        margin-bottom: 210px;
        box-shadow: 0 0 30px darkgrey;
        padding: 100px;
        border-radius: 50px;
    }

    h1 {
        font-size: 40px;
    }

    h2 {
        font-size: 30px;
        margin: 50px 0;
    }
</style>