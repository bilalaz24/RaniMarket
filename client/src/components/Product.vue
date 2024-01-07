<template>
    <div @click="viewProduct" class="container">
        <div class="content">
            <h2 >{{ product.name }}</h2>
            <img :src="require(`../assets/shop-images/${product.image}`)" alt="hello" class="product-img">
            <div class="bottom">
                <h3>Price: ${{ product.price }}</h3>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        viewProduct() {
            this.$emit('view-product', this.product._id);
        }
    }
}
</script>

<style scoped>

    .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .content {
        margin-top: 0;
    }

    img {
        width: 250px;
        height: 150px;
        object-fit: contain;
    }

    h2 {
        font-size: 25px;
    }
    h3 {
        font-size: 20px;
    }

</style>