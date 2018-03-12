<template>
    <div class="shapes">
      <shape-button v-for="shape in correctShapes" :key="shape.id" :imageSource="shape.src" :tile="shape.name" :correctComponent="shape.component">
      </shape-button>
    </div>
</template>

<script>
    import ShapeButton from '../buttons/shapeButton.vue';

    import shapes from '../../data/shapes.js';

    export default{
        data(){
            return{
                shapes: shapes
            }
        },
        components: {
            'shape-button': ShapeButton
        },
        methods: {

        },
        computed: {
            correctShapes(){
                return this.shapes.filter(shape => {
                    if(shape.name.toLowerCase().indexOf(this.$store.state.main.searchingData.toLowerCase()) !== -1){
                        return true;
                    }else{
                        return false;
                    }
                });
            }
        },
    }
</script>

<style scoped>
    .shapes{
        height: calc(100% - 70px);
        width: 100%;
        padding-top: 10px;
        box-sizing: border-box;
        position: relative;
    }

    .searchWrap{
        height: 100%;
    }
</style>
