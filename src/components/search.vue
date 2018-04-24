<template>
    <div class="search">
        <el-input :class="$route.path === '/pictures' ? 'half_width' : ''" class="searchBox" placeholder="search" prefix-icon="el-icon-search" v-model="search" :clearable="true" size="large"></el-input>
        <el-select v-show="$route.path === '/pictures'" v-model="value" placeholder="Select">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                options: [{
          value: 'Option1',
          label: 'Option1'
        }, {
          value: 'Option2',
          label: 'Option2'
        }, {
          value: 'Option3',
          label: 'Option3'
        }, {
          value: 'Option4',
          label: 'Option4'
        }, {
          value: 'Option5',
          label: 'Option5'
        }],
        value: ''
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

    .half_width{
        margin-right: 30px;
    }

    .searchBox{
        font-size: 1em;
    }
</style>
