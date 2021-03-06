<template>
    <div class="modalFilter">
        <el-card :body-style="bodyStyles" class="box-card">
            <div class="header">
                <div class="top_row">
                    <p>{{ $t('main.addImageTile') }}</p>
                    <md-icon @click.native.stop="close" class="close">close</md-icon>
                </div>
                <div class="bottom_row">
                    <div class="left_side">
                        <div @click="selectedPage = 'upload' " class="changeContent" :class="selectedPage === 'upload' ? 'active' : ''">
                            <span class="text">{{ $t('main.upload') }}</span>
                        </div>
                        <div @click="selectedPage = 'library' " class="changeContent" :class="selectedPage === 'library' ? 'active' : ''">
                            <span class="text">{{ $t('main.library') }}</span>
                        </div>
                    </div>
                    <div class="right_side">
                        <div class="category_wrapper">
                            <el-select v-model="value" @change="changeCategoryOfImages" class="custom_select" :placeholder="$t('main.category')">
                                    <el-option
                                    v-for="item in imageCategories"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id">
                                    </el-option>
                            </el-select>
                            <search></search>
                        </div>
                    </div>
                </div>
            </div>
            <div class="body">
                <div v-lazy-loading v-if="selectedPage === 'library'" class="library">
                    <div v-if="images && images.length < 1" class="no_images">
                        <h2>{{ $t('messages.noData') }}</h2>
                    </div>
                    <div v-for="img in images" @click="chooseImage(img)" class="image_wrapper"  :key="img.id">
                        <img :src="img.src + '?time=' + new Date().getTime()">
                        <p class="name">{{img.name.length > 11 ? img.name.slice(0, 11) + "..." : img.name}}</p>
                        <el-tooltip v-if="img.editable" class="item" :open-delay="500" :content="$t('tooltips.deleteImage')" placement="top">
                            <md-icon @click.native.stop="deleteImage(img.id)" class="delete_image">close</md-icon>
                        </el-tooltip>
                    </div>
                </div>
                <div v-if="selectedPage === 'upload'" class="upload">
                    <multiple-file-uploader v-loading="uploading" :postURL="$store.state.main.hostURL + '/saveImage'" @uploading=" uploading = true " @OK="saveImage" successMessagePath="" errorMessagePath=""></multiple-file-uploader>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import { eventBus } from '../../main.js';

import MultipleFileUploader from '../MultipleFileUploader.vue';
import Search from '../search.vue';

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
            uploading: false,
            value: 0,
            currentPage: 2,
            canLoad: true,
            request: null
        }
    },
    components: {
        'multiple-file-uploader' :MultipleFileUploader,
        'search': Search
    },
    methods: {
        close(){
            this.$store.commit('selectImage', {show: false}, {module: "main"});
        },
        saveImage(newImage){
            let obj = {
                name : newImage.name,
                src : newImage.url,
                id : newImage.id
            };
            this.$store.commit('uploadImage', obj, {module: "main"});
            this.uploading = false;

            this.chooseImage(obj);
        },
        chooseImage(image){
            eventBus.$emit('changeSource', {image, id: this.imageSelecting.id});
            this.$store.commit('selectImage', {show: false}, {module: "main"});
        },
        changeCategoryOfImages(id){
            this.currentPage = 2;
            this.canLoad = true;
            this.images = [];
            this.changeScroller();
            this.$http.get(this.$store.state.main.hostURL + `/getImages?category=${id}&page=1&limit=36&search=${this.name}`).then(({body}) => {
                this.$store.commit('addNewImages', body, {module: "main"});
            });
        },
        changeScroller(){
            let scroller = document.querySelector('.library');
            if(scroller){
                scroller.scrollTop = 0;
            }
        },
        deleteImage(id){
            this.$confirm(this.$t('messages.deleteImageQuestion'), this.$t('messages.imageDeleting'), {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$store.state.main.hostURL + `/deleteImage?id=${id}`).then(() => {
                    this.$store.commit('deleteImage', id ,{ module : 'main' });
                    this.$message({
                        type: 'success',
                        message: this.$t('messages.deleteCompleted')
                    });
                });

            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: this.$t('messages.deleteCanceled')
                });      

            });
        }
    },
    directives: {
        lazyLoading: {
            inserted: function (el, binding, vnode) {
                let heightForLoad = 450;
                let that = vnode.context;
                let countOfImagesPerPage = 36;
                el.addEventListener('scroll', () => {
                    let currentTopScroll = el.scrollHeight - el.scrollTop - el.clientHeight;
                    if(that.canLoad && currentTopScroll < 20){
                        that.canLoad = false;
                        that.$http.get(that.$store.state.main.hostURL + `/getImages?category=${that.value}&page=${that.currentPage}&limit=${countOfImagesPerPage}&search=${that.name}`).then(({body}) => {
                            that.$store.commit('addNewImages', body , {module: "main"});
                            if(body.length === countOfImagesPerPage){
                                that.canLoad = true;
                                that.currentPage++;
                            }
                        }).catch(function(err){
                            console.log(err);
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
                this.$store.commit('changeImages', value, {module: "main"});
            }
            
        },
        imageSelecting(){
            return this.$store.state.main.imageSelecting;
        },
        imageCategories(){
            return this.$store.state.main.imageCategories;
        },
        name(){
            return this.$store.state.main.searchingData.toLowerCase();
        }
    },
    created(){
        this.$store.commit('changeSearchingData', '', {module: "main"});
    },
    watch: {
        name(newValue){
            this.changeScroller();
            this.canLoad = true;
            this.currentPage = 2;
            this.images = [];
            this.$http.get(this.$store.state.main.hostURL + `/getImages?category=${this.value}&page=1&limit=36&search=${newValue}`, {
                before(request) {
                    if (this.request) {
                        this.request.abort();
                    }

                    this.request = request;
                }

            }).then(({body}) => {
                this.$store.commit('addNewImages', body , {module: "main"});
            }).catch(function(err){
                console.log(err);
            });
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
        width: calc(16.66% - 10px);
        height: calc(26% - 10px);
        margin-right: 10px;
        margin-top: 10px;
        float: left;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(128, 128, 128, 0.3);
    }

    .image_wrapper .delete_image{
        position: absolute;
        top: 0px;
        right: 0px;
        opacity: 0;
        transition: all 0.3s;
    }

    .image_wrapper:hover .delete_image{
        opacity: 1;
    }

    .library{
        overflow-x: hidden;
    }

    .library .image_wrapper img{
        max-height: 90px;
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

    .name{
        position: absolute;
        color: white;
        bottom: 0px;
        margin: 0px;
        font-size: 15px;
        height: 20px;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 5px 0px 5px 8px;
        background: rgba(0,0,0,0.2);
    }

    .no_images{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .no_images h2{
        color: #d7d7d7;
        font-size: 20px;
    }

    @media screen and (max-width: 1200px) and (min-width: 1000px) {
        .body .library .image_wrapper{
            width: calc(25% - 10px);
            height: calc(26% - 10px);
        }

        .right_side .category_wrapper{
            padding-left: 20px;
        }

        .search{
            margin-left: 10px !important;
        }
        
    }
</style>
