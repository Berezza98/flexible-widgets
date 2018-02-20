<template>
  <div class="image_template">
      <img class="innerImage" :src="imageSource">
  </div>
</template>

<script>
    export default{
        data(){
            return{

            }
        },
        methods: {

        },
        props: {
            imageSource: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .image_template{
        width: 95%;
        height: 300px;
        margin-bottom: 10px;
    }

    .innerImage{
        height: 100%;
        width: 100%;
    }
</style>
