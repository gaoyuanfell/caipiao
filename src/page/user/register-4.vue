<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="设置6位数支付密码" router="/user/login/register3" r_title="下一步" r_router="/user/login/register5"></y-header>
        
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