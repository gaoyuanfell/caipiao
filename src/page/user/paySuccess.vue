<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="充值成功" router="/user"></y-header>
        <div class="scroll-content botoom_0">
            <div class="payment_success cont_padding">
                <img src="../../assets/images/zfcg.png" class="success" />
                <h3>充值成功</h3>
                <p class="size_18 ">您可通过投注详情查看方案状态</p>
                <div class="success_after size_18 typecolor">
                    <router-link :to="{ name: 'user'}" >账户详情</router-link>
                    <router-link :to="{ name: 'index'}" >返回首页</router-link>
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
                zIndex: 0,

            }
        },
        methods: {

        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                zIndex: 'getZindex'
            })
        }
    }
</script>