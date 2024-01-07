<template>
    <div class="cart" v-if="isAuthenticated">
        <div class="head">
            <h2>Cart</h2>
            <div class="close" @click="$store.commit('closeCart')"><img class="close-img" src="../assets/icons/close.jpg" alt="close"></div>
        </div>

        <hr>
        
        <p class="no-products" v-if="cart.length === 0">You don't have any products in your cart</p>
        <div class="products">
            <div class="container">
                <div class="product" v-for="product in cart" :key="product._id">
                    <div class="content">
                        <div class="top">
                            <h2>{{ product.name }}</h2>
                            <button class="delete-button" @click="deleteProduct(product._id)"><img class="delete-img" src="../assets/icons/trashcan.png" alt="close"></button>
                        </div>
                        <img :src="require(`../assets/shop-images/${product.image}`)" alt="hello" class="product-img">
                        <div class="bottom">
                            <h4>Price: ${{ product.price }}</h4>
                            <input type="number" min="1" max="10" v-model="product.quantity" @change="updateQuantity(product._id, product.quantity)">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        
        <hr>
        <div class="buy">
            <router-link v-if="cart.length !== 0" @click="$store.commit('closeCart')" to="/checkout">
                <button class="buy-btn">Buy</button>
            </router-link>
            <button class="buy-btn grey" v-if="cart.length === 0">Buy</button>
            <h3>Total Price: ${{ totalPrice }}</h3>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { EventBus } from '../eventBus.js';


export default {
    data() {
        return {
            cart: []
        }
    },
    methods: {
        async updateQuantity(productId, newQuantity) {

            try {
                const response = await axios.put('http://localhost:5000/cart/update-product', {
                    productId,
                    newQuantity
                })
            } catch (err) {
                console.log(err);
            }
        },
        async deleteProduct(productId) {

            try {
                const response = await axios.delete('http://localhost:5000/cart/remove', { data: {productId} });

                this.fetchProducts()
            } catch (error) {
                console.error('Error removing product from cart:', error);
            }
        },
        async fetchProducts() {
            try {                
                const cart = await axios.get('http://localhost:5000/cart')

                const list = []
                cart.data.items.forEach(item => {
                    const itemQuantity = item.quantity
                    item.product.quantity = itemQuantity

                    list.push(item.product)
                });

                this.cart = list


            } catch (err) {
                console.error('Error fetching products', err);
            }
        }
    },
    computed: {
        totalPrice() {
            const items = this.cart

            const total = items.reduce((accumulator, item) => {
                return accumulator + (item.price * item.quantity);
            }, 0);

            return total
        },
        isAuthenticated() {
            return !!localStorage.getItem('user-token');
        }
    },
    mounted() {
        this.fetchProducts()
    },
    created() {
        EventBus.on('product-added', () => {
            this.fetchProducts();
        });
    },
    unmounted() {
        EventBus.off('product-added')
    }
}
</script>

<style scoped>

    hr {
        margin: 10px 20px;
    }

    .close-img {
        width: 25px;
    }
    
    .close {
        position: absolute;
        top: 0;
        right: 50px;
        margin: 20px;
    }

    .close:hover {
        cursor: pointer;
    }

    .cart {
        position: fixed;
        height: 100vh;
        box-shadow: -5px 0 20px grey;
        background-color: white;
    }
    
    .head {
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        height: 700px;
        overflow: hidden;
        overflow-y: scroll;
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
    }

    .delete-img {
        width: 20px;
        height: 18px;
    }

    .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .delete-button {
        margin-right: 20px;
        background-color: rgb(255, 52, 52);
        border: none;
        border-radius: 50%;
        padding: 15px;
        color: white;
        font-size: 15px;
        cursor: pointer;
    }
    .product-img {
        width: 250px;
        height: 150px;
        object-fit: contain;
    }

    h2 {
        font-size: 25px;
        margin: 10px;
    }

    h3 {
        margin-right: 50px;
    }

    h4 {
        font-size: 20px;
        margin: 10px;
    }

    input {
        width: 50px;
        margin-right: 30px;
        font-size: 25px;
    }

    .buy {
        display: flex;
        justify-content: space-between;
        padding: 0 50px;
    }

    .buy-btn {
        margin-top: 10px;
        cursor: pointer;
        border: none;
        font-size: 20px;
        padding: 10px;
        border-radius: 10px;
        background-color: rgb(254, 114, 90);
    }

    .no-products {
        text-align: center;
        margin: 30px;
        margin-top: 50px;
        font-size: 25px;
    }

    .grey {
        background-color: grey;
        cursor: auto;
    }
    
</style>