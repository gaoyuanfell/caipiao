<template>
    <div class="trend">
        <div class="issue-code-t">
            期号
        </div>
        <div class="ball-title" ref="ball_title">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                    <td colspan="11">红球区域1</td>
                    <td colspan="11">红球区域2</td>
                    <td colspan="11">红球区域3</td>
                    <td colspan="16">篮球区域1</td>
                </tr>
                <tr class="tr_item">
                    <td v-for="b in ball"> {{b.num}} </td>
                </tr>
            </table>
        </div>

        <div class="ball-list" ref="ball_list">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr v-for="i in list">
                    <!-- <td v-for="(n,index) in i.ball"> {{  }} </td> -->
                    <td v-for="n in i.ball" :class="{'is_blue':n.type == 2 && n.select}">{{n.select ? n.num : ''}}</td>
                </tr>
            </table>
            <div ref="canvasLine"></div>
        </div>

        <div class="issue-code" ref="issue_code">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr v-for="(i, index) in list">
                    <td>{{i.LotterySeq}}</td>
                </tr>
            </table>
        </div>
        
        <div class="ball-total-t">
            出现次数
        </div>
        <div class="ball-total" ref="ball_total">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr class="tr_item">
                    <td v-for="b in ball"> {{b.total}} </td>
                </tr>
            </table>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
export default {
    name:'trend-chart',
    data(){
        return {
            list:[],
            ball:[],
            scrollLeft: 0,
            scrollTop: 0,
        }
    },
    props:{
        list: {
            type: Array,
            default: () => []
        }
    },
    mounted:function(){
        this.list = [];
        // for(var i = 0; i < 40; i++){
        //     this.list.push({
        //         LotterySeq:`2017${i}`,
        //         LotteryString:`05,08,15,24,27,31,11`.split(',')
        //     })
        // }
        this.list.push({
            LotterySeq:`2017`,
            LotteryString:`05,08,15,24,27,31,05`.split(',')
        })
        this.list.push({
            LotterySeq:`2017`,
            LotteryString:`04,08,12,22,27,33,12`.split(',')
        })
        this.list.push({
            LotterySeq:`2017`,
            LotteryString:`01,06,09,20,26,30,06`.split(',')
        })
        this.ball = [];
        for(var i = 1; i <= 49; i++){
            this.ball.push({
                num: i > 33 ? (this.intAddZero((i - 33),2) + '') : (this.intAddZero(i,2) + ''),
                type: i > 33 ? 2 : 1,
                total: 0,
            })
        }
        this.initEvent();
        this.initData();
        Vue.nextTick( ()=> { this.initLine() } );
    },
    methods:{
        initLine(){
            let lineList = [];
            let $blues = this.$refs.ball_list.querySelectorAll('.is_blue');
            $blues.forEach((b)=>{
                lineList.push({
                    top: Math.abs(b.offsetTop + b.offsetHeight / 2),
                    left: Math.abs(b.offsetLeft + b.offsetWidth / 2)
                })
            })
            for(let i = 0; i < lineList.length - 1; i++){
                this.canvasLine(lineList[i],lineList[i + 1]);
            }
        },
        canvasLine(option,option2){
            // let a = Math.log2(Math.pow(Math.abs(top1 - top2),2) + Math.pow(Math.abs(left1 - left2),2));//两点之间的距离
            let canvasLine = this.$refs.canvasLine;
            let top1 = option.top;
            let left1 = option.left;
            let top2 = option2.top;
            let left2 = option2.left;
            let h = top1 - top2;
            let w = left1 - left2;
            let canvas = document.createElement('canvas');
            canvas.width =  Math.abs(w) || 2;
            canvas.height =  Math.abs(h);
            canvas.style.position = 'absolute';
            canvas.style.top = top1 + 'px';
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            // ctx.lineCap = 'square';
            if(w > 0){
                ctx.moveTo(Math.abs(w), 1);
                ctx.lineTo(0, Math.abs(h) - 1);
                canvas.style.left = left2 + 'px';
            }else if(w < 0){
                ctx.moveTo(0, 1);
                ctx.lineTo(Math.abs(w), Math.abs(h) - 1);
                canvas.style.left = left1 + 'px';
            }else{
                ctx.moveTo(0,1);
                ctx.lineTo(1, h);
                canvas.style.left = left1 + 'px';
            }
            ctx.lineCap = 'square';
            ctx.lineWidth = 2; 
            ctx.strokeStyle = '#3b97ff'; 
            ctx.stroke();
            
            // 
            // ctx.strokeRect(left1, top1, w || 2, h);
            
            canvasLine.appendChild(canvas);
        },
        initData(){
            let list = this.list;
            let ball = this.ball;
            list.forEach((l,i1) => {
                let ls = l.LotteryString;
                l.blue = Array.of(ls.pop());
                l.red = ls;
                let _ball = [];
                for(var i = 1; i <= 49; i++){
                    _ball.push({
                        num: i > 33 ? (this.intAddZero((i - 33),2) + '') : (this.intAddZero(i,2) + ''),
                        type: i > 33 ? 2 : 1,
                        total: 0,
                    })
                }
                l.ball = _ball;
                l.ball.forEach((b,i2) => {
                    let num = b.num;
                    let type = b.type;
                    if(type == 2){
                        l.blue.indexOf(num) != -1 && (b.select = true);
                    }else{
                        l.red.indexOf(num) != -1 && (b.select = true);
                    }
                    // let index = ls.indexOf(num);
                    // if(index != -1){
                    //     if(type == 2){
                    //         b.select = true;
                    //         ++b.total;
                    //     }else if(type == 1){
                    //         b.select = true;
                    //         ++b.total
                    //     }
                    // }
                })
            })
        },
        selectShowBall(l,b){
            let ball = '';
            if(b.type == 2){
                ball = l.blue;
            }else{
                ball = l.red;
            }
            if(ball.indexOf(b.num) != -1){
                b.select = true;
            }
        },
        initEvent(){
            let $ball_list = this.$refs.ball_list;
            let $ball_title = this.$refs.ball_title;
            let $issue_code = this.$refs.issue_code;
            let $ball_total = this.$refs.ball_total;
            
            //主视图 两个值都需要改变
            $ball_list.addEventListener('scroll', (e) => {
                $issue_code.scrollTop = $ball_list.scrollTop;
                $ball_title.scrollLeft = $ball_list.scrollLeft;
                $ball_total.scrollLeft = $ball_list.scrollLeft;
            })
            // 只改变scrollLeft 值
            $ball_title.addEventListener('scroll', (e) => {
                $ball_list.scrollLeft = $ball_title.scrollLeft;
            })
            //只改变scrollTop 值
            $issue_code.addEventListener('scroll', (e) => {
                $ball_list.scrollTop = $issue_code.scrollTop;
            })
            $ball_total.addEventListener('scroll', (e) => {
                $ball_list.scrollLeft = $ball_total.scrollLeft;
                $ball_title.scrollLeft = $ball_total.scrollLeft;
            })
        },
        intAddZero(num, n){
            var len = num.toString().length;
            while (len < n) {
                num = "0" + num;
                len++;
            }
            return num;
        }
    }
}
</script>