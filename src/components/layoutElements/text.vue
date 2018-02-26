<template>
    <textarea class="textBlock elementToClone" type="text" v-model="inputText"></textarea>
</template>

<script>
    import interact from 'interactjs';

    export default {
        data(){
            return{
                inputText: ""
            }
        },
        created(){
            interact('.textBlock')
            .draggable({
                restrict: {
                    restriction: ".canvas"
                },
                autoScroll: false,
                onmove: dragMoveListener,
                onend(event){
                    event.target.classList.remove('active');
                    console.log(event);
                }
            }).resizable({
                squareResize: true,
                edges: { bottom: true, right: true},
            }).on('resizemove', function (event) {
                let target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0),
                y = (parseFloat(target.getAttribute('data-y')) || 0);

                target.style.width  = event.rect.width + 'px';
                target.style.height = event.rect.height + 'px';

                x += event.deltaRect.left;
                y += event.deltaRect.top;

                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px,' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            });

            function dragMoveListener(event) {
                let target = event.target,
                x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
                y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                target.classList.add('active');
                target.style.webkitTransform = target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';

                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    }
</script>

<style scoped>
    .textBlock{
        resize: none;
        border: none;
        font-size: 30px;
        background: lightblue;
    }

    .textBlock:hover{
        cursor: move;
    }

    .elementToClone{
        display: none;    
    }

    .canvas .elementToClone{
        display: block;    
    }
</style>
