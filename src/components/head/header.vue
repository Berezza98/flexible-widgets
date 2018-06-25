<template>
    <div class="header">
        <div class="left_side">
            <div class="container">
                <p class="title">Create new template</p>
                <p class="description">Drag & drop items to the canvas to create your custom template</p>
            </div>
        </div>
        <div class="right_side">
            <div class="info">
                <md-icon @click.native="openInfo" class="info_ico">info</md-icon>
            </div>
        </div>
    </div>
</template>

<script>
    import messages from '../../data/messages.js';

    export default{
        data(){
            return{
                message: null
            }
        },
        methods: {
            openInfo(){
                if(!this.message){
                    this.message = this.$message({
                        showClose: false,
                        message: messages.mainPage,
                        type: 'message',
                        duration: 0,
                        customClass: 'information-message right-message'
                    });
                }else{
                    this.message.close();
                    this.message = null;
                }
            }
        }
    }
</script>

<style scoped>
    .header{
        height: 85px;
        box-sizing: border-box;
        border-bottom: 1px solid #d2d2d2;
        display: flex;
        justify-content: center;
        padding-left: 35px;
        position: relative;
        z-index: 2;
    }

    .title{
        color: #4d4d4d;
        font-size: 22px;
        margin: 0px;
        margin-bottom: 6px;
    }

    .description{
        font-size: 12px;
        margin: 0px;
        color: #f59032;
        display: inline-block;
        position: relative;
    }

    .right_margin{
        margin-right: 10px;
    }

    .left_side{
        width: 50%;
        display: flex;
        align-items: center;
    }

    .right_side{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .info_ico{
        margin-right: 50px;
        color: #808080;
        cursor: pointer;
    }

    @media screen and (max-width: 1800px) {
        .header{
            height: 65px;
        }
    }
</style>
