<template>
    <div class="panel">
        <div class="button">
            <input type="color" v-model="background"/>
        </div>
        <div class="button">
            <input type="color" v-model="color"/>
        </div>
        <div class="button">
            <input v-model="opacity"/>
        </div>
        <div class="button">
            <input v-model="fontSize"/>
        </div>
        <div class="button" @click="underline">
            <h2>Und</h2>
        </div>
        <div class="button">
            <select v-model="selectFont">
                <option v-for="(font, index) in fonts" :key="index" :value="font">{{font}}</option>
            </select>
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
            }
        },
        computed: {
            activeElement(){
                return this.$store.getters.getActiveElement;
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
        background: slategrey;
        width: 500px;
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
