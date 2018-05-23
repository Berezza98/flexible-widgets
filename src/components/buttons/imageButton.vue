<template>
  <div class="image_template" @mouseover="upIndex" @mouseout="downIndex">
        <draggable :return-to-start-position="true" :hideOverflow="'.images'" :setParentSizes="true" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <el-tooltip class="item" effect="dark" :open-delay="500" content="Drag into template to the right." placement="right">
                <el-card class="inside_draggable" :body-style="styles">
                    <img draggable="false" crossOrigin="Anonymous" class="innerImage" :src="imageSource">
                    <div class="name_block">
                        <h2 class="name">{{name.length > 20 ? name.slice(0, 20) + '...' : name}}</h2>
                        <!--<div class="arrows">
                            <i class="el-icon-d-arrow-right arrow"></i>
                        </div>-->
                    </div>
                </el-card>
            </el-tooltip>
        </draggable>
  </div>
</template>

<script>
    import ImageBlock from '../layoutElements/imageBlock.vue';

    export default{
        data(){
            return{
                styles: {
                    'height': '140px',
                    'padding': '0px'
                }
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
                        imageSource: this.getBase64Image(this.$el.querySelector('.innerImage')),
                        width: 600,
                        height: 400,
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
            getBase64Image(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);
                var dataURL = canvas.toDataURL();
                return dataURL;
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
        width: 45%;
        margin: calc(5%/3);
        height: 180px;
        position: relative;
        z-index: 1;
        user-select: none;
    }

    .inside_draggable{
        height: 100%;
        width: 100%;
    }

    .innerImage{
        width: 100%;
        user-select: none;
        height: 100%;
    }

    .name_block{
        height: 30%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .name{
        font-size: 16px;
        font-weight: 400;
        margin-left: 20px;
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
