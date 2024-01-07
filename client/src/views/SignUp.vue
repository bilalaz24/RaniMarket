<template>
    <div>
        <header class="nav">
            <div class="title">
                <img src="../assets/Logo.png" class="logo-img" alt="Logo">
                <h1>Sign Up</h1>
            </div>
        </header>

        <main>
            <div class="form-container">
                <form>
                    <p class="form-title">Sign Up</p>

                    <div class="input-section">
                        <label for="email">Email</label>
                        <input v-model="email" required id="email" type="email">
                    </div>

                    <div class="input-section">
                        <label for="password">Create a Password</label>
                        <input v-model="password" required id="password" type="password">
                    </div>
                    
                    <div v-if="email !== '' && password !== ''">
                        <div class="input-section">
                            <label for="personal-num">Personal Number</label>
                            <input v-model="personalNum" required id="personal-num" type="number">
                        </div>
        
                        <div class="input-section">
                            <label for="phone-num">Phone Number</label>
                            <input v-model="phoneNum" required id="phone-num" type="number">
                        </div>
        
                        <div class="input-section">
                            <label for="name">First and Second Name</label>
                            <input v-model="name" required id="name" type="text">
                        </div>
                    </div>
                </form>

                <p class="p">Already Have an Account? <router-link to="/signin">Sign In</router-link></p>
                <p class="error">{{ error }}</p>

                <button @click="createAccount" v-if="email !== '' && password !== '' && personalNum !== null && phoneNum !== null && name !== ''" class="next-btn">Sign Up<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
                <button v-else class="next-btn grey">All Inputs Required<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
            </div>
        </main>
    </div>
</template>

<script>
import CountrySelect from '../components/Select.vue'
import axios from 'axios';

export default {
    name: 'SignUp',
    components: {
        CountrySelect
    },
    data() {
        return {
            email: '',
            password: '',
            personalNum: null,
            phoneNum: null,
            name: '',

            error: ''
        }
    },
    methods: {
        async createAccount() {

            try {
                const response = await axios.post('http://localhost:5000/users/add', {
                    email: this.email,
                    password: this.password,
                    personalNum: this.personalNum,
                    phoneNum: this.phoneNum,
                    name: this.name,
                })

                console.log('Successfully created a user', response)
                
                this.$router.push('/signin')
            } catch (err) {
                console.error('Error creating account', err);
                let error = err.response.data
                if (error === 'Email already exists') {
                    this.error = 'A User with Same Email Already Exists'
                }
                else {
                    this.error = 'An Error Occurred. Couldn\'t Create an Account'
                }
            }
        },
        handleSelection(selectedValue) {
            this.country = selectedValue
        },
    }
}
</script>


<style scoped>

    .nav {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: white;
        box-shadow: 0 20px 20px darkgrey;
        padding: 10px;
    }

    .title {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo-img {
        object-fit: cover;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-right: 25px;
    }

    .arrow {
        width: 25px;
        vertical-align: middle;
        margin: 0 8px;
    }


    main {
        display: flex;
        justify-content: center;
    }
    .form-container {
        position: relative;
        border: 2px solid grey;
        border-radius: 30px;
        margin: 100px;
        padding-bottom: 100px;
        width: 700px;
        height: auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .form-title {
        font-size: 25px;
        margin: 50px 30px;
        text-align: center;
    }

    form {
        margin: 50px 100px;
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

    .input-section input {
        font-size: 18px;
        border: none;
        border-bottom: 2px solid grey;
        outline: none;
    }

    .input-section input:focus {
        border-bottom: 2px solid rgb(254, 114, 90);
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
        right: 1;
        padding: 20px;
        margin: 50px;
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

    .p {
        margin-bottom: 50px;
    }

    .error {
        position: absolute;
        bottom: 185px;
        color: rgb(194, 0, 0);
        font-weight: 700;
        font-size: 18px;
    }
    
</style>