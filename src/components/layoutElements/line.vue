<template>
    <draggable :z="z" :drop-zone="'.canvas'" :minh="2" :minw="2" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="showPanel" @update:active="addPanel">
        <el-tooltip :disabled="showPanel" class="item" effect="dark" :open-delay="500" content="Click on item to open edit options." placement="top">
            <div :style="styles" class="line" :class="rotated ? 'rotated' : 'not_rotated'"></div>
        </el-tooltip>
        <panel-block @closePanel="showPanel= false" :blockDimensions="dimensionsObj" @rotate="rotate" v-if="showPanel"></panel-block>
    </draggable>
</template>

<script>
    import Panel from './panel.vue';

    export default{
        data(){
            return{
                showPanel: false,
                rotated: false
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
                default: 6
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
            rotate(){
                this.rotated = !this.rotated;
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
    .line{
        box-sizing: border-box;
        position: absolute;
    }

    .rotated{
        height: 100%;
        width: 20%;
    }

    .not_rotated{
        height: 20%;
        width: 100%;
    }
</style>
