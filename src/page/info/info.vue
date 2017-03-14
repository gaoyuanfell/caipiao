<template>
    <div class="contener">
        <y-header title="开奖公告"></y-header>
        <div class="tabs">
            <ul class="notice_menu flex">
                <li class="item" :class="{active:(index + 1) == activeIndex}" v-for="(item, index) in tabs" @click="tab(++index)">
                    <a href="Javascript:;">
                        {{ item.title}}
                    </a>
                </li>
            </ul>
            <div style="overflow:auto;top: 0rem;bottom: 0rem;position: absolute;right: 0;left: 0;margin-top: 0.45rem;">
                <mt-loadmore :bottomPullText="loadmore.bottomPullText" :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore" style="margin-top: 0rem">
                    <ul class="information_list">
                        <template v-for="i in lotteryNotices">
                            <li class="information">
                                <router-link :to="{ name: 'doubleball', query: {DID: i.ItemId }}" class="flex item">
                                    <div class="type_logo"><img :src="i.LogoUrl" /></div>
                                    <div class="tyle_information">
                                        <p class="info">
                                            <span>{{i.TypeName}}</span>
                                            <span>{{i.LotterySeq}}</span>
                                            <span>{{i.LotteryDate}}</span>
                                        </p>
                                        <div class="bet_cont flex">
                                            <div class="ball" v-for="(num, index) in getBalls(i.LotteryString)" v-if="num != ' '" :class="{bluebg:index == getBalls(i.LotteryString).length - 1}">{{$last}}{{num}}</div>
                                        </div>
                                    </div>
                                    <span href="javascript:;" class="information_bg">
                                        <i class="icon">&#xe608;</i>
                                    </span>
                                </router-link>
                            </li>
                        </template>
                    </ul>
                </mt-loadmore>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import header from '../../components/header.vue';
    import footer from '../../components/footer.vue';
    import Vue from 'vue';
    import { mapActions, mapState, mapMutations, mapGetters } from 'vuex';
    import {
        Loadmore
    } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        components: {
            'y-footer': footer,
            'y-header': header,
        },
        data() {
            return {
                loadmore:{
                    bottomPullText:"上拉加载更多..."
                },
                activeIndex: 1,
                tabs: [{
                    title: '双色球'
                }, {
                    title: '竞技彩'
                }, {
                    title: '快频彩'
                }],
                page: {
                    currentPage: 1,
                    pageCount: 10,
                    sortName: "createtime",
                    sortType: "desc"
                }
            }
        },
        created: function () {
            
        },
        mounted: function () {
            this.destroyLotteryNotice();
            this.lotteryNotice_( {TID:1, PG:this.page} );
        },
        computed:{
            ...mapState({
                lotteryNotices: state => state.$user.lotteryNotices
            }),
        },
        methods: {
            ...mapMutations({
                destroyLotteryNotice: 'destroyLotteryNotice',
            }),
            ...mapActions([
				'lotteryNotice_',
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
            tab(index) {
                this.page.currentPage = 1;
                this.activeIndex = index;
                this.destroyLotteryNotice();
                this.lotteryNotice_( {TID:index, PG:this.page} );
            },
            loadTop(){
                let loadmore = this.$refs.loadmore;
                this.allLoaded = false;
                this.page.currentPage = 1;
                this.loadmore.bottomPullText = "上拉加载更多...";
                this.destroyLotteryNotice();
                this.lotteryNotice_( {TID:this.activeIndex, PG:this.page} ).then(
                    (res) => {
                        loadmore.onTopLoaded();
                    }
                )
            },
            loadBottom_(){
                console.info("loadBottom")
            },
            loadBottom(){
                console.info("loadBottom")
                let loadmore = this.$refs.loadmore;
                if (this.allLoaded) { loadmore.onBottomLoaded(); return; };
                ++this.page.currentPage;
                this.lotteryNotice_( {TID:this.activeIndex, PG:this.page} ).then(
                    (res) => {
                        loadmore.onBottomLoaded();
                    },
                    (e) => {
                        this.allLoaded = true;
                        this.loadmore.bottomPullText = "没有更多的数据！"
                        loadmore.onBottomLoaded();
                    }
                );
            },
        }
    }

</script>