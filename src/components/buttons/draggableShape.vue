<template>
    <div class="shape_button">
        <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @tooltip="tooltip" @dropInside="droppedInside">
            <el-tooltip class="item" :disabled="disableTooltip" effect="dark" :open-delay="500" :content=" $t('tooltips.draggableShape') " placement="right">
                <div class="content">
                    <img :src="getImg(src)" class="shape_ico">
                    <span class="shape_name">{{ $t(`buttons.${tile}`) }}</span>
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
            let rotated = false;
            let background = "rgba(78, 151, 230, 1)";

            switch(this.tile){
                case 'line':
                    subtype = "line";
                    height = 20;
                    width = 400;
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

            let positionObj = this.getCorrectPositionOfShape(x, y, height, width);

            let obj = {
                name: this.correctComponent,
                id,
                props: {
                    type: "shape",
                    x: positionObj.x, 
                    y: positionObj.y,
                    subtype,
                    z : this.layerIndex,
                    height: height,
                    width: width,
                    rotated
                },
                styles: {
                    background: background,
                    opacity: 1
                }
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
        },
        getCorrectPositionOfShape(x, y, height, width){
            let canvasHeight, canvasWidth;
            let xResult, yResult;
            let currentOrientation = this.$store.state.main.currentOrientation;

            if(currentOrientation === 'portrait'){
                canvasHeight = 1920;
                canvasWidth = 1080;
            }else if(currentOrientation === 'landscape'){
                canvasHeight = 1080;
                canvasWidth = 1920;
            }

            if(x + width > canvasWidth){
                xResult = canvasWidth - width;
            }else{
                xResult = x;
            }

            if(y + height > canvasHeight){
                yResult = canvasHeight - height;
            }else{
                yResult = y;
            }

            return {
                x: xResult,
                y: yResult
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
    },
    computed: {
        layerIndex(){
            return this.$store.state.main.draggableInsideCanvas.length;
        }
    }
}
</script>

<style scoped>
    .shape_button{
        margin-left: 20px;
        height: 50px;
        width: 160px;
        position: relative;
        flex-shrink: 0;
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

    @media screen and (max-width: 1800px) {
        .shape_button{
            margin-left: 20px;
            height: 40px;
            width: 130px;
            position: relative;
        }

        .shape_ico{
            margin-right: 5px;
            max-width: 30%;
            user-select: none;
            pointer-events: none;
        }
    }

    @media screen and (max-width: 1200px) and (min-width: 1000px) {
        
    }
</style>
