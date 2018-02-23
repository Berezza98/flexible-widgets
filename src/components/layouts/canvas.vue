<template>
  <div :class="typeOfCanvas === 'portrait' ? 'canvas portrait' : 'canvas landscape'">

  </div>
</template>

<script>
    import interact from 'interactjs';

    export default{
        data(){
            return{

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
                accept: '.shapeWrapper',
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
                    let currentElementClone = event.relatedTarget.querySelector('.shape').cloneNode(true);
                    console.log(currentElementClone.style);
                    droppableZone.appendChild(currentElementClone);
                    currentElementClone.style.webkitTransform = currentElementClone.style.transform = 'translate(' + correctPosition.x + 'px,' + correctPosition.y + 'px)';
                }
            });
        }
    }
</script>

<style scoped>
    .canvas{
        background: white;
        margin: auto;
        overflow: hidden;
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
