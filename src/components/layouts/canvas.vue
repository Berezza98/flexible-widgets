<template>
    <div class="canvas_wrapper">
        <div :class="typeOfCanvas === 'portrait' ? 'canvas portrait' : 'canvas landscape'" :style="'transform: scale('+ currentScale +');'">
            <component v-for="(element) in draggableInsideCanvas" :key="element.id" :is="element.name" :id="element.id" v-bind="element.props" :styles="element.styles"></component>
        </div>
    </div> 
</template>

<script>
    import Text from '../layoutElements/text.vue';
    import Image from '../layoutElements/imageBlock.vue';
    import Rectangle from '../layoutElements/rectangle.vue';
    import Circle from '../layoutElements/circle.vue';
    
    export default{
        data(){
            return{
                
            }
        },
        components: {
            'text-block': Text,
            'image-block': Image,
            'rectangle-block': Rectangle,
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
        }
    }
</script>

<style scoped>
    .canvas_wrapper{
        height: 90%;
        width: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #f9f9f9;
        box-sizing: border-box;
        border: 1px solid #dadada;
    }
    .canvas{
        overflow: hidden;
        transform-origin: 0 0;
        position: relative;
        background: white;
        box-sizing: border-box;
        border: 1px solid #dadada;
    }

    .portrait{
        height: 960px;
        width: 540px;
    }

    .landscape{
        width: 960px;
        height: 540px;
    }
</style>
