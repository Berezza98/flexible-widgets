<template>
    <div class="panel">
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
                this.$store.commit("deleteElementFromCanvas", this.getActiveEl);
            }
        },
        computed: {
            getActiveEl(){
                return this.$store.state.currentActiveElement;
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
    }

    .button{
        position: relative;
        height: 100%;
        width: 30%;
        background: salmon;
    }

    .button h2{
        margin: 0;
    }
</style>
