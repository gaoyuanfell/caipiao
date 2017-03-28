<template>
    <div class="content-modal">
        <y-header title="注册" r_title="登录" :r_router="{name:'login'}"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="form-group">
                    <label class="control-label">
                        <span>手机号</span>
                        <input type="number" v-model="PN" placeholder="请输入手机号" autocomplete="off" autocorrect="off"/>
                    </label>
                </div>
                <div class="default-btn">
                    <button class="btn" @click="next"> 下一步 </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapMutations, mapState } from 'vuex';
    import header from '../../components/header.vue';
    import { Toast } from 'mint-ui';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                PN:null
            }
        },
        created: function () {
            
        },
        computed:{
            ...mapGetters({
                
            }),
            zIndex:function(){
                return this.$route.params.zIndex
            },
        },
        methods:{
            ...mapMutations({
                setUserRegByKey:'setUserRegByKey'
            }),
            next(){
                if(/^1\d{10}$/.test(this.PN)){
                    this.setUserRegByKey({key:'PN',value:this.PN});
                    this.$router.push({name:'register2',query:{PN:this.PN}})
                }else{
                    this._toast && (this._toast.close())
                    this._toast = Toast('请填写正确的手机号！')
                }
            }
        }
    }
</script>