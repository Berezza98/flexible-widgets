<template>
    <div class="panel">
        <div v-if="elementType === 'text' || elementType === 'shape'" class="button">
            <!-- <el-color-picker v-model="background" show-alpha></el-color-picker> -->
            <md-icon class="md-size-2x">format_color_fill</md-icon>
        </div>
        <div v-if="elementType === 'text'" class="button">
            <!-- <input type="color" v-model="color"/> -->
            <md-icon class="md-size-2x">format_color_text</md-icon>
        </div>
        <div class="button">
            <md-icon class="md-size-2x">opacity</md-icon>
            <div class="subPanel" @mousedown="noDrag">

            </div>
            <!-- <input v-model="opacity"/> -->
        </div>
        <div v-if="elementType === 'text'" class="button">
            <!-- <input v-model="fontSize"/> -->
            <md-icon class="md-size-2x">format_size</md-icon>
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
            <md-icon class="md-size-2x">font_download</md-icon>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <!-- <select v-model="textAlign">
                <option v-for="(align, index) in ['left', 'right', 'center']" :key="index" :value="align">{{align}}</option>
            </select> -->
            <md-icon class="md-size-2x">format_align_right</md-icon>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <!-- <select v-model="verticalAlign">
                <option v-for="(align, index) in [{name: 'top', value: 'flex-start'}, {name: 'center', value: 'center'}, {name: 'bottom', value: 'flex-end'}]" :key="index" :value="align.value">{{align.name}}</option>
            </select> -->
            <md-icon class="md-size-2x">vertical_align_center</md-icon>
        </div>
        <div v-if="elementType === 'image' || elementType === ''" class="button" @click="cropImage">
            <md-icon class="md-size-2x">crop</md-icon>
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

            }
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
                    return this.activeElement.styles['font-size'];
                }, 
                set(value){
                    this.$store.commit("changeFontSize", value, {module: "main"});
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
                    return this.activeElement.styles['align-items'];
                }, 
                set(value){
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
            }
        }
    }
</script>

<style scoped>
    .panel{
        position: absolute;
        bottom: -60px;
        left: 0px;
        height: 50px;
        display: flex;
        background: #f9f9f9;
        border: 1px solid #dadada;
    }

    .button{
        position: relative;
        height: 100%;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }

    .button>*{
        color: #757575;
        font-size: 2em !important;
    }

    .button:hover>*{
        color: #1989fa;
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
        bottom: -50px;
        height: 50px;
        width: 300px;
        background: #f9f9f9;
        border: 1px solid #dadada;
    }

    .button h2{
        margin: 0;
    }
</style>
