<template>
    <div class="content-modal">
        <y-header title="双色球" r_title="历史开奖信息" :router="{name:'info'}" :r_router="{name:'history',query:{DID:DID}}"></y-header>

        <div class="content">
            <div class="scroll-content" margin-header>
                <ul class="information_list">
                    <li class="information flex">
                        <a href="javascript:;" class="flex item">
                            <div class="type_logo"><img :src="noticedetail.LogoUrl" /></div>
                            <div class="tyle_information">
                                <p class="info">
                                    <span>{{noticedetail.TypeName}}</span>
                                    <span>第{{noticedetail.LotterySeq || 0}}期</span>
                                    <span>{{noticedetail.LotteryDate}}</span>
                                </p>
                                <div v-if="noticedetail.LotteryString" class="bet_cont flex">
                                    <div class="ball" v-for="(num, index) in getBalls(noticedetail.LotteryString)" 
                                        :class="{blue:index == getBalls(noticedetail.LotteryString).length-1}" 
                                        >{{num}}</div>
                                </div>
                            </div>
                        </a>
                    </li>
                    <div class="number">
                        <p>奖池金额：<span>{{noticedetail.LotteryMoney | number}}</span>元</p>
                        <p>本期销量：<span>{{noticedetail.TotalMoney | number}}</span>元</p>
                    </div>
                </ul>
                <div class="history_table">
                    <div class="table_title flex">
                        <div class="title_item">奖项</div>
                        <div class="title_item">注数</div>
                        <div class="title_item">单注金额</div>
                    </div>
                    <div class="table_body">
                        <template v-for="(d,index) in noticedetail.DetailData">
                            <div class="content_item flex">
                                <div class="cols_first flex">
                                    <div class="col_first">{{++index | formatNum}}等奖</div>
                                    <div class="col_second">
                                        <div class="row_first">基本</div>
                                        <div class="row_second">追加</div>
                                    </div>
                                </div>

                                <div class="cols_second">
                                    <div class="row_first">{{d.OType == 1?d.ONum:'-'}}</div>
                                    <div class="row_second">{{d.OType == 2?d.ONum:'-'}}</div>
                                </div>
                                <div class="cols_three">
                                    <div class="row_first">
                                        {{d.OType == 1?d.OMoney:'-' | number}}
                                    </div>
                                    <div class="row_second">
                                        {{d.OType == 2?d.OMoney:'-' | number}}
                                    </div>
                                </div>

                            </div>
                        </template>
                        
                    </div>
                </div>
                <!--以上是奖励表-->
            </div>
        </div>
        
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters, mapState, mapMutations, mapActions } from 'vuex';
    import header from '../../components/header.vue';
    import footer from '../../components/footer.vue';
    export default {
        components: {
            'y-footer': footer,
            'y-header': header,
        },
        data() {
            return {
                DID:0
            }
        },
        created: function () {
            
        },
        mounted: function () {
            let DID = this.$route.query.DID
            this.DID = DID;
            console.info(DID)
            this.noticedetail_({DID:DID});
        },
        computed:{
            ...mapGetters({
                
            }),
            ...mapState({
                noticedetail:state => state.$user.noticedetail
            })
        },
        methods:{
            ...mapActions([
                'noticedetail_'
            ]),
            getBalls(ball){
                let rs = /\s/;
                let rd = /\,/;
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