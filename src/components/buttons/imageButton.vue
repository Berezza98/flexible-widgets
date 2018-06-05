<template>
  <div class="firstColumnButton">
    <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
        <el-tooltip class="item" effect="dark" :open-delay="500" :content="'Drag and drop to add an image'" placement="right">
            <div class="content">
                <md-icon class="md-size-1x">insert_photo</md-icon>
                <h2 class="title">Images</h2>
            </div>
        </el-tooltip>
    </draggable>
  </div>
</template>

<script>
    import ImageBlock from '../layoutElements/imageBlock.vue';

    export default{
        data(){
            return{
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
                let {height, width} = this.getCorrectDimensionsForImage(this.$el.querySelector('.innerImage'));
                this.$store.commit("addElementInsideCanvas", {
                    name: 'image-block',
                    id,
                    props: {
                        type: "image",
                        subtype: "image",
                        imageSource: this.getBase64Image(this.$el.querySelector('.innerImage')),
                        width,
                        height,
                        x,
                        y,
                        z : 1
                    },
                    styles: {
                        background: "transparent",
                        opacity: 1
                    }
                }, {module: "main"});
            },
            getBase64Image(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                var dataURL = canvas.toDataURL();
                return dataURL;
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
        props: {

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

    }

    .md-size-1x{
        margin: 0px;
        height: 30px;
        font-size: 30px!important;
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

    .title{
        text-decoration: none;
        margin-top: 5px;
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
            font-size: 0.5em;
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
