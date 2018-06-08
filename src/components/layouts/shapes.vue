<template>
    <div class="shapes_wrapper">
        <shape v-for="shape in shapes" :key="shape.id" :src="shape.src" :tile="shape.name" :correct-component="shape.component"></shape>
    </div>
</template>

<script>
import Shape from '../buttons/draggableShape.vue';

import Shapes from '../../data/shapes.js';

export default {
    data(){
        return {
            shapes: Shapes
        }
    },
    components: {
        shape: Shape
    }
}
</script>

<style scoped>
    .shapes_wrapper{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
    }
</style>
