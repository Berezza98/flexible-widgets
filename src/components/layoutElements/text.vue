<template>
        <draggable :z="2" :drop-zone="'.canvas'" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="showPanel" @update:active="addPanel">
            <textarea :style="styles" class="textBlock" type="text" v-model="inputText" value="inputText"></textarea>
            <panel-block @closePanel="showPanel= false" v-if="showPanel"></panel-block>
        </draggable>
    
</template>

<script>
    import Panel from './panel.vue';

    export default {
        data(){
            return{
                showPanel: false
            }
        },
        components: {
            'panel-block': Panel
        },
        methods: {
            addPanel(value){
                this.showPanel = value;
                this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});
            }
        },
        computed: {
            inputText: {
                get(){
                    return this.textValue;
                },
                set(value){
                    this.$store.commit('changeInputText', value, {module: "main"});
                }
            }
        },
        props: {
            id: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                default: 200
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
            },
            textValue: {
                type: String,
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
</style>
