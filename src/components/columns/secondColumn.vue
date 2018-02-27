<template>
  <div class="secondColumn">
      <div class="container">
          <search-block></search-block>
          <router-view v-if="readyForCreateWidget"></router-view>
      </div>
  </div>
</template>

<script>
    import Search from '../search.vue';

    export default{
        data(){
            return{
                
            }
        },
        components: {
            'search-block': Search
        },
        computed: {
            readyForCreateWidget(){
                return this.$store.state.readyForCreateWidget
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
