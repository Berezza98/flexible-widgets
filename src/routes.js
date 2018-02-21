import TextWrapper from './components/secondColumnWrappers/TextWrapper.vue';
import ImagesWrapper from './components/secondColumnWrappers/ImagesWrapper.vue';
import ShapesWrapper from './components/secondColumnWrappers/ShapesWrapper.vue';

export default [
    {
        path: "/",
        component: TextWrapper
    },
    {
        path: "/pictures",
        component: ImagesWrapper
    },
    {
        path: "/shapes",
        component: ShapesWrapper
    },
    {
        path: "/templates",
        component: TextWrapper
    }
]