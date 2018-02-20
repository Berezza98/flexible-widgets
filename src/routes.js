import TextWrapper from './components/secondColumnWrappers/TextWrapper.vue';
import ImagesWrapper from './components/secondColumnWrappers/ImagesWrapper.vue';

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
        component: TextWrapper
    },
    {
        path: "/templates",
        component: TextWrapper
    }
]