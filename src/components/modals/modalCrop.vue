<template>
    <div class="modalFilter">
        <el-card :body-style="bodyStyles" class="box-card">
            <div class="header">
                <div class="top_row">
                    <p>{{ $t('main.cropToolTile') }}</p>
                    <md-icon @click.native.stop="close" class="close">close</md-icon>
                </div>
            </div>
            <div class="body">
                <div class="img_wrapper">
                    <img id="image" :src="currentImage.props.imageSource">
                </div>
                <div class="crop_panel">
                    <div class="left">
                        <el-button @click="rotateRight" class="md_icon_button" type="primary"><md-icon>rotate_right</md-icon></el-button>
                        <el-button @click="rotateLeft" class="md_icon_button" type="primary"><md-icon>rotate_left</md-icon></el-button>
                        <el-button @click="crop" class="md_icon_button" type="primary"><md-icon>crop</md-icon></el-button>
                    </div>
                    <div class="right">
                        <el-button type="primary" class="uppercase" :disabled="!currentImageData && !currentImageSrc" @click="save">{{ $t('buttons.save') }}</el-button>
                        <el-button class="button_white uppercase" @click="close" plain>{{ $t('buttons.cancel') }}</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { eventBus } from '../../main.js';

import Cropper from 'cropperjs';

export default {
    data(){
        return {
            bodyStyles: {
                height: "100%",
                width: "100%",
                padding: "0px",
                position: "relative"
            },
            cropper: null,
            currentImageSrc: null,
            currentImageData: null
        }
    },
    components: {

    },
    props: {

    },
    computed: {
        cropTool(){
            return this.$store.state.main.cropToolUsing
        },
        currentImage(){
            return this.$store.getters.getElementByID(this.cropTool.id)
        }
    },
    methods: {
        close(){
            this.$store.commit('cropToolOpen', {show: false}, {module: "main"});
        },
        crop(){
            let image = this.cropper.getCroppedCanvas().toDataURL();
            let dataCropped = this.cropper.getData();
            this.currentImageSrc = image;
            this.currentImageData = dataCropped;
            this.cropper.replace(image);
        },
        save(){
            this.$http.post(this.$store.state.main.hostURL + '/b64ToImageFile', JSON.stringify({b64: this.currentImageSrc})).then(({body}) => {
                this.$store.commit('changeDimentionsOfElement', {id: this.cropTool.id, w: this.currentImageData.width / 2, h: this.currentImageData.height / 2}, {module: 'main'});
                this.$store.commit('changeImageSource', body.url, {module: 'main'});
                this.close();   
            });
        },
        rotateLeft(){
            this.cropper.rotate(-90);
            this.setCorrectDimentions(this.cropper);

            let image = this.cropper.getCroppedCanvas().toDataURL();
            let dataCropped = this.cropper.getData();
            this.currentImageSrc = image;
            this.currentImageData = dataCropped;
        },
        rotateRight(){
            this.cropper.rotate(90);
            
            this.setCorrectDimentions(this.cropper);

            let image = this.cropper.getCroppedCanvas().toDataURL();
            let dataCropped = this.cropper.getData();
            this.currentImageSrc = image;
            this.currentImageData = dataCropped;
        },
        setCorrectDimentions(cropper){
            let imageData = cropper.getImageData();
            let canvasData = cropper.getCanvasData();
            let containerData = cropper.getContainerData();
            console.log(imageData);

            this.cropper.zoomTo(0);

            if((Math.abs(imageData.rotate) / 90) % 2 === 1){
                // cropper.setCanvasData({
                //     left : containerData.width / 2
                // });
                cropper.setCropBoxData({
                    left : 0,
                    top : 0,
                    width : imageData.height,
                    height : imageData.width
                });
                console.log('OK');
            }else{
                console.log((containerData.height - imageData.height) / 2);
                cropper.setCropBoxData({
                    left : 0,
                    top : 0,
                    width : imageData.width,
                    height : imageData.height
                });
            }
        }
    },
    mounted(){
        let image = document.querySelector('#image');
        let options = {
            autoCropArea : 1,
            viewMode : 2,
            background : false
        };
        this.cropper = new Cropper(image, options);
    }
}
</script>

<style scoped>
    @import '~cropperjs/dist/cropper.min.css';

    .modalFilter{
        position: fixed;
        z-index: 3;
        top: 0px;
        left: 0px;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0,0,0,0.5);
    }

    .box-card{
        width: 50vw;
        height: 90vh;
    }

    .header{
        height: 10%;
        padding: 0px 40px;
        box-shadow: 0px 17px 42px -24px rgba(133,131,133,1);
    }

    .header .top_row{
        height: 100%;
        display: flex;
        align-items: center;
    }

    .header .top_row p{
        font-weight: bold;
        font-size: 25px;
        margin: 0px;
    }

    .header .top_row .close{
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 10px;
    }

    .body{
        height: 90%;
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .img_wrapper{
        width: 100%;
        height: 90%;

    }

    .left{

    }

    .right{

    }

    .crop_panel{
        height: 10%;
        width: 100%;
        padding: 10px 5px 0px 5px;
        display: flex;
        justify-content: space-between;
    }

    img {
        max-width: 100%;
    }

    .uppercase{
        text-transform: uppercase;
    }
</style>
