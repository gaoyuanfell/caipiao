<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="投注单" router="/index"></y-header>
        <div class="bet_multiple itemborder flex">
            <div class="multiple_left border_right">
                追&nbsp;
                <span class="allowance flex">
                        <a href="javascript:;" class="typehot border_right" @click="stage_change(false)">-</a>
                            <input type="number" min="1" v-model.number="stage" class="multiple_numb size_16 typecolor"/>
                        <a href="javascript:;" class="typehot border_left" @click="stage_change(true)">+</a>
                    </span>
                &nbsp;期
            </div>
            <div class="multiple_left">
                买&nbsp;
                <span class="allowance flex">
                        <a href="javascript:;" class="typehot border_right" @click="fold_change(false)">-</a>
                            <input type="number" min="1" v-model="fold" class="multiple_numb size_16 typecolor"/>
                        <a href="javascript:;" class="typehot border_left" @click="fold_change(true)">+</a>
                    </span>
                &nbsp;倍
            </div>
        </div>
        <div class="scroll-batList">
            <!--以上是增减倍数-->
            <div class="bet_slips cont_padding">
                <img src="../../assets/images/topzhou.png" class="slipsbg"/>
                <div class="slips_list">
                    <!--<div class="slips_item">-->
                        <a @click="modifyBet($index)" href="javascript:;" v-for="(bet,$index) in doubleBallList" :index="$index" class="slipsborder slips">
                            <div class="slips_body">
                                <template v-for="(value,key) in bet">
                                    <div v-if="key == 0" v-for="v in value" v-text="v" class="size_16 red numberborder ballslips"></div>
                                    <div v-if="key == 1" v-for="v in value" v-text="v" class="size_16 blue numberborder ballslips"></div>
                                </template>
                            </div>
                            <span href="javascript:;" class="information_bg">
                                <img src="../../assets/images/youjiant.png"/>
                            </span>
                        </a>
                    <!--</div>-->
                </div>
                <div class="listfoot">
                	<a @click="clearBetList()" class="empty" href="javascript:;">全部清空</a>
                	<img src="../../assets/images/bottomjiao.png" class="slipsbg foot"/>
                </div>
            </div>
        </div>
        <!-- 以上是投注单列表 -->
        <div class="betting_button">
            <div class="bet_way">
                <a @click="addBetForHand()" href="javascript:;" class="typecolor size_16">
                    <span class="size_18 numberred">+</span>&nbsp;手动投注
                </a>
                <a @click="addBetForRobot()" href="javascript:;" class="typecolor size_16"><span class="size_18 numberred">+</span>&nbsp;机选投注</a>
            </div>
            <div class="agreement typehot">
                <input type="checkbox" checked/>&nbsp;我已阅读并同意<span class="blue">&nbsp;《服务协议》</span>
            </div>
            <div class="select_complete border_top flex">
                <div class="Note_number size_14">
                    <span v-text="doubleBallListBet + '注'"></span>
                    <span v-text="fold+'倍'">1</span>
                    <span v-text="stage+'期'"></span>
                </div>
                <div class="have_cast total size_16 typecolor">共计
                    <span class="numberred" v-text="doubleBallListBet * 2 * stage * fold"></span>元
                </div>
                <a @click="betting()" href="javascript:;" class="complete size_18">投注</a>
            </div>
        </div>
        <div class="bomb_box cont_padding" v-if="noMoney">
            <div class="box_content">
                <p class="close">
                    <a href="javascript:;"></a>
                </p>
                <div class="box">
                    <h3 class="typecolor typecolor size_18 title">余额不足</h3>
                    <p class="balance flex typecolor"><span>当前订单： <em class="numberred">6.00</em>元</span><span>账户余额：<em class="numberred">0.00</em>元</span></p>
                    <div class="bank">
                        <div class="bank_input flex size_14 typehot">
                            <div class="bank_select flex">
                                <img class="banklogo" src="../../assets/images/banklg.png"/>
                                <select class=" size_14 typehot">
                                    <option value="中国农业银行 尾号0775储蓄卡 ">中国农业银行 尾号0775储蓄卡</option>
                                    <option value="中国农业银行 尾号0775储蓄卡">中国农业银行 尾号0775储蓄卡</option>
                                    <option value="中国农业银行 尾号0775储蓄卡">中国农业银行 尾号0775储蓄卡</option>
                                </select>
                            </div>
                            <i><img src="../../assets/images/xiangxia.png"/></i>
                        </div>
                    </div>
                    <div class="recharge">
                        <a href="javascript:;">前去充值</a>
                    </div>
                </div>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

import { mapGetters,mapMutations, mapState } from 'vuex';
import header from '../../components/header.vue';

export default {
    components:{
        'y-header':header
    },
    data(){
        return {
            stage:1,
            fold:1
        }
    },
    created:function(){

    },
    mounted:function(){
        
    },
    computed:{
        ...mapGetters({
            zIndex: 'getZindex',
            doubleBallListBet: 'doubleBallListBet'
        }),
        ...mapState({
            doubleBallList: state => state.$home.doubleBallList,
        })
    },
    methods:{
        ...mapMutations({
            
        }),
        clearBetList:function(){
            this.$store.commit('distroyDoubleBallList')
        },
        fold_change:function(bo){
            if(bo){
                this.fold += 1
            }else{
                if(this.fold > 1){
                    this.fold -= 1
                }
            }
        },
        stage_change:function(bo){
            if(bo){
                this.stage += 1
            }else{
                if(this.stage > 1){
                    this.stage -= 1
                }
            }
        },
        modifyBet:function($index){
            if($index != undefined){
                let ball = this.doubleBallList[$index]
                this.$store.commit('setDoubleBall',ball);
            }
            this.$router.push({name:'betbox',params:{$index:$index}})
        },
        addBetForHand:function(){
            this.$store.commit('setDoubleBall');
            this.$router.push({name:'betbox'})
        },
        betting:function(){
            this.$router.push({
                name:'betSuccess',
                path:'/betSuccess'
            });
            this.$store.commit('distroyDoubleBallList');
            this.stage = 1;
            this.fold = 1;
        },
        addBetForRobot:function(){
            let arr1 = [];
            let arr2 = [];
            for (let j = 0; j < 6; j++) {
                let _num = Math.floor(Math.random() * 33) + 1;
                while (arr1.indexOf(_num) != -1) {
                    _num = Math.floor(Math.random() * 33) + 1;
                }
                arr1.push(_num);
            }
            arr1 = arr1.sort((a, b) => {
                return a - b
            })
            let _num = Math.floor(Math.random() * 16) + 1;
            arr2.push(_num);
            let ball = {
                0: arr1,
                1: arr2
            }
            this.$store.commit('addDoubleBallList',ball);
        }
    }
}
</script>

