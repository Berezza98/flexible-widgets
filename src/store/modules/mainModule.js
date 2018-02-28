export default {
    state: {
        searchingData: "", //FOR SEARCH COMPONENT
        currentOrientation: "",
        readyForCreateWidget: false,
        currentScale: 1,
        draggableInsideCanvas: [],
        currentActiveElement: 0
    },
    getters: {
        getOrientation(state){
            return state.currentOrientation;
        }
    },
    mutations: {
        changeSearchingData(state, value){
            state.searchingData = value;
        },
        changeOrientation(state, value){
            state.currentOrientation = value;
        },
        createWidget(state){
            state.readyForCreateWidget = true;
        },
        changeScale(state, value){
            state.currentScale = value;
        },
        addElementInsideCanvas(state, obj){
            obj.id = new Date().getTime();
            state.draggableInsideCanvas.push(obj);
        },
        deleteElementFromCanvas(state, id){
            let index = state.draggableInsideCanvas.findIndex((element, index, array) => {
                if(element.id === id){
                    return true;
                }else{
                   return false; 
                }
            });

            state.draggableInsideCanvas.splice(index, 1);
        },
        changeCurrentActiveElement(state, id){
            state.currentActiveElement = id;
        }
    }
};