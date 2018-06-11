<template>
    <div class="shape_button">
        <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @tooltip="tooltip" @dropInside="droppedInside">
            <el-tooltip class="item" :disabled="disableTooltip" effect="dark" :open-delay="500" :content="'Drag and drop to add a text'" placement="right">
                <div class="content">
                    <img :src="getImg(src)" class="shape_ico">
                    <span class="shape_name">{{tile}}</span>
                </div>
            </el-tooltip>
        </draggable>
    </div>
</template>

<script>
import Rectangle from '../layoutElements/rectangle.vue';
import Circle from '../layoutElements/circle.vue';
import Line from '../layoutElements/line.vue';

export default {
    data(){
        return {
            disableTooltip: false
        }
    },
    components: {
        'rectangle-shape': Rectangle,
        'circle-shape': Circle,
        'line-shape': Line            
    },
    methods: {
        getImg(pic){
            return require('../../assets/shapes/'+pic);
        },
        droppedInside(x, y){
            let height = 200;
            let width = 200;
            let subtype = "";
            let rotated;
            let background = "rgba(78, 151, 230, 0.4)";
            console.log(this.tile);
            switch(this.tile){
                case 'line':
                    subtype = "line";
                    height = 20;
                    width = 400;
                    rotated = false;
                    background = "rgba(0, 0, 0, 1)";
                    break;

                case 'ellipse':
                    subtype = "ellipse";
                    width = 400;
                    break;

                case 'rectangle':
                    subtype = "rectangle";
                    width = 400;
                    break;
                case 'square':
                    subtype = "square";
                    break;

                case 'circle':
                    subtype = "circle";
                    break;

            }
            let id = new Date().getTime();

            let obj = {
                name: this.correctComponent,
                id,
                props: {
                    type: "shape",
                    x, 
                    y,
                    subtype,
                    z : 1,
                    height: height,
                    width: width
                },
                styles: {
                    background: background,
                    opacity: 1
                }
            }
            if(typeof rotated === 'boolean'){
                obj.props.rotated = rotated;
            }
            this.$store.commit("addElementInsideCanvas", obj, {module: "main"});
        },
        tooltip(show){
            if(show === false){
                setTimeout(() => {
                    this.disableTooltip = show; 
                }, 1500);
            }else{
                this.disableTooltip = show;
            }
        }
    },
    props: {
        tile: {
            type: String,
            required: true
        },
        src: {
            type: String,
            required: true
        },
        correctComponent: {
            type: String,
            required: true
        }
    }
}
</script>

<style scoped>
    .shape_button{
        margin-left: 20px;
        height: 50px;
        width: 200px;
        position: relative;
    }

    .shape_button .draggable{
        background: #fff1d9;
        padding: 5px 10px 5px 3px;
        border-radius: 5px;
    }

    .draggable.customDragging{
        background: #eda768;
    }

    .draggable.customDragging .shape_name{
        color: white;
    }

    .shape_ico{
        margin-right: 15px;
        max-width: 40%;
        user-select: none;
        pointer-events: none;
    }

    .shape_name{
        color: #f5a623;
    }
</style>
