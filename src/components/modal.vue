<template>
    <transition name="fade">
        <div class="mask" @click.stop="close">
            <div class="modal" @click.stop="notClose">
                <label for="name">name:</label>
                <input id="name" type="text" v-model="name">
                <button @click="save">save</button>
            </div>
        </div>
    </transition>
</template>

<script>
    import html2canvas from 'html2canvas';

    export default{
        data(){
            return{
                name: ""
            }
        },
        methods: {
            close(){
                this.$emit('closeModal');
            },
            notClose(){
                return;
            },
            save(){
                html2canvas(document.querySelector(".canvas"), {allowTaint : true}).then(canvas => {
                    this.$store.commit('changeIdOfElements', {module: "main"});
                    return {
                        image: canvas.toDataURL(),
                        name: this.name,
                        data: this.$store.state.main.draggableInsideCanvas
                    }
                }).then((obj) => {
                    return this.$http.post('http://localhost:3300/setTemplate', obj);
                }).then(() => {
                    this.$store.commit('selectTemplate', [] , {module: "main"});
                    this.$emit('closeModal');
                });
            }
        }
    }
</script>

<style scoped>
    .mask{
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 4;
        top: 0px;
        left: 0px;
        background: rgba(0,0,0,0.7);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal{
        height: 500px;
        width: 700px;
        background: azure;
        font-size: 30px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    button{
        height: 50px;
        width: 100px;
        margin-top: 30px;
    }

    input{
        width: 200px;
        height: 30px;
        font-size: 20px;
    }

    .fade-enter-active, .fade-leave-active{
        transition: opacity .8s;
    }
    .fade-enter, .fade-leave-to{
        opacity: 0;
    }
</style>
