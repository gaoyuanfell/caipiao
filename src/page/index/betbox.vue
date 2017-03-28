<template>
    <div class="content-modal">
        <y-header :title="doubleBallName" router="-1" :h_callback="selectBallType" r_icon="&#xe61f;" :r_callback="selectBallMenu"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header margin-tabbar>
                <div class="betting_content">
                    <div class="tyle_information">
                        <p class="stop_prompt"><span class="size_14 typecolor">第2016-145期</span><span>2016/12/11&nbsp;19:40:00&nbsp;截止</span></p>
                    </div>
                    <!-- 普通投注 -->
                    <div class="select_number" v-show="doubleBall.ballType != 3">
                        <div class="red_ball">
                            <div class="flex title_notice">
                                <p class="title_p">至少选择6个<span class="red">红球</span></p>
                                <a href="javascript:;" class="machine_elects" @click="changeBet()">
                                    <span>机选</span>
                                </a>
                            </div>
                            <div class="ball_cont" @click="selectBet($event,1)">
                                <span class="ball" v-for="red in ball_red_list" v-text="red" :num="red" href="javacript:;" :class="{'deepred':doubleBall[0].indexOf(red) != -1,'red':doubleBall[0].indexOf(red) == -1}">
                                </span>
                            </div>
                        </div>
                        <!--以上是选择红球-->
                        <div class="blue_ball">
                            <div class="flex title_notice">
                                <p class="title_p">至少选择1个<span class="blue">蓝球</span></p>
                            </div>
                            <div class="ball_cont" @click="selectBet($event,2)">
                                <span class="ball" v-for="blue in ball_blue_list" v-text="blue" :num="blue" href="javacript:;" :class="{'deepblue':doubleBall[1].indexOf(blue) != -1,'blue':doubleBall[1].indexOf(blue) == -1}"></span>
                            </div>
                        </div>
                        <!--以上是选择蓝球-->
                    </div>
                    <!-- 胆拖投注 -->
                    <div class="select_number" v-show="doubleBall.ballType == 3">
                        <div class="red_ball">
                            <div class="flex title_notice">
                                <p class="title_p">至少选择6个<span class="red">红球</span></p>
                            </div>
                            <div class="ball_cont" @click="selectBet($event,1)">
                                <span class="ball" v-for="red in ball_red_list" v-text="red" :num="red" href="javacript:;" :class="{'deepred':doubleBall[0].indexOf(red) != -1,'red':doubleBall[0].indexOf(red) == -1}">
                                </span>
                            </div>
                            <div class="flex title_notice">
                                <p class="title_p">至少选择6个<span class="red">红球</span></p>
                            </div>
                            <div class="ball_cont" @click="selectBet_t($event,1)">
                                <span class="ball" v-for="red in ball_red_list" v-text="red" :num="red" href="javacript:;" :class="{'deepred':doubleBall[2].indexOf(red) != -1,'red':doubleBall[2].indexOf(red) == -1}">
                                </span>
                            </div>
                        </div>
                        <!--以上是选择红球-->
                        <div class="blue_ball">
                            <div class="flex title_notice">
                                <p class="title_p">至少选择1个<span class="blue">蓝球</span></p>
                            </div>
                            <div class="ball_cont" @click="selectBet($event,2)">
                                <span class="ball" v-for="blue in ball_blue_list" v-text="blue" :num="blue" href="javacript:;" :class="{'deepblue':doubleBall[1].indexOf(blue) != -1,'blue':doubleBall[1].indexOf(blue) == -1}"></span>
                            </div>
                        </div>
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

        <float-nav :navs="navs" v-model="visibility"></float-nav>

        <float-menu :menus="menus" v-model="visibility_menu"></float-menu>
        
        <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
            <router-view></router-view>
        </transition>
    </div>
    
</template>

<script>
    import { mapGetters, mapMutations, mapState } from 'vuex';
    import { Toast } from 'mint-ui';
    import header from '../../components/header.vue';
    import floatNav from '../../components/floatNav.vue';
    import floatMenu from '../../components/floatMenu.vue';

    export default {
        components: {
            'y-header': header,
            'float-nav': floatNav,
            'float-menu': floatMenu
        },
        data() {
            return {
                ball_red_list: [],
                ball_blue_list: [],
                //逻辑控制
                doubleBallName:'普通投注',
                visibility: false,
                visibility_menu: false,
            }
        },
        created: function () {
            let params = this.$route.params;
        },
        updated: function () {
            
        },
        mounted: function () {
            for (let i = 1; i < 34; i++) {
                this.ball_red_list.push(i);
            }
            for (let i = 1; i < 17; i++) {
                this.ball_blue_list.push(i);
            }
            let ballType = this.doubleBall.ballType;
            if(ballType == 3){
                this.doubleBallName = '双色球胆拖投注';
            }else{
                this.doubleBallName = '双色球普通投注';
            }
        },
        computed: {
            ...mapGetters({
                doubleBallBet: 'doubleBallBet'
            }),
            ...mapState({
                doubleBall: state => state.$home.doubleBall
            }),
            menus(){
                let that = this;
                return [{
                        name:'走势图',
                        icon:'&#xe63e;',
                        method:function(){
                            that.$router.push({name:'trend'})
                        }
                    },{
                        name:'开奖记录',
                        icon:'&#xe615;',
                        method:function(){
                            that.$router.push({name:'rule'})
                        }
                    },{
                        name:'玩法介绍',
                        icon:'&#xe6e4;',
                        method:function(){
                            that.$router.push({name:'rule'})
                        }
                    }]
            },
            navs(){
                let that = this;
                return [
                    {
                        name:'双色球普通投注',
                        method:function(){
                            that._setDoubleBall();
                            that._setDoubleBallType(1);
                            that.doubleBallName = this.name
                        }
                    },{
                        name:'双色球胆拖投注',
                        method:function(){
                            that._setDoubleBall();
                            that._setDoubleBallType(3);
                            that.doubleBallName = this.name
                        }
                    }
                ]
            }
        },
        activated: function () {

        },
        methods: {
            ...mapMutations({
                _setDoubleBall:'setDoubleBall',
                _setDoubleBallType:'setDoubleBallType',
                _updateDoubleBallList:'updateDoubleBallList',
                _addDoubleBallList:'addDoubleBallList',
                _removeDoubleBallList:'removeDoubleBallList'

            }),
            selectBallType(){
                this.visibility = !this.visibility;
            },
            selectBallMenu(){
                this.visibility_menu = !this.visibility_menu;
            },
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
                    2:[],
                    type:2,
                    ballType:1
                }
                this._setDoubleBall(ball);
            },
            clearBet() {
                this.doubleBall[0] = [];
                this.doubleBall[1] = [];
                this.doubleBall[2] = [];
            },
            goBetboxList() {
                let type = this.doubleBall.type;
                let ballType = this.doubleBall.ballType;
                let ball = {
                    0: this.doubleBall[0].sort((a, b) => { return a - b }),
                    1: this.doubleBall[1].sort((a, b) => { return a - b }),
                    2: this.doubleBall[2].sort((a, b) => { return a - b }),
                    type: type,
                    ballType: ballType
                }
                let r = this.doubleBall[0].length;
                let b = this.doubleBall[1].length;
                let r_t = this.doubleBall[2].length;
                let $index = this.$route.query.$index;

                let bo1 = r < 6;//红球需要大于等于6个
                let bo2 = b < 1;//篮球需要大于等于1个

                let bo3 = r == 0;//红球为0
                let bo4 = b == 0;//蓝球为0
                let bo5 = bo3 && bo4;//判断都没有选球的情况

                let bo6 = r_t < 2;//红托球为0

                // 胆拖的方式
                let bo7 = r > 5;
                let bo8 = r + r_t < 7;
                let bo10 = r == 0;

                let bo9 = r > 6 || b > 1;

                if(bo5 && $index != undefined){
                    this._removeDoubleBallList($index);
                    this.$router.push({
                        name: 'betboxList',
                    })
                    return;
                }

                switch(+ballType){
                    case 1:
                    case 2:
                        if(bo1){
                            Toast('请至少选择6个红球！');
                            return
                        }
                        if(bo9){
                            ball.ballType = 2;
                        }else{
                            ball.ballType = 1;
                        }
                        break;
                    case 3:
                        if(bo10){
                            Toast('请至少选择1-5个红球胆码！');
                            return;
                        }
                        if(bo6){
                            Toast('请至少选择2个红球拖码！');
                            return;
                        }
                        if(bo7){
                            Toast('最多可选择5个红球胆码！');
                            return;
                        }
                        if(bo8){
                            Toast('红球胆码 + 红球拖码至少需要7个');
                            return;
                        }
                        break;
                }

                // 条件成功
                if($index != undefined){
                    this._updateDoubleBallList({ $index: $index, ball: ball });
                }else{
                    this._addDoubleBallList(ball);
                }
                this.$router.push({
                    name: 'betboxList',
                })
            },
            selectBet(e, type) {
                e.preventDefault();
                let t = e.target;
                let index;
                let index_t;
                let num = t.getAttribute('num');
                if (isNaN(parseInt(num))) return;
                this.doubleBall.type = 1;
                switch (type) {
                    case 1:
                        index = this.doubleBall[0].indexOf(+num);
                        index_t = this.doubleBall[2].indexOf(+num);
                        if (index == -1) {
                            this.doubleBall[0].push(+num);
                            if(index_t != -1){
                                this.doubleBall[2].splice(index_t, 1);
                            }
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
            },
            selectBet_t(e, type){
                e.preventDefault();
                let t = e.target;
                let index;
                let index_t;
                let num = t.getAttribute('num');
                if (isNaN(parseInt(num))) return;
                this.doubleBall.type = 1;
                this.doubleBall.ballType = 3;
                switch (type) {
                    case 1:
                        index_t = this.doubleBall[2].indexOf(+num);
                        index = this.doubleBall[0].indexOf(+num);
                        if (index_t == -1) {
                            this.doubleBall[2].push(+num);
                            if(index != -1){
                                this.doubleBall[0].splice(index, 1);
                            }
                        } else {
                            this.doubleBall[2].splice(index_t, 1);
                        }
                        break;
                    case 2:
                        break;
                }
            }
        }
    }
</script>