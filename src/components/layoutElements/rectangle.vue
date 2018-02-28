<template>
    <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :w="100" :h="100" @update:active="addPanel">
        <div class="rectangle"></div>
        <panel-block v-if="showPanel"></panel-block>
    </draggable>
</template>

<script>
    import Panel from './panel.vue';

    export default{
        data(){
            return{
                showPanel: true
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
                this.$store.commit('chnageCurrentActiveElement', this.id);
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
