<template>
    <div class="contener" :style="{'zIndex':zIndex}">
        <y-header title="填写验证码" router="/user/login/register1" r_title="下一步" r_router="/user/login/register3"></y-header>
        
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