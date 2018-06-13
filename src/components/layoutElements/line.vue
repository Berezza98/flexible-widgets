<template>
    <draggable :z="z" :drop-zone="'.canvas'" :minh="2" :minw="2" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="hideTooltip" @update:active="makeActive">
        <el-tooltip :disabled="hideTooltip" class="item" effect="dark" :open-delay="500" content="Click on item to open edit options." placement="top">
            <div :style="styles" class="line" :class="rotated ? 'rotated' : 'not_rotated'"></div>
        </el-tooltip>
    </draggable>
</template>

<script>

    export default{
        data(){
            return{
                hideTooltip: false
            }
        },
        components: {

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
            },
            rotated: {
                type: Boolean,
                required: true
            }
        },
        methods: {
            makeActive(value){
                this.hideTooltip = value;
                this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});
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
