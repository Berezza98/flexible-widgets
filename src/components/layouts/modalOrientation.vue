<template>
    <div class="modalFilter" >
        <el-card class="box-card" :bodyStyle="bodyStyle">
            <p>Choose the orientation type of your template</p>
            <div class="orientations">
                <div class="orientation">
                    <el-radio class="orientationButton" label="portrait" v-model="radio" border>
                        <div class="innerRadio">
                            <md-icon class="md-size-2x getSpace">crop_portrait</md-icon>
                            <p>Portrait</p>
                        </div>
                    </el-radio>
                </div>
                <div class="orientation">
                    <el-radio class="orientationButton" label="landscape" v-model="radio" border>
                        <div class="innerRadio">
                            <md-icon class="md-size-2x getSpace">crop_landscape</md-icon>
                            <p>Landscape</p>
                        </div>
                    </el-radio>
                </div>
            </div>
            <div class="buttons">
                <el-button type="primary" plain>Cancel</el-button>
                <el-button type="primary" @click="chooseOrientation">Confirm</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                bodyStyle: {
                    'height': '100%',
                    'padding': '70px'
                },
                radio: "landscape"
            }
        },
        methods: {
            chooseOrientation(){
                this.$store.commit('changeOrientation', this.radio, {module: "main"});
                this.$store.commit('createWidget', {module: "main"});
            }
        },
        props: {

        },
        computed: {
            orientation(){
                return this.$store.getters.getOrientation;
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

    .el-radio__label{
        padding: 0 !important;
    }

    .box-card {
        width: 40%;
        height: 50%;
    }

    .getSpace{
        margin-bottom: 40px;
    }

    .orientationButton span{
        padding: 0px;
    }

    .orientationButton{
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 12px 20px 0 20px;
    }

    p{
        margin: 0px;
        height: 15%;
    }

    .orientations{
        height: 65%;
        display: flex;
        justify-content: space-around;
    }

    .orientation{
        width: 30%;
        height: 90%;
        text-align: center;
    }

    .innerRadio{
        margin-right: 10px;
    }

    .buttons{
        height: 20%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
</style>
