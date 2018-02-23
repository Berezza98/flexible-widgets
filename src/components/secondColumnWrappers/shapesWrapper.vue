<template>
    <div class="shapes">
      <shape-button v-for="(shape, index) in correctShapes" :key="index" :imageSource="shape.src" :tile="shape.name"></shape-button>
    </div>
</template>

<script>
    import interact from 'interactjs';
    import ShapeButton from '../buttons/shapeButton.vue';

    export default{
        data(){
            return{
                shapes: [
                    {
                        name: "rectangle",
                        src: "rectangle.png"
                    },
                    {
                        name: "square",
                        src: "square.png"
                    },
                    {
                        name: "ellipse",
                        src: "ellipse.png"
                    },
                    {
                        name: "circle",
                        src: "circle.png"
                    }
                ]
            }
        },
        components: {
            'shape-button': ShapeButton
        },
        methods: {

        },
        computed: {
            correctShapes(){
                return this.shapes.filter(shape => {
                    if(shape.name.toLowerCase().indexOf(this.$store.state.searchingData.toLowerCase()) !== -1){
                        return true;
                    }else{
                        return false;
                    }
                });
            }
        },
        created(){
            interact('.shapeWrapper')
            .draggable({
                // keep the element within the area of it's parent
                restrict: {
                },
                // enable autoScroll
                autoScroll: true,

                // call this function on every dragmove event
                onmove: dragMoveListener,
                // call this function on every dragend event
                onend: function (event) {
                }
            });

            function dragMoveListener (event) {
                var target = event.target,
                    // keep the dragged position in the data-x/data-y attributes
                    x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                    y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // translate the element
                target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';

                // update the posiion attributes
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }

            interact('.shapeWrapper')
            .resizable({
                // resize from all edges and corners
                edges: { left: true, right: true, bottom: true, top: true },

                // keep the edges inside the parent
                restrictEdges: {
                outer: 'parent',
                endOnly: true,
                },

                // minimum size
                restrictSize: {
                min: { width: 100, height: 50 },
                },
            })
            .on('resizemove', function (event) {
                var target = event.target,
                    x = (parseFloat(target.getAttribute('data-x')) || 0),
                    y = (parseFloat(target.getAttribute('data-y')) || 0);

                // update the element's style
                target.style.width  = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                // translate when resizing from top or left edges
                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            });

        }
    }
</script>

<style scoped>
    .shapes{
        height: calc(100% - 100px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;
        /* overflow-y: auto;
        overflow-x: hidden; */
    }

    .searchWrap{
        height: 100%;
    }
</style>
