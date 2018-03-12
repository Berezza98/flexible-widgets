<template>
    <div class="shapeWrapper" @mouseover="upIndex($event)" @mouseout="downIndex($event)">
        <draggable :return-to-start-position="true" :setParentSizes="true" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <el-card class="inside_draggable" :body-style="bodyStyles">
                <img draggable="false" class="shapeImage" :src="getImg(imageSource)">
                <h2 class="tile">{{tile}}</h2>
            </el-card>
        </draggable>
    </div>
</template>

<script>
    import Rectangle from '../layoutElements/rectangle.vue';
    import Circle from '../layoutElements/circle.vue';
    
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
            'circle-shape': Circle
        },
        props: {
            imageSource: {
                type: String,
                required: true
            },
            tile: {
                type: String,
                required: true
            },
            correctComponent: {
                type: String,
                required: true
            }
        },
        methods: {
            getImg(pic){
                return require('../../assets/shapes/'+pic);
            },
            droppedInside(){
                let id = new Date().getTime();
                this.$store.commit("addElementInsideCanvas", {
                    name: this.correctComponent,
                    id,
                    props: {
                        type: "shape"
                    },
                    styles: {
                        background: "transparent",
                        opacity: 1
                    }
                }, {module: "main"});
            },
            upIndex(e){
                console.log(e.currentTarget);
                e.currentTarget.classList.add('activeEl');
            },
            downIndex(e){
                e.currentTarget.classList.remove('activeEl');
            }
        }
    }
</script>

<style scoped>
    .shapeWrapper{
        transition: background 0.5s;
        text-align: center;
        position: relative;
        z-index: 1;
        user-select: none;
        box-sizing: border-box;
        float: left;
        width: 47.5%;
        margin: 4px;
    }

    .shapeWrapper:before{
        content: "";
        display: block;
        padding-top: 100%;
    }

    .inside_draggable{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .shapeImage{
        height: 50px;
        width: 50px;
    }

    .tile{
        font-weight: bold;
        text-transform: uppercase;
        font-size: 1em;
    }

    .can-drop{
        background: rgba(45, 236, 20, 0.829) !important;
    }

    .activeEl{
        z-index: 10;
    }
</style>
