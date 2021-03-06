<template>
  <div
    class="vdr"
    :style="style"
    :class="{
      draggable: draggable,
      resizable: resizable,
      active: enabled,
      customDragging: dragging,
      resizing: resizing,
      insideDropZone: insideDropZone
    }"
    @mousedown.stop="elmDown"
    @dblclick="fillParent"
  >
    <div
      v-for="handle in handles"
      v-if="resizable"
      class="handle"
      :key="handle"
      :class="'handle-' + handle"
      :style="{ display: enabled ? 'block' : 'none'}"
      @mousedown.stop.prevent="handleDown(handle, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { eventBus } from '../main.js';

import { matchesSelectorToParentElements } from '../utils/dom'

export default {
  replace: true,
  name: 'VueDraggableResizable',
  props: {
    active: {
      type: Boolean, default: false
    },
    draggable: {
      type: Boolean, default: true
    },
    resizable: {
      type: Boolean, default: true
    },
    w: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    h: {
      type: Number,
      default: 200,
      validator: function (val) {
        return val > 0
      }
    },
    minw: {
      type: Number,
      default: 50,
      validator: function (val) {
        return val > 0
      }
    },
    minh: {
      type: Number,
      default: 50,
      validator: function (val) {
        return val > 0
      }
    },
    x: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    y: {
      type: Number,
      default: 0,
      validator: function (val) {
        return typeof val === 'number'
      }
    },
    z: {
      type: [ String, Number ],
      default: 'auto'
    },
    handles: {
      type: Array,
      default: function () {
        return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
      },
      validator: function (val) {
        var s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])

        return new Set(val.filter(h => s.has(h))).size === val.length
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String,
      default: 'both',
      validator: function (val) {
        return ['x', 'y', 'both'].indexOf(val) !== -1
      }
    },
    grid: {
      type: Array,
      default: function () {
        return [1, 1]
      }
    },
    parent: {
      type: String, default: ""
    },
    maximize: {
      type: Boolean, default: false
    },
    dropZone: {
      type: String, default: ""
    },
    returnToStartPosition: {
      type: Boolean, default: false, require: false
    },
    setParentSizes: {
      type: Boolean, default: false, require: false
    },
    id: {
      type: Number, require: true
    },
    hideOverflow: {
      type: String
    },
    subtype: {
      type: String
    }
  },

  created: function () {
    this.parentX = 0
    this.parentW = 9999
    this.parentY = 0
    this.parentH = 9999

    this.mouseX = 0
    this.mouseY = 0

    this.lastMouseX = 0
    this.lastMouseY = 0

    this.mouseOffX = 0
    this.mouseOffY = 0

    this.elmX = 0
    this.elmY = 0

    this.elmW = 0
    this.elmH = 0

    

    if(this.resizable){ // IF INSIDE THE CANVAS
      this.$store.commit('changePositionOfElement', {y: this.top, x: this.left, id: this.id}, {module: "main"});
      this.$store.commit('changeDimentionsOfElement', {w: this.width, h: this.height, id: this.id}, {module: "main"});
    }
    let that = this;
    eventBus.$on('closePanel', function({id}){
      if(that.id === id){
        that.enabled = false;
        that.zIndex = that.z;

        that.$emit('deactivated');
        that.$emit('update:active', false);
        eventBus.$emit('showElement', {value: "", id: this.id});
      }
    })

  },
  mounted: function () {
    document.documentElement.addEventListener('mousemove', this.handleMove, true)
    document.documentElement.addEventListener('mousedown', this.deselect, true)
    document.documentElement.addEventListener('mouseup', this.handleUp, true)

    this.elmX = parseInt(this.$el.style.left)
    this.elmY = parseInt(this.$el.style.top)
    this.elmW = this.$el.offsetWidth || this.$el.clientWidth
    this.elmH = this.$el.offsetHeight || this.$el.clientHeight
    
    if(this.setParentSizes){
      this.width = this.$el.parentNode.offsetWidth
      this.height = this.$el.parentNode.offsetHeight
    }
  
    this.reviewDimensions()
  },
  beforeDestroy: function () {
    if(this.resizable){
      eventBus.$emit('showElement', {value: "", id: this.id});
    }
    document.documentElement.removeEventListener('mousemove', this.handleMove, true)
    document.documentElement.removeEventListener('mousedown', this.deselect, true)
    document.documentElement.removeEventListener('mouseup', this.handleUp, true)
  },

  data: function () {
    return {
      top: this.y,
      left: this.x,
      width: this.w,
      height: this.h,
      resizing: false,
      dragging: false,
      enabled: this.active,
      handle: null,
      zIndex: this.z,
      insideDropZone: false,
      firstTime: true,
      initialPosition: {
        x: null,
        y: null
      },
      scale: 1
    }
  },

  methods: {
    reviewDimensions: function () {
      if (this.minw > this.w) this.width = this.minw

      if (this.minh > this.h) this.height = this.minh

      if (this.parent) {
        const parentW = parseInt(document.querySelector(this.parent).clientWidth, 10)
        const parentH = parseInt(document.querySelector(this.parent).clientHeight, 10)

        this.parentW = parentW
        this.parentH = parentH

        if (this.w > this.parentW) this.width = parentW

        if (this.h > this.parentH) this.height = parentH

        if ((this.x + this.w) > this.parentW) this.width = parentW - this.x

        if ((this.y + this.h) > this.parentH) this.height = parentH - this.y
      }

      this.elmW = this.width
      this.elmH = this.height

      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    elmDown: function (e) {
      if(this.hideOverflow){
        let block = document.querySelector(this.hideOverflow);
        let scrollTop = block.scrollTop;
        block.style.overflow = 'initial';
        block.style.top = `${-scrollTop}px`;

      }
      const target = e.target || e.srcElement
      // this.zIndex = 2000;

      if (this.$el.contains(target)) {
        if (
          (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el)) ||
          (this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el))) {
          return
        }

        this.reviewDimensions()

        if (!this.enabled) {
          this.enabled = true

          this.$emit('activated')
          this.$emit('update:active', true)
        }

        if (this.draggable) {
          this.dragging = true
        }

        if(this.resizable){
          eventBus.$emit('showElement', {value: "panel", id: this.id});
          eventBus.$emit('changeRulerPosition', { top: this.top + 50, left: this.left, top1: this.top + 50 + this.height, left1: this.left + this.width});
        }
      }
    },
    deselect: function (e) {
      this.$emit('tooltip', true);

      this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
      this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop

      this.lastMouseX = this.mouseX
      this.lastMouseY = this.mouseY

      const target = e.target || e.srcElement
      const regex = new RegExp('handle-([trmbl]{2})', '')

      // DESELECT WILL NOT WORK IF WE CLICK ON COLORPICKER OR SELECT 

      const colorpicker = document.querySelector('.el-color-dropdown.el-color-picker__panel');
      let isInsideColorpicker = colorpicker && colorpicker.contains(target) ? true : false;

      const panel = document.querySelector('.top_bar .panel');
      let isInsidePanel = panel && panel.contains(target) ? true : false;

      const popover = document.querySelectorAll('.el-popover');
      let isInsidePopover = false;
      if(popover){
        for(let i = 0; i < popover.length; i++){
          if(popover[i].contains(target)){
            isInsidePopover = true;
            break;
          }
        }
      }

      // END
      if (!this.$el.contains(target) && !regex.test(target.className) && !isInsideColorpicker && !isInsidePanel && !isInsidePopover) {
        if (this.enabled) {
          this.zIndex = this.z;
          this.enabled = false

          this.$emit('deactivated')
          this.$emit('update:active', false)
          if(this.resizable){
            eventBus.$emit('showElement', {value: "", id: this.id});
            eventBus.$emit('changeRulerPosition', { close: true});
          }
        }
      }
    },
    handleDown: function (handle, e) {
      this.handle = handle

      if (e.stopPropagation) e.stopPropagation()
      if (e.preventDefault) e.preventDefault()

      this.resizing = true
    },
    fillParent: function (e) {
      if (!this.parent || !this.resizable || !this.maximize) return

      let done = false

      const animate = () => {
        if (!done) {
          window.requestAnimationFrame(animate)
        }

        if (this.axis === 'x') {
          if (
            this.width === this.parentW && this.left === this.parentX
          ) done = true
        } else if (this.axis === 'y') {
          if (
            this.height === this.parentH && this.top === this.parentY
          ) done = true
        } else if (this.axis === 'both') {
          if (
            this.width === this.parentW &&
            this.height === this.parentH &&
            this.top === this.parentY &&
            this.left === this.parentX
          ) done = true
        }

        if (this.axis === 'x' || this.axis === 'both') {
          if (this.width < this.parentW) {
            this.width++
            this.elmW++
          }

          if (this.left > this.parentX) {
            this.left--
            this.elmX--
          }
        }

        if (this.axis === 'y' || this.axis === 'both') {
          if (this.height < this.parentH) {
            this.height++
            this.elmH++
          }

          if (this.top > this.parentY) {
            this.top--
            this.elmY--
          }
        }

        this.$emit('resizing', this.left, this.top, this.width, this.height)
      }

      window.requestAnimationFrame(animate)
    },
    handleMove: function (e) {
      this.mouseX = e.pageX || e.clientX + document.documentElement.scrollLeft
      this.mouseY = e.pageY || e.clientY + document.documentElement.scrollTop
      //SCALE IN CANVAS = 2
      this.scale = 1;
      if(this.resizable || this.subtype === 'image'){
        this.scale = 2;
      }
      let diffX = ((this.mouseX - this.lastMouseX) * this.scale) + this.mouseOffX
      let diffY = ((this.mouseY - this.lastMouseY) * this.scale) + this.mouseOffY
      
      
      this.mouseOffX = this.mouseOffY = 0
      this.lastMouseX = this.mouseX
      this.lastMouseY = this.mouseY
      let dX = diffX
      let dY = diffY
      
      if (this.resizing) {
        if (this.handle.indexOf('t') >= 0) {
          
          if(this.subtype === "square" || this.subtype === "circle"){

            if(this.elmH - dY < this.minh){
              this.mouseOffY = (dY - (diffY = this.elmH - this.minh));
            }else if(this.parent && this.elmY + dY < this.parentY){
              this.mouseOffY = (dY - (diffY = this.parentY - this.elmY));
            }

            if(this.elmX + this.elmW - dY > this.parentW && this.elmY > this.parentY){
              this.mouseOffY = (dY - (diffY = -(this.parentW - this.elmX - this.elmW)));
            }

            this.elmW -= diffY;
            this.elmY += diffY;
            this.elmH -= diffY;
          }else if(this.subtype === "image"){

            if (this.elmH - dY < this.minh){
              this.mouseOffY = (dY - (diffY = this.elmH - this.minh));
            } else if (this.parent && this.elmY + dY < this.parentY){
              this.mouseOffY = (dY - (diffY = this.parentY - this.elmY));
            } 
            
            if(this.elmX + this.elmW - (dY * this.widthToHeightRatio) > this.parentW && this.elmY > this.parentY){
              this.mouseOffY = (dY - (diffY = -(this.parentW - this.elmX - this.elmW) / this.widthToHeightRatio));
            }

            this.elmW -= diffY * this.widthToHeightRatio;
            this.elmY += diffY
            this.elmH -= diffY
          }else{
            if (this.elmH - dY < this.minh){
              this.mouseOffY = (dY - (diffY = this.elmH - this.minh));
            } else if (this.parent && this.elmY + dY < this.parentY){
              this.mouseOffY = (dY - (diffY = this.parentY - this.elmY));
            } 

            this.elmY += diffY;
            this.elmH -= diffY;
          }
        }
        if (this.handle.indexOf('b') >= 0) {
          if(this.subtype === "square" || this.subtype === "circle"){
            if (this.elmH + dY < this.minh){
              this.mouseOffY = (dY - (diffY = this.minh - this.elmH));
            } 
            else if (this.parent && this.elmY + this.elmH + dY > this.parentH){
              this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH));
            }

            if(this.elmX + this.elmW + dY > this.parentW && this.elmY + this.elmH < this.parentH){
              this.mouseOffY = (dY - (diffY = this.parentW - this.elmX - this.elmW));
            }
            
            this.elmH += diffY;
            this.elmW += diffY;
          }else if(this.subtype === "image"){

            if (this.elmH + dY < this.minh){
              this.mouseOffY = (dY - (diffY = this.minh - this.elmH));
            } 
            else if (this.parent && this.elmY + this.elmH + dY > this.parentH){
              this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH));
            }

            if(this.elmX + this.elmW + dY * this.widthToHeightRatio > this.parentW && this.elmY + this.elmH < this.parentH){
              this.mouseOffY = (dY - (diffY = (this.parentW - this.elmX - this.elmW) / this.widthToHeightRatio));
            }

            this.elmW += diffY * this.widthToHeightRatio;
            this.elmH += diffY;
          }else{
            if (this.elmH + dY < this.minh){
              this.mouseOffY = (dY - (diffY = this.minh - this.elmH));
            } 
            else if (this.parent && this.elmY + this.elmH + dY > this.parentH){
              this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH));
            }

            this.elmH += diffY;
          }
        }
        if (this.handle.indexOf('l') >= 0) {
          if((this.subtype === "square" || this.subtype === "circle")){
            if (this.elmW - dX < this.minw){
              this.mouseOffX = (dX - (diffX = this.elmW - this.minw));
            } 
            else if (this.parent && this.elmX + dX < this.parentX){
              this.mouseOffX = (dX - (diffX = this.parentX - this.elmX));
            }

            if(this.elmY + this.elmH - dX > this.parentH && this.elmX > this.parentX){
              this.mouseOffX = (dX - (diffX = -(this.parentH - this.elmY - this.elmH)));
            }

            this.elmX += diffX;
            this.elmW -= diffX;
            this.elmH -= diffX;
          }else if(this.subtype === "image"){
            if (this.elmW - dX < this.minw){
              this.mouseOffX = (dX - (diffX = this.elmW - this.minw));
            } 
            else if (this.parent && this.elmX + dX < this.parentX){
              this.mouseOffX = (dX - (diffX = this.parentX - this.elmX));
            }

            if(this.elmY + this.elmH - dX * this.heightToWidthRatio > this.parentH && this.elmX > this.parentX){
              this.mouseOffX = (dX - (diffX = -((this.parentH - this.elmY - this.elmH) / this.heightToWidthRatio)));
            }

            let proportion = this.h / this.w;
            this.elmH -= diffX * proportion;
            this.elmX += diffX;
            this.elmW -= diffX;
          }else{
            if (this.elmW - dX < this.minw){
              this.mouseOffX = (dX - (diffX = this.elmW - this.minw));
            } 
            else if (this.parent && this.elmX + dX < this.parentX){
              this.mouseOffX = (dX - (diffX = this.parentX - this.elmX));
            }

            this.elmX += diffX;
            this.elmW -= diffX;
          }
        }
        if (this.handle.indexOf('r') >= 0) {
          if(this.subtype === "square" || this.subtype === "circle"){
            if (this.elmW + dX < this.minw){
              this.mouseOffX = (dX - (diffX = this.minw - this.elmW));
            } 
            else if (this.parent && this.elmX + this.elmW + dX > this.parentW){
              this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW));
            }

            if(this.elmY + this.elmH + dX > this.parentH && this.elmX + this.elmW < this.parentW){
              this.mouseOffX = (dX - (diffX = this.parentH - this.elmY - this.elmH));
            }

            this.elmW += diffX;
            this.elmH += diffX;
          }else if(this.subtype === "image"){
            if (this.elmW + dX < this.minw){
              this.mouseOffX = (dX - (diffX = this.minw - this.elmW));
            } 
            else if (this.parent && this.elmX + this.elmW + dX > this.parentW){
              this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW));
            }

            if(this.elmY + this.elmH + dX * this.heightToWidthRatio > this.parentH && this.elmX + this.elmW < this.parentW){
              this.mouseOffX = (dX - (diffX = (this.parentH - this.elmY - this.elmH) / this.heightToWidthRatio));
            }

            let proportion = this.h / this.w;
            this.elmW += diffX;
            this.elmH += diffX * proportion;
          }else{
            if (this.elmW + dX < this.minw){
              this.mouseOffX = (dX - (diffX = this.minw - this.elmW));
            } 
            else if (this.parent && this.elmX + this.elmW + dX > this.parentW){
              this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW));
            }

            this.elmW += diffX;
          }
        }
        this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
        this.width = (Math.round(this.elmW / this.grid[0]) * this.grid[0])
        this.height = (Math.round(this.elmH / this.grid[1]) * this.grid[1])
        this.$emit('resizing', this.left, this.top, this.width, this.height)
        this.createRuler(false, true);
        if(this.resizable){
          eventBus.$emit('changeRulerPosition', { top: this.top + 50, left: this.left, top1: this.top + 50 + this.height, left1: this.left + this.width});
        }
      } else if (this.dragging) {
        if (this.parent) {
          if (this.elmX + dX < this.parentX){
            this.mouseOffX = (dX - (diffX = this.parentX - this.elmX))
          }
          else if (this.elmX + this.elmW + dX > this.parentW){
            this.mouseOffX = (dX - (diffX = this.parentW - this.elmX - this.elmW))
          }

          if (this.elmY + dY < this.parentY){
            this.mouseOffY = (dY - (diffY = this.parentY - this.elmY))
          }
          else if (this.elmY + this.elmH + dY > this.parentH){
            this.mouseOffY = (dY - (diffY = this.parentH - this.elmY - this.elmH))
          }
        }
        this.elmX += diffX
        this.elmY += diffY
        if (this.axis === 'x' || this.axis === 'both') {
          this.left = (Math.round(this.elmX / this.grid[0]) * this.grid[0])
        }
        if (this.axis === 'y' || this.axis === 'both') {
          this.top = (Math.round(this.elmY / this.grid[1]) * this.grid[1])
        }
        if(this.firstTime){
          this.initialPosition = {
            x: this.left,
            y: this.top
          };
          this.firstTime = false;
        }
        if(this.isInside(e.clientX, e.clientY)){
          this.insideDropZone = true;
        }else{
          this.insideDropZone = false;
        }
        this.$emit('dragging', this.left, this.top, e);
        if(this.resizable){
          eventBus.$emit('changeRulerPosition', { top: this.top + 50, left: this.left, top1: this.top + 50 + this.height, left1: this.left + this.width});
          this.createRuler(true, false);
        }
      }
    },
    handleUp: function (e) {
      this.$emit('tooltip', false);
      if(this.hideOverflow){
        let block = document.querySelector(this.hideOverflow);
        block.style.removeProperty('overflow');
        block.style.removeProperty('top');

      }

      if((this.resizable && this.resizing) || (this.resizable && this.dragging)){
        let element = this.$store.getters.getElementByID(this.id);
        let {x, y, width, height} = element.props;
        if(x !== this.left || y !== this.top){
          // console.log(`change position: old x: ${x}, new x: ${this.left}, old y: ${y}, new y: ${this.top}`);
          this.$store.commit('changePositionOfElement', {y: this.top, x: this.left, id: this.id, saveState: true}, {module: "main"});
        }
        if(width !== this.width || height !== this.height){
          // console.log('change dimentions');
          this.$store.commit('changeDimentionsOfElement', {w: this.width, h: this.height, id: this.id, saveState: true}, {module: "main"});
        }
      }
      

      this.firstTime = true;
      this.handle = null
      if (this.resizing) {
        this.resizing = false
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false;

        if(this.returnToStartPosition){
          this.left = 0;
          this.top = 0;
        }

        let position = this.calculateCorrectPosition(e.clientX, e.clientY, e);
        this.insideDropZone = false;

        if(!this.resizable){
          this.scale = 2;
        }
        if(this.isInside(Math.ceil(e.clientX), Math.ceil(e.clientY))){
          this.$emit('dropInside', position.x * this.scale, position.y * this.scale);
        }
        this.$emit('dragstop', this.left, this.top);
      }
      eventBus.$emit('hideRulers');

      this.elmX = this.left
      this.elmY = this.top
    },
    isInside(x, y){
      let dropElem = document.querySelector(this.dropZone);
      let dropWidth = dropElem.offsetWidth;
      let dropHeight = dropElem.offsetHeight;
      let {left, top} = dropElem.getBoundingClientRect();
      if(y < top + dropHeight && y > top && x < left + dropWidth && x > left){
          return true;
      }else{
        return false;
      }
    },
    calculateCorrectPosition(x, y, e){
      let dropElem = document.querySelector(this.dropZone);
      let {left, top} = dropElem.getBoundingClientRect();
      
      return {
        x : Math.ceil(x - left),
        y : Math.ceil(y - top)
      };
    },
    createRuler(dragging, resizing){
      let left = this.left;
      let top = this.top;
      let height = this.height;
      let width = this.width;
      let elements = this.elements;

      let showTopX = false;
      let showTopY = false;
      let showBottomX = false;
      let showBottomY = false;
      for(let i = 0; i < elements.length; i++){
        if(left <= elements[i].props.x + 10 && left >= elements[i].props.x - 10){
          eventBus.$emit('showTopXRuler', elements[i].props.x);
          showTopX = true;
          if(resizing){
            // logic for resizing
          }else if(dragging){
            this.left = elements[i].props.x;
          }
        }

        if(left + width <= elements[i].props.x + elements[i].props.width + 10 && left + width >= elements[i].props.x + elements[i].props.width - 10){
          eventBus.$emit('showBottomXRuler', elements[i].props.x + elements[i].props.width);
          showBottomX = true;
          if(resizing){
            // logic for resizing
          }else if(dragging){
            this.left = elements[i].props.x + elements[i].props.width - width;
          }
        }

        if(top <= elements[i].props.y + 10 && top >= elements[i].props.y - 10){
          eventBus.$emit('showTopYRuler', elements[i].props.y);
          showTopY = true;
          if(resizing){
            // logic for resizing
          }else if(dragging){
            this.top = elements[i].props.y;
          }
        }

        if(top + height <= elements[i].props.y + elements[i].props.height + 10 && top + height >= elements[i].props.y + elements[i].props.height - 10){
          eventBus.$emit('showBottomYRuler', elements[i].props.y + elements[i].props.height);
          showBottomY = true;
          if(resizing){
            // logic for resizing
          }else if(dragging){
            this.top = elements[i].props.y + elements[i].props.height - height;
          }
        }
      }

      // MIDDLES RULER
      let canvas = document.querySelector('.canvas');
      if((left + (width / 2) <= canvas.clientWidth / 2 + 10) && (left + (width / 2) >= canvas.clientWidth / 2 - 10)){
        this.left = canvas.clientWidth / 2 - width / 2;
        eventBus.$emit('showMidXRuler', canvas.clientWidth / 2);
      }else{
        eventBus.$emit('hideMidXRuler');
      }
      if((top + (height / 2) <= canvas.clientHeight / 2 + 10) && (top + (height / 2) >= canvas.clientHeight / 2 - 10)){
        this.top = canvas.clientHeight / 2 - height / 2;
        eventBus.$emit('showMidYRuler', canvas.clientHeight / 2);
      }else{
        eventBus.$emit('hideMidYRuler');
      }

      if(!showTopX){
        eventBus.$emit('hideTopXRuler');
      }
      if(!showBottomX){
        eventBus.$emit('hideBottomXRuler');
      }
      if(!showTopY){
        eventBus.$emit('hideTopYRuler');
      }
      if(!showBottomY){
        eventBus.$emit('hideBottomYRuler');
      }
    }
  },

  computed: {
    style() {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
        width: this.width + 'px',
        height: this.height + 'px',
        zIndex: this.zIndex
      }
    },
    elements(){
      return this.$store.state.main.draggableInsideCanvas.filter(element => element.id !== this.id);
    },
    widthToHeightRatio(){
      return this.w / this.h;
    },
    heightToWidthRatio(){
      return this.h / this.w;
    }
  },

  watch: {
    active: function (val) {
      this.enabled = val
    },
    z: function (val) {
        this.zIndex = val
    },
    h: function (val) {
      this.height = val;
      this.elmH = val;
      this.reviewDimensions();
    },
    w: function (val) {
      this.width = val;
      this.elmW = val;
      this.reviewDimensions();
    },
    x: function(val) {
      this.left = val;
      this.elmX = val;
      this.reviewDimensions();
    },
    y: function(val) {
      this.top = val;
      this.elmY = val;
      this.reviewDimensions();
    }
  }
}
</script>

<style scoped>
  .vdr {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: -webkit-grab;
    cursor: grab;
    cursor: url('../assets/cursors/openhand.cur'), move;
  }
  .cloneElement{
    display: none;
  }
  .handle {
    box-sizing: border-box;
    display: none;
    position: absolute;
    width: 20px;
    height: 20px;
    font-size: 1px;
    background: #d8d8d8;
  }
  .resizable.active{
    border: 2px dashed #d8d8d8;
  }
  .handle-tl {
    top: -20px;
    left: -20px;
    cursor: nw-resize;
  }
  .handle-tm {
    top: -20px;
    left: 50%;
    margin-left: -10px;
    cursor: n-resize;
  }
  .handle-tr {
    top: -20px;
    right: -20px;
    cursor: ne-resize;
  }
  .handle-ml {
    top: 50%;
    margin-top: -10px;
    left: -20px;
    cursor: w-resize;
  }
  .handle-mr {
    top: 50%;
    margin-top: -10px;
    right: -20px;
    cursor: e-resize;
  }
  .handle-bl {
    bottom: -20px;
    left: -20px;
    cursor: sw-resize;
  }
  .handle-bm {
    bottom: -20px;
    left: 50%;
    margin-left: -10px;
    cursor: s-resize;
  }
  .handle-br {
    bottom: -20px;
    right: -20px;
    cursor: se-resize;
  }
  .customDragging{
    cursor: -webkit-grabbing;
    cursor: grabbing;
    cursor: url('../assets/cursors/closedhand.cur'), move !important;
  }
</style>
