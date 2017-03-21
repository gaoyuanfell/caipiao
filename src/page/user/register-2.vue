<template>
    <div class="content-modal">
        <y-header title="填写验证码" r_title="登录" :r_router="{name:'login'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="iphone_note">
                    <p class="note">我们已经发送<span>验证码短信</span>至您的手机</p>
                    <p class="mobile">{{PN}}</p>
                </div>
                <div class="sms flex">
                    <label class="flex">
                        <span>验证码</span>
                        <input type="number" autofocus placeholder="请输入验证码"/>
                    </label>
                    <font color="#999" v-if="verifyState" class="test-button">重新获取({{countDown}})</font>
                    <input v-else type="button" @click="getVerifyCode" value="获取验证码" class="test-button">
                </div>
                <div class="login_but">
                    <button class="btn" @click="next"> 下一步 </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState, mapMutations } from 'vuex';
    import header from '../../components/header.vue';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                verifyState:false,
                countDown:61,
                countDownClear:0,
                PN:null
            }
        },
        created: function () {
            
        },
        mounted:function(){
            this.PN = this.$route.query.PN;
        },
        computed:{
            ...mapState({
                userReg:state => state.$user.userReg
            }),
            zIndex:function(){
                return this.$route.params.zIndex
            },
            ...mapGetters({
                
            }),
            
        },
        methods:{
            getVerifyCode(){
                this.countDown = 61;
                this.verifyState = true;
                let that = this;
                let _countDown = function(){
                    console.info(that.countDown);
                    that.countDown -= 1;
                    if(that.countDown <= 0){
                        that.verifyState = false;
                        return;
                    }
                    that.countDownClear = setTimeout( _countDown, 1000 );
                }
                _countDown();
            },
            next(){
                !this.countDownClear && (clearTimeout(this.countDownClear));
                //验证 验证码
                this.countDown = 0;
                this.$router.push({name:'register3'})
            }
        },
        destroyed:function(){
            console.info('destroyed');
            this.countDown = 0;
            !this.countDownClear && (clearTimeout(this.countDownClear));
        }
    }
</script>