<template>
    <div class="imgs">
        <div v-lazy-loading class="images">
            <image-block v-for="(image, index) in correctImages" :imageSource="image.src" :name="image.name" :key="index"></image-block>
            <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
        </div>
        <div class="upload">
            <multiple-file-uploader postURL="https://flexible-app.herokuapp.com/saveImage" @OK="saveImage" successMessagePath="" errorMessagePath=""></multiple-file-uploader>
        </div>
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
                            that.$http.get(`https://flexible-app.herokuapp.com/getImages?page=${elements + 12}`).then(({body}) => {
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
            this.$http.get('https://flexible-app.herokuapp.com/getImages?page=12').then(({body}) => {
                this.images = body;
                this.downloading = false;
            });
        }
    }
</script>

<style scoped>
    .imgs{
        height: calc(100% - 70px);
        width: 100%;
        position: relative;
    }
    .images{
        height: calc(78%);
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        padding-top: 10px;
        box-sizing: border-box;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .upload{
        height: 22%;
        padding: 10px;
        border-top: 4px solid #c1c1c1;
        position: relative;
        z-index: 2;
        background: #f0f0f0;
    }

    .loader{
        margin: auto;
        widows: 100px;
        height: 100px;
    }
</style>
