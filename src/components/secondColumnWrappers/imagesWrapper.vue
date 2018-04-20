<template>
    <div v-lazy-loading class="images">
        <multiple-file-uploader postURL="https://flexible-app.herokuapp.com/saveImage" @OK="saveImage" successMessagePath="" errorMessagePath=""></multiple-file-uploader>
        <image-block v-for="(image, index) in correctImages" :imageSource="image.src" :name="image.name" :key="index"></image-block>
        <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
    </div>
</template>

<script>
    import Image from '../buttons/imageButton.vue';
    import MultipleFileUploader from '../MultipleFileUploader.vue'

    export default{
        data(){
            return{
                images: [],
                downloading: true
            }
        },
        components: {
            'image-block': Image,
            'multiple-file-uploader' :MultipleFileUploader
        },
        methods: {
            getImg(pic){
                return require('../../assets/'+pic)
            },
            saveImage(newImages){
                console.log('OK', newImages);
                this.images = newImages;
            }
        },
        directives: {
            lazyLoading: {
                inserted: function (el, binding, vnode) {
                    let canLoad = true;
                    let heightForLoad = 450;
                    let that = vnode.context;
                    el.addEventListener('scroll', () => {
                        let currentTopScroll = el.scrollHeight - el.scrollTop - el.clientHeight;
                        if(canLoad && currentTopScroll < 100){
                            canLoad = false;
                            let elements = that.images.length;
                            that.$http.get(`https://flexible-app.herokuapp.com/getImages?page=${elements + 6}`).then(({body}) => {
                                that.images = [...that.images, ...body];
                                canLoad = true;
                            });
                        }
                    }, true);
                }
            }
        },
        asyncComputed: {
            correctImages(){
                let name = this.$store.state.main.searchingData.toLowerCase();
                if(name.trim()){
                    let result = [];
                    return this.$http.get(`https://flexible-app.herokuapp.com/getImagesByName?name=${name}`).then(({body}) => body);
                }else{
                    return this.images;
                }
            }
        },
        created(){
            this.$http.get('https://flexible-app.herokuapp.com/getImages?page=6').then(({body}) => {
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
        position: relative;
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
