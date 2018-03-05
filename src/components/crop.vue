<template>
    <div>
        <img id="image" :src="imageSrc"/>
        <div class="button" @click="cropZone">
            <h2>Crop</h2>
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

    img {
        max-width: 100%;
    }

    .button{
        position: absolute;
        top: 0px;
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 30px;
        cursor: pointer;
        border-radius: 20px;
        background: blanchedalmond;

    }

    .button h2{
        margin: 0;
    }

</style>
