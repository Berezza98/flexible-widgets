<template>
    <div class="images">
        <image-block v-for="(source, index) in sources" :imageSource="source" :key="index"></image-block>
        <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
    </div>
</template>

<script>
    import Image from '../image.vue';

    export default{
        data(){
            return{
                sources: [],
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
                this.sources = body;
                this.downloading = false;
            });
        }
    }
</script>

<style scoped>
    .images{
        height: calc(100% - 100px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;
        overflow-y: scroll;
    }

    .hideOverflow{
        overflow-y: initial;
        overflow-x: initial;
    }

    .loader{
        margin: auto;
        widows: 100px;
        height: 100px;
    }
</style>
