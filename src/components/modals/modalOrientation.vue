<template>
    <div class="modalFilter" >
        <el-card class="box-card" :bodyStyle="bodyStyle">
            <div class="header">
                <div><span class="gray_color header_text">{{ $t('main.createTemplate') }}</span></div>
            </div>
            <div class="body">
                <p class="gray_color body_text">{{ $t('main.chooseOrientation') }}</p>
                <div class="orientations">
                    <div class="orientation" @click="radio = 'portrait'" :class="radio === 'portrait' ? 'active' : ''">
                        <img v-if="radio === 'portrait'" class="check_ico" :src="getImg('check_circle.png')"/>
                        <div class="image">
                            <img class="portrait" :src="getImg('portrait.png')">
                        </div>
                        <div class="text">
                            <p>{{ $t('buttons.portrait') }}</p>
                        </div>
                    </div>
                    <div class="orientation" @click="radio = 'landscape'" :class="radio === 'landscape' ? 'active' : ''">
                        <img v-if="radio === 'landscape'" class="check_ico" :src="getImg('check_circle.png')"/>
                        <div class="image">
                            <img class="landscape" :src="getImg('landscape.png')">
                        </div>
                        <div class="text">
                            <p>{{ $t('buttons.landscape') }}</p>
                        </div>
                    </div>
                </div>
                <p class="gray_color body_text">{{ $t('main.chooseType') }}</p>
                <div class="options_template">
                    <el-button v-model="template" @click="template = 'pre-made'" class="select_button" size="small" :class="template === 'pre-made' ? 'active' : ''">{{ $t('buttons.preMadeTemplate') }}</el-button>
                    <el-button v-model="template" @click="template = 'blank'" class="select_button" size="small" :class="template === 'blank' ? 'active' : ''">{{ $t('buttons.scratchTemplate') }}</el-button>
                </div>
            </div>
            <div class="buttons">
                <el-button type="primary" class="uppercase" @click="chooseOrientation" size="small">{{ $t('buttons.confirm') }}</el-button>
                <el-button v-if="showButtonForClose" class="button_white uppercase" plain @click="closeModal" size="small">{{ $t('buttons.cancel') }}</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {eventBus} from '../../main.js';

    export default {
        data(){
            return {
                bodyStyle: {
                    'height': '100%',
                    'padding': '0px'
                },
                radio: this.$store.state.main.tempOrientation ? this.$store.state.main.tempOrientation : "landscape",
                template: "blank",
            }
        },
        methods: {
            chooseOrientation(){
                if (this.elementsInsideCanvas.length > 0) {
                    this.$confirm(this.$t('messages.changeOrientationWarning'), this.$t('messages.warning'), {
                    confirmButtonText: this.$t('buttons.ok'),
                    cancelButtonText: this.$t('buttons.cancel'),
                    type: 'warning'
                    }).then(() => {
                        this.changeOrientation();
                    })
                } else {
                    this.changeOrientation();
                }
            },
            changeOrientation(){
                this.$store.commit('changeOrientation', this.radio, {module: "main"});
                this.$store.commit('selectTemplate', [] , {module: "main"});
                this.$store.commit('deleteHistory', null , {module: "main"});
                this.$store.commit('createWidget', {module: "main"});

                this.$http.get(this.$store.state.main.hostURL + `/getTemplates?page=1&orientation=${this.orientation}&limit=16`).then(({body}) => {
                    this.$store.commit('changeTemplates', body, {module: "main"});
                });

                if(this.template === "blank"){
                    // IF BLANK
                }else if(this.template === "pre-made"){
                    // IF PRE-MADE
                    this.$store.commit('selectingTemplate', true , {module: "main"});
                }

                eventBus.$emit('closeStartInformationWindow');

                if(this.$store.state.main.showInstructions){
                    this.$message({
                        showClose: true,
                        message: this.$t('messages.mainPage'),
                        type: 'message',
                        duration: 60000,
                        customClass: 'information-message'
                    });
                }

                this.$store.commit('hideInstructions', {module: "main"});
            },
            closeModal(){
                this.$store.commit('changeOrientation', this.$store.state.main.tempOrientation, {module: "main"});
            },
            getImg(pic){
                return require('../../assets/'+pic)
            }
        },
        props: {

        },
        computed: {
            orientation(){
                return this.$store.state.main.currentOrientation;
            },
            showButtonForClose(){
                return this.$store.state.main.orientationWasSelected;
            },
            elementsInsideCanvas(){
                return this.$store.state.main.draggableInsideCanvas;
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

    .header{
        display: flex;
        align-items: center;
        padding-left: 20px;
        height: 13%;
        box-shadow: 0px 17px 42px -24px rgba(133,131,133,1);
    }

    .el-button{
        
    }

    .button_white{
        color: #409EFF;
    }

    .select_button{
        background: #fff1d9;
        color: #eda768;
    }

    .select_button:hover{
        color: #eda768;
    }

    .select_button.active{
        color: white;
        background: #eda768;
    }

    .header_text{
        margin-left: 10px;
        font-size: 22px;
    }

    .body{
        width: 70%;
        height: 67%;
        margin: auto;
    }

    .body_text{
        margin-top: 30px;
        margin-bottom: 30px;
    }

    .options_template{
        display: flex;
        justify-content: center;
    }

    .gray_color{
        color: #888888;
    }

    .el-radio__label{
        padding: 0 !important;
    }

    .box-card {
        width: 35%;
        height: 60%;
        border-radius: 5px;
    }

    .orientationButton.is-checked{
        border: 1px solid transparent;
        background: #eda768;
    }

    .orientationButton.is-checked p{
        color: white;
    }

    p{
        margin: 0px;
    }

    .orientations{
        height: 40%;
        display: flex;
        justify-content: center;
    }

    .orientation{
        position: relative;
        cursor: pointer;
        width: 50%;
        height: 100%;
        text-align: center;
        margin-right: 15px;
        border-radius: 5px;
        background: #fff1d9;
    }

    .check_ico{
        position: absolute;
        top: -10px;
        right: -10px;
        color: #5b91e9;
        height: 24px;
        width: 24px;
    }

    .orientation.active{
        background: #eda768;
    }

    .orientation.active .text{
        color: white;
    }

    .image{
        height: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image .portrait{
        height: 100%;
    }

    .image .landscape{
        height: 100%;
    }

    .text{
        color: #eda768;
        font-size: 1.2em;
        padding: 0px 20px;
        height: 20%;
        display: flex;
        align-items: center;
    }

    .text p{
        margin-bottom: 10px;
    }

    .innerRadio{
        margin-right: 10px;
    }

    .buttons{
        width: 80%;
        margin: auto;
        height: 15%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        border-top: 1px solid #e6e6e6;
    }

    .uppercase{
        text-transform: uppercase;
    }

    @media screen and (max-height: 900px) {
        .box-card {
            width: 40%;
            height: 70%;
            margin-top: 120px;
        }
    }

    @media screen and (max-width: 1200px) and (min-width: 1000px) {
        .box-card {
            width: 55%;
            height: 65%;
        }
    }
</style>
