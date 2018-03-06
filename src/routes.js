import TextWrapper from './components/secondColumnWrappers/textWrapper.vue';
import ImagesWrapper from './components/secondColumnWrappers/imagesWrapper.vue';
import ShapesWrapper from './components/secondColumnWrappers/shapesWrapper.vue';
import TemplatesWrapper from './components/secondColumnWrappers/templatesWrapper.vue';

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
        component: TemplatesWrapper
    }
]