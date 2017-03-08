<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="历史开奖信息" router="/info/doubleball"></y-header>
        <div class="notice_content overflow">
            <ul class="information_list no-bgimg cont_padding">
                <template v-for="(h,index) in noticehistorys">
                    <li class="information flex itemborder">
                        <div class="tyle_information pading">
                            <p class="typehot margbottom">
                                <span class="size_14 typecolor">第{{h.LotterySeq || 0}}期</span>
                                <span>{{h.LotteryDate}}</span>
                            </p>
                            <div class="bet_cont flex" v-if="h.LotteryString">
                                <template v-for="(n,index) in h.LotteryString.split(',')">
                                    <div class="size_16 deepred_bg white auto_clear" :class="{'deepblue_bg margin_none': index == h.LotteryString.split(',').length - 1}">{{n}}</div>
                                </template>
                            </div>
                        </div>
                    </li>
                </template>
            </ul>
            <!--以上是开奖历史查看-->
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
    import header from '../../components/header.vue';
    import footer from '../../components/footer.vue';

    export default {
        components: {
            'y-footer': footer,
            'y-header': header
        },
        data() {
            return {
                
            }
        },
        created: function () {
            let DID = this.$route.query.DID
            this.noticehistory_({DID:DID});
        },
        mounted:function(){

        },
        computed:{
            ...mapGetters({
                zIndex: 'getZindex'
            }),
            ...mapState({
                noticehistorys:state => state.$user.noticehistorys
            })
        },
        methods:{
            ...mapActions([
                'noticehistory_'
            ])
        }
    }
</script>