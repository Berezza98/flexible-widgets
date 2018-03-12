<template>
    <div class="images">
        <image-block v-for="(image, index) in images" :imageSource="image.src" :name="image.name" :key="index"></image-block>
        <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
    </div>
</template>

<script>
    import Image from '../buttons/imageButton.vue';

    export default{
        data(){
            return{
                images: [],
                downloading: true
            }
        },
        components: {
            'image-block': Image
        },
        methods: {
            getImg(pic){
                return require('../../assets/'+pic)
            }
        },
        created(){
            this.$http.get('http://localhost:3300/getImages').then(({body}) => {
                this.images = body;
                this.downloading = false;
            });
        }
    }
</script>

<style scoped>
    .images{
        height: calc(100% - 70px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .loader{
        margin: auto;
        widows: 100px;
        height: 100px;
    }
</style>
