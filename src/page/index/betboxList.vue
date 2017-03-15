<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="投注单" router="/index"></y-header>
        <div class="bet_multiple flex">
            <div class="multiple_left">
                追&nbsp;
                <span class="allowance flex">
                        <a href="javascript:;" @click="stage_change(false)">-</a>
                            <input type="number" min="1" v-model.number="stage" class="multiple_numb"/>
                        <a href="javascript:;" @click="stage_change(true)">+</a>
                    </span>
                &nbsp;期
            </div>
            <div class="multiple_left">
                买&nbsp;
                <span class="allowance flex">
                        <a href="javascript:;" @click="fold_change(false)">-</a>
                            <input type="number" min="1" v-model="fold" class="multiple_numb"/>
                        <a href="javascript:;" @click="fold_change(true)">+</a>
                    </span>
                &nbsp;倍
            </div>
        </div>
        <div class="scroll-batList">
            <!--以上是增减倍数-->
            <div class="bet_slips">
                <img src="../../assets/images/topzhou.png" class="slipsbg"/>
                <div class="slips_list">
                    <template v-for="(bet,$index) in doubleBallList" :index="$index" >
                        <a @click="modifyBet($index)" href="javascript:;" class="slips">
                            <div class="slips_body">
                                <template v-for="(value,key) in bet">
                                    <div v-if="key == 0" v-for="v in value" v-text="v" class="ballslips"></div>
                                    <div v-if="key == 1" v-for="v in value" v-text="v" class="ballslips"></div>
                                </template>
                            </div>
                            <span href="javascript:;" class="information_bg">
                                <i class="icon">&#xe608;</i>
                            </span>
                        </a>
                    </template>
                </div>
                <div class="lslips_foot">
                	<a @click="clearBetList()" class="empty" href="javascript:;">全部清空</a>
                	<img src="../../assets/images/bottomjiao.png" class="slipsbg foot"/>
                </div>
            </div>
        </div>
        <!-- 以上是投注单列表 -->
        <div class="betting_button">
            <div class="bet_way">
                <a @click="addBetForHand()" href="javascript:;">
                    <span class="red">+</span>&nbsp;手动投注
                </a>
                <a @click="addBetForRobot()" href="javascript:;" >
                    <span class="red">+</span>&nbsp;机选投注
                </a>
            </div>
            <div class="agreement typehot">
                <input type="checkbox" checked/>&nbsp;我已阅读并同意<span class="blue">&nbsp;《服务协议》</span>
            </div>
            <div class="select_complete flex">
                <div class="note_number">
                    <span v-text="doubleBallListBet + '注'"></span>
                    <span v-text="fold+'倍'">1</span>
                    <span v-text="stage+'期'"></span>
                </div>
                <div class="have_cast">共计
                    <span class="red" v-text="totalMoney"></span>元
                </div>
                <a @click="betting()" href="javascript:;" class="complete size_18">投注</a>
            </div>
        </div>
        
        <div class="bomb_box animated fadeIn" v-if="noMoney">
            <div class="box_money_lack">
                <p class="close">
                    <i class="icon" @click=" noMoney = !noMoney ">&#xe648;</i>
                </p>
                <p class="title"> 余额不足 </p>
                <p class="balance flex">
                    <span>当前订单： 
                        <em>6.00</em>元
                    </span>
                    <span>账户余额：
                        <em>0.00</em>元
                    </span>
                </p>
                <div class="bank_select flex">
                    <img class="banklogo" src="../../assets/images/banklg.png"/>
                    <select class="select">
                        <option class="option" value="中国农业银行 尾号0775储蓄卡 ">中国农业银行 尾号0775储蓄卡</option>
                        <option class="option" value="中国农业银行 尾号0775储蓄卡">中国农业银行 尾号0775储蓄卡</option>
                        <option class="option" value="中国农业银行 尾号0775储蓄卡">中国农业银行 尾号0775储蓄卡</option>
                    </select>
                    <span class="select-blak">
                        <i class="icon">&#xe653;</i>
                    </span>
                </div>
                <div class="bank-btn">
                    <button class="btn"> 前去充值 </button>
                </div>
                
            </div>
        </div>
        
        <div class="bomb_box animated fadeIn" v-if="confirmPay">
            <div class="box_confirm_pay">
                <p class="close">
                    <i class="icon" @click=" confirmPay = !confirmPay ">&#xe648;</i>
                </p>
                <p class="title"> 付款方式 </p>
                <div class="card">
                    <img src="../../assets/images/banklg.png"/>
                    <span> 中国农业银行 尾号0775储蓄卡 </span>
                    <i class="icon fr">&#xe608;</i>
                </div>
                <div class="info">
                    <p>需付款</p>
                    <p>{{ totalMoney | number('元') }}</p>
                </div>
                <div class="pay">
                    <button class="btn">确认付款</button>
                </div>
            </div>
        </div>

        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>

import { mapGetters,mapMutations, mapState, mapActions } from 'vuex';
import header from '../../components/header.vue';

export default {
    components:{
        'y-header':header
    },
    data(){
        return {
            stage:1,
            fold:1,
            noMoney:false,
            confirmPay:false,
        }
    },
    created:function(){

    },
    mounted:function(){
        
    },
    computed:{
        ...mapGetters({
            doubleBallListBet: 'doubleBallListBet'
        }),
        ...mapState({
            doubleBallList: state => state.$home.doubleBallList,
            lotteryType: state => state.$home.lotteryType,
        }),
        totalMoney(){
            return this.doubleBallListBet * 2 * this.stage * this.fold
        }
    },
    methods:{
        ...mapActions([
            'aorder_'
        ]),
        ...mapMutations({
            
        }),
        clearBetList(){
            this.$store.commit('distroyDoubleBallList')
        },
        fold_change(bo){
            if(bo){
                this.fold += 1
            }else{
                if(this.fold > 1){
                    this.fold -= 1
                }
            }
        },
        stage_change(bo){
            if(bo){
                this.stage += 1
            }else{
                if(this.stage > 1){
                    this.stage -= 1
                }
            }
        },
        modifyBet($index){
            if($index != undefined){
                let ball = this.doubleBallList[$index]
                this.$store.commit('setDoubleBall',ball);
            }
            this.$router.push({name:'betbox',params:{$index:$index}})
        },
        addBetForHand(){
            this.$store.commit('setDoubleBall');
            this.$router.push({name:'betbox'})
        },
        betting(){
            // this.noMoney = true;
            // return ;
            let list = [];
            this.doubleBallList.forEach( (ball) => {
                list.push({
                    CRedNum: ball[0].join(","),
                    CBlueNum: ball[1].join(","),
                    CType: ball.type || 2
                })
            } )
            let body = {
                UId: "1",//用户ID
                TId: this.lotteryType,//彩票类型
                TNum: this.doubleBallListBet,//注数
                DNum: this.fold,//倍数
                MNum: this.stage,//追加
                TMoney: this.totalMoney,//总金额
                CartData: list
            }
            console.info(body)
            // this.confirmPay = true;
            this.noMoney = true;

            // this.aorder_(body).then(
            //     (res) => {
            //         this.$store.commit('distroyDoubleBallList');
            //         this.stage = 1;
            //         this.fold = 1;
            //         this.$router.push({
            //             name:'betSuccess',
            //             path:'/betSuccess'
            //         });
            //     }
            // );
            
        },
        addBetForRobot(){
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
                1: arr2,
                type:2
            }
            this.$store.commit('addDoubleBallList',ball);
        }
    }
}
</script>

