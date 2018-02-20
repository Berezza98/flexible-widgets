<template>
  <div class="secondColumn">
      <div class="search">
          <input v-model="searchingText" type="text" class="searchBox">
      </div>
      <div class="container">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>
    export default{
        data(){
            return{
                searchingText: ""
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

    .search{
        height: 100px;
        width: 100%;
        background: rgb(104, 98, 90);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .searchBox{
        width: 95%;
        height: 40px;
        font-size: 30px
    }

    .container{
        height: calc(100% - 100px);
        overflow-y: scroll;
    }
</style>
