<template>
    <div :class="'panel ' + getCorrectPosition" @mousedown.stop="noDrag">
        <div v-if="elementType === 'text' || elementType === 'shape'" class="button">
            <md-icon @click.native.self="showSubPanel = 'background'" :class="showSubPanel == 'background' ? 'md-size-2x active' : 'md-size-2x'">format_color_fill</md-icon>
            <div v-if="showSubPanel == 'background'" class="subPanel colorInside">
                <el-color-picker @click.native.stop v-model="background" show-alpha></el-color-picker>
            </div>
        </div>
        <div v-if="elementType === 'text'" class="button">
            <md-icon @click.native.self="showSubPanel = 'color'" :class="showSubPanel == 'color' ? 'md-size-2x active' : 'md-size-2x'">format_color_text</md-icon>
            <div v-if="showSubPanel == 'color'" class="subPanel colorInside">
                <el-color-picker @click.native.stop v-model="color" show-alpha></el-color-picker>
            </div>
        </div>
        <div class="button">
            <md-icon @click.native.self="showSubPanel = 'opacity'" :class="showSubPanel == 'opacity' ? 'md-size-2x active' : 'md-size-2x'">opacity</md-icon>
            <div v-if="showSubPanel == 'opacity'" class="subPanel sliderInside">
                <div class="sliderWrapper">
                    <el-slider v-model="opacity" :min="0" :max="1" :step="0.1" show-input></el-slider>
                </div>
            </div>
        </div>
        <div v-if="elementType === 'text'" class="button">
            <md-icon @click.native.self="showSubPanel = 'fontSize'" :class="showSubPanel == 'fontSize' ? 'md-size-2x active' : 'md-size-2x'">format_size</md-icon>
            <div v-if="showSubPanel == 'fontSize'" class="subPanel sliderInside">
                <div class="sliderWrapper">
                    <el-slider v-model="fontSize" :min="1" :max="100" :step="1" show-input></el-slider>
                </div>
            </div>
        </div>
        <div v-if="elementType === 'text'" class="button" @click="underline">
            <md-icon  :class="underlineEl !== 'none' ? 'active' : ''">format_underlined</md-icon>
        </div>
        <div v-if="elementType === 'text'" class="button" @click="bold">
            <md-icon :class="boldEl !== 'normal' ? 'active' : ''">format_bold</md-icon>
        </div>
        <div v-if="elementType === 'text'" class="button" @click="italic">
            <md-icon :class="italicEl !== 'normal' ? 'active' : ''" class="md-size-2x">format_italic</md-icon>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <!-- <select v-model="selectFont">
                <option v-for="(font, index) in fonts" :key="index" :value="font">{{font}}</option>
            </select> -->
            <md-icon @click.native.self="showSubPanel = 'fontFamily'" :class="showSubPanel == 'fontFamily' ? 'md-size-2x active' : 'md-size-2x'">font_download</md-icon>
            <div v-if="showSubPanel == 'fontFamily'" class="subPanel radioInside">
                <el-select :popper-append-to-body="false" v-model="selectFont" placeholder="Select font">
                    <el-option v-for="(font, index) in fonts" :key="index" :label="font" :value="font"></el-option>
                </el-select>
            </div>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <md-icon @click.native.self="showSubPanel = 'align'" :class="showSubPanel == 'align' ? 'md-size-2x active' : 'md-size-2x'">format_align_right</md-icon>
            <div v-if="showSubPanel == 'align'" class="subPanel radioInside">
                <el-radio-group v-model="textAlign">
                    <el-radio-button label="Left"></el-radio-button>
                    <el-radio-button label="Center"></el-radio-button>
                    <el-radio-button label="Right"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <md-icon @click.native.self="showSubPanel = 'verAlign'" :class="showSubPanel == 'verAlign' ? 'md-size-2x active' : 'md-size-2x'">vertical_align_center</md-icon>
            <div v-if="showSubPanel == 'verAlign'" class="subPanel radioInside">
                <el-radio-group v-model="verticalAlign">
                    <el-radio-button label="Top"></el-radio-button>
                    <el-radio-button label="Center"></el-radio-button>
                    <el-radio-button label="Bottom"></el-radio-button>
                </el-radio-group>
            </div>
        </div>
        <div v-if="elementType === 'image' || elementType === ''" class="button" @click="cropImage">
            <md-icon class="md-size-2x">crop</md-icon>
        </div>
        <div class="button">
            <md-icon @click.native.self="showSubPanel = 'zIndex'" :class="showSubPanel == 'zIndex' ? 'md-size-2x active' : 'md-size-2x'">layers</md-icon>
            <div v-if="showSubPanel == 'zIndex'" class="subPanel sliderInside">
                <div class="sliderWrapper">
                    <el-slider v-model="zIndex" :min="1" :max="50" :step="1" show-input></el-slider>
                </div>
            </div>
        </div>
        <div class="button" @click="deleteElement">
            <md-icon class="md-size-2x">delete</md-icon>
        </div>
        <div class="button" @click="saveElement">
            <md-icon class="md-size-2x">check</md-icon>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                showSubPanel: "",
                elWidth: 0
            }
        },
        props: {
            blockDimensions: {
                type: Object,
                required: true
            }
        },
        mounted(){
            this.elWidth = this.$el.offsetWidth;
        },
        methods: {
            deleteElement(id){
                this.$store.commit("deleteElementFromCanvas", {module: "main"});
            },
            saveElement(){
                this.$emit('closePanel');
            },
            underline(){
                let currentState = this.underlineEl === 'none' ? false : true;
                this.underlineEl = !currentState;
            },
            bold(){
                let currentState = this.boldEl === 'normal' ? false : true;
                this.boldEl = !currentState;
            },
            italic(){
                let currentState = this.italicEl === 'normal' ? false : true;
                this.italicEl = !currentState;
            },
            cropImage(){
                this.$emit('cropImage');
            },
            noDrag(){
                return;
            }
        },
        computed: {
            getCorrectPosition(){
                let canvas = document.querySelector('.canvas');
                let canvasWidth = canvas.offsetWidth;
                let canvasHeight = canvas.offsetHeight;
                
                let elementWidth = this.elWidth > this.blockDimensions.width ? this.elWidth : this.blockDimensions.width;
                if(this.blockDimensions.y + this.blockDimensions.height + 110 > canvasHeight && this.blockDimensions.x + elementWidth < canvasWidth){
                    return 'top-left';
                }else if(this.blockDimensions.y + this.blockDimensions.height + 110 > canvasHeight && this.blockDimensions.x + elementWidth > canvasWidth){
                    return 'top-right';
                }else if(this.blockDimensions.y + this.blockDimensions.height + 110 < canvasHeight && this.blockDimensions.x + elementWidth > canvasWidth){
                    return 'standart-right'
                }else{
                    return 'standart';
                }
            },
            activeElement(){
                return this.$store.getters.getActiveElement;
            },
            elementType(){
                return this.activeElement.props.type;
            },
            fonts(){
                return this.$store.state.main.availableFonts;
            },
            background: {
                get(){
                    return this.activeElement.styles.background;
                }, 
                set(value){
                    this.$store.commit("changeBackground", value, {module: "main"});
                }
            },
            color: {
                get(){
                    return this.activeElement.styles.color;
                }, 
                set(value){
                    this.$store.commit("changeColor", value, {module: "main"});
                }
            },
            opacity: {
                get(){
                    return this.activeElement.styles.opacity
                }, 
                set(value){
                    this.$store.commit("changeOpacity", value, {module: "main"});
                }
            },
            selectFont: {
                get(){
                    return this.activeElement.styles['font-family'];
                }, 
                set(value){
                    this.$store.commit("changeFontFamily", value, {module: "main"});
                }
            },
            fontSize: {
                get(){
                    return parseInt(this.activeElement.styles['font-size']);
                }, 
                set(value){
                    this.$store.commit("changeFontSize", value + 'px', {module: "main"});
                }
            },
            underlineEl: {
                get(){
                    return this.activeElement.styles['text-decoration'];
                }, 
                set(value){
                    this.$store.commit("underline", value, {module: "main"});
                }
            },
            textAlign: {
                get(){
                    return this.activeElement.styles['text-align'];
                }, 
                set(value){
                    this.$store.commit("textAlign", value, {module: "main"});
                }
            },
            verticalAlign: {
                get(){
                    let verAlign = this.activeElement.styles['align-items'];
                    if(verAlign === 'flex-start'){
                        return 'Top';
                    }else if(verAlign === 'flex-end'){
                        return 'Bottom';
                    }else{
                        return 'Center';
                    }

                    return 
                }, 
                set(value){
                    if(value === 'Top'){
                        value = 'flex-start';
                    }else if(value === 'Bottom'){
                        value = 'flex-end';
                    }else{
                        value = 'center';
                    }
                    this.$store.commit("verticalAlign", value, {module: "main"});
                }
            },
            boldEl: {
                get(){
                    return this.activeElement.styles['font-weight'];
                }, 
                set(value){
                    this.$store.commit("textBold", value, {module: "main"});
                }
            },
            italicEl: {
                get(){
                    return this.activeElement.styles['font-style'];
                }, 
                set(value){
                    this.$store.commit("textItalic", value, {module: "main"});
                }
            },
            zIndex: {
                get(){
                    return this.activeElement.props.z;
                }, 
                set(value){
                    this.$store.commit("changeZIndex", value, {module: "main"});
                }
            }
        }
    }
</script>

<style scoped>
    .panel{
        height: 50px;
        display: flex;
        background: #f9f9f9;
        border: 1px solid #dadada;
        transform: scale(1.2);
    }

    .standart{
        position: absolute;
        bottom: -70px;
        left: 0px;
    }

    .standart-right{
        position: absolute;
        bottom: -70px;
        right: 0px;
    }

    .top-left{
        position: absolute;
        top: -70px;
        left: 0px;
    }

    .top-right{
        position: absolute;
        top: -70px;
        right: 0px;
    }

    .button{
        height: 100%;
        width: 50px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-sizing: border-box;
    }

    .sliderInside{
        width: 502px;
        display: flex;
        align-items: center;
        padding: 6px 20px;
    }

    .radioInside{
        width: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .colorInside{
        width: 51px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sliderWrapper{
        width: 100%;
    }
    .button:not(:last-child){
        border-right: 1px solid #dadada;
    }

    .button>*{
        color: #757575;
        font-size: 2em !important;
    }

    .active{
        color: #1989fa;
    }

    input{
        height: 80%;
        width: 80%;
    }

    .subPanel{
        align-self: flex-start;
        position: absolute;
        background: #f9f9f9;
        box-sizing: border-box;
        border: 1px solid #dadada;
    }

    .standart .subPanel, .standart-right .subPanel{
        bottom: -50px;
        height: 50px;
        left: -1px;
    }

    .top-right .subPanel, .top-left .subPanel{
        top: -50px;
        height: 50px;
        left: -1px;
    }

    .button h2{
        margin: 0;
    }
</style>
