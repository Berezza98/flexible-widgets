<template>
    <div class="ruler_wrapper">
        <canvas id="topRuler" :width="orientation === 'landscape' ? 1920 : 1080" :height="50"></canvas>
        <canvas id="leftRuler" :width="50" :height="orientation === 'landscape' ? 1080 + 52 : 1920 + 52"></canvas>
    </div>
</template>

<script>
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
            console.log("createTopRuler");
            let context = this.topRuler.getContext('2d');

            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = '#e3e3e3';
            // context.font = '10px serif';
            for(let i = 0; i <= this.canvasDimensios.width * 2; i+=192){
                if(i === 0 || i === this.canvasDimensios.width * 2){
                    continue;
                }
                context.moveTo(i, 10);
                context.lineTo(i,50);
                // context.fillText(i.toString(), i - 6, 7);
            }
            for(let i = 0; i <= this.canvasDimensios.width * 2; i+=96){
                if(i % 192 !== 0){
                    context.moveTo(i, 25);
                    context.lineTo(i,50);
                }

            }
            context.stroke();
        },
        createLeftRuler(){
            console.log("createLeftRuler");
            let context = this.leftRuler.getContext('2d');

            context.beginPath();
            context.lineWidth = 4;
            context.strokeStyle = '#e3e3e3';
            // context.font = '10px serif';
            for(let i = 2; i <= this.canvasDimensios.height * 2; i+=180){
                if(i === 2 || i === this.canvasDimensios.height * 2){
                    continue;
                }
                context.moveTo(10, i + 50);
                context.lineTo(50, i + 50);
                // context.fillText(i.toString(), i - 6, 7);
            }
            for(let i = 2; i <= this.canvasDimensios.height * 2; i+=90){
                if(i === 2){
                    continue;
                }
                if(i % 182 !== 0){
                    context.moveTo(25, i + 50);
                    context.lineTo(50, i + 50);
                }

            }
            context.stroke();
        }
    },
    computed: {

    },
    created(){
        
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
