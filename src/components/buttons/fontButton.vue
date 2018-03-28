<template>
  <div class="textButton">
        <draggable :return-to-start-position="true" :hideOverflow="'.textWrapper'" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <el-card class="inside_draggable" :body-style="bodyStyles">
                <h2 class="buttonName">{{tile}}</h2>
                <div class="arrows">
                    <i class="el-icon-d-arrow-right arrow"></i>
                </div>
            </el-card>
        </draggable>
  </div>
</template>

<script>
    import Text from '../layoutElements/text.vue';

    export default{
        data(){
            return{
                bodyStyles: {
                    "display": "flex",
                    "justify-content": "space-between",
                    "align-items": "center"
                }
            }
        },
        components: {
            'text-interactive': Text
        },
        methods: {
            droppedInside(x, y){
                let id = new Date().getTime();
                this.$store.commit("addElementInsideCanvas", {
                    name: 'text-block',
                    id,
                    props: {
                        type: "text",
                        textValue: "Here will be your text",
                        x,
                        y,
                        z : 1,
                        width: 200,
                        height: 100
                    },
                    styles: {
                        background: "rgba(19, 206, 102, 0)",
                        opacity: 1,
                        color: "rgba(0, 0, 0, 1)",
                        'font-family': this.tile,
                        'font-size': "20px",
                        'font-weight': "normal",
                        'font-style': "normal",
                        'text-decoration': "none",
                        'text-align': "left",
                        'align-items': "flex-start"
                    }
                }, {module: "main"});
            }
        },
        props: {
            tile: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .textButton{
        width: 95%;
        height: 80px;
        box-sizing: border-box;
        border-radius: 4px;
        margin-bottom: 10px;
        transition: background 0.5s;
        flex-shrink: 0;
        position: relative;
        user-select: none;
    }

    .inside_draggable{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
    }

    .arrow{
        color: #1989fa;
        font-size: 2em;
        font-weight: 900;
    }

    .buttonName{
        font-size: 30px;
        margin: 0;
    }

    .can-drop{
        background: rgba(45, 236, 20, 0.829) !important;
    }
</style>
