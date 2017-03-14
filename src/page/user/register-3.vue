<template>
    <div class="contener" :style="{'zIndex':$route.params.zIndex}">
        <y-header title="新密码" router="/user/login/register2" r_title="登录" :r_router="{name:'login'}"></y-header>
        <div class="scroll-content" style="margin-bottom:0">
            <div class="form-group">
                <label class="control-label">
                    <span>新密码</span>
                    <input v-model="PWD" type="text" placeholder="请输入新密码（6-20位、数字、字母）"/>
                </label>
                <label class="control-label">
                    <span>确认密码</span>
                    <input v-model="PWD1" type="text" placeholder="请再次输入新密码（6-20位、数字、字母）"/>
                </label>
            </div>
            <div class="position-btn">
                <button class="btn" @click="next"> 下一步 </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapActions, mapState } from 'vuex';
    import header from '../../components/header.vue';
    import { Toast } from 'mint-ui';
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
        mounted:function(){
            console.info(this.$route)
        },
        computed:{
            ...mapGetters({
                
            })
        },
        methods:{
            ...mapMutations({
                setUserRegByKey:'setUserRegByKey'
            }),
            next(){
                let PWD = this.PWD;
                let PWD1 = this.PWD1;
                let reg = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,22}$/;
                if(PWD && PWD1 && reg.test(PWD) && PWD == PWD1){
                    this.setUserRegByKey({key:'PWD',value:PWD});
                    this.$router.push({name:'register4'});
                }else if(reg.test(PWD) && PWD != PWD1){
                    Toast('两次密码不一致，请重新输入！')
                }else{
                    Toast('请填写新密码！')
                }
            }
        }
    }
</script>