<template>
    <div class="foot_menu flex">
        <router-link to="/index" class="lottery_hall item_pading" :class="{active:getPath == '/index' || getPath == '/'}">
            <div class="lottery_menu img"></div>
            <p class="menucolor">
                彩票大厅
            </p>
        </router-link>
        <router-link to="/info" class="draw_notice item_pading" :class="{active:getPath == '/info'}">
            <div class="lottery_menu img"></div>
            <p class="menucolor">
                开奖公告
            </p>
        </router-link>
        <router-link to="/user" class="my_lottery item_pading" :class="{active:getPath == '/user'}">
            <div class="lottery_menu img"></div>
            <p class="menucolor">
                我的彩票
            </p>
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
