<template>
    <transition name="fade">
        <div class="popover" :style="styles">
            <div class="triangle"></div>
            <slot></slot>
        </div>
    </transition>
</template>

<script>
export default {
    data(){
        return {
            styles: {
                width: parseInt(this.width) + "px",
                left: (- parseInt(this.width) / 2) + 25 + "px"
            }
        }
    },
    methods: {

    },
    computed: {

    },
    props: {
        width: {
            default: "150",
            type: String,
            required: false
        }
    }
}
</script>

<style scoped>
    .popover{
        position: absolute;
        background: #fff;
        border: 1px solid #ebeef5;
        padding: 8px;
        z-index: 2000;
        color: #606266;
        line-height: 1.4;
        text-align: justify;
        font-size: 14px;
        top: 50px;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border-radius: 4px;
    }

    .triangle {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
        border-width: 6px;
        margin-right: 3px;
        border-top-width: 0;
        border-bottom-color: #ebeef5;
        top: -6px;
        left: calc(50% - 6px);
    }

    .triangle::after{
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #fff;
        content: " ";
        border-width: 6px;
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border-color: transparent;
        border-style: solid;
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .1s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
