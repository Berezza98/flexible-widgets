<template>
    <draggable :z="z" :drop-zone="'.canvas'" :handles="handleResize" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :subtype="subtype" :active="showPanel" @update:active="addPanel">
        <el-tooltip :disabled="showPanel" class="item" effect="dark" :open-delay="500" content="Click on item to open edit options." placement="top">
            <img :style="styles" v-if="!cropState" class="image" draggable="false" :src="imageSource">
        </el-tooltip>
        <crop v-if="cropState" :id="id" :imageSrc="imageSource" @closeCropping="closeCrop"></crop>
    </draggable>
</template>

<script>
    import Crop from '../crop.vue';
    
    export default{
        data(){
            return{
                showPanel: false,
                cropState: false,
                panelWidth: 0,
                handleResize: ['tm', 'mr', 'bm', 'ml']
            }
        },
        components: {
            'crop': Crop
        },
        props: {
            imageSource: {
                type: String,
                required: true
            },
            id: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                default: 300
            },
            height: {
                type: Number,
                default: 200
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
            imageSource: {
                type: String,
                required: true
            },
            subtype: {
                type: String,
                required: true
            }
        },
        methods: {
            addPanel(value){
                this.showPanel = value;
                this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});
            },
            closePanel(){
                this.showPanel= false; 
                this.cropState= false;
            },
            closeCrop(){
                this.showPanel= true;
                this.cropState= false;
            },
            crop(){
                this.showPanel= false;
                this.cropState= true;
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
    .image{
        height: 100%;
        width: 100%;
        user-select: none;
    }

    .image.active{
        border: 2px dotted black;
    }
</style>
