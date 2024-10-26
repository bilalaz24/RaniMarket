<template lang="">
    <div class="footer">
        <div class="txt">            
            <div class="links">
                <router-link to="/" ><img src="../assets/Logo.png" class="logo" alt="Logo"></router-link>
                <ul>
                    <li><router-link class="link" to="/shop">Shop</router-link></li>
                    <li><router-link class="link" to="/about">About Us</router-link></li>
                    <li><router-link class="link" to="/search">Search</router-link></li>
                </ul>
            </div>
            <div class="contacts">
                <h2>Contacts</h2>
                
                <h3>Gothenburg, Sweden</h3>
                <h3>bilalaz24@gmail.com</h3>
                <h3>+ 012 345 67 89, Sweden</h3>
            </div>
            <div class="media">
                <h2>Media</h2>

                <h3>Facebook <a href="https://www.facebook.com" target="_blank"><img href="" class="media-sign" src="../assets/footer/Facebook.png" alt="Facebook logo"></a></h3>
                <h3>Instagram <a href="https://instagram.com" target="_blank"><img class="media-sign" src="../assets/footer/Instagram.png" alt="Instagram logo"></a></h3>
                <h3>Twitter <a href="https://twitter.com" target="_blank"><img class="media-sign" src="../assets/footer/Twitter.png" alt="Twitter logo"></a></h3>
            </div>
        </div>
        <div class="copy-right">
            <h4>Copyright&copy; {{ new Date().getFullYear() }}. All rights reserved.</h4>
        </div>
    </div>
</template>

<script>

export default {

}
</script>

<style scoped>

    .footer {
        background-color: rgb(26, 26, 26);
        max-height: 300vh;
        color: white;
        font-size: 20px;
        margin-top: auto;
    }

    .txt {
        display: flex;
        justify-content: space-between;
        margin: 0 100px;
    }

    .copy-right {
        display: flex;
        align-self: center;
        justify-content: center;
        background-color: rgb(48, 48, 48);
    }

    .logo {
        cursor: pointer;
        object-fit: cover;
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin: 10px 50px;
    }

    .media {
        margin-right: 50px;
    }

    h3 {
       color: darkgrey;
       font-size: 20px;
    }

    h4 {
        font-size: 15px;
    }

    .media-sign {
      width: 40px;
      height: 40px;
    }

    ul {
        list-style: none;
    }
    li {
        display: block;
        padding: 0 20px;
        margin: 20px 0;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    }
    .link {
        transition: 0.3s ease;
        text-decoration: none;
        color: darkgrey;
        font-size: 20px;
    }
    .link:hover {
        color: red;
    }

</style>
