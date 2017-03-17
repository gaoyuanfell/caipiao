<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="账户登录" router="/index"></y-header>
        <div class="scroll-content " style="margin-bottom:0" v-if="_router == '/login'">
            <div class="form-group">
                <label class="control-label">
                    <span>手机号</span>
                    <input v-model="user.UA" type="text" placeholder="请输入手机号"/>
                </label>
                <label class="control-label">
                    <span>登录密码</span>
                    <input v-model="user.PD" type="text" placeholder="请输入密码"/>
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

        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOut">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters,mapActions, mapState, mapMutations } from 'vuex';
    import header from '../../components/header.vue';
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
                this.login_(this.user).then(
                    (res) => {
                        this.setUser(res);//保存用户信息
                        this.$router.push({name:'user'})
                        window.localStorage.setItem('userInfo',JSON.stringify(res));
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