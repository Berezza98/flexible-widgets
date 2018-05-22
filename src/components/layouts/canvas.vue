<template>
    <div class="canvas_wrapper" :class="typeOfCanvas === 'landscape' ? 'canvas_flex' : 'canvas_scroll'">
        <div :class="typeOfCanvas === 'portrait' ? 'canvas portrait' : 'canvas landscape'">
            <component v-for="(element) in draggableInsideCanvas" :key="element.id" :is="element.name" @showTopYRuler="showTopYRuler" @hideTopYRuler="hideTopYRuler" @showTopXRuler="showTopXRuler" @hideTopXRuler="hideTopXRuler" @hideRulers="hideRulers" :id="element.id" v-bind="element.props" :styles="element.styles"></component>
            <div class="rulerTopY" v-if="yTopRuler" :style="{top: postitionOfYRuler}"></div>
            <div class="rulerTopX" v-if="xTopRuler" :style="{left: postitionOfXRuler}"></div>
        </div>
    </div> 
</template>

<script>
    import Text from '../layoutElements/text.vue';
    import Image from '../layoutElements/imageBlock.vue';
    import Rectangle from '../layoutElements/rectangle.vue';
    import Line from '../layoutElements/line.vue';
    import Circle from '../layoutElements/circle.vue';
    
    export default{
        data(){
            return{
                yTopRuler: false,
                postitionOfYRuler: "0px",
                xTopRuler: false,
                postitionOfXRuler: "0px"
            }
        },
        components: {
            'text-block': Text,
            'image-block': Image,
            'rectangle-block': Rectangle,
            'line-block': Line,
            'circle-block': Circle
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
        methods: {
            showTopYRuler(position){
                this.yTopRuler = true;
                this.postitionOfYRuler = position + "px";
            },
            hideTopYRuler(){
                this.yTopRuler = false;
            },
            showTopXRuler(position){
                this.xTopRuler = true;
                this.postitionOfXRuler = position + "px";
            },
            hideTopXRuler(){
                this.xTopRuler = false;
            },
            hideRulers(){
                this.yTopRuler = false;
                this.xTopRuler = false;
            }
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
    }
    .canvas_wrapper{
        height: 85%;
        width: 100%;
        background: #f9f9f9;
        box-sizing: border-box;
        border: 1px solid #dadada;
        position: relative;
    }
    .canvas{
        transform: scale(0.5);
        align-self: center;
        position: relative;
        background: white;
        box-sizing: border-box;
        border: 1px solid #dadada;
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
    }

    .landscape{
        width: 1920px;
        height: 1080px;
    }

    .rulerTopY{
        position: relative;
        width: 100%;
        height: 1px;
        background: green;
    }

    .rulerTopX{
        position: relative;
        width: 1px;
        box-sizing: border-box;
        height: 100%;
        background: green;
    }
</style>
