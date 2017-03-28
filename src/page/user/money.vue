<template>
    <div class="content-modal">
        <y-header title="提现" :router="{name:'user'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <p class="pay_typehot">提现金额</p>
                <div class="recharge_number">
                    <div class="number flex">
                        <span>￥</span>
                        <input type="text" value="30" />
                    </div>
                    <div class="amount flex">
                        <span>可用余额 1500.00 元</span>
                        <span> 全部提现 </span>
                    </div>
                </div>
                <div class="pay_cards">
                    <a href="javascript:;" class="card flex">
                        <div class="type_logo">
                            <img ref="img" src="../../assets/images/zfb.png"/>
                        </div>
                        <div class="tyle_information">
                            支付宝
                        </div>
                        <span class="information_bg">
                            <i class="icon fr">&#xe608;</i>
                        </span>
                    </a>
                </div>
                <div class="default-btn">
                    <button class="btn" @click="confirmExtract">确认提现</button>
                </div>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
            <router-view></router-view>
        </transition>
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
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                
            })
        },
        methods:{
            confirmExtract(){
                this.$router.push({name:'moneySuccess'})
            }
        }
    }
</script>