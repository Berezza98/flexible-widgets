<template>
    <div class="panel">
        <div class="button">
            <input type="color" v-model="background"/>
        </div>
        <div class="button">
            <input v-model="opacity"/>
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
                this.$store.commit("deleteElementFromCanvas", {module: "main"});
            }
        },
        computed: {
            activeElement(){
                return this.$store.getters.getActiveElement;
            },
            background: {
                get(){
                    return this.activeElement.styles.background;
                }, 
                set(value){
                    this.$store.commit("changeBackground", value, {module: "main"});
                }
            },
            opacity: {
                get(){
                    return this.activeElement.styles.opacity
                }, 
                set(value){
                    this.$store.commit("changeOpacity", value, {module: "main"});
                }
            },
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
