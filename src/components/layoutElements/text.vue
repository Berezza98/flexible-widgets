<template>
        <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :w="300" :h="100" @update:active="addPanel">
            <textarea class="textBlock" type="text" v-model="inputText" value="inputText"></textarea>
            <panel-block v-if="showPanel"></panel-block>
        </draggable>
    
</template>

<script>
    import Panel from './panel.vue';

    export default {
        data(){
            return{
                inputText: "Here will be your text",
                showPanel: true
            }
        },
        components: {
            'panel-block': Panel
        },
        methods: {
            addPanel(value){
                this.showPanel = value;
                this.$store.commit('chnageCurrentActiveElement', this.id);
            }
        },
        props: {
            id: {
                type: Number,
                required: true
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

    .panel{

    }
</style>
