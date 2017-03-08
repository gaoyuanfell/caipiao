<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="双色球" r_title="历史开奖信息" router="/info" :r_router="{path:'/info/doubleball/history',query:{DID:DID}}"></y-header>
        <div class="notice_content body_overflow">
            <ul class="information_list no-bgimg cont_padding">
                <li class="information flex itemborder">
                    <a href="javascript:;" class="flex pading">
                        <div class="type_logo"><img :src="noticedetail.LogoUrl" /></div>
                        <div class="tyle_information margleft">
                            <p class="typehot margbottom">
                                <span class="size_14 typecolor">{{noticedetail.TypeName}}</span>
                                <span>第{{noticedetail.LotterySeq || 0}}期</span>
                                <span>{{noticedetail.LotteryDate}}</span>
                            </p>
                            <div v-if="noticedetail.LotteryString" class="bet_cont flex">
                                <div v-for="(num, index) in noticedetail.LotteryString.split(',')" 
                                    :class="{blue:index == noticedetail.LotteryString.split(',').length-1}" 
                                    class="size_16 red redbg auto_clear">{{num}}</div>
                            </div>
                        </div>
                    </a>
                </li>
                <div class="number">
                    <p class="typecolor size_14">奖池金额：<span class="red">{{noticedetail.LotteryMoney | number}}</span>元</p>
                    <p class="typecolor size_14">本期销量：<span class="red">{{noticedetail.TotalMoney | number}}</span>元</p>
                </div>
            </ul>
            <div class="history_table size_14 typecolor">
                <div class="table_title flex">
                    <div class="title_item">奖项</div>
                    <div class="title_item">注数</div>
                    <div class="title_item">单注金额</div>
                </div>
                <div class="table_body">
                    <template v-for="(d,index) in noticedetail.DetailData">
                        <div class="content_item flex">
                            <div class="cols_first flex border_right border_top">
                                <div class="col_first border_right">{{++index | formatNum}}等奖</div>
                                <div class="col_second">
                                    <div class="row_first itemborder">基本</div>
                                    <div class="row_second">追加</div>
                                </div>
                            </div>

                            <div class="cols_second border_right border_top">
                                <div class="row_first itemborder">{{d.OType == 1?d.ONum:'-'}}</div>
                                <div class="row_second">{{d.OType == 2?d.ONum:'-'}}</div>
                            </div>
                            <div class="cols_three border_top">
                                <div class="row_first itemborder red">
                                    {{d.OType == 1?d.OMoney:'-' | number}}
                                </div>
                                <div class="row_second red">
                                    {{d.OType == 2?d.OMoney:'-' | number}}
                                </div>
                            </div>

                        </div>
                    </template>
                    
                </div>
            </div>
            <!--以上是奖励表-->
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
            let DID = this.$route.query.DID
            this.DID = 507;
            console.info(DID)
            this.noticedetail_({DID:507});
        },
        mounted: function () {

        },
        computed:{
            ...mapGetters({
                zIndex: 'getZindex'
            }),
            ...mapState({
                noticedetail:state => state.$user.noticedetail
            })
        },
        methods:{
            ...mapActions([
                'noticedetail_'
            ])
        }
    }
</script>