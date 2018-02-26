<template>
    <div class="canvas_wrapper">
        <div :class="typeOfCanvas === 'portrait' ? 'canvas portrait' : 'canvas landscape'" :style="'transform: scale('+ currentScale +');'"></div>
    </div> 
</template>

<script>
    import interact from 'interactjs';
    // <!-'transform: scale('+ currentScale +');'-> :style="'width: '+ 960*currentScale + 'px; ' + 'height: '+ 540*currentScale + 'px; '"
    export default{
        data(){
            return{

            }
        },
        computed: {
            currentScale(){
                return this.$store.state.currentScale;
            }
        },
        props: {
            typeOfCanvas: {
                type: String,
                required: true
            }
        },
        created(){
            interact('.canvas').dropzone({
                accept: '.shapeWrapper, .secondColumnButton, .image_template',
                overlap: 1,
                ondropactivate: function (event) {
                    event.target.classList.add('drop-active');
                },
                ondragenter: function (event) {
                    let draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;
                    draggableElement.classList.add('can-drop');
                },
                ondragleave: function (event) {
                    event.relatedTarget.classList.remove('can-drop');
                },
                ondrop: function (event) {
                    console.log(event);
                    let positionOfCanvas = document.querySelector('.canvas').getBoundingClientRect();
                    let positionOfElement = event.relatedTarget.getBoundingClientRect();

                    console.log(positionOfCanvas,positionOfElement);
                    let correctPosition = {
                        x: event.dragEvent.clientX - positionOfCanvas.left,
                        y: event.dragEvent.clientY - positionOfCanvas.top
                    };
                    console.log(correctPosition);
                    let droppableZone = document.querySelector('.canvas');
                    let currentElementClone = event.relatedTarget.querySelector('.elementToClone').cloneNode(true);
                    console.log(currentElementClone.style);
                    currentElementClone.setAttribute("data-x", correctPosition.x);
                    currentElementClone.setAttribute("data-y", correctPosition.y);
                    droppableZone.appendChild(currentElementClone);
                    currentElementClone.style.webkitTransform = currentElementClone.style.transform = 'translate(' + correctPosition.x + 'px,' + correctPosition.y + 'px)';
                }
            });
        }
    }
</script>

<style scoped>
    .canvas_wrapper{
        height: 100%;
        width: 100%;
        overflow: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .canvas{
        background: white;
        overflow: hidden;
        transform-origin: 0 0;
        position: relative;
        margin: 100px;
    }

    .portrait{
        height: 960px;
        width: 540px;
    }

    .landscape{
        width: 960px;
        height: 540px;
    }
</style>
