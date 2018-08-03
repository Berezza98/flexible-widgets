<template>
  <div :class="'firstColumnButton' + (disableAllControls ? ' disable' : '')">
    <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @activated="closeShapes" @dropInside="droppedInside" @tooltip="tooltip">
        <el-tooltip class="item" effect="dark" :disabled="disableTooltip" :open-delay="500" :content=" $t('tooltips.textBlock') " placement="right">
            <div class="content">
                <md-icon class="md-size-1x">title</md-icon>
                <h2 class="title">{{ $t('buttons.text') }}</h2>
            </div>
        </el-tooltip>
    </draggable>
  </div>
</template>

<script>
    import {eventBus} from '../../main.js';

    import Text from '../layoutElements/text.vue';
    export default{
        data(){
            return{
                disableTooltip: false,
                bodyStyles: {
                    "display": "flex",
                    "justify-content": "space-between",
                    "align-items": "center",
                    "height": "100%"
                }
            }
        },
        components: {
            'text-interactive': Text
        },
        methods: {
            droppedInside(x, y){
                let width = 400;
                let height = 200;

                let id = new Date().getTime();

                let positionObj = this.getCorrectPositionOfText(x, y, height, width);

                this.$store.commit("addElementInsideCanvas", {
                    name: 'text-block',
                    id,
                    props: {
                        type: "text",
                        textValue: this.$t('main.writeTextHere'),
                        x: positionObj.x,
                        y: positionObj.y,
                        z : 1,
                        width,
                        height
                    },
                    styles: {
                        background: "rgba(255, 255, 255, 1)",
                        opacity: 1,
                        color: "rgba(0, 0, 0, 1)",
                        'font-family': "Arial",
                        'font-size': "40px",
                        'line-height': "40px",
                        'font-weight': "normal",
                        'font-style': "normal",
                        'text-decoration': "none",
                        'text-align': "left",
                        'align-items': "flex-start"
                    }
                }, {module: "main"});
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
            getCorrectPositionOfText(x, y, height, width){
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
            },
            closeShapes(){
                eventBus.$emit('showElement', {value: ""});
            }
        },
        computed: {
            disableAllControls(){
                return this.$store.state.main.disableAllControls;
            }
        }
    }
</script>

<style scoped>
    .firstColumnButton{
        cursor: -webkit-grab;
        cursor: grab;
        position: relative;
        width: 100%;
        border-radius: 5px;
    }

    .firstColumnButton:after {
        content: "";
        display: block;
        padding-bottom: 100%;
    }

    .firstColumnButton .draggable{
        border-radius: 5px;
        transition: background 0.5s;
    }

    .firstColumnButton .draggable:hover{
        background: #cce7f8;
    }

    .firstColumnButton:hover i, .firstColumnButton:hover .title{
        color: #409EFF !important;
    }

    .md-size-1x{
        margin: 0px;
        height: 30px;
        font-size: 30px !important;
    }


    .content{
        position:  absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        color: #c5c5c5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .title{
        text-decoration: none;
        margin-top: 5px;
        transition: color .4s cubic-bezier(.4,0,.2,1);
        text-transform: capitalize;
    }

    .menuImage{
        height: 100px;
        width: 100px;
    }

    .disable{
        pointer-events: none;
    }

    .firstColumnButton h2.title{
        font-size: 1em;
        text-align: center;
        line-height: 1em;
        font-weight: normal;
    }

    @media screen and (max-width: 1800px) {
        .firstColumnButton h2.title{
            font-size: 0.6em;
            text-align: center;
            line-height: 0.8em;
        }

        .md-size-1x{
            margin-top: 2px;
            height: 22px;
            font-size: 22px!important;
        }
    }

    @media screen and (max-width: 1200px) and (min-width: 1000px) {
        .firstColumnButton{
            
        }
    }
</style>