<template>
    <div class="content-modal">
        <y-header title="历史开奖信息" :router="{name:'doubleball'}"></y-header>
        
        <div class="content">
            <div class="scroll-content" margin-header>
                <ul class="information_list history_entry no-bgimg">
                    <template v-for="(h,index) in noticehistorys">
                        <li class="information flex">
                            <div class="tyle_information">
                                <p class="info">
                                    <span>第{{h.LotterySeq || 0}}期</span>
                                    <span>{{h.LotteryDate}}</span>
                                </p>
                                <div class="bet_cont flex" v-if="h.LotteryString">
                                    <template v-for="(n,index) in getBalls(h.LotteryString)">
                                        <div class="ball" :class="{'deepblue_bg margin_none': index == getBalls(h.LotteryString).length - 1}">{{n}}</div>
                                    </template>
                                </div>
                            </div>
                        </li>
                    </template>
                </ul>
                <!--以上是开奖历史查看-->
            </div>
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
                noticehistorys:[]
            }
        },
        created: function () {
            
        },
        mounted:function(){
            let DID = this.$route.query.DID
            this.noticehistory_({DID:DID}).then( (data) =>{
                this.noticehistorys = data;
            } );
        },
        computed:{
            ...mapGetters({
                
            }),
            // ...mapState({
            //     noticehistorys:state => state.$user.noticehistorys
            // })
        },
        methods:{
            ...mapActions([
                'noticehistory_'
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