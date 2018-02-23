<template>
  <div class="thirdColumn">

  </div>
</template>

<script>
    import interact from 'interactjs';

    export default{
        components: {
            
        },
        created(){
            interact('.thirdColumn').dropzone({
                accept: '.shapeWrapper',
                overlap: 0.3,
                ondropactivate: function (event) {
                    event.target.classList.add('drop-active');
                },
                ondragenter: function (event) {
                    var draggableElement = event.relatedTarget,
                    dropzoneElement = event.target;
                    dropzoneElement.classList.add('drop-target');
                    draggableElement.classList.add('can-drop');
                },
                ondragleave: function (event) {
                    event.target.classList.remove('drop-target');
                    event.relatedTarget.classList.remove('can-drop');
                },
                ondrop: function (event) {
                    console.log('dropped');
                },
                ondropdeactivate: function (event){
                    event.target.classList.remove('drop-active');
                    event.target.classList.remove('drop-target');
                }
            });
        }
    }
</script>

<style scoped>
    .thirdColumn{
        width: 65%;
        height: 100%;
        background: rgb(137, 141, 143)
    }
</style>

