<template>
    <div class="content-modal">
        <y-header title="充值" :router="{name:'user'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <p class="pay_typehot">充值金额</p>
                <div class="recharge_number">
                    <p class="number flex"><span>￥</span><input size="10" type="text" :value="money"/></p>
                    <div class="select_amount flex">
                        <div :class="{active: 30 == money }" @click="selectMoney(30)" class="item">30元</div>
                        <div :class="{active: 50 == money }" @click="selectMoney(50)" class="item">50元</div>
                        <div :class="{active: 100 == money }" @click="selectMoney(100)" class="item">100元</div>
                    </div>
                    <div class="select_amount flex">
                        <div :class="{active: 200 == money }" @click="selectMoney(200)" class="item">200元</div>
                        <div :class="{active: 300 == money }" @click="selectMoney(300)" class="item">300元</div>
                        <div :class="{active: 500 == money }" @click="selectMoney(500)" class="item">500元</div>
                    </div>
                    
                </div>
                <div class="pay_cards cont_padding" @click="paySelect = !paySelect">
                    <a href="javascript:;" class="card flex" v-if="payType == 1">
                        <div class="type_logo"><img ref="img" src="../../assets/images/banklg.png"/></div>
                        <div class="tyle_information">
                            <p ref="text1">中国农业银行</p>
                            <p ref="text2">尾号0779储蓄卡</p>
                        </div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </a>
                    <a href="javascript:;" class="card flex" v-if="payType == 2">
                        <div class="type_logo"><img src="../../assets/images/zfb.png"/></div>
                        <div class="tyle_information">支付宝</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </a>
                    <a href="javascript:;" class="card flex" v-if="payType == 3">
                        <div class="type_logo"><img src="../../assets/images/wxzf.png"/></div>
                        <div class="tyle_information">微信支付</div>
                    </a>
                    <a href="javascript:;" class="card flex" v-if="payType == 4">
                        <div class="type_logo"><img src="../../assets/images/qbzf.png"/></div>
                        <div class="tyle_information">QQ钱包支付</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </a>
                </div>

                <div class="default-btn">
                    <button class="btn" @click="confirmPay">确认充值</button>
                </div>
                
            </div>

            <div class="bomb_box" v-if="paySelect">
                <div class="paySelect_body">
                    <p @click="close" class="close">
                        <i class="icon" @click=" paySelect = !paySelect ">&#xe648;</i>
                    </p>
                    <p class="title"> 选择支付方式 </p>
                    <div class="cards">
                        <div class="card flex" @click="selectPay(1)">
                            <div class="type_logo">
                                <img src="../../assets/images/banklg.png"/>
                            </div>
                            <div class="tyle_information">
                                <p>中国农业银行</p>
                                <p>尾号0779储蓄卡</p>
                            </div>
                            <span class="information_bg">
                                <i class="icon fr">&#xe608;</i>
                            </span>
                        </div>
                        <div class="card flex" @click="selectPay(2)">
                            <div class="type_logo">
                                <img src="../../assets/images/zfb.png"/>
                            </div>
                            <div class="tyle_information">
                                支付宝
                            </div>
                            <span class="information_bg">
                                <i class="icon fr">&#xe608;</i>
                            </span>
                        </div>
                        <div class="card flex" @click="selectPay(3)">
                            <div class="type_logo">
                                <img ref="img" src="../../assets/images/wxzf.png"/>
                            </div>
                            <div class="tyle_information">
                                微信支付
                            </div>
                            <span class="information_bg">
                                <i class="icon fr">&#xe608;</i>
                            </span>
                        </div>
                        <div class="card flex" @click="selectPay(4)">
                            <div class="type_logo">
                                <img ref="img" src="../../assets/images/qbzf.png"/>
                            </div>
                            <div class="tyle_information">
                                QQ钱包支付
                            </div>
                            <span class="information_bg">
                                <i class="icon fr">&#xe608;</i>
                            </span>
                        </div>
                    </div>
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
                paySelect: false,
                payType:2,
                moneySelect: [30, 50, 100, 200, 300, 500],
                money: 30,
                active: false
            }
        },
        methods: {
            selectMoney(num, index) {
                this.money = num;
            },
            selectPay(type){
                this.payType = type;
                this.paySelect = false;
            },
            confirmPay(){
                this.$router.push({name:'paySuccess'})
            }
        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                
            })
        }
    }
</script>