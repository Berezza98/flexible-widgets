<template>
    <draggable :z="z" :drop-zone="'.canvas'" :handles="handleResize" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :subtype="subtype" :active="hideTooltip" @update:active="makeActive">
        <el-tooltip :disabled="hideTooltip" class="item" effect="dark" :open-delay="500" :content=" $t('tooltips.openEditTool') " placement="top">
            <div :style="styles" class="circle"></div>
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
            subtype: {
                type: String,
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
            },
            handleResize(){
                return this.subtype === "circle" ? ['tm', 'mr', 'bm', 'ml'] : ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']; 
            } 
        }
    }
</script>

<style scoped>
    .circle{
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        position: absolute;
        border-radius: 100%;
    }
</style>
