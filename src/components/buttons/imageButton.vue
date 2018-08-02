<template>
  <div :class="'firstColumnButton' + (disableAllControls ? ' disable' : '')">
    <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @activated="closeShapes" @dropInside="droppedInside" @tooltip="tooltip">
        <el-tooltip class="item" effect="dark" :disabled="disableTooltip" :open-delay="500" :content=" $t('tooltips.imageBlock') " placement="right">
            <div class="content">
                <md-icon class="md-size-1x">insert_photo</md-icon>
                <h2 class="title">{{ $t('buttons.images') }}</h2>
            </div>
        </el-tooltip>
    </draggable>
  </div>
</template>

<script>
    import { eventBus } from '../../main.js';

    import ImageBlock from '../layoutElements/imageBlock.vue';

    export default{
        data(){
            return{
                disableTooltip: false,
                styles: {
                    'height': '140px',
                    'padding': '0px'
                }
            }
        },
        components: {
            'image-block': ImageBlock
        },
        methods: {
            droppedInside(x, y){
                let id = new Date().getTime();
                let image = new Image();
                let that = this;

                image.onload = function(){
                    let height = 400;
                    let width = 800;
                    let positionObj = that.getCorrectPositionOfImage(x, y, height, width);

                    that.$store.commit("addElementInsideCanvas", {
                        name: 'image-block',
                        id,
                        props: {
                            type: "image",
                            subtype: "image",
                            imageSource: "",
                            width,
                            height,
                            x: positionObj.x,
                            y: positionObj.y,
                            z : 1
                        },
                        styles: {
                            background: "transparent",
                            opacity: 1
                        }
                    }, {module: "main"});
                }
                image.src = this.getImg('start_image.png');
            },
            // getBase64Image(img) {
            //     var canvas = document.createElement("canvas");
            //     canvas.width = img.naturalWidth;
            //     canvas.height = img.naturalHeight;
            //     var ctx = canvas.getContext("2d");
            //     ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
            //     var dataURL = canvas.toDataURL();
            //     return dataURL;
            // },
            // getCorrectDimensionsForImage(image){
            //     let naturalHeight = image.naturalHeight;
            //     let naturalWidth = image.naturalWidth;
            //     let {height, width} = this.$store.state.main.tempOrientation === 'portrait' ? {height: 960, width: 540} : {height: 540, width: 960};

            //     let scaleX = height / naturalHeight;
            //     let scaleY =  width / naturalWidth;

            //     let finalScale;

            //     if(scaleX < 1){
            //         finalScale = scaleX;
            //     }
            //     if(scaleY < 1 && scaleY < scaleX){
            //         finalScale = scaleY;
            //     }

            //     finalScale = finalScale / 2 ? finalScale : 1;

            //     return {
            //         height: naturalHeight * finalScale,
            //         width: naturalWidth * finalScale
            //     };
            // },
            tooltip(show){
                if(show === false){
                    setTimeout(() => {
                       this.disableTooltip = show; 
                    }, 1500);
                }else{
                    this.disableTooltip = show;
                }
            },
            getImg(pic){
                return require('../../assets/'+pic)
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
            closeShapes(){
                eventBus.$emit('showElement', {value: ""});
            }
        },
        computed: {
            disableAllControls(){
                return this.$store.state.main.disableAllControls;
            }
        }
    }
</script>

<style scoped>
    .firstColumnButton{
        cursor: -webkit-grab;
        cursor: grab;
        position: relative;
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        border-radius: 5px;
    }

    .firstColumnButton .draggable{
        border-radius: 5px;
        transition: background 0.5s;
    }

    .firstColumnButton .draggable:hover{
        border-radius: 5px;
        background: #cce7f8;
    }

    .firstColumnButton:hover i, .firstColumnButton:hover .title{
        color: #409EFF !important;
    }

    .md-size-1x{
        margin: 0px;
        height: 30px;
        font-size: 30px !important;
    }

    .firstColumnButton:first-child{
        margin-top: 20px;
    }

    .firstColumnButton:before{
        content: "";
        display: block;
        padding-top: 100%;
    }

    .content{
        position:  absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #c5c5c5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .disable{
        pointer-events: none;
    }

    .title{
        text-decoration: none;
        margin-top: 5px;
        transition: color .4s cubic-bezier(.4,0,.2,1);
        text-transform: capitalize;
    }

    .menuImage{
        height: 100px;
        width: 100px;
    }

    .firstColumnButton h2.title{
        font-size: 1em;
        text-align: center;
        line-height: 1em;
    }

    @media screen and (max-width: 1800px) {
        .firstColumnButton h2.title{
            font-size: 0.6em;
            text-align: center;
            line-height: 0.8em;
        }

        .md-size-1x{
            margin-top: 2px;
            height: 22px;
            font-size: 22px!important;
        }
    }
</style>
