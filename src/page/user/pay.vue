<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="充值" router="/user"></y-header>
        <div class="center_content body_overflow">
            <div class="recharge_content">
                <p class="typehot tip size_14">充值金额</p>
                <div class="recharge_number cont_padding typecolor">
                    <p class="number itemborder size_28 flex"><span>￥</span><input size="10" type="text" :value="money" class="size_28" /></p>
                    <div class="select_amount flex">
                    	<div :class="{active: 30 == money }" @click="selectMoney(30)" class="numberred size_18">30元</div>
                        <div :class="{active: 50 == money }" @click="selectMoney(50)" class="numberred size_18">50元</div>
                        <div :class="{active: 100 == money }" @click="selectMoney(100)" class="numberred size_18">100元</div>
                    </div>
                    <div class="select_amount flex">
                    	<!--<template v-for="(num, index) in moneySelect">
                    		<div :class="{active: num == money }" @click="selectMoney(num, index)" class="numberred size_18">{{num}}元</div> 
                    		<br v-if="index == 2">
                    	</template>-->
                        <div :class="{active: 200 == money }" @click="selectMoney(200)" class="numberred size_18">200元</div>
                        <div :class="{active: 300 == money }" @click="selectMoney(300)" class="numberred size_18">300元</div>
                        <div :class="{active: 500 == money }" @click="selectMoney(500)" class="numberred size_18">500元</div>
                    </div>
                    
                </div>
                <div class="card cont_padding" @click="pay">
                    <a href="javascript:;" class="flex pading" v-if="payType == 1">
                        <div class="type_logo"><img ref="img" src="../../assets/images/banklg.png"/></div>
                        <div class="tyle_information margleft lineheight">
                            <p ref="text1" class="size_14">中国农业银行</p>
                            <p ref="text2" class="typehot">尾号0779储蓄卡</p>
                        </div>
                        <span href="javascript:;" class="information_bg">
                            <img src="../../assets/images/youjiant.png"/>
                        </span>
                    </a>
                    <a href="javascript:;" class="flex pading" v-if="payType == 2">
                        <div class="type_logo"><img src="../../assets/images/zfb.png"/></div>
                        <div class="tyle_information margleft lineht">支付宝</div>
                        <span href="javascript:;" class="information_bg">
                            <img src="../../assets/images/youjiant.png"/>
                        </span>
                    </a>
                    <a href="javascript:;" class="flex pading" v-if="payType == 3">
                        <div class="type_logo"><img src="../../assets/images/wxzf.png"/></div>
                        <div class="tyle_information margleft lineht">微信支付</div>
                    </a>
                    <a href="javascript:;" class="flex pading" v-if="payType == 4">
                        <div class="type_logo"><img src="../../assets/images/qbzf.png"/></div>
                        <div class="tyle_information margleft lineht">QQ钱包支付</div>
                        <span href="javascript:;" class="information_bg">
                            <img src="../../assets/images/youjiant.png"/>
                        </span>
                    </a>
                </div>
                <div class="revision cont_padding">
                    <router-link :to="{ name: 'paySuccess'}" class="continue_bet size_18">确认充值</router-link>
                </div>
            </div>
        </div>

        <div class="bomb_box" v-if="display">
			<div class="box_body">
				<p @click="close" class="close"><a href="javascript:;"></a></p>
				<div class="box">
					<h3 class="size_18 type_title itemborder">选择支付方式</h3>
					<div class="card cont_padding">
						<a href="javascript:;" class="flex pading itemborder" @click="selectPay(1)">
							<div class="type_logo"><img ref="img" src="../../assets/images/banklg.png"/></div>
                            <div class="tyle_information margleft lineheight">
                                <p ref="text1" class="size_14">中国农业银行</p>
                                <p ref="text2" class="typehot">尾号0779储蓄卡</p>
                            </div>
							<span href="javascript:;" class="information_bg">
                                <img src="../../assets/images/youjiant.png"/>
                            </span>
						</a>
						<a href="javascript:;" class="flex pading itemborder" @click="selectPay(2)">
							<div class="type_logo"><img src="../../assets/images/zfb.png"/></div>
                            <div class="tyle_information margleft lineht">支付宝</div>
							<span href="javascript:;" class="information_bg">
                                <img src="../../assets/images/youjiant.png"/>
                            </span>
						</a>
						<a href="javascript:;" class="flex pading itemborder" @click="selectPay(3)">
							<div class="type_logo"><img src="../../assets/images/wxzf.png"/></div>
                            <div class="tyle_information margleft lineht">微信支付</div>
							<span href="javascript:;" class="information_bg">
                                <img src="../../assets/images/youjiant.png"/>
                            </span>
						</a>
						<a href="javascript:;" class="flex pading" @click="selectPay(4)">
							<div class="type_logo"><img src="../../assets/images/qbzf.png"/></div>
                            <div class="tyle_information margleft lineht">QQ钱包支付</div>
							<span href="javascript:;" class="information_bg">
                                <img src="../../assets/images/youjiant.png"/>
                            </span>
						</a>
					</div>
				</div>
			</div>
		</div>
        
        <!--<div class="bomb_box" v-if="display == true">
            <div class="box_body">
                <p @click="close" class="close">
                    <a href="javascript:;"></a>
                </p>
                <div class="box">
                    <h3 class="size_18 type_title itemborder">选择支付方式</h3>
                    <div class="card cont_padding">
                        <a href="javascript:;" @click="selectPay(pay, index)" v-for="(pay, index) in paySelect" class="flex pading itemborder">
                            <div class="type_logo"><img :src="pay.logo" /></div>
                            <div class="tyle_information lineheight margleft">
                                <p class="size_14">{{pay.name?pay.name:''}}</p>
                                <p class="typehot">{{pay.desc?pay.desc:''}}</p>
                            </div>
                            <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"></span>
                        </a>
                    </div>
                </div>
            </div>
        </div>-->
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
                display: false,
                payType:1,
                moneySelect: [30, 50, 100, 200, 300, 500],
                money: 30,
                active: false
            }
        },
        methods: {
            pay() {
                this.display = true;
            },
            close() {
                this.display = false;
            },
            selectMoney(num, index) {
                this.money = num;
            },
            selectPay(type){
                this.payType = type;
                this.display = false;
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