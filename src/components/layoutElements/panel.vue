<template>
    <div class="panel">
        <div v-if="elementType === 'text' || elementType === 'shape'" class="button">
            <input type="color" v-model="background"/>
        </div>
        <div v-if="elementType === 'text'" class="button">
            <input type="color" v-model="color"/>
        </div>
        <div class="button">
            <input v-model="opacity"/>
        </div>
        <div v-if="elementType === 'text'" class="button">
            <input v-model="fontSize"/>
        </div>
        <div v-if="elementType === 'text'" class="button" @click="underline">
            <h2>Und</h2>
        </div>
        <div v-if="elementType === 'text'" class="button" @click="bold">
            <h2>B</h2>
        </div>
        <div v-if="elementType === 'text'" class="button" @click="italic">
            <h2>I</h2>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <select v-model="selectFont">
                <option v-for="(font, index) in fonts" :key="index" :value="font">{{font}}</option>
            </select>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <select v-model="textAlign">
                <option v-for="(align, index) in ['left', 'right', 'center']" :key="index" :value="align">{{align}}</option>
            </select>
        </div>
        <div v-if="elementType === 'text' || elementType === ''" class="button">
            <select v-model="verticalAlign">
                <option v-for="(align, index) in [{name: 'top', value: 'flex-start'}, {name: 'center', value: 'center'}, {name: 'bottom', value: 'flex-end'}]" :key="index" :value="align.value">{{align.name}}</option>
            </select>
        </div>
        <div v-if="elementType === 'image' || elementType === ''" class="button" @click="cropImage">
            <h2>Crop</h2>
        </div>
        <div class="button" @click="deleteElement">
            <h2>Del</h2>
        </div>
        <div class="button" @click="saveElement">
            <h2>Save</h2>
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
    }

    .button{
        position: relative;
        height: 100%;
        width: 50px;
        background: salmon;
        box-sizing: border-box;
        border-right: 1px solid black;
    }

    input{
        height: 80%;
        width: 80%;
    }

    .button h2{
        margin: 0;
    }
</style>
