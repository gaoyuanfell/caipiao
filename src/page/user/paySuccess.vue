<template>
    <div class="content-modal">
        <y-header title="充值成功" :router="{name:'user'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="payment_success">
                    <img src="../../assets/images/zfcg.png" class="success" />
                    <h3>充值成功</h3>
                    <p class="size_18 ">您可通过投注详情查看方案状态</p>
                    <div class="success_after">
                        <router-link :to="{ name: 'user'}" replace>账户详情</router-link>
                        <router-link :to="{ name: 'index'}" replace>返回首页</router-link>
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
                
            })
        }
    }
</script>