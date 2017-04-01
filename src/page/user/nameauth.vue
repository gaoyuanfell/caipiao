<template>
    <div class="content-modal">
        <y-header title="实名认证" :router="{name:'user'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="form-group">
                    <label class="control-label">
                        <span>真实姓名</span>
                        <input type="text" v-model="model.RealName" placeholder="需与真实姓名一致，提交后不可修改"/>
                    </label>
                    <label class="control-label">
                        <span>身份证号</span>
                        <input type="text" v-model="model.IDCardNum" placeholder="需与身份证一致，提交后不可修改"/>
                    </label>
                    <label class="control-label">
                        <span>确认号码</span>
                        <input type="text" v-model="model.IDCardNum1" placeholder="请重复输入身份证号码"/>
                    </label>
                </div>
                <div class="default-btn">
                    <buttin @click="submit" class="btn">提交认证</buttin>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex';
    import header from '../../components/header.vue';
    import { Toast } from 'mint-ui';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                model:{}
            }
        },
        mounted(){

        },
        created(){
            
        },
        computed:{
            ...mapGetters({
                
            }),
            ...mapState({
                user:state => state.user
            })
        },
        methods:{
            ...mapActions([
                'bindidentity_'
            ]),
            submit(){
                if(!this.model.RealName || !this.model.IDCardNum || !this.model.IDCardNum1){
                    Toast("请填写完整！");
                    return;
                }
                if(this.model.IDCardNum != this.model.IDCardNum1){
                    Toast("身份证号码不一致！");
                    return;
                }
                let body = {
                    UserId:this.user.UserId,
                    RealName:this.model.RealName,
                    IDCardNum:this.model.IDCardNum,
                }
                this.bindidentity_(body).then(
                    (res) => {
                        Toast("绑定成功！");
                        this.$router.go(-1);
                    }
                )
            }
        }
    }
</script>