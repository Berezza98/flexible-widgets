<template>
    <div class="ruler_wrapper">
        <canvas id="topRuler" :width="orientation === 'landscape' ? 1920 : 1080" :height="50"></canvas>
        <canvas id="leftRuler" :width="50" :height="orientation === 'landscape' ? 1080 + 52 : 1920 + 52"></canvas>
    </div>
</template>

<script>
import { eventBus } from '../../main.js';

export default {
    data(){
        return {
            canvas: null,
            topRuler: null,
            leftRuler: null,
            canvasDimensios: null,
            orientation: this.$store.state.main.currentOrientation
        }
    },
    methods: {
        createTopRuler(){
            let context = this.topRuler.getContext('2d');

            context.clearRect(0, 0, this.topRuler.width, this.topRuler.height);

            let pointCountBig = this.orientation === 'landscape' ? 192 : 180;
            let pointCountLittle = this.orientation === 'landscape' ? 96 : 90;

            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = '#e3e3e3';
            // context.font = '10px serif';

            for(let i = 0; i <= this.canvasDimensios.width * 2; i+=pointCountBig){
                if(i === 0 || i === this.canvasDimensios.width * 2){
                    continue;
                }
                context.moveTo(i, 10);
                context.lineTo(i,50);
                // context.fillText(i.toString(), i - 6, 7);
            }
            for(let i = 0; i <= this.canvasDimensios.width * 2; i+=pointCountLittle){
                if(i % 192 !== 0){
                    context.moveTo(i, 25);
                    context.lineTo(i,50);
                }

            }
            context.stroke();
        },
        createLeftRuler(){
            let context = this.leftRuler.getContext('2d');

            context.clearRect(0, 0, this.leftRuler.width, this.leftRuler.height);

            let pointCountBig = this.orientation === 'landscape' ? 180 : 192;
            let pointCountLittle = this.orientation === 'landscape' ? 90 : 96;

            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = '#e3e3e3';
            // context.font = '10px serif';
            for(let i = 2; i <= this.canvasDimensios.height * 2; i+=pointCountBig){
                if(i === 2 || i === this.canvasDimensios.height * 2){
                    continue;
                }
                context.moveTo(10, i + 50);
                context.lineTo(50, i + 50);
                // context.fillText(i.toString(), i - 6, 7);
            }
            for(let i = 2; i <= this.canvasDimensios.height * 2; i+=pointCountLittle){
                if(i === 2){
                    continue;
                }
                if(i % 182 !== 0){
                    context.moveTo(25, i + 50);
                    context.lineTo(50, i + 50);
                }

            }
            context.stroke();
        },
        createTopPoint(point){
            let context = this.topRuler.getContext('2d');

            context.beginPath();
            context.lineWidth = 6;
            context.strokeStyle = '#b3d8ff';
            context.moveTo(point, 0);
            context.lineTo(point,50);
            context.stroke();
        },

        createLeftPoint(point){
            let context = this.leftRuler.getContext('2d');

            context.beginPath();
            context.lineWidth = 6;
            context.strokeStyle = '#b3d8ff';
            context.moveTo(0, point);
            context.lineTo(50, point);
            context.stroke();
        }
    },
    computed: {

    },
    created(){
        let that = this;
        eventBus.$on('changeRulerPosition', function({top, left, top1, left1, close}){
            if(close && close === true){
                that.createTopRuler();
                that.createLeftRuler();
            }else{
                that.createTopRuler();
                that.createLeftRuler();
                that.createTopPoint(left);
                that.createLeftPoint(top);
                that.createTopPoint(left1);
                that.createLeftPoint(top1);
            }
        })
    },
    mounted(){
        this.canvas = this.$el.parentElement;
        this.canvasDimensios = document.querySelector('.ruler_wrapper').getBoundingClientRect();
        this.topRuler = document.querySelector('#topRuler');
        this.leftRuler = document.querySelector('#leftRuler');

        this.createTopRuler();
        this.createLeftRuler();
    }
}
</script>

<style scoped>

    .ruler_wrapper{
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0px;
        top: 0px;
        z-index: -99999999999999;
    }

    #topRuler{
        position: absolute;
        top: -54px;
        left: 0px;
        border-top: 2px solid #dadada;
        border-right: 2px solid #dadada;
    }

    #leftRuler{
        position: absolute;
        bottom: -2px;
        left: -52px;
        border-left: 2px solid #dadada;
        border-top: 2px solid #dadada;
        border-bottom: 2px solid #dadada;
    }

</style>
