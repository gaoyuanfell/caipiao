<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="支付成功" router="/betboxList"></y-header>
        <div class="scroll-content botoom_0">
            <div class="payment_success cont_padding">
                <img src="../../assets/images/zfcg.png" class="success"/>
                <h3>支付成功</h3>
                <p class="size_18 ">你可以通过投注详情查看方案状态</p>
                <div class="success_after size_18 typecolor">
                    <router-link :to="{name:'betboxList'}" class="continue_bet"> 继续投注 </router-link>
                    <router-link :to="{name:'account'}"> 投注详情 </router-link>
                    <router-link to="/"> 返回首页 </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import header from '../../components/header.vue';
export default {
    components:{
        'y-header':header
    },
    data(){
        return {
            
        }
    },
    created:function(){
        
    },
    computed:{
        ...mapGetters({
            zIndex: 'getZindex'
        })
    }
}
</script>


