<template>
    <div class="shapeWrapper">
        <img class="shapeImage" :src="getImg(imageSource)">
        <h2 class="tile">{{tile}}</h2>
    </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        props: {
            imageSource: {
                type: String,
                required: true
            },
            tile: {
                type: String,
                required: true
            }
        },
        methods: {
            getImg(pic){
                return require('../../assets/shapes/'+pic)
            }
        }
    }
</script>

<style scoped>
    .shapeWrapper{
        border: 2px dotted black;
        background: rgba(0, 0, 0, 0.3);
        height: 200px;
        width: 95%;
        margin-bottom: 10px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: all 0.5s;
        cursor: pointer;
    }

    .shapeWrapper:hover{
        background: rgba(0, 0, 0, 0.5);
    }

    .shapeImage{
        height: 100px;
        width: 100px;
    }

    .tile{
        font-weight: bold;
        text-transform: uppercase;
    }
</style>
