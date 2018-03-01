export default {
    state: {
        searchingData: "", //FOR SEARCH COMPONENT
        currentOrientation: "",
        readyForCreateWidget: false,
        currentScale: 1,
        draggableInsideCanvas: [{id: 1519896654142, name:"text-block", props: {x: 138, y: 94, height: 100, width: 200, textValue: "Hello from data"}, styles: {background: "#bfbfe7", opacity: 1}},
        {id: 1519898211903, name:"circle-block", props: {x: 400, y: 124, height: 310, width: 366}, styles: {background: "#000001", opacity: 1}}],
        currentActiveElement: 0
    },
    getters: {
        getOrientation(state){
            return state.currentOrientation;
        },
        getActiveElement(state){
            return getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
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
            state.draggableInsideCanvas.push(obj);
        },
        deleteElementFromCanvas(state){
            let index = state.draggableInsideCanvas.findIndex((element, index, array) => {
                if(element.id === state.currentActiveElement){
                    return true;
                }else{
                   return false; 
                }
            });

            state.draggableInsideCanvas.splice(index, 1);
        },
        changeCurrentActiveElement(state, id){
            state.currentActiveElement = id;
        },
        changeWidthOfActiveElement(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.width = value;
        },
        changeHeightOfActiveElement(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.height = value;
        },
        changeXOfActiveElement(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.x = value;
        },
        changeYOfActiveElement(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.y = value;
        },
        changeBackground(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles.background = value;
        },
        changeOpacity(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles.opacity = value;
        },
        changeInputText(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.textValue = value;
        }
        
    }
};

function getActiveElement(elements, id){
    let active = elements.find((element) => {
        if(element.id === id){
            return true;
        }
    });

    return active;
}