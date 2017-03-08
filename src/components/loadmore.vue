<template>
    <div :style="{ 'transform': 'translate3d(0, ' + translate + 'px, 0)' }" style="background-color: #ccc;">
        <slot></slot>
    </div>
</template>

<script>
    export default{
        name:'mt-loadmore',
        props:{
            topPullText: {
                type: String,
                default: '下拉刷新'
            },
            topDropText: {
                type: String,
                default: '释放更新'
            },
            topLoadingText: {
                type: String,
                default: '加载中...'
            },
            topDistance: {
                type: Number,
                default: 70
            },
            topMethod: {
                type: Function
            },
            bottomPullText: {
                type: String,
                default: '上拉刷新'
            },
            bottomDropText: {
                type: String,
                default: '释放更新'
            },
            bottomLoadingText: {
                type: String,
                default: '加载中...'
            },
            bottomDistance: {
                type: Number,
                default: 70
            },
            bottomMethod: {
                type: Function
            },
            distanceIndex: {
                type: Number,
                default: 2
            }
        },
        data(){
            return {
                translate: 0,
                currentY: 0,
                startY: 0,
                startScrollTop: 0,
                scrollEventTarget:null,
                direction:'',
                topStatus: '',
                bottomStatus: '',
                bottomReached: false,
            }
        },
        watch:{
            
        },
        methods:{
            bindTouchEvents() {
                this.$el.addEventListener('touchstart', this.handleTouchStart);
                this.$el.addEventListener('touchmove', this.handleTouchMove);
                this.$el.addEventListener('touchend', this.handleTouchEnd);
            },
            
            handleTouchStart(event){
                this.startY = event.touches[0].clientY;
                this.startScrollTop = this.getScrollTop(this.scrollEventTarget);
            },
            handleTouchMove(event){
                this.currentY = event.touches[0].clientY;
                let distance = (this.currentY - this.startY) / this.distanceIndex;
                this.direction = distance > 0 ? 'down' : 'up';
                console.info(this.getScrollTop(this.scrollEventTarget))
                if(typeof this.topMethod == 'function' && this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.topStatus !== 'loading'){
                    event.preventDefault();
                    event.stopPropagation();
                    this.translate = distance - this.startScrollTop;
                    if (this.translate < 0) {
                        this.translate = 0;
                    }
                    this.topStatus = this.translate >= this.topDistance ? 'drop' : 'pull';
                }
                if (this.direction === 'up') {
                    this.bottomReached = this.bottomReached || this.checkBottomReached();
                }
                if(typeof this.bottomMethod == 'function' && this.bottomReached && this.direction === 'up' && this.bottomStatus !== 'loading'){
                    event.preventDefault();
                    event.stopPropagation();
                    this.translate = this.getScrollTop(this.scrollEventTarget) - this.startScrollTop + distance;
                    if (this.translate > 0) {
                        this.translate = 0;
                    }
                    this.bottomStatus = -this.translate >= this.bottomDistance ? 'drop' : 'pull';
                }
            },
            handleTouchEnd(event){
                if (this.direction === 'down' && this.getScrollTop(this.scrollEventTarget) === 0 && this.translate > 0) {
                    this.topDropped = true;
                    if (this.topStatus === 'drop') {
                        this.translate = '50';
                        this.topStatus = 'loading';
                        this.topMethod();
                    } else {
                        this.translate = '0';
                        this.topStatus = 'pull';
                    }
                }
                if (this.direction === 'up' && this.translate < 0) {
                    // this.bottomDropped = true;
                    this.bottomReached = false;
                    if (this.bottomStatus === 'drop') {
                        this.translate = '-50';
                        this.bottomStatus = 'loading';
                        this.bottomMethod();
                    } else {
                        this.translate = '0';
                        this.bottomStatus = 'pull';
                    }
                }
                this.direction = '';
            },
            checkBottomReached() {
                if (this.scrollEventTarget === window) {
                return document.body.scrollTop + document.documentElement.clientHeight >= document.body.scrollHeight;
                } else {
                return this.$el.getBoundingClientRect().bottom <= this.scrollEventTarget.getBoundingClientRect().bottom + 1;
                }
            },
            getScrollTop(element) {
                if (element === window) {
                    return Math.max(window.pageYOffset || 0, document.documentElement.scrollTop);
                } else {
                    return element.scrollTop;
                }
            },
            getScrollEventTarget(element) {
                let currentNode = element;
                while (currentNode && currentNode.tagName !== 'HTML' &&
                currentNode.tagName !== 'BODY' && currentNode.nodeType === 1) {
                    let overflowY = document.defaultView.getComputedStyle(currentNode).overflowY;
                    if (overflowY === 'scroll' || overflowY === 'auto') {
                        return currentNode;
                    }
                    currentNode = currentNode.parentNode;
                }
                return window;
            },
            init(){
                this.scrollEventTarget = this.getScrollEventTarget(this.$el);
                this.bindTouchEvents();
            }
        },
        mounted:function(){
            this.init();
        }
    }
</script>
