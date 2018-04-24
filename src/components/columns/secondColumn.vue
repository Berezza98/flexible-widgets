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
                return this.$store.state.main.readyForCreateWidget
            } 
        }
    }
</script>

<style scoped>
    .secondColumn{
        height: 100%;
        background: #f0f0f0;
    }

    .container{
        height: calc(100% - 70px);
        padding: 0px 20px;
    }
</style>
