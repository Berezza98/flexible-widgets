<template>
  <div class="secondColumnButton">
        <h2 class="buttonName">{{tile}}</h2>
        <text-interactive></text-interactive>
  </div>
</template>

<script>
    import Text from '../layoutElements/text.vue';

    import interact from 'interactjs';

    export default{
        data(){
            return{

            }
        },
        components: {
            'text-interactive': Text
        },
        props: {
            tile: {
                type: String,
                required: true
            }
        },
        created(){
            let startPositions = null;
            interact('.secondColumnButton')
            .draggable({
                restrict: {
                    restriction: "#app"
                },
                autoScroll: false,
                onmove: dragMoveListener,
                onend(event){
                    let container = document.querySelector('.textWrapper');
                    container.classList.remove('hideOverflow');
                    let {x, y} = startPositions;
                    event.target.style.webkitTransform = event.target.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
                    event.target.setAttribute('data-x', x);
                    event.target.setAttribute('data-y', y);
                    event.target.classList.remove('can-drop');
                },
                onstart(event){
                    let container = document.querySelector('.textWrapper');
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
    .secondColumnButton{
        width: 95%;
        height: 100px;
        flex-basis: 100px;
        box-sizing: border-box;
        border: 1px dotted black;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.3);
        transition: background 0.5s;
        flex-shrink: 0;
        position: relative;
        z-index: 1;
    }

    .secondColumnButton:hover{
        background: rgba(0, 0, 0, 0.5);
    }

    .buttonName{
        font-size: 30px;
    }

    .can-drop{
        background: rgba(45, 236, 20, 0.829) !important;
    }
</style>
