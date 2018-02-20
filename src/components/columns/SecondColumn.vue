<template>
  <div class="secondColumn">
      <router-view></router-view>
  </div>
</template>

<script>
    export default{
        
    }
</script>

<style scoped>
    .secondColumn{
        height: 100%;
        width: 25%;
        background: rgb(199, 223, 247);
        overflow-y: scroll;
    }
</style>
