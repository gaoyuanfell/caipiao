<template>
    <div class="tab-content">
        <y-header title="我的彩票" r_title="管理" :r_router="{name:'manage'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-tabbar margin-header>
                <div class="head_portrait flex">
                    <div class="avatar">
                        <img src="../../assets/images/morentoux.png" :src="user.LogoUrl"/>
                    </div>
                    <div class="head_name">
                        <p>{{user.NickName || '匿名'}}</p>
                        <p>奖金：{{(user.UserBalance || 0) | number('元')}}</p>
                    </div>
                </div>
                <div class="user_wallet flex">
                    <router-link :to="{ name: 'pay'}" class="border_right">充值</router-link>
                    <router-link :to="{name:'money'}">提现</router-link>
                </div>
                <div class="center_list">
                    <router-link :to="{name:'record'}" class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/jl.png" /></div>
                        <div class="tyle_information">投注记录</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </router-link>
                    <router-link :to="{name:'account'}" class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/mx.png" /></div>
                        <div class="tyle_information">账户明细</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </router-link>
                </div>
                <div class="center_list">
                    <router-link :to="{name:'nameauth'}" class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/rz.png" /></div>
                        <div class="tyle_information">实名认证</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </router-link>
                    <router-link :to="{name:'bindcard'}"  class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/bd.png" /></div>
                        <div class="tyle_information">绑定银行卡</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </router-link>
                </div>
                <div class="center_list">
                    <router-link :to="{name:'changePass'}" class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/xg.png" /></div>
                        <div class="tyle_information">修改密码</div>
                        <span href="javascript:;" class="information_bg">
                            <i class="icon">&#xe608;</i>
                        </span>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import header from '../../components/header.vue';
    import footer from '../../components/footer.vue';
    import $router from '../../router'
    import { mapGetters, mapMutations, mapActions, mapState } from 'vuex';

    export default {
        components: {
            'y-footer': footer,
            'y-header': header,
        },
        data() {
            return {

            }
        },
        created: function () {
            
        },
        mounted: function () {
            let userInfo = window.localStorage.getItem('userInfo');
            if(userInfo){
                try{
                    let u = JSON.parse(userInfo);
                    this.setUser(u);
                }catch(e){
                    this.$router.push({name:'login'})
                    return;
                }
            }else{
                this.$router.push({name:'login'})
                return;
            }
            // console.info(this.user)
            // //获取用户 基本数据 请求参数 PN or UID
            this.userInfo_({ PN: this.user.MobilePhone }).then( 
                (result) => {
                    console.info(result);
                }
             )
        },
        computed: {
            ...mapState({
                user: state => state.user
            })
        },
        methods: {
            ...mapActions([
                'userInfo_'
            ]),
            ...mapMutations({
                setUser:'setUser'
            })
        },
        beforeRouteEnter(to, from, next){
            let userInfo = window.localStorage.getItem('userInfo');
            if(userInfo){
                try{
                    let u = JSON.parse(userInfo);
                    next()
                }catch(e){
                    $router.push({name:'login'})
                    return;
                }
            }else{
                $router.push({name:'login'})
                return;
            }
        }
    }

</script>