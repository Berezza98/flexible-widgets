<template>
  <div class="firstColumn">
      <main-menu-button v-for="item in mainMenu" :key="item.id" :tile="item.text" :tooltip="item.tooltip" :image="item.img" :path="item.path"></main-menu-button>
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
        height: calc(100% - 70px);
        padding: 0px 20px;
    }
</style>
   