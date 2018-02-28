<template>
    <div class="canvas_wrapper">
        <div :class="typeOfCanvas === 'portrait' ? 'canvas portrait' : 'canvas landscape'" :style="'transform: scale('+ currentScale +');'">
            <component v-for="(element, index) in draggableInsideCanvas" :key="index" :is="element.name" :id="element.id" v-bind="element.props"></component>
        </div>
    </div> 
</template>

<script>
    import Text from '../layoutElements/text.vue';
    import Image from '../layoutElements/imageBlock.vue';
    import Rectangle from '../layoutElements/rectangle.vue';
    import Circle from '../layoutElements/circle.vue';
    // <!-'transform: scale('+ currentScale +');'-> :style="'width: '+ 960*currentScale + 'px; ' + 'height: '+ 540*currentScale + 'px; '"
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
                return this.$store.state.currentScale;
            },
            draggableInsideCanvas(){
                return this.$store.state.draggableInsideCanvas;
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
        height: 100%;
        width: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .canvas{
        background: white;
        overflow: hidden;
        transform-origin: 0 0;
        position: relative;
        margin: 100px;
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
