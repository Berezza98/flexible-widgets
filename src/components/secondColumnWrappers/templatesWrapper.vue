<template>
    <div class="templates">
        <template-block v-for="(tempalate, index) in correctTemplates" :templObj="tempalate" :key="index"></template-block>
    </div>
</template>

<script>
    import Template from '../buttons/templateButton.vue';

    export default{
        data(){
            return{
                templates: []
            }
        },
        components: {
            'template-block': Template
        },
        computed: {
            correctTemplates(){
                return this.templates.filter(template => {
                    if(template.name.toLowerCase().indexOf(this.$store.state.main.searchingData.toLowerCase()) !== -1){
                        return true;
                    }else{
                        return false;
                    }
                });
            }
        },
        created(){
            this.$http.get('http://localhost:3300/getTemplates').then(({body}) => {
                this.templates = body.templates.map(templ => JSON.parse(templ));
            });
        }
    }
</script>

<style scoped>
    .templates{
        height: calc(100% - 100px);
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 10px;
        box-sizing: border-box;
        overflow-y: scroll;
    }
</style>
