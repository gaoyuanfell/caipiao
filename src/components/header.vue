<template>
    <div class="header">
        <div class="toolbar">
            <div class="bar-button">
                <span class="button-inner" v-if=" router == -1 ">
                    <i class="icon" @click=" $router.go(-1) " >&#xe600;</i>
                </span>
                <router-link class="button-inner" v-else-if="router && router != -1" :to="router" replace>
                    <i class="icon">&#xe600;</i>
                </router-link>
            </div>

            <div class="bar-button" @click="$r_callback">
                <router-link v-if="r_router" :to="r_router" v-text="r_title" class="button-inner" replace></router-link>
                <span v-else-if="r_title" class="button-inner" v-text="r_title"></span>
                <span v-else-if="r_icon" class="button-inner"> <i class="icon" v-html="r_icon"></i> </span>
            </div>

            <div class="title-h">
                <div class="toolbar-title" v-if="title" v-text="title" @click="$h_callback"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'y-header',
    props:['title','r_title','router','r_router','r_callback','h_callback','r_icon'],
    mounted:function(){
        
    },
    methods:{
        $r_callback(){
            if(this.r_callback && typeof this.r_callback === "function"){
                this.r_callback()
            }
        },
        $h_callback(){
            if(this.h_callback && typeof this.h_callback === "function"){
                this.h_callback()
            }
        }
    }
}
</script>
