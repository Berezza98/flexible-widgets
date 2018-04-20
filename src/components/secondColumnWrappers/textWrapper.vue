<template>
    <div class="textWrapper">
        <font-button v-for="(font, index) in currentFonts" :tile="font" :fontFamily="font" :key="index"></font-button>
        <img :src="getImg('loader.gif')" v-if="downloading" class="loader">
    </div>
</template>

<script>
import FontButton from '../buttons/fontButton.vue';


export default{
    data(){
            return{
                downloading: false,
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
            availableFonts(){
                return this.$store.state.main.availableFonts.length > 0 ? this.$store.state.main.availableFonts : [];
            },
            currentFonts(){
                return this.availableFonts.filter(item => {
                    if(item.toLowerCase().indexOf(this.$store.state.main.searchingData.toLowerCase()) !== -1){
                        return true;
                    }
                });
            }
        },
        created(){
            if(this.availableFonts.length === 0){
                this.downloading = true;
                this.$http.get('https://flexible-app.herokuapp.com/getFonts').then(({body}) => {
                    body.sort((a, b) => {
                    if(a.toLowerCase() > b.toLowerCase()){ 
                        return 1;
                    }else{
                        return -1;
                    }
                });
                this.$store.commit('changeAvailableFonts', body, {module: "main"});
                this.downloading = false;
                });
            }
            
        }
}
</script>

<style scoped>
    .textWrapper{
        height: calc(100% - 70px);
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
