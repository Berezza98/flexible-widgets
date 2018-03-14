<template>
<div id="app">
  <el-row class="fullscreen">
    <el-col :span="2" class="border">
      <first-column></first-column>
    </el-col>
    <el-col :span="5" class="border">
      <second-column></second-column>
    </el-col>
    <el-col :span="17">
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
    'modal-orientation' : ModalOrientation
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
  padding: 20px;
  font-size: 16px;
  overflow-y: hidden;
}
</style>
