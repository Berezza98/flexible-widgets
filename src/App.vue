<template>
  <div id="app">
    <firstColumn></firstColumn>
    <secondColumn></secondColumn>
    <thirdColumn></thirdColumn>
  </div>
</template>

<script>
import FirstColumn from './components/columns/FirstColumn.vue';
import SecondColumn from './components/columns/SecondColumn.vue';
import ThirdColumn from './components/columns/ThirdColumn.vue';

export default {
  name: 'app',
  components: {
    'firstColumn' : FirstColumn,
    'secondColumn' : SecondColumn,
    'thirdColumn' : ThirdColumn
  }
}
</script>

<style>
#app {
  height: 1400px;
  width: 1800px;
  display: flex;
  box-sizing: border-box;
  border: 2px solid black;
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
