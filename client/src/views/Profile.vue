<template>
    <div class="profile">
        <div class="container">
            <h1 class="title">{{ user.name.split(' ')[0] }}'s Profile</h1>
            <div v-if="!editing" class="info">
                <div class="row">
                    <p>Name:</p>
                    <p>{{ user.name }}</p>
                </div>
                <div class="row">
                    <p>Email:</p>
                    <p>{{ user.email }}</p>
                </div>
                <div class="row">
                    <p>Personal Number:</p>
                    <p>{{ user.personalNum }}</p>
                </div>
                <div class="row">
                    <p>Phone Number:</p>
                    <p>{{ user.phoneNum }}</p>
                </div>
            </div>
            <div v-if="editing">
                <div class="row">
                    <p>Name:</p>
                    <input :value="user.name" @input="e => updatedUser.name = e.target.value" type="text">
                </div>
                <div class="row">
                    <p>Email:</p>
                    <input :value="user.email" @input="e => updatedUser.email = e.target.value" type="text">
                </div>
                <div class="row">
                    <p>Personal Number:</p>
                    <input :value="user.personalNum" @input="e => updatedUser.personalNum = e.target.value" type="text">
                </div>
                <div class="row">
                    <p>Phone Number:</p>
                    <input :value="user.phoneNum" @input="e => updatedUser.phoneNum = e.target.value" type="text">
                </div>
            </div>
            <button v-if="!editing" @click="editing = true" class="edit">Edit</button>
            <button v-if="editing" @click="update" class="edit">Done</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            editing: false,
            userId: '',
            user: {
                name: '',
                email: '',
                personalNum: null,
                phoneNum: null
            },
            updatedUser: {
                name: '',
                email: '',
                personalNum: null,
                phoneNum: null
            }
        }
    },
    methods: {
        getUserData() {
            this.user.name = this.$store.state.user.name
            this.user.email = this.$store.state.user.email
            this.user.personalNum = this.$store.state.user.personalNum
            this.user.phoneNum = this.$store.state.user.phoneNum

            this.userId = this.$store.state.user._id
        },
        async update() {
            this.editing = false

            let formData = Object.keys(this.updatedUser).reduce((newObj, key) => {
                if (this.updatedUser[key]) {
                    newObj[key] = this.updatedUser[key];
                }
                return newObj;
            }, {});

            console.log(formData);

            
            try {
                const response = await axios.put(`http://localhost:5000/users/update/${this.userId}`, formData)

                console.log(response.data.user);
                localStorage.removeItem('user')
                localStorage.setItem('user', JSON.stringify(response.data.user));
                
                window.location.reload()

            } catch (err) {
                console.error('Error updating user', err);
            }
            
        }
    },
    mounted() {
        this.getUserData()
    },
    created() {
        this.updatedObject = { ...this.originalObject };
    }
}
</script>

<style scoped>

    .profile {
        display: flex;
        justify-content: center;
    }

    .container {
        position: relative;
        display: flex;
        justify-content: center;
        width: 700px;
        height: 320px;
        box-shadow: 0 0 20px darkgrey;
        border-radius: 50px;
        padding: 170px 0;
        margin: 100px;
    }

    .title {
        text-align: center;
        position: absolute;
        top: 60px;
    }

    .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 500px;
        font-size: 20px;
    }
    
    .edit {
        position: absolute;
        bottom: 75px;
        background-color: rgb(254, 114, 90);
        width: 200px;
        font-size: 20px;
        border: none;
        border-radius: 50px;
        padding: 20px;
        cursor: pointer;
        transition: 0.5s;
    }

    .edit:hover {
        background-color: black;
        color: white;
    }


    input {
        font-size: 18px;
        border: none;
        border-bottom: 2px solid grey;
        outline: none;
    }

    input:focus {
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
</style>
