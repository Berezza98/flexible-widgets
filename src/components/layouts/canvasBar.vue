<template>
    <div class="top_bar">
        <div class="left_side">
            <panel v-if="showElement === 'panel'" :id="currentElementID"></panel>
            <shapes v-if="showElement === 'shapes'"></shapes>
        </div>
        <el-button @click="undo" class="undo" type="primary" size="small" plain :disabled="canUndo || disableAllControls"><md-icon class="undo_ico">undo</md-icon> {{ $t('buttons.undo') }}</el-button>
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
            },
            disableAllControls(){
                return this.$store.state.main.disableAllControls;
            }
        },
        created(){
            eventBus.$on('showElement', ({value, id}) => {
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
        height: 8%;
        display: flex;
        align-items: center;
        justify-content: space-between
    }

    .hide_bar{
        display: none;
    }

    .undo{
        display: flex;
        align-items: center;
        text-transform: uppercase;
    }
    
    .undo_ico{
        height: 16px;
        width: 16px;
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

        }
    }

    @media screen and (max-width: 1800px) {
        .left_side{
            width: 60%;
        }
    }
</style>
