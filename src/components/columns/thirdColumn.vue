<template>
  <div class="thirdColumn">
      <choose-orientation v-if="!orientation"></choose-orientation>
      <canvas-block v-if="orientation" :typeOfCanvas="orientation"></canvas-block>
  </div>
</template>

<script>
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
            'choose-orientation': ChooseOrientation
        }
    }
</script>

<style scoped>
    .thirdColumn{
        width: 65%;
        height: 100%;
        background: rgb(137, 141, 143);
        display: flex;
    }
</style>

