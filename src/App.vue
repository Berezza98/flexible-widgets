<template>
  <div id="app">
    <first-column></first-column>
    <second-column></second-column>
    <third-column></third-column>
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
  margin: 0;
  padding: 0;
}

::-webkit-scrollbar {
    width: 0px;  /* remove scrollbar space */
    background: transparent;  /* optional: just make scrollbar invisible */
}
/* optional: show position indicator in red */
::-webkit-scrollbar-thumb {
    background: black;
    border-radius: 10px;
}
</style>
