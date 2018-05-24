<template>
    <router-link :to="path" tag="div" class="firstColumnButton" exact>
        <el-tooltip class="item" effect="dark" :open-delay="500" :content="tooltip" placement="right">
            <div class="content">
                <md-icon class="md-size-1x">{{image}}</md-icon>
                <h2 class="title">{{tile}}</h2>
            </div>
        </el-tooltip>
    </router-link>
</template>

<script>
    import {eventBus} from '../../main.js';

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
            },
            tooltip: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .firstColumnButton{
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;

    }

    .md-size-1x{
        margin: 0px;
        height: 30px;
        font-size: 30px!important;
    }

    .firstColumnButton:first-child{
        margin-top: 20px;
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
        margin-top: 5px;
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
        border-radius: 5px;
    }
    .router-link-active .content{
        color: #095fa4;
    }

    @media screen and (max-width: 1800px) {
        .firstColumnButton h2.title{
            font-size: 0.5em;
            text-align: center;
            line-height: 0.8em;
        }

        .md-size-1x{
            margin-top: 2px;
            height: 22px;
            font-size: 22px!important;
        }
    }
</style>
