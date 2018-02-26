<template>
    <img class="image elementToClone" :src="imageSource">
</template>

<script>
    import interact from 'interactjs';

    export default{
        data(){
            return{

            }
        },
        props: {
            imageSource: {
                type: String,
                required: true
            }
        },
        methods: {

        },
        created(){
            interact('.image')
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
    .elementToClone{
        display: none;
    }

    .canvas .elementToClone{
        display: block;
    }

    .image{
        height: 300px;
        width: 300px;
    }

    .image.active{
        border: 2px dotted black;
    }
</style>
