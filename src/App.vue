<template>
<div id="app">
  <el-row class="fullscreen">
    <custom-header></custom-header>
    <el-col :span="1" class="border">
      <first-column></first-column>
    </el-col>
    <el-col :span="5" class="border">
      <second-column></second-column>
    </el-col>
    <el-col :span="18">
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
import Header from './components/header.vue';

export default {
  name: 'app',
  data(){
    return {
      
    }
  },
  components: {
    'first-column' : FirstColumn,
    'second-column' : SecondColumn,
    'third-column' : ThirdColumn,
    'modal-orientation' : ModalOrientation,
    'custom-header' : Header
  },
  methods: {

  },
  computed: {
    orientation(){
        return this.$store.getters.getOrientation;
    }
  }
}
</script>

<style>

*{
  user-select: none;
}

#app {
  height: calc(100vh - 40px);
  overflow: hidden;
}

.fullscreen{
  height: 100%;
}

.border{
  border-right: 1px solid #e6e6e6;
}

.fullscreen>*{
  height: 100%;
}

body{
  margin: 0;
  font-size: 16px;
  overflow-y: hidden;
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
