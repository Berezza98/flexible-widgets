<template>
    <router-link :to="path" tag="div" class="firstColumnButton" exact>
        <div class="content">
            <md-icon class="md-size-2x">{{image}}</md-icon>
            <h2 class="title">{{tile}}</h2>
        </div>
    </router-link>
</template>

<script>

    export default{
        data(){
            return{
            }
        },
        methods: {

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
        cursor: pointer;
        width: 100%;
        transition: all 0.5s;
        position: relative;
    }

    .firstColumnButton:before{
        content: "";
        display: block;
        padding-top: 100%;
    }

    .content{
        position:  absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #c5c5c5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .title{
        text-decoration: none;
    }

    .menuImage{
        height: 100px;
        width: 100px;
    }

    .firstColumnButton h2.title{
        font-size: 1em;
        text-align: center;
        line-height: 1em;
    }

    .router-link-active{
        background: #f0f0f0;
    }
    .router-link-active .content{
        color: #1989fa;
    }
</style>
