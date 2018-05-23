<template>
    <div class="header">
        <p class="title"><md-icon class="md-size-2x right_margin">view_quilt</md-icon> New template <br/>
            <span class="description">Drag & drop items to create a new template</span>
        </p>
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
        flex-direction: column;
        justify-content: center;
        padding-left: 35px;
        position: relative;
        z-index: 2;
    }

    .title{
        color: #888888;
        font-size: 22px;
        height: 60px;
    }

    .description{
        font-size: 12px;
        color: #c5c5c5;
        display: inline-block;
        position: relative;
        top: -15px;
        left: 55px;
    }

    .right_margin{
        margin-right: 10px;
    }
</style>
