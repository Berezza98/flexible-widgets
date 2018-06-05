<template>
  <div class="thirdColumn">
        <canvas-bar></canvas-bar>
        <canvas-block v-if="orientation" :typeOfCanvas="orientation"></canvas-block>
  </div>
</template>

<script>
    import Canvas from '../layouts/canvas.vue';
    import CanvasBar from '../layouts/canvasBar.vue';

    export default{
        data(){
            return{
            }
        },
        computed: {
            orientation(){
                return this.$store.getters.getOrientation;
            }
        },
        components: {
            'canvas-block': Canvas,
            'canvas-bar': CanvasBar
        },
        methods: {

        }
    }
</script>

<style scoped>
    .thirdColumn{
        height: calc(100% - 70px);
        position: relative;
        padding: 0px 20px;
    }

    .saveButton{
        position: absolute;
        right: 20px;
        top: 5px;
        font-size: 30px;
    }
</style>

