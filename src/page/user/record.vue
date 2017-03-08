<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="投注记录" router="/user"></y-header>
        <div class="tabs">
            <ul class="record_select">
                <li :class="{active:item.index == activeIndex}" v-for="(item, index) in tabs" @click="tab(item.index)">
                    <a href="Javascript:;">
                    {{ item.title}}
                    </a>
                </li>
            </ul>
            <div style="overflow:auto;position: absolute;right: 0;left: 0;top: 0.48rem;bottom: 0rem;">
                <mt-loadmore :bottomPullText="loadmore.bottomPullText" :autoFill="false" :top-method="loadTop" :bottom-method="loadBottom" ref="loadmore">
                    <ul class="information_list cont_padding">
                        <template v-for="(o, index) in orderList">
                            <li class="information flex itemborder">
                                <router-link :to="{ name: 'recordDetail', query: {DID: o.OrderDetailId }}">
                                    <div class="tyle_information pading">
                                        <img :src="o.LogoUrl">
                                        <div class="content_info">
                                            <div class="content_top">
                                                <p style="float: left;">等待开奖</p>
                                                <p style="float: right;">[{{o.TypeName}}]</p>
                                            </div>
                                            <div class="content_bottom">
                                                <p style="float: left;">{{o.CreateTime | date}}</p>
                                                <p style="float: right;">投注{{o.CostMoney | number('元')}}</p>
                                            </div>
                                        </div>
                                    </div>
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
            this.destroyOrderList();
            this.orderList_({ PN: 13000000000,PG: this.page })
        },
        mounted: function () {

        },
        computed: {
            ...mapGetters({
                zIndex: 'getZindex'
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
                this.orderList_(body).then(()=>{},()=>{})
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