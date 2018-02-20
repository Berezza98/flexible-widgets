<template>
  <div class="secondColumnButton">
      <h2 class="buttonName">{{tile}}</h2>
  </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        props: {
            tile: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .secondColumnButton{
        width: 95%;
        height: 100px;
        flex-basis: 100px;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px dotted black;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: auto;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.3);
        transition: all 0.5s;
    }

    .secondColumnButton:hover{
        background: rgba(0, 0, 0, 0.5);
    }

    .buttonName{
        font-size: 30px;
    }
</style>
