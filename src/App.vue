<template>
<div id="app">
  <el-row class="fullscreen">
    <custom-header></custom-header>
    <top-bar></top-bar>
    <el-col :span="1" class="border">
      <first-column></first-column>
    </el-col>
    <el-col :span="23">
      <third-column></third-column>
    </el-col>
    <modal-orientation v-if="!orientation"></modal-orientation>
    <modal-images v-if="imageSelecting.show"></modal-images>
    <modal-templates v-if="templateSelecting"></modal-templates>
    <modal-crop v-if="cropToolUsing.show"></modal-crop>
  </el-row>
</div>
</template>

<script>
import FirstColumn from './components/columns/firstColumn.vue';
import ThirdColumn from './components/columns/thirdColumn.vue';
import ModalOrientation from './components/modals/modalOrientation.vue';
import ModalImages from './components/modals/modalImages.vue';
import ModalTemplates from './components/modals/modalTemplates.vue';
import ModalCrop from './components/modals/modalCrop.vue';
import Header from './components/head/header.vue';
import TopBar from './components/head/topBar.vue';

import {eventBus} from './main.js';

export default {
  name: 'app',
  data(){
    return {
      message: null
    }
  },
  components: {
    'first-column' : FirstColumn,
    'third-column' : ThirdColumn,
    'modal-orientation' : ModalOrientation,
    'modal-crop' : ModalCrop,
    'modal-images': ModalImages,
    'modal-templates': ModalTemplates,
    'custom-header' : Header,
    'top-bar' : TopBar
  },
  methods: {
    getQueryVariable(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) == variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        console.log('Query variable %s not found', variable);
    }
  },
  computed: {
    orientation(){
        return this.$store.getters.getOrientation;
    },
    imageSelecting(){
        return this.$store.state.main.imageSelecting;
    },
    templateSelecting(){
        return this.$store.state.main.templateSelecting;
    },
    cropToolUsing(){
        return this.$store.state.main.cropToolUsing;
    }
  },
  mounted(){
    this.message = this.$message({
      showClose: true,
      message: this.$t('messages.startPage'),
      type: 'message',
      duration: 60000,
      customClass: 'information-message'
    });
  },
  created(){
    eventBus.$on('closeStartInformationWindow', () => {
      this.message.close();
    });

    this.$store.commit('changeHostURL', this.getQueryVariable('server') ? this.getQueryVariable('server') : 'https://flexible-app.herokuapp.com'); 

    this.$i18n.locale = this.getQueryVariable('lang') ? this.getQueryVariable('lang') : "en"
    
    this.$http.get(this.$store.state.main.hostURL + '/getFonts').then(({body}) => {
      body.sort((a, b) => {
          if(a.toLowerCase() > b.toLowerCase()){ 
              return 1;
          }else{
              return -1;
          }
      });

      this.$store.commit('changeAvailableFonts', body, {module: "main"});
    });

    this.$http.get(this.$store.state.main.hostURL + '/getTemplates?page=1&limit=16').then(({body}) => {
        this.$store.commit('addNewTemplates', body, {module: "main"});
    });

    this.$http.get(this.$store.state.main.hostURL + '/getImages?page=1&limit=16').then(({body}) => {
        this.$store.commit('addNewImages', body, {module: "main"});
    });

    this.$http.get(this.$store.state.main.hostURL + '/getImageCategories').then(({body}) => {
        this.$store.commit('changeImageCategories', body, {module: "main"});
    });

    this.$http.get(this.$store.state.main.hostURL + '/getRights').then(({body}) => {
        this.$store.commit('changePermissions', body, {module: "main"});
    });

    if(this.getQueryVariable('fragmentID')){
      this.$http.get(this.$store.state.main.hostURL + `getTemplate?id=${this.getQueryVariable('fragmentID')}`).then(({body}) => {
        this.$store.commit('selectTemplate', body.data , {module: "main"});
      });
    }
  }
}
</script>

<style>

*{
  user-select: none;
  outline-color: transparent;
}

input::placeholder{
  color: #888888 !important;
}

#app {
  height: calc(100vh - 20px);
  overflow: hidden;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
  box-sizing: border-box;
}

.fullscreen{
  height: 100%;
}

.border{
  border-right: 1px solid #e3e3e3;
}

.fullscreen>*{
  height: 100%;
}

body{
  margin: 0;
  padding: 10px;
  font-size: 16px;
  overflow-y: hidden;
}

.md_icon_button{
  padding: 8px 20px;
  height: 38px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

.information-message{
  max-width: 550px;
  padding: 15px 65px 15px 40px;
  color: #2575b4;
}

.right-message{
  width: 370px;
  padding: 15px 65px 15px 40px;
  color: #2575b4;
  bottom: 76px;
  top: auto;
  left: auto;
  right: -140px;
  padding: 15px 65px 15px 40px;
  color: #2575b4;
}

.information-message .el-message__content {
  line-height: 18px;
}

.md-icon.md-size-2x{
  margin: 0px !important;
}

.el-button{
  border: 0px solid transparent;
}

.el-button--primary {
  color: #fff;
  background-color: #5ca6d5;
  border-color: #7fb3d4;
}

.el-button--primary.is-plain {
  background: #cce7f8;
}
.el-button--primary:focus, .el-button--primary:hover {
  background: #2e81c4;
  border-color: #2e81c4;
  color: #fff;
}
.el-button--primary.is-plain:focus, .el-button--primary.is-plain:hover {
  background: #2e81c4;
  border-color: #2e81c4;
  color: #fff;
}
.el-input.is-active .el-input__inner, .el-input__inner:focus{
  border-color: #095fa4;
  outline: 0;
}
.el-select .el-input__inner:focus {
  border-color: #095fa4;
}
.el-select-dropdown__item.selected {
  color: #095fa4;
  font-weight: 700;
}

::-webkit-scrollbar {
    width: 5px;
}

::-webkit-scrollbar-thumb {
  background-color: #cfcfcf;
}
</style>
