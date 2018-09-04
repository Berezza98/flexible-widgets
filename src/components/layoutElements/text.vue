<template>
    <draggable :z="z" :drop-zone="'.canvas'" :parent="'.canvas'" :id="id" :w="width" :h="height" :x="x" :y="y" :active="hideTooltip" @update:active="makeActive">
        <el-tooltip :disabled="hideTooltip" class="item" effect="dark" :open-delay="500" :content=" $t('tooltips.openEditTool') " placement="top">
            <div class="textBlock" :style="styles">
                <div class="cursor" contenteditable="true" spellcheck="false" @mousemove.stop="selectText" @paste="paste" @mousedown="selectTextDownClick" v-html="textClone"></div>
            </div>
        </el-tooltip>
    </draggable>
</template>

<script>
    import { eventBus } from '../../main.js';

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
                if (!value) {
                    let text = this.$el.querySelector('[contenteditable]').innerHTML;

                    console.log("NOT active element with index: " + this.id);
                    window.getSelection().removeAllRanges();
                    this.$store.commit('changeInputText', text, {module: "main"});
                } else {
                    console.log("active element with index: " + this.id);
                    this.$store.commit('changeCurrentActiveElement', this.id, {module: "main"});
                }
            },
            selectText(){
                //just for stop propogation
            },
            selectTextDownClick(e){
                if(this.hideTooltip){
                    e.stopPropagation();
                }
            },
            paste(e){
                e.preventDefault();
                // IE 11
                if (navigator.userAgent.indexOf('Trident/') < 0) {
                    let text = e.clipboardData.getData("text/plain");
                    document.execCommand("insertHTML", false, text);
                } else {
                    let text = window.clipboardData.getData('Text');
                    document.execCommand('paste', false, text);
                }
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

            eventBus.$on("saveInnerText", ({ id }) => {
                if (this.id === id) {
                    let text = this.$el.querySelector('[contenteditable]').innerText;
                    this.$store.commit('changeInputText', text, {module: "main"});
                }
            });
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
        overflow: hidden;
    }
    .textBlock p{
        user-select: text;
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
