<template>
    <div class="panel">
        <el-tooltip :content="$t('tooltips.backgroundColor')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text' || elementType === 'shape'" class="button">
                <popover v-if="showSubPanel == 'background'" width="60">
                    <div class="colorInside">
                        <el-color-picker size="medium" @click.native.stop v-model="background" show-alpha></el-color-picker>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'background'" :class="showSubPanel == 'background' ? 'md-size-1x active' : 'md-size-1x'">format_color_fill</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.textColor')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" class="button">
                <popover v-if="showSubPanel == 'color'" width="60">
                    <div class="subPanel colorInside">
                        <el-color-picker size="medium" @click.native.stop v-model="color" show-alpha></el-color-picker>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'color'" :class="showSubPanel == 'color' ? 'md-size-1x active' : 'md-size-1x'">format_color_text</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.textSize')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" class="button">
                <popover v-if="showSubPanel == 'fontSize'" width="500">
                    <div class="subPanel sliderInside">
                        <div class="sliderWrapper">
                            <el-slider v-model="fontSize" :min="1" :max="100" :step="1" show-input></el-slider>
                        </div>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'fontSize'" :class="showSubPanel == 'fontSize' ? 'md-size-1x active' : 'md-size-1x'">format_size</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.underline')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" @click="underline" class="button">
                <md-icon  :class="underlineEl !== 'none' ? 'active' : ''">format_underlined</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.bold')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" @click="bold" class="button">
                <md-icon :class="boldEl !== 'normal' ? 'active' : ''">format_bold</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.italic')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text'" @click="italic" class="button">
                <md-icon :class="italicEl !== 'normal' ? 'active' : ''" class="md-size-1x">format_italic</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.font')" :open-delay="500" placement="top">
            <div  v-if="elementType === 'text' || elementType === ''" class="button">
                <popover v-if="showSubPanel == 'fontFamily'" width="240">
                    <div class="subPanel radioInside">
                        <el-select :popper-append-to-body="false" v-model="selectFont" placeholder="Select font">
                            <el-option v-for="(font, index) in fonts" :key="index" :label="font" :value="font"></el-option>
                        </el-select>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'fontFamily'" :class="showSubPanel == 'fontFamily' ? 'md-size-1x active' : 'md-size-1x'">spellcheck</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.alignHorisontal')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text' || elementType === ''" class="button">
                <popover v-if="showSubPanel == 'align'" width="270">
                    <div class="subPanel radioInside">
                        <el-radio-group v-model="textAlign">
                            <el-radio-button :label="$t('buttons.left')"></el-radio-button>
                            <el-radio-button :label="$t('buttons.center')"></el-radio-button>
                            <el-radio-button :label="$t('buttons.right')"></el-radio-button>
                        </el-radio-group>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'align'" :class="showSubPanel == 'align' ? 'md-size-1x active' : 'md-size-1x'">format_align_right</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.alignVertical')" :open-delay="500" placement="top">
            <div v-if="elementType === 'text' || elementType === ''" class="button">
                <popover v-if="showSubPanel == 'verAlign'" width="270">
                    <div class="subPanel radioInside">
                        <el-radio-group v-model="verticalAlign">
                            <el-radio-button :label="$t('buttons.top')"></el-radio-button>
                            <el-radio-button :label="$t('buttons.center')"></el-radio-button>
                            <el-radio-button :label="$t('buttons.bottom')"></el-radio-button>
                        </el-radio-group>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'verAlign'" :class="showSubPanel == 'verAlign' ? 'md-size-1x active' : 'md-size-1x'">vertical_align_center</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.crop')" :open-delay="500" placement="top">
            <div v-if="elementType === 'image' || elementType === ''" class="button" @click="cropImage">
                <md-icon class="md-size-1x">crop_rotate</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.rotate')" :open-delay="500" placement="top">
            <div v-if="elementType === 'shape'" @click="rotate"  class="button">
                <md-icon class="md-size-1x">rotate_90_degrees_ccw</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.layerPosition')" :open-delay="500" placement="top">
            <div class="button">
                <popover v-if="showSubPanel == 'zIndex'" width="220">
                    <div class="subPanel buttonsInside">
                        <el-button @click="toFront">To front</el-button>
                        <el-button @click="toBack">To back</el-button>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'zIndex'" :class="showSubPanel == 'zIndex' ? 'md-size-1x active' : 'md-size-1x'">layers</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.makeDuplicate')" :open-delay="500" placement="top">
            <div class="button" @click="copy">
                <md-icon class="md-size-1x">content_copy</md-icon>
            </div>
        </el-tooltip>
        <el-tooltip :content="$t('tooltips.opacity')" :open-delay="500" placement="top">
            <div v-if="elementType === 'image' || elementType === ''" class="button">
                <popover v-if="showSubPanel == 'opacity'" width="500">
                    <div class="subPanel sliderInside">
                        <div class="sliderWrapper">
                            <el-slider v-model="opacity" :min="0" :max="1" :step="0.1" show-input></el-slider>
                        </div>
                    </div>
                </popover>
                <md-icon @click.native.self="showSubPanel = 'opacity'" :class="showSubPanel == 'opacity' ? 'md-size-1x active' : 'md-size-1x'">opacity</md-icon>
            </div>
        </el-tooltip>    
        <el-tooltip :content="$t('tooltips.deleteItem')" :open-delay="500" placement="top">
            <div class="button" @click="deleteElement">
                <md-icon class="md-size-1x">delete</md-icon>
            </div>
        </el-tooltip>
        <!-- <el-tooltip content="Close edit tool" :open-delay="500" placement="top">
            <div class="button" @click="saveElement">
                <md-icon class="md-size-1x">check</md-icon>
            </div>
        </el-tooltip> -->
    </div>
</template>

<script>
    import Popover from '../popover.vue';

    import { eventBus } from '../../main.js';

    export default{
        data(){
            return {
                showSubPanel: "",
                elWidth: 0
            }
        },
        components: {
            "popover": Popover
        },
        props: {
            id: {
                type: Number,
                required: true
            }
        },
        mounted(){
            this.elWidth = this.$el.offsetWidth;
        },
        methods: {
            deleteElement(id){
                this.showSubPanel = 'delete';
                this.$store.commit("deleteElementFromCanvas", {id: this.id},  {module: "main"});
                eventBus.$emit('changeRulerPosition', {close : true});
            },
            saveElement(){
                eventBus.$emit('closePanel', {id: this.id},  {module: "main"});
            },
            copy(){
                this.showSubPanel = 'copy';

                if (this.activeElement.props.type === "text") {
                    console.log(this.activeElement);
                    eventBus.$emit('saveInnerText', {id: this.id},  {module: "main"});
                }

                // FOR DELETING OBSERVERS AND CREATE EMPTY OBJECT WITH NEEDED PROPERTIES
                let element = JSON.stringify(Object.assign({}, this.activeElement));
                element = JSON.parse(element);

                let canvasWidth = 1080;
                let canvasHeight = 1920;
                let orientation = this.$store.state.main.currentOrientation;
                if(orientation === "landscape"){
                    canvasWidth = 1920;
                    canvasHeight = 1080;
                }

                let toX = 0;
                let toY = 0;

                if(canvasWidth - (element.props.x + element.props.width) < 40){
                    toX = -40;
                }else if(element.props.x < 40){
                    toX = 40;
                }else{
                    toX = 40;
                }
                if(element.props.x < 40 && canvasWidth - (element.props.x + element.props.width) < 40){
                    toX = 0;
                }

                if(canvasHeight - (element.props.y  + element.props.height) < 40){
                    toY = -40;
                }else if(element.props.y < 40){
                    toY = 40;
                }else{
                    toY = 40;
                }
                if(element.props.y < 40 && canvasHeight - (element.props.y  + element.props.height) < 40){
                    toY = 0;
                }

                if(canvasHeight - (element.props.y  + element.props.height) < 40 && element.props.y < 40 && element.props.x < 40 && canvasWidth - (element.props.x + element.props.width) < 40){
                    console.log('full size element');
                    toY = 0;
                    toX = 0;
                }

                element.props.y += toY;
                element.props.x += toX;

                this.$store.commit("createCopyOfElement", element, {module: "main"});
            },
            underline(){
                this.showSubPanel = 'underline';
                let currentState = this.underlineEl === 'none' ? false : true;
                this.underlineEl = !currentState;
            },
            bold(){
                this.showSubPanel = 'bold';
                let currentState = this.boldEl === 'normal' ? false : true;
                this.boldEl = !currentState;
            },
            italic(){
                this.showSubPanel = 'italic';
                let currentState = this.italicEl === 'normal' ? false : true;
                this.italicEl = !currentState;
            },
            cropImage(){
                this.showSubPanel = 'crop';
                this.$store.commit('cropToolOpen', {show: true, id: this.id}, {module: "main"});
            },
            rotate(){
                this.showSubPanel = 'rotate';
                this.$store.commit('rotateElement', {id: this.id}, {module: 'main'});
            },
            toFront(){
                this.$store.commit('toFrontZ', {id: this.id}, {module: 'main'});
            },
            toBack(){
                this.$store.commit('toBackZ', {id: this.id}, {module: 'main'});
            }
        },
        computed: {
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
                    let horAlign = this.activeElement.styles['text-align'];

                    if(horAlign === 'right'){
                        return this.$t('buttons.right');
                    }else if(horAlign === 'left'){
                        return this.$t('buttons.left');
                    }else{
                        return this.$t('buttons.center');
                    }
                }, 
                set(value){
                    if(value === this.$t('buttons.right')){
                        value = 'right';
                    }else if(value === this.$t('buttons.left')){
                        value = 'left';
                    }else{
                        value = 'center';
                    }

                    this.$store.commit("textAlign", value, {module: "main"});
                }
            },
            verticalAlign: {
                get(){
                    let verAlign = this.activeElement.styles['align-items'];

                    if(verAlign === 'flex-start'){
                        return this.$t('buttons.top');
                    }else if(verAlign === 'flex-end'){
                        return this.$t('buttons.bottom');
                    }else{
                        return this.$t('buttons.center');
                    }
                }, 
                set(value){
                    if(value === this.$t('buttons.top')){
                        value = 'flex-start';
                    }else if(value === this.$t('buttons.bottom')){
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
        width: 100%;
        display: flex;
        align-items: center;
        padding: 0px 5px;
    }

    .buttonsInside{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .radioInside{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .sliderWrapper{
        width: 100%;
    }

    .button>*{
        color: #757575;
    }

    .active{
        color: #1989fa;
    }

    input{
        height: 80%;
        width: 80%;
    }

    .subPanel{

    }

    .colorInside{
        width: 100%;
        display: flex;
        justify-content: center;
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
