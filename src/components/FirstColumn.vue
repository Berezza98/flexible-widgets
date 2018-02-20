<template>
  <div class="firstColumn">
      <firstColumnButton v-for="item in mainMenu" :key="item.id" :tile="item.text" :image="item.img"></firstColumnButton>
  </div>
</template>

<script>
    import FirstColumnButton from './FirstColumnButton.vue';
    export default{
        data(){
            return {
                mainMenu: [{
                    text: "Home",
                    img: "@assets/text.png",
                    id: 1
                },
                {
                    text: "Text",
                    img: "/assets/logo.png",
                    id: 2
                }]
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
   