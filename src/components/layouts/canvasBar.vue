<template>
    <div class="bottom_bar">
        <el-button @click="undo" class="undo" type="primary" plain :disabled="canUndo"><md-icon>undo</md-icon> UNDO</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods: {
            undo() {
                this.$store.commit("undo", {module: "main"});
                this.$store.commit("changeIdOfElements", {module: "main"});
            }
        },
        computed: {
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
