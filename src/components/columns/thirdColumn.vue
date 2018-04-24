<template>
  <div class="thirdColumn">
        <top-bar></top-bar>
        <canvas-block v-if="orientation" :typeOfCanvas="orientation"></canvas-block>
        <bottom-bar></bottom-bar>
  </div>
</template>

<script>
    import Canvas from '../layouts/canvas.vue';
    import TopBar from '../layouts/topBar.vue';
    import BottomBar from '../layouts/bottomBar.vue';

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
            'top-bar': TopBar,
            'bottom-bar': BottomBar
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

