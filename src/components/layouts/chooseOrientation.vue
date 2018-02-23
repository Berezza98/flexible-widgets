<template>
    <div class="wrapper">
        <div class="orientations">
            <div class="orientation" @click="chooseOrientation('portrait')">
                <div class="layout portrait"></div>
                <h2 class="name">Portrait</h2>
            </div>
            <div class="orientation" @click="chooseOrientation('landscape')">
                <div class="layout landscape"></div>
                <h2 class="name">Landscape</h2>
            </div>
        </div>
        <h1 class="choose">Choose the orientation type of your template</h1>
    </div>
  
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        methods: {
            chooseOrientation(orientation){
                this.$store.commit('changeOrientation', orientation);
                this.$store.commit('createWidget');
            }
        }
    }
</script>

<style scoped>
    .wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .orientations{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50%;
    }

    .orientation{
        padding: 40px;
        background: lightgray;
        transition: background 0.5s; 
    }

    .orientation:hover{
        background: rgb(175, 175, 175);
    }

    .layout{
        border: 4px solid black;
        box-sizing: border-box;
    }

    .portrait{
        height: 480px;
        width: 270px;
    }

    .landscape{
        height: 270px;
        width: 480px;
    }

    .name{
        text-align: center;
    }

    .choose{
        text-transform: uppercase;
        color: white;
        text-align: center;
    }
</style>
