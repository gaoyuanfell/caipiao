<template>
    <div class="tabbar">
        <router-link to="/index" class="tab-button" :class="{active:getPath == '/index' || getPath == '/'}" replace>
            <span class="tab-button-icon home-icon">
                
            </span>
            <span class="tab-button-text">彩票大厅</span>
        </router-link>
        <router-link to="/info" class="tab-button" :class="{active:getPath == '/info'}" replace>
            <span class="tab-button-icon notice-icon">
                
            </span>
            <span class="tab-button-text">开奖公告</span>
        </router-link>
        <router-link to="/user" class="tab-button" :class="{active:getPath == '/user'}" replace>
            <span class="tab-button-icon lottery-icon">
                
            </span>
            <span class="tab-button-text">我的彩票</span>
        </router-link>
    </div>
</template>


<script>
export default {
    data(){
        return {
            path:'/'
        }
    },
    beforeCreate(){
        
    },
    computed:{
        getPath:function(){
            return this.$route.path;
        }
    }
}

</script>
