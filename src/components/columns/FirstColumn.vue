<template>
  <div class="firstColumn">
      <firstColumnButton v-for="item in mainMenu" :key="item.id" :tile="item.text" :image="item.img" :path="item.path"></firstColumnButton>
  </div>
</template>

<script>
    import FirstColumnButton from '../buttons/FirstColumnButton.vue';
    import mainMenu from '../../data/mainMenu.js';
    export default{
        data(){
            return {
                mainMenu
            }
        },
        components: {
            'firstColumnButton': FirstColumnButton
        }
    }
</script>

<style scoped>
    .firstColumn{
        height: 100%;
        width: 10%;
        background: lightgray;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
    }
</style>
   