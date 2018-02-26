<template>
    <div class="shapeWrapper">
        <img class="shapeImage" :src="getImg(imageSource)">
        <h2 class="tile">{{tile}}</h2>
        <component :is="correctComponent"></component>
    </div>
</template>

<script>
    import Rectangle from '../layoutElements/rectangle.vue';
    import Circle from '../layoutElements/circle.vue';


    import interact from 'interactjs';
    
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
                return require('../../assets/shapes/'+pic)
            }
        },
        created(){
            let startPositions = null;
            interact('.shapeWrapper')
            .draggable({
                restrict: {
                    restriction: "#app"
                },
                autoScroll: false,
                onmove: dragMoveListener,
                onend(event){
                    console.log(event);
                    let {x, y} = startPositions;
                    event.target.style.webkitTransform = event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    event.target.setAttribute('data-x', x);
                    event.target.setAttribute('data-y', y);
                    event.target.classList.remove('can-drop');
                },
                onstart(event){
                    startPositions = {
                        x: event.dx,
                        y: event.dy
                    };
                }
            });

            function dragMoveListener(event) {
                let target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    }
</script>

<style scoped>
    .shapeWrapper{
        border: 2px dotted black;
        background: rgba(0, 0, 0, 0.3);
        height: 200px;
        width: 95%;
        margin-bottom: 10px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        transition: background 0.5s;
        text-align: center;
        position: relative;
        z-index: 1;
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
