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
                    <td v-for="n in i.ball" :class="{'is_blue': n.type == 2 && n.select,'is_select': n.select,'is_red':n.type == 1 && n.select}">{{n.select ? n.num : ''}}</td>
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
    mounted(){
        this.ball = [];
        for(var i = 1; i <= 49; i++){
            this.ball.push({
                num: i > 33 ? (this.intAddZero((i - 33),2) + '') : (this.intAddZero(i,2) + ''),
                type: i > 33 ? 2 : 1,
                total: 0,
            })
        }
        this.initEvent();
    },
    computed:{},
    watch:{
        list(val){
            this.initData();
            Vue.nextTick( ()=> { this.initLine();this.initTotal(); } );
        },
        scrollLeft(val){
            let $ball_list = this.$refs.ball_list;
            let $ball_title = this.$refs.ball_title;
            let $ball_total = this.$refs.ball_total;
            $ball_title.scrollLeft = val;
            $ball_total.scrollLeft = val;
            $ball_list.scrollLeft = val;
        },
        scrollTop(val){
            let $ball_list = this.$refs.ball_list;
            let $issue_code = this.$refs.issue_code;
            $ball_list.scrollTop = val;
            $issue_code.scrollTop = val;
        }
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
            let reserve = 25/3.5;
            let canvas = document.createElement('canvas');
            canvas.width =  Math.abs(w) || 30;
            canvas.height =  Math.abs(h);
            canvas.style.position = 'absolute';
            canvas.style.top = top1 + 'px';
            let ctx = canvas.getContext('2d');
            ctx.beginPath();
            if(w > 0){
                ctx.moveTo(Math.abs(w) - reserve, 0 + reserve);
                ctx.lineTo(0 + reserve, Math.abs(h) - reserve);
                canvas.style.left = left2 + 'px';
            }else if(w < 0){
                ctx.moveTo(0 + reserve, 0 + reserve);
                ctx.lineTo(Math.abs(w) - reserve, Math.abs(h) - reserve);
                canvas.style.left = left1 + 'px';
            }else{
                ctx.moveTo(15, reserve);
                ctx.lineTo(15, Math.abs(h) - reserve);
                canvas.style.left = left1 - 15 + 'px';
            }
            ctx.lineCap = 'square';
            ctx.lineWidth = 2; 
            ctx.strokeStyle = '#3b97ff'; 
            ctx.stroke();
            canvasLine.appendChild(canvas);
        },
        initData(){
            let list = this.list;
            list.forEach((l,i1) => {
                let ls = l.LotteryString;
                l.blue = Array.of(String(ls.pop()));
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
                })
            })
        },
        initTotal(){
            let ball = this.ball;
            let $ball_list = this.$refs.ball_list;
            ball.forEach( (b,i) => {
                let a = $ball_list.querySelectorAll(`tr td:nth-child(${i+1}).is_select`)
                b.total = a.length;
            } )
        },
        initEvent(){
            let $ball_list = this.$refs.ball_list;
            let $ball_title = this.$refs.ball_title;
            let $issue_code = this.$refs.issue_code;
            let $ball_total = this.$refs.ball_total;
            //主视图 两个值都需要改变
            $ball_list.addEventListener('scroll', (e) => {
                this.scrollTop = $ball_list.scrollTop;
                this.scrollLeft = $ball_list.scrollLeft;
            })
            // 只改变scrollLeft 值
            $ball_title.addEventListener('scroll', (e) => {
                this.scrollLeft = $ball_title.scrollLeft;
            })
            //只改变scrollTop 值
            $issue_code.addEventListener('scroll', (e) => {
                this.scrollTop = $issue_code.scrollTop;
            })
            $ball_total.addEventListener('scroll', (e) => {
                this.scrollLeft = $ball_total.scrollLeft;
            })
        },
        intAddZero(num, n){
            var len = num.toString().length;
            while (len < n) {
                num = "0" + num,len++;
            }
            return num;
        }
    }
}
</script>