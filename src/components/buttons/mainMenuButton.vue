<template>
    <router-link :to="path" tag="div" class="firstColumnButton" exact>
        <img class="menuImage" :src="getImg(image)">
        <h2 class="title">{{tile}}</h2>
    </router-link>
</template>

<script>
    export default{
        data(){
            return{
            }
        },
        methods: {
            getImg(pic){
                return require('../../assets/mainMenu/'+pic)
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
            },
            path: {
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
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 100%;
        height: 180px;
        transition: all 0.5s;
    }

    .title{
        text-decoration: none;
    }

    .menuImage{
        height: 100px;
        width: 100px;
    }

    .firstColumnButton:hover{
        background: rgb(56, 64, 73);
        color: white;
    }

    .firstColumnButton h2.title{
        font-size: 20px;
    }

    .router-link-active{
        background: rgb(56, 64, 73);
        color: white;
    }
</style>
