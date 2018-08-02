<template>
    <div :class="'firstColumnButton' + (disableAllControls ? ' disable' : '')" @click="openShapes">
        <el-tooltip class="item" effect="dark" :open-delay="500" :content=" $t('tooltips.shapeBlock') " placement="right">
            <div class="content">
                <md-icon class="md-size-1x">widgets</md-icon>
                <h2 class="title">{{ $t('buttons.shapes') }}</h2>
            </div>
        </el-tooltip>
  </div>
</template>

<script>
    import Rectangle from '../layoutElements/rectangle.vue';
    import Circle from '../layoutElements/circle.vue';
    import Line from '../layoutElements/line.vue';

    import { eventBus } from '../../main.js';
    
    export default{
        data(){
            return{
                
            }
        },
        props: {

        },
        methods: {
            openShapes(){
                eventBus.$emit('showElement', {value: "shapes"});
            }
        },
        computed: {
            disableAllControls(){
                return this.$store.state.main.disableAllControls;
            }
        }
    }
</script>

<style scoped>
    .firstColumnButton{
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        cursor: pointer;
        border-radius: 5px;
    }

    .firstColumnButton .draggable{
        border-radius: 5px;
        transition: background 0.5s;
    }

    .firstColumnButton:hover{
        background: #cce7f8;
    }

    .firstColumnButton:hover i, .firstColumnButton:hover .title{
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
        text-transform: capitalize;
    }

    .menuImage{
        height: 100px;
        width: 100px;
    }

    .disable{
        pointer-events: none;
    }

    .firstColumnButton h2.title{
        font-size: 1em;
        text-align: center;
        line-height: 1em;
    }

    @media screen and (max-width: 1800px) {
        .firstColumnButton h2.title{
            font-size: 0.6em;
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
