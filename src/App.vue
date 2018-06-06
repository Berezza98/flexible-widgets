<template>
<div id="app">
  <el-row class="fullscreen">
    <custom-header></custom-header>
    <top-bar></top-bar>
    <el-col :span="1" class="border">
      <first-column></first-column>
    </el-col>
    <!-- <el-col :span="5" class="border">
      <second-column></second-column>
    </el-col> -->
    <el-col :span="23">
      <third-column></third-column>
    </el-col>
    <modal-orientation v-if="!orientation"></modal-orientation>
  </el-row>
</div>
</template>

<script>
import FirstColumn from './components/columns/firstColumn.vue';
import SecondColumn from './components/columns/secondColumn.vue';
import ThirdColumn from './components/columns/thirdColumn.vue';
import ModalOrientation from './components/layouts/modalOrientation.vue';
import Header from './components/head/header.vue';
import TopBar from './components/head/topBar.vue';

import {eventBus} from './main.js';
import messages from './data/messages.js';

export default {
  name: 'app',
  data(){
    return {
      message: null
    }
  },
  components: {
    'first-column' : FirstColumn,
    'second-column' : SecondColumn,
    'third-column' : ThirdColumn,
    'modal-orientation' : ModalOrientation,
    'custom-header' : Header,
    'top-bar' : TopBar
  },
  methods: {

  },
  computed: {
    orientation(){
        return this.$store.getters.getOrientation;
    }
  },
  mounted(){
    this.message = this.$message({
      showClose: true,
      message: messages.startPage,
      type: 'message',
      duration: 60000,
      customClass: 'information-message'
    });
  },
  created(){
    eventBus.$on('closeStartInformationWindow', () => {
      this.message.close();
    });
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

.information-message{
  max-width: 550px;
  padding: 15px 65px 15px 40px;
  color: #2575b4;
}

.right-message{
  left: 66%;
  padding-right: 35px;
}

.information-message .el-message__content {
  line-height: 18px;
}

.md-icon.md-size-2x{
  margin: 0px !important;
}

.el-button{
  border-radius: 0px !important;
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
.el-card {
  box-shadow: none !important;
  border-radius: 0px !important;
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
