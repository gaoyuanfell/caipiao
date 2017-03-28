<template>
    <div class="content-modal">
        <y-header title="账户登录" :router="{name:'index'}" :r_router="{name:'index'}" r_title="首页"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header v-if="_router == '/login'">
                <div class="form-group">
                    <label class="control-label">
                        <span>手机号</span>
                        <input v-model="user.UA" type="number" placeholder="请输入手机号" autocomplete="off" autocorrect="off"/>
                    </label>
                    <label class="control-label">
                        <span>登录密码</span>
                        <input v-model="user.PD" type="password" placeholder="请输入密码" autocomplete="off" autocorrect="off"/>
                    </label>
                    <div class="remember">
                        <a href="javascript:;" class="memory-butn">忘记密码？</a>
                    </div>
                </div>
                <div class="login_but">
                    <button class="btn login" @click="login"> 登录 </button>
                    <button class="btn register" @click="$router.push({name:'register1'})"> 注册 </button>
                </div>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated fadeOut">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters,mapActions, mapState, mapMutations } from 'vuex';
    import header from '../../components/header.vue';
    import { Toast } from 'mint-ui';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                user:{}
            }
        },
        created: function () {
            
        },
        mounted:function(){
            
        },
        computed:{
            ...mapGetters({
                
            }),
            zIndex:function(){
                return this.$route.params.zIndex
            },
            _router:function(){
                return this.$route.path;
            }
        },
        methods:{
            //{"PD":"1234563333","UA":"13000000000"}
            ...mapMutations({
                setUser:'setUser'
            }),
            login(){
                let reg1 = /^1\d{10}$/;
                let reg2 = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
                if(!reg1.test(this.user.UA) || !reg2.test(this.user.PD)){
                    this._toast && (this._toast.close())
                    this._toast = Toast('请填写正确的手机号和密码！')
                    return;
                }
                this.login_(this.user).then(
                    (res) => {
                        this.setUser(res);//保存用户信息
                        window.localStorage.setItem('userInfo',JSON.stringify(res));
                        this.$router.push({name:'user'})
                        console.info(res);
                    },
                    (e) => {
                        console.info(e);
                    }
                )
            },
            ...mapActions([
                'login_'
            ])
        }
    }
</script>