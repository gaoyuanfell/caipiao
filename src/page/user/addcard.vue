<template>
    <div class="content-modal">
        <y-header title="添加银行卡" :router="{name:'bindcard'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="addcard_cont">
                    <img src="../../assets/images/yinhangka.png" alt="" class="card_chart">
                    <p>添加银行卡</p>
                    <p>即可享受安全便捷的移动支付体验</p>
                </div>
                <div class="position-btn">
                    <button class="btn card_but"><span>+</span>&nbsp;添加银行卡</button>
                </div>
            </div>
        </div>
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