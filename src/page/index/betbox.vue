<template>
    <div class="content-modal">
        <y-header title="双色球" :router="{name:'betboxList'}" r_title="玩法"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header margin-tabbar>
                <div class="betting_content">
                    <div class="tyle_information">
                        <p class="stop_prompt"><span class="size_14 typecolor">第2016-145期</span><span>2016/12/11&nbsp;19:40:00&nbsp;截止</span></p>
                    </div>
                    <div class="select_number">
                        <div class="red_ball">
                            <div class="flex title_notice">
                                <div>至少选择6个<span>红球</span></div>
                                <a href="javascript:;" class="machine_elects" @click="changeBet()">
                                    <span>机选</span>
                                </a>
                            </div>
                            <div class="ball_cont" @click="selectBet($event,1)">
                                <a v-for="red in bet_red_list" v-text="red" :num="red" href="javacript:;" :class="{'deepred':doubleBall[0].indexOf(red) != -1,'red':doubleBall[0].indexOf(red) == -1}">
                                </a>
                            </div>
                        </div>
                        <!--以上是选择红球-->
                        <div class="blue_ball">
                            <div class="flex title_notice">
                                <div>至少选择1个<span>蓝球</span></div>
                            </div>
                            <div class="ball_cont" @click="selectBet($event,2)">
                                <a v-for="blue in bet_blue_list" v-text="blue" :num="blue" href="javacript:;" :class="{'deepblue':doubleBall[1].indexOf(blue) != -1,'blue':doubleBall[1].indexOf(blue) == -1}"></a>
                            </div>
                        </div>
                        <!--以上是选择蓝球-->
                    </div>
                    <!--以上是选择号-->
                </div>
            </div>

            <div class="foot_menu select_complete flex">
                <a @click="clearBet()" href="javascript:;" class="delect">
                    <i class="icon">&#xe62f</i>
                </a>
                <div class="have_cast">已选
                    <span v-text="doubleBallBet"></span>注
                    <span class="numberred" v-text="doubleBallBet * 2"></span>元
                </div>
                <a href="javascript:;" @click="goBetboxList()" class="complete">确定</a>
            </div>

        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
    
</template>

<script>
    import { mapGetters, mapMutations, mapState } from 'vuex';
    import header from '../../components/header.vue';

    export default {
        components: {
            'y-header': header
        },
        data() {
            return {
                bet_red_list: [],
                bet_blue_list: [],
            }
        },
        created: function () {
            let params = this.$route.params;
        },
        updated: function () {
            
        },
        mounted: function () {
            for (let i = 1; i < 34; i++) {
                this.bet_red_list.push(i);
            }
            for (let i = 1; i < 17; i++) {
                this.bet_blue_list.push(i);
            }
        },
        computed: {
            ...mapGetters({
                doubleBallBet: 'doubleBallBet'
            }),
            ...mapState({
                doubleBall: state => state.$home.doubleBall
            })
        },
        activated: function () {

        },
        methods: {
            changeBet() {
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
                this.$store.commit('setDoubleBall', ball);
            },
            clearBet() {
                this.$store.commit('setDoubleBall');
            },
            goBetboxList() {
                let type = this.doubleBall.type;
                let b = this.doubleBall[0].length;
                let r = this.doubleBall[1].length;
                let $index = this.$route.params.$index;
                let ball = {
                    0: this.doubleBall[0].sort((a, b) => { return a - b }),
                    1: this.doubleBall[1].sort((a, b) => { return a - b }),
                    type: type
                }
                let bo1 = b >= 6 && r >= 1
                let bo2 = b == 0 && r == 0
                if($index != undefined && bo1){
                    this.$store.commit('updateDoubleBallList', { $index: $index, ball: ball });
                }else if(bo1){
                    this.$store.commit('addDoubleBallList', ball);
                }else if($index != undefined && bo2){
                    this.$store.commit('removeDoubleBallList', $index);
                }else{
                    //TODO 提示 球的数量不正确
                }
                this.$router.push({
                    name: 'betboxList',
                })
            },
            selectBet(e, type) {
                let t = e.target;
                let index;
                let num = t.getAttribute('num');
                if (isNaN(parseInt(num))) return;
                this.doubleBall.type = 1;
                switch (type) {
                    case 1:
                        index = this.doubleBall[0].indexOf(+num);
                        if (index == -1) {
                            this.doubleBall[0].push(+num);
                        } else {
                            this.doubleBall[0].splice(index, 1);
                        }
                        break;
                    case 2:
                        index = this.doubleBall[1].indexOf(+num);
                        if (index == -1) {
                            this.doubleBall[1].push(+num);
                        } else {
                            this.doubleBall[1].splice(index, 1);
                        }
                        break;
                }
            }
        }

    }

</script>