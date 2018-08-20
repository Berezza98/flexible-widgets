<template>
    <draggable :z="z" :drop-zone="'.canvas'" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="hideTooltip" @update:active="makeActive">
        <el-tooltip :disabled="hideTooltip" class="item" effect="dark" :open-delay="500" :content=" $t('tooltips.openEditTool') " placement="top">
            <div class="textBlock" :style="styles">
                <p class="cursor" contenteditable="true" spellcheck="false" @mousemove.stop="selectText" @mousedown="selectTextDownClick" @input="changeContent" @blur="save">{{textClone}}</p>
            </div>
        </el-tooltip>
    </draggable>
</template>

<script>

    export default {
        data(){
            return{
                hideTooltip: false,
                textClone: "",
                changingText: ""
            }
        },
        components: {
            
        },
        methods: {
            makeActive(value){
                this.hideTooltip = value;
                this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});

                if (!value) {
                    window.getSelection().removeAllRanges();
                }
            },
            save(event){
                this.changeContent(event);
                this.$store.commit('changeInputText', this.changingText, {module: "main"});
            },
            selectText(){
                //just for stop propogation
            },
            selectTextDownClick(e){
                if(this.hideTooltip){
                    e.stopPropagation();
                }
            },
            changeContent(e){
                this.changingText = e.target.innerText;
            }
        },
        computed: {
            dimensionsObj(){
                return {
                    x: this.x,
                    y: this.y,
                    width: this.width,
                    height: this.height
                };
            }
        },
        props: {
            id: {
                type: Number,
                required: true
            },
            width: {
                type: Number,
                default: 200
            },
            height: {
                type: Number,
                default: 100
            },
            x: {
                type: Number,
                default: 0
            },
            y: {
                type: Number,
                default: 0
            },
            z: {
                type: Number,
                default: 1
            },
            styles: {
                type: Object,
                required: true
            },
            textValue: {
                type: String,
                required: true
            }
        },
        created(){
            this.textClone = this.textValue;
        }
    }
</script>

<style scoped>
    .textBlock{
        position: absolute;
        top: 0px;
        left: 0px;
        height: 100%;
        width: 100%;
        display: flex;
    }
    .textBlock p{
        user-select: none;
        outline: none;
        margin: 0px;
        padding: 0px;
        width: 100%;
        min-height: 40px;
    }
    .cursor{
        cursor: auto !important;
        white-space: pre-wrap;
    }
</style>
