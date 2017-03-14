<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="提现成功" router="/user"></y-header>
        <div class="scroll-content botoom_0">
            <div class="payment_success">
                <img src="../../assets/images/zfcg.png" class="success" />
                <h3>提现成功</h3>
                <p class="size_18 ">您可通过投注详情查看方案状态</p>
                <div class="success_after size_18 typecolor">
                    <router-link :to="{ name: 'user'}">账户详情</router-link>
                    <router-link :to="{ name: 'index'}">返回首页</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import header from '../../components/header.vue';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {

            }
        },
        methods: {

        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                
            })
        }
    }
</script>