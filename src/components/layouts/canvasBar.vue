<template>
    <div class="top_bar">
        <div class="left_side">
            <panel v-if="showElement === 'panel'" :id="currentElementID"></panel>
            <shapes v-if="showElement === 'shapes'"></shapes>
        </div>
        <el-button @click="undo" class="undo" type="primary" plain :disabled="canUndo"><md-icon>undo</md-icon> UNDO</el-button>
    </div>
</template>

<script>
    import Panel from './panel.vue';
    import Shapes from './shapes.vue';

    import { eventBus } from '../../main.js';

    export default {
        data(){
            return{
                showElement: "",
                currentElementID: ""
            }
        },
        components: {
            'panel': Panel,
            'shapes': Shapes
        },
        methods: {
            undo() {
                this.$store.commit("undo", {module: "main"});
                this.$store.commit("changeIdOfElements", {module: "main"});
            }
        },
        computed: {
            canUndo(){
                return this.$store.state.main.prevArr.length > 0 ? false : true;
            }
        },
        created(){
            eventBus.$on('showElement', ({value, id}) => {
                console.log(value);
                this.showElement = value;
                if(id){
                    this.currentElementID = id;
                }
            })
        }
    }
</script>

<style scoped>
    .top_bar{
        width: 100%;
        height: calc(100% - 85% - 70px);
        display: flex;
        align-items: center;
        justify-content: space-between
    }

    .undo{
        height: 40px;
        display: flex;
        align-items: center;
        padding: 0px 20px;
    }

    .change_orientation{
        margin-right: 100px;
    }

    .left_side{
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
    }

    @media screen and (max-height: 900px) {
        .top_bar{
            height: calc(100% - 82% - 70px);
        }
    }
</style>
