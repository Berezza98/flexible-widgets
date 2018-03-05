<template>
    <div class="shapeWrapper">
        <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <div class="inside_draggable">
                <img draggable="false" class="shapeImage" :src="getImg(imageSource)">
                <h2 class="tile">{{tile}}</h2>
            </div>
        </draggable>
    </div>
</template>

<script>
    import Rectangle from '../layoutElements/rectangle.vue';
    import Circle from '../layoutElements/circle.vue';
    
    export default{
        data(){
            return{

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
            }
        }
    }
</script>

<style scoped>
    .shapeWrapper{
        background: rgba(0, 0, 0, 0.3);
        height: 200px;
        width: 95%;
        margin-bottom: 10px;
        flex-shrink: 0;
        transition: background 0.5s;
        text-align: center;
        position: relative;
        z-index: 1;
        user-select: none;
    }

    .inside_draggable{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px dotted black;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }

    .shapeWrapper:hover{
        background: rgba(0, 0, 0, 0.5);
    }

    .shapeImage{
        height: 100px;
        width: 100px;
    }

    .tile{
        font-weight: bold;
        text-transform: uppercase;
    }

    .can-drop{
        background: rgba(45, 236, 20, 0.829) !important;
    }
</style>
