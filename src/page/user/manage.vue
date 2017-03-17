<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="我的彩票" router="/user"></y-header>
        <div class="scroll-content" style="margin-bottom:0rem;">
            <div class="center_list">
                <router-link to="/user/manage/userInfo" class="center_item flex">
                    <div class="img_icon"><img src="../../assets/images/jl.png" /></div>
                    <div class="tyle_information">账户详情</div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </router-link>
                <a to="/user/account" class="center_item flex">
                    <div class="img_icon"><img src="../../assets/images/mx.png" /></div>
                    <div class="tyle_information">密码管理</div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </a>
            </div>
            <div class="center_list">
                <a to="/user/nameauth" class="center_item flex">
                    <div class="img_icon"><img src="../../assets/images/rz.png" /></div>
                    <div class="tyle_information">检查最新版本</div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </a>
                <a to="/user/bindcard"  class="center_item flex">
                    <div class="img_icon"><img src="../../assets/images/bd.png" /></div>
                    <div class="tyle_information">推荐给好友</div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </a>
                <a to="/user/changePass" class="center_item flex">
                    <div class="img_icon"><img src="../../assets/images/xg.png" /></div>
                    <div class="tyle_information">关于我们</div>
                    <span href="javascript:;" class="information_bg">
                        <i class="icon">&#xe608;</i>
                    </span>
                </a>
            </div>
            <!--
                <div class="position-btn">
                    <button class="btn">退出登录</button>
                </div>
            -->
        </div>
        
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import header from '../../components/header.vue';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                
            }
        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                
            })
        }
    }
</script>