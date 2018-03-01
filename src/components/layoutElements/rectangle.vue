<template>
    <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" @update:active="addPanel">
        <div :style="styles" class="rectangle"></div>
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
            id: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                default: 100
            },
            height: {
                type: Number,
                default: 100
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
            }
        },
        methods: {
            addPanel(value){
                this.showPanel = value;
                this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});
            }
        },
        computed: {

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
