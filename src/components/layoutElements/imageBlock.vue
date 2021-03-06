<template>
    <draggable v-loading="loadingNewImage" :z="z" :drop-zone="'.canvas'" :resizable="imageSource ? true : false" :handles="handleResize" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :subtype="subtype" :active="hideTooltip" @update:active="makeActive">
        <el-tooltip :disabled="hideTooltip" class="item" effect="dark" :open-delay="500" :content=" $t('tooltips.openEditTool') " placement="top">
            <img v-if="imageSource" :style="styles" class="image" draggable="false" :src="imageSource">
        </el-tooltip>
        <div class="setImage" v-if="!imageSource">
            <md-icon @click.native.stop="changeImage" class="md-size-4x">add_circle</md-icon>
        </div>
    </draggable>
</template>

<script>
    import { eventBus } from '../../main.js';
    
    export default{
        data(){
            return{
                hideTooltip: false,
                handleResize: ['tm', 'mr', 'bm', 'ml'],
                loadingNewImage: false
            }
        },
        components: {

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
                required: false
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
            },
            changeImage(){
                eventBus.$emit('showElement', {value: ""});
                this.$store.commit('selectImage', {show: true, id: this.id}, {module: "main"});
            },
            setNewSource(image){
                let that = this;
                this.$http.get(this.$store.state.main.hostURL + `/getImages?id=${image.id}`).then(({body}) => {

                    let img = new Image();
                    img.crossOrigin = "Anonymous";

                    img.onload = function(){
                        let { height, width } = that.getCorrectDimensionsForImage(img);
                        let positionObj = that.getCorrectPositionOfImage(that.x, that.y, height, width);

                        that.$store.commit('changePositionOfElement', {y: positionObj.y, x: positionObj.x, id: that.id}, {module: "main"});
                        that.$store.commit('changeDimentionsOfElement', {id: that.id, w: width, h: height}, {module: 'main'});
                        that.$store.commit('changeImageSource', img.src, {module: 'main'});
                        that.loadingNewImage = false;
                    };
                    img.onerror= function(e){
                        console.log(e);
                    }

                    img.src = body[0].src;
                });
                
            },
            getCorrectPositionOfImage(x, y, height, width){
                let canvasHeight, canvasWidth;
                let xResult, yResult;
                let currentOrientation = this.$store.state.main.currentOrientation;

                if(currentOrientation === 'portrait'){
                    canvasHeight = 1920;
                    canvasWidth = 1080;
                }else if(currentOrientation === 'landscape'){
                    canvasHeight = 1080;
                    canvasWidth = 1920;
                }

                if(x + width > canvasWidth){
                    xResult = canvasWidth - width;
                }else{
                    xResult = x;
                }

                if(y + height > canvasHeight){
                    yResult = canvasHeight - height;
                }else{
                    yResult = y;
                }

                return {
                    x: xResult,
                    y: yResult
                }
            },
            getCorrectDimensionsForImage(image){
                let naturalHeight = image.naturalHeight;
                let naturalWidth = image.naturalWidth;
                let {height, width} = this.$store.state.main.tempOrientation === 'portrait' ? {height: 960, width: 540} : {height: 540, width: 960};

                let scaleX = height / naturalHeight;
                let scaleY =  width / naturalWidth;

                let finalScale;

                if(scaleX < 1){
                    finalScale = scaleX;
                }
                if(scaleY < 1 && scaleY < scaleX){
                    finalScale = scaleY;
                }

                finalScale = finalScale / 2 ? finalScale : 1;

                return {
                    height: naturalHeight * finalScale,
                    width: naturalWidth * finalScale
                };
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
                }
            });
        }
    }
</script>

<style scoped>
    .image{
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
        user-select: none;
    }

    .setImage{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        background-image: url('../../assets/start_image.png');
        background-size: contain;
        background-repeat: no-repeat;
    }

    .setImage i{
        color: #676767;
        cursor: pointer;
    }

    .image.active{
        border: 2px dotted black;
    }
</style>
