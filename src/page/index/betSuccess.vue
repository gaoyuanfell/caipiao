<template>
    <div class="content-modal">
        <y-header title="支付成功" :router="{name:'betboxList'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="payment_success">
                    <img src="../../assets/images/zfcg.png" class="success"/>
                    <h3>支付成功</h3>
                    <p class="size_18 ">你可以通过投注详情查看方案状态</p>
                    <div class="success_after">
                        <router-link :to="{name:'betboxList'}" class="continue_bet" replace> 继续投注 </router-link>
                        <router-link :to="{name:'account'}" replace> 投注详情 </router-link>
                        <router-link to="/" replace> 返回首页 </router-link>
                    </div>
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
            
        })
    }
}
</script>


