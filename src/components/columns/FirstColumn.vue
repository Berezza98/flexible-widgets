<template>
  <div class="firstColumn">
      <MainMenuButton v-for="item in mainMenu" :key="item.id" :tile="item.text" :image="item.img" :path="item.path"></MainMenuButton>
  </div>
</template>

<script>
    import MainMenuButton from '../buttons/MainMenuButton.vue';
    import mainMenu from '../../data/mainMenu.js';
    export default{
        data(){
            return {
                mainMenu
            }
        },
        components: {
            MainMenuButton
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
   