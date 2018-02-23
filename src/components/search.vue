<template>
    <div class="search">
        <input v-model="search" type="text" class="searchBox">
        <img class="cancel" :src="require('../assets/cancel.png')" @click="clearSearch()">
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
                    return this.$store.state.searchingData;
                },
                set(value){
                    this.$store.commit('changeSearchingData', value);
                    console.log(this.$store.state.searchingData);
                }
            } 
        },
        methods: {
            clearSearch(){
                this.$store.commit('changeSearchingData', "");
                console.log(this.$store.state.searchingData);
            }
        }
    }
</script>

<style scoped>
    .search{
        height: 100px;
        width: 100%;
        background: rgb(104, 98, 90);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .searchBox{
        width: 95%;
        height: 40px;
        font-size: 30px
    }

    .cancel{
        position: absolute;
        height: 20px;
        width: 20px;
        right: 30px;
        cursor: pointer;
    }
</style>
