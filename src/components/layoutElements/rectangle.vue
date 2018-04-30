<template>
    <draggable :z="z" :drop-zone="'.canvas'" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="showPanel" @update:active="addPanel">
        <el-tooltip class="item" effect="dark" :open-delay="500" content="Click on item to open edit options." placement="top">
            <div :style="styles" class="rectangle"><button @click="rotateRight">rotate</button></div>
        </el-tooltip>
        <panel-block @closePanel="showPanel= false" :blockDimensions="dimensionsObj" v-if="showPanel"></panel-block>
    </draggable>
</template>

<script>
    import Panel from './panel.vue';

    export default{
        data(){
            return{
                showPanel: false,
                rotate: 0
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
            z: {
                type: Number,
                default: 1
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
            },
            rotateRight(){
                this.rotate += 90;
                this.$store.commit('changeRotationOfElement', {id: this.id, rotate: `rotate(${this.rotate}deg)`}, {module: "main"});
            }
        },
        computed: {
            dimensionsObj(){
                return {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
            }
        }
    }
</script>

<style scoped>

    .rectangle{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        transform-origin: center;
    }
</style>
