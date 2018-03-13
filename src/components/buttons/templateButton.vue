<template>
    <div class="template" @click="selectTemplate">
        <el-card class="inside_draggable">
            <img draggable="false" class="innerImage" :src="templObj.image">
            <div class="name_block">
                <h2 class="name">{{templObj.name}}</h2>
                <div class="arrows">
                    <i class="el-icon-d-arrow-right arrow"></i>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                
            }
        },
        props: {
            templObj: {
                type: Object,
                required: true
            }
        },
        methods: {
            selectTemplate(){
                this.$store.commit('selectTemplate', this.templObj.data , {module: "main"});
            }
        }
    }
</script>

<style scoped>
    .template{
        width: 95%;
        height: 250px;
        margin-bottom: 10px;
        background: bisque;
        position: relative;
        cursor: pointer;
    }

    .inside_draggable{
        height: 100%;
        width: 100%;
    }

    .innerImage{
        width: 100%;
        user-select: none;
        height: 70%;
    }

    .name_block{
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .arrow{
        color: #1989fa;
        font-size: 2em;
        font-weight: 900;
    }


</style>
