<template>
    <div>
        <header class="nav">
            <div class="title">
                <img src="../assets/Logo.png" class="logo-img" alt="Logo">
                <h1>Sign In</h1>
            </div>
        </header>

        <main>
            <div class="form-container">
                <form>
                    <p class="form-title">Sign In</p>

                    <div class="input-section">
                        <label for="email">Email</label>
                        <input v-model="email" required id="email" type="email">
                    </div>

                    <div class="input-section">
                        <label for="password">Password</label>
                        <input v-model="password" required id="password" type="password">
                    </div>
                </form>

                
                <p class="p">Don't Have an Account? <router-link to="/signup">Sign Up</router-link></p>
                <p class="error">{{ error }}</p>

                <button @click="signIn" v-if="this.email !== '' && this.password !== ''" class="next-btn">Sign In<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
                <button v-else class="next-btn grey">All Inputs Required<img class="arrow" src="../assets/icons/rightarrow.png" alt="right arrow"></button>
            </div>
        </main>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'SignIn',
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async signIn() {
            try {
                const response = await axios.post('http://localhost:5000/users/login', {
                    email: this.email,
                    password: this.password,
                })

                console.log('Successfully loged in', response)

                localStorage.setItem('user-token', response.data.accessToken)
                console.log(response.data.accessToken);

                localStorage.setItem('user', JSON.stringify(response.data.user));
                this.$store.dispatch('initializeStore')
                
                this.$router.push('/')
            } catch (err) {
                console.error('cant log in', err);
                let error = err.response.data
                if (error === 'Not Allowed') {
                    this.error = 'Wrong Password'
                }
                else if (error = 'User not found') {
                    this.error = 'Wrong Email'
                }
                else {
                    this.error = 'An Error Occurred. Couldn\'t Login'
                }
            }
        }
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
        margin: 0 100px;
        margin-bottom: 50px;
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