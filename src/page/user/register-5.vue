<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="再次输入6位数支付密码" router="/user/login/register4"></y-header>
        
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