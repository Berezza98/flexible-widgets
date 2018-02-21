<template>
<div class="searchWrap">
    <Search></Search>
    <div class="shapes">
      <ShapeButton v-for="(shape, index) in correctShapes" :key="index" :imageSource="shape.src" :tile="shape.name"></ShapeButton>
    </div>
</div>
</template>

<script>
    import ShapeButton from '../buttons/ShapeButton.vue';
    import Search from '../Search.vue';

    export default{
        components: {
            ShapeButton,
            Search
        },
        data(){
            return{
                shapes: [
                    {
                        name: "rectangle",
                        src: "rectangle.png"
                    },
                    {
                        name: "square",
                        src: "square.png"
                    },
                    {
                        name: "ellipse",
                        src: "ellipse.png"
                    },
                    {
                        name: "circle",
                        src: "circle.png"
                    }
                ]
            }
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
        }
    }
</script>

<style scoped>
    .searchWrap{
        height: 100%;
    }
    .shapes{
        height: calc(100% - 100px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;
        overflow-y: scroll;
    }

    .searchWrap{
        height: 100%;
    }
</style>
