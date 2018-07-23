<template>
    <div class="bar">
        <div class="nameBlock">
            <el-input v-model="name" :maxlength="15" class="name" :placeholder=" $t('main.templateNamePlaceholder') " size="large"></el-input>
        </div>
        <div class="buttons">
            <el-tooltip class="item" effect="dark" :open-delay="500" :content=" $t('tooltips.preMadeTemplate') " placement="top">
                <el-button @click="showModal" class="change_orientation uppercase" type="text" plain><md-icon class="rotate_ico">view_compact</md-icon>{{ $t("buttons.choosePreMade") }}</el-button>
            </el-tooltip>
            <div class="line"></div>
            <el-button @click="changeOrientation" class="change_orientation uppercase" type="primary" plain><md-icon class="rotate_ico">rotate_90_degrees_ccw</md-icon>{{ $t("buttons.changeOrientation") }}</el-button>
            <el-button @click="saveWidget" class="uppercase" type="primary" icon="el-icon-check">{{ $t("buttons.save") }}</el-button>
            <el-tooltip :content=" $t('tooltips.delete') " :open-delay="500" placement="top">
                <el-button @click="deleteWidget" type="primary" icon="el-icon-delete" plain></el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
    import { eventBus } from '../../main.js';

    import html2canvas from 'html2canvas';

    export default{
        data(){
            return{
                name: ""
            }
        },
        methods: {
            saveWidget(){
                if(!this.name.trim()){
                    this.$message.error(this.$t('messages.nameError'));
                    return;
                }
                if(this.$store.state.main.draggableInsideCanvas.length < 1){
                    this.$message.error(this.$t('messages.emptyCanvas'));
                    return;
                }
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                let canvas = document.querySelector(".canvas");
                let HTML = canvas.innerHTML;
                let canvasWrapper = document.querySelector(".canvas_wrapper");
                let topBar = document.querySelector('.top_bar');
                canvas.classList.add('canvas_flex_start');
                topBar.classList.add('hide_bar');
                canvasWrapper.classList.add('hide');

                html2canvas(canvas, {logging: false, useCORS: true}).then(canvas => {
                    this.$store.commit('changeIdOfElements', {module: "main"});
                    return {
                        image: canvas.toDataURL(),
                        name: this.name,
                        orientation: this.$store.state.main.currentOrientation,
                        data: this.$store.state.main.draggableInsideCanvas,
                        html: HTML
                    }
                }).then((obj) => {
                    let currentTemplates = this.$store.state.main.allTemplates;
                    this.$store.commit('addNewTemplates', [obj, ...currentTemplates] ,{module: "main"});
                    return this.$http.post(this.$store.state.main.hostURL + '/setTemplate', obj);
                }).then(() => {
                    this.name = "";
                    this.$store.commit('selectTemplate', [] , {module: "main"});
                    this.$message({
                        message: this.$t('messages.templateSaved'),
                        type: 'success'
                    });
                    canvas.classList.remove('canvas_flex_start');
                    canvasWrapper.classList.remove('hide');
                    topBar.classList.remove('hide_bar');
                    loading.close();
                });

            },
            changeOrientation(){
                eventBus.$emit('showElement', {value: ""});
                this.$store.commit('changeTempOrientation', null, {module: "main"});
                this.$store.commit('changeOrientation', "", {module: "main"});
            },
            deleteWidget() {
                this.$confirm(this.$t('messages.deletingTemplate'), 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    this.name = "";
                    this.$store.commit('selectTemplate', [] , {module: "main"});
                    this.$message({
                        type: 'success',
                        message: this.$t('messages.deleteDone')
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: this.$t('messages.deleteCanceled')
                    });          
                });
            },
            showModal(){
                eventBus.$emit('showElement', {value: ""});
                this.$store.commit('selectingTemplate', true , {module: "main"});
            },
            selectTemplate(){
                this.$store.commit('selectTemplate', this.templObj.data , {module: "main"});
            }
        },
        computed: {
            
        }
    }
</script>

<style scoped>
    .bar{
        display: flex;
        justify-content: space-between;
        align-self: flex-start;
        align-items: center;
        width: 100%;
        height: 70px;
        user-select: none;
        border-bottom: 1px solid #e3e3e3;
        box-shadow: 60px 17px 42px -24px rgba(133,131,133,1);
        padding: 0px 100px;
    }

    .buttons{
        display: flex;
    }

    .line{
        width: 2px;
        height: 40px;
        background: #ebebeb;
        margin: 0px 40px;
    }

    .rotate_ico{
        margin-right: 10px;
        height: 16px;
        width: 16px;
    }

    .nameBlock{
        display: flex;
        align-items: center;
        flex-basis: 330px;
    }

    .uppercase{
        text-transform: uppercase;
    }

    @media screen and (max-width: 1800px) {
        .bar{
            height: 50px;
        }
    }
</style>
