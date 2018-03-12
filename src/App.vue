<template>
<div id="app">
  <el-row class="fullscreen">
    <el-col :span="2">
      <first-column></first-column>
    </el-col>
    <el-col :span="5">
      <second-column></second-column>
    </el-col>
    <el-col :span="17">
      <third-column></third-column>
    </el-col>
  </el-row>
</div>
</template>

<script>
import FirstColumn from './components/columns/firstColumn.vue';
import SecondColumn from './components/columns/secondColumn.vue';
import ThirdColumn from './components/columns/thirdColumn.vue';

export default {
  name: 'app',
  components: {
    'first-column' : FirstColumn,
    'second-column' : SecondColumn,
    'third-column' : ThirdColumn
  },
  methods: {
    
  }
}
</script>

<style>

#app {
  height: calc(100vh - 40px);
}

.fullscreen{
  height: 100%;
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
