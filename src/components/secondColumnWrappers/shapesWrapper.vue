<template>
    <div class="shapes">
      <shape-button v-for="(shape, index) in correctShapes" :key="index" :imageSource="shape.src" :tile="shape.name" :correctComponent="shape.component">

      </shape-button>
    </div>
</template>

<script>
    import ShapeButton from '../buttons/shapeButton.vue';

    export default{
        data(){
            return{
                shapes: [
                    {
                        name: "rectangle",
                        src: "rectangle.png",
                        component: "rectangle-block"
                    },
                    {
                        name: "square",
                        src: "square.png",
                        component: "rectangle-block"
                    },
                    {
                        name: "ellipse",
                        src: "ellipse.png",
                        component: "circle-block"
                    },
                    {
                        name: "circle",
                        src: "circle.png",
                        component: "circle-block"
                    }
                ]
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
                    if(shape.name.toLowerCase().indexOf(this.$store.state.searchingData.toLowerCase()) !== -1){
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
        height: calc(100% - 100px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;
        position: relative;
    }

    .searchWrap{
        height: 100%;
    }
</style>
