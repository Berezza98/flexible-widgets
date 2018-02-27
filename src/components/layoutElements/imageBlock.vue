<template>
    <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :w="400" :h="200">
        <img class="image" draggable="false" :src="imageSource">
    </draggable>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        props: {
            imageSource: {
                type: String,
                required: true
            }
        },
        methods: {

        }
    }
</script>

<style scoped>
    .image{
        height: 100%;
        width: 100%;
    }

    .image.active{
        border: 2px dotted black;
    }
</style>
