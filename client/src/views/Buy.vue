<template>
    <div class="buy">
        <header class="nav">
            <div>
                <router-link class="back-link" to="/shop"><button class="back-btn"><img class="arrow" src="../assets/icons/leftarrow.png" alt="back-img">Back to Shop</button></router-link>
            </div>
            <div class="title">
                <img src="../assets/Logo.png" class="logo-img" alt="Logo">
                <h1>Checkout</h1>
            </div>
            <div></div>
        </header>

        <main>
            <div :style="{ height: formNum === 3 ? '400px' : 'auto' }" class="form-container">
                <div v-if="formNum === 1 || formNum === 2" class="forms">
                    <form v-if="formNum === 2">
                        <p class="form-title">Payment Method</p>
                        <div class="boxes">
                            <div :style="{ borderColor: selectedButton === 'button1' ? 'rgb(254, 114, 90)' : 'grey', borderStyle: 'solid' }" @click="paymentMethod = 'Card' && selectButton('button1')" class="box">
                                <p class="payment-way"><img class="payment-icon" src="../assets/icons/credit-card.png" alt="card"> Card</p>
                            </div>
                            <div :style="{ borderColor: selectedButton === 'button2' ? 'rgb(254, 114, 90)' : 'grey', borderStyle: 'solid' }" @click="paymentMethod = 'In Store' && selectButton('button2')" class="box">
                                <p class="payment-way"><img class="payment-icon" src="../assets/icons/bag.png" alt="bag"> In Store</p>
                            </div>
                            <div :style="{ borderColor: selectedButton === 'button3' ? 'rgb(254, 114, 90)' : 'grey', borderStyle: 'solid' }" @click="paymentMethod = 'Pay After Delivered' && selectButton('button3')" class="box">
                                <p class="payment-way-3">Pay After Delivered</p>
                            </div>
                        </div>
                    </form>
                    <form v-if="formNum === 1">
                        <p class="form-title">Delivered To:</p>
                        <div class="input-section">
                            <label for="street">Street</label>
                            <input v-model="street" required id="street" type="text">
                        </div>

                        <div class="input-section">
                            <label for="zip-code">Zip Code</label>
                            <input v-model="zipCode" required id="zip-code" type="number">
                        </div>

                        <div class="input-section">
                            <label for="city">City</label>
                            <input v-model="city" required id="city" type="text">
                        </div>

                        <div class="input-section">
                            <label for="country">Country</label>
                            <CountrySelect @selection-changed="handleSelection" />
                        </div>

                        <div class="input-section">
                            <label for="instructions">Delivery Instructions</label>
                            <textarea v-model="instructions" id="instructions" cols="30" rows="7"></textarea>
                        </div>
                    </form>
                </div>
                <div v-else-if="formNum === 3">
                    <p class="thank-you-screen">Your Order Has Been Successful</p>
                </div>
                <div v-if="formNum === 1">
                    <button @click="formNum++" v-if="inputsRequired" class="next-btn">Continue<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
                    <button v-else class="next-btn grey">All Inputs Required<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
                </div>
                <div v-else-if="formNum === 2">
                    <button @click="deleteAll" v-if="inputsRequired" class="next-btn">Complete Order of ${{ totalPrice }}<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
                    <button v-else class="next-btn grey">Choose One<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
                </div>
            </div>

            <div v-if="formNum !== 3" class="products">
                <div class="title"><h2 class="title-txt">Products</h2></div>
                <div class="container">
                    <div class="product" v-for="product in products" :key="product._id">
                        <div class="content">
                            <h2 class="h2">{{ product.name }}</h2>
                            <img :src="require(`../assets/shop-images/${product.image}`)" alt="hello" class="product-img">
                            <div class="bottom">
                                <h4>Price: ${{ product.price }}</h4>
                                <h4>Quantity: {{ product.quantity }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <hr>
                <h3 class="total">Total Price: ${{ totalPrice }}</h3>
            </div>
        </main>

    </div>
</template>

<script>
import axios from 'axios'
import CountrySelect from '../components/Select.vue'
export default {
    name: 'Buy',
    components: {
        CountrySelect
    },
    data() {
        return {
            formNum: 1,

            street: '',
            zipCode: null,
            city: '',
            country: '',
            instructions: '',

            paymentMethod: '',
            selectedButton: null,

            products: []
        }
    },
    computed: {
        totalPrice() {
            const items = this.products

            const total = items.reduce((accumulator, item) => {
                return accumulator + (item.price * item.quantity);
            }, 0);

            return total
        },
        inputsRequired() {
            if (this.formNum === 1) {
                if (this.street !== '' && this.zipCode !== null && this.city !== '' && this.country !== '') {
                    return true
                }
            }
            else if (this.formNum === 2) {
                if (this.paymentMethod !== '') {
                    return true
                }
            }
        }
    },
    methods: {
        handleSelection(selectedValue) {
            this.country = selectedValue
        },
        selectButton(buttonId) {
            this.selectedButton = buttonId
        },
        async fetchProducts() {
            try {                
                const cart = await axios.get('http://localhost:5000/cart')

                cart.data.items.forEach(item => {
                    const itemQuantity = item.quantity
                    item.product.quantity = itemQuantity

                    this.products.push(item.product)
                });

                console.log(cart.data.items);

            } catch (err) {
                console.error('Error fetching products', err);
            }
        },
        async deleteAll() {
            this.formNum++

            try {
                const response = await axios.delete('http://localhost:5000/cart/deleteAll')

                console.log('all deleted');
            } catch (err) {
                console.error(err);
            }
        }
    },
    mounted() {
        this.fetchProducts()
    }
}
</script>

<style scoped>
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        box-shadow: 0 20px 20px darkgrey;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .back-link {
        margin-left: 50px;
    }
    
    .back-btn {
        cursor: pointer;
        border: none;
        font-size: 20px;
        padding: 10px;
        border-radius: 10px;
        background-color: rgb(254, 114, 90);
    }

    .arrow {
        width: 25px;
        vertical-align: middle;
        margin: 0 8px;
    }

    .logo-img {
        object-fit: cover;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 10px;
    }

    main {
        display: flex;
        justify-content: space-between;
        align-items: self-start;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        width: 400px;
        justify-content: center;
        padding: 30px 0;
        margin-top: 0;
    }

    hr {
        margin: 0 50px;
    }

    .product {
        box-shadow: 0 0 20px darkgrey ;
        border-radius: 30px;
        height: 400px;
        width: 300px;
        margin: 20px;
        justify-content: center;
        display: flex;
        align-items: center;
    }

    .product-img {
        width: 250px;
        height: 150px;
        object-fit: contain;
    }

    .h2 {
        font-size: 25px;
        margin: 20px;
        margin-right: 60px;
    }
    h4 {
        font-size: 20px;
        margin: 10px;
    }

    .total {
        font-size: 25px;
        text-align: center;
    }

    .title-txt {
        font-size: 30px;
        text-decoration: underline;
    }

    .title {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .products {
        border-left: 2px solid grey;
        margin-bottom: 100px;
        margin-top: 100px;
    }


    .form-container {
        position: relative;
        border: 2px solid grey;
        border-radius: 30px;
        margin: 100px 250px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-title {
        font-size: 25px;
        margin: 50px 30px;
        text-decoration: underline;
    }

    .forms {
        box-shadow: 0 0 20px darkgrey;
        border-radius: 50px;
        width: 75%;
        height: auto;
        margin-bottom: 200px;
        margin-top: 100px;
    }

    form {
        margin-top: 65px;
        margin-bottom: 65px;
    }

    .input-section label, .input-section input, .input-section textarea, .input-section select {
        display: block;
        width: 100%;
        margin-bottom: 5px;
    }
    
    .input-section {
        margin: 30px;
        font-size: 18px;
    }

    input[type="radio"] {
        margin-right: 10px;
    }

    .boxes {
        width: 450px;
        height: 75px;
        display: flex;
        margin: 30px;
    }

    .payment-way {
        font-size: 20px;
        margin: auto;
        margin-top: 20px;
    }
    .payment-way-3 {
        font-size: 20px;
        margin: auto;
        margin-top: 10px;
    }

    .payment-icon {
        width: 24px;
    }

    .box {
        width: 150px;
        height: 75px;
        text-align: center;
        border: 2px solid grey;
        cursor: pointer;
        transition: 0.3s;
    }

    .box:hover {
        background-color: rgb(254, 114, 90);
    }
    
    .input-section input {
        font-size: 18px;
        border: none;
        border-bottom: 2px solid grey;
        outline: none;
    }

    .input-section input:focus {
        border-bottom: 2px solid rgb(254, 114, 90);
    }
    
    textarea {
        font-size: 18px;
        border: 2px solid grey;
        outline: none;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    
    textarea:focus {
        border: 2px solid rgb(254, 114, 90);
    }

    input[type="number"]::-webkit-inner-spin-button,
    input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type="number"] {
        -moz-appearance: textfield;
    }

    .next-btn {
        position: absolute;
        bottom: 0;
        right: 0;
        margin: 50px;
        padding: 20px;
        font-size: 18px;
        border: none;
        border-radius: 50px;
        background-color: rgb(254, 114, 90);
        cursor: pointer;
    }

    .grey {
        background-color: grey;
        cursor: auto;
    }

    .thank-you-screen {
        font-size: 35px;
    }

</style>