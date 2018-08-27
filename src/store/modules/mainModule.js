export default {
    state: {
        hostURL: "",
        currentLanguage : "",
        permissions: {},
        editingTemplate: false,
        editingID: "",
        disableAllControls: false,
        searchingData: "", //FOR SEARCH COMPONENT 
        templateName: "",
        templateDuration: "",
        availableFonts: [],
        imageCategories: [],
        currentOrientation: "landscape",
        imageSelecting: false,
        templateSelecting: false,
        cropToolUsing: false,
        allImages: [],
        allTemplates: [],
        readyForCreateWidget: false,
        currentScale: 1,
        draggableInsideCanvas: [],
        currentActiveElement: 0,
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
        getElementByID: (state) => (id) => {
            let element = getElementByID(state.draggableInsideCanvas, id);
            return element;
        }
    },
    mutations: {
        changeHostURL(state, value){
            state.hostURL = value;
        },
        changeLanguage(state, value){
            state.currentLanguage = value;
        },
        disableControls(state, value){
            state.disableAllControls = value;
        },
        changeTemplateName(state, value){
            state.templateName = value;
        },
        changeTemplateDuration(state, value){
            state.templateDuration = value;
        },
        editTemplate(state, value){
            state.editingTemplate = value;
        },
        changeEditingID(state, value){
            state.editingID = value;
        },
        changePermissions(state, value){
            state.permissions = value;
        },
        changeSearchingData(state, value){
            state.searchingData = value;
        },
        changeImageCategories(state, value){
            state.imageCategories = [...state.imageCategories , ...value];
        },
        hideInstructions(state){
            state.showInstructions = false;
        },
        selectTemplate(state, value){
            state.draggableInsideCanvas = value;
        },
        changeIdOfElements(state){
            state.draggableInsideCanvas.map(el => {
                el.id += new Date().valueOf();
                return el;
            });
        },
        selectImage(state, value){
            state.imageSelecting = value;
        },
        selectingTemplate(state, value){
            state.templateSelecting = value;
        },
        cropToolOpen(state, value){
            state.cropToolUsing = value;
        },
        changeImages(state, value){
            state.allImages = value;
        },
        deleteImage(state, id){
            let images = state.allImages.filter((img) => {
                if ( img.id !== id ) {
                    return true;
                } else {
                    return false;
                }
            });

            state.allImages = images;
        },
        deleteEmptyImageElements(state){
            let elements = state.draggableInsideCanvas.filter(elm => {
                if ( elm.name === "image-block" && !elm.props.imageSource ) {
                    return false;
                } else {
                    return true;
                }
            });

            state.draggableInsideCanvas = elements;
        },
        addNewImages(state, value){
            state.allImages = [...state.allImages, ...value];
        },
        uploadImage(state, value){
            state.allImages = [value, ...state.allImages];
        },
        changeTemplates(state, value){
            state.allTemplates = value;
        },
        addNewTemplates(state, value){
            state.allTemplates = [...state.allTemplates, ...value];
        },
        deleteTemplate(state, id){
            let templates = state.allTemplates.filter((img) => {
                if ( img.id !== id ) {
                    return true;
                } else {
                    return false;
                }
            });

            state.allTemplates = templates;
        },
        changeAvailableFonts(state, value){
            state.availableFonts = value;
        },
        changeOrientation(state, value){
            state.currentOrientation = value;
            if (value) {
                state.orientationWasSelected = true;
            }
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
            // obj.props.x = 0;
            // obj.props.y = 0;

            state.draggableInsideCanvas.push(obj);
        },
        // WORK WITH ELEMENTS
        addElementInsideCanvas(state, obj){
            setPreviousValue(state);
            state.draggableInsideCanvas.push(obj);
        },
        deleteElementFromCanvas(state, {id}){
            setPreviousValue(state);
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
            let element = getElementByID(state.draggableInsideCanvas, value.id);
            element.props.rotated = !element.props.rotated;
            let width = element.props.width;
            let height = element.props.height;

            let position = getCorrectPositionForRotatingElement(state.currentOrientation, element);

            element.props.x = position.x;
            element.props.y = position.y;

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
        toFrontZ(state){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
            
            state.draggableInsideCanvas.forEach(elem => {
                if (element.id !== elem.id) {
                    elem.props.z = elem.props.z - 1;
                } else {
                    elem.props.z = state.draggableInsideCanvas.length;
                }
            });
        },
        toBackZ(state){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);

            let minimumLayer = 0;
            
            state.draggableInsideCanvas.forEach(elem => {
                if (element.props.z < minimumLayer) {
                    minimumLayer = elem.props.z;
                }
            });

            state.draggableInsideCanvas.forEach(elem => {
                if (element.id !== elem.id) {
                    elem.props.z = elem.props.z + 1;
                } else {
                    elem.props.z = minimumLayer;
                }
            });
        },
        changeZIndex(state, value){
            setPreviousValue(state);
            let element = getActiveElement(state.draggableInsideCanvas, state.currentActiveElement);
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

function getCorrectPositionForRotatingElement(orientation, element){
    let x = element.props.x;
    let y = element.props.y;
    let height = element.props.height;
    let width = element.props.width;
    let canvasHeight, canvasWidth;

    let returnObj = {};

    if(orientation === 'portrait'){
        canvasHeight = 1920;
        canvasWidth = 1080;
    } else if(orientation === 'landscape'){
        canvasHeight = 1080;
        canvasWidth = 1920;
    }

    if(x + height > canvasWidth){
        returnObj.x = canvasWidth - height;
    } else{
        returnObj.x = x;
    }

    if(y + width > canvasHeight){
        returnObj.y = canvasHeight - width;
    } else{
        returnObj.y = y;
    }

    return returnObj;
}