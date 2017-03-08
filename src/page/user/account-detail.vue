<template>
    <div class="contener">
        <y-header title="账户明细" router="/user"></y-header>
        <div class="scroll-content">
            {{test | json}}
            <button @click="test()">测试</button>
        </div>
    </div>
</template>

<script>
    import header from '../../components/header.vue';
    import { mapState, mapActions } from 'vuex'

    export default {
        data(){
            return {
                
            }
        },
        components: {
            'y-header': header,
        },
        methods: {
            test:function(){
                this.axios.post('http://127.0.0.1/user/login.htm',{
                    user:'admin',
                    password:'123456789'
                }).then(
                    (res) => {
                        console.info(res);
                    }
                )
            }
        },
        computed: {
            
        }
    }
</script>