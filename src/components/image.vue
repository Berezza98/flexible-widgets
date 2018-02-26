<template>
  <div class="image_template">
        <img class="innerImage" :src="imageSource">
        <image-block :imageSource="imageSource"></image-block>
  </div>
</template>

<script>
    import ImageBlock from './layoutElements/imageBlock.vue';

    import interact from 'interactjs';

    export default{
        data(){
            return{

            }
        },
        components: {
            'image-block': ImageBlock
        },
        methods: {

        },
        props: {
            imageSource: {
                type: String,
                required: true
            }
        },
        created(){
            let startPositions = null;
            interact('.image_template')
            .draggable({
                restrict: {
                    restriction: "#app"
                },
                autoScroll: false,
                onmove: dragMoveListener,
                onend(event){
                    let container = document.querySelector('.images');
                    container.classList.remove('hideOverflow');
                    let {x, y} = startPositions;
                    event.target.style.webkitTransform = event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    event.target.setAttribute('data-x', x);
                    event.target.setAttribute('data-y', y);
                    event.target.classList.remove('can-drop');
                },
                onstart(event){
                    let container = document.querySelector('.images');
                    container.classList.add('hideOverflow');
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
    .image_template{
        width: 95%;
        height: 300px;
        margin-bottom: 10px;
        position: relative;
        z-index: 1;
    }

    .innerImage{
        height: 100%;
        width: 100%;
    }

    .can-drop{
        border: 4px solid rgba(45, 236, 20, 0.829) !important;
    }
</style>
