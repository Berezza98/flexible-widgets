export default {
    state: {
        searchingData: "", //FOR SEARCH COMPONENT
        availableFonts: [],
        currentOrientation: "",
        readyForCreateWidget: false,
        currentScale: 1,
        draggableInsideCanvas: [
            {
            id: 1519896654142, 
            name:"text-block", 
            props: {
                x: 138, 
                y: 94, 
                height: 100, 
                width: 200, 
                textValue: "Hello from data"
            }, 
            styles: {
                background: "#bfbfe7", 
                opacity: 1, 
                color: "#000000", 
                'font-family': 'cursive', 
                'font-size': '22px', 
                'font-weight': "normal", 
                'font-style': "normal", 
                'text-decoration': "none"
            }
        },
        {
            id: 1519898211903, 
            name:"circle-block", 
            props: {
                x: 400, 
                y: 124, 
                height: 310, 
                width: 366
            }, styles: {
                background: "#000001", 
                opacity: 1
            }
        }
    ],
        currentActiveElement: 0,
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
        changeAvailableFonts(state, value){
            state.availableFonts = value;
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
        // WORK WITH ELEMENTS
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
        changeColor(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles.color = value;
        },
        changeOpacity(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles.opacity = value;
        },
        changeInputText(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.textValue = value;
        },
        changeFontFamily(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles['font-family'] = value;
        },
        changeFontSize(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles['font-size'] = value;
        },
        underline(state, value){
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            let textDecoration = value === true ? 'underline' : 'none';
            element.styles['text-decoration'] = textDecoration;
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