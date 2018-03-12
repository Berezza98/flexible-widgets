<template>
  <div class="thirdColumn">
        <choose-orientation v-if="!orientation"></choose-orientation>
        <canvas-block v-if="orientation" :typeOfCanvas="orientation"></canvas-block>
        <scale v-if="orientation"></scale>
        <modal v-if="showModal" @closeModal="close"></modal>
        <el-button v-if="canSave" class="saveButton" @click="save" type="warning" plain>Save</el-button>
  </div>
</template>

<script>
    import Scale from '../scale.vue';
    import Canvas from '../layouts/canvas.vue';
    import ChooseOrientation from '../layouts/chooseOrientation.vue';
    import Modal from '../modal.vue';

    export default{
        data(){
            return{
                showModal: false
            }
        },
        computed: {
            orientation(){
                return this.$store.getters.getOrientation;
            },
            canSave(){
                return this.$store.state.main.readyForCreateWidget;
            }
        },
        components: {
            'canvas-block': Canvas,
            'choose-orientation': ChooseOrientation,
            'scale': Scale,
            'modal': Modal
        },
        methods: {
            save(){
                this.showModal = true;
            },
            close(){
                this.showModal = false;
            }
        }
    }
</script>

<style scoped>
    .thirdColumn{
        height: 100%;
        background: rgb(137, 141, 143);
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
    }

    .saveButton{
        position: absolute;
        right: 20px;
        top: 5px;
        font-size: 30px;
    }
</style>

