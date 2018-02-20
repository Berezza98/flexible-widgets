<template>
    <div v-on:click="changeMenu()" class="firstColumnButton">
        <img :src="require(image)">
        <h2 class="title">{{tile}}</h2>
    </div>
</template>

<script>
    export default{
        methods: {
            changeMenu(){
                console.log("Hello");
            }
        },
        props: {
            tile: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .firstColumnButton{
        background: rgb(84, 95, 107);
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 100%;
        height: 180px;
    }

    .firstColumnButton:hover{
        background: rgb(56, 64, 73);
        color: white;
    }

    .firstColumnButton h2.title{
        font-size: 20px;
    }
</style>
