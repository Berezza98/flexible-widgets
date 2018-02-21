<template>
    <div class="searchWrap">
        <Search></Search>
        <div class="images">
            <imageBlock v-for="(source, index) in sources" :imageSource="source" :key="index"></imageBlock>
            <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
        </div>
    </div>
</template>

<script>
    import Image from '../Image.vue';
    import Search from '../Search.vue';

    export default{
        data(){
            return{
                sources: [],
                downloading: true
            }
        },
        methods: {
            getImg(pic){
                return require('../../assets/'+pic)
            }
        },
        components: {
            'imageBlock': Image,
            Search
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

    .searchWrap{
        height: 100%;
    }

    .loader{
        margin: auto;
        widows: 100px;
        height: 100px;
    }
</style>
