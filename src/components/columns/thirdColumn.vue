<template>
  <div class="thirdColumn">
        <choose-orientation v-if="!orientation"></choose-orientation>
        <canvas-block v-if="orientation" :typeOfCanvas="orientation"></canvas-block>
        <scale v-if="orientation"></scale>
  </div>
</template>

<script>
    import Scale from '../scale.vue';
    import Canvas from '../layouts/canvas.vue';
    import ChooseOrientation from '../layouts/chooseOrientation.vue';

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
            'choose-orientation': ChooseOrientation,
            'scale': Scale
        }
    }
</script>

<style scoped>
    .thirdColumn{
        width: 65%;
        height: 100%;
        background: rgb(137, 141, 143);
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: auto;
        position: relative;
    }
</style>

