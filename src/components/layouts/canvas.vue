<template>
    <div class="canvas_wrapper" :class="typeOfCanvas === 'landscape' ? 'canvas_flex' : 'canvas_scroll'">
        <div :class="typeOfCanvas === 'portrait' ? 'canvas portrait' : 'canvas landscape'">
            <component v-for="(element) in draggableInsideCanvas" :key="element.id" :is="element.name" :id="element.id" v-bind="element.props" :styles="element.styles"></component>
            <div class="ruler rulerY" v-if="yTopRuler" :style="{top: postitionOfYRuler}"></div>
            <div class="ruler rulerY" v-if="yBottomRuler" :style="{top: postitionOfBottomYRuler}"></div>     
            <div class="ruler rulerX" v-if="xTopRuler" :style="{left: postitionOfXRuler}"></div>
            <div class="ruler rulerX" v-if="xBottomRuler" :style="{left: postitionOfBottomXRuler}"></div>
            <div class="ruler rulerX" v-if="xMidRuler" :style="{left: postitionOfMidXRuler}"></div>
            <div class="ruler rulerY" v-if="yMidRuler" :style="{top: postitionOfMidYRuler}"></div>
            <parent-ruler></parent-ruler>
        </div>
    </div> 
</template>

<script>
    import { eventBus } from '../../main.js';

    import Text from '../layoutElements/text.vue';
    import Image from '../layoutElements/imageBlock.vue';
    import Rectangle from '../layoutElements/rectangle.vue';
    import Line from '../layoutElements/line.vue';
    import Circle from '../layoutElements/circle.vue';
    import Ruler from './ruler.vue';
    
    export default{
        data(){
            return{
                yTopRuler: false,
                postitionOfYRuler: "0px",
                xTopRuler: false,
                postitionOfXRuler: "0px",
                yBottomRuler: false,
                postitionOfBottomYRuler: "0px",
                xBottomRuler: false,
                postitionOfBottomXRuler: "0px",
                xMidRuler: false,
                postitionOfMidXRuler: "0px",
                yMidRuler: false,
                postitionOfMidYRuler: "0px"
            }
        },
        components: {
            'text-block': Text,
            'image-block': Image,
            'rectangle-block': Rectangle,
            'line-block': Line,
            'circle-block': Circle,
            'parent-ruler': Ruler
        },
        computed: {
            currentScale(){
                return this.$store.state.main.currentScale;
            },
            draggableInsideCanvas(){
                return this.$store.state.main.draggableInsideCanvas;
            }
        },
        props: {
            typeOfCanvas: {
                type: String,
                required: true
            }
        },
        created(){
            eventBus.$on('showTopXRuler', (position) => {
                this.xTopRuler = true;
                this.postitionOfXRuler = position + "px";
            });
            eventBus.$on('hideTopXRuler', () => {
                this.xTopRuler = false;
            });
            eventBus.$on('showTopYRuler', (position) => {
                this.yTopRuler = true;
                this.postitionOfYRuler = position + "px";
            });
            eventBus.$on('hideTopYRuler', () => {
                this.yTopRuler = false;
            });
            eventBus.$on('showBottomYRuler', (position) => {
                this.yBottomRuler = true;
                this.postitionOfBottomYRuler = position + "px";
            });
            eventBus.$on('hideBottomYRuler', () => {
                this.yBottomRuler = false;
            });
            eventBus.$on('showBottomXRuler', (position) => {
                this.xBottomRuler = true;
                this.postitionOfBottomXRuler = position + "px";
            });
            eventBus.$on('hideBottomXRuler', () => {
                this.xBottomRuler = false;
            });
            eventBus.$on('showMidXRuler', (position) => {
                this.xMidRuler = true;
                this.postitionOfMidXRuler = position + "px";
            });
            eventBus.$on('showMidYRuler', (position) => {
                this.yMidRuler = true;
                this.postitionOfMidYRuler = position + "px";
            });
            eventBus.$on('hideMidXRuler', (position) => {
                this.xMidRuler = false;
            });
            eventBus.$on('hideMidYRuler', () => {
                this.yMidRuler = false;
            });
            eventBus.$on('hideRulers', () => {
                this.yTopRuler = false;
                this.xTopRuler = false;
                this.yBottomRuler = false;
                this.xBottomRuler = false;
                this.yMidRuler = false;
                this.xMidRuler = false;
            });
            
        }
    }
</script>

<style scoped>
    .canvas_flex{
        display: flex;
        justify-content: center;
    }
    .canvas_scroll{
        overflow: scroll;
        padding-top: 50px;
        padding-bottom: 50px;
        display: flex;
        justify-content: center;
    }
    .canvas_wrapper{
        height: 82%;
        width: 100%;
        background: #f9f9f9;
        box-sizing: border-box;
        border: 1px solid #dadada;
        position: relative;
    }
    .canvas{
        transform: scale(0.5);
        position: relative;
        background: white;
        box-sizing: content-box;
        border: 2px solid #dadada;
        flex-shrink: 0;
    }

    .canvas_flex_start{
        align-self: flex-start !important;
    }

    .hide{
        opacity: 0;
    }

    .portrait{
        height: 1920px;
        width: 1080px;
        margin-top: -490px;
        margin-bottom: -510px;
    }

    .landscape{
        width: 1920px;
        height: 1080px;
        align-self: center;
    }

    .ruler{
        z-index: 999999;
    }

    .rulerY{
        position: absolute;
        width: 100%;
        height: 1px;
        background: green;
    }

    .rulerX{
        position: absolute;
        width: 1px;
        box-sizing: border-box;
        height: 100%;
        background: green;
    }

    @media screen and (max-height: 900px) {
        .canvas_wrapper{
            height: 86%;
        }
    }
</style>
