<template>
    <div class="panel">
        <div class="button">
            <input v-model="backgroundColor" type="color" />
        </div>
        <div class="button">
            <input v-model="opacity" />
        </div>
        <div class="button" @click="deleteElement">
            <h2>Del</h2>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                
            }
        },
        methods: {
            deleteElement(id){
                this.$store.commit("deleteElementFromCanvas", this.getActiveEl, {module: "main"});
            }
        },
        computed: {
            getActiveEl(){
                return this.$store.state.main.currentActiveElement;
            },
            backgroundColor :{
                get(){
                    return this.$store.state.activeElement.backgroundColor;
                },
                set(value){
                    this.$store.commit("changeBackgroundColor", value, {module: "activeElement"})
                }
            },
            opacity :{
                get(){
                    return this.$store.state.activeElement.opacity;
                },
                set(value){
                    this.$store.commit("changeOpacity", value, {module: "activeElement"})
                }
            }
        }
    }
</script>

<style scoped>
    .panel{
        position: absolute;
        bottom: -60px;
        left: 0px;
        height: 50px;
        background: slategrey;
        width: 200px;
        display: flex;
    }

    .button{
        position: relative;
        height: 100%;
        width: 30%;
        background: salmon;
        box-sizing: border-box;
        border-right: 1px solid black;
    }

    input{
        height: 80%;
        width: 80%;
    }

    .button h2{
        margin: 0;
    }
</style>
