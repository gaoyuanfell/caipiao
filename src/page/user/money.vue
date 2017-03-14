<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="提现" router="/user"></y-header>
        <div class="scroll-content" style="margin-bottom:0rem">
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
                    <div class="type_logo"><img ref="img" src="../../assets/images/banklg.png"/></div>
                    <div class="tyle_information">
                        <p ref="text1">中国农业银行</p>
                        <p ref="text2">尾号0779储蓄卡</p>
                    </div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </a>
            </div>
            <div class="pay_btn">
                <button class="btn" @click="confirmExtract">确认提现</button>
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
                
            })
        },
        methods:{
            confirmExtract(){
                this.$router.push({name:'moneySuccess'})
            }
        }
    }
</script>