<template>
    <div class="bar">
        <div class="nameBlock">
            <el-input v-model="name" :disabled="editing || disableAllControls" :maxlength="15" size="medium" class="name" :placeholder=" $t('main.templateNamePlaceholder') "></el-input>
            <el-input v-model="duration" :disabled="editing || disableAllControls" :maxlength="6" size="medium" class="duration" :placeholder=" $t('tooltips.duration') "></el-input>
        </div>
        <div class="buttons">
            <el-tooltip class="item" effect="dark" :open-delay="500" :content=" $t('tooltips.preMadeTemplate') " placement="top">
                <el-button :disabled="disableAllControls" @click="showModal" size="small" class="change_orientation uppercase" type="text" plain><md-icon class="rotate_ico">view_compact</md-icon>{{ $t("buttons.choosePreMade") }}</el-button>
            </el-tooltip>
            <div class="line"></div>
            <el-button v-if="!editing" :disabled="disableAllControls" @click="changeOrientation" size="small" class="change_orientation uppercase" type="primary" plain><md-icon class="rotate_ico">rotate_90_degrees_ccw</md-icon>{{ $t("buttons.changeOrientation") }}</el-button>
            <el-button :disabled="disableAllControls" @click="saveWidget" class="uppercase" size="small" type="primary" icon="el-icon-check">{{ $t("buttons.save") }}</el-button>
            <el-tooltip :content=" $t('tooltips.delete') " :open-delay="500" placement="top">
                <el-button :disabled="disableAllControls" @click="deleteWidget" type="primary" size="small" icon="el-icon-delete" plain></el-button>
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
                
            }
        },
        methods: {
            saveWidget(){
                if(!this.name.trim()){
                    this.$message.error(this.$t('messages.nameError'));
                    return;
                }

                this.deleteEmptyImageElements();
                // NEXT TICK - do something after rerender UI
                this.$nextTick(() => {
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
                    let canvasWrapper = document.querySelector(".canvas_wrapper");
                    let HTML = canvasWrapper.cloneNode(true);
                    let topBar = document.querySelector('.top_bar');
                    canvas.classList.add('canvas_opacity');

                    document.querySelector('body').insertBefore(canvas, document.querySelector('#app'));

                    html2canvas(canvas, {logging: false, useCORS: true}).then(canvas => {
                        this.$store.commit('changeIdOfElements', {module: "main"});
                        // console.log(canvas.toDataURL());
                        return {
                            image: canvas.toDataURL(),
                            name: this.name,
                            orientation: this.$store.state.main.currentOrientation,
                            data: this.$store.state.main.draggableInsideCanvas,
                            html: this.clearHTML(HTML)
                        }
                    }).then((obj) => {
                        return this.$http.post(this.$store.state.main.hostURL + (this.editing ? `/setTemplate/${this.editingID}` : `/setTemplate`), obj);
                    }).then(({ body }) => {
                        console.log(body);
                        if (this.editing && this.adminPermissions) {
                            this.$store.commit('deleteTemplate', this.editingID ,{module: "main"});
                        }

                        if (this.adminPermissions) {
                            this.$store.commit('addNewTemplates', [body] ,{module: "main"});
                        }

                        this.name = "";
                        this.$store.commit('selectTemplate', [] , {module: "main"});
                        this.$message({
                            message: this.$t('messages.templateSaved'),
                            type: 'success'
                        });

                        let canvas = document.querySelector(".canvas");
                        let canvasWrapper = document.querySelector(".canvas_wrapper");

                        canvasWrapper.appendChild(canvas);
                        canvas.classList.remove('canvas_opacity');

                        loading.close();
                        if (!this.adminPermissions) {
                            this.$store.commit('disableControls', true, {module: "main"});
                            setTimeout(() => {
                                window.parent.postMessage({'closeTool': {} }, '*');
                            }, 2000);
                        }
                    });
                });
                

            },
            clearHTML(html){
                let badElements = html.querySelectorAll('.ruler_wrapper, .handle, .el-loading-mask, .info');
                badElements.forEach((element) => {
                    element.remove();
                });
                
                return html.innerHTML.replace(/<!---->/g, '');
            },
            deleteEmptyImageElements(){
                this.$store.commit('deleteEmptyImageElements', null, {module: "main"});
            },
            changeOrientation(){
                eventBus.$emit('showElement', {value: ""});
                this.$store.commit('changeTempOrientation', null, {module: "main"});
                this.$store.commit('changeOrientation', "", {module: "main"});
            },
            deleteWidget() {
                this.$confirm(this.$t('messages.deletingTemplate'), this.$t('messages.warning'), {
                confirmButtonText: this.$t('buttons.ok'),
                cancelButtonText: this.$t('buttons.cancel'),
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
            editing(){
                return this.$store.state.main.editingTemplate;
            },
            editingID(){
                return this.$store.state.main.editingID;
            },
            name :{
                get(){
                    return this.$store.state.main.templateName;
                },
                set(value){
                    this.$store.commit('changeTemplateName', value);
                }
            },
            duration :{
                get(){
                    return this.$store.state.main.templateDuration;
                },
                set(value){
                    this.$store.commit('changeTemplateDuration', value);
                }
            },
            disableAllControls(){
                return this.$store.state.main.disableAllControls;
            },
            adminPermissions(){
                return this.$store.state.main.permissions.create_premade_templates;
            }
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
        height: 6vh;
        user-select: none;
        border-bottom: 1px solid #e3e3e3;
        box-shadow: 60px 17px 42px -24px rgba(133,131,133,1);
        padding: 0px 20px 0px 6%;
    }

    .buttons{
        display: flex;
    }

    .line{
        width: 2px;
        height: 30px;
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
        flex-basis: 400px;
    }

    .uppercase{
        text-transform: uppercase;
    }

    .name{
        width: 245px;
        margin-right: 20px;
    }

    .duration{
        width: 85px;
    }

    @media screen and (max-width: 1800px) {
        .bar{

        }
    }

    @media screen and (max-width: 1200px) and (min-width: 1000px) {
        .nameBlock{
            flex-basis: 350px;
        }

        .name{
            width: 245px;
            margin-right: 20px;
        }

        .duration{
            width: 85px;
        }
    }
</style>
