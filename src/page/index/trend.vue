<template>
    <div class="content-modal">
        <y-header title="双色球走势图" router="-1"></y-header>
        <div class="content" margin-header>
            <trend-chart :list="trendList"></trend-chart>
        </div>
    </div>
</template>

<script>
import trendChart from '../../components/trendChart.vue';
import header from '../../components/header.vue';
import { mapActions, mapState } from 'vuex';
export default {
    components: {
        'y-header': header,
        'trend-chart': trendChart,
    },
    data() {
        return {
            trendList:[]
        }
    },
    mounted() {
        this.noticetrend_({ lotteryType: 1, row: 40 }).then((data) => {
            this.trendList = data.map((d) => { d.LotteryString = this.getBalls(d.LotteryString); return d })
        });
    },
    methods: {
        ...mapActions([
            'noticetrend_'
        ]),
        getBalls(ball){
            let rs = /\s/;
            let rd = /\,/;
            if(ball.split(rs).length == 2){
                let ba = [];
                let b = ball.split(rs);
                let _b = b[0];
                let i = 0;
                let s = "";
                while(s = _b.substr(i, 2),s){
                    ba.push(s);
                    i += 2;
                }
                ba.push(b[1]);
                return ba;
            }
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