<template>
    <div class="content-modal">
        <y-header title="投注详情" :router="{name:'record'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <ul class="information_list">
                    <li class="information flex">
                        <a href="javascript:;" class="flex item">
                            <div class="type_logo"><img src="http://www.ycmedia.cn/lottery/static/img/leixing1.png"></div>
                            <div class="tyle_information">
                                <p class="info"><span class="size_14 typecolor">双色球</span> <span>第2017025期</span> <span>2017-03-05（周日）</span></p>
                                <div class="bet_cont flex">
                                    <div class="ball">02</div>
                                    <div class="ball">15</div>
                                    <div class="ball">16</div>
                                    <div class="ball">17</div>
                                    <div class="ball">22</div>
                                    <div class="ball">32</div>
                                    <div class="ball">07</div>
                                </div>
                                <div class="wait_lottery">
                                    <strong>等待开奖</strong>
                                    剩余&nbsp;<span>01</span>天&nbsp;<span>05</span>小时&nbsp;<span>27</span>分&nbsp;<span>39</span>秒
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
                <div class="record_details">
                    <div class="details_title"><strong>投注详情</strong>({{detail.TatalNum || 1}}注&nbsp;{{detail.DoubleNum || 1}}倍&nbsp;1期)</div>
                    <ul>
                        <template v-for="(d,index) in detail.DetailData">
                            <li class="flex detail_item">
                                <div class="bet_cont flex">
                                    <div class="ball" v-for="(b,index) in getBalls(d.LotteryString)">
                                        {{b}}
                                    </div>
                                </div>
                                <div class="prize_win" v-if="d.LotteryLevel != 0">
                                    <span >{{d.LotteryLevel | formatNum}}等奖</span>
                                </div>
                                <div class="prize_notwin" v-else>
                                    <span >未中奖</span>
                                </div>
                            </li>
                        </template>
                    </ul>
                    <div class="details_bottom">
                        <p>购买时间&nbsp;&nbsp;{{detail.CreateTime | date}}</p>
                        <p>投注金额&nbsp;&nbsp;{{ detail.OrderMoney | number('元') }}</p>
                    </div>
                    <div class="total_bets">共计&nbsp;<span> {{detail.TatalNum}} </span>&nbsp;注&nbsp;&nbsp;金额&nbsp;<span>10,656,668</span>&nbsp;元</div>
                </div>
            </div>
            <div class="wantbet_but">
                <router-link class="wantbet" :to="{name:'index'}"> 我要投注 </router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
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
        mounted:function(){
            let DID = this.$route.query.DID;
            console.info();
            this.userorderdetail_({DID:DID});
        },
        computed:{
            ...mapState({
                detail: state => state.$user.userorderdetail
            })
        },
        methods:{
            ...mapActions([
                'userorderdetail_'
            ]),
            getBalls(ball){
                let rs = /\s/;
                let rd = /\,/;
                if(ball.split(" ").length == 2){
                    let b = [];
                    let balls = ball.split(" ");
                    var s = 0;
                    var _s = '';
                    while(_s = balls[0].substr(s,2),_s.length > 0){
                        s += 2;
                        _s && b.push(_s)
                    }
                    b.push(balls[1])
                    return b;
                }
                if(rs.test(ball)){
                    return ball.split(rs);
                }
                if(rd.test(ball)){
                    return ball.split(rd);
                }
                return ball.split("");
            },
        }
    }
</script>