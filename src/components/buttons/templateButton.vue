<template>
    <div class="firstColumnButton" @click="showModal">
        <el-tooltip class="item" effect="dark" :open-delay="500" content="Click to add pre-made template" placement="right">
            <div class="content">
                <md-icon class="md-size-1x">view_compact</md-icon>
                <h2 class="title">Pre-made templates</h2>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                styles: {
                    'padding': '3px',
                    'display': 'flex',
                    'flex-direction': 'column'
                }
            }
        },
        props: {

        },
        methods: {
            showModal(){
                this.$store.commit('selectingTemplate', true , {module: "main"});
            },
            selectTemplate(){
                this.$store.commit('selectTemplate', this.templObj.data , {module: "main"});
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
        border-radius: 5px;
        transition: background 0.5s;
    }

    .firstColumnButton:hover{
        background: #cce7f8;
    }

    .firstColumnButton i, .firstColumnButton .title{
        color: #409EFF !important;
    }

    .md-size-1x{
        margin: 0px;
        height: 30px;
        font-size: 30px !important;
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
        transition: color .4s cubic-bezier(.4,0,.2,1);
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
