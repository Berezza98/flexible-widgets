<template>
    <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :w="100" :h="100">
        <div class="rectangle"></div>
    </draggable>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        }
    }
</script>

<style scoped>

    .rectangle{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border: 2px solid black;
        position: absolute;
    }
</style>
