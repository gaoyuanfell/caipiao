<template>
    <div class="content-modal">
        <y-header title="修改昵称" r_title="保存" :r_callback="nickNameModify"></y-header>
        <div class="content">
            <div class="scroll-content" margin-header>
                <div class="form-group">
                    <label class="control-label">
                        <span>昵称</span>
                        <input type="text" v-model="NickName" placeholder="请输入昵称"/>
                    </label>
                </div>
                <div class="default-btn">
                    <button class="btn" @click="nickNameModify"> 保存 </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState, mapMutations } from 'vuex';
    import Vue from 'vue';
    import header from '../../components/header.vue';
    import { Toast } from 'mint-ui';
    export default {
        components: {
            'y-header': header,
        },
        data() {
            return {
                NickName:null
            }
        },
        created: function () {
            
        },
        mounted:function(){
            this.NickName = this.$route.query.NickName || '';
        },
        computed:{
            ...mapGetters({
                
            }),
            zIndex:function(){
                return this.$route.params.zIndex
            },
            ...mapState({
                user:state => state.user
            })
        },
        methods:{
            ...mapActions([
                'userunn_',
            ]),
            nickNameModify(){
                this.userunn_({UserId:this.user.UserId, NickName:this.NickName}).then(
                    (res) => {
                        this.user.NickName = this.NickName;
                        Toast('修改成功')
                        setTimeout( ()=> { this.$router.go(-1); },500 )
                    }
                )
            },
        }
    }
</script>