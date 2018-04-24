<template>
    <div class="uploadBox">
        <form role="form" enctype="multipart/form-data" @submit.prevent="onSubmit">
            <div class="uploadBoxMain">
                <div class="form-group">
                    <div class="dropArea" @ondragover="onChange" :class="dragging ? 'dropAreaDragging' : ''" @dragenter="dragging=true" @dragend="dragging=false" @dragleave="dragging=false">
                        <md-icon class="md-size-2x color_blue">file_upload</md-icon>
                        <input type="file" id="items" name="items[]" required multiple @change="onChange">
                        <p class="help-block">Drop image here or <span class="color_blue">click to upload</span></p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
require('es6-promise').polyfill();
import axios from 'axios';

component: {axios}
export default {
    props: {
        postURL: {
            type: String,
            required: true
        },
        minItems: {
            type: Number,
            default: 1
        },
        maxItems: {
            type: Number,
            default: 30
        },
        method: {
            type: String,
            default: 'post'
        },
        postMeta: {
            type: [String, Array, Object],
            default: ''
        },
        postData: {
            type: [Object],
            default: () => {}
        },
        postHeader:{
          type: [Object],
          default: () => {}
        }
    },

    /*
     * The component's data.
     */
    data() {
        return {
            dragging: false,
            items: [],
            itemsAdded: '',
            itemsNames: [],
            itemsSizes: [],
            itemsTotalSize: '',
            formData: '',
            successMsg: '',
            errorMsg: '',
            isLoaderVisible: false,
        }
    },

    methods: {
        onChange(e) {
            this.formData = new FormData();
            let files = e.target.files || e.dataTransfer.files;
            this.itemsAdded = files.length;
            for (let x in files) {
                if (!isNaN(x)) {
                    this.items = e.target.files[x] || e.dataTransfer.files[x];
                    this.itemsNames[x] = files[x].name;
                    this.formData.append('items[]', this.items);
                }
            }
            this.onSubmit();
        },

        removeItems() {
            this.items = '';
            this.itemsAdded = '';
            this.itemsNames = [];
            this.itemsSizes = [];
            this.dragging = false;
        },

        onSubmit() {
            this.isLoaderVisible = true;

            if ((typeof this.postMeta === 'string' && this.postMeta !== '') ||
                (typeof this.postMeta === 'object' && Object.keys(this.postMeta).length > 0)) {
                this.formData.append('postMeta', this.postMeta);
            }
            
            if(typeof this.postData ==='object' && this.postData !== null && Object.keys(this.postData).length > 0){
              for(var key in this.postData){
                this.formData.append(key, this.postData[key]);
              }
            }

            if (this.method === 'put' || this.method === 'post' ) {
                axios({method: this.method, url: this.postURL, data: this.formData,headers:this.postHeader})
                    .then((response) => {
                        this.isLoaderVisible = false;
                        this.$emit('OK', response.data);
                        // Show success message
                        if(this.showHttpMessages)
                          this.successMsg = response + "." + this.successMessagePath;
                        this.removeItems();
                    })
                    .catch((error) => {
                        this.isLoaderVisible = false;
                        if(this.showHttpMessages)
                          this.errorMsg = error + "." + this.errorMessagePath;
                        this.removeItems();
                    });
            } else {
                if(this.showHttpMessages)
                this.errorMsg = this.httpMethodErrorMessage;
                this.removeItems();
            }
        },
    }
}
</script>

<style scoped>
form{
    height: 100%;
    width: 100%;
}
.uploadBox {
    position: relative;
    box-sizing: border-box;
    background: white;
    height: 100%;
    width: 100%;
    border: 1px solid #d3d3d3;
}

.uploadBox h3{
    font-size: 20px;
}

.uploadBox p{
    font-size: 16px;
}

.color_blue{
    color: #3d94c0;
}

.uploadBox .uploadBoxMain {
    position: relative;
    height: 100%;
    width: 100%;
}

/* Drag and drop */
.uploadBox .dropArea {
    position: relative;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    font-size: 2em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.form-group{
    height: 100%;
    width: 100%;
}

.uploadBox .dropArea input {
    position: absolute;
    cursor: pointer;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}
/* End drag and drop */

/* Loader */
.uploadBox .loader {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    opacity: 0.9;
}

.uploadBox .loaderImg {
    border: 9px solid #eee;
    border-top: 9px solid #00ADCE;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
/* End Loader */

.uploadBox .errorMsg {
    font-size: 2em;
    color: #a94442;
}

.uploadBox .successMsg {
    font-size: 2em;
    color: #3c763d;
}
</style>
