<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="投注记录" router="/user"></y-header>
        <div class="tabs" style="margin-bottom:0rem;">
            <ul class="record_select">
                <li class="item" :class="{active:item.index == activeIndex}" v-for="(item, index) in tabs" @click="tab(item.index)">
                    <a href="Javascript:;">
                    {{ item.title}}
                    </a>
                </li>
            </ul>
            <div style="overflow:auto;position: absolute;right: 0;left: 0;top: 0.48rem;bottom: 0rem;">
                <mt-loadmore :bottomPullText="loadmore.bottomPullText" :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
                    <ul class="record-list">
                        <template v-for="(o, index) in orderList">
                            <li class="item flex">
                                <router-link :to="{ name: 'recordDetail', query: {DID: o.OrderDetailId }}">
                                    <div class="ball_list">
                                        <img :src="o.LogoUrl">
                                        <div class="ball_info">
                                            <div class="ball_info_top">
                                                <p class="fl">等待开奖</p>
                                                <p class="fr">[{{o.TypeName}}]</p>
                                            </div>
                                            <div class="ball_info_bottom">
                                                <p class="fl">{{o.CreateTime | date}}</p>
                                                <p class="fr">投注{{o.CostMoney | number('元')}}</p>
                                            </div>
                                        </div>
                                        <span href="javascript:;" class="information_bg">
                                            <i class="icon">&#xe608;</i>
                                        </span>
                                    </div>
                                    
                                </router-link>
                                <div class="trade_type trade_typefirst flex" v-if="o.OrderDetailState == 0">
                                    <div class="obligations">
                                        待付款
                                    </div>
                                    <div class="record_payment flex">
                                        <a href="Javascript:;">取消投注</a><a href="Javascript:;" class="record_paybut">付款</a>
                                    </div>
                                </div>
                                <div class="trade_type" v-if="o.OrderDetailState == 1">
                                    <p class="trading_success">交易成功</p>
                                </div>
                                <div class="trade_type" v-if="o.OrderDetailState == 4">
                                    <p class="trading_close">交易关闭</p>
                                </div>
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
    import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
    import header from '../../components/header.vue'
    import Vue from 'vue'
    import {
        Loadmore
    } from 'mint-ui';
    Vue.component(Loadmore.name, Loadmore);
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                activeIndex: 0,
                tabs: [{
                    title: '全部',
                    index:0,
                }, {
                    title: '中奖',
                    index:2,
                }, {
                    title: '待开奖',
                    index:1
                }, {
                    title: '未成功',
                    index:3
                }],
                loadmore: {
                    bottomPullText: "上拉加载更多..."
                },
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
            this.destroyOrderList();
            this.orderList_({ PN: 13000000000,PG: this.page })
        },
        computed: {
            ...mapGetters({
                
            }),
            ...mapState({
                orderList: state => state.$user.orderList
            })
        },
        methods: {
            ...mapMutations({
                destroyOrderList: 'destroyOrderList',
            }),
            ...mapActions([
                'orderList_'
            ]),
            tab(index) {
                this.activeIndex = index;
                this.destroyOrderList();
                let body = { PN: 13000000000,PG: this.page };
                index && (body.CS = index);
                this.orderList_(body);
            },
            loadTop() {
                let loadmore = this.$refs.loadmore;
                this.allLoaded = false;
                this.page.currentPage = 1;
                this.loadmore.bottomPullText = "上拉加载更多..."
                this.destroyOrderList();
                this.orderList_({ PN: 13000000000, PG: this.page }).then(
                    (res) => {
                        loadmore.onTopLoaded();
                    }
                )
            },
            loadBottom() {
                let loadmore = this.$refs.loadmore;
                if (this.allLoaded) { loadmore.onBottomLoaded(); return; };
                ++this.page.currentPage;
                this.orderList_({ PN: 13000000000, PG: this.page }).then(
                    (res) => {
                        loadmore.onBottomLoaded();
                    },
                    (res) => {
                        this.allLoaded = true;
                        this.loadmore.bottomPullText = "没有更多的数据！"
                        loadmore.onBottomLoaded();
                    })
            }
        },

    }

</script>