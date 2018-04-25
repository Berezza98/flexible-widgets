<template>
    <draggable :z="z" :drop-zone="'.canvas'" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="showPanel" @update:active="addPanel">
        <el-tooltip class="item" effect="dark" :open-delay="500" content="Click on item to open edit options." placement="top">
            <div class="textBlock" :style="styles">
                <p contenteditable="true" @blur="editContent">{{inputText}}</p>
            </div>
        </el-tooltip>
        <panel-block @closePanel="showPanel= false" :blockDimensions="dimensionsObj" v-if="showPanel"></panel-block>
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
            },
            editContent(event){
                let text = event.target.innerText;
                this.inputText = text;
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
            },
            dimensionsObj(){
                return {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
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
            z: {
                type: Number,
                default: 1
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
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
    }
    .textBlock p{
        user-select: none;
        outline: none;
        margin: 0px;
        padding: 0px;
        width: 100%;
    }
</style>
