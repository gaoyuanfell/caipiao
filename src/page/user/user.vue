<template>
    <div class="contener">
        <y-header title="我的彩票"></y-header>
        <div class="scroll-content">
            <div class="head_portrait flex">
                <div class="avatar">
                    <img :src="userInfo.LogoUrl" />
                </div>
                <div class="head_name size_18">
                    <p>{{userInfo.NickName || '匿名'}}</p>
                    <p>奖金：{{(userInfo.UserBalance || 0) | number('元')}}</p>
                </div>
            </div>
            <div class="wallet typecolor size_16 flex">
                <router-link :to="{ name: 'pay'}" class="border_right">充值</router-link>
                <router-link to="/user/money">提现</router-link>
            </div>
            <div class="center_list cont_padding">
                <router-link to="/user/record">
                    <a href="javascript:;" class="center_item flex itemborder">
                        <div class="img_icon"><img src="../../assets/images/jl.png" /></div>
                        <div class="tyle_information typecolor size_16">投注记录</div>
                        <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"/></span>
                    </a>
                </router-link>
                <router-link to="/user/account">
                    <a href="javascript:;" class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/mx.png" /></div>
                        <div class="tyle_information typecolor size_16">账户明细</div>
                        <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"/></span>
                    </a>
                </router-link>
            </div>
            <div class="center_list cont_padding">
                <router-link to="/user/nameauth">
                    <a href="javascript:;" class="center_item flex itemborder">
                        <div class="img_icon"><img src="../../assets/images/rz.png" /></div>
                        <div class="tyle_information typecolor size_16">实名认证</div>
                        <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"/></span>
                    </a>
                </router-link>
                <router-link to="/user/bindcard">
                    <a href="javascript:;" class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/bd.png" /></div>
                        <div class="tyle_information typecolor size_16">绑定银行卡</div>
                        <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"/></span>
                    </a>
                </router-link>
            </div>
            <div class="center_list cont_padding">
                <router-link to="/user/changePass">
                    <a href="javascript:;" class="center_item flex">
                        <div class="img_icon"><img src="../../assets/images/xg.png" /></div>
                        <div class="tyle_information typecolor size_16">修改密码</div>
                        <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"/></span>
                    </a>
                </router-link>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
    import header from '../../components/header.vue';
    import footer from '../../components/footer.vue';
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
            //获取用户 基本数据 请求参数 PN or UID
            this.userInfo_({ PN: '13000000000' })
        },
        mounted: function () {

        },
        computed: {
            ...mapState({
                userInfo: state => state.$user.userInfo
            })
        },
        methods: {
            ...mapActions([
                'userInfo_'
            ])
        }
    }

</script>