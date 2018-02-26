<template>
    <div id="pips-range-vertical-rtl"></div>
</template>

<script>
import noUiSlider from 'nouislider';

export default {
    data(){
        return{
            
        }
    },
    computed: {
        currentScale(){
            return this.$store.state.currentScale
        }
    },
    mounted(){
        let slider = document.querySelector('#pips-range-vertical-rtl');
        noUiSlider.create(slider, {
            range: {
                'min': 1,
                'max': 3
            },
            start: this.currentScale,
            orientation: 'vertical',
            direction: 'rtl',
            pips: {
                mode: 'steps',
                density: 20
            }
        });

        slider.noUiSlider.on('update', (value) => {
            this.$store.commit('changeScale', value[0])
        });
    }
}
</script>

<style scoped>
    @import "~nouislider/distribute/nouislider.min.css";

    #pips-range-vertical-rtl{
        width: 20px;
        height: 600px;
        position: absolute;
        position: absolute;
        top: 30%;
        right: 50px;
    }
</style>
