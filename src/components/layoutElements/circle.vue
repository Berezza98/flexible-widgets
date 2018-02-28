<template>
    <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :w="100" :h="100" @update:active="addPanel">
        <div :style="styles" class="circle"></div>
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
            }
        },
        methods: {
            addPanel(value){
                this.showPanel = value;
                this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});
            }
        },
        computed: {
            backgroundColor(){
                return this.$store.state.activeElement.backgroundColor;
            },
            opacity(){
                return this.$store.state.activeElement.opacity;
            },
            styles(){
                return {
                    backgroundColor: this.backgroundColor,
                    opacity: this.opacity
                }
            }
        }
    }
</script>

<style scoped>
    .circle{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        border: 2px solid black;
        position: absolute;
        border-radius: 100%;
    }
</style>
