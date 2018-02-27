<template>
        <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :w="300" :h="100">
            <textarea class="textBlock" type="text" v-model="inputText" value="inputText"></textarea>
        </draggable>
    
</template>

<script>

    export default {
        data(){
            return{
                inputText: "Here will be your text"
            }
        }
    }
</script>

<style scoped>
    .textBlock{
        resize: none;
        border: none;
        font-size: 30px;
        position: absolute;
        background: transparent;
        height: 100%;
        width: 100%;
    }
</style>
