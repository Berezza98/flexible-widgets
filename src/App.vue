<template>
<div id="app">
  <div class="fullscreen">
    <custom-header></custom-header>
    <top-bar></top-bar>
    <div class="main">
        <first-column></first-column>
        <third-column></third-column>
    </div>
    <modal-orientation v-if="!orientation"></modal-orientation>
    <modal-images v-if="imageSelecting.show"></modal-images>
    <modal-templates v-if="templateSelecting"></modal-templates>
    <modal-crop v-if="cropToolUsing.show"></modal-crop>
  </div>
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

import translations from './data/translations.js';

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
    if (!this.getQueryVariable('fragmentID')) {
      this.message = this.$message({
        showClose: true,
        message: this.$t('messages.startPage'),
        type: 'message',
        duration: 60000,
        customClass: 'information-message'
      });
    }
  },
  created(){
    eventBus.$on('closeStartInformationWindow', () => {
      this.message.close();
    });

    this.$store.commit('changeHostURL', this.getQueryVariable('server') ? this.getQueryVariable('server') : 'https://flexible-app.herokuapp.com');

    // SET TRANSLATIONS

    let locale = this.getQueryVariable('lang') ? this.getQueryVariable('lang') : "en";

    if (Object.keys(translations[locale]).length > 0) {
        this.$i18n.locale = locale
    } else {
        this.$i18n.locale = "en"
    }

    // SET TRANSLATIONS END
    

    // GET FONTS
    
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

    // GET FONTS END


    // GET IMAGES

    this.$http.get(this.$store.state.main.hostURL + '/getImages?category=0&page=1&limit=36').then(({body}) => {
        this.$store.commit('changeImages', body, {module: "main"});
    });

    // GET IMAGES END


    // GET CATEGORIES

    this.$http.get(this.$store.state.main.hostURL + '/getImageCategories').then(({body}) => {
        let categories = [{id: 0, name: this.$t('main.all')}, ...body];
        this.$store.commit('changeImageCategories', categories, {module: "main"});
    }).catch((err) => {
        let categories = [{id: 0, name: this.$t('main.all')}];
        this.$store.commit('changeImageCategories', categories, {module: "main"});
    });

    // GET CATEGORIES END


    // GET PERMISSIONS

    this.$http.get(this.$store.state.main.hostURL + '/getRights').then(({body}) => {
        this.$store.commit('changePermissions', body, {module: "main"});
    });

    // GET PERMISSIONS END


    // EDITING TEMPLATE

    if(this.getQueryVariable('fragmentID')){
      this.$http.get(this.$store.state.main.hostURL + `/getTemplate?id=${this.getQueryVariable('fragmentID')}`).then(({body}) => {
        this.$store.commit('editTemplate', true , {module: "main"});
        this.$store.commit('changeEditingID', body.id , {module: "main"});
        this.$store.commit('selectTemplate', body.data , {module: "main"});
        this.$store.commit('changeOrientation', body.orientation, {module: "main"});
        this.$store.commit('changeTemplateName', body.name, {module: "main"});
        this.$store.commit('changeTemplateDuration', body.duration, {module: "main"});
      });
    } else {
      this.$store.commit('changeOrientation', "", {module: "main"});
    }

    // EDITING TEMPLATE END
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
  font-size: 13px;
}

.el-button--mini, .el-button--small {
    font-size: 10px;
}

#app {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}

.main{
  height: 85vh;
  width: 100%;
  display: flex;
}

.fullscreen{
  height: 100%;
}

.border{
  border-right: 1px solid #e3e3e3;
}

/* .fullscreen>*{
  height: 100%;
} */

body{
  margin: 0;
  padding: 0px;
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

input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0; 
}
</style>
