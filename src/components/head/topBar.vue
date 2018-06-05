<template>
    <div class="bar">
        <div class="nameBlock">
            <el-input v-model="name" class="name" placeholder="Fill in name of template here" size="large"></el-input>
        </div>
        <div class="buttons">
            <el-button @click="changeOrientation" class="change_orientation" type="primary" plain>CHANGE ORIENTATION</el-button>
            <el-button @click="saveWidget" type="primary" icon="el-icon-check">SAVE</el-button>
            <el-tooltip content="Delete template" :open-delay="500" placement="top">
                <el-button @click="deleteWidget" type="primary" icon="el-icon-delete" plain></el-button>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
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
            changeOrientation(){
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
        padding: 0px 100px;
    }

    .buttons{

    }

    .nameBlock{
        display: flex;
        align-items: center;
        flex-basis: 330px;
    }
</style>
