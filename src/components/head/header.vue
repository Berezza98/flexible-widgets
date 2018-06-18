<template>
    <div class="header">
        <p class="title">Create new template</p>
        <p class="description">Drag & drop items to the canvas to create your custom template</p>
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
        height: 85px;
        box-sizing: border-box;
        border-bottom: 1px solid #d2d2d2;
        display: flex;
        flex-direction: column;
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

    @media screen and (max-width: 1800px) {
        .header{
            height: 65px;
        }
    }
</style>
