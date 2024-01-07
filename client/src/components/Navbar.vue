<template>
    <div class="nav">
        <router-link to="/" ><img src="../assets/Logo.png" class="logo" alt="Logo"></router-link>
        
        <nav>
            <ul>
                <li><router-link class="link" to="/shop">Shop</router-link></li>
                <li><router-link class="link" to="/about">About Us</router-link></li>
                <li><router-link class="link" to="/search">Search</router-link></li>
            </ul>
        </nav>

        <div class="right">
            <Profile :class="{ 'cart-margin': hideCart }" v-if="isLoggedIn && !hideProfile" />
            <router-link v-if="!isLoggedIn" @click="$store.commit('closeCart')" to="/signin">
                <button class="sign-in">Sign In/Sign Up</button>
            </router-link>
            <button v-if="isLoggedIn && !hideCart" @click="$store.commit('openCart')"><img src="../assets/icons/cart.png" alt="cart icon"></button>
        </div>
    </div>
</template>

<script>
import Profile from './Profile.vue';

export default {
    name: 'Navbar',
    components: {
        Profile
    },
    computed: {
        isLoggedIn() {
            return !!localStorage.getItem('user-token');
        },
        hideProfile() {
            return this.$route.meta.hideProfileMenu;
        },
        hideCart() {
            return this.$route.meta.hideCart;
        },
    },
}
</script>

<style scoped>

    .sign-in {
        background-color: rgb(254, 114, 90);
        width: 200px;
        height: 50px;
        font-size: 20px;
        border: none;
        border-radius: 50px;
        padding: 20px;
        padding-top: 15px;
        padding-bottom: 15px;
        cursor: pointer;
        transition: 0.5s;
    }

    .sign-in:hover {
        background-color: black;
        color: white;
    }

    .right {
        display: flex;
    }

    .cart-margin {
        margin-right: 50px;
    }

    img {
        width: 22px;
        transition: 0.2s;
    }

    button {
        width: 55px;
        height: 55px;
        border-radius: 15px;
        border: none;
        background-color: rgb(254, 114, 90);
        margin: auto 50px;
    }

    button:hover img {
        width: 26px;
    }
    
    button:hover {
        cursor: pointer;
    }
    .link, .logo{
        font-size: 25px;
        text-decoration: none;
        color: black;
    }
    .nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        box-shadow: 0 20px 20px darkgrey;
    }
    ul {
        list-style: none;
    }
    li {
        display: inline-block;
        padding: 0 20px;
    }
    .link {
        transition: 0.3s ease;
    }
    .link:hover {
        color: red;
    }

    .logo {
        cursor: pointer;
        object-fit: cover;
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin: 10px 50px;
    }
    
</style>