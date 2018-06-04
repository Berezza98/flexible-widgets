export default {
    state: {
        searchingData: "", //FOR SEARCH COMPONENT 
        availableFonts: [],
        currentOrientation: "",
        readyForCreateWidget: false,
        currentScale: 1,
        draggableInsideCanvas: [],
        currentActiveElement: 0,
        templateName: "",
        orientationWasSelected: false,
        tempOrientation: "",
        showInstructions: true,
        prevArr: []
    },
    getters: {
        getOrientation(state){
            return state.currentOrientation;
        },
        getActiveElement(state){
            return getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
        },
        getAllElements(state){
            return state.draggableInsideCanvas;
        },
        getElementsDimentionAndPosition: (state) => (id) => {
            let element = getElementByID(state.draggableInsideCanvas, id);
            return element;
        }
    },
    mutations: {
        changeSearchingData(state, value){
            state.searchingData = value;
        },
        hideInstructions(state){
            state.showInstructions = false;
        },
        selectTemplate(state, value){
            state.draggableInsideCanvas = value;
        },
        changeTemplateName(state, value){
            state.templateName = value;
        },
        changeIdOfElements(state){
            state.draggableInsideCanvas.map(el => {
                el.id += new Date().valueOf();
                return el;
            });
        },
        changeAvailableFonts(state, value){
            state.availableFonts = value;
        },
        changeOrientation(state, value){
            state.currentOrientation = value;
            state.orientationWasSelected = true;
        },
        changeTempOrientation(state, value){
            state.tempOrientation = state.currentOrientation;
        },
        createWidget(state){
            state.readyForCreateWidget = true;
        },
        changeScale(state, value){
            state.currentScale = value;
        },
        createCopyOfElement(state, obj){
            setPreviousValue(state);
            let id = new Date().getTime();

            obj.id = id;
            obj.props.x = 0;
            obj.props.y = 0;

            state.draggableInsideCanvas.push(obj);
        },
        // WORK WITH ELEMENTS
        addElementInsideCanvas(state, obj){
            setPreviousValue(state);
            state.draggableInsideCanvas.push(obj);
        },
        deleteElementFromCanvas(state){
            setPreviousValue(state);
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
        changeDimentionsOfElement(state, value){
            if(value.saveState){
                setPreviousValue(state);
            }
            let element = getElementByID(state.draggableInsideCanvas, value.id);
            element.props.width = value.w;
            element.props.height = value.h;
        },
        changePositionOfElement(state, value){
            if(value.saveState){
                setPreviousValue(state);
            }
            let element = getElementByID(state.draggableInsideCanvas, value.id);
            element.props.x = value.x;
            element.props.y = value.y;
        },
        rotateElement(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            let width = element.props.width;
            let height = element.props.height;

            element.props.width = height;
            element.props.height = width;
        },
        changeImageSource(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.imageSource = value;
        },
        changeBackground(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles.background = value;
        },
        changeColor(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles.color = value;
        },
        changeOpacity(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles.opacity = value;
        },
        changeZIndex(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            console.log(element.id, value);
            element.props.z = value;
        },
        changeInputText(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.props.textValue = value;
        },
        changeFontFamily(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles['font-family'] = value;
        },
        changeFontSize(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles['line-height'] = value;
            element.styles['font-size'] = value;
        },
        underline(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            let textDecoration = value === true ? 'underline' : 'none';
            element.styles['text-decoration'] = textDecoration;
        },
        textBold(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            let bold = value === true ? 'bold' : 'normal';
            element.styles['font-weight'] = bold;
        },
        textItalic(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            let italic = value === true ? 'italic' : 'normal';
            element.styles['font-style'] = italic;
        },
        textAlign(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles['text-align'] = value;
        },
        verticalAlign(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            element.styles['align-items'] = value;
        },
        rotateLine(state, value){
            let element = getElementByID(state.draggableInsideCanvas, value.id);
            element.props.rotated = value.rotation
        },
        undo(state){
            state.draggableInsideCanvas = state.prevArr[state.prevArr.length - 1];
            state.prevArr.pop();
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

function getElementByID(elements, id){
    let elem = elements.find((element) => {
        if(element.id === id){
            return true;
        }
    });

    return elem;
}

function setPreviousValue(state){
    if(state.prevArr.length > 20){
        state.prevArr.shift();
    }
    state.prevArr.push(JSON.parse(JSON.stringify(state.draggableInsideCanvas)));
}