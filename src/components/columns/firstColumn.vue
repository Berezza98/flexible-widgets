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
    import TemplateButton from '../buttons/templateButton.vue';
    export default{
        data(){
            return {
                
            }
        },
        components: {
            'font-button': FontButton,
            'image-button': ImageButton,
            'shape-button': ShapeButton,
            'template-button': TemplateButton
        }
    }
</script>

<style scoped>

    .firstColumn{
        height: calc(100% - 70px);
        padding: 0px 2px;
    }

    @media screen and (max-width: 1700px) {
        .firstColumn{
            padding: 0px 10px;
        }
    }
</style>
   