<template>
  <div class="images">
      <imageBlock v-for="(source, index) in sources" :imageSource="source" :key="index"></imageBlock>
      <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
  </div>
</template>

<script>
    import Image from '../Image.vue';

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
            'imageBlock': Image
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
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;
    }

    .loader{
        margin: auto;
        widows: 100px;
        height: 100px;
    }
</style>
