<template>
    <div class="cropWrapper">
        <img id="image" :src="imageSrc"/>
        <div class="buttons">
            <el-button @click="cropZone" type="primary"><md-icon>mode_edit</md-icon></el-button>
            <el-button @click="rotateLeft" type="primary"><md-icon>rotate_left</md-icon></el-button>
            <el-button @click="rotateRight" type="primary"><md-icon>rotate_right</md-icon></el-button>
            <el-button @click="cancel" type="danger"><md-icon>close</md-icon></el-button>
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
            },
            rotateRight(){
                this.cropper.rotate(90);
            },
            cancel(){
                this.$emit('closeCropping');
            }
        },
        mounted(){
            let image = document.querySelector('#image');
            let that = this;
            this.cropper = new Cropper(image);
        }
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
