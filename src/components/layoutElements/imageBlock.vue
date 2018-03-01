<template>
    <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="showPanel" @update:active="addPanel">
        <img :style="styles" class="image" draggable="false" :src="imageSource">
        <panel-block @closePanel="showPanel= false" v-if="showPanel"></panel-block>
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
            },
            width: {
                type: Number,
                default: 300
            },
            height: {
                type: Number,
                default: 200
            },
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            styles: {
                type: Object,
                required: true
            },
            imageSource: {
                type: String,
                required: true
            }
        },
        methods: {
            addPanel(value){
                this.showPanel = value;
                this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});
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
