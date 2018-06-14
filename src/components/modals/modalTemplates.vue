<template>
    <div class="modalFilter">
        <el-card :body-style="bodyStyles" class="box-card">
            <div class="header">
                <div class="top_row">
                    <p>Choose a premade template</p>
                    <md-icon @click.native.stop="close" class="close">close</md-icon>
                    <search></search>
                </div>
            </div>
            <div class="body">
                <div class="templates">
                    <div v-for="(template, index) in correctTemplates" @click="chooseTemplate(template)" :class="template.orientation === 'portrait' ? 'portrait' : 'landscape'" class="image_wrapper"  :key="index">
                        <img :src="template.image">
                        <p class="name">{{template.name}}</p>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
import Search from '../search.vue';

import { eventBus } from '../../main.js';

export default {
    data(){
        return {
            bodyStyles: {
                height: "100%",
                width: "100%",
                padding: "0px",
                position: "relative"
            }
        }
    },
    components: {
        'search': Search
    },
    methods: {
        close(){
            this.$store.commit('selectingTemplate', false , {module: "main"});
        },
        chooseTemplate(templ){
            console.log(templ);
            this.$store.commit('selectTemplate', templ.data , {module: "main"});
            this.close();
        }
    },
    computed: {
        templates(){
            return this.$store.state.main.allTemplates;
        }
    },
    asyncComputed: {
        correctTemplates(){
            let name = this.$store.state.main.searchingData.toLowerCase();
            if(name.trim()){
                let result = [];
                return this.$http.get(`https://flexible-app.herokuapp.com/getTemplatesByName?name=${name}`).then(({body}) => body);
            }else{
                return this.templates;
            }
        }
    },
    created(){
        this.$store.commit('changeSearchingData', '', {module: "main"});
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
        height: 15%;
        padding: 0px 40px;
        box-shadow: 0px 17px 42px -24px rgba(133,131,133,1);
    }

    .header .top_row{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 20px;
    }

    .body .templates .image_wrapper{
        cursor: pointer;
        margin-right: 10px;
        margin-top: 10px;
        float: left;
        position: relative;
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
        height: 85%;
        padding: 20px 30px 0px 30px;
    }

    .body .templates{
        overflow-y: scroll;
        height: 100%;
    }

    .image_wrapper.portrait{
        height: 200px;
        width: calc(20% - 10px);
    }

    .image_wrapper.landscape{
        width: calc(25% - 10px);
    }

    .templates .image_wrapper img{
        height: 100%;
        width: 100%;
    }

    .name{
        position: absolute;
        color: white;
        bottom: 25px;
        margin: 0px;
        font-size: 22px;
        width: 100%;
        padding: 5px 0px 5px 8px;
        background: rgba(0,0,0,0.2)
    }
</style>
