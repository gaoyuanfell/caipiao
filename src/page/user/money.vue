<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="提现" router="/user"></y-header>
        <div class="center_content body_overflow">
            <div class="recharge_content">
                <p class="typehot tip size_14">提现金额</p>
                <div class="recharge_number cont_padding typecolor">
                    <p class="number itemborder size_28 flex"><span>￥</span><input type="text" value="30" class="size_28" /></p>
                    <div class="amount flex size_14">
                        <span class="typehot">可用余额 1500.00 元</span>
                        <a href="javascript:;" class="blue">全部提现</a>
                    </div>
                </div>
                <div class="card cont_padding">
                    <a href="javascript:;" class="flex pading">
                        <div class="type_logo"><img src="../../assets/images/banklg.png" /></div>
                        <div class="tyle_information margleft lineheight">
                            <p class="size_14">中国农业银行</p>
                            <p class="typehot">尾号0779储蓄卡</p>
                        </div>
                        <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"/></span>
                    </a>
                </div>
                <div class="revision cont_padding">
                    <router-link :to="{ name: 'moneySuccess'}" class="continue_bet size_18">确认提现</router-link>
                </div>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
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
                zIndex: 'getZindex'
            })
        }
    }
</script>