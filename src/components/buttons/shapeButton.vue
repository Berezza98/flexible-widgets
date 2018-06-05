<template>
    <div class="firstColumnButton">
        <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <el-tooltip class="item" effect="dark" :open-delay="500" :content="'Drag and drop to add a shape'" placement="right">
                <div class="content">
                    <md-icon class="md-size-1x">widgets</md-icon>
                    <h2 class="title">Shapes</h2>
                </div>
            </el-tooltip>
        </draggable>
  </div>
</template>

<script>
    import Rectangle from '../layoutElements/rectangle.vue';
    import Circle from '../layoutElements/circle.vue';
    import Line from '../layoutElements/line.vue';
    
    export default{
        data(){
            return{
                bodyStyles: {
                    "display": "flex",
                    "flex-direction": "column",
                    "align-items": "center"
                }
            }
        },
        components: {
            'rectangle-shape': Rectangle,
            'circle-shape': Circle,
            'line-shape': Line            
        },
        props: {

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
            upIndex(e){
                e.currentTarget.classList.add('activeEl');
            },
            downIndex(e){
                e.currentTarget.classList.remove('activeEl');
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
        height: 0;
        padding-bottom: 100%;

    }

    .md-size-1x{
        margin: 0px;
        height: 30px;
        font-size: 30px!important;
    }

    .firstColumnButton:first-child{
        margin-top: 20px;
    }

    .firstColumnButton:before{
        content: "";
        display: block;
        padding-top: 100%;
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
    }

    .menuImage{
        height: 100px;
        width: 100px;
    }

    .firstColumnButton h2.title{
        font-size: 1em;
        text-align: center;
        line-height: 1em;
    }

    @media screen and (max-width: 1800px) {
        .firstColumnButton h2.title{
            font-size: 0.5em;
            text-align: center;
            line-height: 0.8em;
        }

        .md-size-1x{
            margin-top: 2px;
            height: 22px;
            font-size: 22px!important;
        }
    }
</style>
