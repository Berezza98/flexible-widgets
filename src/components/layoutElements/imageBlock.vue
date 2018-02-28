<template>
    <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :w="400" :h="200" @update:active="addPanel">
        <img class="image" draggable="false" :src="imageSource">
        <panel-block v-if="showPanel"></panel-block>
    </draggable>
</template>

<script>
    import Panel from './panel.vue';
    
    export default{
        data(){
            return{
                showPanel: false
            }
        },
        components: {
            'panel-block': Panel
        },
        props: {
            imageSource: {
                type: String,
                required: true
            },
            id: {
                type: Number,
                required: true
            }
        },
        methods: {
            addPanel(value){
                this.showPanel = value;
                this.$store.commit('chnageCurrentActiveElement', this.id, {module: "main"});
            }
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
