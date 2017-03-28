<template>
    <div class="content-modal">
        <y-header title="绑定银行卡" :router="{name:'user'}" r_title="添加" :r_router="{name:'addcard'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="recharge_content">
                    <div class="card">
                        <a href="javascript:;" class="flex">
                            <div class="type_logo"><img src="../../assets/images/banklg.png" /></div>
                            <div class="tyle_information">
                                <p>中国农业银行</p>
                                <p>尾号0779储蓄卡</p>
                            </div>
                            <span href="javascript:;" class="information_bg"><i class="icon">&#xe608;</i></span>
                        </a>
                    </div>
                </div>
                <div class="default-btn">
                    <button class="btn">确认绑定</button>
                </div>
            </div>
        </div>
        <transition name="custom-classes-transition" enter-active-class="animated nav-open" leave-active-class="animated nav-close">
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