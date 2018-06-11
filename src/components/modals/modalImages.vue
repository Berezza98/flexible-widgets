<template>
    <div class="modalFilter">
        <el-card :body-style="bodyStyles" class="box-card">
            <div class="header">
                <div class="top_row">
                    <p>Add image</p>
                    <md-icon @click.native.stop="close" class="close">close</md-icon>
                </div>
                <div class="bottom_row">
                    <div class="left_side">
                        <div @click="selectedPage = 'upload' " class="changeContent" :class="selectedPage === 'upload' ? 'active' : ''">
                            <span class="text">Upload</span>
                        </div>
                        <div @click="selectedPage = 'library' " class="changeContent" :class="selectedPage === 'library' ? 'active' : ''">
                            <span class="text">Library</span>
                        </div>
                    </div>
                    <div class="right_side">
                        <div class="category_wrapper">
                            
                        </div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div v-lazy-loading v-if="selectedPage === 'library'" class="library">
                    <div v-for="(img, index) in images" @click="chooseImage(img)" class="image_wrapper"  :key="index">
                        <img :src="img.src">
                    </div>
                </div>
                <div v-if="selectedPage === 'upload'" class="upload">
                    <multiple-file-uploader v-loading="uploading" postURL="https://flexible-app.herokuapp.com/saveImage" @uploading=" uploading = true " @OK="saveImage" successMessagePath="" errorMessagePath=""></multiple-file-uploader>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { eventBus } from '../../main.js';

import MultipleFileUploader from '../MultipleFileUploader.vue';

export default {
    data(){
        return {
            bodyStyles: {
                height: "100%",
                width: "100%",
                padding: "0px",
                position: "relative"
            },
            selectedPage: "library",
            uploading: false
        }
    },
    components: {
        'multiple-file-uploader' :MultipleFileUploader
    },
    methods: {
        close(){
            this.$store.commit('selectImage', {show: false}, {module: "main"});
        },
        saveImage(newImages){
            this.images = newImages;
            this.uploading = false;
            this.selectedPage = "library";
        },
        chooseImage(image){
            eventBus.$emit('changeSource', {image, id: this.imageSelecting.id});
            this.$store.commit('selectImage', {show: false}, {module: "main"});
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
                    if(canLoad && currentTopScroll < 20){
                        canLoad = false;
                        let elements = that.images.length;
                        that.$http.get(`https://flexible-app.herokuapp.com/getImages?page=${elements + 16}`).then(({body}) => {
                            that.images = [...that.images, ...body];
                            canLoad = true;
                        });
                    }
                }, true);
            }
        }
    },
    computed: {
        images: {
            get(){
                return this.$store.state.main.allImages;
            },
            set(value){
                this.$store.commit('addNewImages', value, {module: "main"});
            }
            
        },
        imageSelecting(){
            return this.$store.state.main.imageSelecting;
        }
    }
}
</script>

<style scoped>
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
        height: 60vh;
    }

    .header{
        height: 20%;
        padding: 0px 40px;
        box-shadow: 0px 17px 42px -24px rgba(133,131,133,1);
    }

    .header .top_row{
        height: 50%;
        display: flex;
        align-items: center;
    }

    .header .bottom_row{
        height: 50%;
        display: flex;
        align-items: flex-end;
        justify-content: space-between
    }

    .left_side{
        display: flex;
    }

    .right_side{
        display: flex;
        height: 50px;
    }

    .right_side .category_wrapper{
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
        height: 80%;
        padding: 20px 30px 0px 30px;
    }

    .body .library{
        height: 100%;
        width: 100%;
        overflow-y: scroll;
    }

    .body .upload{
        height: 100%;
        width: 100%;
    }

    .body .library .image_wrapper{
        cursor: pointer;
        width: calc(25% - 10px);
        height: calc(35% - 10px);
        margin-right: 10px;
        margin-top: 10px;
        float: left;
    }

    .library .image_wrapper img{
        height: 100%;
        width: 100%;
    }

    .changeContent{
        cursor: pointer;
        height: 50px;
        width: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .changeContent.active{
        border-bottom: 2px solid #4a90e2;
    }

    .changeContent .text{
        color: #b5b5b5;
    }

    .changeContent.active .text{
        color: #4a90e2;
    }
</style>
