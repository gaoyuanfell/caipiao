<template>
    <div class="contener">
        <y-header title="彩票"></y-header>
        <div class="scroll-content">
            <div class="banner">
                <mt-swipe :show-indicators="true" :auto="0">
                    <mt-swipe-item>
                        <img src="../../assets/images/banner.jpg" />
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../../assets/images/banner.jpg" />
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="../../assets/images/banner.jpg" />
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <div class="bet_luckynumber cont_padding">
                <div class="bet_title flex">
                    <p>
                        <span class="typecolor">【双色球】</span>2元赢千万大奖！等你来战！
                    </p>
                    <p @click="changeLuckyDoubleBall">
                        <img src="../../assets/images/huanyiz.png"/>
                        <a href="javascript:;" class="typehot">换一注</a>
                    </p>
                </div>
                <div class="bet_cont flex" id="index_number_box">
                    <div class="lucky_number red">08</div>
                    <div class="lucky_number red">09</div>
                    <div class="lucky_number red">16</div>
                    <div class="lucky_number red">18</div>
                    <div class="lucky_number red">28</div>
                    <div class="lucky_number red">32</div>
                    <div class="lucky_number blue">08</div>
                </div>
                <div class="bet_button">
                    <a href="javascript:;" class="size_14 bet_submit" @click="luckSubmin()">投注幸运号</a>
                </div>
            </div>
            <div class="lotterylist">
                <ul @click="changePromptState($event)">
                    <li class="item_menu flex" v-for="(list,index) in lotterylist">
                        <div v-for="(l,idx) in list" class="item" :data-type="l.TypeId" :data-state="l.CurState">
                            <img :src="l.LogoUrl"/>
                            <p>{{l.TypeName}}</p>
                            <p>{{l.Tips}}</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import header from '../../components/header.vue';

    import Vue from 'vue';
    import { mapGetters, mapMutations, mapActions, mapState } from 'vuex';
    import { Swipe, SwipeItem, Toast } from 'mint-ui';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);

    export default {
        components: {
            'y-header': header
        },
        data() {
            return {
                promptState: false,
                luckyDoubleBall: {
                    0: [],
                    1: []
                }
            }
        },
        beforeCreate: function () {
            
        },
        beforeMount: function () {

        },
        mounted: function () {
            this.changeLuckyDoubleBall();
            this.lotterylist_()
        },
        computed: {
            ...mapState({
                lotterylist: state => state.$home.lotterylist
            })
        },
        methods: {
            ...mapActions([
                'lotterylist_'
            ]),
            ...mapMutations({
                closeMask:'closeMask',
                openMask:'openMask',
            }),
            luckSubmin() {
                // this.$store.commit('setLotteryType',1);
                this.$store.commit('distroyDoubleBallList');
                this.$store.commit('addDoubleBallList', this.luckyDoubleBall)
                this.$router.push({
                    name: 'betboxList',
                    path: '/betboxList'
                })
            },
            changePromptState(e) {
                let target = e.target;
                if (target.nodeName != 'DIV') {
                    target = target.parentNode
                }
                if (!target.classList.contains('item')) return;
                let type = target.getAttribute('data-type');
                let state = target.getAttribute('data-state');
                if(state == 2){
                    //设置彩票类型
                    this.$store.commit('setLotteryType',type);
                    this.$router.push({
                        name: 'betbox',
                        path: '/betbox'
                    });
                }else{
                    this._toast && (this._toast.close());
                    this._toast = Toast({
                        message:'抱歉，该品种暂停购买',
                        duration: 1000
                    })
                }
            },
            changeLuckyDoubleBall() {
                this.luckyDoubleBall = {
                    0: [],
                    1: []
                }
                getLuckyDoubleBall('red', 34, this.luckyDoubleBall);
                getLuckyDoubleBall('blue', 17, this.luckyDoubleBall);
                console.info(this.luckyDoubleBall);
            }
        }
    }

    function getLuckyDoubleBall(ele, count, ball) {
        let Num = document.querySelector('#index_number_box');
        let box = Num.querySelectorAll(`.${ele}`);
        let arrBall = [];
        let i = 0;
        let timer = 10;
        let isRed = ele == 'red';
        for (let i = 1; i < count; i++) {
            arrBall.push(i);
        }
        arrBall.sort(function () {
            return (Math.random() < 0.5 ? 1 : -1)
        });

        function setNum() {
            for (let j = 0; j < box.length; j++) {
                box[j].innerHTML = arrBall[Math.floor(Math.random() * (count - 1))]
            }
            i++;
            if (i > count + 16) {
                arrBall.sort(function () {
                    return (Math.random() < 0.5 ? 1 : -1)
                });
                for (let j = 0; j < box.length; j++) {
                    let num = arrBall[j];
                    if (isRed) {
                        ball[0].push(num)
                    } else {
                        ball[1].push(num)
                    }
                    box[j].innerHTML = num;
                }
                isRed && (ball[0] = ball[0].sort((a, b) => {
                    return a - b
                }));
                return;
            }
            setTimeout(setNum, timer);
        }
        setNum();
    }

</script>