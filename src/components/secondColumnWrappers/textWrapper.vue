<template>
    <div class="textWrapper">
        <font-button v-for="font in currentFonts" :tile="font.name" :key="font.id"></font-button>
        <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
    </div>
</template>

<script>
import FontButton from '../buttons/fontButton.vue';


export default{
    data(){
            return{
                fonts: [],
                downloading: true,
                searchText: ""
            }
        },
        components: {
            'font-button': FontButton
        },
        methods: {
            getImg(pic){
                return require('../../assets/'+pic)
            }
        },
        computed: {
            currentFonts(){
                return this.fonts.filter(item => {
                    if(item.name.toLowerCase().indexOf(this.$store.state.searchingData.toLowerCase()) !== -1){
                        return true;
                    }
                });
            }
        },
        created(){
            this.$http.get('http://localhost:3300/getFonts').then(({body}) => {
                body.sort((a, b) => {
                   if(a.name.toLowerCase() > b.name.toLowerCase()){ 
                    return 1;
                   }else{
                    return -1;
                   }
                });
                this.fonts = body;
                this.downloading = false;
            });
        }
}
</script>

<style scoped>
    .textWrapper{
        height: calc(100% - 100px);
        width: 100%;
        padding-top: 10px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .hideOverflow{
        overflow-x: initial;
        overflow-y: initial;
    }

    .loader{
        width: 100px;
        height: 100px;
        margin: auto;
    }
</style>
