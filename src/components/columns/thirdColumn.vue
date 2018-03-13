<template>
  <div class="thirdColumn">
        <top-bar></top-bar>
        <canvas-block v-if="orientation" :typeOfCanvas="orientation"></canvas-block>
  </div>
</template>

<script>
    import Canvas from '../layouts/canvas.vue';
    import TopBar from '../layouts/topBar.vue';

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
            'top-bar': TopBar
        },
        methods: {

        }
    }
</script>

<style scoped>
    .thirdColumn{
        height: 100%;
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

