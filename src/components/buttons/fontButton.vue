<template>
    <div @click="droppedInside(0,0)" class="firstColumnButton">
        <el-tooltip class="item" effect="dark" :open-delay="500" content="Click to add text block" placement="right">
            <div class="content">
                <md-icon class="md-size-1x">title</md-icon>
                <h2 class="title">Add Text</h2>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
    import Text from '../layoutElements/text.vue';
    import { eventBus } from '../../main';

    export default{
        data(){

        },
        components: {
            'text-interactive': Text
        },
        methods: {
            droppedInside(x, y){
                let id = new Date().getTime();
                this.$store.commit("addElementInsideCanvas", {
                    name: 'text-block',
                    id,
                    props: {
                        type: "text",
                        textValue: "Here will be your text",
                        x,
                        y,
                        z : 1,
                        width: 400,
                        height: 200
                    },
                    styles: {
                        background: "rgba(19, 206, 102, 0)",
                        opacity: 1,
                        color: "rgba(0, 0, 0, 1)",
                        'font-family': this.tile,
                        'font-size': "40px",
                        'line-height': "40px",
                        'font-weight': "normal",
                        'font-style': "normal",
                        'text-decoration': "none",
                        'text-align': "left",
                        'align-items': "flex-start"
                    }
                }, {module: "main"});
            }
        },
        props: {

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
        margin-top: 50px;
    }

    .md-size-1x{
        margin: 0px;
        height: 30px;
        font-size: 30px!important;
    }

    .content{
        position:  absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: #76B2D1;
        border-radius: 5px;
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
