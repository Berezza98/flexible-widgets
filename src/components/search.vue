<template>
    <div class="search">
        <el-input class="searchBox" placeholder="search" prefix-icon="el-icon-search" v-model="search" :clearable="true" size="large"></el-input>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        },
        computed: {
            search: {
                get(){
                    return this.$store.state.main.searchingData;
                },
                set(value){
                    this.$store.commit('changeSearchingData', value, {module: "main"});
                }
            } 
        },
        methods: {
            clearSearch(){
                this.$store.commit('changeSearchingData', "", {module: "main"});
            }
        }
    }
</script>

<style scoped>
    .search{
        height: 70px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        background: #f0f0f0;
        z-index: 2;
        user-select: none;
    }

    .searchBox{
        font-size: 1em;
    }
</style>
