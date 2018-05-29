<template>
    <div class="bottom_bar">
        <el-button @click="changeOrientation" class="change_orientation" type="primary" plain>Change orientation</el-button>
        <el-button @click="undo" class="undo" type="primary" plain :disabled="canUndo"><md-icon>undo</md-icon> Undo</el-button>
        <el-button @click="saveWidget" type="primary" icon="el-icon-check">Save</el-button>
        <el-tooltip content="Delete template" :open-delay="500" placement="top">
            <el-button @click="deleteWidget" type="primary" icon="el-icon-delete" plain></el-button>
        </el-tooltip>
    </div>
</template>

<script>
    import html2canvas from 'html2canvas';

    export default {
        data(){
            return{

            }
        },
        methods: {
            undo() {
                this.$store.commit("undo", {module: "main"});
                this.$store.commit("changeIdOfElements", {module: "main"});
            },
            saveWidget(){
                if(!this.name.trim()){
                    this.$message.error('Please enter the name for widget.');
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
                canvas.classList.add('canvas_flex_start');
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
                    return this.$http.post('https://flexible-app.herokuapp.com/setTemplate', obj);
                }).then(() => {
                    this.name = "";
                    this.$store.commit('selectTemplate', [] , {module: "main"});
                    this.$message({
                        message: 'Widget has been saved.',
                        type: 'success'
                    });
                    canvas.classList.remove('canvas_flex_start');
                    canvasWrapper.classList.remove('hide');
                    loading.close();
                });

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
            },
            changeOrientation(){
                this.$store.commit('changeTempOrientation', null, {module: "main"});
                this.$store.commit('changeOrientation', "", {module: "main"});
            }
        },
        computed: {
            name: {
                get(){
                    return this.$store.state.main.templateName;
                },
                set(value){
                    this.$store.commit("changeTemplateName", value, {module: "main"});
                }
            },
            canUndo(){
                return this.$store.state.main.prevArr.length > 0 ? false : true;
            }
        }
    }
</script>

<style scoped>
    .bottom_bar{
        width: 100%;
        height: calc(100% - 85% - 70px);
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .undo{
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0px 20px;
    }

    .change_orientation{
        margin-right: 100px;
    }

    @media screen and (max-height: 900px) {
        .bottom_bar{
            height: calc(100% - 82% - 70px);
        }
    }
</style>
