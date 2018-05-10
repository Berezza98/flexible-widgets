<template>
    <div class="cropWrapper">
        <img id="image" :src="imageSrc"/>
        <div class="buttons">
            <el-tooltip content="Rotate left" :open-delay="500" placement="top">
                <el-button @click="rotateLeft" type="primary"><md-icon>rotate_left</md-icon></el-button>
            </el-tooltip>
            <el-tooltip content="Rotate right" :open-delay="500" placement="top">
                <el-button @click="rotateRight" type="primary"><md-icon>rotate_right</md-icon></el-button>
            </el-tooltip>
            <el-tooltip content="Discard changes" :open-delay="500" placement="top">
                <el-button @click="cancel" type="danger"><md-icon>close</md-icon></el-button>
            </el-tooltip>
            <el-tooltip content="Save changes" :open-delay="500" placement="top">
                <el-button @click="cropZone" type="primary"><md-icon>done</md-icon></el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import Cropper from 'cropperjs';

    export default{
        data(){
            return{
                currentImage: "",
                cropper: null
            }
        },
        props: {
            imageSrc: {
                type: String,
                required: true
            }
        },
        methods: {
            cropZone(){
                this.currentImage = this.cropper.getCroppedCanvas().toDataURL();
                this.$store.commit('changeImageSource', this.currentImage, {module: 'main'});
                this.$emit('closeCropping');
            },
            rotateLeft(){
                this.cropper.rotate(-90);
                setCorrectDimentions(this.cropper);
            },
            rotateRight(){
                this.cropper.rotate(90);
                setCorrectDimentions(this.cropper);
            },
            cancel(){
                this.$emit('closeCropping');
            }
        },
        mounted(){
            let image = document.querySelector('#image');
            let options = {
                autoCropArea : 1
            };
            this.cropper = new Cropper(image, options);
            console.log(this.cropper.getData());
        }
    }

    function setCorrectDimentions(cropper){
        cropper.scaleX(0.5);
        cropper.scaleY(0.5);

        let data = cropper.getImageData();
        console.log(data);
        let evenRotate = Math.abs(data.rotate / 90) % 2 === 1 ? false : true;
        let correctWidth =  evenRotate ? data.naturalWidth / 2 : data.naturalHeight / 2
        let correctHeight =  evenRotate ? data.naturalHeight / 2 : data.naturalWidth / 2

        cropper.setData({
            x: 0,
            y: 0,
            width: correctWidth,
            height: correctHeight
        });
        console.log(cropper.getData());    
    }
</script>

<style scoped>
    @import '~cropperjs/dist/cropper.min.css';

    .cropWrapper{
        position: relative;
        height: 100%;
        width: 100%;
    }

    img {
        max-width: 100%;
    }

    .buttons{
        position: absolute;
        bottom: 0px;
        display: flex;
        width: 200px;
    }

    .buttons button:first-child{
        margin-left: 10px
    }    

    .button h2{
        margin: 0;
    }

</style>
