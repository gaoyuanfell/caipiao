<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="绑定银行卡" router="/user" r_title="添加" r_router="/user/bindcard/addcard"></y-header>
        <div class="center_content body_overflow">
            <div class="recharge_content">
                <div class="card cont_padding">
                    <a href="javascript:;" class="flex pading">
                        <div class="type_logo"><img src="../../assets/images/banklg.png" /></div>
                        <div class="tyle_information margleft lineheight">
                            <p class="size_14">中国农业银行</p>
                            <p class="typehot">尾号0779储蓄卡</p>
                        </div>
                        <span href="javascript:;" class="information_bg"><img src="../../assets/images/youjiant.png"/></span>
                    </a>
                </div>
                <div class="revision cont_padding">
                    <a href="javascript:;" class="continue_bet size_18">确认绑定</a>
                </div>
            </div>
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
                zIndex: 'getZindex'
            })
        }
    }
</script>