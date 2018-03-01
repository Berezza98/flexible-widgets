<template>
  <div class="image_template">
        <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <div class="inside_draggable">
                <img draggable="false" class="innerImage" :src="imageSource">
            </div>
        </draggable>
  </div>
</template>

<script>
    import ImageBlock from './layoutElements/imageBlock.vue';

    export default{
        data(){
            return{

            }
        },
        components: {
            'image-block': ImageBlock
        },
        methods: {
            droppedInside(){
                let id = new Date().getTime();
                this.$store.commit("addElementInsideCanvas", {
                    name: 'image-block',
                    id,
                    props: {
                        imageSource: this.imageSource
                    },
                    styles: {
                        background: "transparent",
                        opacity: 1
                    }
                }, {module: "main"});
            }
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
        position: relative;
        z-index: 1;
        flex-shrink: 0;
        user-select: none;
    }

    .inside_draggable{
        height: 100%;
        width: 100%;
    }

    .innerImage{
        height: 100%;
        width: 100%;
        user-select: none;
    }

    .can-drop{
        border: 4px solid rgba(45, 236, 20, 0.829) !important;
    }
</style>
