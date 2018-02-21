<template>
  <div class="secondColumn">
      <div class="container">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>

    export default{
        data(){
            return{
                
            }
        }
    }
</script>

<style scoped>
    .secondColumn{
        height: 100%;
        width: 25%;
        background: rgb(199, 223, 247);
    }

    .container{
        height: 100%;
    }
</style>
