<template>
  <div class="textButton">
        <draggable :return-to-start-position="true" :setParentSizes="true" :z="2" :drop-zone="'.canvas'" :resizable="false" @dropInside="droppedInside">
            <div class="inside_draggable">
                <h2 class="buttonName">{{tile}}</h2>
            </div>
        </draggable>
  </div>
</template>

<script>
    import Text from '../layoutElements/text.vue';

    export default{
        data(){
            return{

            }
        },
        components: {
            'text-interactive': Text
        },
        methods: {
            droppedInside(){
                let id = new Date().getTime();
                this.$store.commit("addElementInsideCanvas", {
                    name: 'text-block',
                    id,
                    props: {
                        textValue: "Here will be your text"
                    },
                    styles: {
                        background: "#ffffff",
                        opacity: 1,
                        color: "#000000",
                        'font-family': this.tile,
                        'font-size': "20px",
                        'font-weight': "normal",
                        'font-style': "normal",
                        'text-decoration': "none"
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
        height: 100px;
        box-sizing: border-box;
        margin-bottom: 10px;
        background: rgba(0, 0, 0, 0.3);
        transition: background 0.5s;
        flex-shrink: 0;
        position: relative;
        user-select: none;
    }

    .inside_draggable{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 2px dotted black;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .textButton:hover{
        background: rgba(0, 0, 0, 0.5);
    }

    .buttonName{
        font-size: 30px;
    }

    .can-drop{
        background: rgba(45, 236, 20, 0.829) !important;
    }
</style>
