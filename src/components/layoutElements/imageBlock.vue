<template>
    <draggable v-loading="loadingNewImage" :z="z" :drop-zone="'.canvas'" :resizable="!changingImage" :handles="handleResize" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :subtype="subtype" :active="showPanel" @update:active="addPanel">
        <el-tooltip :disabled="showPanel" class="item" effect="dark" :open-delay="500" content="Click on item to open edit options." placement="top">
            <img :style="styles" v-if="!cropState" class="image" draggable="false" :src="imageSource">
        </el-tooltip>
        <div class="setImage">
            <md-icon v-if="changingImage" @click.native.stop="changeImage" class="md-size-4x">add_circle</md-icon>
        </div>
        <crop v-if="cropState" :id="id" :imageSrc="imageSource" @closeCropping="closeCrop"></crop>
    </draggable>
</template>

<script>
    import { eventBus } from '../../main.js';

    import Crop from '../crop.vue';
    
    export default{
        data(){
            return{
                showPanel: false,
                cropState: false,
                handleResize: ['tm', 'mr', 'bm', 'ml'],
                changingImage: true,
                loadingNewImage: false
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
            },
            changeImage(){
                this.$store.commit('selectImage', {show: true, id: this.id}, {module: "main"});
            },
            setNewSource(image){
                let that = this;

                let img = new Image();
                img.crossOrigin = "Anonymous";
                img.onload = function(){
                    let base64 = that.getBase64Image(img);
                    that.$store.commit('changeDimentionsOfElement', {id: that.id, w: img.naturalWidth / 2, h: img.naturalHeight / 2}, {module: 'main'});
                    that.$store.commit('changeImageSource', base64, {module: 'main'});
                    that.loadingNewImage = false;
                };
                img.src = image.src;
            },
            getBase64Image(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                var dataURL = canvas.toDataURL();
                return dataURL;
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
        },
        created(){
            eventBus.$on('changeSource', ({image, id}) => {
                if(id === this.id){
                    this.loadingNewImage = true;
                    this.setNewSource(image);
                    this.changingImage = false;
                }
            });
        }
    }
</script>

<style scoped>
    .image{
        height: 100%;
        width: 100%;
        user-select: none;
    }

    .setImage{
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .setImage i{
        color: #676767;
        cursor: pointer;
    }

    .image.active{
        border: 2px dotted black;
    }
</style>
