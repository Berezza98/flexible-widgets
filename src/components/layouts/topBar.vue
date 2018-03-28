<template>
    <div class="bar">
        <div class="nameBlock">
            <el-input v-model="name" class="name" placeholder="Name of the template" suffix-icon="el-icon-edit" size="large"></el-input>
        </div>
        <div class="saveBlock">
            <el-button @click="saveWidget" type="primary" icon="el-icon-check">Save</el-button>
            <el-button @click="deleteWidget" type="primary" icon="el-icon-delete" plain></el-button>
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
                console.log(document.querySelector(".canvas"));
                html2canvas(document.querySelector(".el-col-17"), {logging:false}).then(canvas => {
                    this.$store.commit('changeIdOfElements', {module: "main"});
                    return {
                        image: ''/*canvas.toDataURL()*/,
                        name: this.name,
                        data: this.$store.state.main.draggableInsideCanvas
                    }
                }).then((obj) => {
                    return this.$http.post('http://localhost:3300/setTemplate', obj);
                }).then(() => {
                    this.name = "";
                    this.$store.commit('selectTemplate', [] , {module: "main"});
                    this.$message({
                        message: 'Widget has been saved.',
                        type: 'success'
                    });
                });
            },
            deleteWidget() {
                this.$confirm('Are you sure to delete the widget?', 'Warning', {
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
    }

    .name{
        font-size: 1em;
    }
</style>
