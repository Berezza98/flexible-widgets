<template>
    <div class="header">
        <p class="title"><md-icon class="md-size-2x right_margin">view_quilt</md-icon> New template</p>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .header{
        height: 70px;
        box-sizing: border-box;
        border-bottom: 2px solid #d2d2d2;
        background: #ececec;
        display: flex;
        align-items: center;
        padding-left: 35px;
        position: relative;
        z-index: 2;
    }

    .title{
        color: #888888;
        font-size: 22px;
    }

    .right_margin{
        margin-right: 10px;
    }
</style>
