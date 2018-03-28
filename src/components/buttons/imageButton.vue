<template>
  <div class="image_template" @mouseover="upIndex($event)" @mouseout="downIndex($event)">
        <draggable :return-to-start-position="true" :hideOverflow="'.images'" :setParentSizes="true" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <el-card class="inside_draggable">
                <img draggable="false" class="innerImage" :src="imageSource">
                <div class="name_block">
                    <h2 class="name">{{name}}</h2>
                    <div class="arrows">
                        <i class="el-icon-d-arrow-right arrow"></i>
                    </div>
                </div>
            </el-card>
        </draggable>
  </div>
</template>

<script>
    import ImageBlock from '../layoutElements/imageBlock.vue';

    export default{
        data(){
            return{

            }
        },
        components: {
            'image-block': ImageBlock
        },
        methods: {
            droppedInside(x, y){
                let id = new Date().getTime();
                this.$store.commit("addElementInsideCanvas", {
                    name: 'image-block',
                    id,
                    props: {
                        type: "image",
                        imageSource: this.imageSource,
                        width: 300,
                        height: 200,
                        x,
                        y,
                        z : 1
                    },
                    styles: {
                        background: "transparent",
                        opacity: 1
                    }
                }, {module: "main"});
            },
            upIndex(e){
                e.currentTarget.classList.add('activeEl');
            },
            downIndex(e){
                e.currentTarget.classList.remove('activeEl');
            }
        },
        props: {
            imageSource: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .image_template{
        width: 95%;
        height: 250px;
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
        width: 100%;
        user-select: none;
        height: 70%;
    }

    .name_block{
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .arrow{
        color: #1989fa;
        font-size: 2em;
        font-weight: 900;
    }

    .can-drop{
        border: 4px solid rgba(45, 236, 20, 0.829) !important;
    }

    .activeEl{
        z-index: 10;
    }
</style>
