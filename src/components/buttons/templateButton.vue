<template>
    <div class="template" @click="selectTemplate">
        <img :src="templObj.image">
        <div class="overlay">
            <h2>{{templObj.name}}</h2>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        },
        props: {
            templObj: {
                type: Object,
                required: true
            }
        },
        methods: {
            selectTemplate(){
                this.$store.commit('selectTemplate', this.templObj.data , {module: "main"});
            }
        }
    }
</script>

<style scoped>
    .template{
        width: 95%;
        height: 300px;
        margin-bottom: 10px;
        background: bisque;
        position: relative;
        cursor: pointer;
    }

    .template:hover .overlay{
        opacity: 1;
    }

    img{
        height: 100%;
        width: 100%;
    }

    .overlay{
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        transition: all 0.5s;
        opacity: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .overlay h2{
        color: white;
        text-transform: uppercase;
        font-family: cursive;
    }
</style>
