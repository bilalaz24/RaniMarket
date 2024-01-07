<template>
    <div>
        <button @click="addToCart(productID, 1)">Add to Cart</button>
    </div>
</template>

<script>
import axios from 'axios';
import { EventBus } from '../eventBus.js';

export default {
    props: {
        productID: String,
    },
    methods: {
        async addToCart(productId, quantity) {
      try {
        const response = await axios.post('http://localhost:5000/cart/add', {
          productId,
          quantity
        });

        EventBus.emit('product-added');
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    }
    },
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
    
</style>