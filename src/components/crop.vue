<template>
    <div class="cropWrapper">
        <img id="image" :src="imageSrc"/>
        <el-button @click="cropZone" class="button_crop" type="primary" icon="el-icon-edit"></el-button>
        <el-button @click="cancel" class="button_cancel" type="danger" icon="el-icon-close"></el-button>
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

    .button_crop{
        position: absolute;
        bottom: 0px;
        width: 60px;
        height: 40px;
    }

    .button_cancel{
        position: absolute;
        bottom: 0px;
        left: 61px;
        width: 60px;
        height: 40px;
        margin-left: 0px;
    }

    .button h2{
        margin: 0;
    }

</style>
