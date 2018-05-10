<template>
    <div class="bar">
        <div class="nameBlock">
            <span class="name">Name: </span>
            <el-input v-model="name" class="name" placeholder="Fill in name of template here" size="large"></el-input>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        },
        computed: {
            name: {
                get(){
                    return this.$store.state.main.templateName;
                },
                set(value){
                    this.$store.commit("changeTemplateName", value, {module: "main"});
                }
            }
        }
    }
</script>

<style scoped>
    .bar{
        display: flex;
        justify-content: space-between;
        align-self: flex-start;
        align-items: center;
        width: 100%;
        height: 70px;
        user-select: none;
    }

    .nameBlock{
        display: flex;
        align-items: center;
        flex-basis: 330px;
    }

    .name{
        margin-right: 20px;
        font-size: 1em;
        color: #888888;
    }
</style>
