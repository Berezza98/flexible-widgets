<template>
    <div class="search">
        <el-input class="searchBox" :placeholder="$t('main.search')" prefix-icon="el-icon-search" v-model="search" :clearable="true" size="large"></el-input>
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
        width: 200px;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        user-select: none;
        margin-left: 30px;
    }

    .searchBox{
        font-size: 1em;
    }
</style>
