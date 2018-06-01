<template>
    <div :class="'panel ' + getCorrectPosition" @mousedown.stop="noDrag">
        <el-tooltip content="Background color" :open-delay="500" placement="top">
            <div v-if="elementType === 'text' || elementType === 'shape'" class="button">
                <md-icon @click.native.self="showSubPanel = 'background'" :class="showSubPanel == 'background' ? 'md-size-2x active' : 'md-size-2x'">format_color_fill</md-icon>
                <div v-if="showSubPanel == 'background'" class="subPanel colorInside">
                    <el-color-picker @click.native.stop v-model="background" show-alpha></el-color-picker>
                </div>
            </div>
        </el-tooltip>
        <el-tooltip content="Text color" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" class="button">
                <md-icon @click.native.self="showSubPanel = 'color'" :class="showSubPanel == 'color' ? 'md-size-2x active' : 'md-size-2x'">format_color_text</md-icon>
                <div v-if="showSubPanel == 'color'" class="subPanel colorInside">
                    <el-color-picker @click.native.stop v-model="color" show-alpha></el-color-picker>
                </div>
            </div>
        </el-tooltip>
        <el-tooltip content="Opacity" :open-delay="500" placement="top">
            <div v-if="elementType === 'image' || elementType === ''" class="button">
                <md-icon @click.native.self="showSubPanel = 'opacity'" :class="showSubPanel == 'opacity' ? 'md-size-2x active' : 'md-size-2x'">opacity</md-icon>
                <div v-if="showSubPanel == 'opacity'" class="subPanel sliderInside">
                    <div class="sliderWrapper">
                        <el-slider v-model="opacity" :min="0" :max="1" :step="0.1" show-input></el-slider>
                    </div>
                </div>
            </div>
        </el-tooltip>    
        <el-tooltip content="Text size" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" class="button">
                <md-icon @click.native.self="showSubPanel = 'fontSize'" :class="showSubPanel == 'fontSize' ? 'md-size-2x active' : 'md-size-2x'">format_size</md-icon>
                <div v-if="showSubPanel == 'fontSize'" class="subPanel sliderInside">
                    <div class="sliderWrapper">
                        <el-slider v-model="fontSize" :min="1" :max="100" :step="1" show-input></el-slider>
                    </div>
                </div>
            </div>
        </el-tooltip>
        <el-tooltip content="Underline" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" class="button" @click="underline">
                <md-icon  :class="underlineEl !== 'none' ? 'active' : ''">format_underlined</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip content="Bold" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" class="button" @click="bold">
                <md-icon :class="boldEl !== 'normal' ? 'active' : ''">format_bold</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip content="Italic" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" class="button" @click="italic">
                <md-icon :class="italicEl !== 'normal' ? 'active' : ''" class="md-size-2x">format_italic</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip content="Font" :open-delay="500" placement="top">
            <div v-if="elementType === 'text' || elementType === ''" class="button">
                <!-- <select v-model="selectFont">
                    <option v-for="(font, index) in fonts" :key="index" :value="font">{{font}}</option>
                </select> -->
                <md-icon @click.native.self="showSubPanel = 'fontFamily'" :class="showSubPanel == 'fontFamily' ? 'md-size-2x active' : 'md-size-2x'">spellcheck</md-icon>
                <div v-if="showSubPanel == 'fontFamily'" class="subPanel radioInside">
                    <el-select :popper-append-to-body="false" v-model="selectFont" placeholder="Select font">
                        <el-option v-for="(font, index) in fonts" :key="index" :label="font" :value="font"></el-option>
                    </el-select>
                </div>
            </div>
        </el-tooltip>
        <el-tooltip content="Align horisontal" :open-delay="500" placement="top">
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
        </el-tooltip>
        <el-tooltip content="Align vertical" :open-delay="500" placement="top">
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
        </el-tooltip>
        <el-tooltip content="Crop/Rotate image" :open-delay="500" placement="top">
            <div v-if="elementType === 'image' || elementType === ''" class="button" @click="cropImage">
                <md-icon class="md-size-2x">crop_rotate</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip content="Shape rotation" :open-delay="500" placement="top">
            <div v-if="elementType === 'shape'" class="button" @click="rotate">
                <md-icon class="md-size-2x">rotate_90_degrees_ccw</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip content="Layer position" :open-delay="500" placement="top">
            <div class="button">
                <md-icon @click.native.self="showSubPanel = 'zIndex'" :class="showSubPanel == 'zIndex' ? 'md-size-2x active' : 'md-size-2x'">layers</md-icon>
                <div v-if="showSubPanel == 'zIndex'" class="subPanel buttonsInside">
                    <el-button @click="++zIndex">To front</el-button>
                    <el-button @click="--zIndex">To back</el-button>
                </div>
            </div>
        </el-tooltip>
        <el-tooltip content="Make duplicate" :open-delay="500" placement="top">
            <div class="button" @click="copy">
                <md-icon class="md-size-2x">content_copy</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip content="Delete item" :open-delay="500" placement="top">
            <div class="button" @click="deleteElement">
                <md-icon class="md-size-2x">delete</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip content="Close edit tool" :open-delay="500" placement="top">
            <div class="button" @click="saveElement">
                <md-icon class="md-size-2x">check</md-icon>
            </div>
        </el-tooltip>
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
            copy(){
                // FOR DELETING OBSERVERS AND CREATE EMPTY OBJECT WITH NEEDED PROPERTIES
                let element = JSON.stringify(Object.assign({}, this.activeElement));
                element = JSON.parse(element);
                this.$store.commit("createCopyOfElement", element, {module: "main"});
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
            rotate(){
                this.$store.commit('rotateElement');
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
        transform: scale(1.4);
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
        cursor: pointer;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
    }

    .sliderInside{
        width: 502px;
        display: flex;
        align-items: center;
        padding: 6px 20px;
    }

    .buttonsInside{
        width: 230px;
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

    .el-select-dropdown__item{
        font-size: 0.6em;
    }
</style>
