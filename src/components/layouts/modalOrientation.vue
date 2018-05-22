<template>
    <div class="modalFilter" >
        <el-card class="box-card" :bodyStyle="bodyStyle">
            <div class="header">
                <div><md-icon class="gray_color md-size-2x">add_box</md-icon> <span class="gray_color header_text">Create new template</span></div>
            </div>
            <div class="body">
                <p class="gray_color body_text">Choose the orientation type of your template</p>
                <div class="orientations">
                    <div class="orientation">
                        <el-radio class="orientationButton" label="portrait" v-model="radio" border>
                            <div class="innerRadio">
                                <md-icon class="md-size-4x getSpace">crop_portrait</md-icon>
                                <p>Portrait</p>
                            </div>
                        </el-radio>
                    </div>
                    <div class="orientation">
                        <el-radio class="orientationButton" label="landscape" v-model="radio" border>
                            <div class="innerRadio">
                                <md-icon class="md-size-4x getSpace">crop_landscape</md-icon>
                                <p>Landscape</p>
                            </div>
                        </el-radio>
                    </div>
                </div>
                <p class="gray_color body_text">Choose the type of your template</p>
                <div class="options_template">
                    <el-radio v-model="template" label="pre-made" border>Pre-made template</el-radio>
                    <el-radio v-model="template" label="blank" border>Blank template</el-radio>
                </div>
            </div>
            <div class="buttons">
                <el-button v-if="showButtonForClose" type="primary" plain @click="closeModal">Cancel</el-button>
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
                    'padding': '0px'
                },
                radio: "landscape",
                template: "blank"
            }
        },
        methods: {
            chooseOrientation(){
                this.$store.commit('changeOrientation', this.radio, {module: "main"});
                this.$store.commit('selectTemplate', [] , {module: "main"});
                this.$store.commit('createWidget', {module: "main"});
                if(this.template === "blank"){
                    this.$router.push({ path: '/' })
                }else if(this.template === "pre-made"){
                    this.$router.push({ path: 'templates' })
                }
            },
            closeModal(){
                this.$store.commit('changeOrientation', this.$store.state.main.tempOrientation, {module: "main"});
            }
        },
        props: {

        },
        computed: {
            orientation(){
                return this.$store.getters.getOrientation;
            },
            showButtonForClose(){
                return this.$store.state.main.orientationWasSelected;
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
        background: #ececec;
        border-bottom: 2px solid #d2d2d2;
        height: 13%;
    }

    .el-button{
        border-radius: 0px;
    }

    .header_text{
        margin-left: 10px;
        font-size: 22px;
    }

    .body{
        width: 60%;
        height: 67%;
        margin: auto;
    }

    .body_text{
        margin-top: 30px;
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
        width: 30%;
        height: 60%;
        border-radius: 0px;
    }

    .getSpace{
        margin-bottom: 10px;
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
        padding: 12px 20px 10px 20px;
    }

    p{
        margin: 0px;
        height: 15%;
    }

    .orientations{
        height: 40%;
        display: flex;
        justify-content: center;
    }

    .orientation{
        width: 50%;
        height: 100%;
        text-align: center;
        margin-right: 15px;
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

    @media screen and (max-height: 900px) {
        .box-card {
            width: 40%;
            height: 70%;
        }
    }
</style>
