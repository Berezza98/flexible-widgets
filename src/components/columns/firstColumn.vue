<template>
  <div class="firstColumn">
      <main-menu-button v-for="item in mainMenu" :key="item.id" :tile="item.text" :image="item.img" :path="item.path"></main-menu-button>
  </div>
</template>

<script>
    import MainMenuButton from '../buttons/mainMenuButton.vue';
    import mainMenu from '../../data/mainMenu.js';
    export default{
        data(){
            return {
                mainMenu
            }
        },
        components: {
            'main-menu-button': MainMenuButton
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
   