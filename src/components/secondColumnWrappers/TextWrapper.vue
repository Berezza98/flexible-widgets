<template>
  <div class="textWrapper">
      <secondColumnButton v-for="font in fonts" :tile="font.name" :key="font.id"></secondColumnButton>
      <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
  </div>
</template>

<script>
import SecondColumnButton from '../buttons/SecondColumnButton.vue';

export default{
    data(){
            return{
                fonts: [],
                downloading: true
            }
        },
        components: {
            'secondColumnButton': SecondColumnButton
        },
        methods: {
            getImg(pic){
                return require('../../assets/'+pic)
            }
        },
        created(){
            this.$http.get('http://localhost:3300/getFonts').then(({body}) => {
                this.fonts = body;
                this.downloading = false;
            });
        }
}
</script>

<style scoped>
    .textWrapper{
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
