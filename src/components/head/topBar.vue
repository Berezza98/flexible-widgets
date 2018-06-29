<template>
    <div class="bar">
        <div class="nameBlock">
            <el-input v-model="name" :maxlength="15" class="name" placeholder="Fill in name of template here" size="large"></el-input>
        </div>
        <div class="buttons">
            <el-button @click="changeOrientation" class="change_orientation" type="primary" plain><md-icon class="rotate_ico">rotate_90_degrees_ccw</md-icon>CHANGE ORIENTATION</el-button>
            <el-button @click="saveWidget" type="primary" icon="el-icon-check">SAVE</el-button>
            <el-tooltip content="Delete template" :open-delay="500" placement="top">
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
                    this.$message.error('Please fill in the name field before saving.');
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
                let topBar = document.querySelector('.top_bar');
                canvas.classList.add('canvas_flex_start');
                topBar.classList.add('hide_bar');
                canvasWrapper.classList.add('hide');
                html2canvas(canvas, {logging: false}).then(canvas => {
                    this.$store.commit('changeIdOfElements', {module: "main"});
                    return {
                        image: canvas.toDataURL(),
                        name: this.name,
                        orientation: this.$store.state.main.currentOrientation,
                        data: this.$store.state.main.draggableInsideCanvas
                    }
                }).then((obj) => {
                    let currentTemplates = this.$store.state.main.allTemplates;
                    this.$store.commit('addNewTemplates', [obj, ...currentTemplates] ,{module: "main"});
                    return this.$http.post('https://flexible-app.herokuapp.com/setTemplate', obj);
                }).then(() => {
                    this.name = "";
                    this.$store.commit('selectTemplate', [] , {module: "main"});
                    this.$message({
                        message: 'The template has been saved.',
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
                this.$confirm('Are you sure you want to delete the created template?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
                }).then(() => {
                    this.name = "";
                    this.$store.commit('selectTemplate', [] , {module: "main"});
                    this.$message({
                        type: 'success',
                        message: 'Delete completed'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });          
                });
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

    @media screen and (max-width: 1800px) {
        .bar{
            height: 50px;
        }
    }
</style>
