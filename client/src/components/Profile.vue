<template>
    <div>
        <div class="profile">
            <div @click="menu = !menu" class="circle">
                <h2>{{ letters }}</h2>
            </div>
            <div v-if="menu" class="menu">
                <div class="info">
                    <div class="circle small">
                        <h2>{{ letters }}</h2>
                    </div>
                    <div class="text">
                        <p>{{ $store.state.user.name }} <br> {{ $store.state.user.email }}</p>
                    </div>
                </div>
                <hr>
                <div class="options">
                    <div @click="toProfile" class="option">
                        <p class="link">Profile</p>
                    </div>
                    <div @click="signOut" class="option bottom">
                        <p class="link">Sign Out</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            letters: '',
            menu: false
        }
    },
    methods: {
        fillLetters() {
            const user = this.$store.state.user

            if (user !== null) {
                const nameArray = user.name.split(' ')

                let letters = ''
                nameArray.forEach(word => {
                    const lettersInWord = word.split('')
                    
                    letters = letters + lettersInWord[0].toUpperCase()
                });
                this.letters = letters
            }
        },
        signOut() {
            this.menu = false
            localStorage.removeItem('user-token');
            localStorage.removeItem('user');
            
            this.$store.commit('setUser', null);
            window.location.reload()
            this.$router.push('/')
        },
        toProfile() {
            this.menu = false
            this.$router.push('/profile')
        }
    },
    mounted() {
        this.fillLetters()
    }
}
</script>

<style scoped>
    .circle {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background-color: rgb(255, 130, 108);
        cursor: pointer;
        margin: 10px;

        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 15px;
    }

    .profile {
        position: relative;
    }
    
    .menu {
        position: absolute;
        border-radius: 20px;
        top: 60px;
        right: 0;
        width: 220px;
        background-color: whitesmoke;
    }

    .info {
        display: flex;
        margin: 10px 0;
        justify-content: center;
    }

    .small {
        width: 40px;
        height: 40px;
        background-color: black;
        color: white;
        font-size: 12px;
        cursor: auto;
    }

    .text {
        font-size: 12px;
    }

    .option {
        width: 100%;
        text-align: center;
        cursor: pointer;
        padding: 2px 0;
        transition: 0.5s;
    }

    .option p {
        cursor: pointer;
    }
    
    .bottom {
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }

    .option:hover {
        background-color: rgb(206, 206, 206);
    }

    .link {
        text-decoration: none;
        color: black;
        cursor: auto;
    }
</style>