<template>
    <div class="modalFilter">
        <el-card :body-style="bodyStyles" class="box-card">
            <div class="header">
                <div class="top_row">
                    <p>{{ $t('main.choosePreMadeTile') }}</p>
                    <md-icon @click.native.stop="close" class="close">close</md-icon>
                    <search></search>
                </div>
            </div>
            <div class="body">
                <div v-lazy-loading class="templates">
                    <div v-if="templates && templates.length < 1" class="no_templates">
                        <h2>{{ $t('messages.noData') }}</h2>
                    </div>
                    <div v-for="template in templates" @click="chooseTemplate(template)" :class="template.orientation === 'portrait' ? 'portrait' : 'landscape'" class="image_wrapper"  :key="template.id">
                        <img :src="template.image + '?time=' + (new Date().getTime())">
                        <p class="name">{{template.name}}</p>
                        <el-tooltip v-if="adminPermissions" class="item" :open-delay="500" :content="$t('tooltips.deleteTemplate')" placement="top">
                            <md-icon @click.native.stop="deleteTemplate(template.id)" class="delete_template">close</md-icon>
                        </el-tooltip>
                        <el-tooltip v-if="adminPermissions" class="item" :open-delay="500" :content="$t('tooltips.editTemplate')" placement="top">
                            <md-icon @click.native.stop="editTemplate(template)" class="edit_template">edit</md-icon>
                        </el-tooltip>
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
            },
            currentPage: 2,
            canLoad: true
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
            this.$store.commit('selectTemplate', templ.data , {module: "main"});
            this.close();
        },
        changeScroller(){
            let scroller = document.querySelector('.templates');
            if(scroller){
                scroller.scrollTop = 0;
            }
        },
        deleteTemplate(id){
            this.$confirm(this.$t('messages.deleteTemplateQuestion'), this.$t('messages.templateDeleting'), {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.$http.delete(this.$store.state.main.hostURL + `/deleteTemplate?id=${id}`).then(() => {
                    this.$store.commit('deleteTemplate', id ,{ module : 'main' });
                    this.$message({
                        type: 'success',
                        message: this.$t('messages.deleteCompleted')
                    });
                });

            }).catch(() => {

                this.$message({
                    type: 'info',
                    message: this.$t('messages.deleteCanceled')
                });      

            });
        },
        editTemplate(templ){
            this.$store.commit('editTemplate', true , {module: "main"});
            this.$store.commit('changeEditingID', templ.id , {module: "main"});
            this.$store.commit('selectTemplate', templ.data , {module: "main"});
            this.$store.commit('changeOrientation', templ.orientation, {module: "main"});
            this.$store.commit('changeTemplateName', templ.name, {module: "main"});

            this.close();
        }
    },
    computed: {
        templates:{
            get(){
                return this.$store.state.main.allTemplates;
            },
            set(value){
                this.$store.commit('changeTemplates', value, {module: "main"});
            }
        },
        name(){
            return this.$store.state.main.searchingData.toLowerCase();
        },
        adminPermissions(){
            return this.$store.state.main.permissions.create_premade_templates;
        },
        orientation(){
            return this.$store.state.main.currentOrientation;
        }
    },
    directives: {
        lazyLoading: {
            inserted: function (el, binding, vnode) {
                let heightForLoad = 450;
                let that = vnode.context;
                let countOfTemplatesPerPage = 16;
                el.addEventListener('scroll', () => {
                    let currentTopScroll = el.scrollHeight - el.scrollTop - el.clientHeight;
                    if(that.canLoad && currentTopScroll < 20){
                        that.canLoad = false;
                        that.$http.get(that.$store.state.main.hostURL + `/getTemplates?page=${that.currentPage}&orientation=${that.orientation}&limit=${countOfTemplatesPerPage}&search=${that.name}`).then(({body}) => {
                            that.$store.commit('addNewTemplates', body , {module: "main"});
                            if(body.length === countOfTemplatesPerPage){
                                that.canLoad = true;
                                that.currentPage++;
                            }
                        }).catch(function(err){
                            console.log(err);
                        });
                    }
                }, true);
            }
        }
    },
    created(){
        this.$store.commit('changeSearchingData', '', {module: "main"});
    },
    watch: {
        name(newValue){
            this.changeScroller();
            this.canLoad = true;
            this.currentPage = 2;
            this.templates = [];
            this.$http.get(this.$store.state.main.hostURL + `/getTemplates?page=1&orientation=${this.orientation}&limit=16&search=${newValue}`).then(({body}) => {
                this.$store.commit('addNewTemplates', body , {module: "main"});
            }).catch(function(err){
                console.log(err);
            });
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
        bottom: 0px;
        margin: 0px;
        font-size: 22px;
        width: 100%;
        padding: 5px 0px 5px 8px;
        background: rgba(0,0,0,0.2)
    }

    .image_wrapper .delete_template{
        position: absolute;
        top: 0px;
        right: 0px;
        opacity: 0;
        transition: all 0.3s;
    }

    .image_wrapper .edit_template{
        position: absolute;
        top: 0px;
        right: 25px;
        opacity: 0;
        transition: all 0.3s;
        font-size: 20px !important;
    }

    .image_wrapper:hover .delete_template{
        opacity: 1;
    }

    .image_wrapper:hover .edit_template{
        opacity: 1;
    }

    .no_templates{
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .no_templates h2{
        color: #d7d7d7;
        font-size: 20px;
    }
</style>
