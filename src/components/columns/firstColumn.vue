<template>
  <div class="firstColumn">
        <font-button></font-button>
        <image-button></image-button>
        <shape-button></shape-button>
  </div>
</template>

<script>
    import FontButton from '../buttons/fontButton.vue';
    import ImageButton from '../buttons/imageButton.vue';
    import ShapeButton from '../buttons/shapeButton.vue';
    export default{
        data(){
            return {
                
            }
        },
        components: {
            'font-button': FontButton,
            'image-button': ImageButton,
            'shape-button': ShapeButton
        }
    }
</script>

<style scoped>

    .firstColumn{
        height: 100%;
        width: 6%;
        padding: 10px 10px 0px 10px;
        box-sizing: border-box;
        border-right: 1px solid #e3e3e3;
    }

    @media screen and (max-width: 1700px) {
        .firstColumn{
            padding: 10px 10px 0px 10px;
        }
    }

    @media screen and (max-width: 1200px) and (min-width: 1000px) {
        .firstColumn{
            padding: 5px 5px 0px 5px;
        }
    }
</style>
   