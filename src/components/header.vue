<template>
    <div class="header">
        <div class="toolbar">
            <div class="bar-button">
                <router-link class="button-inner" v-if="router" :to="router" >
                    <i class="icon">&#xe600;</i>
                </router-link>
            </div>

            <div class="bar-button">
                <router-link v-if="r_router" :to="r_router" v-text="r_title" class="button-inner"></router-link>
                <span v-else-if="r_title" class="button-inner" @click="callback" v-text="r_title"></span>
            </div>

            <div class="title-h">
                <div class="toolbar-title" v-if="title" v-text="title"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'y-header',
    props:['title','r_title','router','r_router','r_callback'],
    mounted:function(){
        
    },
    methods:{
        callback(){
            if(this.r_callback && typeof this.r_callback === "function"){
                this.r_callback()
            }
        }
    }
}
</script>
