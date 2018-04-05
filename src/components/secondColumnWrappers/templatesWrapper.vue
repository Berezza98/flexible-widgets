<template>
    <div class="templates" v-lazy-loading>
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
        asyncComputed: {
            correctTemplates(){
                let name = this.$store.state.main.searchingData.toLowerCase();
                if(name.trim()){
                    let result = [];
                    return this.$http.get(`http://localhost:3300/getTemplatesByName?name=${name}`).then(({body}) => body);
                }else{
                    return this.templates;
                }
            }
        },
        directives: {
            lazyLoading: {
                inserted: function (el, binding, vnode) {
                    let canLoad = true;
                    let heightForLoad = 450;
                    let that = vnode.context;
                    el.addEventListener('scroll', () => {
                        let currentTopScroll = el.scrollHeight - el.scrollTop - el.clientHeight;
                        if(canLoad && currentTopScroll < 100){
                            canLoad = false;
                            let elements = that.templates.length;
                            that.$http.get(`http://localhost:3300/getTemplates?page=${elements + 6}`).then(({body}) => {
                                that.templates = [...that.templates, ...body];
                                canLoad = true;
                            });
                        }
                    }, true);
                }
            }
        },
        created(){
            this.$http.get('http://localhost:3300/getTemplates?page=6').then(({body}) => {
                this.templates = body.map(templ => templ);
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
