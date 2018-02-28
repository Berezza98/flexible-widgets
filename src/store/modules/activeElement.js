export default {
    state: {
        backgroundColor: "transparent",
        opacity: 1
    },
    getters: {
        
    },
    mutations: {
        changeBackgroundColor(state, value){
            state.backgroundColor = value;
        },
        changeOpacity(state, value){
            state.opacity = value;
        }
    }
}